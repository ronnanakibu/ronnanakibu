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
            opacity: 0,
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 bg-bg-dark z-[99999] flex items-center justify-center overflow-hidden"
          onAnimationComplete={(definition) => {
            // Wait for exit transition to complete before unmounting
            if (definition && (definition as { opacity?: number }).opacity === 0) {
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
                initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  filter: "blur(0px)",
                  scale: 1,
                  transition: { duration: 0.6, ease: "easeOut" }
                }}
                exit={{ 
                  opacity: 0, 
                  filter: "blur(10px)",
                  scale: 1.05,
                  transition: { duration: 0.4, ease: "easeIn" }
                }}
                className={`text-5xl md:text-7xl font-bold tracking-wider font-sans select-none text-white`}
              >
                {WORDS[index]}
              </motion.h1>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
