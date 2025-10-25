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
  BookOpen, 
  Lightbulb, 
  Video, 
  Share2, 
  TrendingUp, 
  Bot, 
  MessageSquare, 
  RefreshCw, 
  BarChart3, 
  Zap, 
  Palette, 
  Activity,
  Instagram,
  Linkedin,
  Twitter,
  Youtube
} from "lucide-react";

const WorkflowAnimation = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Main workflow nodes
  const nodes = [
    { id: "connectline", Icon: Phone, label: "ConnectLine", description: "First client contact", position: { x: 150, y: 80 } },
    { id: "corestory", Icon: BookOpen, label: "CoreStory", description: "Collect brand & audience info", position: { x: 150, y: 180 } },
    { id: "visionlab", Icon: Lightbulb, label: "VisionLab", description: "Content strategy setup", position: { x: 150, y: 280 } },
    { id: "cineflow", Icon: Video, label: "CineFlow", description: "Property content creation", position: { x: 150, y: 380 } },
    { id: "omnireach", Icon: Share2, label: "OmniReach Hub", description: "Content redistribution", position: { x: 450, y: 380 } },
    { id: "adpulse", Icon: TrendingUp, label: "AdPulse", description: "Paid ad campaigns", position: { x: 750, y: 380 } },
    { id: "autopilot", Icon: Bot, label: "AutoPilot AI", description: "AI workflow & automation", position: { x: 750, y: 280 } },
    { id: "smartconnect", Icon: MessageSquare, label: "SmartConnect", description: "WhatsApp follow-ups", position: { x: 750, y: 180 } },
    { id: "pipelinesync", Icon: RefreshCw, label: "PipelineSync", description: "Sync leads with CRM", position: { x: 750, y: 80 } },
    { id: "insighthub", Icon: BarChart3, label: "InsightHub", description: "AI-powered insights", position: { x: 950, y: 80 } },
    { id: "scaleboost", Icon: Zap, label: "ScaleBoost", description: "Content optimization", position: { x: 950, y: 180 } },
    { id: "creativelab", Icon: Palette, label: "CreativeLab", description: "Creative assets", position: { x: 950, y: 280 } },
    { id: "engageflow", Icon: Activity, label: "EngageFlow", description: "Monitor engagement", position: { x: 950, y: 380 } },
  ];

  // OmniReach Hub distribution sub-nodes
  const distributionNodes = [
    { id: "instagram", Icon: Instagram, label: "Instagram", position: { x: 450, y: 480 } },
    { id: "linkedin", Icon: Linkedin, label: "LinkedIn", position: { x: 350, y: 520 } },
    { id: "twitter", Icon: Twitter, label: "Twitter/X", position: { x: 550, y: 520 } },
    { id: "youtube", Icon: Youtube, label: "YouTube", position: { x: 450, y: 560 } },
  ];

  // Mobile nodes (simplified vertical layout)
  const mobileNodes = [
    { id: "connectline", Icon: Phone, label: "ConnectLine", description: "First client contact" },
    { id: "corestory", Icon: BookOpen, label: "CoreStory", description: "Collect brand & audience info" },
    { id: "visionlab", Icon: Lightbulb, label: "VisionLab", description: "Content strategy setup" },
    { id: "cineflow", Icon: Video, label: "CineFlow", description: "Property content creation" },
    { id: "omnireach", Icon: Share2, label: "OmniReach Hub", description: "Content redistribution" },
    { id: "adpulse", Icon: TrendingUp, label: "AdPulse", description: "Paid ad campaigns" },
    { id: "autopilot", Icon: Bot, label: "AutoPilot AI", description: "AI workflow & automation" },
    { id: "smartconnect", Icon: MessageSquare, label: "SmartConnect", description: "WhatsApp follow-ups" },
    { id: "pipelinesync", Icon: RefreshCw, label: "PipelineSync", description: "Sync leads with CRM" },
    { id: "insighthub", Icon: BarChart3, label: "InsightHub", description: "AI-powered insights" },
    { id: "scaleboost", Icon: Zap, label: "ScaleBoost", description: "Content optimization" },
    { id: "creativelab", Icon: Palette, label: "CreativeLab", description: "Creative assets" },
    { id: "engageflow", Icon: Activity, label: "EngageFlow", description: "Monitor engagement" },
  ];

  return (
    <section className="py-20 px-6 overflow-hidden bg-[#0a0a0a] dot-grid-bg">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            How CreateMedia Automates Real Estate Growth
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From creation to automation — your brand's energy flows through every stage.
          </p>
        </div>

        <Card className="relative bg-[#0f0f0f] border-border/50 shadow-2xl overflow-hidden">
          <CardContent className="p-8 md:p-16">
            {/* Desktop Layout */}
            <div className="hidden md:block relative w-full h-[650px]">
              {/* SVG for connection lines with animated orb */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 1100 650"
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

                {/* Main workflow path */}
                <path
                  d="M 150 80 L 150 180 L 150 280 L 150 380 L 450 380 L 750 380 L 750 280 L 750 180 L 750 80 L 950 80 L 950 180 L 950 280 L 950 380"
                  stroke="#2E5CE6"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.4"
                  filter="url(#glow)"
                />

                {/* OmniReach Hub to distribution nodes */}
                <path d="M 450 380 L 450 480" stroke="#2E5CE6" strokeWidth="2" fill="none" opacity="0.3" filter="url(#glow)" />
                <path d="M 450 480 L 350 520" stroke="#2E5CE6" strokeWidth="2" fill="none" opacity="0.3" filter="url(#glow)" />
                <path d="M 450 480 L 550 520" stroke="#2E5CE6" strokeWidth="2" fill="none" opacity="0.3" filter="url(#glow)" />
                <path d="M 450 480 L 450 560" stroke="#2E5CE6" strokeWidth="2" fill="none" opacity="0.3" filter="url(#glow)" />

                {/* Animated glowing orb */}
                <circle r="6" fill="url(#orbGlow)" filter="url(#glow)">
                  <animateMotion
                    dur="12s"
                    repeatCount="indefinite"
                    path="M 150 80 L 150 180 L 150 280 L 150 380 L 450 380 L 750 380 L 750 280 L 750 180 L 750 80 L 950 80 L 950 180 L 950 280 L 950 380"
                  />
                </circle>

                {/* Bright core of the orb */}
                <circle r="3" fill="#2E5CE6">
                  <animateMotion
                    dur="12s"
                    repeatCount="indefinite"
                    path="M 150 80 L 150 180 L 150 280 L 150 380 L 450 380 L 750 380 L 750 280 L 750 180 L 750 80 L 950 80 L 950 180 L 950 280 L 950 380"
                  />
                </circle>
              </svg>

              {/* Main Nodes */}
              <TooltipProvider>
                {nodes.map((node) => {
                  const NodeIcon = node.Icon;
                  return (
                    <Tooltip key={node.id}>
                      <TooltipTrigger asChild>
                        <div
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                          style={{
                            left: `${node.position.x}px`,
                            top: `${node.position.y}px`,
                          }}
                          onMouseEnter={() => setHoveredNode(node.id)}
                          onMouseLeave={() => setHoveredNode(null)}
                        >
                          <div
                            className={`
                              relative flex flex-col items-center gap-2
                              transition-all duration-300
                              ${hoveredNode === node.id ? "scale-110" : ""}
                            `}
                          >
                            {/* Icon container */}
                            <div
                              className={`
                                w-16 h-16 rounded-xl
                                bg-card border border-primary/30
                                flex items-center justify-center
                                transition-all duration-300
                                ${hoveredNode === node.id ? "shadow-[0_0_30px_rgba(46,92,230,0.6)] border-primary/70 bg-primary/10" : "shadow-lg"}
                              `}
                            >
                              <NodeIcon 
                                className="w-7 h-7 text-primary" 
                                strokeWidth={2}
                              />
                            </div>

                            {/* Label */}
                            <span className="text-xs font-semibold text-foreground whitespace-nowrap">
                              {node.label}
                            </span>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        className="bg-card border-primary/30 text-foreground"
                      >
                        <p className="text-sm">{node.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}

                {/* Distribution Sub-Nodes */}
                {distributionNodes.map((node) => {
                  const NodeIcon = node.Icon;
                  return (
                    <Tooltip key={node.id}>
                      <TooltipTrigger asChild>
                        <div
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                          style={{
                            left: `${node.position.x}px`,
                            top: `${node.position.y}px`,
                          }}
                          onMouseEnter={() => setHoveredNode(node.id)}
                          onMouseLeave={() => setHoveredNode(null)}
                        >
                          <div
                            className={`
                              relative flex flex-col items-center gap-1
                              transition-all duration-300
                              ${hoveredNode === node.id ? "scale-110" : ""}
                            `}
                          >
                            {/* Icon container - smaller for sub-nodes */}
                            <div
                              className={`
                                w-12 h-12 rounded-lg
                                bg-card/80 border border-primary/20
                                flex items-center justify-center
                                transition-all duration-300
                                ${hoveredNode === node.id ? "shadow-[0_0_20px_rgba(46,92,230,0.5)] border-primary/60" : ""}
                              `}
                            >
                              <NodeIcon 
                                className="w-5 h-5 text-primary/80" 
                                strokeWidth={2}
                              />
                            </div>

                            {/* Label */}
                            <span className="text-[10px] font-medium text-muted-foreground whitespace-nowrap">
                              {node.label}
                            </span>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        className="bg-card border-primary/30 text-foreground"
                      >
                        <p className="text-xs">Distribute to {node.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </TooltipProvider>
            </div>

            {/* Mobile Layout - Vertical Stack */}
            <div className="md:hidden relative w-full space-y-8">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 300 1400"
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

                {/* Vertical path */}
                <path
                  d="M 150 50 L 150 150 L 150 250 L 150 350 L 150 450 L 150 550 L 150 650 L 150 750 L 150 850 L 150 950 L 150 1050 L 150 1150 L 150 1250"
                  stroke="#2E5CE6"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.4"
                  filter="url(#glowMobile)"
                />

                {/* Animated orb */}
                <circle r="6" fill="url(#orbGlowMobile)" filter="url(#glowMobile)">
                  <animateMotion
                    dur="10s"
                    repeatCount="indefinite"
                    path="M 150 50 L 150 150 L 150 250 L 150 350 L 150 450 L 150 550 L 150 650 L 150 750 L 150 850 L 150 950 L 150 1050 L 150 1150 L 150 1250"
                  />
                </circle>

                <circle r="3" fill="#2E5CE6">
                  <animateMotion
                    dur="10s"
                    repeatCount="indefinite"
                    path="M 150 50 L 150 150 L 150 250 L 150 350 L 150 450 L 150 550 L 150 650 L 150 750 L 150 850 L 150 950 L 150 1050 L 150 1150 L 150 1250"
                  />
                </circle>
              </svg>

              {/* Mobile nodes */}
              {mobileNodes.map((node) => {
                const NodeIcon = node.Icon;
                return (
                  <div key={node.id} className="flex flex-col items-center gap-2 relative z-10">
                    <div className="w-16 h-16 rounded-xl bg-card border border-primary/30 shadow-lg flex items-center justify-center">
                      <NodeIcon className="w-7 h-7 text-primary" strokeWidth={2} />
                    </div>
                    <div className="text-center">
                      <h3 className="text-sm font-semibold text-foreground mb-1">
                        {node.label}
                      </h3>
                      <p className="text-xs text-muted-foreground max-w-[200px]">
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
