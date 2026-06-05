"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Edit3, Film, Monitor, Code, Sparkles } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  icon: React.ReactNode;
  desc: string;
  details: string;
}

export default function JourneyTimeline() {
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);

  const milestones: Milestone[] = [
    {
      year: "2018",
      title: "Photography",
      icon: <Camera className="w-5 h-5" />,
      desc: "Fell in love with capturing moments.",
      details: "Began focusing on street and nature photography, learning compositions, lighting, and developing visual sensibilities.",
    },
    {
      year: "2019",
      title: "Graphic Design",
      icon: <Edit3 className="w-5 h-5" />,
      desc: "Started designing visuals.",
      details: "Explored visual design principles, poster layouts, typography, and color theory using Photoshop and Illustrator.",
    },
    {
      year: "2020",
      title: "Video Editing",
      icon: <Film className="w-5 h-5" />,
      desc: "Telling stories through motion.",
      details: "Learned cinematic pacing, sound mixing, color grading, and dynamic video edits using Premiere Pro and After Effects.",
    },
    {
      year: "2021",
      title: "UI/UX Design",
      icon: <Monitor className="w-5 h-5" />,
      desc: "Designing intuitive digital portals.",
      details: "Transitioned to building functional user interfaces, wireframing prototypes, and performing user research in Figma.",
    },
    {
      year: "2022",
      title: "Development",
      icon: <Code className="w-5 h-5" />,
      desc: "Turning designs into live code.",
      details: "Enrolled in Computer Engineering, picking up coding. Built fullstack web applications, APIs, and client-facing interfaces.",
    },
    {
      year: "2023+",
      title: "AI & Automation",
      icon: <Sparkles className="w-5 h-5" />,
      desc: "Integrating AI and building bots.",
      details: "Pivoted into LLM scripting, custom WhatsApp automation engines, workflows, and kernel customizations.",
    },
  ];

  return (
    <div className="w-full py-12 px-4 relative overflow-hidden select-none">
      {/* Background glow lines */}
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[150px] bg-accent-primary/5 blur-[80px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[20%] right-[-10%] w-[300px] h-[150px] bg-accent-secondary/5 blur-[80px] pointer-events-none rounded-full" />

      {/* Timeline wrapper */}
      <div className="max-w-6xl mx-auto relative">
        
        {/* Horizontal Line on Desktop / Hidden on Mobile */}
        <div className="hidden md:block absolute top-[52px] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-success/50 z-0" />

        {/* Milestones grid (Horizontal on Desktop, Vertical list on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 relative z-10">
          {milestones.map((m, idx) => {
            const isSelected = selectedMilestone === idx;
            
            // Choose colors based on steps
            const accentColors = [
              "border-accent-primary text-accent-primary shadow-[0_0_15px_rgba(124,58,237,0.2)]",
              "border-purple-400 text-purple-400 shadow-[0_0_15px_rgba(167,139,250,0.2)]",
              "border-violet-500 text-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.2)]",
              "border-blue-400 text-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.2)]",
              "border-accent-secondary text-accent-secondary shadow-[0_0_15px_rgba(0,229,255,0.2)]",
              "border-accent-success text-accent-success shadow-[0_0_15px_rgba(34,197,94,0.2)]",
            ];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex flex-col items-center text-center cursor-pointer group relative"
                onClick={() => setSelectedMilestone(isSelected ? null : idx)}
              >
                {/* Year Label */}
                <div className="text-text-muted font-mono font-bold text-xs tracking-wider mb-3 group-hover:text-text-main transition-colors duration-200">
                  {m.year}
                </div>

                {/* Milestone Node Ball */}
                <div 
                  className={`w-12 h-12 rounded-full bg-surface-dark border-2 flex items-center justify-center transition-all duration-300 z-10 relative ${
                    isSelected ? accentColors[idx] : "border-white/10 text-text-muted group-hover:border-white/30 group-hover:text-text-main group-hover:scale-105"
                  }`}
                >
                  {m.icon}
                  {isSelected && (
                    <span className="absolute inset-0 rounded-full border border-inherit animate-ping opacity-60" />
                  )}
                </div>

                {/* Milestone Details Card */}
                <div className="mt-4 flex-1">
                  <h4 className="text-text-main font-bold text-sm tracking-wide font-sans mb-1 group-hover:text-accent-secondary transition-colors duration-200">
                    {m.title}
                  </h4>
                  <p className="text-text-muted text-[11px] font-mono leading-relaxed px-2 max-w-[180px] mx-auto">
                    {m.desc}
                  </p>
                </div>

                {/* Hover/Tap Dropdown details overlay */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute top-[110%] md:top-[130%] left-1/2 -translate-x-1/2 w-[240px] bg-surface-dark/95 border border-white/10 rounded-lg p-3 text-left shadow-2xl z-[90] backdrop-blur-md"
                  >
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-primary to-accent-secondary" />
                    <span className="text-[10px] font-mono text-accent-secondary uppercase font-bold block mb-1">
                      {m.year} — Context
                    </span>
                    <p className="text-xs text-text-main font-mono leading-relaxed">
                      {m.details}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
