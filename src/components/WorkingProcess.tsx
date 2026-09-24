"use client";

import React, { useState } from "react";

interface ProcessStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string;
  icon: React.ReactNode;
}

export function WorkingProcess() {
  const [selectedProcessStep, setSelectedProcessStep] = useState<number>(1);

  const steps: ProcessStep[] = [
    {
      step: 1,
      title: "Discovery",
      subtitle: "AUDIT & POD SYNTHESIS",
      description:
        "Conducted by senior architects with inputs from your stakeholders and domain leaders to map technical constraints, schemas, and SLA requirements.",
      deliverables: "Architecture Audit • Tech Stack Blueprint • Dedicated Pod Allocation",
      icon: (
        <svg className="w-8 h-8 text-[#0f172a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 7v6m3-3H7" />
        </svg>
      ),
    },
    {
      step: 2,
      title: "Planning",
      subtitle: "SYSTEM DESIGN & AST TYPING",
      description:
        "The quality proof of the project is engineered. Database schemas, API contracts, and deterministic 14-day sprint targets are established.",
      deliverables: "Database ERD • API Contract Schemas • 14-Day Sprint Milestones",
      icon: (
        <svg className="w-8 h-8 text-[#0f172a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      step: 3,
      title: "Execute",
      subtitle: "HIGH-VELOCITY SPRINT RUN",
      description:
        "Autonomous pod engineering kicks off. Engineers build, test, and deploy code in bi-weekly iterative staging sprints with continuous CI/CD validation.",
      deliverables: "Bi-weekly Staging Deploys • Async Screen Demos • Zero Tech Debt Verification",
      icon: (
        <svg className="w-8 h-8 text-[#0f172a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      step: 4,
      title: "Deliver",
      subtitle: "PRODUCTION LAUNCH & IP TRANSFER",
      description:
        "The conclusive product is cut over with zero downtime. Full repository transfer, CI/CD telemetry, and 24/7 SLA monitoring go live.",
      deliverables: "Zero-Downtime Launch • Complete Git Repo Transfer • 24/7 Telemetry Handover",
      icon: (
        <svg className="w-8 h-8 text-[#0f172a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#f4f8ff] via-[#f8fafc] to-[#f4f8ff] text-[#181a24] border-b border-[#e5e7eb] relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066ff]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-400/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-20">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#0066ff] mb-2.5">
            <span>✦</span>
            <span>WORKING PROCESS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#181a24] tracking-tight leading-[1.15]">
            How Vexus Lab works for our <span className="text-[#0066ff]">valued partners.</span>
          </h2>
        </div>

        {/* 4 Connected Circular Steps with Dotted Line */}
        <div className="relative">
          {/* Horizontal Connecting Dotted Line across Desktop */}
          <div className="hidden lg:block absolute top-[56px] left-[8%] right-[8%] border-t-2 border-dotted border-blue-200 z-0" />

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((item) => {
              const isSelected = selectedProcessStep === item.step;
              return (
                <div
                  key={item.step}
                  onClick={() => setSelectedProcessStep(item.step)}
                  className={`flex flex-col items-center text-center p-7 sm:p-8 rounded-[28px] transition-all duration-300 cursor-pointer border ${
                    isSelected
                      ? "bg-[#f0f7ff] border-[#0066ff] shadow-[0_12px_35px_rgba(0,102,255,0.15)] -translate-y-1.5 ring-2 ring-[#0066ff]/20"
                      : "bg-white border-slate-200/90 shadow-2xs hover:border-[#0066ff]/40 hover:bg-[#f8faff] hover:shadow-md hover:-translate-y-1"
                  }`}
                >
                  {/* Circle Icon with Overlapping Blue Badge */}
                  <div className="relative mb-6">
                    <div
                      className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border shadow-inner flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? "bg-white border-[#0066ff] text-[#0066ff] scale-105 ring-4 ring-[#0066ff]/15 shadow-md"
                          : "bg-slate-50 border-slate-200/90 text-slate-700"
                      }`}
                    >
                      {item.icon}
                    </div>
                    {/* Blue Circle Step Badge */}
                    <div className="absolute -bottom-1 left-2 sm:left-3 w-8 h-8 rounded-full bg-[#0066ff] text-white font-black text-xs sm:text-sm flex items-center justify-center shadow-md border-2 border-white">
                      {item.step}
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-[#181a24] tracking-tight">
                    {item.title}
                  </h3>
                  <div className="text-[10px] font-mono font-bold text-[#0066ff] uppercase tracking-wider mt-1 mb-3">
                    {item.subtitle}
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#484f6b] leading-relaxed max-w-[240px] mx-auto font-normal">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
