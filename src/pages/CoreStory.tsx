import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Eye, Share2, ArrowRight } from "lucide-react";

const CoreStory = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">
              The Philosophy
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">Core Story</h1>
            <p className="text-xl text-muted-foreground">
              Why we built a distribution-first system for real estate brands
            </p>
          </div>

          <div className="space-y-16 animate-slide-up">
            {/* The Problem */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">The Problem We Saw</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Most real estate creators and podcast hosts operate the same way: record content, 
                edit it, upload it, and hope the algorithm picks it up. They invest thousands of 
                dollars in production quality while ignoring the only thing that matters—distribution.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Traditional agencies promise reach but deliver vanity metrics. They optimize for 
                engagement rates on content that nobody sees. They call it "organic growth" while 
                their clients wait months for traction that never compounds.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We saw the same pattern everywhere: great content sitting at 200 views while 
                mediocre content from competitors with distribution networks hit millions.
              </p>
            </div>

            {/* The Core Belief */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Target, title: "Precision Over Volume", desc: "We target the exact borrower or realtor niche before creating a single piece of content. Clarity at this stage dictates scale later." },
                { icon: Eye, title: "Engineered Visibility", desc: "\"Organic\" reach today is manufactured, not accidental. We build the infrastructure that makes content appear everywhere simultaneously." },
                { icon: Share2, title: "Leverage Over Patience", desc: "We leverage existing attention from established theme pages instead of waiting years for algorithms to favor us." },
              ].map((item) => (
                <div key={item.title} className="depth-card p-6">
                  <div className="depth-icon mb-4 relative z-10">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 depth-title relative z-10">{item.title}</h3>
                  <p className="depth-text relative z-10">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* The Contrast */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">How We're Different</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="depth-card p-6" style={{ background: 'linear-gradient(160deg, hsl(220, 20%, 15%) 0%, hsl(220, 20%, 11%) 100%)' }}>
                  <h3 className="text-xl font-semibold mb-4 text-white/60 relative z-10">Traditional Agencies</h3>
                  <ul className="space-y-3 text-white/60 relative z-10">
                    {["Create content and hope it performs", "Focus on production quality over reach", "Report engagement rates on invisible content", "Wait for organic growth to happen"].map(t => (
                      <li key={t} className="flex items-start gap-2"><span className="opacity-60">•</span>{t}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="depth-card p-6">
                  <h3 className="text-xl font-semibold mb-4 text-white relative z-10">CREATE MEDIA</h3>
                  <ul className="space-y-3 depth-text relative z-10">
                    {["Engineer distribution before content drops", "Build pre-hype with cinematic trailers", "Deploy through fan pages and curator networks", "Leverage existing attention for immediate spikes"].map(t => (
                      <li key={t} className="flex items-start gap-2"><span className="text-white">•</span>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* The Result */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">The Compounding Effect</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                When you control distribution, every piece of content builds on the last. 
                Views compound. Recognition compounds. Inbound leads compound.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                This is not about one viral clip. It's about building a system where your 
                real estate brand shows up everywhere your target audience looks—consistently, 
                predictably, at scale.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We've generated millions of views for real estate podcasts and personal brands 
                using this exact framework. The system works because it treats content as an 
                asset and distribution as the weapon that deploys it.
              </p>
            </div>

            {/* CTA */}
            <div className="text-center pt-8">
              <Button size="lg" asChild>
                <Link to="/create-suite">
                  See The System In Action <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CoreStory;
