import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const WorkflowAnimation = () => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const nodes = [
    {
      id: 1,
      icon: "🎥",
      label: "CineFlow",
      description: "Create scroll-stopping real estate videos",
      position: { top: "50%", left: "5%" },
    },
    {
      id: 2,
      icon: "♻️",
      label: "ReCast",
      description: "Repurpose clips for every platform",
      position: { top: "20%", left: "28%" },
    },
    {
      id: 3,
      icon: "📈",
      label: "AdPulse",
      description: "Scale with paid marketing",
      position: { top: "80%", left: "28%" },
    },
    {
      id: 4,
      icon: "⚙️",
      label: "AI Engine",
      description: "Automate content & workflows",
      position: { top: "50%", left: "52%" },
    },
    {
      id: 5,
      icon: "🚀",
      label: "Growth",
      description: "Visibility across every channel",
      position: { top: "50%", left: "75%" },
    },
  ];

  const connections = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
  ];

  return (
    <section className="py-20 px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Your Complete Growth System
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From content creation to market dominance — fully automated
          </p>
        </div>

        <Card className="relative bg-gradient-to-br from-[#0C1A3E]/5 to-[#2E5CE6]/5 border-[#2E5CE6]/20 backdrop-blur-xl">
          <CardContent className="p-8 md:p-16">
            <div className="relative w-full h-[500px] md:h-[400px]">
              {/* SVG for connection lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 1 }}
              >
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2E5CE6" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#2E5CE6" stopOpacity="1">
                      <animate
                        attributeName="offset"
                        values="0;1;0"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%" stopColor="#2E5CE6" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {connections.map((conn, idx) => {
                  const fromNode = nodes.find((n) => n.id === conn.from);
                  const toNode = nodes.find((n) => n.id === conn.to);
                  if (!fromNode || !toNode) return null;

                  const x1 = `${parseFloat(fromNode.position.left) + 5}%`;
                  const y1 = fromNode.position.top;
                  const x2 = `${parseFloat(toNode.position.left) + 5}%`;
                  const y2 = toNode.position.top;

                  return (
                    <line
                      key={idx}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className="animate-pulse"
                      style={{
                        animationDelay: `${idx * 0.5}s`,
                        animationDuration: "2s",
                      }}
                    />
                  );
                })}
              </svg>

              {/* Nodes */}
              <TooltipProvider>
                {nodes.map((node, index) => (
                  <Tooltip key={node.id}>
                    <TooltipTrigger asChild>
                      <div
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        style={{
                          top: node.position.top,
                          left: node.position.left,
                          zIndex: 2,
                          animation: `float 3s ease-in-out infinite`,
                          animationDelay: `${index * 0.2}s`,
                        }}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                      >
                        <div
                          className={`
                            relative w-24 h-24 md:w-28 md:h-28 rounded-2xl
                            bg-gradient-to-br from-white/10 to-white/5
                            backdrop-blur-xl border border-white/20
                            shadow-2xl transition-all duration-300
                            ${hoveredNode === node.id ? "scale-110 shadow-[#2E5CE6]/50" : ""}
                          `}
                          style={{
                            boxShadow: hoveredNode === node.id
                              ? "0 0 30px rgba(46, 92, 230, 0.5)"
                              : "0 10px 30px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          {/* Glow effect */}
                          <div
                            className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
                            style={{
                              background:
                                "radial-gradient(circle, rgba(46, 92, 230, 0.4) 0%, transparent 70%)",
                              opacity: hoveredNode === node.id ? 1 : 0,
                            }}
                          />

                          {/* Icon */}
                          <div className="relative flex flex-col items-center justify-center h-full p-2">
                            <span className="text-3xl md:text-4xl mb-1">{node.icon}</span>
                            <span className="text-xs md:text-sm font-semibold text-white/90 text-center">
                              {node.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="bg-[#0C1A3E] border-[#2E5CE6]/30 text-white max-w-xs"
                    >
                      <p className="text-sm">{node.description}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
};

export default WorkflowAnimation;
