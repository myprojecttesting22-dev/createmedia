import { Link } from "react-router-dom";
import { ArrowRight, Target, Film, Share2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BrandMarquee from "@/components/BrandMarquee";

const Home = () => {
  const systemSteps = [
    {
      icon: Target,
      step: "01",
      title: "The Foundation",
      description: "Lock onto your exact niche. No guessing. Precision from day one.",
    },
    {
      icon: Film,
      step: "02",
      title: "The Pre-Hype",
      description: "Cinematic trailers before launch. Hooks that seed curiosity.",
    },
    {
      icon: Share2,
      step: "03",
      title: "Shadow Distribution",
      description: "Fan pages. Curator networks. Engineered reach at scale.",
    },
    {
      icon: Rocket,
      step: "04",
      title: "The Multiplier",
      description: "Leverage existing audiences. Immediate spikes, not slow growth.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              We create, repurpose,
              <br />
              <span className="text-primary">and automate</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Keeping your real estate brand visible everywhere with AI-driven content
              and automated marketing systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="liquid-glass" asChild>
                <Link to="/visionlab">
                  Start Your Project <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button size="lg" variant="liquid-glass" asChild>
                <Link to="/core-story">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Marquee */}
      <BrandMarquee />

      {/* System Introduction */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              We don't hope for attention
              <br />
              <span className="text-primary">We control it</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A proven 4-step system behind millions of views
              <br />
              for real estate podcasts and brands.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Step System Grid */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemSteps.map((step, index) => (
              <Card
                key={step.title}
                className="liquid-glass-element liquid-glass-element--dark hover-lift border-border"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-8 pb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <step.icon className="text-primary" size={20} />
                    </div>
                    <span className="text-primary/40 font-mono text-xs">{step.step}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="liquid-glass" size="lg" asChild>
              <Link to="/create-suite">
                See How It Works <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What We Execute */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Execute</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every service exists to power the system. Nothing is random.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              "Podcast Editing",
              "Shorts & Reels",
              "Cinematic Trailers",
              "Thumbnail Curation",
              "SEO Optimization",
              "Script Creation",
              "Platform Optimization",
              "Distribution Network",
            ].map((service) => (
              <div
                key={service}
                className="p-4 liquid-glass-element liquid-glass-element--dark rounded-lg text-center"
              >
                <p className="text-foreground/90 font-medium">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <Card className="liquid-glass text-white border-0">
            <CardContent className="py-16 text-center relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Ready to scale your visibility?
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Stop uploading and hoping. Let's build a distribution system 
                that compounds attention for your real estate brand.
              </p>
              <Button size="lg" variant="liquid-glass" asChild>
                <Link to="/visionlab">
                  Request Custom Plan <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;