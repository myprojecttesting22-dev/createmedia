import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Film, Share2, Rocket, ArrowRight } from "lucide-react";

const CreateSuite = () => {
  const systemPhases = [
    {
      icon: Target,
      step: "01",
      title: "Find the Signal",
      subtitle: "Know what you're worth hearing for.",
      description:
        "We find the ideas, perspectives and stories your audience should associate with you.",
      services: ["Research", "Positioning", "Content Direction"],
    },
    {
      icon: Film,
      step: "02",
      title: "Shape the Story",
      subtitle: "Make the idea worth staying for.",
      description:
        "Podcasts, films, shorts and writing — built around the story, not the format.",
      services: ["Podcasts", "Shorts", "Films", "Writing", "Thumbnails"],
    },
    {
      icon: Share2,
      step: "03",
      title: "Build the Presence",
      subtitle: "Put the right ideas in the right places.",
      description:
        "Every piece is adapted for where people actually discover, watch, read and search.",
      services: ["Distribution", "Search", "Platform Strategy"],
    },
    {
      icon: Rocket,
      step: "04",
      title: "Compound It",
      subtitle: "One idea becomes a body of work.",
      description:
        "A conversation becomes a podcast. A podcast becomes clips. Clips become stories. Each one reinforces the same idea.",
      services: ["Repurposing", "Distribution", "Partnerships", "Performance"],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-12 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in max-w-4xl mx-auto">
            <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">
              The System
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">Create Suite</h1>
            <p className="text-xl text-muted-foreground">
              One idea should do more than become one post. We find what matters, shape it, and carry it across every format and place that matters.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-16">
            {systemPhases.map((phase, index) => (
              <div
                key={phase.title}
                className="depth-card animate-slide-up overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Phase Header */}
                <div className="p-8 md:p-10 border-b border-white/10 relative z-10">
                  <div className="flex items-start gap-6">
                    <div className="depth-icon w-16 h-16 flex-shrink-0">
                      <phase.icon size={32} />
                    </div>
                    <div>
                      <p className="text-white/60 font-mono text-sm mb-1">{phase.step}</p>
                      <h2 className="text-3xl font-bold mb-1 text-white">{phase.title}</h2>
                      <p className="text-white/60 font-medium">{phase.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Phase Content */}
                <div className="p-8 md:p-10 relative z-10">
                  <p className="text-lg depth-text leading-relaxed mb-8">
                    {phase.description}
                  </p>

                  <div>
                    <h3 className="font-semibold mb-3 text-white/50 text-sm uppercase tracking-wide">
                      What This Includes
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {phase.services.map((service) => (
                        <span
                          key={service}
                          className="depth-pill px-3 py-1.5 text-sm"
                        >
                          <span className="relative z-10">{service}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-6 text-lg">
              One idea. Many forms. One clear identity.
            </p>
            <Button size="lg" asChild>
              <Link to="/visionlab">
                Build Your Presence <ArrowRight className="ml-2" size={20} />
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
