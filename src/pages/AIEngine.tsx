import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, Zap, Target, TrendingUp, Sparkles, ArrowRight } from "lucide-react";

const AIEngine = () => {
  const features = [
    {
      icon: Brain,
      title: "Intelligent Content Repurposing",
      description:
        "Transform a single piece of content into dozens of optimized variations across different platforms and formats, all powered by advanced AI algorithms.",
    },
    {
      icon: Zap,
      title: "Automated Workflow Systems",
      description:
        "Streamline your marketing operations with intelligent automation that handles repetitive tasks, freeing your team to focus on strategy and creativity.",
    },
    {
      icon: Target,
      title: "Predictive Analytics",
      description:
        "Leverage AI-driven insights to predict content performance, identify trends, and make data-backed decisions for your marketing strategy.",
    },
    {
      icon: Sparkles,
      title: "Smart Brand Consistency",
      description:
        "Maintain perfect brand alignment across all content with AI systems that ensure every piece matches your voice, style, and messaging guidelines.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navigation />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">AI Engine</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              AI-powered marketing and brand acceleration systems that scale your presence
              and amplify your impact
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-16 animate-slide-up">
            <Card className="bg-primary text-primary-foreground border-0">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">
                  The Future of Brand Marketing
                </h2>
                <p className="text-lg opacity-90 leading-relaxed">
                  Harness the power of artificial intelligence to transform your content
                  strategy, automate your marketing workflows, and scale your brand
                  presence across every platform—all while maintaining the authentic voice
                  that makes your brand unique.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Create IQ AI Section */}
          <div className="max-w-4xl mx-auto animate-slide-up">
            <Card className="border-2 border-primary">
              <CardContent className="p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="text-primary" size={32} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Create IQ AI</h2>
                    <p className="text-primary font-medium">
                      AI-powered intelligence for brand growth
                    </p>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Create IQ AI is our flagship artificial intelligence system designed
                  specifically for launching projects and scaling real estate brands. It
                  combines advanced machine learning algorithms with deep industry knowledge
                  to deliver intelligent automation and strategic insights.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Project Launch Intelligence</h3>
                    <p className="text-sm text-muted-foreground">
                      Automated systems that handle project launches from content creation
                      to distribution, ensuring maximum impact from day one.
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Brand Scaling Automation</h3>
                    <p className="text-sm text-muted-foreground">
                      Intelligent workflows that grow your brand presence exponentially
                      while maintaining quality and consistency.
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Content Ecosystem Management</h3>
                    <p className="text-sm text-muted-foreground">
                      AI-driven systems that create, distribute, and optimize content across
                      your entire digital ecosystem.
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Performance Optimization</h3>
                    <p className="text-sm text-muted-foreground">
                      Continuous learning algorithms that analyze results and automatically
                      optimize your marketing strategies.
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <Button size="lg" asChild>
                    <Link to="/visionlab">
                      Explore Create IQ AI <ArrowRight className="ml-2" size={20} />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIEngine;
