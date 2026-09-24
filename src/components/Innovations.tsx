"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface InnovationProject {
  id: string;
  prodId: string;
  categoryTag: string;
  category: "fintech" | "ai" | "healthcare" | "search" | "media";
  title: string;
  description: string;
  image: string; // <=== [IMAGE IMPLEMENTATION PATH]
  imageTopBadge: string;
  imageBottomBadge: string;
  highlights: string[];
  metrics: {
    stat: string;
    label: string;
  }[];
  techStack: string[];
  linkText: string;
  linkHref: string;
}

export const INNOVATION_PROJECTS: InnovationProject[] = [
  {
    id: "sovereign-asset",
    prodId: "PROD-ID: #NRI-88",
    categoryTag: "PROTECTING NRI PROPERTIES",
    category: "fintech",
    title: "Sovereign Asset & Property Security Engine",
    description:
      "Architected a zero-trust multi-region ledger for remote owners to monitor, verify, and legally audit overseas real estate parcels. Features live drone verification streams, automated municipal tax escrow, and cryptographic deed tracking.",
    // ==========================================
    // 📸 IMAGE PATH SPECIFICATION (PUBLIC FOLDER)
    // ==========================================
    image: "/projects/sovereign-asset.png",
    imageTopBadge: "CROSS-BORDER ASSETS",
    imageBottomBadge: "12ms Latency",
    highlights: [
      "Zero-trust multi-region cryptographic deed tracking ledger",
      "Live automated drone boundary verification and satellite telemetry",
      "Automated municipal tax escrow with zero-drift settlement engine",
    ],
    metrics: [
      { stat: "$1.4B+", label: "Asset Value Guarded" },
      { stat: "100%", label: "Fraud Prevention" },
      { stat: "12ms", label: "Global Ledger Latency" },
    ],
    techStack: ["Go / Rust", "PostgreSQL CDC", "eBPF Telemetry", "AWS Nitro"],
    linkText: "View Architecture Specs →",
    linkHref: "/projects/sovereign-asset",
  },
  {
    id: "citypulse",
    prodId: "PROD-ID: #CP-404",
    categoryTag: "SMART LOCAL DISCOVERY",
    category: "search",
    title: "CityPulse: Autonomous Geospatial Search",
    description:
      "Next-generation local exploration engine powered by custom vector embeddings and real-time foot-traffic feeds. Sub-8ms neural indexing across 40M geo-tagged nodes with predictive transit routing and localized venue heatmaps.",
    // ==========================================
    // 📸 IMAGE PATH SPECIFICATION (PUBLIC FOLDER)
    // ==========================================
    image: "/projects/city-pulse.jpg",
    imageTopBadge: "SPATIAL VECTOR RAG",
    imageBottomBadge: "1.2M QPS",
    highlights: [
      "Sub-8ms neural vector embeddings across 40M geo-tagged nodes",
      "Live predictive pedestrian traffic feeds and transit heatmaps",
      "Autonomous RAG ingestion pipeline caching to Cloudflare edge KV",
    ],
    metrics: [
      { stat: "<8ms", label: "Embedding Inference" },
      { stat: "3.8x", label: "Search Engagement" },
      { stat: "1.2M", label: "Peak QPS Throughput" },
    ],
    techStack: ["Qdrant Vector", "Next.js App Router", "Edge KV Cache", "PostGIS"],
    linkText: "View Search Benchmarks →",
    linkHref: "/projects/citypulse",
  },
  {
    id: "biovibe",
    prodId: "PROD-ID: #BIO-09",
    categoryTag: "HEALTHCARE & WELLNESS",
    category: "healthcare",
    title: "BioVibe: Preventative Biometric App Suite",
    description:
      "End-to-end iOS and Android wellness ecosystem syncing with continuous glucose monitors and Apple Health. Powered by client-side anomaly detection models with zero unencrypted biometric data transmission.",
    // ==========================================
    // 📸 IMAGE PATH SPECIFICATION (PUBLIC FOLDER)
    // ==========================================
    image: "/projects/biovibe.png",
    imageTopBadge: "HIPAA TELEMETRY",
    imageBottomBadge: "580k Daily Users",
    highlights: [
      "Continuous glucose and biometric telemetry via Apple HealthKit & Android Health",
      "Client-side edge anomaly detection with zero cloud unencrypted data",
      "HIPAA-grade compliance pipeline with AWS Nitro Enclaves security",
    ],
    metrics: [
      { stat: "99.98%", label: "Sync Accuracy" },
      { stat: "0 PII Leaks", label: "Enclave Encryption" },
      { stat: "580k", label: "Active Daily Users" },
    ],
    techStack: ["React Native", "HealthKit API", "AWS Nitro Enclaves", "TimescaleDB"],
    linkText: "Explore Mobile Case Study →",
    linkHref: "/projects/biovibe",
  },
  {
    id: "neuralmesh",
    prodId: "PROD-ID: #AI-501",
    categoryTag: "AUTONOMOUS AGENTS",
    category: "ai",
    title: "NeuralMesh: Multi-Agent Cloud Orchestrator",
    description:
      "Distributed consensus engine for autonomous LLM agents executing multi-step infrastructure deployments, automated canary rollouts, and AST syntax validation with zero human intervention.",
    // ==========================================
    // 📸 IMAGE PATH SPECIFICATION (PUBLIC FOLDER)
    // ==========================================
    image: "/projects/sovereign-asset.png",
    imageTopBadge: "AUTONOMOUS RUNTIME",
    imageBottomBadge: "99.999% SLA",
    highlights: [
      "Multi-agent consensus protocols executing infrastructure rollouts",
      "Automated unit testing, linting AST checks, and instant rollbacks",
      "Real-time event streaming pipeline processing 140,000+ daily sprints",
    ],
    metrics: [
      { stat: "140k+", label: "Daily Agent Sprints" },
      { stat: "10x", label: "Velocity Acceleration" },
      { stat: "99.999%", label: "System Availability SLA" },
    ],
    techStack: ["Claude 3.5", "FastAPI", "Redis Streams", "Kubernetes"],
    linkText: "Explore Agent Pipeline →",
    linkHref: "/projects/neuralmesh",
  },
  {
    id: "prismacore",
    prodId: "PROD-ID: #MED-220",
    categoryTag: "CONSUMER & MEDIA",
    category: "media",
    title: "PrismaStream: Ultra-Low Latency Video Edge",
    description:
      "Global WebRTC edge transcoding network delivering sub-100ms interactive live video streaming to 2.4 million concurrent viewers across 45 edge regions.",
    // ==========================================
    // 📸 IMAGE PATH SPECIFICATION (PUBLIC FOLDER)
    // ==========================================
    image: "/projects/city-pulse.jpg",
    imageTopBadge: "EDGE WEBRTC",
    imageBottomBadge: "45 Edge POPS",
    highlights: [
      "Sub-90ms glass-to-glass global interactive WebRTC broadcast",
      "Decentralized edge transcoding network spanning 45 global POPs",
      "Rust & WebAssembly high-throughput media pipeline",
    ],
    metrics: [
      { stat: "<90ms", label: "Global Edge Latency" },
      { stat: "2.4M", label: "Peak Concurrent Streamers" },
      { stat: "45", label: "Edge PoP Regions" },
    ],
    techStack: ["Rust", "WebRTC", "Cloudflare Workers", "Wasm"],
    linkText: "View Video Edge Specs →",
    linkHref: "/projects/prismacore",
  },
  {
    id: "payvolt",
    prodId: "PROD-ID: #FIN-771",
    categoryTag: "FINTECH & ESCROW",
    category: "fintech",
    title: "PayVolt: Algorithmic Multi-Rail Clearing",
    description:
      "Real-time institutional liquidity routing across FedNow, SEPA Instant, and SWIFT rails with zero floating-point ledger drift and AI fraud scoring.",
    // ==========================================
    // 📸 IMAGE PATH SPECIFICATION (PUBLIC FOLDER)
    // ==========================================
    image: "/projects/biovibe.png",
    imageTopBadge: "MULTI-RAIL SETTLEMENT",
    imageBottomBadge: "$65M+/mo",
    highlights: [
      "Double-entry ledger architecture guaranteeing zero floating-point drift",
      "Dynamic algorithmic multi-rail clearing across FedNow, SEPA, and SWIFT",
      "Automated ML fraud scoring with sub-50ms verdict engine",
    ],
    metrics: [
      { stat: "$65M+", label: "Monthly Clearing Vol" },
      { stat: "0 ms", label: "Ledger Drift Delta" },
      { stat: "<50ms", label: "Fraud Score Verdict" },
    ],
    techStack: ["Golang", "PostgreSQL", "Docker", "Stripe API"],
    linkText: "View Fintech Case Study →",
    linkHref: "/projects/payvolt",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Projects (8)" },
  { id: "fintech", label: "Fintech & Security" },
  { id: "ai", label: "AI & Autonomous SaaS" },
  { id: "healthcare", label: "Healthcare & Wellness" },
  { id: "search", label: "Smart Search & Data" },
  { id: "media", label: "Consumer & Media" },
];

export function Innovations() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProjects =
    activeCategory === "all"
      ? INNOVATION_PROJECTS
      : INNOVATION_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section className="w-full border-b border-[#e5e7eb] bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* ========================================================================= */}
        {/* SECTION HEADER: TITLE, BADGE, SUB-LABEL */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#0066ff]">
              PRODUCTION REPOSITORIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#181a24] tracking-tight leading-tight mt-2">
              Innovative Projects Delivering High-Speed
              <br className="hidden sm:inline" /> Intelligence
            </h2>
          </div>
          {/* <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
            SHOWING {filteredProjects.length} VERIFIED CASE STUDIES
          </div> */}
        </div>

        {/* ========================================================================= */}
        {/* CATEGORY FILTER TABS */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${isActive
                  ? "bg-[#181a24] text-white shadow-sm"
                  : "bg-[#f2f3f6] text-[#484f6b] hover:bg-[#e5e7eb] hover:text-[#181a24]"
                  }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* SCROLL STACKING CARDS (EK KE UPAR EK AANA CHAHIYE) */}
        {/* Responsive layout: Image on top on small screen, side-by-side on desktop */}
        {/* ========================================================================= */}
        <div className="relative pb-20">
          {filteredProjects.map((project, index) => {
            // Stacking offset: desktop gets staggered top offset, mobile stays comfortably near top
            const stickyTopOffsetDesktop = 84 + index * 14;

            return (
              <div
                key={project.id}
                className="sticky transition-all duration-300"
                style={{
                  top: `clamp(70px, ${stickyTopOffsetDesktop}px, 140px)`,
                  zIndex: index + 10,
                  marginBottom:
                    index === filteredProjects.length - 1 ? "0px" : "48px",
                }}
              >
                {/* SINGLE FULL CARD CONTAINER */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e2e8f0] shadow-[0_16px_50px_-15px_rgba(0,0,0,0.12)] p-4 sm:p-6 lg:p-8 transition-all duration-300 hover:border-[#0066ff]/40 group">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center">

                    {/* ------------------------------------------------------------- */}
                    {/* [WHERE IMAGE IS IMPLEMENTED] */}
                    {/* On Mobile: order-1 (At the TOP so it is immediately visible) */}
                    {/* On Desktop: order-2 (lg:col-span-5 on the right side) */}
                    {/* ------------------------------------------------------------- */}
                    <div className="order-1 lg:order-2 lg:col-span-5 w-full">
                      {/* Visual Showcase Container */}
                      <Link
                        href={project.linkHref}
                        className="block relative w-full h-44 sm:h-56 md:h-64 lg:h-[390px] rounded-xl sm:rounded-2xl overflow-hidden bg-[#0f172a] border border-[#e2e8f0]/90 shadow-md group/img cursor-pointer"
                      >
                        {/* ========================================================= */}
                        {/* 📸 [NEXT.JS IMAGE COMPONENT IMPLEMENTATION] */}
                        {/* ========================================================= */}
                        <Image
                          src={project.image} // <=== [IMAGE PROP IMPLEMENTED HERE]
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 42vw"
                          priority={index < 2}
                          className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                        />

                        {/* Gradient Scrim for contrast & text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

                        {/* Top-Left Glass Pill Badge */}
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#0f172a]/85 backdrop-blur-md border border-white/20 text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-bold tracking-wider uppercase shadow-md">
                          {project.imageTopBadge}
                        </div>

                        {/* Bottom-Right Glass Pill Badge */}
                        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/95 backdrop-blur-md text-[#181a24] border border-white/40 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-extrabold tracking-tight shadow-md">
                          {project.imageBottomBadge}
                        </div>

                        {/* Bottom-Left Live Architecture Status */}
                        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white/90 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-medium border border-white/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span>Live Architecture</span>
                        </div>
                      </Link>
                    </div>

                    {/* ------------------------------------------------------------- */}
                    {/* PROJECT DETAILS */}
                    {/* On Mobile: order-2 (Below image, compact and well-spaced) */}
                    {/* On Desktop: order-1 (lg:col-span-7 on the left side) */}
                    {/* ------------------------------------------------------------- */}
                    <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-5">
                      <div>
                        {/* Meta Tags Row */}
                        <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                          <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#0284c7] bg-sky-50 border border-sky-100 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
                            {project.categoryTag}
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-[#64748b] bg-[#f1f5f9] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
                            {project.prodId}
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md flex items-center gap-1.5 ml-auto">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Verified Production
                          </span>
                        </div>

                        {/* Project Title with Link */}
                        <Link href={project.linkHref} className="block group/title">
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#181a24] tracking-tight leading-snug group-hover/title:text-[#0066ff] transition-colors">
                            {project.title}
                          </h3>
                        </Link>

                        {/* Narrative Description (line clamped on mobile to prevent overflow) */}
                        <p className="mt-2 text-xs sm:text-sm lg:text-base text-[#484f6b] leading-relaxed line-clamp-2 sm:line-clamp-3 lg:line-clamp-none">
                          {project.description}
                        </p>

                        {/* Architecture Deliverables / Highlights (clean on tablet & desktop, compact on phone) */}
                        <div className="mt-3 sm:mt-4 space-y-1.5 hidden sm:block">
                          {project.highlights.slice(0, 3).map((highlight, hIdx) => (
                            <div
                              key={hIdx}
                              className="flex items-start gap-2 text-xs sm:text-sm text-[#334155]"
                            >
                              <span className="mt-0.5 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#0066ff]/10 text-[#0066ff] flex items-center justify-center font-bold text-[9px] sm:text-[10px]">
                                ✓
                              </span>
                              <span className="line-clamp-1">{highlight}</span>
                            </div>
                          ))}
                        </div>

                        {/* Key Impact Metrics Grid (responsive columns, well-padded) */}
                        <div className="mt-3.5 sm:mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                          {project.metrics.map((m, idx) => (
                            <div
                              key={idx}
                              className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#f8f9fc] border border-[#ebecee]"
                            >
                              <div className="text-base sm:text-xl lg:text-2xl font-extrabold text-[#181a24] tracking-tight truncate">
                                {m.stat}
                              </div>
                              <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#64748b] mt-0.5 line-clamp-1">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Action Row: Tech Stack & CTA */}
                      <div className="pt-3 border-t border-[#f1f5f9] flex flex-wrap items-center justify-between gap-2.5">
                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                          {project.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[10px] sm:text-[11px] font-semibold bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Architecture Link Button */}
                        <Link
                          href={project.linkHref}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0066ff] hover:text-[#0052cc] transition-all group/link whitespace-nowrap ml-auto"
                        >
                          <span>{project.linkText}</span>
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
