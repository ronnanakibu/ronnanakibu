"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

// Local SVGs for Brand Icons
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Sub-components
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import ParticlesBg from "@/components/ParticlesBg";
import Terminal from "@/components/Terminal";
import JourneyTimeline from "@/components/JourneyTimeline";
import ProjectGrid from "@/components/ProjectGrid";
import PhotoGallery from "@/components/PhotoGallery";
import SkillsOrbit from "@/components/SkillsOrbit";
import ExperimentLab from "@/components/ExperimentLab";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");

  // Lenis Smooth Scroll Setup
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Dynamic Header active section highlight based on scroll position
    const handleScroll = () => {
      const sections = ["hero", "about", "journey", "work", "photography", "skills", "lab", "human", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  // Section Headers helper
  const SectionHeader = ({ id, num, title, subtitle }: { id: string; num: string; title: string; subtitle?: string }) => (
    <div className="mb-10 text-left relative">
      <div className="flex items-center space-x-2 text-[10px] font-mono text-accent-primary uppercase tracking-widest mb-1.5">
        <span>{num} — {id.toUpperCase()}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary animate-pulse" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold font-sans tracking-tight text-text-main">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs text-text-muted font-mono mt-1.5 max-w-lg leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="w-12 h-[2px] bg-gradient-to-r from-accent-primary to-accent-secondary mt-4" />
    </div>
  );

  return (
    <>
      {/* Loading intro animation sequence */}
      <Loader onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <div className="relative min-h-screen flex flex-col antialiased bg-bg-dark text-text-main select-none">
          
          {/* Custom Cursor & Ambient Lights */}
          <CustomCursor />
          <ParticlesBg />

          {/* Sticky Nav Header */}
          <motion.header 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="fixed top-0 left-0 w-full z-50 bg-bg-dark/40 backdrop-blur-md border-b border-white/5"
          >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
              
              {/* Logo */}
              <a href="#hero" className="flex items-center space-x-2 font-bold font-sans tracking-widest text-lg text-text-main hover:text-accent-secondary transition duration-300 clickable">
                <span>RONN</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary animate-pulse" />
              </a>

              {/* Navigation Anchors Links */}
              <nav className="hidden md:flex space-x-6 text-[10px] font-mono tracking-widest uppercase">
                {[
                  { id: "about", label: "About" },
                  { id: "journey", label: "Journey" },
                  { id: "work", label: "Work" },
                  { id: "photography", label: "Photography" },
                  { id: "skills", label: "Skills" },
                  { id: "lab", label: "Lab" },
                  { id: "contact", label: "Contact" }
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`transition duration-300 relative py-1 clickable ${
                      activeSection === item.id || (activeSection === "human" && item.id === "about")
                        ? "text-text-main font-semibold"
                        : "text-text-muted hover:text-text-main"
                    }`}
                  >
                    {item.label}
                    {(activeSection === item.id || (activeSection === "human" && item.id === "about")) && (
                      <motion.span 
                        layoutId="activeNavLine" 
                        className="absolute bottom-0 left-0 w-full h-[1.5px] bg-accent-secondary"
                      />
                    )}
                  </a>
                ))}
              </nav>

              {/* Status indicator */}
              <div className="flex items-center space-x-2 bg-white/5 border border-white/5 rounded-full px-3 py-1 text-[9px] font-mono text-text-muted select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-success animate-pulse" />
                <span className="hidden sm:inline">Active Playground</span>
              </div>
            </div>
          </motion.header>

          {/* MAIN WORKSPACE WRAPPER */}
          <main className="flex-1 w-full max-w-6xl mx-auto px-6 pt-16 relative z-10 space-y-24 md:space-y-36 pb-12">
            
            {/* ==================== SECTION 01: HERO ==================== */}
            <section id="hero" className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center relative py-12 text-center select-none">
              
              {/* Floating lights inside section */}
              <div className="absolute top-[20%] left-[15%] glow-spot-purple" />
              <div className="absolute bottom-[20%] right-[10%] glow-spot-cyan" />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl flex flex-col items-center"
              >
                {/* Hero subtitle badge */}
                <div className="flex items-center space-x-2 text-[10px] font-mono text-accent-secondary uppercase tracking-widest mb-4 bg-accent-secondary/10 px-3 py-1 rounded-full border border-accent-secondary/15">
                  <Sparkles className="w-3.5 h-3.5 text-accent-secondary" />
                  <span>Multimedia Explorer</span>
                </div>

                {/* Big typography title */}
                <h1 className="text-6xl md:text-8xl font-black font-sans tracking-tight text-white leading-none mb-6 relative">
                  RONN
                </h1>

                {/* Rolodex roles listing */}
                <p className="text-base md:text-lg font-mono text-text-muted max-w-md mb-8 leading-relaxed">
                  DESIGNER. <span className="text-accent-primary">PHOTOGRAPHER.</span> DEVELOPER. <span className="text-accent-secondary">CREATOR.</span>
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center px-4">
                  <a
                    href="#work"
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary hover:brightness-110 text-xs font-mono font-bold text-white transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center justify-center space-x-2 clickable"
                  >
                    <span>View Projects</span>
                    <span>→</span>
                  </a>
                  <a
                    href="#journey"
                    className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-xs font-mono font-bold text-text-main transition duration-300 flex items-center justify-center clickable"
                  >
                    Explore Journey
                  </a>
                </div>

                {/* Social media connections */}
                <div className="flex space-x-5 mt-16 text-text-muted">
                  <a href="https://instagram.com/ronn.sihombing" target="_blank" className="hover:text-accent-secondary transition clickable">
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                  <a href="https://github.com/ronnsihombing" target="_blank" className="hover:text-accent-secondary transition clickable">
                    <GithubIcon className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com/in/ronnsihombing" target="_blank" className="hover:text-accent-secondary transition clickable">
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>

              {/* Scroll down indicator */}
              <div className="absolute bottom-6 flex flex-col items-center text-[9px] font-mono text-text-muted uppercase tracking-widest animate-bounce">
                <span className="mb-1.5">Scroll to explore</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </div>
            </section>

            {/* ==================== SECTION 02: ABOUT ==================== */}
            <section id="about" className="py-12 scroll-mt-20">
              <SectionHeader
                id="about"
                num="02"
                title="whoami"
                subtitle="A futuristic terminal console describing Rony's core profile, location, current focus, and details."
              />
              <div className="max-w-2xl mx-auto mt-6">
                <Terminal 
                  title="whoami.sh" 
                  initialCommand="whoami" 
                  autoExecute={true} 
                />
              </div>
            </section>

            {/* ==================== SECTION 03: CREATIVE JOURNEY ==================== */}
            <section id="journey" className="py-12 scroll-mt-20">
              <SectionHeader
                id="journey"
                num="03"
                title="Creative Journey"
                subtitle="An immersive chronological walkthrough illustrating Rony's creative evolution from 2018 onwards."
              />
              <JourneyTimeline />
            </section>

            {/* ==================== SECTION 04: FEATURED WORK ==================== */}
            <section id="work" className="py-12 scroll-mt-20">
              <SectionHeader
                id="work"
                num="04"
                title="Featured Work"
                subtitle="Premium asymmetrical grid displaying multimedia, design, video editing, development, and AI entries."
              />
              <ProjectGrid />
            </section>

            {/* ==================== SECTION 05: PHOTOGRAPHY SHOWCASE ==================== */}
            <section id="photography" className="py-12 scroll-mt-20">
              <SectionHeader
                id="photography"
                num="05"
                title="Photography Showcase"
                subtitle="Moments. Stories. Emotions. Immersive photography gallery layout showcasing EXIF specifications."
              />
              <PhotoGallery />
            </section>

            {/* ==================== SECTION 06: SKILLS ECOSYSTEM ==================== */}
            <section id="skills" className="py-12 scroll-mt-20">
              <SectionHeader
                id="skills"
                num="06"
                title="Skills Ecosystem"
                subtitle="Orbit visualization tracing core skills and specialized tools. Hover orbiting satellites to reveal stacks."
              />
              <SkillsOrbit />
            </section>

            {/* ==================== SECTION 07: EXPERIMENT LAB ==================== */}
            <section id="lab" className="py-12 scroll-mt-20">
              <SectionHeader
                id="lab"
                num="07"
                title="Experiment Lab"
                subtitle="Research entries documenting kernel projects, customizations, AI setups, and low-level engineering scripts."
              />
              <ExperimentLab />
            </section>

            {/* ==================== SECTION 08: MEET THE HUMAN ==================== */}
            <section id="human" className="py-12 scroll-mt-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
                
                {/* Left details text */}
                <div className="text-left">
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-accent-primary uppercase tracking-widest mb-1.5">
                    <span>08 — MEET THE HUMAN</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary animate-pulse" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold font-sans tracking-tight text-white mb-6">
                    Behind the work, there&apos;s a person who keeps building.
                  </h3>
                  
                  {/* Philosophy lists */}
                  <ul className="space-y-4 mb-8 text-xs font-mono text-text-muted">
                    <li className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                      <span>I believe in continuous learning.</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
                      <span>I build with purpose and creative pacing.</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-success" />
                      <span>I design with empathy and strong visual hierarchies.</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span>I create to make a lasting technological impact.</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      <span>I experiment to find possibilities at the edge.</span>
                    </li>
                  </ul>

                  {/* Personal quote */}
                  <div className="p-4 border-l border-accent-secondary/50 bg-accent-secondary/5 rounded-r-lg font-sans italic text-sm text-accent-secondary">
                    &ldquo;The best way to predict the future is to create it.&rdquo;
                  </div>
                </div>

                {/* Right Portrait Column */}
                <div className="flex justify-center md:justify-end">
                  <div className="w-[280px] h-[340px] md:w-[320px] md:h-[400px] rounded-2xl border border-white/10 overflow-hidden relative shadow-[0_0_30px_rgba(0,0,0,0.5)] group clickable">
                    {/* Glowing ring overlay */}
                    <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none group-hover:border-accent-primary/30 transition-all duration-300 z-20" />
                    {/* Dark overlay shader */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent pointer-events-none z-10" />
                    {/* Grayscale Portrait Asset */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="/rony-portrait-final.png" 
                      alt="Rony Imanuel Sihombing Portrait"
                      className="w-full h-full object-cover grayscale brightness-[0.8] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out z-0"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* ==================== SECTION 09: CONTACT ==================== */}
            <section id="contact" className="py-12 scroll-mt-20">
              <SectionHeader
                id="contact"
                num="09"
                title="connect"
                subtitle="Futuristic terminal touchpoint. Select Quick Exec or type to launch interactive redirect sequences."
              />
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
                {/* Left side terminal component */}
                <div className="md:col-span-7">
                  <Terminal 
                    title="connect.sh" 
                    initialCommand="connect" 
                    autoExecute={true} 
                  />
                </div>
                {/* Right side interactive graphical connector */}
                <div className="md:col-span-5 flex justify-center h-[260px] relative overflow-hidden select-none">
                  {/* Glowing rotating grid representing network connection */}
                  <svg className="w-full h-full max-w-[240px] animate-[spin_60s_linear_infinite]" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" fill="none" />
                    <circle cx="100" cy="100" r="50" stroke="rgba(0,229,255,0.05)" strokeWidth="1" fill="none" />
                    <circle cx="100" cy="100" r="20" stroke="rgba(124,58,237,0.1)" strokeWidth="1.5" fill="none" />
                    
                    {/* Pulsing connecting nodes */}
                    <g className="animate-pulse">
                      <circle cx="100" cy="20" r="4" fill="#00E5FF" />
                      <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(0,229,255,0.15)" strokeWidth="1" />
                      
                      <circle cx="20" cy="100" r="4" fill="#7C3AED" />
                      <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(124,58,237,0.15)" strokeWidth="1" />
                    </g>
                    
                    <g className="[animation-delay:1s] animate-pulse">
                      <circle cx="156.5" cy="43.5" r="3" fill="#22C55E" />
                      <circle cx="43.5" cy="156.5" r="3" fill="#22C55E" />
                      <line x1="43.5" y1="156.5" x2="156.5" y2="43.5" stroke="rgba(34,197,94,0.1)" strokeWidth="0.8" />
                    </g>
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </section>
          </main>

          {/* ==================== FOOTER ==================== */}
          <footer className="w-full bg-surface-dark border-t border-white/5 py-8 mt-auto relative z-10 select-none">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-[10px] font-mono text-text-muted space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <span>© 2026 RONN. All rights reserved.</span>
              </div>
              <div className="flex items-center space-x-1.5 text-accent-secondary">
                <span>Built with passion, curiosity, and creativity</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
              </div>
            </div>
            {/* Fine separating dynamic light line */}
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-accent-primary/40 to-transparent mx-auto mt-4" />
          </footer>
        </div>
      )}
    </>
  );
}
