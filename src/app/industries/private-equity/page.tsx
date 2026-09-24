"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivateEquityPage() {
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);

  const dealLifecyclePillars = [
    {
      stage: "Buy-Side",
      desc: "We deliver data-driven growth opportunity analyses and AI-powered diligence insights, helping investors make smarter, more strategic investment decisions.",
      tag: "DILIGENCE",
    },
    {
      stage: "Hold Period",
      desc: "We accelerate value creation with AI-driven playbooks that drive revenue uplift, operational efficiency, and technology modernization—enabling rapid scaling and market differentiation.",
      tag: "VALUE CREATION",
    },
    {
      stage: "Sell-Side",
      desc: "We optimize portfolio companies for successful exits, showcasing digital and AI-enabled innovation, cost efficiencies, and strategic differentiation to maximize enterprise value and investor returns.",
      tag: "EXIT READINESS",
    },
  ];

  const valueOfferings = [
    {
      id: "revenue-uplift",
      title: "Revenue Uplift",
      desc: "Drive top-line growth with AI-powered innovation, API-fication, and digital transformation to unlock new revenue streams. Our data-driven approach enables personalized customer experiences, intelligent automation, and enhanced product monetization.",
    },
    {
      id: "cost-optimization",
      title: "Operational Cost Optimization",
      desc: "Reduce costs with AI-driven customer support automation and accelerated professional services, boosting efficiency and profitability. Leverage AI to streamline customer interactions, automate routine tasks, and enhance workforce productivity.",
    },
    {
      id: "productivity-uplift",
      title: "Productivity Uplift",
      desc: "Enhance efficiency with tool alignment, AI-enhanced modernization, and automated workflows, lowering operational expenses. Our data-centric automation strategies improve team collaboration, reduce friction points, and drive operational agility.",
    },
    {
      id: "ma-acceleration",
      title: "M&A Value Acceleration",
      desc: "Streamline M&A transitions with tech advisory, AI-powered carve-outs, infrastructure modernization, and right-shoring, ensuring faster value realization. We help portfolio companies integrate digital assets seamlessly, optimize systems post-acquisition, and unlock operational synergies.",
    },
    {
      id: "innovation-strategies",
      title: "Innovation-Driven Strategies",
      desc: "Develop actionable strategies to unlock value across the investment lifecycle. Our expertise includes assessing product and technology maturity, creating AI-powered roadmaps aligned with business objectives, and fostering market differentiation through info-driven innovation strategies.",
    },
    {
      id: "tech-modernization",
      title: "Technology Modernization",
      desc: "Modernize platforms and infrastructure to ensure resilience, scalability, and efficiency. We deliver cloud optimization, infrastructure modernization, and platform consolidation, enabling portfolio companies to operate with agility and future-proofed digital capabilities.",
    },
    {
      id: "operational-excellence",
      title: "Operational Excellence",
      desc: "Optimize operations to accelerate value creation and deliver measurable impact. Through AI-driven system enhancements, talent alignment, and R&D innovation, we empower portfolio companies to achieve higher operational performance and cost efficiencies.",
    },
  ];

  const caseStudies = [
    {
      client: "Global Software Leader",
      title: "From Legacy to Leading-Edge: AI-Driven Angular Modernization",
      desc: "Migrated legacy monolith to AI-optimized Angular architecture, reducing release time by 60%.",
      image: "/products-engineering.png",
    },
    {
      client: "Enterprise Q&A Systems",
      title: "Automating Internal Search with GenAI-Powered Q&A",
      desc: "Deployed enterprise RAG architecture across portfolio knowledge bases for sub-second retrieval.",
      image: "/projects/sovereign-asset.png",
    },
    {
      client: "Anaplan Partnership",
      title: "Vexus Lab Partners with Anaplan for Value Acceleration",
      desc: "Integrated real-time financial modeling telemetry driving multi-million dollar post-merger synergies.",
      image: "/projects/city-pulse.jpg",
    },
  ];

  const whyPillars = [
    {
      title: "Designed for Desirability",
      desc: "We design user-focused, AI-integrated digital solutions that seamlessly blend engineering and innovation to drive value creation for Private Equity portfolio companies.",
    },
    {
      title: "Engineered for Excellence",
      desc: "Our proven digital engineering expertise enables Private Equity-backed companies to scale efficiently, modernize systems, and deliver high-quality outcomes with speed, precision, and AI-driven intelligence.",
    },
    {
      title: "Curated for Intelligence",
      desc: "We harness AI-powered analytics and data-driven insights to optimize Private Equity strategies, delivering scalable solutions that drive growth and maximize portfolio returns.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-[#181a24] flex flex-col font-sans selection:bg-[#0066ff]/20 selection:text-[#0066ff]">
      {/* Dynamic Header */}
      <Navbar variant="floating" activePath="/industries" />

      <main className="flex-1 w-full">
        {/* ========================================================================= */}
        {/* HERO SECTION (Screenshot 1) */}
        {/* ========================================================================= */}
        <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#e5e7eb] bg-gradient-to-b from-[#fcfdfe] via-[#f8f9fc] to-[#f2f3f6]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-[#484f6b] mb-8 font-medium">
              <Link href="/industries" className="hover:text-[#0066ff] transition-colors">Industries</Link>
              <span className="text-slate-400">›</span>
              <span className="text-[#181a24] font-bold">Private Equity</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0066ff] bg-[#0066ff]/10 px-3 py-1 rounded-full border border-[#0066ff]/20 mb-4">
                  PRIVATE EQUITY VALUE CREATION
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#181a24] tracking-tight leading-[1.08] mb-6">
                  Private Equity
                </h1>
                <p className="text-[#484f6b] text-lg sm:text-xl leading-relaxed max-w-2xl font-normal mb-6">
                  Engineering impact for private equity-backed companies to scale, innovate, and transform into tomorrow&apos;s market leaders.
                </p>
                <div className="p-6 rounded-2xl bg-white border border-[#e5e7eb] shadow-xs text-sm sm:text-base text-[#484f6b] leading-relaxed">
                  We partner with Private Equity sponsors across the deal lifecycle, delivering strategic support from <span className="text-[#0066ff] font-bold">AI-powered buy-side diligence and value creation</span> during the hold period to targeted, technology-driven sell-side preparation.
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Get in touch →
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white border border-[#e5e7eb] hover:bg-[#f2f3f6] text-[#181a24] font-bold text-sm transition-all duration-200 shadow-xs"
                  >
                    Explore case studies
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Showcase Image */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/60 bg-slate-100 group">
                  <Image
                    src="/industrial.png"
                    alt="Private Equity Advisory & Execution"
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

        {/* ========================================================================= */}
        {/* "HOW WE HELP" DEAL LIFECYCLE SECTION (Screenshot 2) */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 bg-white border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column Description */}
              <div className="lg:col-span-5">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#484f6b] mb-3 block">
                  How we help
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] tracking-tight leading-tight">
                  Value Creation Across the Investment Lifecycle
                </h2>
                <p className="mt-5 text-[#484f6b] text-base leading-relaxed font-normal">
                  We empower Portfolio Companies with our unparalleled expertise in AI and Digital Product Engineering, and Intelligent Systems that are strategically designed to match the rapid pace of private equity value creation.
                </p>
              </div>

              {/* Right Column: 3 Deal Lifecycle Cards */}
              <div className="lg:col-span-7 space-y-6">
                {dealLifecyclePillars.map((pillar) => (
                  <div
                    key={pillar.stage}
                    className="p-8 rounded-3xl bg-[#f8f9fb] border border-[#e5e7eb] hover:border-[#0066ff]/50 shadow-xs hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold text-[#181a24]">
                        {pillar.stage}
                      </h3>
                      <span className="text-[10px] font-mono font-bold text-[#0066ff] uppercase tracking-wider bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                        {pillar.tag}
                      </span>
                    </div>
                    <p className="text-sm text-[#484f6b] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* "WHAT WE OFFER" STRATEGIC OFFERINGS SECTION (Screenshot 2 & 3) */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 bg-[#f8f9fb] border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#484f6b]">
                  What we offer
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] mt-2 tracking-tight">
                  Accelerate private equity value creation with strategic digital transformation
                </h2>
              </div>
              <div className="max-w-md">
                <p className="text-xs sm:text-sm text-[#484f6b] leading-relaxed">
                  Unlock growth and maximize portfolio value by leveraging AI-driven digital engineering, tailored innovation strategies, and scalable solutions. We enable private equity sponsors and portfolio companies to drive operational excellence, modernize systems, and enhance readiness for investment or exit.
                </p>
              </div>
            </div>

            {/* 7 Offerings Horizontal / Carousel Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {valueOfferings.map((item, idx) => {
                const isActive = idx === activeOfferIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveOfferIndex(idx)}
                    className={`group cursor-pointer rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between border ${
                      isActive
                        ? "bg-[#e8ebf0] border-[#c0c7d4] shadow-md"
                        : "bg-white border-[#e5e7eb] hover:bg-[#f1f3f7] hover:border-[#cbd5e1] hover:shadow-md"
                    }`}
                  >
                    <div className="transition-transform duration-300 group-hover:translate-x-1.5">
                      <h3 className="text-xl font-bold mb-3 text-[#181a24] group-hover:text-[#0066ff] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed text-[#484f6b]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* "OUR WORK" CASE STUDIES SECTION */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 bg-white border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#484f6b]">
                Our work
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] mt-2 tracking-tight">
                Case studies
              </h2>
            </div>

            {/* 3 Case Study Image Cards */}
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
                      <h3 className="text-xl font-bold">{cs.client}</h3>
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

        {/* ========================================================================= */}
        {/* "WHY VEXUS LAB FOR PRIVATE EQUITY?" SECTION */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 bg-[#f8f9fb] border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Image & Heading */}
              <div className="lg:col-span-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] mb-4 tracking-tight">
                  Why Vexus Lab?
                </h2>
                <p className="text-[#484f6b] text-base leading-relaxed mb-8">
                  We deliver AI-powered, user-focused, and data-driven digital solutions that empower Private Equity portfolio companies to scale, innovate, and maximize value creation efficiently.
                </p>
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                  <Image
                    src="/hero-engineering.jpg"
                    alt="Private Equity Tech Intelligence"
                    width={700}
                    height={500}
                    className="w-full h-[360px] sm:h-[420px] object-cover"
                  />
                </div>
              </div>

              {/* Right Pillars List */}
              <div className="lg:col-span-6 flex flex-col justify-center gap-6">
                {whyPillars.map((pillar) => (
                  <div key={pillar.title} className="p-8 rounded-3xl bg-white border border-[#e5e7eb] shadow-xs">
                    <h3 className="text-xl font-bold text-[#181a24] mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#484f6b] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CALL TO ACTION BANNER */}
        {/* ========================================================================= */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-slate-900 via-[#181a24] to-blue-950 text-white flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Let&apos;s start engineering impact together.
                </h2>
                <p className="text-slate-300 text-base mt-2">
                  Schedule a tech due diligence or portfolio value acceleration consultation.
                </p>
              </div>
              <Link
                href="/contact"
                className="whitespace-nowrap px-8 py-4 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Get in touch →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
