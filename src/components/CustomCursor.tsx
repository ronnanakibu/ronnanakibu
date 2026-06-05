"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  // Position state
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device is mobile or touch
    const checkDevice = () => {
      const mobile = window.matchMedia("(pointer: coarse)").matches || 
                     ("ontouchstart" in window) || 
                     (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // Update dot position instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Update cursor light source position instantly (updates root CSS variables)
      if (lightRef.current) {
        lightRef.current.style.setProperty("--x", `${e.clientX}px`);
        lightRef.current.style.setProperty("--y", `${e.clientY}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Smooth lerp animation for the outer ring
    let animationId: number;
    const animateRing = () => {
      const ease = 0.15; // spring ease factor
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationId = requestAnimationFrame(animateRing);
    };

    animateRing();

    // Hover effect states (hovering clickable buttons, links, custom classes)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest("a, button, [role='button'], .clickable");
      if (isClickable && ringRef.current && dotRef.current) {
        ringRef.current.classList.add("scale-[1.8]", "border-accent-secondary", "bg-accent-secondary/5");
        dotRef.current.classList.add("scale-[0.5]", "bg-accent-secondary");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest("a, button, [role='button'], .clickable");
      if (isClickable && ringRef.current && dotRef.current) {
        ringRef.current.classList.remove("scale-[1.8]", "border-accent-secondary", "bg-accent-secondary/5");
        dotRef.current.classList.remove("scale-[0.5]", "bg-accent-secondary");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Page cursor light source glow effect */}
      <div 
        ref={lightRef} 
        className="cursor-glow-source" 
        style={{ "--x": "-1000px", "--y": "-1000px" } as React.CSSProperties}
      />

      {/* Custom cursor dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent-primary rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
      />

      {/* Custom cursor outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-accent-primary/50 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out"
      />
    </>
  );
}
