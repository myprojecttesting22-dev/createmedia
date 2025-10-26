import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConnectMessage {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message }: ConnectMessage = await req.json();

    console.log("Processing Connect message:", { name, email, hasPhone: !!phone });

    // Validate required inputs
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate input lengths
    if (name.length > 100 || email.length > 255 || message.length > 2000) {
      return new Response(
        JSON.stringify({ error: "Input exceeds maximum allowed length" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (phone && phone.length > 20) {
      return new Response(
        JSON.stringify({ error: "Phone number is too long" }),
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
      subject: "New Contact Message from Create Media Website",
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
              .message-box { background: white; padding: 15px; border-left: 4px solid #667eea; margin-top: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">💬 New Contact Message</h2>
              </div>
              <div class="content">
                <p>You've received a new message from your website:</p>
                
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${name}</div>
                </div>
                
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value">${email}</div>
                </div>
                
                ${phone ? `
                <div class="field">
                  <div class="label">Phone:</div>
                  <div class="value">${phone}</div>
                </div>
                ` : ''}
                
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="message-box">${message}</div>
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

    console.log("Connect message email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-connect-message function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send message" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
