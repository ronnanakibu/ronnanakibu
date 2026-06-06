"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
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
    <div className="mb-[40px] text-left relative flex flex-col items-start w-full">
      <div className="text-[14px] font-mono text-accent-primary uppercase tracking-widest leading-none">
        {num} — {id.toUpperCase()}
      </div>
      <h2 className="text-[32px] md:text-[44px] lg:text-[56px] font-black font-display tracking-tight text-text-main mt-[12px] uppercase leading-none">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[16px] text-text-muted font-sans mt-[16px] max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
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
            className="fixed top-0 left-0 w-full z-50 bg-bg-dark/60 backdrop-blur-md border-b border-white/5 h-[72px]"
          >
            <div className="max-w-[1280px] mx-auto px-[16px] md:px-[24px] lg:px-[32px] h-full flex items-center justify-between">
              
              {/* Logo */}
              <a href="#hero" className="flex items-center space-x-2 font-bold font-sans tracking-widest text-[24px] text-text-main hover:text-accent-secondary transition duration-300 clickable leading-none">
                <span>RONN</span>
                <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse" />
              </a>

              {/* Navigation Anchors Links */}
              <nav className="hidden md:flex gap-[32px] text-[14px] font-mono tracking-widest uppercase">
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
              <div className="flex items-center space-x-2 bg-white/5 border border-white/5 rounded-full px-3 py-1.5 text-[12px] font-mono text-text-muted select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-success animate-pulse" />
                <span className="hidden sm:inline">Active Playground</span>
              </div>
            </div>
          </motion.header>

          {/* MAIN WORKSPACE WRAPPER */}
          <main className="flex-1 w-full relative z-10">
            
            {/* ==================== SECTION 01: HERO ==================== */}
            <section id="hero" className="min-h-screen flex flex-col justify-center relative scroll-mt-[72px] select-none">
              
              <div className="max-w-[1280px] mx-auto px-[16px] md:px-[24px] lg:px-[32px] w-full py-[120px] md:py-[96px] lg:py-[120px] flex-1 flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[48px] w-full items-center">
                  
                  {/* Left: Text */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                    className="flex flex-col items-start text-left z-10 max-w-[620px] w-full"
                  >
                    {/* Hero subtitle badge */}
                    <div className="flex items-center space-x-2 text-[14px] font-mono text-accent-secondary uppercase tracking-widest mb-[24px] bg-accent-secondary/10 px-4 py-1.5 rounded-full border border-accent-secondary/15 w-max leading-none">
                      <Sparkles className="w-4 h-4 text-accent-secondary" />
                      <span>Multimedia Explorer</span>
                    </div>

                    {/* Big typography title */}
                    <h1 className="text-[56px] md:text-[76px] lg:text-[96px] font-black font-display tracking-tight text-white leading-[0.9] mb-[16px] relative uppercase">
                      RONN
                    </h1>

                    {/* Rolodex roles listing */}
                    <div className="text-[16px] font-mono text-text-muted mb-[32px] leading-relaxed flex flex-wrap gap-2">
                      <span className="text-white">Designer.</span>
                      <span className="text-accent-primary">Photographer.</span>
                      <span className="text-white">Developer.</span>
                      <span className="text-accent-secondary">Creator.</span>
                    </div>

                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-[48px]">
                      <a
                        href="#journey"
                        data-magnetic
                        className="px-8 py-4 rounded-full bg-white text-bg-dark hover:scale-105 hover:bg-gray-200 text-[16px] font-sans font-bold transition-all duration-300 flex items-center justify-center space-x-2 clickable"
                      >
                        <span>Explore Journey</span>
                      </a>
                      <a
                        href="#work"
                        data-magnetic
                        className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-[16px] font-sans font-bold text-text-main transition duration-300 flex items-center justify-center clickable"
                      >
                        View Projects
                      </a>
                    </div>

                    {/* Social media connections */}
                    <div className="flex space-x-6 text-text-muted">
                      <a href="https://instagram.com/ronnanakibu" target="_blank" className="hover:text-accent-secondary transition clickable" data-magnetic>
                        <InstagramIcon className="w-6 h-6" />
                      </a>
                      <a href="https://github.com/ronnanakibu" target="_blank" className="hover:text-accent-secondary transition clickable" data-magnetic>
                        <GithubIcon className="w-6 h-6" />
                      </a>
                      <a href="https://linkedin.com/in/ronnanakibu" target="_blank" className="hover:text-accent-secondary transition clickable" data-magnetic>
                        <LinkedinIcon className="w-6 h-6" />
                      </a>
                    </div>
                  </motion.div>

                  {/* Right: Interactive Visual Placeholder for 3D/Parallax */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
                    className="hidden lg:flex justify-center items-center h-[500px] w-full relative perspective-1000"
                  >
                    {/* Floating lights inside visual container */}
                    <div className="absolute top-[20%] left-[15%] glow-spot-purple scale-75 opacity-50 mix-blend-screen" />
                    <div className="absolute bottom-[20%] right-[10%] glow-spot-cyan scale-75 opacity-50 mix-blend-screen" />
                    
                    {/* Glass panel to add depth to the global Three.js background */}
                    <div className="w-[360px] h-[460px] glass-panel rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden transform hover:rotate-y-12 transition-transform duration-700 ease-out flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/20 via-transparent to-accent-secondary/20 opacity-30" />
                      <div className="text-white/10 font-mono text-9xl font-black">R</div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Scroll down indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-[14px] font-mono text-text-muted uppercase tracking-widest animate-bounce">
                <span className="mb-1.5">Scroll</span>
                <ArrowDown className="w-4 h-4" />
              </div>
            </section>

            {/* ==================== SECTION 02: ABOUT ==================== */}
            <section id="about" className="w-full relative scroll-mt-[72px] py-[72px] md:py-[96px] lg:py-[120px]">
              <div className="max-w-[1280px] mx-auto px-[16px] md:px-[24px] lg:px-[32px]">
                <SectionHeader
                  id="about"
                  num="02"
                  title="whoami"
                  subtitle="A futuristic terminal console describing Rony's core profile, location, current focus, and details."
                />
                <div className="max-w-[900px] mx-auto w-full mt-10">
                  <Terminal 
                    title="whoami.sh" 
                    initialCommand="whoami" 
                    autoExecute={true} 
                  />
                </div>
              </div>
            </section>

            {/* ==================== SECTION 03: CREATIVE JOURNEY ==================== */}
            <section id="journey" className="w-full relative scroll-mt-[72px] py-[72px] md:py-[96px] lg:py-[120px]">
              <div className="max-w-[1280px] mx-auto px-[16px] md:px-[24px] lg:px-[32px]">
                <SectionHeader
                  id="journey"
                  num="03"
                  title="Creative Journey"
                  subtitle="An immersive chronological walkthrough illustrating Rony's creative evolution from 2018 onwards."
                />
                <JourneyTimeline />
              </div>
            </section>

            {/* ==================== SECTION 04: FEATURED WORK ==================== */}
            <section id="work" className="w-full relative scroll-mt-[72px] py-[72px] md:py-[96px] lg:py-[120px]">
              <div className="max-w-[1280px] mx-auto px-[16px] md:px-[24px] lg:px-[32px]">
                <SectionHeader
                  id="work"
                  num="04"
                  title="Featured Work"
                  subtitle="Premium asymmetrical grid displaying multimedia, design, video editing, development, and AI entries."
                />
                <ProjectGrid />
              </div>
            </section>

            {/* ==================== SECTION 05: PHOTOGRAPHY SHOWCASE ==================== */}
            <section id="photography" className="w-full relative scroll-mt-[72px] py-[72px] md:py-[96px] lg:py-[120px]">
              <div className="max-w-[1280px] mx-auto px-[16px] md:px-[24px] lg:px-[32px]">
                <SectionHeader
                  id="photography"
                  num="05"
                  title="Photography Showcase"
                  subtitle="Moments. Stories. Emotions. Immersive photography gallery layout showcasing EXIF specifications."
                />
                <PhotoGallery />
              </div>
            </section>

            {/* ==================== SECTION 06: SKILLS ECOSYSTEM ==================== */}
            <section id="skills" className="w-full relative scroll-mt-[72px] py-[72px] md:py-[96px] lg:py-[120px]">
              <div className="max-w-[1280px] mx-auto px-[16px] md:px-[24px] lg:px-[32px]">
                <SectionHeader
                  id="skills"
                  num="06"
                  title="Skills Ecosystem"
                  subtitle="Orbit visualization tracing core skills and specialized tools. Hover orbiting satellites to reveal stacks."
                />
                <SkillsOrbit />
              </div>
            </section>

            {/* ==================== SECTION 07: EXPERIMENT LAB ==================== */}
            <section id="lab" className="w-full relative scroll-mt-[72px] py-[72px] md:py-[96px] lg:py-[120px]">
              <div className="max-w-[1280px] mx-auto px-[16px] md:px-[24px] lg:px-[32px]">
                <SectionHeader
                  id="lab"
                  num="07"
                  title="Experiment Lab"
                  subtitle="Research entries documenting kernel projects, customizations, AI setups, and low-level engineering scripts."
                />
                <ExperimentLab />
              </div>
            </section>

            {/* ==================== SECTION 08: MEET THE HUMAN ==================== */}
            <section id="human" className="w-full relative scroll-mt-[72px] py-[72px] md:py-[96px] lg:py-[120px]">
              <div className="max-w-[1280px] mx-auto px-[16px] md:px-[24px] lg:px-[32px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[48px] lg:gap-[64px] items-center w-full">
                  
                  {/* Left: Deep Storytelling */}
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    className="text-left flex flex-col justify-center w-full"
                  >
                    <h3 className="text-[32px] md:text-[44px] lg:text-[56px] font-black font-display uppercase tracking-tight text-white mb-[24px] leading-none">
                      Behind the work.
                    </h3>
                    
                    <div className="space-y-[16px] text-[16px] font-sans text-text-muted font-normal leading-relaxed">
                      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}>
                        Building.
                      </motion.p>
                      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}>
                        Learning.
                      </motion.p>
                      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.0, duration: 1 }}>
                        Designing.
                      </motion.p>
                      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }}>
                        Experimenting.
                      </motion.p>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0 }} 
                      whileInView={{ opacity: 1 }} 
                      transition={{ delay: 2.0, duration: 1 }}
                      className="mt-[32px] text-[14px] font-mono text-white/40 max-w-md leading-relaxed"
                    >
                      Technology is just a tool. The true craft is how we use it to build experiences that resonate.
                    </motion.div>
                  </motion.div>

                  {/* Right: Monochrome Portrait */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="flex justify-center md:justify-end w-full"
                  >
                    <div className="w-full max-w-[450px] aspect-[4/5] rounded-xl overflow-hidden relative group clickable shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                      {/* Grayscale Portrait Asset */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src="/rony-portrait-headshot.png" 
                        alt="Rony Imanuel Sihombing"
                        className="w-full h-full object-cover object-center grayscale brightness-75 contrast-125 group-hover:scale-105 transition-transform duration-[2000ms] ease-out z-0"
                      />
                      {/* Vintage film grain overlay */}
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-20 pointer-events-none mix-blend-overlay z-10" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* ==================== SECTION 09: CONTACT ==================== */}
            <section id="contact" className="w-full relative scroll-mt-[72px] py-[72px] md:py-[96px] lg:py-[120px]">
              <div className="max-w-[1280px] mx-auto px-[16px] md:px-[24px] lg:px-[32px]">
                <SectionHeader
                  id="contact"
                  num="09"
                  title="connect"
                  subtitle="Futuristic terminal touchpoint. Select Quick Exec or type to launch interactive redirect sequences."
                />
                
                {/* Centered card with terminal aesthetic */}
                <div className="max-w-[900px] mx-auto w-full glass-panel border border-white/10 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row gap-8 lg:gap-12 items-center justify-between mt-10">
                  {/* Left side terminal component */}
                  <div className="w-full md:w-[60%]">
                    <Terminal 
                      title="connect.sh" 
                      initialCommand="connect" 
                      autoExecute={true} 
                    />
                  </div>
                  {/* Right side interactive graphical connector */}
                  <div className="w-full md:w-[35%] flex justify-center h-[260px] relative overflow-hidden select-none">
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
              </div>
            </section>
          </main>

          {/* ==================== FOOTER ==================== */}
          <footer className="w-full bg-surface-dark border-t border-white/5 py-8 mt-auto relative z-10 select-none">
            <div className="max-w-[1280px] mx-auto px-[16px] md:px-[24px] lg:px-[32px] flex flex-col md:flex-row items-center justify-between text-[14px] font-mono text-text-muted space-y-4 md:space-y-0">
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
