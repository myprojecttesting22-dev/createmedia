import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Phone, 
  Lightbulb, 
  Video, 
  Share2,
  Instagram,
  Linkedin,
  Twitter,
  Youtube
} from "lucide-react";

const WorkflowAnimation = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Main 4 nodes
  const mainNodes = [
    { id: "connectline", Icon: Phone, label: "ConnectLine", description: "First client contact" },
    { id: "visionlab", Icon: Lightbulb, label: "VisionLab", description: "Content strategy setup" },
    { id: "cineflow", Icon: Video, label: "CineFlow", description: "Property content creation" },
    { id: "omnireach", Icon: Share2, label: "OmniReach Hub", description: "Content redistribution" },
  ];

  // OmniReach distribution sub-nodes
  const distributionNodes = [
    { id: "instagram", Icon: Instagram, label: "Instagram" },
    { id: "linkedin", Icon: Linkedin, label: "LinkedIn" },
    { id: "twitter", Icon: Twitter, label: "Twitter/X" },
    { id: "youtube", Icon: Youtube, label: "YouTube" },
  ];

  return (
    <section className="py-20 px-6 overflow-hidden bg-[#0a0a0a] dot-grid-bg">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            How CreateMedia Automates Real Estate Growth
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            From creation to automation — your brand's energy flows through every stage.
          </p>
        </div>

        <Card className="relative bg-[#0f0f0f] border-[#2E5CE6]/30 shadow-2xl overflow-hidden">
          <CardContent className="p-8 md:p-12">
            {/* Mobile-First Layout */}
            <div className="relative w-full">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 300 1200"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="lineGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2E5CE6" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#2E5CE6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#2E5CE6" stopOpacity="0.3" />
                  </linearGradient>
                  
                  <radialGradient id="orbGlow">
                    <stop offset="0%" stopColor="#2E5CE6" stopOpacity="1" />
                    <stop offset="50%" stopColor="#2E5CE6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#2E5CE6" stopOpacity="0" />
                  </radialGradient>

                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Main vertical path connecting the 4 nodes */}
                <path
                  d="M 150 72 L 150 330 L 150 588 L 150 846"
                  stroke="#2E5CE6"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.5"
                  filter="url(#glow)"
                />

                {/* OmniReach Hub to junction point */}
                <path d="M 150 846 L 150 946" stroke="#2E5CE6" strokeWidth="2" fill="none" opacity="0.4" filter="url(#glow)" />
                
                {/* Junction to distribution nodes - 2x2 grid */}
                <path d="M 150 946 L 98 966" stroke="#2E5CE6" strokeWidth="2" fill="none" opacity="0.4" filter="url(#glow)" />
                <path d="M 150 946 L 202 966" stroke="#2E5CE6" strokeWidth="2" fill="none" opacity="0.4" filter="url(#glow)" />
                <path d="M 150 946 L 98 1086" stroke="#2E5CE6" strokeWidth="2" fill="none" opacity="0.4" filter="url(#glow)" />
                <path d="M 150 946 L 202 1086" stroke="#2E5CE6" strokeWidth="2" fill="none" opacity="0.4" filter="url(#glow)" />

                {/* Animated glowing orb */}
                <circle r="6" fill="url(#orbGlow)" filter="url(#glow)">
                  <animateMotion
                    dur="8s"
                    repeatCount="indefinite"
                    path="M 150 72 L 150 330 L 150 588 L 150 846 L 150 946 L 98 966 L 150 946 L 202 966 L 150 946 L 98 1086 L 150 946 L 202 1086"
                  />
                </circle>

                <circle r="3" fill="#2E5CE6">
                  <animateMotion
                    dur="8s"
                    repeatCount="indefinite"
                    path="M 150 72 L 150 330 L 150 588 L 150 846 L 150 946 L 98 966 L 150 946 L 202 966 L 150 946 L 98 1086 L 150 946 L 202 1086"
                  />
                </circle>
              </svg>

              {/* Main Nodes - Mobile Layout */}
              <div className="relative z-10 space-y-32">
                <TooltipProvider>
                  {mainNodes.map((node, index) => {
                    const NodeIcon = node.Icon;
                    return (
                      <Tooltip key={node.id}>
                        <TooltipTrigger asChild>
                          <div
                            className="flex flex-col items-center gap-3 cursor-pointer"
                            onMouseEnter={() => setHoveredNode(node.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                          >
                            <div
                              className={`
                                w-20 h-20 rounded-2xl
                                bg-[#0C1A3E] border-2 border-[#2E5CE6]/40
                                flex items-center justify-center
                                transition-all duration-300
                                ${hoveredNode === node.id ? "scale-110 shadow-[0_0_30px_rgba(46,92,230,0.6)] border-[#2E5CE6]" : "shadow-lg shadow-[#2E5CE6]/20"}
                              `}
                            >
                              <NodeIcon 
                                className="w-9 h-9 text-[#2E5CE6]" 
                                strokeWidth={2}
                              />
                            </div>
                            <div className="text-center">
                              <h3 className="text-base font-bold text-white mb-1">
                                {node.label}
                              </h3>
                              <p className="text-sm text-white/60 max-w-[220px]">
                                {node.description}
                              </p>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="bg-[#0C1A3E] border-[#2E5CE6]/50 text-white"
                        >
                          <p className="text-sm">{node.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}

                  {/* Distribution Sub-Nodes Grid - 2x2 under OmniReach */}
                  <div className="grid grid-cols-2 gap-x-12 gap-y-16 justify-items-center pt-8">
                    {distributionNodes.map((node) => {
                      const NodeIcon = node.Icon;
                      return (
                        <Tooltip key={node.id}>
                          <TooltipTrigger asChild>
                            <div
                              className="flex flex-col items-center gap-2 cursor-pointer"
                              onMouseEnter={() => setHoveredNode(node.id)}
                              onMouseLeave={() => setHoveredNode(null)}
                            >
                              <div
                                className={`
                                  w-14 h-14 rounded-xl
                                  bg-[#0C1A3E]/60 border border-[#2E5CE6]/30
                                  flex items-center justify-center
                                  transition-all duration-300
                                  ${hoveredNode === node.id ? "scale-110 shadow-[0_0_20px_rgba(46,92,230,0.5)] border-[#2E5CE6]/70" : ""}
                                `}
                              >
                                <NodeIcon 
                                  className="w-6 h-6 text-[#2E5CE6]/90" 
                                  strokeWidth={2}
                                />
                              </div>
                              <span className="text-xs font-semibold text-white/70">
                                {node.label}
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="bg-[#0C1A3E] border-[#2E5CE6]/50 text-white"
                          >
                            <p className="text-xs">Distribute to {node.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WorkflowAnimation;
