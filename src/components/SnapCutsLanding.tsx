import { motion } from "framer-motion";
import { ChevronRight, Users, Zap, Target, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SnapCutsLandingProps {
  onJoinClick: () => void;
}

const SnapCutsLanding = ({ onJoinClick }: SnapCutsLandingProps) => {
  const features = [
    { icon: <Users className="w-6 h-6" />, title: "Join the Snapper Network", description: "A network focused on distribution, not just file delivery." },
    { icon: <Zap className="w-6 h-6" />, title: "Real Opportunities", description: "Connect with real demand, active campaigns, and consistent needs." },
    { icon: <Target className="w-6 h-6" />, title: "Skill Development", description: "Learn from experienced editors and get feedback on your work." },
    { icon: <Shield className="w-6 h-6" />, title: "Standards That Matter", description: "We maintain quality. Professionals only." },
  ];

  const audience = [
    "Video Editors",
    "Short-form Creators",
    "Niche Content Specialists",
    "Hungry Beginners",
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Join the{" "}
              <span className="text-primary">SnapCuts</span>{" "}
              Network
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              SnapCuts is the creator network for CREATE MEDIA. We take high-impact moments from long-form content and shape them into clips that travel.
            </p>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" onClick={onJoinClick} className="px-10 py-5 text-lg">
                <span>Join SnapCuts</span>
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <section className="py-20">
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
              For people who understand content and want to earn through consistent, high-quality execution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {audience.map((type, index) => (
              <motion.p
                key={type}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-lg text-white/80 font-medium py-4 border-b border-white/10 md:border-b-0"
              >
                {type}
              </motion.p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SnapCutsLanding;
