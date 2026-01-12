import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  "Pragma": "no-cache",
  "Expires": "0",
  "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return new Response("Not Found", { status: 404, headers: corsHeaders });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch image metadata
    const { data: image, error: fetchError } = await supabase
      .from("private_images")
      .select("*")
      .eq("access_token", token)
      .maybeSingle();

    if (fetchError || !image) {
      console.error("Image not found:", fetchError);
      return new Response("Not Found", { status: 404, headers: corsHeaders });
    }

    // Check if revoked
    if (image.is_revoked) {
      return new Response("Not Found", { status: 404, headers: corsHeaders });
    }

    // Check time-based expiry
    if (image.expiry_type === "time" && image.expires_at) {
      const expiresAt = new Date(image.expires_at);
      if (new Date() > expiresAt) {
        return new Response("Not Found", { status: 404, headers: corsHeaders });
      }
    }

    // Check view-based expiry
    if (image.expiry_type === "views" && image.max_views) {
      if (image.current_views >= image.max_views) {
        return new Response("Not Found", { status: 404, headers: corsHeaders });
      }
    }

    // Increment view count
    await supabase
      .from("private_images")
      .update({ current_views: image.current_views + 1 })
      .eq("id", image.id);

    // Fetch the actual image from storage
    const { data: fileData, error: storageError } = await supabase.storage
      .from("private-images")
      .download(image.storage_path);

    if (storageError || !fileData) {
      console.error("Storage error:", storageError);
      return new Response("Not Found", { status: 404, headers: corsHeaders });
    }

    // Return the image with appropriate headers
    return new Response(fileData, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": image.mime_type,
        "Content-Disposition": "inline",
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new Response("Internal Server Error", { status: 500, headers: corsHeaders });
  }
});
