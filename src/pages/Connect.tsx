import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Calendar, Linkedin, Twitter, Instagram, Youtube } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone number must be less than 20 characters").optional(),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

const Connect = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = formSchema.parse(formData);

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('send-connect-message', {
        body: validatedData,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error instanceof z.ZodError 
          ? error.errors[0].message 
          : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navigation />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Connect Line</h1>
            <p className="text-xl text-muted-foreground">
              Let's build your next growth system together
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-slide-up">
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Ready to transform your real estate brand with AI-powered content and
                automated marketing systems? We're here to help you every step of the way.
              </p>

              <div className="space-y-6">
                <a 
                  href="mailto:vansh@createmedia.pro"
                  className="block transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                >
                  <Card className="liquid-glass-element liquid-glass-element--dark cursor-pointer border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Mail className="text-primary" size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Email</h3>
                          <p className="text-foreground/80">
                            vansh@createmedia.pro
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>

                <a
                  href="https://calendly.com/createmedia22/appointment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                >
                  <Card className="liquid-glass-element liquid-glass-element--dark cursor-pointer border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Calendar className="text-primary" size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Schedule a Meeting</h3>
                          <p className="text-foreground/80">
                            Book an appointment
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>

                <div>
                  <h3 className="font-semibold mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://www.linkedin.com/company/createmedia-pro/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href="https://x.com/CREATEMEDIA225"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Twitter size={20} />
                    </a>
                    <a
                      href="https://www.instagram.com/createmedia22?igsh=MThnemR0MTV5bTNrdQ=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Instagram size={20} />
                    </a>
                    <a
                      href="https://www.youtube.com/@CREATEMEDIA-cd6wx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Youtube size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Card className="liquid-glass-element liquid-glass-element--dark animate-slide-up">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-2"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-2"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-2"
                      placeholder="+1 (234) 567-890"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="mt-2 min-h-32"
                      placeholder="Tell us about your project or questions..."
                    />
                  </div>

                  <Button type="submit" size="lg" variant="liquid-glass" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Connect;
