import { motion } from "framer-motion";
import { ArrowRight, Users, Zap, Target, Shield, Rocket, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SnapCutsLandingProps {
  onJoinClick: () => void;
}

const SnapCutsLanding = ({ onJoinClick }: SnapCutsLandingProps) => {
  const features = [
    { icon: <Users className="w-6 h-6" />, title: "Join the Snapper Network", description: "Join a network focused on distribution, not just file delivery. Snappers share standards and a deep understanding of how short-form attention works." },
    { icon: <Zap className="w-6 h-6" />, title: "Real Opportunities", description: "Connect with real demand, active campaigns, and consistent needs. For serious snappers, this is the path to stability and long-term momentum." },
    { icon: <Target className="w-6 h-6" />, title: "Skill Development", description: "Learn from experienced editors, get feedback on your work, and level up your craft in 2026." },
    { icon: <Shield className="w-6 h-6" />, title: "Standards That Matter", description: "We maintain quality. No clowns, no client-stealers, no desperate DM spammers. Just professionals." },
  ];

  const benefits = [
    "Money to pay the rent (and stop being broke)",
    "Opportunities tied to real content needs",
    "Clear quality standards",
    "Feedback that sharpens decision-making",
    "A network built on consistency",
    "Exposure to diverse formats",
    "Resources for faster workflows",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 dot-grid-bg opacity-30" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 depth-pill px-4 py-2 text-sm font-medium mb-8"
            >
              <Rocket className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Now Accepting Applications</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Join the{" "}
              <span className="text-primary">SnapCuts</span>{" "}
              Network
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              SnapCuts is built on snapping. We take high-impact moments from long-form content and shape them into clips that travel. It's not just about editing; it's about understanding content and pushing it where the attention lives.
            </p>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" onClick={onJoinClick} className="px-10 py-5 text-lg">
                <span>Join SnapCuts</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What is SnapCuts */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="depth-cta rounded-3xl p-8 md:p-12 mb-16"
          >
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
                What is <span className="text-white/80">SnapCuts</span>?
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                SnapCuts is the creator network for CREATE MEDIA.
              </p>
              <p className="text-white/80 text-lg leading-relaxed">
                Snapping is our system: find the moments that hold attention, shape them for the feed, and publish for reach. We don't execute this randomly. We do it consistently.
              </p>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="depth-card p-6 md:p-8"
              >
                <div className="depth-icon mb-4 relative z-10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 relative z-10">{feature.title}</h3>
                <p className="depth-text relative z-10">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              Who is SnapCuts For?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              For those who understand content—or want to master it—and want to earn money through consistent, high-quality execution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Video Editors who deliver on time",
              "Short-form Creators (Reels, Shorts, TikToks)",
              "Real Estate Content Specialists",
              "Hungry Beginners with no ego",
            ].map((type, index) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="depth-pill p-5 text-center"
              >
                <p className="text-white font-medium relative z-10">{type}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="depth-cta rounded-3xl p-8 md:p-12"
          >
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 text-center">
                What You Get
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-white/80 flex-shrink-0" />
                    <span className="text-white/85">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Join?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              If you are serious about snapping and want a system where effort compounds, you belong here. The application is short. The standards aren't.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" onClick={onJoinClick} className="px-10 py-5 text-lg">
                <span>Join SnapCuts</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SnapCutsLanding;
