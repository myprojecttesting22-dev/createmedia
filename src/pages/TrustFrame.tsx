import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star } from "lucide-react";
import { useState } from "react";

const TrustFrame = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  const testimonials = [
    {
      name: "Sarah Mitchell",
      company: "Skyline Properties",
      role: "CEO",
      content:
        "CREATE MEDIA transformed our brand presence. Their AI-driven content strategy increased our engagement by 300% in just three months. The team's creativity and technical expertise are unmatched.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      company: "Urban Real Estate Group",
      role: "Marketing Director",
      content:
        "Working with CREATE MEDIA has been a game-changer. The automated marketing systems they built for us save countless hours while delivering consistent, high-quality content across all platforms.",
      rating: 5,
    },
    {
      name: "Jennifer Rodriguez",
      company: "Coastal Realty",
      role: "Brand Manager",
      content:
        "The VisionLab custom project exceeded all expectations. CREATE MEDIA understood our brand vision perfectly and delivered a comprehensive content ecosystem that drives real results.",
      rating: 5,
    },
    {
      name: "David Thompson",
      company: "Premier Estates",
      role: "Founder",
      content:
        "CineFlow's editing quality is exceptional. Every video they produce captures the essence of our properties and tells compelling stories that resonate with our target audience.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      company: "Metropolitan Homes",
      role: "Chief Marketing Officer",
      content:
        "BrandSync helped us achieve perfect consistency across all our marketing channels. The visual identity system they created elevated our brand to compete with the biggest players in our market.",
      rating: 5,
    },
    {
      name: "Robert Kim",
      company: "Horizon Real Estate",
      role: "VP of Operations",
      content:
        "ReachLift's organic growth strategies delivered impressive results. Our social media engagement and website traffic have increased significantly, leading to more qualified leads.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navigation />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Trust Frame</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Success stories from real estate brands that trust us to amplify their
              presence and drive growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                className="liquid-glass-element liquid-glass-element--dark animate-slide-up hover-lift border-primary/20 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-primary fill-primary" size={18} />
                    ))}
                  </div>
                  
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-primary font-medium">
                      {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-20 mb-16">
            <div className="max-w-5xl mx-auto">
              <Card className="liquid-glass-element liquid-glass-element--dark border-primary/20 shadow-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-1 gap-0">
                    <div className="p-8 md:p-12">
                      <AspectRatio 
                        ratio={16 / 9} 
                        className="bg-muted rounded-lg overflow-hidden shadow-lg relative group cursor-pointer"
                        onClick={() => setIsVideoPlaying(true)}
                      >
                        {!isVideoPlaying ? (
                          <>
                            <img 
                              src="https://img.youtube.com/vi/oc4uk_fTdO8/maxresdefault.jpg"
                              alt="Active Lanes Testimonial Video Thumbnail"
                              className="w-full h-full object-cover"
                              loading="eager"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                              <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <iframe
                            src="https://www.youtube.com/embed/oc4uk_fTdO8?autoplay=1&rel=0&modestbranding=1"
                            title="Active Lanes Testimonial"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                            style={{ border: 'none' }}
                          />
                        )}
                      </AspectRatio>
                      <h3 className="text-2xl md:text-3xl font-bold mt-8 text-center leading-relaxed">
                        Trusted by High-Impact Innovators — Harman, Founder of Active Lanes
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Card className="liquid-glass text-white border-0 max-w-3xl mx-auto">
              <CardContent className="py-12 relative z-10">
                <h2 className="text-3xl font-bold mb-4">Join Our Success Stories</h2>
                <p className="text-lg opacity-90 mb-6">
                  Ready to transform your brand with AI-powered content and automated
                  marketing systems?
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrustFrame;
