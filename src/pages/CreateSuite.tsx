import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Film, Share2, Rocket, ArrowRight } from "lucide-react";

const CreateSuite = () => {
  const systemPhases = [
    {
      icon: Target,
      step: "Step 01",
      title: "The Foundation",
      subtitle: "Precision Targeting",
      description:
        "Most creators fail because they're too broad. They speak to everyone and connect with no one. We start by identifying your exact borrower or realtor niche—the specific audience segment that will convert into clients, referrals, and long-term brand equity.",
      details: [
        "We analyze your market position and competitive landscape",
        "We define the exact demographic, psychographic, and behavioral profile of your ideal viewer",
        "We establish content themes that resonate specifically with that audience",
        "We create a targeting framework that guides every piece of content we produce",
      ],
      outcome: "Clarity at this stage dictates scale later. Every decision downstream becomes easier when you know exactly who you're reaching.",
      services: ["Niche Research", "Audience Profiling", "Content Strategy", "Competitive Analysis"],
    },
    {
      icon: Film,
      step: "Step 02",
      title: "The Pre-Hype",
      subtitle: "Cinematic Trailers & Content Preparation",
      description:
        "Uploading a full podcast episode without pre-hype is like opening a restaurant without telling anyone. We extract the highest-impact moments from your content and cut them into cinematic trailers that seed curiosity before your main content drops.",
      details: [
        "We identify the most compelling 15-60 second moments from each piece of content",
        "We craft hooks that stop the scroll—questions, bold statements, unexpected reveals",
        "We design thumbnails engineered for click-through, not just aesthetics",
        "We control pacing and editing rhythm to maximize watch time and shares",
      ],
      outcome: "When your main content drops, your audience is already primed. They've seen the trailer. They know what's coming. They're waiting for it.",
      services: ["Podcast Editing", "Trailer Production", "Thumbnail Curation", "Hook Writing", "Script Creation"],
    },
    {
      icon: Share2,
      step: "Step 03",
      title: "Shadow Distribution",
      subtitle: "Manufactured Organic Buzz",
      description:
        "Here's the truth most agencies won't tell you: 'organic' reach in 2024 is engineered, not accidental. We manufacture buzz through controlled distribution networks—fan pages, viral curators, and content syndicators that make your brand appear everywhere simultaneously.",
      details: [
        "We deploy content through a network of real estate-focused fan pages and curators",
        "We simulate mass conversation around your brand across multiple touchpoints",
        "We time releases for maximum algorithmic advantage on each platform",
        "We optimize short-form content specifically for each platform's distribution mechanics",
      ],
      outcome: "Your content doesn't just get posted—it gets distributed. The difference is millions of views versus hundreds.",
      services: ["SnapCuts Network", "Platform Optimization", "Distribution Timing", "Multi-Platform Syndication"],
    },
    {
      icon: Rocket,
      step: "Step 04",
      title: "The Multiplier",
      subtitle: "Leverage Over Patience",
      description:
        "Why wait years to build an audience when you can leverage audiences that already exist? We partner with established real estate theme pages to place your content directly in front of engaged, relevant viewers. This creates immediate attention spikes instead of slow, uncertain growth.",
      details: [
        "We identify and negotiate with top real estate theme pages in your niche",
        "We structure the funnel: theme page traffic → clips → podcast → brand",
        "We track conversion paths from initial view to meaningful engagement",
        "We scale what works and cut what doesn't—fast iteration, not guesswork",
      ],
      outcome: "Leverage beats patience. One strategic placement can generate more qualified attention than months of organic posting.",
      services: ["Theme Page Partnerships", "Funnel Strategy", "Performance Tracking", "SEO Optimization"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navigation />
      
      <section className="pt-32 pb-12 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in max-w-4xl mx-auto">
            <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">
              The System
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Create Suite</h1>
            <p className="text-xl text-muted-foreground">
              Every service exists to power the system. Nothing is random. Here's exactly 
              how we generate millions of views for real estate podcasts and personal brands.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-16">
            {systemPhases.map((phase, index) => (
              <Card
                key={phase.title}
                className="liquid-glass-element liquid-glass-element--dark hover-lift animate-slide-up overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  {/* Phase Header */}
                  <div className="p-8 md:p-10 border-b border-border/50">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <phase.icon className="text-primary" size={32} />
                      </div>
                      <div>
                        <p className="text-primary font-mono text-sm mb-1">{phase.step}</p>
                        <h2 className="text-3xl font-bold mb-1">{phase.title}</h2>
                        <p className="text-muted-foreground font-medium">{phase.subtitle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Phase Content */}
                  <div className="p-8 md:p-10">
                    <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                      {phase.description}
                    </p>

                    <div className="mb-8">
                      <h3 className="font-semibold mb-4 text-foreground">How We Execute:</h3>
                      <ul className="space-y-3">
                        {phase.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                            <span className="text-foreground/80">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 mb-8">
                      <p className="text-foreground/90">
                        <span className="font-semibold text-primary">The Outcome: </span>
                        {phase.outcome}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 text-muted-foreground text-sm uppercase tracking-wide">
                        Services In This Phase
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {phase.services.map((service) => (
                          <span
                            key={service}
                            className="px-3 py-1.5 rounded-full bg-muted text-foreground/80 text-sm"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-6 text-lg">
              Content is the asset. Distribution is the weapon.
            </p>
            <Button size="lg" variant="liquid-glass" asChild>
              <Link to="/visionlab">
                Build Your System <ArrowRight className="ml-2" size={20} />
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