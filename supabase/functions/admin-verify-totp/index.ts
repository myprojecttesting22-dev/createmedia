import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// TOTP verification using HMAC-SHA1
async function verifyTOTP(secret: string, token: string): Promise<boolean> {
  const period = 30;
  const digits = 6;
  
  // Decode base32 secret
  const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = "";
  for (const char of secret.toUpperCase()) {
    const val = base32Chars.indexOf(char);
    if (val === -1) continue;
    bits += val.toString(2).padStart(5, "0");
  }
  const keyBytes = new Uint8Array(Math.floor(bits.length / 8));
  for (let i = 0; i < keyBytes.length; i++) {
    keyBytes[i] = parseInt(bits.slice(i * 8, (i + 1) * 8), 2);
  }

  // Get current time counter
  const counter = Math.floor(Date.now() / 1000 / period);

  // Check current and adjacent time windows
  for (const offset of [-1, 0, 1]) {
    const timeCounter = counter + offset;
    const counterBytes = new Uint8Array(8);
    let temp = timeCounter;
    for (let i = 7; i >= 0; i--) {
      counterBytes[i] = temp & 0xff;
      temp = Math.floor(temp / 256);
    }

    // HMAC-SHA1
    const key = await crypto.subtle.importKey(
      "raw",
      keyBytes,
      { name: "HMAC", hash: "SHA-1" },
      false,
      ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", key, counterBytes);
    const hmac = new Uint8Array(signature);

    // Dynamic truncation
    const offset2 = hmac[hmac.length - 1] & 0x0f;
    const binary =
      ((hmac[offset2] & 0x7f) << 24) |
      ((hmac[offset2 + 1] & 0xff) << 16) |
      ((hmac[offset2 + 2] & 0xff) << 8) |
      (hmac[offset2 + 3] & 0xff);
    
    const otp = (binary % Math.pow(10, digits)).toString().padStart(digits, "0");
    
    if (otp === token) {
      return true;
    }
  }

  return false;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { token, isSetup } = await req.json();
    if (!token || token.length !== 6) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify user
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get TOTP secret using service role
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    const { data: totpData, error: totpError } = await supabaseAdmin
      .from("admin_totp_secrets")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (totpError || !totpData) {
      return new Response(JSON.stringify({ error: "2FA not setup" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify the TOTP token
    const isValid = await verifyTOTP(totpData.encrypted_secret, token);

    if (!isValid) {
      return new Response(JSON.stringify({ error: "Invalid code" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // If this is initial setup, mark as verified
    if (isSetup && !totpData.is_verified) {
      await supabaseAdmin
        .from("admin_totp_secrets")
        .update({ is_verified: true })
        .eq("user_id", user.id);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
