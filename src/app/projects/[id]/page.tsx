"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Innovations, INNOVATION_PROJECTS, InnovationProject } from "@/components/Innovations";
import { Footer } from "@/components/Footer";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  // Find project in INNOVATION_PROJECTS or generate fallback details
  const project: InnovationProject =
    INNOVATION_PROJECTS.find((p) => p.id === id) || {
      id: id,
      prodId: `PROD-ID: #${id.toUpperCase().slice(0, 6)}`,
      categoryTag: "HIGH-SPEED PRODUCTION ENGINE",
      category: "fintech",
      title: id
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      description:
        "High-velocity production software engineered by Vexus Lab. Built with resilient cloud architecture, automated zero-trust safeguards, and continuous real-time telemetry.",
      image: "/projects/sovereign-asset.png",
      imageTopBadge: "PRODUCTION VERIFIED",
      imageBottomBadge: "Sub-15ms Latency",
      highlights: [
        "Distributed multi-region fault tolerance with automated failover",
        "Deterministic data integrity auditing with real-time telemetry",
        "Zero-trust enclave encryption and strict typed invariant verification",
      ],
      metrics: [
        { stat: "99.999%", label: "High Availability" },
        { stat: "< 12ms", label: "p99 Execution Latency" },
        { stat: "100%", label: "Verified Data Purity" },
      ],
      techStack: ["Next.js 16", "Golang / Rust", "PostgreSQL CDC", "AWS Nitro"],
      linkText: "View Architecture Specs →",
      linkHref: `/projects/${id}`,
    };

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-[#181a24] flex flex-col font-sans selection:bg-[#0066ff]/20 selection:text-[#0066ff]">
      {/* Floating Navbar */}
      <Navbar variant="floating" activePath="/projects" />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* PROJECT DETAILS HERO SHOWCASE */}
        {/* ========================================================================= */}
        <section className="relative pt-12 pb-20 border-b border-[#e5e7eb] bg-gradient-to-b from-[#fcfdfe] via-[#f8f9fb] to-[#f2f3f6]">
          {/* Dot Matrix Ambient Background */}
          <div
            className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_25%,#000_65%,transparent_100%)] pointer-events-none opacity-60"
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#64748b] mb-8">
              <Link href="/" className="hover:text-[#0066ff] transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/projects" className="hover:text-[#0066ff] transition-colors">
                Projects
              </Link>
              <span>/</span>
              <span className="text-[#181a24] font-bold truncate max-w-xs">{project.title}</span>
            </nav>

            {/* 2-Column Responsive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Full Project Details */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  {/* Meta Tags Row */}
                  <div className="flex flex-wrap items-center gap-2.5 mb-4">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[#0284c7] bg-sky-50 border border-sky-100 px-3 py-1 rounded-full">
                      {project.categoryTag}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-[#64748b] bg-[#f1f5f9] px-2.5 py-1 rounded-md">
                      {project.prodId}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live in Production
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] tracking-tight leading-[1.15]">
                    {project.title}
                  </h1>

                  {/* Narrative Description */}
                  <p className="mt-4 text-base sm:text-lg text-[#484f6b] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Highlights / Deliverables */}
                  <div className="mt-6 space-y-2.5 bg-white p-5 rounded-2xl border border-[#e5e7eb] shadow-2xs">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] mb-1">
                      Verified System Architecture Specs:
                    </div>
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334155]">
                        <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#0066ff]/10 text-[#0066ff] flex items-center justify-center font-bold text-[10px]">
                          ✓
                        </span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Key Impact Metrics Grid */}
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {project.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#e5e7eb] shadow-2xs"
                      >
                        <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#181a24] tracking-tight">
                          {m.stat}
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#64748b] mt-1">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack & Direct CTAs */}
                <div className="pt-5 border-t border-[#e5e7eb] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/contact?interest=${encodeURIComponent(project.title)}`}
                      className="bg-gradient-to-r from-[#0066ff] to-[#0052cc] hover:from-[#0052cc] hover:to-[#003d99] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
                    >
                      Build Similar →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column: High Resolution Image Showcase */}
              <div className="lg:col-span-5 w-full">
                <div className="relative w-full h-72 sm:h-96 lg:h-[480px] rounded-3xl overflow-hidden bg-[#0f172a] border border-[#e2e8f0] shadow-xl group">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Contrast Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                  {/* Top-Left Glass Pill Badge */}
                  <div className="absolute top-4 left-4 bg-[#0f172a]/85 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase shadow-md">
                    {project.imageTopBadge}
                  </div>

                  {/* Bottom-Right Glass Pill Badge */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-[#181a24] border border-white/40 px-3.5 py-1.5 rounded-lg text-xs font-extrabold tracking-tight shadow-md">
                    {project.imageBottomBadge}
                  </div>

                  {/* Bottom-Left Live Architecture Status */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md text-white/90 px-3 py-1 rounded-md text-[11px] font-medium border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Live Telemetry Connected</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MORE PRODUCTION REPOSITORIES / INNOVATIONS */}
        {/* ========================================================================= */}
        <div className="bg-[#fcfdfe]">
          <Innovations />
        </div>
      </main>

      {/* Common Unified Footer Component */}
      <Footer />
    </div>
  );
}
