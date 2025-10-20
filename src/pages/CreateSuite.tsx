import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Film, Target, TrendingUp, Megaphone, Brain, ArrowRight } from "lucide-react";

const CreateSuite = () => {
  const services = [
    {
      icon: Film,
      title: "CineFlow",
      tagline: "Smooth editing experience",
      description:
        "Transform raw footage into compelling visual stories. Our editing team brings precision, creativity, and technical excellence to every project, ensuring your content captures attention and drives engagement.",
      features: [
        "Professional video editing and post-production",
        "Color grading and visual effects",
        "Motion graphics and animations",
        "Sound design and audio mixing",
      ],
    },
    {
      icon: Target,
      title: "BrandSync",
      tagline: "Aligned visual and voice identity",
      description:
        "Create a cohesive brand presence across all touchpoints. We ensure your visual identity and messaging remain consistent, building recognition and trust with your audience.",
      features: [
        "Brand strategy and positioning",
        "Visual identity system development",
        "Content style guide creation",
        "Multi-platform brand consistency",
      ],
    },
    {
      icon: TrendingUp,
      title: "ReachLift",
      tagline: "Elevates engagement organically",
      description:
        "Expand your audience reach through strategic content distribution. We optimize your content for maximum visibility and engagement across all relevant platforms.",
      features: [
        "Content distribution strategy",
        "SEO and organic reach optimization",
        "Social media growth tactics",
        "Audience engagement analysis",
      ],
    },
    {
      icon: Megaphone,
      title: "AdPulse",
      tagline: "Smart, high-converting ad system",
      description:
        "Drive measurable results with data-driven advertising campaigns. Our team creates, manages, and optimizes ads that convert viewers into clients.",
      features: [
        "Targeted ad campaign creation",
        "A/B testing and optimization",
        "Performance tracking and analytics",
        "ROI-focused strategy",
      ],
    },
    {
      icon: Brain,
      title: "Create IQ AI",
      tagline: "AI-powered intelligence",
      description:
        "Leverage cutting-edge AI technology for brand growth and project launches. Our AI systems automate content repurposing, optimize marketing workflows, and scale your brand presence efficiently.",
      features: [
        "Automated content repurposing",
        "Intelligent workflow optimization",
        "Predictive analytics and insights",
        "Smart project launch systems",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted dot-grid-bg">
      <Navigation />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Create Suite</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive services designed to amplify your real estate brand's impact
              through cutting-edge content creation and intelligent automation
            </p>
          </div>

          <div className="space-y-12">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className="hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 md:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                      <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <service.icon className="text-primary" size={32} />
                      </div>
                      <h2 className="text-3xl font-bold mb-2">{service.title}</h2>
                      <p className="text-primary font-medium">{service.tagline}</p>
                    </div>
                    
                    <div className="lg:col-span-2">
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <h3 className="font-semibold mb-3">Key Features:</h3>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/visionlab">
                Request Custom Plan <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreateSuite;
