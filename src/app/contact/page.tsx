"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fcfdfe] relative text-[#181a24] flex flex-col font-sans selection:bg-[#0066ff]/20 selection:text-[#0066ff] overflow-x-clip">
      {/* Ambient primary color warm glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-[#0066ff]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Floating Navbar */}
      <Navbar variant="floating" activePath="/contact" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex flex-col items-center justify-center">
        {/* Breadcrumb Navigation */}
        <div className="w-full max-w-5xl mb-3 sm:mb-4 px-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#64748b]">
            <Link href="/" className="hover:text-[#0066ff] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#181a24] font-bold">Contact</span>
          </nav>
        </div>

        {/* Unified 2-Column Contact Card */}
        <ContactForm />
      </main>

      {/* Common Unified Footer */}
      <Footer />
    </div>
  );
}
