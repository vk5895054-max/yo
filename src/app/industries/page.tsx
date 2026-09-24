"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";

export default function IndustriesPage() {
  const { t } = useLanguage();

  const industriesList = [
    { title: t("ind.privateEquity"), desc: t("ind.privateEquity.desc"), href: "/industries/private-equity" },
    { title: t("ind.financialServices"), desc: t("ind.financialServices.desc"), href: "/industries/financial-services" },
    { title: t("ind.industrialEnergy"), desc: t("ind.industrialEnergy.desc"), href: "/industries/industrial-energy" },
    { title: t("ind.mobility"), desc: t("ind.mobility.desc"), href: "/industries/mobility" },
    { title: t("ind.technology"), desc: t("ind.technology.desc"), href: "/industries/technology" },
    { title: t("ind.communications"), desc: t("ind.communications.desc"), href: "/industries/communications-network" },
    { title: t("ind.healthcare"), desc: t("ind.healthcare.desc"), href: "/industries/healthcare-life-sciences" },
    { title: t("ind.media"), desc: t("ind.media.desc"), href: "/industries/media-entertainment" },
    { title: t("ind.retail"), desc: t("ind.retail.desc"), href: "/industries/retail-consumer" },
    { title: t("ind.aerospace"), desc: t("ind.aerospace.desc"), href: "/industries/aerospace-defense" },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-[#181a24] flex flex-col font-sans">
      <Navbar variant="floating" activePath="/industries" />

      <main className="flex-1 max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0066ff] bg-[#0066ff]/10 px-3 py-1 rounded-full">
            {t("nav.industries")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#181a24] mt-4 tracking-tight">
            Industry Domain Expertise
          </h1>
          <p className="text-[#484f6b] text-lg mt-3">
            Domain-focused digital engineering tailored to the stringent regulatory and architectural needs of global sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {industriesList.map((ind) => (
            <Link
              key={ind.title}
              href={ind.href}
              className="group p-6 rounded-2xl bg-white border border-[#e5e7eb] hover:border-[#0066ff]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold text-[#181a24] group-hover:text-[#0066ff] transition-colors">
                  {ind.title}
                </h2>
                <p className="text-[#484f6b] text-sm mt-2 leading-relaxed">
                  {ind.desc}
                </p>
              </div>
              <div className="mt-4 flex items-center text-sm font-semibold text-[#0066ff] group-hover:translate-x-1 transition-transform">
                <span>View sector solutions</span>
                <span className="ml-1.5">→</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
