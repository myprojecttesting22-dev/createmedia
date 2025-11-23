import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Lightbulb, Rocket } from "lucide-react";

const CoreStory = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navigation />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Core Story</h1>
            <p className="text-xl text-muted-foreground">
              Empowering real estate brands through intelligent content creation
            </p>
          </div>

          <div className="space-y-12 animate-slide-up">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At CREATE MEDIA, we believe that every real estate brand deserves to be
                visible, memorable, and impactful. Our mission is to transform how real
                estate professionals approach content creation and marketing by combining
                cutting-edge AI technology with creative excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="liquid-glass-element liquid-glass-element--dark hover-lift">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <Target className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Strategic Vision</h3>
                  <p className="text-foreground/80">
                    We develop comprehensive content strategies tailored to your brand's
                    unique voice and goals.
                  </p>
                </CardContent>
              </Card>

              <Card className="liquid-glass-element liquid-glass-element--dark hover-lift">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <Lightbulb className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Creative Innovation</h3>
                  <p className="text-foreground/80">
                    Combining human creativity with AI-driven insights to produce content
                    that resonates.
                  </p>
                </CardContent>
              </Card>

              <Card className="liquid-glass-element liquid-glass-element--dark hover-lift">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <Rocket className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Scalable Growth</h3>
                  <p className="text-foreground/80">
                    Automated systems that grow with your business, keeping you visible
                    everywhere.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Our Philosophy</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                We don't just create content—we build content ecosystems. Every piece of
                content we produce is designed to work harder for you through intelligent
                repurposing and strategic distribution across multiple channels.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our AI-powered approach means you spend less time on content creation and
                more time on what matters: building relationships and closing deals.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
              <div className="space-y-4">
                <div className="p-6 liquid-glass-element liquid-glass-element--dark rounded-lg border border-primary/20">
                  <h3 className="text-xl font-semibold mb-2">1. Understand</h3>
                  <p className="text-foreground/80">
                    We dive deep into your brand identity, target audience, and business
                    goals to create a foundation for success.
                  </p>
                </div>
                <div className="p-6 liquid-glass-element liquid-glass-element--dark rounded-lg border border-primary/20">
                  <h3 className="text-xl font-semibold mb-2">2. Create</h3>
                  <p className="text-foreground/80">
                    Our team produces high-impact content that captures attention and
                    drives engagement across all platforms.
                  </p>
                </div>
                <div className="p-6 liquid-glass-element liquid-glass-element--dark rounded-lg border border-primary/20">
                  <h3 className="text-xl font-semibold mb-2">3. Amplify</h3>
                  <p className="text-foreground/80">
                    Using AI-driven repurposing and automated distribution, we ensure
                    your content reaches the right audience at the right time.
                  </p>
                </div>
                <div className="p-6 liquid-glass-element liquid-glass-element--dark rounded-lg border border-primary/20">
                  <h3 className="text-xl font-semibold mb-2">4. Optimize</h3>
                  <p className="text-foreground/80">
                    Continuous analysis and refinement ensure your content strategy
                    evolves with your business and market trends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CoreStory;
