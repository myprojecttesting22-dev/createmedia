import { Link } from "react-router-dom";
import { ArrowRight, Zap, Target, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Home = () => {
  const services = [
    {
      icon: Zap,
      title: "CineFlow",
      description: "Smooth editing experience that brings your vision to life with precision and creativity.",
    },
    {
      icon: Target,
      title: "BrandSync",
      description: "Aligned visual and voice identity across all platforms for consistent brand presence.",
    },
    {
      icon: TrendingUp,
      title: "ReachLift",
      description: "Elevates engagement organically through strategic content distribution and optimization.",
    },
    {
      icon: Sparkles,
      title: "AdPulse",
      description: "Smart, high-converting ad system that maximizes ROI with data-driven campaigns.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted dot-grid-bg">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              We create, repurpose,
              <br />
              <span className="text-primary">and automate</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Keeping your real estate brand visible everywhere with AI-driven content
              and automated marketing systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/visionlab">
                  Start Your Project <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/core-story">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Create Suite</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions designed to amplify your brand's impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className="hover-lift border-border bg-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/create-suite">
                Explore All Services <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <Card className="bg-primary text-primary-foreground border-0">
            <CardContent className="py-16 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Ready to elevate your brand?
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Let's build your next growth system with AI-powered intelligence and
                automated marketing solutions.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/visionlab">
                  Request Custom Plan <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
