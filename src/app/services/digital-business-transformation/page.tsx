"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function DigitalBusinessTransformationPage() {
  const [activeCapabilityIndex, setActiveCapabilityIndex] = useState(0);

  const capabilities = [
    {
      id: "advisory",
      title: "Transformation Advisory",
      desc: "Identify and understand opportunity and impact areas for digital transformation. Define your transformation solution, roadmap, target outcomes, and metrics for tracking progress.",
    },
    {
      id: "execution",
      title: "Transformation Execution & Governance",
      desc: "Define an organizational structure and ways of working to support your transformation journey. Execute your roadmap across people, processes, and technologies, measuring and tracking success to deliver value to your business.",
    },
    {
      id: "research",
      title: "User and Market Research",
      desc: "Gather data, then turn it into insights and actionable plans. Using quantitative, qualitative, and algorithmic techniques, we help you deeply understand your market and audience to drive product-market fit, growth, and user satisfaction.",
    },
    {
      id: "design",
      title: "Product and UX/UI Design",
      desc: "User wireframes, user flows, sitemaps, component libraries, and more to design the product experience. This includes crafting the structure, look, and functionality, while considering the medium, brand, accessibility, and best practices.",
    },
    {
      id: "ai-sdlc",
      title: "Vexus Lab AI-Powered SDLC",
      desc: "Reinvent software development with AI-driven precision and productivity, harnessing AI-driven, human-guided approaches to work smarter, get to market faster, and lower costs.",
    },
    {
      id: "ai-agile",
      title: "AI-Enabled Agile",
      desc: "Pioneer innovation solutions that shape the future of software development by harnessing our expertise in AI practices and Agile.",
    },
  ];

  const caseStudies = [
    {
      client: "Enterprise Retail Giant",
      title: "Omnichannel Digital Transformation",
      desc: "Executed global digital roadmap aligning leadership, modern cloud stack, and unified UX design systems.",
      image: "/hero-startup.jpg",
    },
    {
      client: "Global Financial Institution",
      title: "AI-Driven Operational Governance",
      desc: "Implemented AI-powered SDLC and agile governance, accelerating time-to-market by 40%.",
      image: "/products-engineering.png",
    },
    {
      client: "Healthcare Provider",
      title: "Patient Experience & UX Redesign",
      desc: "Transformed digital care workflows through extensive market research and accessible UX design.",
      image: "/about/team-collaboration.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-[#181a24] flex flex-col font-sans selection:bg-[#0066ff]/20 selection:text-[#0066ff]">
      <Navbar variant="floating" activePath="/services" />

      <main className="flex-1 w-full">
        {/* HERO SECTION */}
        <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#e5e7eb] bg-gradient-to-b from-[#fcfdfe] via-[#f8f9fc] to-[#f2f3f6]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-[#484f6b] mb-8 font-medium">
              <Link href="/services" className="hover:text-[#0066ff] transition-colors">Services</Link>
              <span className="text-slate-400">›</span>
              <span className="text-[#181a24] font-bold">Digital Business Transformation</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0066ff] bg-[#0066ff]/10 px-3 py-1 rounded-full border border-[#0066ff]/20 mb-4">
                  ENTERPRISE TRANSFORMATION
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#181a24] tracking-tight leading-[1.08] mb-6">
                  Digital Business Transformation
                </h1>
                <p className="text-[#0066ff] text-xl font-bold mb-4">
                  Achieve tangible progress in your journey to become a digitally enabled enterprise
                </p>
                <p className="text-[#484f6b] text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                  Let’s dive into your business problems and opportunities—and build plans for technology-enabled strategies and solutions. You bring your toughest challenges. We’ll supply 20+ years of experience in digital transformation.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Start a transformation session →
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white border border-[#e5e7eb] hover:bg-[#f2f3f6] text-[#181a24] font-bold text-sm transition-all duration-200 shadow-xs"
                  >
                    Explore case studies
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/60 bg-slate-100 group">
                  <Image
                    src="/about/team-collaboration.jpg"
                    alt="Digital Business Transformation"
                    width={700}
                    height={600}
                    className="w-full h-[360px] sm:h-[440px] object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW WE HELP SECTION */}
        <section className="py-20 lg:py-28 bg-white border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                  <Image
                    src="/about/about-hero-team.jpg"
                    alt="Transformation Strategy Pod"
                    width={800}
                    height={700}
                    className="w-full h-[400px] sm:h-[480px] object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-center">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#484f6b] mb-3">
                  How we help
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] tracking-tight leading-tight">
                  Drive successful digital strategies
                </h2>
                <p className="mt-5 text-[#484f6b] text-base sm:text-lg leading-relaxed font-normal">
                  Technology may not be your core business, but it’s increasingly critical to your success. Bring Vexus Lab your business problems and growth opportunities. We’ll show how digital technologies can help, and build actionable roadmaps for turning digital strategies into business results.
                </p>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-base font-bold text-[#0066ff] hover:text-[#0052cc] transition-colors group"
                  >
                    <span>Learn more</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OUR CAPABILITIES SECTION */}
        <section className="py-20 lg:py-28 bg-[#f8f9fb] border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#484f6b]">
                Our capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] mt-2 tracking-tight">
                Capturing value through digital transformation
              </h2>
              <p className="mt-4 text-[#484f6b] text-base sm:text-lg max-w-3xl">
                Trust Vexus Lab to help you plan and execute effective digital transformation strategies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {capabilities.map((cap, idx) => {
                const isActive = idx === activeCapabilityIndex;
                return (
                  <div
                    key={cap.id}
                    onClick={() => setActiveCapabilityIndex(idx)}
                    className={`group cursor-pointer rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between border ${
                      isActive
                        ? "bg-[#e8ebf0] border-[#c0c7d4] shadow-md"
                        : "bg-white border-[#e5e7eb] hover:bg-[#f1f3f7] hover:border-[#cbd5e1] hover:shadow-md"
                    }`}
                  >
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-[#181a24] group-hover:text-[#0066ff] transition-colors">
                        {cap.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#484f6b]">
                        {cap.desc}
                      </p>
                    </div>
                    <div className="mt-6">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066ff] uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                      >
                        <span>Learn more</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CASE STUDIES SECTION */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#484f6b]">
                Our work
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] mt-2 tracking-tight">
                Case studies
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies.map((cs) => (
                <div
                  key={cs.client}
                  className="group rounded-3xl overflow-hidden border border-[#e5e7eb] bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                    <Image
                      src={cs.image}
                      alt={cs.client}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-2xl font-bold">{cs.client}</h3>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-[#181a24] group-hover:text-[#0066ff] transition-colors">
                        {cs.title}
                      </h4>
                      <p className="text-xs text-[#484f6b] mt-2 leading-relaxed">
                        {cs.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
