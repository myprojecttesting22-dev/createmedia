import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Eye, Share2, ArrowRight } from "lucide-react";

const CoreStory = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navigation />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">
              The Philosophy
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Core Story</h1>
            <p className="text-xl text-muted-foreground">
              Why we built a distribution-first system for real estate brands
            </p>
          </div>

          <div className="space-y-16 animate-slide-up">
            {/* The Problem */}
            <div>
              <h2 className="text-3xl font-bold mb-6">The Problem We Saw</h2>
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
              <Card className="liquid-glass-element liquid-glass-element--dark hover-lift">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <Target className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Precision Over Volume</h3>
                  <p className="text-foreground/80">
                    We target the exact borrower or realtor niche before creating a single piece 
                    of content. Clarity at this stage dictates scale later.
                  </p>
                </CardContent>
              </Card>

              <Card className="liquid-glass-element liquid-glass-element--dark hover-lift">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <Eye className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Engineered Visibility</h3>
                  <p className="text-foreground/80">
                    "Organic" reach today is manufactured, not accidental. We build the 
                    infrastructure that makes content appear everywhere simultaneously.
                  </p>
                </CardContent>
              </Card>

              <Card className="liquid-glass-element liquid-glass-element--dark hover-lift">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <Share2 className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Leverage Over Patience</h3>
                  <p className="text-foreground/80">
                    We leverage existing attention from established theme pages instead of 
                    waiting years for algorithms to favor us.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* The Contrast */}
            <div>
              <h2 className="text-3xl font-bold mb-6">How We're Different</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 liquid-glass-element liquid-glass-element--dark rounded-lg border border-muted">
                  <h3 className="text-xl font-semibold mb-4 text-muted-foreground">Traditional Agencies</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground/60">•</span>
                      Create content and hope it performs
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground/60">•</span>
                      Focus on production quality over reach
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground/60">•</span>
                      Report engagement rates on invisible content
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground/60">•</span>
                      Wait for organic growth to happen
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 liquid-glass-element liquid-glass-element--dark rounded-lg border border-primary/30">
                  <h3 className="text-xl font-semibold mb-4 text-primary">CREATE MEDIA</h3>
                  <ul className="space-y-3 text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Engineer distribution before content drops
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Build pre-hype with cinematic trailers
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Deploy through fan pages and curator networks
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Leverage existing attention for immediate spikes
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* The Result */}
            <div>
              <h2 className="text-3xl font-bold mb-6">The Compounding Effect</h2>
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
              <Button size="lg" variant="liquid-glass" asChild>
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