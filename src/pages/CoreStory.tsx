import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, PenTool, Share2, ArrowRight } from "lucide-react";

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
              Make what you know impossible to ignore.
            </p>
          </div>

          <div className="space-y-16 animate-slide-up">
            {/* The Problem */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">The Problem</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Great ideas get buried in forgettable content.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                More posts don't fix that. Better ideas, told well and repeated with purpose, do.
              </p>
            </div>

            {/* The Core Belief */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Target, title: "Find the Signal", desc: "Know what you should be known for." },
                { icon: PenTool, title: "Shape the Story", desc: "Turn what you know into something worth remembering." },
                { icon: Share2, title: "Build the Presence", desc: "Show up where the right people already are." },
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
                    {["Start with a content calendar", "Measure how much gets published", "Follow trends and algorithms", "Optimize for engagement"].map(t => (
                      <li key={t} className="flex items-start gap-2"><span className="opacity-60">•</span>{t}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="depth-card p-6">
                  <h3 className="text-xl font-semibold mb-4 text-white relative z-10">CREATE MEDIA</h3>
                  <ul className="space-y-3 depth-text relative z-10">
                    {["Start with the idea", "Build around what matters", "Turn one idea into many formats", "Build recognition over time"].map(t => (
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
                One idea. Many forms. One clear identity.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                The more people see it, the less you have to explain who you are.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Be known before you need to be introduced.
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
