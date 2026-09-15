import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Discover = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="px-4 pb-20 pt-32 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <header className="mb-10 text-center animate-fade-in">
            <h1 className="mb-3 text-5xl font-bold text-foreground md:text-6xl">
              Discover
            </h1>
            <p className="text-lg text-muted-foreground">
              Pick a time that works for you, thirty minutes on us.
            </p>
          </header>

          <section
            aria-label="Schedule a discovery call"
            className="overflow-hidden rounded-lg border border-primary/20 bg-card/40 p-px shadow-[0_0_24px_hsl(var(--primary)/0.08)]"
          >
            <iframe
              src="https://cal.com/vansh-h-qgd2lm/30min?embed=true&theme=dark&layout=month_view"
              title="Schedule a discovery call with Create Media"
              className="h-[720px] w-full border-0 bg-background"
              loading="lazy"
              allow="payment"
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Discover;