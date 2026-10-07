import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
      <section className="cosmic-home" aria-labelledby="home-headline">
        <div className="cosmic-home__scene">
            <h1 id="home-headline" className="space-headline cosmic-home__headline text-foreground">
              We create, repurpose,
              <br />
              <span className="text-primary">and distribute</span>
            </h1>
            <img className="cosmic-home__image" src="/astronaut-hero.webp" alt="An astronaut floating between two luminous blue cosmic horizons" width={1672} height={941} loading="eager" decoding="async" />
            <div className="cosmic-home__action">
              <Button size="lg" asChild>
                <Link to="/discover">
                  Get Started <ChevronRight className="ml-2" size={20} />
                </Link>
              </Button>
            </div>
        </div>
      </section>



      {/* 4-Step System Grid */}
      <section className="pt-24 pb-12 px-6 md:pt-32">
        <div className="container mx-auto">
        <div className="mb-20 md:mb-24 text-center">
          <h2 className="space-headline text-foreground">
              We don't hope for attention.
              <br />
              <span className="text-primary">We control it.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground md:text-xl">
              The right guests, the right story, and the right people seeing it
            </p>
          </div>
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
