import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

const services = [
  {
    name: "Guest Sourcing",
    description: "We find the guests worth putting in front of your audience.",
    details: "We identify people whose experience and point of view fit your show, then build a focused shortlist around the topics your audience cares about.",
  },
  {
    name: "Guest Research",
    description: "Background, angles and questions, prepared before every recording.",
    details: "We review each guest’s background, work and ideas to find useful context, stronger conversation angles and questions tailored to the episode.",
  },
  {
    name: "Podcast Production",
    description: "Recording, editing and mastering — episodes ready to publish.",
    details: "We shape the recording into a clear, listenable episode with editing and mastering that keep the conversation easy to follow and ready to publish.",
  },
  {
    name: "Short Form",
    description: "The strongest moments from every episode, cut for the feed.",
    details: "We find the strongest ideas and moments in a long recording, then edit them into concise vertical clips designed for social feeds.",
  },
  {
    name: "Trailers",
    description: "Promos that make the next episode impossible to skip.",
    details: "We lead with the clearest hook and build a short promo that introduces the guest or idea and gives people a reason to watch the full episode.",
  },
  {
    name: "Thumbnails",
    description: "Images built to earn the click, tested episode after episode.",
    details: "We turn the episode’s central idea into a clear visual and pair it with title options that make the value of watching easy to understand.",
  },
  {
    name: "Writing",
    description: "Titles, descriptions and posts written in your voice.",
    details: "We write the titles, descriptions, show notes and social copy that help each episode read clearly while keeping your voice.",
  },
  {
    name: "Distribution",
    description: "Every piece placed where your audience already is.",
    details: "We prepare each asset for its destination and coordinate the rollout across the channels you choose, pointing viewers back to the episode and your brand.",
  },
];

const Studio = () => {
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="cosmic-studio" aria-labelledby="studio-art-headline">
        <img src="/studio-shuttle.webp" alt="A shuttle ascending over Earth's blue horizon" width={1672} height={941} loading="eager" decoding="async" />
        <h1 id="studio-art-headline" className="space-headline cosmic-studio__headline text-foreground">
          Escape velocity<br /><span className="text-primary">for your brand.</span>
        </h1>
      </section>

      <section className="pt-16 md:pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">Studio</h2>
            <p className="text-xl text-muted-foreground">
              Everything it takes to run a show end to end — from finding guests to getting it watched.
            </p>
            <p className="mt-4 text-sm font-medium text-primary">
              Choose a service to see what it includes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 animate-slide-up md:grid-cols-2">
            {services.map((service, index) => {
              const isExpanded = activeService === service.name;
              const detailsId = `studio-service-details-${index}`;

              return (
                <article
                  key={service.name}
                  className={`overflow-hidden rounded-3xl border bg-card/50 transition-all duration-300 ${
                    isExpanded
                      ? "border-primary/60 shadow-[0_0_32px_hsl(var(--primary)/0.12)]"
                      : "border-primary/20 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={detailsId}
                    onClick={() => setActiveService(isExpanded ? null : service.name)}
                    className="w-full p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary md:p-7"
                  >
                    <span className="mb-5 flex items-center justify-between">
                      <span className="text-sm font-semibold tracking-[0.18em] text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-5 w-5 text-primary transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                    <span role="heading" aria-level={3} className="mb-3 block text-2xl font-semibold text-foreground md:text-3xl">
                      {service.name}
                    </span>
                    <span className="block text-base leading-relaxed text-muted-foreground">
                      {service.description}
                    </span>
                  </button>
                  <div
                    id={detailsId}
                    hidden={!isExpanded}
                    className="border-t border-primary/20 px-6 pb-6 pt-5 md:px-7 md:pb-7"
                  >
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                      How we do it
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      {service.details}
                    </p>
                  </div>
                </article>
              );
            })}
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
