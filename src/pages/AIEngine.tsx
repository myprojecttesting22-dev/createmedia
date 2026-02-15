import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">AI Engine</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              AI-powered marketing and brand acceleration systems that scale your presence
              and amplify your impact
            </p>
          </div>

          {/* Video Showcase Section */}
          <div className="max-w-4xl mx-auto mb-16 animate-slide-up">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">See AI in Action</h2>
            
            <div className="space-y-6">
              {[
                { title: "AI-Powered Content Creation", id: "h44f2F-Exlk" },
                { title: "Brand Automation Systems", id: "Fx5zzSHWuSk" },
                { title: "AI-Driven Marketing Solutions", id: "d52o9NeyqII" },
                { title: "Smart Brand Intelligence", id: "u56UXYHGGRU" },
                { title: "Advanced AI Analytics", id: "sLCt44xf_PI" },
              ].map((video) => (
                <div key={video.id} className="depth-card p-6">
                  <h3 className="text-2xl font-bold mb-4 depth-title relative z-10">{video.title}</h3>
                  <div className="aspect-video w-full relative z-10">
                    <iframe
                      className="w-full h-full rounded-lg"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16 animate-slide-up">
            <div className="depth-cta">
              <div className="p-12 text-center relative z-10">
                <h2 className="text-3xl font-bold mb-4 text-white">
                  The Future of Brand Marketing
                </h2>
                <p className="text-lg text-white/85 leading-relaxed">
                  Harness the power of artificial intelligence to transform your content
                  strategy, automate your marketing workflows, and scale your brand
                  presence across every platform—all while maintaining the authentic voice
                  that makes your brand unique.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="depth-card p-8 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="depth-icon mb-4 relative z-10">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 depth-title relative z-10">{feature.title}</h3>
                <p className="depth-text leading-relaxed relative z-10">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Create IQ AI Section */}
          <div className="max-w-6xl mx-auto animate-slide-up">
            <div className="depth-card p-12">
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="depth-icon w-16 h-16">
                  <TrendingUp size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-white">Create IQ AI</h2>
                  <p className="text-white/70 font-medium text-lg">
                    Premium intelligence for real estate dominance
                  </p>
                </div>
              </div>

              <p className="text-xl depth-text mb-12 leading-relaxed max-w-3xl relative z-10">
                Built for brands that refuse to blend in. Create IQ AI transforms how real estate leaders launch, scale, and dominate their markets. Pure intelligence. Zero compromise.
              </p>

              {/* Product Pillars */}
              <div className="space-y-8 relative z-10">
                {[
                  { title: "HUMAN CLONE STUDIO", desc: "Photorealistic AI avatars with voice cloning technology. Your presence, multiplied across every platform, building trust at scale." },
                  { title: "FOLLOW-THROUGH AUTOMATION", desc: "Intelligent message campaigns that never miss. Precision follow-ups that convert prospects into clients while you focus on closing." },
                  { title: "CREATOR DISTRIBUTION NETWORK", desc: "Exclusive access to elite content creators and clippers. Strategic distribution that protects your brand while maximizing reach." },
                  { title: "VISUAL INTELLIGENCE SUITE", desc: "Full-spectrum AI content generation: 3D renders, cinematic video, infographics, social posts. Every visual engineered for brand impact." },
                ].map((pillar) => (
                  <div key={pillar.title} className="p-8 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-3xl font-bold mb-4 text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-lg depth-text leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12 relative z-10">
                <Button size="lg" asChild>
                  <Link to="/visionlab">
                    Explore Create IQ AI <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIEngine;
