import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BrandMarquee from "@/components/BrandMarquee";
import card1 from "/home-card-1.webp";
import card2 from "/home-card-2.webp";
import card3 from "/home-card-3.webp";
import card4 from "/home-card-4.webp";


const Home = () => {
  const systemSteps = [
    { title: "Find the Signal", image: card1 },
    { title: "Shape the Story", image: card2 },
    { title: "Build the Presence", image: card3 },
    { title: "Compound It", image: card4 },
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
              <span className="text-primary">and distribute</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We build stories people remember and brands people can't ignore — for startups, founders, capital firms, fintech companies, & real estate brands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild>
                <Link to="/visionlab">
                  Start Your Project <ChevronRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/studio">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Brand Marquee */}
      <BrandMarquee />

      {/* System Introduction */}
      <section className="home-attention-section">
        <div className="home-attention-section__inner">
          <div className="home-attention-section__copy">
            <h2 className="text-4xl font-bold leading-tight text-foreground md:text-6xl">
              We don't hope for attention
              <br />
              <span className="text-primary">We control it</span>
            </h2>
            <p className="mt-7 text-xl font-semibold text-foreground md:text-2xl">
              We turn expertise into attention that compounds.
            </p>
          </div>
          <div
            className="home-attention-section__art"
            role="img"
            aria-label="A stream of information flowing around a black hole"
          />
        </div>
      </section>

      {/* 4-Step System Grid */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemSteps.map((step) => (
              <Link
                key={step.title}
                to="/studio"
                className="group block"
              >
                <div
                  className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border-2 border-white/70 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${step.image})`,
                  }}
                  role="img"
                  aria-label={step.title}
                >
                  <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pb-5">
                    <span className="rounded-full bg-primary px-5 py-2 text-sm md:text-base font-semibold text-white whitespace-nowrap">
                      {step.title}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/studio">
                See How It Works <ChevronRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What We Make */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">What We Make</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything needed to run the system.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              "Podcasts",
              "Short-form",
              "Films & Trailers",
              "Thumbnails",
              "Writing",
              "Search",
              "Distribution",
              "Platform Strategy",
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
      <section className="home-earth-cta">
        <div className="home-earth-cta__content">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl">
                Building something worth remembering?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-base font-light text-muted-foreground md:text-lg">
                Let’s make sure the right people know why it matters.
              </p>
              <Button size="lg" asChild>
                <Link to="/discover">
                  Get started <ChevronRight className="ml-2" size={20} />
                </Link>
              </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
