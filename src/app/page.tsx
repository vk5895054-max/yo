"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { VexusLabLogo } from "@/components/VexusLabLogo";
import { useLanguage } from "@/context/LanguageContext";
import { Innovations } from "@/components/Innovations";
import { ProjectBuildingTechniques } from "@/components/ProjectBuildingTechniques";
import { Footer } from "@/components/Footer";
import { HeroOrbitShowcase } from "@/components/HeroOrbitShowcase";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { OurStrengths } from "@/components/OurStrengths";
import { WorkingProcess } from "@/components/WorkingProcess";
import { EngineeringLifeSection } from "@/components/EngineeringLifeSection";
import { ProductStrategySection } from "@/components/ProductStrategySection";
import { Cta3DGradientModel } from "@/components/Cta3DGradientModel";

export default function Home() {
  const [navbarVariant, setNavbarVariant] = useState<"full" | "floating">("floating");
  const { t } = useLanguage();

  // Interactive Hero Text Hover Motion State
  const [heroTextPos, setHeroTextPos] = useState({ x: 0, y: 0 });
  const [isHeroTextHovered, setIsHeroTextHovered] = useState(false);

  const handleHeroTextMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.055;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.075;
    setHeroTextPos({ x, y });
  };

  const handleHeroTextMouseLeave = () => {
    setIsHeroTextHovered(false);
    setHeroTextPos({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-[#181a24] flex flex-col font-sans selection:bg-[#0066ff]/20 selection:text-[#0066ff]">
      {/* Sleek Navbar */}
      <Navbar variant={navbarVariant} />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* HERO SECTION: FRESH SOFTWARE DEVELOPMENT STARTUP */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-6 pb-20 lg:pt-14 lg:pb-28 border-b border-[#e5e7eb] bg-gradient-to-b from-[#fcfdfe] via-[#f8f9fb] to-[#f2f3f6]">
          {/* Subtle geometric dot grid matrix */}
          <div
            className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_25%,#000_65%,transparent_100%)] pointer-events-none opacity-60"
            aria-hidden="true"
          />

          {/* Ambient luminous warm energy glows */}
          <div
            className="absolute top-12 right-1/4 w-[600px] h-[600px] bg-[#0066ff]/10 rounded-full blur-[140px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-10 left-10 w-[420px] h-[420px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
            {/* 2-Column Hero Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
              {/* Left Column: Startup Typography, Value Proposition & CTAs */}
              <div className="lg:col-span-7">
                {/* Main Headline with Interactive Dynamic Hover Motion */}
                <div
                  onMouseMove={handleHeroTextMouseMove}
                  onMouseEnter={() => setIsHeroTextHovered(true)}
                  onMouseLeave={handleHeroTextMouseLeave}
                  className="cursor-default select-none transition-transform will-change-transform inline-block"
                  style={{
                    transform: isHeroTextHovered
                      ? `translate3d(${heroTextPos.x}px, ${heroTextPos.y}px, 0)`
                      : "translate3d(0, 0, 0)",
                    transition: isHeroTextHovered
                      ? "transform 0.12s ease-out"
                      : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  }}
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-extrabold tracking-[-0.035em] text-[#181a24] leading-[1.12]">
                    <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:translate-x-1 hover:text-[#0066ff]">
                      Transforming
                    </span>{" "}
                    <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:translate-x-1 hover:text-[#0066ff]">
                      Ambitious
                    </span>
                    <br />
                    <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:translate-x-1 hover:text-[#0066ff]">
                      Ideas
                    </span>{" "}
                    <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:translate-x-1">
                      Into
                    </span>{" "}
                    <span className="inline-block text-[#0066ff] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-105 hover:drop-shadow-sm">
                      Scalable,
                    </span>
                    <br />
                    <span className="inline-block text-[#0066ff] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-105 hover:drop-shadow-sm">
                      Production-Ready
                    </span>{" "}
                    <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:translate-x-1 hover:text-[#0066ff]">
                      Digital
                    </span>
                    <br />
                    <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:translate-x-1 hover:text-[#0066ff]">
                      Products.
                    </span>
                  </h1>
                </div>

                {/* Subtitle with subtle hover slide */}
                <p className="mt-6 text-base sm:text-lg text-[#484f6b] font-normal leading-relaxed max-w-2xl transition-all duration-300 ease-out hover:translate-x-2 hover:text-[#181a24] cursor-default">
                  Explore over 48+ deployed products, AI autonomous pipelines, and high-velocity web &amp; mobile architectures built for hyper-growth scale. From day-1 zero-trust blueprints to enterprise AI automation.
                </p>

                {/* Startup Primary Action CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="bg-gradient-to-r from-[#0066ff] to-[#0052cc] hover:from-[#0052cc] hover:to-[#003d99] text-white font-bold text-base px-8 py-3.5 rounded-[50px] shadow-[0_10px_25px_-5px_rgba(0,102,255,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(0,102,255,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                  >
                    Start Your Project →
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center font-bold text-base text-[#181a24] hover:text-[#0066ff] px-7 py-3.5 rounded-[50px] border border-[#e5e7eb] bg-white/90 backdrop-blur-xs hover:bg-[#f2f3f6] shadow-xs hover:shadow-md transition-all"
                  >
                    Explore Products →
                  </Link>
                </div>
              </div>

              {/* Right Column: Concentric Orbital Rings (Anticlockwise) with Central Image & Stars */}
              <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex items-center justify-center mb-16 sm:mb-20 lg:mb-0 pb-4 lg:pb-0">
                <HeroOrbitShowcase />
              </div>
            </div>

            {/* Metrics Highlights Bar */}
            <div className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-20">
              {/* Stat 1 */}
              <div className="p-6 rounded-2xl bg-white border border-[#e5e7eb] shadow-xs hover:shadow-md transition-all">
                <div className="text-4xl sm:text-[42px] font-extrabold text-[#181a24] tracking-tight">
                  20+
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] mt-3">
                  YEARS PRINCIPAL EXPERIENCE
                </div>
                <div className="text-xs text-[#64748b] mt-1">
                  Founders &amp; System Architects
                </div>
              </div>

              {/* Stat 2 */}
              <div className="p-6 rounded-2xl bg-white border border-[#e5e7eb] shadow-xs hover:shadow-md transition-all">
                <div className="flex items-baseline text-4xl sm:text-[42px] font-extrabold tracking-tight">
                  <span className="text-[#0066ff]">4.9</span>
                  <span className="text-[#0066ff]/70 text-2xl sm:text-3xl font-bold ml-0.5">/5</span>
                  <span className="text-[#0066ff] text-2xl sm:text-3xl ml-1.5">★</span>
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] mt-3">
                  TRUSTPILOT &amp; CLUTCH
                </div>
                <div className="text-xs text-[#64748b] mt-1">
                  2,500+ Verified Engagements
                </div>
              </div>

              {/* Stat 3 */}
              <div className="p-6 rounded-2xl bg-white border border-[#e5e7eb] shadow-xs hover:shadow-md transition-all">
                <div className="text-4xl sm:text-[42px] font-extrabold text-[#181a24] tracking-tight">
                  14 Days
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] mt-3">
                  CONCEPT TO WORKING MVP
                </div>
                <div className="text-xs text-[#64748b] mt-1">
                  Production CI/CD &amp; Database
                </div>
              </div>

              {/* Stat 4 */}
              <div className="p-6 rounded-2xl bg-white border border-[#e5e7eb] shadow-xs hover:shadow-md transition-all">
                <div className="text-4xl sm:text-[42px] font-extrabold text-[#181a24] tracking-tight">
                  0x
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] mt-3">
                  TECHNICAL DEBT POLICY
                </div>
                <div className="text-xs text-[#64748b] mt-1">
                  Strict typed AST &amp; e2e suites
                </div>
              </div>
            </div>


          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: THE AI-POWERED DEVELOPMENT FORMULA (CORE DIFFERENTIATOR)        */}
        {/* ========================================================================= */}
        <ProjectBuildingTechniques />

        {/* ========================================================================= */}
        {/* SECTION 3: WHY CHOOSE US (CENTER PHOTO + 6 ARCHITECTURE TENETS)           */}
        {/* ========================================================================= */}
        <WhyChooseUs />

        {/* ========================================================================= */}
        {/* SECTION 4: OUR STRENGTHS (3 PHOTO CARDS + ENGINEERING DISCIPLINE)         */}
        {/* ========================================================================= */}
        <OurStrengths />

        {/* ========================================================================= */}
        {/* SECTION 5: WORKING PROCESS (4 CONNECTED CIRCULAR STEPS + DELIVERABLES)    */}
        {/* ========================================================================= */}
        <WorkingProcess />

        {/* ========================================================================= */}
        {/* SECTION 6: INNOVATIVE PROJECTS DELIVERING HIGH-SPEED INTELLIGENCE         */}
        {/* ========================================================================= */}
        <Innovations />

        {/* ========================================================================= */}
        {/* SECTION 7: ENGINEERING LIFE, TRIPS & CULTURE AT VEXUS                     */}
        {/* ========================================================================= */}
        <EngineeringLifeSection source="home" />

        {/* ========================================================================= */}
        {/* SECTION 8: PRODUCT STRATEGY, EXPERIENCE DESIGN & FEATURED INSIGHTS        */}
        {/* ========================================================================= */}
        <ProductStrategySection />

        {/* ========================================================================= */}
        {/* SECTION 8: HIGH-CONVERSION ENTERPRISE CTA BANNER                          */}
        {/* ========================================================================= */}
        <section className="w-full border-b border-[#e5e7eb] bg-gradient-to-b from-[#f8f9fc] via-white to-[#fcfdfe] py-20 lg:py-24 relative overflow-hidden">
          {/* Subtle Ambient Energy Glows */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#0066ff]/10 rounded-full blur-[140px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
            <div className="rounded-3xl bg-[#090d18] text-white p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl relative overflow-hidden">
              {/* Corner Geometric Accents */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#0066ff]/20 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 right-0 flex gap-2 pointer-events-none opacity-80">
                <div className="w-12 h-12 bg-[#0066ff]/20 -skew-x-20 rounded-xs" />
                <div className="w-12 h-12 bg-white/5 -skew-x-20 rounded-xs" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                {/* Left Column: Text & Action CTAs */}
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066ff]/15 border border-[#0066ff]/30 text-xs font-mono font-bold text-[#0066ff] uppercase tracking-wider mb-5">
                    <span className="w-2 h-2 rounded-full bg-[#0066ff] animate-pulse" />
                    <span>14-DAY RAPID PRODUCTION TURNKEY</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight leading-[1.15]">
                    Ready to engineer your next <span className="text-[#0066ff]">breakthrough product?</span>
                  </h2>

                  <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                    Skip the recruiting grind and technical debt. Build with dedicated engineering pods that unite 20 years of architectural mastery with frontier AI acceleration.
                  </p>

                  {/* CTAs */}
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-[0_4px_25px_rgba(0,102,255,0.4)] hover:shadow-[0_6px_30px_rgba(0,102,255,0.6)] hover:scale-103 active:scale-97 transition-all duration-200"
                    >
                      <span>Schedule Architecture Briefing</span>
                      <span className="text-xs">→</span>
                    </Link>
                    <Link
                      href="/products"
                      className="inline-flex items-center justify-center font-bold text-sm sm:text-base text-white hover:text-[#0066ff] px-7 py-4 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800/80 transition-all"
                    >
                      Explore Products &amp; Specs →
                    </Link>
                  </div>

                  {/* Trust Guarantee Badges */}
                  <div className="mt-10 pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="text-[#0066ff] font-bold">✓</span>
                      <span>14-Day Working MVP Turnkey</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#0066ff] font-bold">✓</span>
                      <span>100% Direct IP &amp; Git Transfer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#0066ff] font-bold">✓</span>
                      <span>Direct Slack &amp; Lead Architect Access</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: 3D Gradient Model Component */}
                <div className="lg:col-span-5 flex items-center justify-center">
                  <Cta3DGradientModel />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Floating Navbar Switcher (Shifted to bottom left corner) */}
        <div className="fixed bottom-5 left-5 z-40 hidden sm:flex items-center gap-2 p-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#e5e7eb] shadow-xl text-xs font-semibold">
          <span className="text-[#484f6b] pl-2 text-[11px] font-bold uppercase tracking-wider">Navbar:</span>
          <button
            onClick={() => setNavbarVariant("floating")}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${navbarVariant === "floating"
              ? "bg-[#0066ff] text-white shadow-sm"
              : "text-[#484f6b] hover:text-[#181a24]"
              }`}
          >
            Floating Pill
          </button>
          <button
            onClick={() => setNavbarVariant("full")}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${navbarVariant === "full"
              ? "bg-[#0066ff] text-white shadow-sm"
              : "text-[#484f6b] hover:text-[#181a24]"
              }`}
          >
            Full Width
          </button>
        </div>
      </main>

      {/* Common Unified Footer Component */}
      <Footer />
    </div>
  );
}
