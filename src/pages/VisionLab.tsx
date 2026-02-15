import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { validateEmail, isValidName, isValidMessage, isValidCompany } from "@/lib/spam-detection";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100).refine(v => isValidName(v).valid, v => ({ message: isValidName(v).reason || "Invalid name" })),
  email: z.string().trim().email("Invalid email").max(255).refine(v => validateEmail(v).valid, v => ({ message: validateEmail(v).reason || "Invalid email" })),
  company: z.string().trim().min(1, "Company is required").max(100).refine(v => isValidCompany(v).valid, v => ({ message: isValidCompany(v).reason || "Invalid company" })),
  description: z.string().trim().min(1, "Description is required").max(2000).refine(v => isValidMessage(v).valid, v => ({ message: isValidMessage(v).reason || "Invalid description" })),
});

const VisionLab = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (honeypot) {
      toast({ title: "Request Submitted!", description: "We'll contact you shortly to discuss your custom plan." });
      setIsSubmitting(false);
      return;
    }

    try {
      const validatedData = formSchema.parse(formData);
      const { data, error } = await supabase.functions.invoke('send-visionlab-request', {
        body: { ...validatedData, _hp: honeypot },
      });
      if (error) throw error;
      if (data?.error) {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      } else {
        toast({ title: "Request Submitted!", description: "We'll contact you shortly to discuss your custom plan." });
        setFormData({ name: "", email: "", company: "", description: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error instanceof z.ZodError ? error.errors[0].message : "Failed to submit request. Please try again.",
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
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">VisionLab</h1>
            <p className="text-xl text-muted-foreground">
              Custom creative solutions tailored to your brand's unique vision
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="animate-slide-up">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Transform Your Vision Into Reality
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Every brand has a unique story to tell. VisionLab is where we bring your
                creative vision to life through custom projects designed specifically for
                your needs.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: "Tailored Solutions", desc: "Custom content strategies designed around your brand's goals and target audience." },
                  { title: "Expert Collaboration", desc: "Work directly with our creative team to develop innovative solutions for your brand." },
                  { title: "End-to-End Support", desc: "From concept to execution, we guide you through every step of your custom project." },
                ].map((item) => (
                  <div key={item.title} className="depth-card p-4">
                    <h3 className="font-semibold mb-2 text-white relative z-10">{item.title}</h3>
                    <p className="text-sm depth-text relative z-10">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="depth-card p-8 animate-slide-up">
              <h3 className="text-2xl font-bold mb-6 text-white relative z-10">Request Your Custom Plan</h3>
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="absolute opacity-0 -z-10" aria-hidden="true" tabIndex={-1}>
                  <input type="text" name="website_url" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                </div>

                <div>
                  <Label htmlFor="name" className="text-white/80">Name *</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/40" placeholder="John Doe" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white/80">Email *</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/40" placeholder="john@example.com" />
                </div>
                <div>
                  <Label htmlFor="company" className="text-white/80">Company *</Label>
                  <Input id="company" name="company" value={formData.company} onChange={handleChange} required className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/40" placeholder="Your Real Estate Company" />
                </div>
                <div>
                  <Label htmlFor="description" className="text-white/80">Project Description *</Label>
                  <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required className="mt-2 min-h-32 bg-white/10 border-white/20 text-white placeholder:text-white/40" placeholder="Tell us about your project goals..." />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
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

export default VisionLab;
