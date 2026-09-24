"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface StrengthItem {
  id: string;
  tag: string;
  title: string;
  image: string;
  description: string;
  details: string;
  points: string[];
}

export function OurStrengths() {
  const [activeStrengthModal, setActiveStrengthModal] = useState<StrengthItem | null>(null);

  const STRENGTHS: StrengthItem[] = [
    {
      id: "quality-driven",
      tag: "DISCIPLINE",
      title: "Quality Driven",
      image: "/about/about-hero-team.jpg",
      description:
        "Vexus Lab enforces rigorous compiler AST validation, memory boundaries, and automated contract testing. We engineer systems designed to run reliably for decades.",
      details:
        "Every pull request passes through automated static analysis, security fuzzing, and contract compatibility checks before reaching production staging.",
      points: [
        "Strict AST static typing across all layers",
        "Automated regression and mutation test suites",
        "Sub-100ms API response SLA guarantees",
        "Zero memory leak runtimes verified by telemetry",
      ],
    },
    {
      id: "team-work",
      tag: "SYNCHRONIZED PODS",
      title: "Team Work",
      image: "/about/launch-celebration.jpg",
      description:
        "Cross-functional squads combining senior full-stack, mobile, cloud infrastructure, and AI engineers working in follow-the-sun synchronized delivery.",
      details:
        "Our pods communicate directly in shared client Slack channels and host weekly live video code reviews with bi-weekly production cutovers.",
      points: [
        "Dedicated multi-discipline senior pods",
        "Direct Slack access to principal engineers",
        "Bi-weekly production staging cutovers",
        "Follow-the-sun 24/7 continuous coverage",
      ],
    },
    {
      id: "integrity",
      tag: "100% TRANSPARENCY",
      title: "Integrity",
      image: "/hero-engineering.jpg",
      description:
        "Direct code commits, 100% intellectual property transfer, transparent async demos, and zero hidden agency margins or proprietary vendor lock-in.",
      details:
        "From database schema migrations to infrastructure-as-code Terraform files, all artifacts belong unconditionally to your organization from day one.",
      points: [
        "100% clean Git repository handover",
        "Zero vendor or proprietary lock-in",
        "Direct weekly telemetry & cost audit reports",
        "Clean commercial MIT / Dual-Licensing",
      ],
    },
  ];

  return (
    <section className="w-full border-b border-[#e5e7eb] bg-[#f8f9fc]/60 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header with Title and "Know More" Button (Matching Reference Image 2) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#0066ff] mb-2.5">
              <span>✦</span>
              <span>OUR STRENGTHS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#181a24] tracking-tight leading-[1.15]">
              Our secrets of success in the <span className="text-[#0066ff]">industry.</span>
            </h2>
          </div>

          {/* Blue "Know More" Button */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <Link
              href="/about-us"
              className="bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-103 active:scale-97 transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Know More</span>
              <span className="text-xs">→</span>
            </Link>
          </div>
        </div>

        {/* 3 Photo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {STRENGTHS.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveStrengthModal(item)}
              className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Photo at Top of Card */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 border-b border-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                    {item.tag}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#181a24] group-hover:text-[#0066ff] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#484f6b] leading-relaxed mt-2.5">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Click for Details */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-mono font-bold text-[#0066ff]">
                <span>Click to view specifications</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
