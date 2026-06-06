import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const rateLimitMap = new Map<string, { count: number; firstAttempt: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const MAX_REQUESTS = 3;

function getClientIP(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.firstAttempt > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, firstAttempt: now });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count++;
  return true;
}

interface Application {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  _hp?: string;
}

const QUESTIONS = [
  "What outcome are you trying to achieve over the next 12 months?",
  "What's preventing you from getting there today?",
  "What have you already invested in content, marketing, or podcast growth?",
  "Why is now the right time to solve this?",
];

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const ip = getClientIP(req);

  try {
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many submissions. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    const data: Application = await req.json();
    if (data._hp) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const answers = [data.q1, data.q2, data.q3, data.q4];
    for (const a of answers) {
      if (!a || a.trim().length < 50 || a.length > 1000) {
        return new Response(
          JSON.stringify({ error: "Each answer must be 50-1000 characters." }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } },
        );
      }
    }

    const rows = QUESTIONS.map(
      (q, i) => `
        <div style="margin-bottom:24px;padding:16px;background:#f9f9f9;border-left:4px solid #02AAF5;border-radius:6px;">
          <div style="font-weight:600;color:#02AAF5;margin-bottom:8px;font-size:14px;">Q${i + 1}. ${q}</div>
          <div style="color:#222;white-space:pre-wrap;line-height:1.6;">${answers[i].replace(/</g, "&lt;")}</div>
        </div>`,
    ).join("");

    await resend.emails.send({
      from: "Create Media <onboarding@resend.dev>",
      to: ["vanshhingmire22@gmail.com"],
      subject: "New Create Media Application",
      html: `
        <!DOCTYPE html>
        <html><body style="font-family:Arial,sans-serif;background:#0a0a0a;padding:24px;">
          <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#02AAF5,#0066cc);color:#fff;padding:24px;">
              <h2 style="margin:0;">New Application Submitted</h2>
              <p style="margin:6px 0 0;opacity:.9;font-size:14px;">Create Media — Connect Line</p>
            </div>
            <div style="padding:24px;">${rows}</div>
          </div>
        </body></html>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("send-application error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  }
};

serve(handler);
