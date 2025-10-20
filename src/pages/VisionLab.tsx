import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const VisionLab = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Submitted!",
      description: "We'll contact you shortly to discuss your custom plan.",
    });
    setFormData({ name: "", email: "", company: "", description: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted dot-grid-bg">
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
                <div className="p-4 bg-card rounded-lg border border-border">
                  <h3 className="font-semibold mb-2">Tailored Solutions</h3>
                  <p className="text-sm text-muted-foreground">
                    Custom content strategies designed around your brand's goals and
                    target audience.
                  </p>
                </div>
                
                <div className="p-4 bg-card rounded-lg border border-border">
                  <h3 className="font-semibold mb-2">Expert Collaboration</h3>
                  <p className="text-sm text-muted-foreground">
                    Work directly with our creative team to develop innovative solutions
                    for your brand.
                  </p>
                </div>
                
                <div className="p-4 bg-card rounded-lg border border-border">
                  <h3 className="font-semibold mb-2">End-to-End Support</h3>
                  <p className="text-sm text-muted-foreground">
                    From concept to execution, we guide you through every step of your
                    custom project.
                  </p>
                </div>
              </div>
            </div>

            <Card className="animate-slide-up">
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

                  <Button type="submit" size="lg" className="w-full">
                    Submit Request
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
