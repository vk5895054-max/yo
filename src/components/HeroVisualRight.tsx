"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface TelemetryEvent {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  latency?: string;
}

const TELEMETRY_STREAM: TelemetryEvent[] = [
  {
    id: "e1",
    badge: "DEPLOY",
    badgeColor: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
    title: "Next.js 16.3 Edge Gateway deployed",
    latency: "12ms",
  },
  {
    id: "e2",
    badge: "SCALE",
    badgeColor: "bg-blue-500/15 text-[#0066ff] border-blue-500/30",
    title: "120,000 req/sec peak autoscaled",
    latency: "0 downtime",
  },
  {
    id: "e3",
    badge: "SECURITY",
    badgeColor: "bg-blue-500/15 text-blue-600 border-blue-500/30",
    title: "SOC2 & Zero-Trust AST verified",
    latency: "0 CVEs",
  },
  {
    id: "e4",
    badge: "AI CORE",
    badgeColor: "bg-purple-500/15 text-purple-600 border-purple-500/30",
    title: "48+ Autonomous Micro-Agents sync",
    latency: "14ms",
  },
  {
    id: "e5",
    badge: "CI/CD",
    badgeColor: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
    title: "Strict AST Type Suites 100% Passed",
    latency: "142/142",
  },
  {
    id: "e6",
    badge: "CDN MESH",
    badgeColor: "bg-cyan-500/15 text-cyan-600 border-cyan-500/30",
    title: "Global Edge Multi-Region Mesh active",
    latency: "99.8% hit",
  },
];

export function HeroVisualRight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Smooth scroll listener for parallax depth on floating pieces
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3D tactile tilt on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14; // max tilt 7 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  // Parallax translation factors
  const parallaxOffsetTop = Math.min(Math.max(scrollY * -0.06, -30), 20);
  const parallaxOffsetBottom = Math.min(Math.max(scrollY * 0.07, -20), 30);
  const parallaxOffsetBadge = Math.min(Math.max(scrollY * -0.04, -20), 20);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative select-none perspective-[1200px]"
    >
      {/* Dynamic Ambient Energy Halo */}
      <div
        className="absolute -inset-4 bg-gradient-to-tr from-[#0066ff]/25 via-blue-400/20 to-indigo-600/15 rounded-3xl blur-2xl opacity-70 transition-opacity duration-700 pointer-events-none group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Main Perspective Container */}
      <div
        style={{
          transform: isHovered
            ? `rotateY(${mouseOffset.x}deg) rotateX(${mouseOffset.y}deg) scale3d(1.015, 1.015, 1.015)`
            : "rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)",
          transition: isHovered
            ? "transform 0.15s ease-out"
            : "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
        className="relative z-10 will-change-transform"
      >
        {/* ================================================================= */}
        {/* MAIN VISUAL CARD: MAC/TERMINAL FRAMEWORK                          */}
        {/* ================================================================= */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/90 bg-[#0c1222] transition-all duration-500 group">
          {/* Top macOS-Style Header Bar */}
          <div className="px-4 py-2.5 bg-[#090d1a]/95 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-2 font-mono text-[11px] text-slate-400 font-medium tracking-tight">
                vexus-production-cluster.tsx
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Live Mesh
              </span>
            </div>
          </div>

          {/* Core Visual Engineering Image */}
          <div className="relative overflow-hidden cursor-pointer">
            <Image
              src="/products-engineering.png"
              alt="Vexus Lab Software Engineering Team Shipping Digital Products"
              width={612}
              height={408}
              priority
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Subtle high-tech gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090d1a] via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>

          {/* =============================================================== */}
          {/* SMOOTH SCROLLING STREAM ("somotg scroling right side")           */}
          {/* Continuous 60fps infinite marquee ticker with live architecture */}
          {/* =============================================================== */}
          <div className="bg-[#080c18] border-t border-slate-800/90 py-2.5 px-3 overflow-hidden relative">
            <div className="flex items-center gap-2">
              {/* Fixed Left Pulse Badge */}
              <div className="flex-shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#0066ff]/15 border border-[#0066ff]/30 z-10 shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066ff] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066ff]" />
                </span>
                <span className="text-[10px] font-black tracking-wider uppercase text-[#0066ff]">
                  LIVE STREAM
                </span>
              </div>

              {/* Infinite Marquee Track (seamless duplicate loop) */}
              <div className="overflow-hidden relative flex-1 [mask-image:linear-gradient(to_right,transparent,black_15px,black_calc(100%-15px),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_15px,black_calc(100%-15px),transparent)]">
                <div className="animate-hero-marquee flex items-center gap-6 py-0.5">
                  {/* First iteration */}
                  {TELEMETRY_STREAM.map((item) => (
                    <div
                      key={`a-${item.id}`}
                      className="flex items-center gap-2 text-[11px] whitespace-nowrap"
                    >
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                      <span className="text-slate-200 font-medium font-mono">
                        {item.title}
                      </span>
                      {item.latency && (
                        <span className="text-emerald-400 font-mono text-[10px] font-semibold bg-emerald-950/60 px-1 py-0.5 rounded border border-emerald-800/50">
                          {item.latency}
                        </span>
                      )}
                      <span className="text-slate-600 ml-3">◆</span>
                    </div>
                  ))}

                  {/* Second identical iteration for seamless loop */}
                  {TELEMETRY_STREAM.map((item) => (
                    <div
                      key={`b-${item.id}`}
                      className="flex items-center gap-2 text-[11px] whitespace-nowrap"
                    >
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                      <span className="text-slate-200 font-medium font-mono">
                        {item.title}
                      </span>
                      {item.latency && (
                        <span className="text-emerald-400 font-mono text-[10px] font-semibold bg-emerald-950/60 px-1 py-0.5 rounded border border-emerald-800/50">
                          {item.latency}
                        </span>
                      )}
                      <span className="text-slate-600 ml-3">◆</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* FLOATING PIECE 1: TOP-LEFT CI/CD DEPLOYMENT STATUS CARD           */}
        {/* ================================================================= */}
        <div
          style={{
            transform: `translateY(${parallaxOffsetTop}px)`,
          }}
          className="absolute -top-7 -left-5 sm:-left-7 z-20 pointer-events-auto transition-transform duration-200 ease-out"
        >
          <div className="animate-hero-float-1 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-white/80 shadow-[0_16px_36px_-6px_rgba(24,26,36,0.16)] hover:shadow-[0_22px_45px_-8px_rgba(24,26,36,0.22)] transition-all duration-300 hover:scale-105 cursor-pointer max-w-[220px] sm:max-w-[240px]">
            {/* Header with live green pulse */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">
                  CI/CD Deploy
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                #482
              </span>
            </div>

            {/* Title */}
            <div className="mt-1.5 text-xs sm:text-[13px] font-bold text-[#181a24] tracking-tight">
              Next.js 16.3 + AI Edge
            </div>

            {/* Latency & Status */}
            <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
              <span>Latency: <strong className="text-emerald-600 font-mono">12ms</strong></span>
              <span className="text-slate-400">100% Passed</span>
            </div>

            {/* Glowing mini progress bar */}
            <div className="mt-2.5 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-[#0066ff] rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* FLOATING PIECE 2: BOTTOM-RIGHT TELEMETRY SCALE & EQUALIZER CARD   */}
        {/* ================================================================= */}
        <div
          style={{
            transform: `translateY(${parallaxOffsetBottom}px)`,
          }}
          className="absolute -bottom-7 -right-4 sm:-right-6 z-20 pointer-events-auto transition-transform duration-200 ease-out"
        >
          <div className="animate-hero-float-2 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-white/80 shadow-[0_18px_42px_-8px_rgba(24,26,36,0.18)] hover:shadow-[0_24px_50px_-8px_rgba(24,26,36,0.25)] transition-all duration-300 hover:scale-105 cursor-pointer max-w-[215px] sm:max-w-[235px]">
            {/* Header */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[#0066ff] text-sm">⚡</span>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0066ff]">
                  Velocity Scale
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                Active
              </span>
            </div>

            {/* Title & Stats */}
            <div className="mt-1.5 text-xs sm:text-[13px] font-bold text-[#181a24] tracking-tight">
              48+ Microservices
            </div>

            {/* Dynamic Animated Telemetry Equalizer Activity Wave */}
            <div className="mt-2 flex items-end gap-1.5 h-6 px-2 py-1 bg-slate-50/90 rounded-lg border border-slate-100">
              <span className="text-[9px] font-mono text-slate-400 mr-1">RPS:</span>
              <div className="w-1.5 bg-gradient-to-t from-[#0066ff] to-cyan-400 rounded-full eq-bar-1" />
              <div className="w-1.5 bg-gradient-to-t from-[#0066ff] to-cyan-400 rounded-full eq-bar-2" />
              <div className="w-1.5 bg-gradient-to-t from-[#0066ff] to-cyan-400 rounded-full eq-bar-3" />
              <div className="w-1.5 bg-gradient-to-t from-[#0066ff] to-cyan-400 rounded-full eq-bar-4" />
              <div className="w-1.5 bg-gradient-to-t from-[#0066ff] to-cyan-400 rounded-full eq-bar-5" />
              <span className="ml-auto text-[10px] font-mono font-bold text-slate-700">
                120k/s
              </span>
            </div>

            <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between font-medium">
              <span>99.99% SLA Uptime</span>
              <span className="text-emerald-600 font-bold">● Zero-Lag</span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* FLOATING PIECE 3: TOP-RIGHT AI CORE CHIP                          */}
        {/* ================================================================= */}
        <div
          style={{
            transform: `translateY(${parallaxOffsetBadge}px)`,
          }}
          className="absolute -top-4 right-5 sm:right-8 z-20 pointer-events-auto transition-transform duration-200 ease-out"
        >
          <div className="animate-hero-float-subtle bg-slate-900/90 backdrop-blur-md text-white border border-slate-700/80 shadow-xl rounded-full px-3.5 py-1.5 flex items-center gap-2 text-xs font-semibold hover:scale-105 transition-transform duration-300">
            <span className="text-[#0066ff] animate-pulse">✦</span>
            <span className="font-mono text-[11px] tracking-tight">AI Autonomous Core v4.2</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
        </div>

        {/* ================================================================= */}
        {/* FLOATING PIECE 4: MIDDLE-LEFT SECURITY BADGE                      */}
        {/* ================================================================= */}
        <div
          style={{
            transform: `translateY(${parallaxOffsetTop * -0.5}px)`,
          }}
          className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6 z-20 pointer-events-auto transition-transform duration-200 ease-out hidden sm:block"
        >
          <div className="animate-hero-float-2 bg-white/95 backdrop-blur-md rounded-xl px-3 py-2 border border-slate-200/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
            <span className="text-base">🛡️</span>
            <div>
              <div className="text-[10px] font-bold text-[#181a24] leading-tight">
                Zero-Trust AST
              </div>
              <div className="text-[9px] font-mono text-emerald-600 font-semibold leading-tight">
                0 CVEs Verified
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
