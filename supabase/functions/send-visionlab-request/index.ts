import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Rate limiting store (in-memory, resets on cold start)
const rateLimitMap = new Map<string, { count: number; firstAttempt: number; failures: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 2;
const MAX_FAILURES_BEFORE_BLOCK = 5;

const DISPOSABLE_DOMAINS = [
  'tempmail.com', 'throwaway.email', 'guerrillamail.com', 'mailinator.com',
  'sharklasers.com', 'grr.la', 'guerrillamailblock.com', 'pokemail.net',
  'spam4.me', 'yopmail.com', 'yopmail.fr', 'mailcatch.com', 'maildrop.cc',
  '10minutemail.com', 'guerrillamail.info', 'temp-mail.org', 'tempmailo.com',
  'emailondeck.com', 'dispostable.com', 'fakeinbox.com', 'trashmail.com',
  'trashmail.me', 'trashmail.net', 'meltmail.com', 'mintemail.com',
];

const COMMON_WORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for',
  'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by',
  'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all',
  'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get',
  'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him',
  'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them',
  'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over',
  'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first',
  'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day',
  'most', 'us', 'need', 'help', 'project', 'brand', 'content', 'media', 'video',
  'marketing', 'social', 'website', 'design', 'business', 'company', 'team', 'create',
  'real', 'estate', 'property', 'looking', 'interested', 'please', 'contact', 'more',
  'information', 'plan', 'custom', 'service', 'services', 'thanks', 'thank', 'hello',
  'hi', 'dear', 'sir', 'madam', 'regards', 'best', 'sincerely', 'am', 'are', 'is',
  'was', 'were', 'been', 'being', 'has', 'had', 'having', 'does', 'did', 'doing',
]);

function isGibberish(text: string): boolean {
  if (text.length > 8 && !text.includes(' ')) return true;
  const lower = text.toLowerCase();
  const vowels = lower.replace(/[^aeiou]/g, '').length;
  const consonants = lower.replace(/[^bcdfghjklmnpqrstvwxyz]/g, '').length;
  if (consonants > 0 && vowels > 0 && consonants / vowels > 5) return true;
  if (text.length > 5) {
    let caseChanges = 0;
    for (let i = 1; i < text.length; i++) {
      const prevUpper = text[i-1] >= 'A' && text[i-1] <= 'Z';
      const currUpper = text[i] >= 'A' && text[i] <= 'Z';
      const prevLetter = /[a-zA-Z]/.test(text[i-1]);
      const currLetter = /[a-zA-Z]/.test(text[i]);
      if (prevLetter && currLetter && prevUpper !== currUpper) caseChanges++;
    }
    if (caseChanges / text.length > 0.4) return true;
  }
  return false;
}

function countRealWords(text: string): number {
  const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  return words.filter(w => COMMON_WORDS.has(w.replace(/[^a-z]/g, ''))).length;
}

function getClientIP(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') || 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; reason?: string } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.firstAttempt > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, firstAttempt: now, failures: entry?.failures || 0 });
    return { allowed: true };
  }
  if (entry.failures >= MAX_FAILURES_BEFORE_BLOCK) {
    return { allowed: false, reason: "Too many failed attempts. Please try again later." };
  }
  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, reason: "Too many submissions. Please wait 10 minutes." };
  }
  entry.count++;
  return { allowed: true };
}

function recordFailure(ip: string) {
  const entry = rateLimitMap.get(ip);
  if (entry) entry.failures++;
}

interface VisionLabRequest {
  name: string;
  email: string;
  company: string;
  description: string;
  _hp?: string;
}

function validateRequest(data: VisionLabRequest): { valid: boolean; reason?: string } {
  const { name, email, company, description, _hp } = data;

  // Honeypot
  if (_hp) return { valid: false, reason: "Spam detected" };

  // Required fields
  if (!name || !email || !company || !description) return { valid: false, reason: "All fields are required" };

  // Length limits
  if (name.length > 100 || email.length > 255 || company.length > 100 || description.length > 2000)
    return { valid: false, reason: "Input exceeds maximum allowed length" };

  // Name validation
  if (name.length < 2) return { valid: false, reason: "Name must be at least 2 characters" };
  if (!/^[a-zA-Z\s'-]+$/.test(name)) return { valid: false, reason: "Name must contain only letters" };
  if (isGibberish(name.replace(/\s/g, ''))) return { valid: false, reason: "Please enter a valid name" };

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return { valid: false, reason: "Invalid email address" };
  const domain = email.split('@')[1]?.toLowerCase();
  if (DISPOSABLE_DOMAINS.includes(domain)) return { valid: false, reason: "Disposable emails not allowed" };
  const localPart = email.split('@')[0];
  const dotCount = (localPart.match(/\./g) || []).length;
  if (dotCount > 3) return { valid: false, reason: "Invalid email format" };
  if (localPart.length > 10 && isGibberish(localPart.replace(/\./g, '')))
    return { valid: false, reason: "Please use a valid email address" };

  // Company validation
  if (company.length < 2) return { valid: false, reason: "Company name too short" };
  if (isGibberish(company)) return { valid: false, reason: "Please enter a valid company name" };

  // Description validation
  if (description.length < 20) return { valid: false, reason: "Description must be at least 20 characters" };
  if (isGibberish(description)) return { valid: false, reason: "Please enter a meaningful description" };
  if (countRealWords(description) < 3) return { valid: false, reason: "Description must contain at least 3 recognizable words" };

  return { valid: true };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const ip = getClientIP(req);

  try {
    // Rate limit check
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      console.warn(`[SPAM-BLOCKED] Rate limit exceeded | IP: ${ip} | Reason: ${rateCheck.reason}`);
      return new Response(
        JSON.stringify({ error: rateCheck.reason }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const data: VisionLabRequest = await req.json();
    const validation = validateRequest(data);

    if (!validation.valid) {
      recordFailure(ip);
      console.warn(`[SPAM-REJECTED] VisionLab | IP: ${ip} | Reason: ${validation.reason} | Name: ${data.name?.substring(0, 20)} | Email: ${data.email?.substring(0, 30)}`);
      return new Response(
        JSON.stringify({ error: validation.reason }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { name, email, company, description } = data;
    console.log(`[VALID] VisionLab request | IP: ${ip} | Name: ${name} | Email: ${email}`);

    const emailResponse = await resend.emails.send({
      from: "Create Media <onboarding@resend.dev>",
      to: ["vansh@createmedia.pro"],
      replyTo: email,
      subject: "New VisionLab Custom Plan Request",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px; }
              .label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
              .value { color: #333; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">🎨 New VisionLab Custom Plan Request</h2>
              </div>
              <div class="content">
                <p>You've received a new custom plan request from VisionLab:</p>
                <div class="field"><div class="label">Name:</div><div class="value">${name}</div></div>
                <div class="field"><div class="label">Email:</div><div class="value">${email}</div></div>
                <div class="field"><div class="label">Company:</div><div class="value">${company}</div></div>
                <div class="field"><div class="label">Project Description:</div><div class="value">${description}</div></div>
                <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #666;">
                  You can reply directly to this email to respond to ${name}.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("VisionLab email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Request sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-visionlab-request function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send request" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
