import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BrandMarquee from "@/components/BrandMarquee";
import signalImage from "/home-signal-green.webp";
import storyImage from "/home-story-yellow.webp";
import presenceImage from "/home-presence-purple.webp";
import compoundImage from "/home-compound-red.webp";


const Home = () => {
  const systemSteps = [
    { image: signalImage, title: "Find the Signal" },
    { image: storyImage, title: "Shape the Story" },
    { image: presenceImage, title: "Build the Presence" },
    { image: compoundImage, title: "Compound It" },
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
              A four-part system for turning what you know into what people know you for.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Step System Grid */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemSteps.map((step) => (
              <Link
                key={step.title}
                to="/create-suite"
                className="group block overflow-hidden"
              >
                <div className="relative aspect-[4/5] w-full bg-card">
                  <img
                    src={step.image}
                    alt={step.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent pb-5 pt-14 px-5">
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/create-suite">
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
