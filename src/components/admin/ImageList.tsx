import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Copy, Ban, Trash2, Image as ImageIcon, Eye, Clock, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface PrivateImage {
  id: string;
  access_token: string;
  original_filename: string;
  mime_type: string;
  file_size_bytes: number;
  expiry_type: string;
  expiry_hours: number | null;
  max_views: number | null;
  current_views: number;
  expires_at: string | null;
  is_revoked: boolean;
  created_at: string;
}

interface ImageListProps {
  refreshTrigger: number;
}

export function ImageList({ refreshTrigger }: ImageListProps) {
  const [images, setImages] = useState<PrivateImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('private_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching images:', error);
        toast.error('Failed to load images');
        return;
      }

      setImages((data as PrivateImage[]) || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [refreshTrigger]);

  const getPublicUrl = (token: string) => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    return `${supabaseUrl}/functions/v1/serve-private-image?token=${token}`;
  };

  const copyUrl = async (token: string) => {
    await navigator.clipboard.writeText(getPublicUrl(token));
    toast.success('URL copied to clipboard');
  };

  const handleAction = async (imageId: string, action: 'revoke' | 'delete') => {
    setActionLoading(imageId);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await supabase.functions.invoke('admin-revoke-image', {
        body: { imageId, action },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error) {
        toast.error(`Failed to ${action} image`);
        return;
      }

      toast.success(`Image ${action === 'revoke' ? 'revoked' : 'deleted'}`);
      fetchImages();
    } catch (err) {
      console.error('Error:', err);
      toast.error(`Failed to ${action} image`);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatus = (image: PrivateImage) => {
    if (image.is_revoked) return { label: 'Revoked', variant: 'destructive' as const };
    
    if (image.expiry_type === 'time' && image.expires_at) {
      const expiresAt = new Date(image.expires_at);
      if (new Date() > expiresAt) {
        return { label: 'Expired', variant: 'secondary' as const };
      }
    }
    
    if (image.expiry_type === 'views' && image.max_views) {
      if (image.current_views >= image.max_views) {
        return { label: 'Max views reached', variant: 'secondary' as const };
      }
    }
    
    return { label: 'Active', variant: 'default' as const };
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8 flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Uploaded Images
            </CardTitle>
            <CardDescription>
              {images.length} image{images.length !== 1 ? 's' : ''} uploaded
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={fetchImages}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {images.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No images uploaded yet</p>
        ) : (
          <div className="space-y-4">
            {images.map((image) => {
              const status = getStatus(image);
              const isActive = status.label === 'Active';
              
              return (
                <div 
                  key={image.id} 
                  className={`border rounded-lg p-4 space-y-3 ${!isActive ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium truncate">{image.original_filename}</p>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(image.file_size_bytes)} • Uploaded {formatDistanceToNow(new Date(image.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {image.current_views} view{image.current_views !== 1 ? 's' : ''}
                      {image.expiry_type === 'views' && image.max_views && ` / ${image.max_views}`}
                    </span>
                    {image.expiry_type === 'time' && image.expires_at && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(image.expires_at) > new Date() 
                          ? `Expires ${formatDistanceToNow(new Date(image.expires_at), { addSuffix: true })}`
                          : 'Expired'
                        }
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => copyUrl(image.access_token)}
                      disabled={!isActive}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy URL
                    </Button>
                    
                    {isActive && !image.is_revoked && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAction(image.id, 'revoke')}
                        disabled={actionLoading === image.id}
                      >
                        {actionLoading === image.id ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Ban className="w-4 h-4 mr-2" />
                        )}
                        Revoke
                      </Button>
                    )}

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          disabled={actionLoading === image.id}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Image</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete "{image.original_filename}" and its URL will stop working immediately. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleAction(image.id, 'delete')}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
