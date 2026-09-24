"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";

export default function InsightsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-[#181a24] flex flex-col font-sans">
      <Navbar variant="floating" activePath="/insights" />

      <main className="flex-1 max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0066ff] bg-[#0066ff]/10 px-3 py-1 rounded-full">
            {t("nav.insights")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#181a24] mt-4 tracking-tight">
            Engineering Insights &amp; Research
          </h1>
          <p className="text-[#484f6b] text-lg mt-3">
            Case studies, technical whitepapers, and engineering thought leadership from Vexus Lab architects.
          </p>
        </div>
      </main>
    </div>
  );
}
