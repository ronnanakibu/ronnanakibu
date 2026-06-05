"use client";

import React, { useState } from "react";
import { Camera, Edit3, Code, Cpu, Film, Lightbulb } from "lucide-react";

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  angle: number; // in degrees for positioning
  distance: number; // radius distance from center (px)
  tools: string[];
  color: string;
}

export default function SkillsOrbit() {
  const [activeCategory, setActiveCategory] = useState<string | null>("dev");

  const categories: SkillCategory[] = [
    {
      id: "photo",
      name: "Photography",
      icon: <Camera className="w-5 h-5 text-[#00E5FF]" />,
      angle: -90, // top
      distance: 140,
      tools: ["Lightroom", "Exif Metadata", "Street & Nature", "Color Grading", "Studio Setup"],
      color: "from-cyan-400 to-[#00E5FF]",
    },
    {
      id: "design",
      name: "Design",
      icon: <Edit3 className="w-5 h-5 text-[#7C3AED]" />,
      angle: -30, // top-right
      distance: 140,
      tools: ["Figma", "Photoshop", "Illustrator", "UI/UX Layouts", "Typography", "Branding"],
      color: "from-purple-500 to-[#7C3AED]",
    },
    {
      id: "dev",
      name: "Development",
      icon: <Code className="w-5 h-5 text-accent-secondary" />,
      angle: 30, // bottom-right
      distance: 140,
      tools: ["Next.js 15", "React", "TypeScript", "Node.js", "Python", "SQLite / Git"],
      color: "from-blue-400 to-[#00E5FF]",
    },
    {
      id: "tech",
      name: "Technology",
      icon: <Cpu className="w-5 h-5 text-accent-success" />,
      angle: 90, // bottom
      distance: 140,
      tools: ["Custom ROMs", "Linux Kernel Dev", "AOSP Customization", "Bash Scripting", "Automation"],
      color: "from-green-400 to-accent-success",
    },
    {
      id: "multimedia",
      name: "Multimedia",
      icon: <Film className="w-5 h-5 text-purple-400" />,
      angle: 150, // bottom-left
      distance: 140,
      tools: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Motion Graphics", "Sound Design"],
      color: "from-violet-400 to-purple-500",
    },
    {
      id: "creative",
      name: "Creative Thinking",
      icon: <Lightbulb className="w-5 h-5 text-yellow-400" />,
      angle: 210, // top-left
      distance: 140,
      tools: ["Product Strategy", "Visual Storytelling", "Concept Iteration", "Rapid Prototyping"],
      color: "from-amber-300 to-yellow-500",
    },
  ];

  // Helper to calculate X and Y relative to container center
  const getCoordinates = (angleDegrees: number, r: number) => {
    const angleRadians = (angleDegrees * Math.PI) / 180;
    const x = Math.cos(angleRadians) * r;
    const y = Math.sin(angleRadians) * r;
    return { x, y };
  };

  const activeData = categories.find((c) => c.id === activeCategory);

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 select-none">
      <div className="relative w-[340px] h-[340px] md:w-[400px] md:h-[400px] flex items-center justify-center">
        {/* Orbit dotted rings */}
        <div className="absolute w-[200px] h-[200px] rounded-full border border-dashed border-white/5 pointer-events-none" />
        <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-white/10 pointer-events-none" />
        <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-white/5 pointer-events-none" />

        {/* Animated SVG Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          
          {categories.map((c) => {
            const { x, y } = getCoordinates(c.angle, c.distance);
            // Center is (200, 200) in coordinate space
            const targetX = 200 + x;
            const targetY = 200 + y;

            return (
              <g key={`line-${c.id}`}>
                {/* Dotted static line */}
                <line
                  x1="200"
                  y1="200"
                  x2={targetX}
                  y2={targetY}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                {/* Pulsing connection line */}
                <line
                  x1="200"
                  y1="200"
                  x2={targetX}
                  y2={targetY}
                  stroke="url(#lineGrad)"
                  strokeWidth="2"
                  className={activeCategory === c.id ? "opacity-100" : "opacity-0"}
                  strokeDasharray="10 150"
                  style={{
                    strokeDashoffset: 160,
                    animation: activeCategory === c.id ? "pulseLine 2.5s linear infinite" : "none",
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Style for line pulse animation */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pulseLine {
            to {
              stroke-dashoffset: 0;
            }
          }
          @keyframes floatNode {
            0%, 100% {
              transform: translate(0px, 0px);
            }
            50% {
              transform: translate(var(--float-x, 2px), var(--float-y, -3px));
            }
          }
        ` }} />

        {/* Center Node (RONN) */}
        <div className="z-10 w-24 h-24 rounded-full bg-gradient-to-br from-bg-dark to-[#18181B] border-2 border-accent-primary flex flex-col items-center justify-center shadow-[0_0_35px_rgba(124,58,237,0.3)] relative">
          <div className="absolute inset-0.5 rounded-full bg-bg-dark/95 flex items-center justify-center flex-col">
            <span className="text-white font-bold tracking-widest text-lg font-sans">RONN</span>
            <div className="w-1.5 h-1.5 rounded-full bg-accent-secondary animate-pulse mt-1" />
          </div>
        </div>

        {/* Orbiting Category Nodes */}
        {categories.map((c, idx) => {
          const { x, y } = getCoordinates(c.angle, c.distance);
          const isActive = activeCategory === c.id;

          // Add simple offset for floating effect based on index
          const fx = idx % 2 === 0 ? "3px" : "-2px";
          const fy = idx % 3 === 0 ? "-3px" : "4px";

          return (
            <div
              key={c.id}
              className="absolute z-20 transition-all duration-300 cursor-pointer group clickable"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
                "--float-x": fx,
                "--float-y": fy,
                animation: isActive ? "none" : "floatNode 4s ease-in-out infinite",
              } as React.CSSProperties}
              onMouseEnter={() => setActiveCategory(c.id)}
            >
              {/* Node Sphere */}
              <div
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 relative ${
                  isActive
                    ? "bg-surface-dark border-accent-secondary shadow-[0_0_20px_rgba(0,229,255,0.2)] scale-110"
                    : "bg-surface-dark/90 border-white/10 group-hover:border-white/30"
                }`}
              >
                {c.icon}

                {/* Satellite small ambient orbit dot */}
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent-secondary animate-ping" />
                )}
              </div>

              {/* Node Text Label */}
              <div
                className={`absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] tracking-wide font-mono px-2 py-0.5 rounded transition-colors duration-200 ${
                  isActive
                    ? "text-text-main font-semibold bg-accent-primary/20 border border-accent-primary/30"
                    : "text-text-muted bg-bg-dark/80 group-hover:text-text-main"
                }`}
              >
                {c.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Orbit Details Display Box */}
      <div className="w-full max-w-sm mt-12 bg-surface-dark/60 border border-white/5 rounded-xl p-5 backdrop-blur-md relative overflow-hidden transition-all duration-300">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent-primary to-accent-secondary" />
        
        {activeData ? (
          <div>
            <h4 className="text-text-main font-bold tracking-wide font-sans text-base mb-1 flex items-center space-x-2">
              <span>{activeData.name}</span>
            </h4>
            <p className="text-xs text-text-muted font-mono mb-4">Core stack & focus tools:</p>
            <div className="grid grid-cols-2 gap-2">
              {activeData.tools.map((t, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs text-text-main/90 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary/80" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-text-muted text-xs font-mono py-4">Hover categories to explore Rony's skillset.</p>
        )}
      </div>
    </div>
  );
}
