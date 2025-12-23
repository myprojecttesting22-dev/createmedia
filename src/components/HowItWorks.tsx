import React from "react";
import { motion } from "framer-motion";
import { Camera, Scissors, Share2, BarChart3 } from "lucide-react";

const steps = [
  {
    id: "01",
    text: (
      <>
        You record <br />
        <span className="text-white font-semibold">1–3 hours of raw video</span>
        <br /> in one session
      </>
    ),
    icon: <Camera className="w-6 h-6 text-primary" />,
  },
  {
    id: "02",
    text: (
      <>
        That footage is <br />
        <span className="text-white font-semibold">professionally edited</span>
        <br /> structured, cleaned, <br />
        with custom thumbnails and SEO
      </>
    ),
    icon: <Scissors className="w-6 h-6 text-primary" />,
  },
  {
    id: "03",
    text: (
      <>
        From that master video, <br />
        <span className="text-white font-semibold">multiple short clips</span>
        <br /> and content variations <br />
        are created and published across platforms
      </>
    ),
    icon: <Share2 className="w-6 h-6 text-primary" />,
  },
  {
    id: "04",
    text: (
      <>
        You receive a <br />
        <span className="text-white font-semibold">monthly breakdown</span>
        <br /> performance data <br />
        content insights <br />
        and clear next actions.
      </>
    ),
    icon: <BarChart3 className="w-6 h-6 text-primary" />,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring" as const, 
      damping: 20, 
      stiffness: 100 
    }
  },
};

const HowItWorks = () => {
  return (
    <section className="py-24 bg-[hsl(220,30%,5%)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground">A seamless system from recording to results</p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} 
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative p-8 h-full rounded-2xl 
                bg-white/[0.03] backdrop-blur-xl
                border border-white/10
                shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
                hover:border-primary/40 hover:bg-white/[0.06]
                hover:shadow-[0_8px_32px_rgba(59,130,246,0.15),inset_0_1px_0_rgba(255,255,255,0.15)]
                transition-all duration-500"
            >
              {/* Glassmorphism inner glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" />
              
              {/* Number Badge */}
              <div className="absolute -top-4 -left-3 px-3 py-1 
                bg-[hsl(220,30%,5%)] 
                border border-primary/30 
                rounded-full text-primary font-mono text-xs font-bold 
                shadow-[0_0_15px_rgba(59,130,246,0.3)] z-10">
                {step.id}
              </div>

              {/* Icon */}
              <div className="relative mb-6 p-3 
                bg-primary/10 backdrop-blur-sm
                rounded-lg w-fit 
                group-hover:bg-primary/20 
                transition-colors duration-300
                border border-primary/20">
                {step.icon}
              </div>

              {/* Text Content */}
              <p className="relative text-muted-foreground text-sm leading-relaxed">
                {step.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
