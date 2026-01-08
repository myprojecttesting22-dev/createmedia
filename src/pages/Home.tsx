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
      description: "We identify and lock onto your exact borrower or realtor niche. No guessing. No broad targeting. Precision from day one.",
    },
    {
      icon: Film,
      step: "02",
      title: "The Pre-Hype",
      description: "We cut cinematic trailers before your content drops. Hooks, thumbnails, and pacing engineered to seed curiosity.",
    },
    {
      icon: Share2,
      step: "03",
      title: "Shadow Distribution",
      description: "We manufacture organic buzz through fan pages and viral curator networks. Engineered reach at scale.",
    },
    {
      icon: Rocket,
      step: "04",
      title: "The Multiplier",
      description: "We leverage established real estate theme pages for immediate attention spikes instead of slow growth.",
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
          <div className="text-center mb-6">
            <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">
              Distribution-First Growth System
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              We don't just edit content.
              <br />
              We engineer attention.
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Most creators upload and hope. We operate a proven 4-step system that has generated 
              millions of views for real estate podcasts and personal brands. Content is the asset. 
              Distribution is the weapon.
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
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <step.icon className="text-primary" size={24} />
                    </div>
                    <span className="text-primary/60 font-mono text-sm">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-foreground/80">{step.description}</p>
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