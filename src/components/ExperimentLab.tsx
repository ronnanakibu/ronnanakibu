"use client";

import React from "react";
import { motion } from "framer-motion";
import { FlaskConical, GitFork, Cpu, ShieldAlert, Binary } from "lucide-react";

interface LabEntry {
  id: string;
  title: string;
  category: string;
  status: "active" | "in_progress" | "learning" | "concept";
  statusLabel: string;
  desc: string;
  techStack: string[];
  icon: React.ReactNode;
}

export default function ExperimentLab() {
  const entries: LabEntry[] = [
    {
      id: "lab-1",
      title: "WhatsApp Bot Development",
      category: "Automation / NodeJS",
      status: "in_progress",
      statusLabel: "In Progress",
      desc: "Live messaging automation framework incorporating Express API and persistent state tracking via SQLite.",
      techStack: ["Node.js", "Baileys", "Express", "SQLite"],
      icon: <GitFork className="w-5 h-5 text-accent-secondary" />
    },
    {
      id: "lab-2",
      title: "AI Experiments",
      category: "Machine Learning",
      status: "active",
      statusLabel: "Active",
      desc: "Local NLP workflows routing complex prompting systems dynamically into Groq, Gemini, and local LLM pipelines.",
      techStack: ["Python", "OpenAI API", "LangChain", "n8n"],
      icon: <FlaskConical className="w-5 h-5 text-accent-primary" />
    },
    {
      id: "lab-3",
      title: "Automation Tools",
      category: "Scripting / Devops",
      status: "active",
      statusLabel: "Active",
      desc: "Custom bash cron systems, notification dispatchers, and system performance monitoring logs.",
      techStack: ["Python", "Shell", "n8n", "Linux Cron"],
      icon: <Cpu className="w-5 h-5 text-accent-success" />
    },
    {
      id: "lab-4",
      title: "Custom ROM Projects",
      category: "Android OS Dev",
      status: "in_progress",
      statusLabel: "In Progress",
      desc: "Compiling custom Android Open Source Project (AOSP) system trees with custom optimization flags.",
      techStack: ["Android OS", "AOSP Toolchain", "C++", "Makefile"],
      icon: <ShieldAlert className="w-5 h-5 text-orange-400" />
    },
    {
      id: "lab-5",
      title: "Kernel Exploration",
      category: "Low-level Systems",
      status: "learning",
      statusLabel: "Learning",
      desc: "Compiling local Linux kernels, hacking custom CPU scheduling priorities, and writing basic device drivers.",
      techStack: ["Linux", "Kernel C", "GDB Debugger", "Bash"],
      icon: <Binary className="w-5 h-5 text-violet-400" />
    },
    {
      id: "lab-6",
      title: "Creative Concepts",
      category: "Motion / 3D Graphics",
      status: "concept",
      statusLabel: "Concept",
      desc: "Interactive experiments utilizing ThreeJS buffers, shaders, and procedural mathematical rendering grids.",
      techStack: ["ThreeJS", "WebGL Shaders", "GSAP", "Vanilla JS"],
      icon: <FlaskConical className="w-5 h-5 text-text-muted" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-accent-success/10 border-accent-success/30 text-accent-success";
      case "in_progress":
        return "bg-orange-500/10 border-orange-500/30 text-orange-400";
      case "learning":
        return "bg-accent-primary/10 border-accent-primary/30 text-accent-primary";
      case "concept":
        return "bg-white/5 border-white/10 text-text-muted";
      default:
        return "bg-white/5 border-white/10 text-text-muted";
    }
  };

  return (
    <div className="w-full py-8 select-none">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {entries.map((entry, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            key={entry.id}
            className="glass-card rounded-xl p-6 relative border border-white/5 flex flex-col justify-between group overflow-hidden"
          >
            {/* Tech grid mesh backdrop */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            <div>
              {/* Header Status & Icon */}
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
                  {entry.icon}
                </div>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${getStatusColor(entry.status)}`}>
                  {entry.statusLabel}
                </span>
              </div>

              {/* Title & Description */}
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block mb-1">
                {entry.category}
              </span>
              <h4 className="text-text-main font-bold font-sans text-base mb-2 group-hover:text-accent-secondary transition-colors duration-200">
                {entry.title}
              </h4>
              <p className="text-text-muted text-xs font-mono leading-relaxed mb-6">
                {entry.desc}
              </p>
            </div>

            {/* Tech Stack tags */}
            <div>
              <div className="w-full h-[1px] bg-white/5 mb-4" />
              <div className="flex flex-wrap gap-1.5">
                {entry.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-text-main/80 font-mono border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Glowing Corner Accents */}
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-accent-secondary transition-colors duration-200" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
