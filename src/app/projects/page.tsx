"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Innovations } from "@/components/Innovations";
import { Footer } from "@/components/Footer";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#fcfdfe] text-[#181a24] flex flex-col font-sans selection:bg-[#0066ff]/20 selection:text-[#0066ff]">
      {/* Floating Navbar */}
      <Navbar variant="floating" activePath="/projects" />

      <main className="flex-1 pt-6">
        {/* ========================================================================= */}
        {/* INNOVATIVE PROJECTS DELIVERING HIGH-SPEED INTELLIGENCE */}
        {/* ========================================================================= */}
        <Innovations />
      </main>

      {/* Common Unified Footer Component */}
      <Footer />
    </div>
  );
}
