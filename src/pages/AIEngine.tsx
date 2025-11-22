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
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              AI-powered marketing and brand acceleration systems that scale your presence
              and amplify your impact
            </p>
          </div>

          {/* Video Showcase Section */}
          <div className="max-w-4xl mx-auto mb-16 animate-slide-up">
            <h2 className="text-3xl font-bold text-center mb-8">See AI in Action</h2>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">AI-Powered Content Creation</h3>
                  <div className="aspect-video w-full">
                    <iframe
                      className="w-full h-full rounded-lg"
                      src="https://www.youtube.com/embed/h44f2F-Exlk"
                      title="AI-Powered Content Creation"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Brand Automation Systems</h3>
                  <div className="aspect-video w-full">
                    <iframe
                      className="w-full h-full rounded-lg"
                      src="https://www.youtube.com/embed/Fx5zzSHWuSk"
                      title="Brand Automation Systems"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">AI-Driven Marketing Solutions</h3>
                  <div className="aspect-video w-full">
                    <iframe
                      className="w-full h-full rounded-lg"
                      src="https://www.youtube.com/embed/d52o9NeyqII"
                      title="AI-Driven Marketing Solutions"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Smart Brand Intelligence</h3>
                  <div className="aspect-video w-full">
                    <iframe
                      className="w-full h-full rounded-lg"
                      src="https://www.youtube.com/embed/u56UXYHGGRU"
                      title="Smart Brand Intelligence"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Advanced AI Analytics</h3>
                  <div className="aspect-video w-full">
                    <iframe
                      className="w-full h-full rounded-lg"
                      src="https://www.youtube.com/embed/sLCt44xf_PI"
                      title="Advanced AI Analytics"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16 animate-slide-up">
            <Card className="liquid-glass text-white border-0">
              <CardContent className="p-12 text-center relative z-10">
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
          <div className="max-w-6xl mx-auto animate-slide-up">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="text-primary" size={32} />
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold">Create IQ AI</h2>
                    <p className="text-primary font-medium text-lg">
                      Premium intelligence for real estate dominance
                    </p>
                  </div>
                </div>

                <p className="text-xl text-foreground mb-12 leading-relaxed max-w-3xl">
                  Built for brands that refuse to blend in. Create IQ AI transforms how real estate leaders launch, scale, and dominate their markets. Pure intelligence. Zero compromise.
                </p>

                {/* Product Pillars */}
                <div className="space-y-8">
                  {/* Human Clone Studio */}
                  <div className="p-8 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 blur-3xl" />
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold mb-4" style={{ textShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>
                        HUMAN CLONE STUDIO
                      </h3>
                      <p className="text-lg text-foreground/90 leading-relaxed">
                        Photorealistic AI avatars with voice cloning technology. Your presence, multiplied across every platform, building trust at scale.
                      </p>
                    </div>
                  </div>

                  {/* Follow-Through Automation */}
                  <div className="p-8 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 blur-3xl" />
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold mb-4" style={{ textShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>
                        FOLLOW-THROUGH AUTOMATION
                      </h3>
                      <p className="text-lg text-foreground/90 leading-relaxed">
                        Intelligent message campaigns that never miss. Precision follow-ups that convert prospects into clients while you focus on closing.
                      </p>
                    </div>
                  </div>

                  {/* Creator Distribution Network */}
                  <div className="p-8 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 blur-3xl" />
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold mb-4" style={{ textShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>
                        CREATOR DISTRIBUTION NETWORK
                      </h3>
                      <p className="text-lg text-foreground/90 leading-relaxed">
                        Exclusive access to elite content creators and clippers. Strategic distribution that protects your brand while maximizing reach.
                      </p>
                    </div>
                  </div>

                  {/* Visual Intelligence Suite */}
                  <div className="p-8 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 blur-3xl" />
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold mb-4" style={{ textShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>
                        VISUAL INTELLIGENCE SUITE
                      </h3>
                      <p className="text-lg text-foreground/90 leading-relaxed">
                        Full-spectrum AI content generation: 3D renders, cinematic video, infographics, social posts. Every visual engineered for brand impact.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-12">
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
