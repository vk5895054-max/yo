"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function HealthcareLifeSciencesPage() {
  const [activeSolutionIndex, setActiveSolutionIndex] = useState(0);

  const capabilities = [
    {
      title: "HIPAA & GDPR Compliant Telehealth Platforms",
      desc: "Building end-to-end encrypted telehealth software, web RTC audio/video streaming, and secure patient portals.",
    },
    {
      title: "AI Clinical Trial Analytics & Patient Matching",
      desc: "Leveraging natural language processing and RAG architectures to query clinical trial records and match candidate cohorts.",
    },
    {
      title: "MedTech Embedded Device Software & IoT",
      desc: "Engineering ISO 13485 compliant firmware, Bluetooth LE connectivity, and cloud sync engines for wearable medical sensors.",
    },
    {
      title: "Interoperable EHR/FHIR API Integration",
      desc: "Integrating legacy hospital EHRs (Epic, Cerner) using HL7 FHIR APIs to enable seamless real-time clinical data exchange.",
    },
  ];

  const solutions = [
    {
      id: "telehealth",
      title: "Next-Gen Telehealth Suite",
      desc: "HIPAA-certified video consultations, e-prescriptions, dynamic scheduling, and remote patient onboarding.",
    },
    {
      id: "fhir-hub",
      title: "FHIR Interoperability Engine",
      desc: "Unified REST API gateway translating legacy health records into standard FHIR R4 data resources.",
    },
    {
      id: "clinical-analytics",
      title: "Clinical Trial Analytics Engine",
      desc: "AI-driven cohort discovery, real-world evidence analytics, and automated trial protocol screening.",
    },
    {
      id: "medtech-iot",
      title: "Smart MedTech Connectivity",
      desc: "Cloud sync platforms for FDA-cleared connected medical devices, continuous glucose monitors, and diagnostics.",
    },
    {
      id: "rpm-platform",
      title: "Remote Patient Monitoring (RPM)",
      desc: "Real-time telemetry ingestion pipelines capturing continuous vitals with automated anomaly detection alerts.",
    },
  ];

  const caseStudies = [
    {
      client: "Global Pharma Leader",
      title: "GenAI Clinical Trial Analytics Platform",
      desc: "Reduced clinical trial patient screening time by 60% with GenAI semantic search across 50,000+ EHR records.",
      image: "/projects/biovibe.png",
    },
    {
      client: "MedTech Innovator",
      title: "Embedded Medical Device Firmware & Cloud Hub",
      desc: "Engineered ISO 13485 compliant cloud telemetry hub processing 5M daily device measurements.",
      image: "/hero-engineering.jpg",
    },
    {
      client: "Regional Healthcare Network",
      title: "HIPAA-Compliant Telehealth & FHIR Integration",
      desc: "Built unified virtual care platform serving 250,000 active patients with instant Epic EHR synchronization.",
      image: "/about/about-hero-team.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-[#181a24] flex flex-col font-sans selection:bg-[#0066ff]/20 selection:text-[#0066ff]">
      <Navbar variant="floating" activePath="/industries" />

      <main className="flex-1 w-full">
        {/* HERO SECTION */}
        <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#e5e7eb] bg-gradient-to-b from-[#fcfdfe] via-[#f8f9fc] to-[#f2f3f6]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-[#484f6b] mb-8 font-medium">
              <Link href="/industries" className="hover:text-[#0066ff] transition-colors">Industries</Link>
              <span className="text-slate-400">›</span>
              <span className="text-[#181a24] font-bold">Healthcare &amp; Life Sciences</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0066ff] bg-[#0066ff]/10 px-3 py-1 rounded-full border border-[#0066ff]/20 mb-4">
                  HEALTHCARE &amp; MEDTECH
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#181a24] tracking-tight leading-[1.08] mb-6">
                  Healthcare &amp; Life Sciences
                </h1>
                <p className="text-[#484f6b] text-lg sm:text-xl leading-relaxed max-w-2xl font-normal">
                  HIPAA-compliant telehealth, clinical trials analytics, and medtech device software.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Start a digital health consultation →
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
                    src="/health.png"
                    alt="Healthcare & MedTech Software"
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
                    src="/health1.png"
                    alt="Healthcare Software Engineering"
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
                  Accelerating life-saving healthtech innovation
                </h2>
                <p className="mt-5 text-[#484f6b] text-base sm:text-lg leading-relaxed font-normal">
                  Vexus Lab works with healthcare providers, pharma enterprises, and MedTech pioneers to build compliant, secure, and interoperable digital care platforms powered by AI.
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

        {/* CAPABILITIES SECTION */}
        <section className="py-20 lg:py-28 bg-[#f8f9fb] border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#484f6b]">
                Core Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] mt-2 tracking-tight">
                Digital Health Capabilities
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="group p-8 rounded-3xl bg-white border border-[#e5e7eb] hover:bg-[#f1f3f7] hover:border-[#cbd5e1] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-bold text-[#181a24] group-hover:text-[#0066ff] transition-colors mb-3">
                      {cap.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#484f6b] leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUTIONS STAGE SECTION */}
        <section className="py-20 lg:py-28 bg-white border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#484f6b]">
                Our Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] mt-2 tracking-tight">
                Healthcare Solutions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {solutions.map((item, idx) => {
                const isActive = idx === activeSolutionIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveSolutionIndex(idx)}
                    className={`group cursor-pointer rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between border ${
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

        {/* CASE STUDIES SECTION */}
        <section className="py-20 lg:py-28 bg-[#f8f9fb]">
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
