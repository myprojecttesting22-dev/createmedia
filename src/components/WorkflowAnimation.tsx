import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Video, RefreshCw, TrendingUp, Cog } from "lucide-react";

const WorkflowAnimation = () => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const nodes = [
    {
      id: 1,
      Icon: Video,
      label: "CineFlow",
      description: "Create scroll-stopping real estate videos",
      position: { x: 100, y: 150 }, // Top left
    },
    {
      id: 2,
      Icon: RefreshCw,
      label: "ReCast",
      description: "Repurpose content for every platform",
      position: { x: 350, y: 150 }, // Top right
    },
    {
      id: 3,
      Icon: TrendingUp,
      label: "AdPulse",
      description: "Scale with paid marketing",
      position: { x: 350, y: 350 }, // Bottom right
    },
    {
      id: 4,
      Icon: Cog,
      label: "AI Engine",
      description: "Automate workflows & lead systems",
      position: { x: 600, y: 350 }, // Far right
    },
  ];

  return (
    <section className="py-20 px-6 overflow-hidden bg-gradient-to-b from-white to-[#F5F8FF]">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            How CreateMedia Automates Real Estate Growth
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From creation to automation — your brand's energy flows through every stage.
          </p>
        </div>

        <Card className="relative bg-white border-none shadow-xl">
          <CardContent className="p-8 md:p-16">
            {/* Desktop Layout */}
            <div className="hidden md:block relative w-full h-[450px]">
              {/* SVG for connection lines with animated orb */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 700 500"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Glowing line gradient */}
                  <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2E5CE6" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#2E5CE6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#2E5CE6" stopOpacity="0.3" />
                  </linearGradient>
                  
                  {/* Glowing orb gradient */}
                  <radialGradient id="orbGlow">
                    <stop offset="0%" stopColor="#2E5CE6" stopOpacity="1" />
                    <stop offset="50%" stopColor="#2E5CE6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#2E5CE6" stopOpacity="0" />
                  </radialGradient>

                  {/* Filter for glow effect */}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Path: CineFlow → ReCast → AdPulse → AI Engine */}
                <path
                  d="M 100 150 L 310 150 Q 350 150 350 190 L 350 310 Q 350 350 390 350 L 600 350"
                  stroke="#2E5CE6"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.4"
                  filter="url(#glow)"
                />

                {/* Animated glowing orb traveling along the path */}
                <circle r="8" fill="url(#orbGlow)" filter="url(#glow)">
                  <animateMotion
                    dur="6s"
                    repeatCount="indefinite"
                    path="M 100 150 L 310 150 Q 350 150 350 190 L 350 310 Q 350 350 390 350 L 600 350"
                  />
                </circle>

                {/* Bright core of the orb */}
                <circle r="4" fill="#2E5CE6">
                  <animateMotion
                    dur="6s"
                    repeatCount="indefinite"
                    path="M 100 150 L 310 150 Q 350 150 350 190 L 350 310 Q 350 350 390 350 L 600 350"
                  />
                </circle>
              </svg>

              {/* Nodes */}
              <TooltipProvider>
                {nodes.map((node) => {
                  const NodeIcon = node.Icon;
                  return (
                    <Tooltip key={node.id}>
                      <TooltipTrigger asChild>
                        <div
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                          style={{
                            left: `${node.position.x}px`,
                            top: `${node.position.y}px`,
                          }}
                          onMouseEnter={() => setHoveredNode(node.id)}
                          onMouseLeave={() => setHoveredNode(null)}
                        >
                          <div
                            className={`
                              relative flex flex-col items-center gap-3
                              transition-all duration-300
                              ${hoveredNode === node.id ? "scale-110" : ""}
                            `}
                          >
                            {/* Icon container */}
                            <div
                              className={`
                                w-20 h-20 rounded-2xl
                                bg-white shadow-lg
                                border-2 border-[#2E5CE6]/20
                                flex items-center justify-center
                                transition-all duration-300
                                ${hoveredNode === node.id ? "shadow-[0_0_25px_rgba(46,92,230,0.5)] border-[#2E5CE6]/50" : ""}
                              `}
                            >
                              <NodeIcon 
                                className="w-9 h-9 text-[#2E5CE6]" 
                                strokeWidth={2}
                              />
                            </div>

                            {/* Label */}
                            <span className="text-sm font-semibold text-[#0C1A3E] whitespace-nowrap">
                              {node.label}
                            </span>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        className="bg-[#0C1A3E] border-[#2E5CE6]/30 text-white max-w-xs"
                      >
                        <p className="text-sm">{node.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </TooltipProvider>
            </div>

            {/* Mobile Layout - Vertical Stack */}
            <div className="md:hidden relative w-full space-y-12">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 300 600"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <radialGradient id="orbGlowMobile">
                    <stop offset="0%" stopColor="#2E5CE6" stopOpacity="1" />
                    <stop offset="50%" stopColor="#2E5CE6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#2E5CE6" stopOpacity="0" />
                  </radialGradient>

                  <filter id="glowMobile">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Vertical path with curves */}
                <path
                  d="M 150 50 L 150 140 Q 150 180 110 180 L 110 270 Q 110 310 150 310 L 150 400 Q 150 440 190 440 L 190 530"
                  stroke="#2E5CE6"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.4"
                  filter="url(#glowMobile)"
                />

                {/* Animated orb */}
                <circle r="8" fill="url(#orbGlowMobile)" filter="url(#glowMobile)">
                  <animateMotion
                    dur="6s"
                    repeatCount="indefinite"
                    path="M 150 50 L 150 140 Q 150 180 110 180 L 110 270 Q 110 310 150 310 L 150 400 Q 150 440 190 440 L 190 530"
                  />
                </circle>

                <circle r="4" fill="#2E5CE6">
                  <animateMotion
                    dur="6s"
                    repeatCount="indefinite"
                    path="M 150 50 L 150 140 Q 150 180 110 180 L 110 270 Q 110 310 150 310 L 150 400 Q 150 440 190 440 L 190 530"
                  />
                </circle>
              </svg>

              {/* Mobile nodes */}
              {nodes.map((node) => {
                const NodeIcon = node.Icon;
                return (
                  <div key={node.id} className="flex flex-col items-center gap-3 relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-lg border-2 border-[#2E5CE6]/20 flex items-center justify-center">
                      <NodeIcon className="w-9 h-9 text-[#2E5CE6]" strokeWidth={2} />
                    </div>
                    <div className="text-center">
                      <h3 className="text-base font-semibold text-[#0C1A3E] mb-1">
                        {node.label}
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-[200px]">
                        {node.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WorkflowAnimation;
