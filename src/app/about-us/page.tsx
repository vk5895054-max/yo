"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EngLife3DVisual } from "@/components/EngLife3DVisual";

interface Leader {
  id: string;
  name: string;
  role: string;
  badge: string;
  image: string;
  description: string;
  tags: string[];
}

const LEADERS: Leader[] = [
  {
    id: "shubham",
    name: "Shubham Joshi",
    role: "Flutter Developer",
    badge: "FLUTTER DEV",
    image: "/shubham_joshi.png",
    description:
      "Engineers high-performance Flutter mobile applications with responsive UI, state management, and seamless cross-platform deployment.",
    tags: ["Flutter", "Dart", "Mobile Apps", "iOS & Android"],
  },
  {
    id: "himanshu",
    name: "Himanshu Sharma",
    role: "Full Stack Developer",
    badge: "FULL STACK DEV",
    image: "/himanshu_sharma.png",
    description:
      "Specializes in end-to-end full stack web engineering, scalable APIs, database integrations, and high-velocity web applications.",
    tags: ["Full Stack", "React / Next.js", "Node.js", "TypeScript"],
  },
  {
    id: "chirayu",
    name: "Chirayu",
    role: "Full Stack Developer",
    badge: "FULL STACK DEV",
    image: "/chirayu.png",
    description:
      "Builds resilient web architectures, modern frontend interfaces, microservices, and high-performance cloud backends.",
    tags: ["Full Stack", "MERN", "REST APIs", "Node.js"],
  },
  {
    id: "vikas",
    name: "Vikas Kumar",
    role: "Flutter Developer",
    badge: "FLUTTER DEV",
    image: "/vikash_kumar.png",
    description:
      "Develops intuitive mobile app experiences using Flutter, focusing on smooth animations, clean code architecture, and native integrations.",
    tags: ["Flutter", "Dart", "UI/UX", "State Management"],
  },
  {
    id: "harikrishan",
    name: "Hari Krishan",
    role: "Full Stack Developer",
    badge: "FULL STACK DEV",
    image: "/hari.png",
    description:
      "Engineers robust full stack digital products, database schemas, real-time features, and clean developer tooling.",
    tags: ["Full Stack", "Web Engineering", "React", "Node.js"],
  },
];

const EPOCHS = [
  {
    year: "2006",
    title: "Foundation & The Creed",
    subtitle: '"YOU THINK, WE IMPLEMENT"',
    badge: "MOHALI CRADLE",
    description:
      "Founded in Mohali / Chandigarh with core enterprise web, relational databases, and custom automation. Built foundational client trust on surgical turnaround and transparent delivery.",
    isHighlight: false,
  },
  {
    year: "2012",
    title: "Global Expansion & Mobile Pods",
    subtitle: "ENTERPRISE POD SCAFFOLDING",
    badge: "100+ APPS SHIPPED",
    description:
      "Scaled dedicated 20+ engineer pods for international software brands, pioneered native iOS and Android ecosystems, and deployed distributed web architectures across North America.",
    isHighlight: false,
  },
  {
    year: "2018",
    title: "Cloud Backbones & Microservices",
    subtitle: "DISTRIBUTED SYSTEMS QUORUM",
    badge: "K8S & SCALE",
    description:
      "Pioneered enterprise distributed cloud natives, Kubernetes clusters, resilient sharded database systems, and sub-second transaction backbones for Tier-1 clients.",
    isHighlight: false,
  },
  {
    year: "2025",
    title: "AI & VelocityAI Lab",
    subtitle: "AUTONOMOUS POD SYNTHESIS",
    badge: "AGENTIC SYNTHESIS",
    description:
      "Integrated autonomous agent pipelines, deterministic RAG architectures, and fine-tuned domain models to accelerate enterprise development cycles by 4x without sacrificing code quality.",
    isHighlight: false,
  },
  {
    year: "2026",
    title: "The High-Velocity Studio & Autonomous Engineering",
    subtitle: "14-DAY PRODUCTION TURNKEY",
    badge: "FOLLOW-THE-SUN",
    description:
      "Multi-region delivery hubs (Mohali Headquarters, London EMEA Hub, San Francisco Quorum) executing 14-day rapid MVP incubator pipelines with zero tech debt and follow-the-sun coverage.",
    isHighlight: true,
  },
];

const VALUES = [
  {
    num: "01",
    tag: "DISCIPLINE",
    title: "Precision Engineering",
    description:
      "Strict AST typing, automated contract testing, zero loose abstractions, and memory-envelope guarantees. Codebases engineered to run in production for years without structural rot.",
    footer: "✓ STRICT COMPILER VERIFIED",
    icon: (
      <svg className="w-5 h-5 text-[#ff5f2d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    iconBg: "bg-orange-50 border-orange-100",
  },
  {
    num: "02",
    tag: "VELOCITY",
    title: "Autonomous Acceleration",
    description:
      "AI-assisted scaffolding and continuous mutation testing for 10x delivery speed. Machine agents generate deterministic unit scaffolds while human architects design core business logic.",
    footer: "✦ 4X POD CYCLE ACCELERATION",
    icon: (
      <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    iconBg: "bg-teal-50 border-teal-100",
  },
  {
    num: "03",
    tag: "TRUST",
    title: "100% IP Ownership",
    description:
      "100% clean Git commit history, direct repository transfer, and zero proprietary vendor lock-in. Everything from Docker configs to schema migrations belongs unconditionally to you.",
    footer: "🛡️ CLEAN MIT / DUAL LICENSES",
    icon: (
      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    iconBg: "bg-blue-50 border-blue-100",
  },
  {
    num: "04",
    tag: "PARTNERSHIP",
    title: "Transparent Governance",
    description:
      "Direct access to principal engineers via shared Slack channels, daily async screen demos, zero agency red tape, and bi-weekly production staging deploys with telemetry reports.",
    footer: "💬 DIRECT SLACK & GIT REPO ACCESS",
    icon: (
      <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    iconBg: "bg-purple-50 border-purple-100",
  },
];

export default function AboutUsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  // Smooth scroll left / right by 1 card step
  const scrollByAmount = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  // Mouse drag handlers for desktop drag-to-scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftPos(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  // Continuous auto-scroll loop (advances smoothly every 3.5s, wraps when reaching end)
  useEffect(() => {
    if (isPaused || isDragging) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          // Loop back to start smoothly
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 275, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, isDragging]);

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-[#181a24] flex flex-col font-sans selection:bg-[#0066ff]/20 selection:text-[#0066ff]">
      <Navbar variant="floating" activePath="/about-us" />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* SECTION 1: HERO & 20-YEAR CHRONOLOGY                                      */}
        {/* ========================================================================= */}
        <section className="w-full pt-12 pb-20 border-b border-[#e5e7eb] bg-gradient-to-b from-[#fcfdfe] via-[#f8f9fb] to-[#f2f3f6]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            {/* Top Hero Heading & 3D Visual Canvas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-14">
              {/* Left Column: Hero Content */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[11px] font-mono font-bold text-[#0066ff] uppercase tracking-wider mb-4">
                  <span>✦</span>
                  <span>ABOUT VEXUS LAB • ESTABLISHED 2006</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#181a24] leading-[1.12]">
                  Engineering{" "}
                  <span className="text-[#0066ff]">Deterministic Software</span>{" "}
                  at Global Scale.
                </h1>
                <p className="mt-5 text-base sm:text-lg text-[#484f6b] leading-relaxed max-w-3xl">
                  Founded in 2006 in Mohali, Vexus Lab unites 20 years of architectural mastery with high-velocity engineering pods. We eliminate agency bureaucracy by giving founders and enterprise CTOs direct Slack and repository access to principal architects.
                </p>
              </div>

              {/* Right Column: 3D Gyroscope Canvas without chips */}
              <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex items-center justify-center">
                <EngLife3DVisual />
              </div>
            </div>

              {/* 4 Trust Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-200/80">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                  <div className="text-2xl sm:text-3xl font-black text-[#181a24]">18+ Yrs</div>
                  <div className="text-[10px] font-mono font-bold text-slate-500 uppercase mt-1">LEADERSHIP</div>
                  <div className="text-xs text-slate-400 mt-0.5">Architectural Mastery</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                  <div className="text-2xl sm:text-3xl font-black text-[#0066ff]">500+</div>
                  <div className="text-[10px] font-mono font-bold text-slate-500 uppercase mt-1">SHIPPED ARCHITECTURES</div>
                  <div className="text-xs text-slate-400 mt-0.5">Global Deployments</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                  <div className="text-2xl sm:text-3xl font-black text-[#181a24]">100%</div>
                  <div className="text-[10px] font-mono font-bold text-slate-500 uppercase mt-1">IP OWNERSHIP</div>
                  <div className="text-xs text-slate-400 mt-0.5">Zero Vendor Lock-in</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                  <div className="text-2xl sm:text-3xl font-black text-[#181a24]">Mohali</div>
                  <div className="text-[10px] font-mono font-bold text-slate-500 uppercase mt-1">PUNJAB HEADQUARTERS</div>
                  <div className="text-xs text-slate-400 mt-0.5">Global Delivery Hubs</div>
                </div>
              </div>

            {/* ========================================================================= */}
            {/* FOUNDER SECTION 1: SHIV PAHWA (FOUNDER & MD)                              */}
            {/* ========================================================================= */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 lg:p-12 shadow-sm mb-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Left Column: Portrait */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xl group">
                    <Image
                      src="/shiv_pahwa.png"
                      alt="Shiv Pahwa - Founder & MD"
                      fill
                      priority
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-104"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Right Column: Details & Social Links */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[11px] font-mono font-bold text-[#0066ff] uppercase tracking-wider mb-4">
                      <span>✦</span>
                      <span>MEET THE FOUNDER</span>
                    </div>

                    <blockquote className="text-2xl sm:text-3xl lg:text-[30px] font-black text-[#181a24] tracking-tight leading-tight italic mb-5">
                      “Every line of code we write has a purpose: to make businesses smarter, faster, and future-ready.”
                    </blockquote>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#181a24]">Shiv Pahwa</h3>
                    <div className="text-xs sm:text-sm font-mono font-bold text-[#0066ff] uppercase tracking-wider mt-1 mb-4">
                      FOUNDER &amp; MD
                    </div>

                    <p className="text-sm sm:text-base text-[#484f6b] leading-relaxed mb-3">
                      Shiv leads Infyle Technologies with a strong background in software development, product strategy, and digital innovation. He focuses on delivering user-first digital solutions that help businesses grow.
                    </p>
                    <p className="text-sm sm:text-base text-[#484f6b] leading-relaxed mb-6">
                      Under his leadership, Infyle is a trusted technology partner across India and the USA, creating smarter and more connected experiences.
                    </p>

                    {/* Direct Social Connections */}
                    <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-slate-100">
                      <a
                        href="https://www.linkedin.com/in/shiv-pahwa-8470891b0/?originalSubdomain=in"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-xs transition-all shadow-xs"
                      >
                        <span>LinkedIn</span>
                        <span className="text-xs">↗</span>
                      </a>
                      <a
                        href="http://www.instagram.com/shiv.pahwa"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs transition-all shadow-xs"
                      >
                        <span>Instagram</span>
                        <span className="text-xs">↗</span>
                      </a>
                      <a
                        href="http://wa.me/+917347574707"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-xs"
                      >
                        <span>WhatsApp</span>
                        <span className="text-xs">↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* FOUNDER SECTION 2: ANJALI THAKUR (CO-FOUNDER)                             */}
            {/* ========================================================================= */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 lg:p-12 shadow-sm mb-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Left Column: Portrait */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xl group">
                    <Image
                      src="/anjali_thakur.png"
                      alt="Anjali Thakur - Co-Founder"
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-104"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Right Column: Details */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[11px] font-mono font-bold text-[#0066ff] uppercase tracking-wider mb-4 w-fit">
                      <span>✦</span>
                      <span>CO-FOUNDER</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#181a24] tracking-tight">
                      Anjali Thakur
                    </h3>
                    <div className="text-xs sm:text-sm font-mono font-bold text-[#0066ff] uppercase tracking-wider mt-1 mb-4">
                      CO-FOUNDER // INFYLE TECHNOLOGIES
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      <span className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-700 shadow-2xs">
                        Infyle Technologies
                      </span>
                      <span className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-700 shadow-2xs">
                        Bee Code Academy &amp; Vexus Labs
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-[#484f6b] leading-relaxed">
                      Anjali brings strong leadership across technology, education, and innovation. She focuses on growth and collaboration to help Infyle deliver strategic digital solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 20-Year Chronology Milestones */}
            <div className="pt-12 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase mb-1">
                    <span className="text-[#0066ff]">📈</span>
                    <span>OUR 20-YEAR CHRONOLOGY</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#181a24] tracking-tight">
                    Our Journey: 2006 to 2026
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-full self-start sm:self-auto shadow-2xs">
                  5 Epochs of Scale
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {EPOCHS.map((epoch) => (
                  <div
                    key={epoch.year}
                    className={`p-5 rounded-2xl border transition-all duration-300 hover:shadow-md ${epoch.isHighlight
                      ? "border-[#0066ff] bg-gradient-to-r from-blue-50/40 via-white to-white shadow-xs lg:col-span-2"
                      : "border-[#e5e7eb] bg-white shadow-2xs"
                      }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black ${epoch.isHighlight
                            ? "bg-[#0066ff] text-white"
                            : "bg-slate-100 text-slate-700"
                            }`}
                        >
                          {epoch.year}
                        </span>
                        <h4 className="text-sm font-bold text-[#181a24] tracking-tight">
                          {epoch.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        {epoch.badge}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono font-bold text-[#0066ff] uppercase tracking-wider mt-2">
                      {epoch.subtitle}
                    </div>
                    <p className="text-xs text-[#484f6b] mt-1.5 leading-relaxed">
                      {epoch.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: CORE ENGINEERING VALUES                                        */}
        {/* ========================================================================= */}
        <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8 border-b border-[#e5e7eb]">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#0066ff] mb-2">
              {/* <span>👁️</span> */}
              <span>OUR VISION, MISSION &amp; CORE PRINCIPLES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#181a24] tracking-tight">
              Built on Uncompromising Engineering Values
            </h2>
            <p className="mt-3 text-base text-[#484f6b] leading-relaxed">
              Rooted in our timeless creed <strong className="text-[#181a24] font-semibold">“You think, we implement”</strong>, our mission is to eliminate friction between architectural ideation and production reality. We adhere to four uncompromising tenets tested across 500+ global deployments.
            </p>
          </div>

          {/* 4 Value Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val) => (
              <div
                key={val.num}
                className="rounded-2xl border border-[#e5e7eb] bg-white p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-[#0066ff]/30 transition-all duration-300 hover:-translate-y-1.5 group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl border flex items-center justify-center mb-4 bg-slate-50 border-slate-200">
                    {val.icon}
                  </div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    {val.num} / {val.tag}
                  </div>
                  <h3 className="text-lg font-bold text-[#181a24] mt-1.5 group-hover:text-[#0066ff] transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-xs text-[#484f6b] leading-relaxed mt-2.5">
                    {val.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  {val.footer}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: MEET THE LEADERS & POD ARCHITECTS (CONTINUOUS SCROLLABLE)      */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 sm:px-8 border-b border-[#e5e7eb] bg-[#f8f9fc]/50 overflow-hidden">
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
                Distinguished engineers and technical leaders uniting 18+ years of software mastery across Full Stack, Flutter, MERN, Cloud Infrastructure, and Agentic AI.
              </p>
            </div>

            {/* Section Badge */}
            <div className="flex items-center gap-2 self-start md:self-end">
              <span className="text-xs font-mono font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-2xs">
                ✦ 7 SPECIALIZED POD ROLES
              </span>
            </div>
          </div>

          {/* Carousel Track Wrapper with Floating Left & Right Overlay Buttons Over the Images */}
          <div className="relative group/carousel">
            {/* Left Button Floating Directly Over Left Side of Images */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                scrollByAmount(-270);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              aria-label="Scroll left"
              className="absolute left-1 sm:left-2 top-[128px] -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 hover:border-[#0066ff] text-slate-600 hover:text-[#0066ff] shadow-sm hover:shadow flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Button Floating Directly Over Right Side of Images */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                scrollByAmount(270);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              aria-label="Scroll right"
              className="absolute right-1 sm:right-2 top-[128px] -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 hover:border-[#0066ff] text-slate-600 hover:text-[#0066ff] shadow-sm hover:shadow flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Continuous Scrollable Cards Container */}
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              className={`flex gap-4 sm:gap-5 overflow-x-auto pb-5 pt-2 scroll-smooth select-none [&::-webkit-scrollbar]:hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {LEADERS.map((leader) => (
                <div
                  key={leader.id}
                  className="w-[225px] sm:w-[250px] flex-shrink-0 rounded-2xl border border-slate-200 bg-white p-4 flex flex-col justify-between hover:border-slate-300 transition-colors duration-200 group"
                >
                  <div>
                    {/* Employee Photo Container (Square Aspect Ratio & Top Face Alignment) */}
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-100">
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        sizes="260px"
                        draggable={false}
                        className="object-cover object-top pointer-events-none transition-transform duration-500 ease-out group-hover:scale-103"
                      />

                      {/* Top Qualification / Role Badge */}
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-white font-mono text-[8.5px] font-bold uppercase tracking-wider">
                        {leader.badge}
                      </div>
                    </div>

                    {/* Name & Socials */}
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-sm sm:text-base font-bold text-[#181a24] group-hover:text-[#0066ff] transition-colors">
                        {leader.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                        <span className="hover:text-[#0066ff] transition-colors cursor-pointer">[in]</span>
                        <span className="hover:text-[#0066ff] transition-colors cursor-pointer">[gh]</span>
                      </div>
                    </div>

                    {/* Role Subtitle */}
                    <div className="text-xs sm:text-[13px] font-mono font-bold text-[#0066ff] uppercase tracking-wide mt-1 mb-1">
                      {leader.role}
                    </div>

                    {/* Description */}
                    <p className="text-[11px] text-[#484f6b] leading-relaxed mt-2 line-clamp-3">
                      {leader.description}
                    </p>
                  </div>

                  {/* Tech Skills Pills */}
                  <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1">
                    {leader.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[9.5px] font-mono text-slate-600 bg-slate-50 border border-slate-200/80"
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

        {/* ========================================================================= */}
        {/* SECTION 4: CULTURE, ACHIEVEMENTS & PRODUCTION TURNKEY SHOWCASE (NO BLACK) */}
        {/* Left: Launch & Celebration Photo | Right: Achievements & Schedule Button   */}
        {/* ========================================================================= */}
        <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Team Celebration & Achievements Photo */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden aspect-4/3 bg-slate-100 border border-slate-200/80 shadow-lg group">
                <Image
                  src="/about/launch-celebration.jpg"
                  alt="Vexus Lab Pod celebrating deployment launch"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />
              </div>
            </div>

            {/* Right Column: Achievements & Schedule Architecture Button (Open Layout) */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[11px] font-mono font-bold text-[#0066ff] uppercase tracking-wider mb-4">
                  <span>✦</span>
                  <span>POD CULTURE &amp; 14-DAY PRODUCTION TURNKEY</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#181a24] leading-[1.15]">
                  Ready to ship your next breakthrough product in 14 days?
                </h2>
                <p className="mt-4 text-base text-[#484f6b] leading-relaxed">
                  Skip the endless hiring loops and technical debt. Build with dedicated engineering pods that unite 20 years of architectural mastery with frontier AI.
                </p>
              </div>

              {/* 3 Key Achievement Highlights */}
              <div className="grid grid-cols-3 gap-3 my-7 pt-6 border-t border-slate-200/80">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 text-center shadow-xs">
                  <div className="text-xl sm:text-2xl font-black text-[#181a24]">500+</div>
                  <div className="text-[9px] font-mono font-bold text-slate-500 uppercase mt-0.5">SHIPPED ARCHS</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 text-center shadow-xs">
                  <div className="text-xl sm:text-2xl font-black text-[#0066ff]">14 Days</div>
                  <div className="text-[9px] font-mono font-bold text-slate-500 uppercase mt-0.5">MVP TURNKEY</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 text-center shadow-xs">
                  <div className="text-xl sm:text-2xl font-black text-[#181a24]">100%</div>
                  <div className="text-[9px] font-mono font-bold text-slate-500 uppercase mt-0.5">IP OWNERSHIP</div>
                </div>
              </div>

              {/* Single Sleek Schedule Architecture Briefing Button */}
              <div className="pt-1">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-xs sm:text-sm px-7 py-3 rounded-full shadow-[0_4px_20px_rgba(0,102,255,0.35)] hover:shadow-[0_6px_25px_rgba(0,102,255,0.5)] hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  <span>Schedule Architecture Briefing</span>
                  <span className="text-xs">📅</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Common Unified Footer Component */}
      <Footer />
    </div>
  );
}
