import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Zap, TrendingUp, DollarSign, Briefcase, Users } from "lucide-react";

const TYPEFORM_URL = "https://form.typeform.com/to/your-form-id";

const SnapCuts = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
  };

  const benefits = [
    {
      icon: Zap,
      title: "Consistent paid work",
      description: "No client chasing. Steady projects delivered to you.",
    },
    {
      icon: TrendingUp,
      title: "High-demand formats",
      description: "Real estate content that converts views into inquiries.",
    },
    {
      icon: DollarSign,
      title: "Earn per SnapCut",
      description: "Get paid for each piece plus performance boosts.",
    },
    {
      icon: Briefcase,
      title: "Portfolio growth",
      description: "Your work pushes real brands forward. Build your reel.",
    },
    {
      icon: Users,
      title: "A real community",
      description: "Built for long-term momentum, not gig scraps.",
    },
  ];

  const snapperTypes = [
    "Short-form specialists",
    "Reels/TikTok cutters",
    "Motion enhancement",
    "Light graphics work",
    "Social page distributors",
  ];

  const steps = [
    {
      step: 1,
      title: "Receive Raw Footage",
      description: "We deliver long-form footage from brokers & agents directly to you.",
    },
    {
      step: 2,
      title: "Craft SnapCuts",
      description: "You turn moments into SnapCuts optimized for speed and attention.",
    },
    {
      step: 3,
      title: "Get Paid",
      description: "SnapCuts get distributed across our network — and you get paid.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#000000]">
      <Navigation />

      {/* Hero Section */}
      <section
        id="hero"
        ref={setRef("hero")}
        className={`relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 transition-all duration-1000 ${
          visibleSections.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{
          background: "linear-gradient(180deg, #000000 0%, #0A0A0A 100%)",
        }}
      >
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            SnapCuts: Powering Real Estate's
            <br />
            <span className="text-primary">Fastest Rising Brands</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#B4B4B4] max-w-3xl mx-auto mb-10 leading-relaxed">
            Join the Snapper network — a high-performance group turning raw moments into feeds that attract buyers, build authority, and generate momentum daily.
          </p>

          <a
            href={TYPEFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,173,247,0.5)]"
            style={{
              background: "linear-gradient(135deg, hsl(198 100% 40%) 0%, hsl(198 100% 48%) 100%)",
              boxShadow: "0 0 30px rgba(0,173,247,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
              border: "1px solid rgba(0,173,247,0.4)",
            }}
          >
            Become a Snapper
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      {/* Opportunity Panel */}
      <section
        id="opportunity"
        ref={setRef("opportunity")}
        className={`py-24 px-4 transition-all duration-1000 delay-100 ${
          visibleSections.has("opportunity") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ background: "#0A0A0A" }}
      >
        <div className="max-w-5xl mx-auto">
          <div
            className="relative rounded-2xl p-8 md:p-12 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(10,10,10,0.9) 0%, rgba(0,173,247,0.08) 100%)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(0,173,247,0.2)",
              boxShadow: "0 0 60px rgba(0,173,247,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Glow edge effect */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
              background: "linear-gradient(135deg, transparent 40%, rgba(0,173,247,0.15) 100%)",
            }} />
            
            <div className="relative z-10">
              <p className="text-xl md:text-2xl text-[#B4B4B4] leading-relaxed mb-6">
                Real estate needs constant visibility — more reach, more inquiries, more trust.
                <span className="text-white font-medium"> SnapCuts</span> help brokers and agents stay active in the feed every day, driving attention that turns into real sales.
              </p>
              <p className="text-xl md:text-2xl text-primary font-semibold">
                Snappers become the force behind that growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section
        id="benefits"
        ref={setRef("benefits")}
        className={`py-24 px-4 transition-all duration-1000 delay-200 ${
          visibleSections.has("benefits") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ background: "#000000" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
            Why Join the <span className="text-primary">Snapper</span> Network
          </h2>
          <p className="text-[#B4B4B4] text-center mb-16 text-lg">
            Built for those who move fast and deliver impact.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="group relative rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
                style={{
                  background: "linear-gradient(135deg, rgba(15,15,15,0.9) 0%, rgba(0,173,247,0.05) 100%)",
                  backdropFilter: "blur(25px)",
                  border: "1px solid rgba(0,173,247,0.15)",
                  boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                  boxShadow: "0 0 40px rgba(0,173,247,0.2), inset 0 0 20px rgba(0,173,247,0.05)",
                }} />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{
                    background: "linear-gradient(135deg, rgba(0,173,247,0.2) 0%, rgba(0,173,247,0.1) 100%)",
                    border: "1px solid rgba(0,173,247,0.3)",
                  }}>
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-[#B4B4B4]">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        ref={setRef("how-it-works")}
        className={`py-24 px-4 transition-all duration-1000 delay-300 ${
          visibleSections.has("how-it-works") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ background: "#0A0A0A" }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
            How <span className="text-primary">SnapCuts</span> Works
          </h2>
          <p className="text-[#B4B4B4] text-center mb-16 text-lg">
            Three steps. Zero complexity.
          </p>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 z-0" style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(0,173,247,0.4) 20%, rgba(0,173,247,0.4) 80%, transparent 100%)",
              boxShadow: "0 0 20px rgba(0,173,247,0.3)",
            }} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
              {steps.map((item, index) => (
                <div key={item.step} className="relative flex flex-col items-center text-center">
                  {/* Circle */}
                  <div
                    className="relative w-24 h-24 rounded-full flex items-center justify-center mb-6 z-10 transition-all duration-500 hover:scale-110"
                    style={{
                      background: "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,173,247,0.15) 100%)",
                      backdropFilter: "blur(20px)",
                      border: "2px solid rgba(0,173,247,0.4)",
                      boxShadow: "0 0 40px rgba(0,173,247,0.2), inset 0 0 20px rgba(0,173,247,0.1)",
                    }}
                  >
                    {/* Inner glow ring */}
                    <div className="absolute inset-2 rounded-full" style={{
                      background: "radial-gradient(circle, rgba(0,173,247,0.15) 0%, transparent 70%)",
                    }} />
                    <span className="text-3xl font-bold text-primary relative z-10">{item.step}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-[#B4B4B4] max-w-xs">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Become a Snapper */}
      <section
        id="who"
        ref={setRef("who")}
        className={`py-24 px-4 transition-all duration-1000 delay-400 ${
          visibleSections.has("who") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ background: "#000000" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Who Can Become a <span className="text-primary">Snapper</span>
          </h2>
          <p className="text-[#B4B4B4] mb-12 text-lg">
            If you cut fast and think in attention spans, you belong here.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {snapperTypes.map((type, index) => (
              <div
                key={type}
                className="px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, rgba(20,20,20,0.9) 0%, rgba(0,173,247,0.1) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(0,173,247,0.25)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {type}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Panel */}
      <section
        id="vision"
        ref={setRef("vision")}
        className={`py-32 px-4 transition-all duration-1000 delay-500 ${
          visibleSections.has("vision") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ background: "#0A0A0A" }}
      >
        <div className="max-w-5xl mx-auto">
          <div
            className="relative rounded-3xl p-12 md:p-16 text-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(5,5,5,0.95) 0%, rgba(0,173,247,0.08) 100%)",
              backdropFilter: "blur(40px)",
              border: "1px solid rgba(0,173,247,0.2)",
              boxShadow: "0 0 80px rgba(0,173,247,0.1)",
            }}
          >
            {/* Subtle reflection */}
            <div className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none" style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)",
            }} />
            
            <div className="relative z-10">
              <p className="text-2xl md:text-4xl font-light text-white leading-relaxed mb-6">
                <span className="text-primary font-semibold">SnapCuts</span> turn raw footage into energy.
              </p>
              <p className="text-2xl md:text-4xl font-light text-white leading-relaxed">
                <span className="text-primary font-semibold">Snappers</span> turn that energy into reach, influence, and inbound demand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        id="final-cta"
        ref={setRef("final-cta")}
        className={`py-20 px-4 transition-all duration-1000 delay-600 ${
          visibleSections.has("final-cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ background: "#000000" }}
      >
        <div className="max-w-4xl mx-auto">
          <div
            className="relative rounded-2xl p-8 md:p-12 text-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(10,10,10,0.9) 0%, rgba(0,173,247,0.1) 100%)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(0,173,247,0.25)",
              boxShadow: "0 0 50px rgba(0,173,247,0.15)",
            }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Ready to join the <span className="text-primary">Snapper</span> network?
            </h3>

            <a
              href={TYPEFORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,173,247,0.5)]"
              style={{
                background: "linear-gradient(135deg, hsl(198 100% 40%) 0%, hsl(198 100% 48%) 100%)",
                boxShadow: "0 0 30px rgba(0,173,247,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                border: "1px solid rgba(0,173,247,0.4)",
              }}
            >
              Become a Snapper
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SnapCuts;
