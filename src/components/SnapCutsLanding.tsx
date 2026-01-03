import { motion } from "framer-motion";
import { ArrowRight, Users, Zap, Target, Shield, Rocket, CheckCircle } from "lucide-react";

interface SnapCutsLandingProps {
  onJoinClick: () => void;
}

const SnapCutsLanding = ({ onJoinClick }: SnapCutsLandingProps) => {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Join the Snapper Network",
      description: "Connect with video editors, short-form creators, and real estate content specialists who actually deliver."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real Opportunities",
      description: "Get access to paid gigs, client referrals, and projects that help you build a portfolio that matters."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Skill Development",
      description: "Learn from experienced editors, get feedback on your work, and level up your craft in 2026."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Standards That Matter",
      description: "We maintain quality. No clowns, no client-stealers, no desperate DM spammers. Just professionals."
    }
  ];

  const benefits = [
    "Access to exclusive editing opportunities",
    "Direct connections with real estate professionals",
    "Portfolio reviews and constructive feedback",
    "Industry insights and trend updates",
    "Community support from fellow creators",
    "Resources and templates to boost your workflow"
  ];

  return (
    <div className="min-h-screen bg-background">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
            >
              <Rocket className="w-4 h-4" />
              Now Accepting Applications
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Join the{" "}
              <span className="text-primary">SnapCuts</span>{" "}
              Network
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              A curated community of video editors and content creators who take their craft seriously. 
              No fluff. No gatekeeping. Just real opportunities and real growth.
            </p>

            <motion.button
              onClick={onJoinClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-semibold text-primary-foreground transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(198 100% 58%) 100%)",
                boxShadow: "0 0 40px hsl(var(--primary) / 0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              <span>👉 Join SnapCuts</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
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
            className="liquid-glass rounded-3xl p-8 md:p-12 mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6">
              What is <span className="text-primary">SnapCuts</span>?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              SnapCuts is the creator arm of CREATE MEDIA — a network designed for video editors and 
              short-form content creators who want more than random gigs on freelance platforms.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              We connect skilled editors with real estate professionals, personal brands, and businesses 
              who need consistent, high-quality content. If you're tired of chasing clients and want to 
              be part of something bigger, this is your entry point.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Whether you're a seasoned pro or a hungry beginner, we value <span className="text-foreground font-medium">work ethic, 
              integrity, and craftsmanship</span> over everything else.
            </p>
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
                className="liquid-glass rounded-2xl p-6 md:p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
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
              We're looking for creators who are serious about their craft and ready to grow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Video Editors who deliver on time",
              "Short-form Creators (Reels, Shorts, TikToks)",
              "Real Estate Content Specialists",
              "Hungry Beginners with no ego"
            ].map((type, index) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card/50 border border-border rounded-xl p-5 text-center hover:border-primary/50 transition-colors"
              >
                <p className="text-foreground font-medium">{type}</p>
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
            className="liquid-glass rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-8 text-center">
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
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </motion.div>
              ))}
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
              The application takes less than 2 minutes. We just need to know you're serious.
            </p>
            <motion.button
              onClick={onJoinClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-semibold text-primary-foreground transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(198 100% 58%) 100%)",
                boxShadow: "0 0 40px hsl(var(--primary) / 0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              <span>👉 Join SnapCuts</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SnapCutsLanding;
