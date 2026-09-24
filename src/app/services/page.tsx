"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesPage() {
  const { t } = useLanguage();

  const servicesList = [
    {
      title: "Digital Product Architecture",
      desc: "Enterprise architecture, scalable microservices, and digital execution tailored for high-availability systems.",
      href: "/services/digital-architecture",
    },
    {
      title: "Generative AI & LLM Solutions",
      desc: "Custom fine-tuned foundation models, RAG vector architectures, and autonomous AI agents.",
      href: "/services/generative-ai",
    },
    {
      title: "Cloud & DevOps Engineering",
      desc: "Automated multi-cloud CI/CD pipelines, Kubernetes orchestration, and infrastructure-as-code.",
      href: "/services/cloud-devops",
    },
    {
      title: "Cybersecurity & Compliance",
      desc: "Zero-trust architectures, end-to-end cryptographic defense, and regulatory SOC2/HIPAA compliance.",
      href: "/services/cybersecurity",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-[#181a24] flex flex-col font-sans selection:bg-[#0066ff]/20 selection:text-[#0066ff]">
      <Navbar variant="floating" activePath="/services" />

      <main className="flex-1 max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-16 w-full">
        {/* Clean Header Card */}
        <div className="mb-12 bg-white rounded-3xl border border-[#e5e7eb] p-6 sm:p-10 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0066ff] bg-[#0066ff]/10 px-3.5 py-1.5 rounded-full border border-[#0066ff]/20">
            {t("nav.services")}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] mt-4 tracking-tight leading-tight max-w-3xl">
            Digital Product Engineering Services
          </h1>
          <p className="text-[#484f6b] text-base sm:text-lg mt-3 leading-relaxed max-w-2xl font-normal">
            End-to-end software architecture, cloud platforms, and generative AI solutions designed for global scale.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#484f6b]">
            <span className="px-3 py-1 rounded-full bg-[#f2f3f6] border border-[#e5e7eb]">4 Core Disciplines</span>
            <span className="px-3 py-1 rounded-full bg-[#f2f3f6] border border-[#e5e7eb]">Enterprise Grade</span>
          </div>
        </div>

        {/* 4 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesList.map((srv) => (
            <Link
              key={srv.title}
              href={srv.href}
              className="group p-8 rounded-3xl bg-white border border-[#e5e7eb] hover:border-[#0066ff]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-bold text-[#181a24] group-hover:text-[#0066ff] transition-colors">
                  {srv.title}
                </h2>
                <p className="text-[#484f6b] text-sm mt-3 leading-relaxed font-normal">
                  {srv.desc}
                </p>
              </div>
              <div className="mt-8 flex items-center text-sm font-bold text-[#0066ff] group-hover:translate-x-1.5 transition-transform">
                <span>Learn more</span>
                <span className="ml-1.5">→</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Common Unified Footer Component */}
      <Footer />
    </div>
  );
}
