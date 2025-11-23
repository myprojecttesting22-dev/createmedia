import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  company: z.string().trim().min(1, "Company is required").max(100, "Company must be less than 100 characters"),
  description: z.string().trim().min(1, "Description is required").max(2000, "Description must be less than 2000 characters"),
});

const VisionLab = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = formSchema.parse(formData);

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('send-visionlab-request', {
        body: validatedData,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Request Submitted!",
        description: "We'll contact you shortly to discuss your custom plan.",
      });
      setFormData({ name: "", email: "", company: "", description: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error instanceof z.ZodError 
          ? error.errors[0].message 
          : "Failed to submit request. Please try again.",
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
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">VisionLab</h1>
            <p className="text-xl text-muted-foreground">
              Custom creative solutions tailored to your brand's unique vision
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="animate-slide-up">
              <h2 className="text-3xl font-bold mb-6">
                Transform Your Vision Into Reality
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Every brand has a unique story to tell. VisionLab is where we bring your
                creative vision to life through custom projects designed specifically for
                your needs.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 liquid-glass-element liquid-glass-element--dark rounded-lg border border-primary/20">
                  <h3 className="font-semibold mb-2">Tailored Solutions</h3>
                  <p className="text-sm text-foreground/80">
                    Custom content strategies designed around your brand's goals and
                    target audience.
                  </p>
                </div>
                
                <div className="p-4 liquid-glass-element liquid-glass-element--dark rounded-lg border border-primary/20">
                  <h3 className="font-semibold mb-2">Expert Collaboration</h3>
                  <p className="text-sm text-foreground/80">
                    Work directly with our creative team to develop innovative solutions
                    for your brand.
                  </p>
                </div>
                
                <div className="p-4 liquid-glass-element liquid-glass-element--dark rounded-lg border border-primary/20">
                  <h3 className="font-semibold mb-2">End-to-End Support</h3>
                  <p className="text-sm text-foreground/80">
                    From concept to execution, we guide you through every step of your
                    custom project.
                  </p>
                </div>
              </div>
            </div>

            <Card className="liquid-glass-element liquid-glass-element--dark animate-slide-up">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Request Your Custom Plan</h3>
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
                      placeholder="John Doe"
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
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company">Company *</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="mt-2"
                      placeholder="Your Real Estate Company"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Project Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className="mt-2 min-h-32"
                      placeholder="Tell us about your project goals, target audience, and any specific requirements..."
                    />
                  </div>

                  <Button type="submit" size="lg" variant="liquid-glass" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Request"}
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

export default VisionLab;
