import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VisionLabRequest {
  name: string;
  email: string;
  company: string;
  description: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, description }: VisionLabRequest = await req.json();

    console.log("Processing VisionLab request:", { name, email, company });

    // Validate inputs
    if (!name || !email || !company || !description) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate input lengths
    if (name.length > 100 || email.length > 255 || company.length > 100 || description.length > 2000) {
      return new Response(
        JSON.stringify({ error: "Input exceeds maximum allowed length" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

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
                
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${name}</div>
                </div>
                
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value">${email}</div>
                </div>
                
                <div class="field">
                  <div class="label">Company:</div>
                  <div class="value">${company}</div>
                </div>
                
                <div class="field">
                  <div class="label">Project Description:</div>
                  <div class="value">${description}</div>
                </div>
                
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
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-visionlab-request function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
