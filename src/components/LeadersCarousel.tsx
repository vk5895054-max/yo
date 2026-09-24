"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

export interface Leader {
  id: string;
  name: string;
  role: string;
  badge: string;
  image: string;
  description: string;
  tags: string[];
  category: "all" | "executive" | "ai" | "cloud" | "security";
}

export const LEADERS_DATA: Leader[] = [
  {
    id: "shubham",
    name: "Shubham Joshi",
    role: "Flutter Developer",
    badge: "FLUTTER DEV",
    image: "/shubham_joshi.png",
    description:
      "Engineers high-performance Flutter mobile applications with responsive UI, state management, and seamless cross-platform deployment.",
    tags: ["Flutter", "Dart", "Mobile Apps"],
    category: "ai",
  },
  {
    id: "himanshu",
    name: "Himanshu Sharma",
    role: "Full Stack Developer",
    badge: "FULL STACK DEV",
    image: "/himanshu_sharma.png",
    description:
      "Specializes in end-to-end full stack web engineering, scalable APIs, database integrations, and high-velocity web applications.",
    tags: ["Full Stack", "React", "Node.js"],
    category: "cloud",
  },
  {
    id: "chirayu",
    name: "Chirayu",
    role: "Full Stack Developer",
    badge: "FULL STACK DEV",
    image: "/chirayu.png",
    description:
      "Builds resilient web architectures, modern frontend interfaces, microservices, and high-performance cloud backends.",
    tags: ["Full Stack", "MERN", "REST APIs"],
    category: "cloud",
  },
  {
    id: "vikas",
    name: "Vikas Kumar",
    role: "Flutter Developer",
    badge: "FLUTTER DEV",
    image: "/vikash_kumar.png",
    description:
      "Develops intuitive mobile app experiences using Flutter, focusing on smooth animations, clean code architecture, and native integrations.",
    tags: ["Flutter", "Dart", "UI/UX"],
    category: "security",
  },
  {
    id: "harikrishan",
    name: "Hari Krishan",
    role: "Full Stack Developer",
    badge: "FULL STACK DEV",
    image: "/hari.png",
    description:
      "Engineers robust full stack digital products, database schemas, real-time features, and clean developer tooling.",
    tags: ["Full Stack", "React", "Node.js"],
    category: "cloud",
  },
];

type CategoryType = "all" | "executive" | "ai" | "cloud" | "security";

export function LeadersCarousel() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Measure visible items count and card width
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  const startXRef = useRef(0);
  const currentDragXRef = useRef(0);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Filtered leaders
  const filteredLeaders =
    activeCategory === "all"
      ? LEADERS_DATA
      : LEADERS_DATA.filter((l) => l.category === activeCategory);

  // Duplicate items for infinite carousel wrap
  const displayItems =
    filteredLeaders.length < 4
      ? [...filteredLeaders, ...filteredLeaders, ...filteredLeaders]
      : [...filteredLeaders, ...filteredLeaders];

  const maxIndex = Math.max(0, displayItems.length - visibleCount);

  // Calculate card width and visible card count dynamically based on window size
  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    const gap = 24; // gap-6 is 24px

    let count = 4;
    if (width < 640) {
      count = 1;
    } else if (width < 1024) {
      count = 2;
    } else {
      count = 4;
    }

    setVisibleCount(count);
    const calculatedWidth = (width - (count - 1) * gap) / count;
    setCardWidth(calculatedWidth);
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  // Navigate functions (smooth slide right-to-left)
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) {
        return 0; // Wrap back to start
      }
      return prev + 1;
    });
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return maxIndex;
      }
      return prev - 1;
    });
  }, [maxIndex]);

  // Automatic move right-to-left every 3.5 seconds
  useEffect(() => {
    if (isPaused || isDragging || maxIndex === 0) return;

    autoPlayTimerRef.current = setInterval(() => {
      handleNext();
    }, 3500);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isPaused, isDragging, maxIndex, handleNext]);

  // Reset index on category change
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Human-touch Pointer Drag / Swipe Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Left click or touch only
    if (e.button !== 0) return;

    setIsDragging(true);
    startXRef.current = e.clientX;
    currentDragXRef.current = e.clientX;
    setDragOffset(0);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    currentDragXRef.current = e.clientX;
    const delta = e.clientX - startXRef.current;
    // Dampen drag at bounds
    setDragOffset(delta);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // safe fallback
    }

    const delta = currentDragXRef.current - startXRef.current;
    const threshold = 50; // swipe threshold in pixels

    if (delta < -threshold) {
      // Swiped left -> Advance to next (moving right to left)
      handleNext();
    } else if (delta > threshold) {
      // Swiped right -> Rewind to prev
      handlePrev();
    }

    setDragOffset(0);
  };

  const gap = 24;
  const step = cardWidth + gap;
  const currentTranslateX = -(currentIndex * step) + dragOffset;

  return (
    <div className="relative w-full">
      {/* ===================================================================== */}
      {/* HEADER: Exact Clean Minimalist Match to Reference Image (Image 2)     */}
      {/* Left: Heading & Creed | Right: Pill Filters & Arrow Buttons           */}
      {/* ===================================================================== */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#0066ff] mb-2 font-mono">
            <span>+</span>
            <span>EXECUTIVE LEADERSHIP &amp; ARCHITECTURAL QUORUM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#181a24] tracking-tight">
            Meet the Leaders &amp; Pod Architects
          </h2>
          <p className="mt-2 text-base text-[#484f6b] max-w-2xl leading-relaxed">
            Distinguished engineers and technical leaders uniting 18+ years of software mastery with frontier AI and distributed systems.
          </p>
        </div>

        {/* Clean Single-Row Controls: Filter Pills + Navigation Buttons */}
        <div className="flex items-center gap-3 self-start md:self-end">
          {/* Category Filter Pills */}
          <div className="flex items-center p-1 bg-white border border-[#e2e8f0] rounded-full shadow-xs">
            {(["all", "executive", "ai", "cloud", "security"] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1 text-xs font-bold rounded-full capitalize transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#0066ff] text-white shadow-xs"
                    : "text-slate-600 hover:text-[#181a24]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Top-Right Arrow Buttons (← / →) */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="w-8 h-8 rounded-full bg-white border border-[#e2e8f0] shadow-xs flex items-center justify-center text-[#181a24] hover:border-[#0066ff] hover:text-[#0066ff] hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm"
            >
              ←
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Slide"
              className="w-8 h-8 rounded-full bg-white border border-[#e2e8f0] shadow-xs flex items-center justify-center text-[#181a24] hover:border-[#0066ff] hover:text-[#0066ff] hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* CAROUSEL VIEWPORT WITH SIDE ARROWS ON IMAGE SIDE (NO FOG MASK)        */}
      {/* ===================================================================== */}
      <div
        className="relative w-full select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Floating Left Arrow (Positioned directly on Left side of cards/images) */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Scroll Left"
          className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[#181a24] shadow-md hover:shadow-xl hover:bg-[#0066ff] hover:text-white hover:border-[#0066ff] hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer"
        >
          <span className="text-lg font-bold">←</span>
        </button>

        {/* Floating Right Arrow (Positioned directly on Right side of cards/images) */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Scroll Right"
          className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[#181a24] shadow-md hover:shadow-xl hover:bg-[#0066ff] hover:text-white hover:border-[#0066ff] hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer"
        >
          <span className="text-lg font-bold">→</span>
        </button>

        {/* Overflow Container with 100% Crisp Cards (NO FOGGY GRADIENTS!) */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y py-2"
          style={{ touchAction: "pan-y" }}
        >
          <div
            className="flex will-change-transform"
            style={{
              gap: `${gap}px`,
              transform: `translate3d(${currentTranslateX}px, 0, 0)`,
              transition: isDragging
                ? "none"
                : "transform 650ms cubic-bezier(0.2, 0.9, 0.3, 1)",
            }}
          >
            {displayItems.map((leader, idx) => (
              <div
                key={`${leader.id}-${idx}`}
                style={{
                  width: cardWidth > 0 ? `${cardWidth}px` : "auto",
                  minWidth: cardWidth > 0 ? `${cardWidth}px` : "auto",
                }}
                className="flex-shrink-0 rounded-3xl border border-[#e5e7eb] bg-white p-5 flex flex-col justify-between shadow-xs hover:shadow-2xl hover:border-[#0066ff]/50 transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
              >
                <div>
                  {/* Photo Container with Sharp Full Photo */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 mb-4 border border-slate-200">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      sizes="340px"
                      draggable={false}
                      className="object-cover object-top pointer-events-none transition-transform duration-700 ease-out group-hover:scale-106"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none" />

                    {/* Top Qualification / Experience Badge */}
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-md border border-white/20 text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                      {leader.badge}
                    </div>
                  </div>

                  {/* Leader Name & Socials */}
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-bold text-[#181a24] group-hover:text-[#0066ff] transition-colors">
                      {leader.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                      <span className="hover:text-[#0066ff] transition-colors cursor-pointer">[in]</span>
                      <span className="hover:text-[#0066ff] transition-colors cursor-pointer">[gh]</span>
                    </div>
                  </div>

                  {/* Role Subtitle */}
                  <div className="text-xs sm:text-[13px] font-mono font-bold text-[#0066ff] uppercase tracking-wide mt-1 mb-1">
                    {leader.role}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#484f6b] leading-relaxed mt-2.5 line-clamp-4">
                    {leader.description}
                  </p>
                </div>

                {/* Tech Skills Pills */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {leader.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50/50 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
