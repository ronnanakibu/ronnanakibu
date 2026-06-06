"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Camera, Edit3, Film, Monitor, Code, Sparkles } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  icon: React.ReactNode;
  desc: string;
  details: string;
}

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
      title: "AI Exploration",
      icon: <Sparkles className="w-5 h-5" />,
      desc: "Integrating AI and building bots.",
      details: "Pivoted into LLM scripting, custom WhatsApp automation engines, workflows, and kernel customizations.",
    },
  ];

  return (
    <div className="w-full py-8 relative overflow-hidden select-none" ref={containerRef}>
      <div className="w-full relative">
        
        {/* Background Vertical Line container */}
        <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2" />
        
        {/* Growing Scroll Line */}
        <motion.div 
          className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-success md:-translate-x-1/2 origin-top"
          style={{ scaleY: lineHeight }}
        />

        <div className="flex flex-col space-y-[120px] relative z-10">
          {milestones.map((m, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className={`flex flex-col md:flex-row items-start md:items-center relative w-full ${isEven ? "md:flex-row-reverse" : ""}`}
              >
                {/* Node Icon */}
                <div className="absolute left-0 md:left-1/2 w-[80px] h-[80px] flex items-center justify-center -translate-y-2 md:-translate-y-0 md:-translate-x-1/2 z-20">
                  <motion.div 
                    initial={{ backgroundColor: "rgba(17,17,17,1)", borderColor: "rgba(255,255,255,0.1)", color: "rgba(161,161,170,1)" }}
                    whileInView={{ 
                      backgroundColor: "rgba(124,58,237,0.1)", 
                      borderColor: "rgba(124,58,237,1)",
                      color: "rgba(255,255,255,1)"
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-14 h-14 rounded-full border-2 flex items-center justify-center relative bg-bg-dark"
                  >
                    {m.icon}
                  </motion.div>
                </div>

                {/* Content Box */}
                <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? "md:pr-16 text-left md:text-right" : "md:pl-16 text-left"}`}>
                  <div className="glass-card p-8 rounded-2xl hover:scale-[1.02] transition-transform duration-500">
                    <div className="text-accent-secondary font-mono font-bold text-[14px] tracking-wider mb-[12px]">
                      {m.year}
                    </div>
                    <h4 className="text-text-main font-bold text-[24px] tracking-wide font-sans mb-[16px]">
                      {m.title}
                    </h4>
                    <p className="text-text-muted text-[16px] mb-[16px] font-sans font-normal leading-relaxed">
                      {m.desc}
                    </p>
                    <p className="text-white/60 text-[14px] font-mono leading-relaxed">
                      {m.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
