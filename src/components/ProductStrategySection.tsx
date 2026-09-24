"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface StrategyPillar {
  id: string;
  title: string;
  description: string;
  badge: string;
  icon: React.ReactNode;
}

interface InsightArticle {
  id: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  link: string;
}

export function ProductStrategySection() {
  const pillars: StrategyPillar[] = [
    {
      id: "solutions",
      title: "Solutions for Every Stage and Sector",
      description:
        "No matter which sector or stage of the product development process you’re in, Vexus Lab can help. Let’s meet wherever you are.",
      badge: "END-TO-END",
      icon: (
        <svg className="w-6 h-6 text-[#0066ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      id: "integrated",
      title: "Integrated Strategic Design & Development",
      description:
        "Our team works alongside yours from concept to completion, ensuring complete alignment, zero hand-off friction, and seamless execution.",
      badge: "SYNCHRONIZED PODS",
      icon: (
        <svg className="w-6 h-6 text-[#0066ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2V4zm-6 8a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zm12 0a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zM4 18a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1z" />
        </svg>
      ),
    },
    {
      id: "concierge",
      title: "Concierge Service, Enterprise Scale",
      description:
        "Get the personal attention you deserve from senior lead architects, backed by enterprise scale to accelerate efficiency and speed to market.",
      badge: "WHITE-GLOVE SLA",
      icon: (
        <svg className="w-6 h-6 text-[#0066ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: "empowerment",
      title: "Organizational Empowerment",
      description:
        "Vexus Lab’s team embeds directly with yours to upskill team members through live demonstration, pairing, and collaborative co-creation.",
      badge: "TEAM EMBEDDING",
      icon: (
        <svg className="w-6 h-6 text-[#0066ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  const insights: InsightArticle[] = [
    {
      id: "cx-transformation",
      date: "8 July 2024",
      category: "BLOGS • CUSTOMER EXPERIENCE",
      title: "6 Pillars of Successful Customer Experience Transformation",
      excerpt:
        "Learn how modern digital studios align design architecture, user feedback loops, and high-velocity engineering to drive lasting customer retention.",
      link: "/insights",
    },
    {
      id: "healthcare-hcd",
      date: "5 August 2024",
      category: "BLOGS • HEALTHCARE & AI",
      title: "Human-Centered Design in Healthcare: Bridging Innovation and Execution",
      excerpt:
        "Learn how Vexus Lab prioritizes complex user needs to create impactful medical software solutions, bridging technical innovation with compliance.",
      link: "/insights",
    },
    {
      id: "personalization-strategy",
      date: "18 June 2024",
      category: "BLOGS • DATA & STRATEGY",
      title: "Turning Customer Insights Into a Personalization Strategy",
      excerpt:
        "Unlock the power of real-time telemetry and personalization strategies for enhanced customer engagement across web and mobile touchpoints.",
      link: "/insights",
    },
  ];

  return (
    <section className="w-full py-20 lg:py-24 border-b border-[#e5e7eb] bg-gradient-to-b from-[#f8f9fc] via-white to-[#f8f9fc] relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-[#0066ff]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[400px] h-[400px] bg-sky-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold text-[#0066ff] uppercase tracking-wider mb-3.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0066ff] animate-pulse" />
            <span>PRODUCT STRATEGY &amp; EXPERIENCE DESIGN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#181a24] tracking-tight leading-[1.15]">
            Bridging vision &amp; execution with <span className="text-[#0066ff]">strategic design.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#484f6b] leading-relaxed">
            Combining extensive high-performance software engineering capabilities with product strategy and experience design expertise to build what&apos;s next.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((item) => (
            <div
              key={item.id}
              className="group p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-blue-50/80 border border-blue-100/80 text-[#0066ff]">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#0066ff] uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#181a24] group-hover:text-[#0066ff] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#484f6b] leading-relaxed mt-2.5">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0066ff]">
                <span>Learn More</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
