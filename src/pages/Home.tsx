import { Link } from "react-router-dom";
import { ArrowRight, Target, Film, Share2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-6">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-foreground">
              We create, repurpose,
              <br />
              <span className="text-primary">and automate</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Keeping your real estate brand visible everywhere with AI-driven content
              and automated marketing systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild>
                <Link to="/visionlab">
                  Start Your Project <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
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
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-foreground">
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
              <div
                key={step.title}
                className="depth-card p-8 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="depth-icon">
                    <step.icon size={20} />
                  </div>
                  <span className="depth-subtext font-mono text-xs">{step.step}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 depth-title relative z-10">{step.title}</h3>
                <p className="depth-text text-sm leading-relaxed relative z-10">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">What We Execute</h2>
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
                className="depth-pill p-4 text-center"
              >
                <p className="font-medium relative z-10">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="depth-cta">
            <div className="py-16 text-center relative z-10 px-6">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                Ready to scale your visibility?
              </h2>
              <p className="text-lg mb-8 text-white/85 max-w-2xl mx-auto">
                Stop uploading and hoping. Let's build a distribution system 
                that compounds attention for your real estate brand.
              </p>
              <Button size="lg" asChild>
                <Link to="/visionlab">
                  Request Custom Plan <ArrowRight className="ml-2" size={20} />
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

export default Home;
