import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import shuttle from "@/assets/studio-shuttle.webp.asset.json";

const services = [
  {
    name: "Guest Sourcing",
    description: "We find the guests worth putting in front of your audience.",
  },
  {
    name: "Guest Research",
    description: "Background, angles and questions, prepared before every recording.",
  },
  {
    name: "Podcast Production",
    description: "Recording, editing and mastering — episodes ready to publish.",
  },
  {
    name: "Short Form",
    description: "The strongest moments from every episode, cut for the feed.",
  },
  {
    name: "Trailers",
    description: "Promos that make the next episode impossible to skip.",
  },
  {
    name: "Thumbnails",
    description: "Images built to earn the click, tested episode after episode.",
  },
  {
    name: "Writing",
    description: "Titles, descriptions and posts written in your voice.",
  },
  {
    name: "Distribution",
    description: "Every piece placed where your audience already is.",
  },
];

const Studio = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="cosmic-studio" aria-labelledby="studio-art-headline">
        <img src={shuttle.url} alt="A shuttle ascending over Earth's blue horizon" width={1672} height={941} loading="eager" decoding="async" />
        <h1 id="studio-art-headline" className="space-headline cosmic-studio__headline text-foreground">
          Escape velocity<br /><span className="text-primary">for your brand.</span>
        </h1>
      </section>

      <section className="pt-16 md:pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">Studio</h2>
            <p className="text-xl text-muted-foreground">
              Everything it takes to run a show end to end — from finding guests to getting it watched.
            </p>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10 animate-slide-up">
            {services.map((service) => (
              <div key={service.name} className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-2 md:gap-12 py-8 items-baseline group">
                <h2 className="text-2xl md:text-3xl font-semibold text-white group-hover:text-primary transition-colors">
                  {service.name}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button size="lg" asChild>
              <Link to="/discover">
                Get Started <ChevronRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Studio;
