"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

const WORDS = [
  "RONN",
  "Multimedia",
  "Photography",
  "Design",
  "Development",
  "Creativity"
];

export default function Loader({ onComplete }: LoaderProps) {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (index < WORDS.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 350); // fast transition for each word
      return () => clearTimeout(timer);
    } else {
      // Completed last word, wait a brief moment then trigger exit
      const timer = setTimeout(() => {
        setIsExiting(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100vh",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 bg-bg-dark z-[99999] flex items-center justify-center overflow-hidden"
          onAnimationComplete={(definition) => {
            // Wait for exit transition to complete before unmounting
            if (definition && (definition as { y?: string }).y === "-100vh") {
              onComplete();
            }
          }}
        >
          {/* Subtle glowing ambient spots */}
          <div className="absolute top-[40%] left-[45%] w-[250px] h-[250px] rounded-full bg-accent-primary/15 blur-[60px] pointer-events-none" />
          <div className="absolute bottom-[30%] left-[30%] w-[200px] h-[200px] rounded-full bg-accent-secondary/10 blur-[50px] pointer-events-none" />

          {/* Morphing Word Container */}
          <div className="text-center relative z-10 px-4">
            <AnimatePresence mode="wait">
              <motion.h1
                key={WORDS[index]}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  filter: "blur(0px)",
                  transition: { duration: 0.35, ease: "easeOut" }
                }}
                exit={{ 
                  opacity: 0, 
                  y: -30, 
                  filter: "blur(8px)",
                  transition: { duration: 0.25, ease: "easeIn" }
                }}
                className={`text-5xl md:text-7xl font-bold tracking-wider font-sans select-none ${
                  index === 0
                    ? "bg-clip-text text-transparent bg-gradient-to-r from-text-main via-accent-primary to-accent-secondary"
                    : index === WORDS.length - 1
                    ? "text-accent-success"
                    : "text-text-main"
                }`}
              >
                {WORDS[index]}
              </motion.h1>
            </AnimatePresence>

            {/* Cinematic subtitle progress bar */}
            <div className="w-48 h-[1px] bg-white/10 mx-auto mt-6 relative overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${((index + 1) / WORDS.length) * 100}%` }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
