import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const FRAME_BASE_URL = 'http://213.199.54.102/frames/ezgif-frame-';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const frameParam = url.searchParams.get('frame');

    if (!frameParam) {
      return new Response(
        JSON.stringify({ error: 'Missing frame parameter' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate frame number (1-240)
    const frameNumber = parseInt(frameParam, 10);
    if (isNaN(frameNumber) || frameNumber < 1 || frameNumber > 240) {
      return new Response(
        JSON.stringify({ error: 'Invalid frame number. Must be between 1 and 240.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Generate padded frame number
    const paddedNumber = String(frameNumber).padStart(3, '0');

    // Fetch from origin server
    const frameUrl = `${FRAME_BASE_URL}${paddedNumber}.jpg`;
    console.log(`Fetching frame from: ${frameUrl}`);

    const response = await fetch(frameUrl);

    if (!response.ok) {
      console.error(`Failed to fetch frame ${paddedNumber}: ${response.status}`);
      return new Response(
        JSON.stringify({ error: `Frame ${paddedNumber} not found` }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const contentType = response.headers.get('Content-Type') || 'image/jpeg';
    const imageBuffer = await response.arrayBuffer();

    console.log(`Successfully served frame ${paddedNumber}`);

    return new Response(imageBuffer, {
      headers: {
        ...corsHeaders,
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });

  } catch (error) {
    console.error('Error serving frame:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
