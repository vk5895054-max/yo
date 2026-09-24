"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface TechniquePillar {
  pillarNumber: string;
  title: string;
  description: string;
  image: string;
  imageBadge: string;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
  highlights: string[];
  tags: string[];
}

const PILLARS: TechniquePillar[] = [
  {
    pillarNumber: "PILLAR 01",
    title: "AI Code Acceleration",
    description:
      "Intelligent schema prototyping, context-aware boilerplate generation, and instant database migrations from natural specifications.",
    image: "/hero-startup.jpg",
    imageBadge: "INTELLIGENT SYNTHESIS",
    iconBg: "bg-blue-50 border-blue-100",
    iconColor: "text-[#0066ff]",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    highlights: [
      "Context-aware architecture boilerplate generation",
      "Instant type-safe database schemas & zero-drift migrations",
      "Accelerated delivery cycles with zero runtime schema errors",
    ],
    tags: ["Next.js 16 Canary", "Smart AST Generation", "GraphQL Vectors"],
  },
  {
    pillarNumber: "PILLAR 02",
    title: "Agentic AI Orchestration",
    description:
      "Autonomous agents plan, simulate, and stress test microservices around the clock. Your timeline never stalls waiting on staging or cross-team handoffs.",
    image: "/hero-engineering.jpg",
    imageBadge: "AUTONOMOUS RUNTIME",
    iconBg: "bg-teal-50 border-teal-100",
    iconColor: "text-[#0d9488]",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    highlights: [
      "24/7 continuous autonomous mutation fuzzing & stress tests",
      "Self-healing staging pull requests and automated canary checks",
      "High-throughput event coordination across distributed services",
    ],
    tags: ["Autonomous QA", "Self-Healing CI/CD", "Chaos Engineering"],
  },
  {
    pillarNumber: "PILLAR 03",
    title: "Principal Architect Rigor",
    description:
      "Human discernment AI cannot replace. Senior architects perform threat modeling, deterministic invariant checks, and embed in your Slack for direct daily access.",
    image: "/projects/sovereign-asset.png",
    imageBadge: "ZERO-TRUST AUDIT",
    iconBg: "bg-amber-50 border-amber-100",
    iconColor: "text-[#d97706]",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    highlights: [
      "Zero-data-leak threat modeling & deterministic invariant audits",
      "Direct daily Slack embedding with L9 Senior Principal Architects",
      "SOC2 Type II compliance audit preparation & kernel-level tuning",
    ],
    tags: ["SOC2 Type II Auditing", "Daily Slack Embed", "100% Code Review"],
  },
];

export function ProjectBuildingTechniques() {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [isUnstacked, setIsUnstacked] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Screen width detection for 3-column layout vs mobile
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Precise scroll position tracking:
  // Cards stay visibly STACKED until user actually reaches the cards container!
  useEffect(() => {
    let ticking = false;

    const checkPosition = () => {
      if (!cardsContainerRef.current) return;
      const rect = cardsContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When the top of the cards reaches 65% of the viewport (clearly visible in front of user):
      // Trigger the unstack glide into their places!
      if (rect.top <= windowHeight * 0.65 && rect.bottom >= 100) {
        setIsUnstacked(true);
      } else if (rect.top > windowHeight * 0.82) {
        // When user scrolls back up above the cards, re-stack them
        setIsUnstacked(false);
      }
    };

    checkPosition();

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Compute transform and z-index:
  // When STACKED (!isUnstacked): All cards visibly sit on top of each other in the center ("ak ke upar ak")!
  // When UNSTACKED (isUnstacked): Cards smoothly glide to their designated left, center, and right places!
  const getCardStyle = (idx: number): React.CSSProperties => {
    if (isDesktop) {
      if (!isUnstacked) {
        // -------------------------------------------------------------
        // STACKED STATE ("ak ke upar ak"):
        // All 3 cards physically overlapping in the center column!
        // -------------------------------------------------------------
        if (idx === 0) {
          // Card 0 (Top card): sits in center column, on top of stack
          return {
            transform: "translate3d(calc(100% + 2rem), 0px, 0) rotate(-2deg) scale(1)",
            zIndex: 30,
            opacity: 1,
            boxShadow: "0 25px 50px -12px rgba(24, 26, 36, 0.25)",
            transition: "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 120ms, box-shadow 0.6s ease",
            willChange: "transform, z-index",
          };
        }
        if (idx === 1) {
          // Card 1 (Middle card): peeking out slightly from beneath Card 0
          return {
            transform: "translate3d(0, -18px, 0) rotate(1.5deg) scale(0.97)",
            zIndex: 20,
            opacity: 1,
            boxShadow: "0 20px 40px -10px rgba(24, 26, 36, 0.18)",
            transition: "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0ms, box-shadow 0.6s ease",
            willChange: "transform, z-index",
          };
        }
        if (idx === 2) {
          // Card 2 (Bottom card): peeking out from the very back of the stack
          return {
            transform: "translate3d(calc(-100% - 2rem), -36px, 0) rotate(-3deg) scale(0.94)",
            zIndex: 10,
            opacity: 1,
            boxShadow: "0 15px 30px -8px rgba(24, 26, 36, 0.14)",
            transition: "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 240ms, box-shadow 0.6s ease",
            willChange: "transform, z-index",
          };
        }
      }

      // ---------------------------------------------------------------
      // UNSTACKED STATE:
      // Cards have moved out to their own Left, Center, and Right places!
      // ---------------------------------------------------------------
      const delay = idx === 1 ? "0ms" : idx === 0 ? "140ms" : "280ms";
      return {
        transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)",
        zIndex: 10 + idx,
        opacity: 1,
        boxShadow: "0 4px 20px -4px rgba(24, 26, 36, 0.08)",
        transition: `transform 1.15s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, box-shadow 0.6s ease ${delay}`,
        willChange: "transform, z-index",
      };
    }

    // Mobile / Tablet Responsive Stack
    if (!isUnstacked) {
      if (idx === 0) {
        return {
          transform: "translate3d(0, 0, 0) scale(1)",
          zIndex: 30,
          opacity: 1,
          boxShadow: "0 20px 40px -10px rgba(24, 26, 36, 0.2)",
          transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
        };
      }
      if (idx === 1) {
        return {
          transform: "translate3d(0, calc(-100% + 28px), 0) scale(0.97)",
          zIndex: 20,
          opacity: 1,
          boxShadow: "0 15px 30px -8px rgba(24, 26, 36, 0.15)",
          transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
        };
      }
      if (idx === 2) {
        return {
          transform: "translate3d(0, calc(-200% + 56px), 0) scale(0.94)",
          zIndex: 10,
          opacity: 1,
          boxShadow: "0 10px 20px -6px rgba(24, 26, 36, 0.12)",
          transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
        };
      }
    }

    // Mobile Unstacked
    const mobileDelay = `${idx * 120}ms`;
    return {
      transform: "translate3d(0, 0, 0) scale(1)",
      zIndex: 10,
      opacity: 1,
      boxShadow: "0 4px 16px -2px rgba(24, 26, 36, 0.06)",
      transition: `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${mobileDelay}`,
    };
  };

  return (
    <section
      className="w-full border-b border-[#e5e7eb] bg-gradient-to-b from-[#fcfdfe] via-white to-[#f8f9fc] py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* ========================================================================= */}
        {/* SECTION HEADER: TITLE & NARRATIVE WITH INTERACTIVE REPLAY BUTTON          */}
        {/* ========================================================================= */}
        <div className="mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            {/* Subtle Category Pill Badge */}
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#0066ff] mb-2">
              <span>⚡</span>
              <span>THE VEXUS VELOCITY FORMULA</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#181a24] tracking-tight leading-tight max-w-4xl">
              Our AI-Powered Development Formula for Faster, Smarter Software
            </h2>

            {/* Narrative Subtitle */}
            <p className="mt-4 text-base sm:text-lg text-[#484f6b] max-w-3xl leading-relaxed">
              We combine intelligent code synthesis, autonomous agentic test pipelines, and surgical human principal architect review to deploy faster without compromising security or architectural purity.
            </p>
          </div>

          {/* Interactive Replay / Stack-Unstack Control */}
          <div className="flex-shrink-0">
            <button
              onClick={() => setIsUnstacked((prev) => !prev)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#181a24] bg-white border border-[#e2e8f0] shadow-xs hover:border-[#0066ff] hover:text-[#0066ff] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{isUnstacked ? "↺ Stack Cards" : "⚡ Unstack into Places"}</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3 PILLAR CARDS: STACKED ONE ON TOP OF ANOTHER                             */}
        {/* GLIDES TO RESPECTIVE POSITIONS WHEN USER REACHES THE SECTION             */}
        {/* ========================================================================= */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative min-h-[520px]"
        >
          {PILLARS.map((pillar, idx) => (
            <div
              key={pillar.pillarNumber}
              style={getCardStyle(idx)}
              className="rounded-3xl border border-[#e5e7eb] bg-white hover:shadow-2xl hover:border-[#0066ff]/40 p-6 sm:p-7 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Card Header: Icon & Pillar Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${pillar.iconBg} ${pillar.iconColor} shadow-2xs`}
                  >
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#64748b] bg-[#f1f5f9] px-2.5 py-1 rounded-md">
                    {pillar.pillarNumber}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-[22px] font-bold text-[#181a24] group-hover:text-[#0066ff] transition-colors mt-5 tracking-tight leading-snug">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="mt-2.5 text-xs sm:text-sm text-[#484f6b] leading-relaxed">
                  {pillar.description}
                </p>

                {/* Image Showcase */}
                <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden bg-[#0f172a] border border-[#e5e7eb] my-5 group/img shadow-2xs">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover/img:scale-105"
                  />

                  {/* Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />

                  {/* Glass Pill Badge */}
                  <div className="absolute bottom-3 left-3 bg-[#0f172a]/85 backdrop-blur-md border border-white/20 text-white px-2.5 py-1 rounded-md text-[9px] font-bold tracking-wider uppercase shadow-sm">
                    {pillar.imageBadge}
                  </div>

                  {/* Live Status Indicator */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white/90 px-2 py-0.5 rounded-md text-[9px] font-medium border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Production Ready</span>
                  </div>
                </div>

                {/* Value Highlights / Content Checklist */}
                <div className="space-y-2 mb-6">
                  {pillar.highlights.map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-start gap-2.5 text-xs text-[#334155]"
                    >
                      <span className="mt-0.5 flex-shrink-0 w-3.5 h-3.5 rounded-full bg-[#0066ff]/10 text-[#0066ff] flex items-center justify-center font-bold text-[9px]">
                        ✓
                      </span>
                      <span className="leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tech Pills */}
              <div className="pt-4 border-t border-[#f1f5f9] flex flex-wrap gap-1.5">
                {pillar.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-semibold bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default ProjectBuildingTechniques;
