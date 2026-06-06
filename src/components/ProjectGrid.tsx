"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Film, Code, Camera, LayoutGrid, Cpu, Palette } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string; // 'photography' | 'design' | 'video' | 'dev' | 'ai'
  categoryLabel: string;
  desc: string;
  longDesc: string;
  techStack: string[];
  visualGradient: string;
  hasPlayIcon?: boolean;
}

export default function ProjectGrid() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const projects: Project[] = [
    {
      id: "urban-mood",
      title: "Urban Mood",
      category: "photography",
      categoryLabel: "Photography",
      desc: "Street photography capture of city lights and moody rainy nights.",
      longDesc: "A digital photo series exploring the juxtaposition of cold metal architectures, street puddles reflecting colorful store neon, and the isolation of urban travelers in heavy rainstorms. Captured using high-ISO lenses with custom film emulation color profiles.",
      techStack: ["Sony A7III", "85mm f/1.4", "Lightroom", "Color Theory"],
      visualGradient: "from-[#2A1B3D] via-[#1A1A2E] to-[#44318D]"
    },
    {
      id: "nebula-poster",
      title: "Nebula Poster",
      category: "design",
      categoryLabel: "Graphic Design",
      desc: "Cosmic abstract poster design incorporating complex vector graphics.",
      longDesc: "A graphic art project utilizing complex layer compositions, double exposures, and custom typographic layouts. Inspired by space exploration, solar winds, and nebula dust clouds. Printed in high-fidelity fluorescent pantone formats.",
      techStack: ["Photoshop", "Illustrator", "Layout Composition", "Pantone"],
      visualGradient: "from-[#110133] via-[#00917C] to-[#00E5FF]"
    },
    {
      id: "whatsapp-bot",
      title: "WhatsApp Bot",
      category: "dev",
      categoryLabel: "Development",
      desc: "Robust group automation bot built with Node.js and Baileys framework.",
      longDesc: "An advanced automation tool implementing group moderation actions, command builders, and live audio radio stream integrations. Features a real-time responsive web panel dashboard connected via Socket.IO with persistencies to local SQLite databases.",
      techStack: ["NodeJS", "Baileys API", "Socket.IO", "SQLite", "Express"],
      visualGradient: "from-[#0F2027] via-[#203A43] to-[#2C5364]"
    },
    {
      id: "cinematic-edit",
      title: "Cinematic Edit",
      category: "video",
      categoryLabel: "Video Editing",
      desc: "Moody creative video montage incorporating custom sound design.",
      longDesc: "A short cinematic production showcasing street footage, transitions synchronizing with music tracks, and complex color grading styles. Sound effects are fully custom-built to increase environmental spatial feedback and deep bass immersion.",
      techStack: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Sound Design"],
      visualGradient: "from-[#000000] via-[#7C3AED] to-[#111111]",
      hasPlayIcon: true
    },
    {
      id: "portfolio-web",
      title: "Portfolio Website",
      category: "dev",
      categoryLabel: "Web Development",
      desc: "Cinematic portfolio showcasing creative concepts and experiences.",
      longDesc: "An award-winning inspired personal dashboard featuring custom physics-based particles, responsive orbit graphs, terminals, and smooth page reveals. Designed in Dark Luxury, using Next.js 15, GSAP ScrollTrigger, and Framer Motion.",
      techStack: ["NextJS 15", "TypeScript", "TailwindCSS", "Framer Motion", "Lenis"],
      visualGradient: "from-[#141E30] to-[#243B55]"
    },
    {
      id: "ai-image-gen",
      title: "AI Image Gen",
      category: "ai",
      categoryLabel: "AI Project",
      desc: "Image generation interface leveraging diffusions and neural networks.",
      longDesc: "A visual sandbox interface feeding custom prompts into local Stable Diffusion checkpoints, allowing users to modify parameters (CFG, steps, seed) and generate custom cinematic styles matching Dark Luxury concepts.",
      techStack: ["Python", "PyTorch", "Stable Diffusion", "React", "FastAPI"],
      visualGradient: "from-[#1D2671] to-[#C33764]"
    }
  ];

  // Mouse Move handler for card tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = cardRefs.current[id];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // tilt angle factor
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // update spotlight coordinates inside the card
    card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--my", `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = (id: string) => {
    const card = cardRefs.current[id];
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  // Tab configuration
  const tabs = [
    { id: "all", label: "All", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { id: "photography", label: "Photography", icon: <Camera className="w-3.5 h-3.5" /> },
    { id: "design", label: "Design", icon: <Palette className="w-3.5 h-3.5" /> },
    { id: "video", label: "Video", icon: <Film className="w-3.5 h-3.5" /> },
    { id: "dev", label: "Development", icon: <Code className="w-3.5 h-3.5" /> },
    { id: "ai", label: "AI Projects", icon: <Cpu className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="w-full py-8 select-none">
      
      {/* Category Tab Selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 px-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-full font-mono text-xs flex items-center space-x-2 transition-all duration-300 border clickable ${
              activeTab === t.id
                ? "bg-accent-primary border-accent-primary text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                : "bg-surface-dark border-white/5 text-text-muted hover:border-white/20 hover:text-text-main"
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Projects Grid (Symmetrical Responsive Layout) */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full"
      >
        {filteredProjects.map((p, idx) => {
          return (
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={p.id}
              className="relative aspect-[16/10] w-full rounded-xl overflow-hidden glass-panel border border-white/5 cursor-pointer flex flex-col justify-end p-6 group transition-all duration-300"
              ref={(el) => { cardRefs.current[p.id] = el; }}
              onMouseMove={(e) => handleMouseMove(e, p.id)}
              onMouseLeave={() => handleMouseLeave(p.id)}
              onClick={() => setSelectedProject(p)}
              style={{
                background: `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255, 255, 255, 0.05) 0%, transparent 80%)`,
              } as React.CSSProperties}
            >
              {/* Glow border background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Dynamic Abstract Creative Background representing project */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${p.visualGradient} opacity-30 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none`} />

              {/* Grid noise/grid lines inside card for sci-fi look */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

              {/* Card content text */}
              <div className="relative z-10 flex flex-col items-start w-full">
                <span className="text-[14px] font-mono text-accent-secondary tracking-wider uppercase bg-accent-secondary/10 px-2.5 py-0.5 rounded-full mb-3 border border-accent-secondary/15">
                  {p.categoryLabel}
                </span>
                
                <h3 className="text-text-main font-sans font-bold text-[24px] tracking-wide flex items-center space-x-2 group-hover:text-accent-secondary transition-colors duration-200 leading-snug">
                  <span>{p.title}</span>
                  {p.hasPlayIcon && (
                    <span className="inline-block w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white scale-90 group-hover:bg-accent-primary transition-all duration-200">
                      ▶
                    </span>
                  )}
                </h3>
                
                <p className="text-text-muted text-[16px] font-sans mt-2 max-w-[95%] truncate leading-normal">
                  {p.desc}
                </p>
              </div>

              {/* Glowing Corner Accents */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-accent-secondary transition-colors duration-200" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-accent-secondary transition-colors duration-200" />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Project details dynamic Modal overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[10000] flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-surface-dark border border-white/10 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-text-muted hover:text-text-main w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition cursor-pointer z-50 clickable"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Graphic Backdrop inside modal */}
              <div className={`w-full h-44 bg-gradient-to-tr ${selectedProject.visualGradient} relative flex items-center justify-center`}>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:15px_15px]" />
                <h2 className="text-white font-bold tracking-widest text-4xl select-none font-sans drop-shadow-lg opacity-40">
                  {selectedProject.title.toUpperCase()}
                </h2>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <span className="text-[10px] font-mono text-accent-secondary tracking-widest uppercase font-bold">
                  {selectedProject.categoryLabel}
                </span>
                
                <h3 className="text-2xl font-bold font-sans text-text-main mt-1 mb-3">
                  {selectedProject.title}
                </h3>
                
                <p className="text-text-muted text-xs md:text-sm leading-relaxed font-mono mb-6">
                  {selectedProject.longDesc}
                </p>

                {/* Tech Stack items */}
                <h4 className="text-[10px] text-text-muted font-bold uppercase tracking-wider mb-2 font-mono">
                  Environment & Tools
                </h4>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {selectedProject.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-text-main font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-text-main font-semibold transition border border-white/5 cursor-pointer clickable"
                  >
                    Close Entry
                  </button>
                  <button 
                    onClick={() => {
                      if (selectedProject.category === "dev") {
                        window.open("https://github.com/ronnsihombing", "_blank");
                      } else {
                        window.open("https://instagram.com/ronn.sihombing", "_blank");
                      }
                    }}
                    className="flex-1 py-2 rounded-lg bg-accent-primary hover:bg-accent-primary/90 text-xs font-mono text-white font-semibold transition flex items-center justify-center space-x-1.5 cursor-pointer clickable"
                  >
                    <span>View Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
