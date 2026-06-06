"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, MapPin, Calendar, Maximize2, X, Aperture, Search } from "lucide-react";

interface Photograph {
  id: string;
  title: string;
  category: "atmosphere" | "street" | "nature" | "minimalism";
  categoryLabel: string;
  location: string;
  camera: string;
  lens: string;
  year: string;
  visualGradient: string; // fallback stylized graphics
  exif: string; // e.g. f/1.4, 1/160s, ISO 400
}

export default function PhotoGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photograph | null>(null);

  const photographs: Photograph[] = [
    {
      id: "photo-1",
      title: "Urban Solitude",
      category: "street",
      categoryLabel: "Street Photography",
      location: "Jakarta, Indonesia",
      camera: "Sony A7III",
      lens: "85mm f/1.4 GM",
      year: "2023",
      visualGradient: "from-[#080F1A] via-[#102A45] to-[#1E3B5C]",
      exif: "f/1.4 • 1/160s • ISO 400"
    },
    {
      id: "photo-2",
      title: "Alpine Fog",
      category: "nature",
      categoryLabel: "Nature & Landscape",
      location: "Mount Bromo, East Java",
      camera: "Fujifilm X-T4",
      lens: "35mm f/1.4",
      year: "2024",
      visualGradient: "from-[#0D151C] via-[#2D3E4E] to-[#111A24]",
      exif: "f/5.6 • 1/250s • ISO 160"
    },
    {
      id: "photo-3",
      title: "Void Structure",
      category: "minimalism",
      categoryLabel: "Minimalism",
      location: "Downtown Singapore",
      camera: "Sony A7III",
      lens: "24-70mm f/2.8 GM",
      year: "2023",
      visualGradient: "from-[#111115] via-[#2A2A35] to-[#0A0A0C]",
      exif: "f/8.0 • 1/500s • ISO 100"
    },
    {
      id: "photo-4",
      title: "Neon Rain",
      category: "atmosphere",
      categoryLabel: "Atmosphere",
      location: "Shibuya, Japan",
      camera: "Sony A7III",
      lens: "50mm f/1.2 GM",
      year: "2023",
      visualGradient: "from-[#1A0329] via-[#4D066B] to-[#0D0114]",
      exif: "f/1.2 • 1/125s • ISO 800"
    },
    {
      id: "photo-5",
      title: "Quiet Alley",
      category: "street",
      categoryLabel: "Street Photography",
      location: "Gion, Kyoto",
      camera: "Fujifilm X-T4",
      lens: "23mm f/2.0 WR",
      year: "2024",
      visualGradient: "from-[#1C150A] via-[#523B17] to-[#110D06]",
      exif: "f/2.0 • 1/80s • ISO 640"
    },
    {
      id: "photo-6",
      title: "Zen Horizon",
      category: "minimalism",
      categoryLabel: "Minimalism",
      location: "Uluwatu, Bali",
      camera: "Fujifilm X-T4",
      lens: "18-55mm f/2.8-4",
      year: "2024",
      visualGradient: "from-[#1B2838] via-[#8595A6] to-[#0F161E]",
      exif: "f/4.0 • 1/1000s • ISO 200"
    }
  ];

  const filteredPhotos = activeCategory === "all"
    ? photographs
    : photographs.filter(p => p.category === activeCategory);

  const categories = [
    { id: "all", label: "All Works" },
    { id: "atmosphere", label: "Atmosphere" },
    { id: "street", label: "Street" },
    { id: "nature", label: "Nature" },
    { id: "minimalism", label: "Minimalism" }
  ];

  return (
    <div className="w-full py-8 select-none">
      
      {/* Category Tab Selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 px-4">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all duration-300 border clickable ${
              activeCategory === c.id
                ? "bg-white text-bg-dark border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                : "bg-surface-dark border-white/5 text-text-muted hover:border-white/20 hover:text-text-main"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Photography Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full">
        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((p, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              key={p.id}
              onClick={() => setSelectedPhoto(p)}
              className="relative aspect-[16/10] w-full rounded-xl overflow-hidden glass-panel border border-white/5 cursor-pointer group flex flex-col justify-end p-6"
            >
              {/* Photo Stylized Gradient Background Layer representing composition depth */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${p.visualGradient} scale-100 group-hover:scale-105 transition-transform duration-700 ease-out`} />
              
              {/* Overlay shading to blend details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 pointer-events-none" />

              {/* Photo framing layout border */}
              <div className="absolute inset-2.5 border border-white/5 pointer-events-none rounded-lg group-hover:border-white/20 transition-all duration-300" />

              {/* Top Action Hover Icons */}
              <div className="relative z-10 flex justify-between items-start w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-auto">
                <span className="text-[12px] font-mono text-white/50 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                  EXIF READY
                </span>
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition">
                  <Search className="w-3.5 h-3.5 text-white" />
                </span>
              </div>

              {/* Bottom Metadata Preview */}
              <div className="relative z-10 w-full text-left">
                <span className="text-[14px] font-mono text-accent-secondary uppercase font-bold tracking-wider mb-1 block leading-none">
                  {p.location.split(",")[1]?.trim() || p.location}
                </span>
                <h4 className="text-text-main font-sans font-bold text-[24px] leading-snug group-hover:text-accent-secondary transition-colors duration-200">
                  {p.title}
                </h4>
                <div className="flex items-center space-x-2 text-[14px] text-text-muted font-mono mt-1.5 leading-none">
                  <span className="truncate">{p.camera}</span>
                  <span>•</span>
                  <span>{p.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[20000] flex flex-col md:flex-row items-center justify-center p-6 md:p-12 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 text-text-muted hover:text-text-main w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition cursor-pointer z-50 clickable"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Main Image Framing */}
            <div className="flex-1 w-full max-h-[60vh] md:max-h-[80vh] flex items-center justify-center relative">
              <div className={`w-full max-w-2xl aspect-[4/3] rounded-2xl bg-gradient-to-tr ${selectedPhoto.visualGradient} shadow-2xl relative border border-white/10 overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
                {/* Center visual indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/20 font-bold tracking-widest text-lg font-mono">
                    RONN SHOWCASE
                  </span>
                </div>
              </div>
            </div>

            {/* Lightbox Side Metadata Details Panel */}
            <div 
              className="w-full md:w-[320px] md:pl-8 text-left mt-8 md:mt-0 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[10px] font-mono text-accent-secondary uppercase font-bold tracking-widest block mb-1">
                {selectedPhoto.categoryLabel}
              </span>
              
              <h3 className="text-2xl font-bold font-sans text-text-main leading-tight mb-2">
                {selectedPhoto.title}
              </h3>
              
              <p className="text-xs text-text-muted font-mono leading-relaxed mb-6">
                Exhibited digital photography capture representing moody environmental atmospheres.
              </p>

              {/* Technical Specifications (EXIF) */}
              <div className="space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-center space-x-3 text-xs font-mono text-text-main/90">
                  <MapPin className="w-4 h-4 text-accent-secondary shrink-0" />
                  <div>
                    <span className="text-text-muted block text-[10px] uppercase font-bold">Location</span>
                    <span>{selectedPhoto.location}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs font-mono text-text-main/90">
                  <Camera className="w-4 h-4 text-accent-primary shrink-0" />
                  <div>
                    <span className="text-text-muted block text-[10px] uppercase font-bold">Camera</span>
                    <span>{selectedPhoto.camera}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs font-mono text-text-main/90">
                  <Aperture className="w-4 h-4 text-accent-success shrink-0" />
                  <div>
                    <span className="text-text-muted block text-[10px] uppercase font-bold">Lens & Settings</span>
                    <span>{selectedPhoto.lens} ({selectedPhoto.exif.split("•")[0].trim()})</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs font-mono text-text-main/90">
                  <Calendar className="w-4 h-4 text-text-muted shrink-0" />
                  <div>
                    <span className="text-text-muted block text-[10px] uppercase font-bold">Exhibition Year</span>
                    <span>{selectedPhoto.year}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
