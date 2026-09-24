"use client";

import React, { useState } from "react";
import Image from "next/image";

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  metric: string;
  spec: string;
  icon: React.ReactNode;
}

export function WhyChooseUs() {
  const [activeFeatureId, setActiveFeatureId] = useState<string>("experts");

  const leftFeatures: FeatureItem[] = [
    {
      id: "experts",
      title: "Expert Peoples",
      description: "Dedicated principal engineers and system architects govern every pod directly without agency middle management.",
      metric: "18+ Yrs Avg Experience",
      spec: "Direct quorum with senior tech leads with 15+ years enterprise systems experience.",
      icon: (
        <svg className="w-6 h-6 text-[#0066ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 8a3 3 0 010 6m-12-6a3 3 0 000 6" />
        </svg>
      ),
    },
    {
      id: "experience",
      title: "Big Experience",
      description: "500+ production architectures deployed globally across distributed microservices, fintech, and AI systems.",
      metric: "500+ Deployed Systems",
      spec: "Battle-tested distributed backbones supporting millions of concurrent API transactions.",
      icon: (
        <svg className="w-6 h-6 text-[#0066ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      id: "finance",
      title: "Financial Control",
      description: "Predictable sprint velocity, fixed scope boundaries, zero bloated hours, and strict memory & cloud cost optimization.",
      metric: "Zero Cost Creep",
      spec: "Transparent weekly telemetry audits, infrastructure cost budgeting, and zero markups.",
      icon: (
        <svg className="w-6 h-6 text-[#0066ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
    },
  ];

  const rightFeatures: FeatureItem[] = [
    {
      id: "quality",
      title: "Committed Quality",
      description: "Deterministic execution with sub-100ms API response SLAs and 99.99% high-availability distributed backbones.",
      metric: "Sub-100ms Latency SLA",
      spec: "Automated compiler contract tests, memory envelope validation, and zero structural debt.",
      icon: (
        <svg className="w-6 h-6 text-[#0066ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      id: "planning",
      title: "Architecture Planning",
      description: "Comprehensive system roadmapping, schema design, and AST typing before a single line of code is committed.",
      metric: "Deterministic AST Design",
      spec: "Complete database ERD, API schema contracts, and 14-day sprint roadmap delivered upfront.",
      icon: (
        <svg className="w-6 h-6 text-[#0066ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: "award",
      title: "Award Winning",
      description: "Direct Git handover, clean commercial licenses, and zero proprietary lock-in. Everything belongs unconditionally to you.",
      metric: "100% Direct IP Ownership",
      spec: "Zero proprietary dependencies, direct repository transfer, and dual-licensing rights.",
      icon: (
        <svg className="w-6 h-6 text-[#0066ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const allFeatures = [...leftFeatures, ...rightFeatures];
  const activeFeature = allFeatures.find((f) => f.id === activeFeatureId) || allFeatures[0];

  return (
    <section className="w-full border-b border-[#e5e7eb] bg-white py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#0066ff] mb-2.5">
            <span>✦</span>
            <span>WHY CHOOSE US</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#181a24] tracking-tight leading-[1.15]">
            Get our services &amp; <span className="text-[#0066ff]">drive more.</span>
          </h2>
          <p className="mt-3.5 text-base text-[#484f6b] leading-relaxed">
            We eliminate agency fluff, corporate bureaucracy, and technical debt by pairing you directly with dedicated principal engineers and autonomous delivery pods.
          </p>
        </div>

        {/* 3-Column Layout: Left 3 Items | Center Team Photo | Right 3 Items (Matching Reference Image 1) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left 3 Features */}
          <div className="lg:col-span-4 space-y-5">
            {leftFeatures.map((item) => {
              const isSelected = activeFeatureId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveFeatureId(item.id)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-slate-300 bg-slate-50/80 shadow-xs translate-x-1"
                      : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#181a24]">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#484f6b] mt-1.5 leading-relaxed">
                        {item.description}
                      </p>
                      <span className="inline-block mt-2 text-[10px] font-mono font-bold text-[#0066ff] uppercase tracking-wider">
                        ✓ {item.metric}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center: High-Tech AI & Neural Engineering Showcase (aiml.png & aiml1.png) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 border border-slate-200/80 shadow-lg group">
              <Image
                src="/aiml.png"
                alt="AI & Autonomous Pipeline Engineering"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 text-white font-mono text-[10px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                Agentic AI &amp; Neural Systems
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 border border-slate-200/80 shadow-lg group">
              <Image
                src="/aiml1.png"
                alt="High-Velocity Cloud & AI Operations"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 text-white font-mono text-[10px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                Autonomous Cloud Backbones
              </div>
            </div>
          </div>

          {/* Right 3 Features */}
          <div className="lg:col-span-4 space-y-5">
            {rightFeatures.map((item) => {
              const isSelected = activeFeatureId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveFeatureId(item.id)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-slate-300 bg-slate-50/80 shadow-xs -translate-x-1"
                      : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#181a24]">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#484f6b] mt-1.5 leading-relaxed">
                        {item.description}
                      </p>
                      <span className="inline-block mt-2 text-[10px] font-mono font-bold text-[#0066ff] uppercase tracking-wider">
                        ✦ {item.metric}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
