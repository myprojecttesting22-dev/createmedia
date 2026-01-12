-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table (separate from profiles per security requirement)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy: Only admins can view roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create admin_totp_secrets table for 2FA
CREATE TABLE public.admin_totp_secrets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    encrypted_secret TEXT NOT NULL,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on admin_totp_secrets
ALTER TABLE public.admin_totp_secrets ENABLE ROW LEVEL SECURITY;

-- RLS policy: Users can only see their own TOTP
CREATE POLICY "Users can view own TOTP settings"
ON public.admin_totp_secrets
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own TOTP settings"
ON public.admin_totp_secrets
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own TOTP settings"
ON public.admin_totp_secrets
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Create private_images table
CREATE TABLE public.private_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    access_token TEXT NOT NULL UNIQUE,
    storage_path TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_size_bytes INTEGER NOT NULL,
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    expiry_type TEXT NOT NULL CHECK (expiry_type IN ('time', 'views')),
    expiry_hours INTEGER DEFAULT 72,
    max_views INTEGER DEFAULT 5,
    current_views INTEGER NOT NULL DEFAULT 0,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_revoked BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on private_images
ALTER TABLE public.private_images ENABLE ROW LEVEL SECURITY;

-- RLS policy: Only admins can manage private images
CREATE POLICY "Admins can view all private images"
ON public.private_images
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert private images"
ON public.private_images
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update private images"
ON public.private_images
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete private images"
ON public.private_images
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_private_images_updated_at
BEFORE UPDATE ON public.private_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_totp_secrets_updated_at
BEFORE UPDATE ON public.admin_totp_secrets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for private images
INSERT INTO storage.buckets (id, name, public)
VALUES ('private-images', 'private-images', false);

-- Storage policies: Only admins can upload/manage
CREATE POLICY "Admins can upload private images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'private-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view private images"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'private-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete private images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'private-images' AND public.has_role(auth.uid(), 'admin'));

-- Create index for fast token lookups
CREATE INDEX idx_private_images_access_token ON public.private_images(access_token);
CREATE INDEX idx_private_images_expires_at ON public.private_images(expires_at);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);