import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Calendar, Linkedin, Twitter, Instagram, Youtube } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { validateEmail, isValidName, isValidMessage, isValidPhone } from "@/lib/spam-detection";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100).refine(v => isValidName(v).valid, v => ({ message: isValidName(v).reason || "Invalid name" })),
  email: z.string().trim().email("Invalid email").max(255).refine(v => validateEmail(v).valid, v => ({ message: validateEmail(v).reason || "Invalid email" })),
  phone: z.string().trim().max(20).optional().refine(v => !v || isValidPhone(v).valid, v => ({ message: isValidPhone(v || '').reason || "Invalid phone" })),
  message: z.string().trim().min(1, "Message is required").max(2000).refine(v => isValidMessage(v).valid, v => ({ message: isValidMessage(v).reason || "Invalid message" })),
});

const Connect = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (honeypot) {
      toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
      setIsSubmitting(false);
      return;
    }
    try {
      const validatedData = formSchema.parse(formData);
      const { data, error } = await supabase.functions.invoke('send-connect-message', { body: { ...validatedData, _hp: honeypot } });
      if (error) throw error;
      if (data?.error) {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      } else {
        toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error instanceof z.ZodError ? error.errors[0].message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">Connect Line</h1>
            <p className="text-xl text-muted-foreground">
              Let's build your next growth system together
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-slide-up">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Get In Touch</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Ready to transform your real estate brand with AI-powered content and
                automated marketing systems? We're here to help you every step of the way.
              </p>

              <div className="space-y-6">
                <a href="mailto:vansh@createmedia.pro" className="block">
                  <div className="depth-card p-6 cursor-pointer">
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="depth-icon flex-shrink-0">
                        <Mail size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 text-white">Email</h3>
                        <p className="depth-text">vansh@createmedia.pro</p>
                      </div>
                    </div>
                  </div>
                </a>

                <a href="https://calendly.com/createmedia22/appointment" target="_blank" rel="noopener noreferrer" className="block">
                  <div className="depth-card p-6 cursor-pointer">
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="depth-icon flex-shrink-0">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 text-white">Schedule a Meeting</h3>
                        <p className="depth-text">Book an appointment</p>
                      </div>
                    </div>
                  </div>
                </a>

                <div>
                  <h3 className="font-semibold mb-4 text-foreground">Follow Us</h3>
                  <div className="flex gap-4">
                    {[
                      { icon: Linkedin, href: "https://www.linkedin.com/company/createmedia-pro/" },
                      { icon: Twitter, href: "https://x.com/CREATEMEDIA225" },
                      { icon: Instagram, href: "https://www.instagram.com/createmedia22?igsh=MThnemR0MTV5bTNrdQ==" },
                      { icon: Youtube, href: "https://www.youtube.com/@CREATEMEDIA-cd6wx" },
                    ].map(({ icon: Icon, href }) => (
                      <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="depth-icon w-12 h-12">
                        <Icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="depth-card p-8 animate-slide-up">
              <h3 className="text-2xl font-bold mb-6 text-white relative z-10">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="absolute opacity-0 -z-10" aria-hidden="true" tabIndex={-1}>
                  <input type="text" name="website_url" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                </div>

                <div>
                  <Label htmlFor="name" className="text-white/80">Name *</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/40" placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white/80">Email *</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/40" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white/80">Phone</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/40" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-white/80">Message *</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required className="mt-2 min-h-32 bg-white/10 border-white/20 text-white placeholder:text-white/40" placeholder="Tell us about your project..." />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (<><LoadingSpinner size="sm" className="mr-2" />Sending...</>) : ("Send Message")}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Connect;
