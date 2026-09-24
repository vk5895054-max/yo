"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface EngineeringLifeSectionProps {
  source?: "home" | "careers";
  className?: string;
}

export function EngineeringLifeSection({
  source = "home",
  className = "",
}: EngineeringLifeSectionProps) {
  const highlights = [
    {
      id: "chair-racing",
      badge: "🏎️ HALLWAY GRAND PRIX",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200 group-hover:bg-amber-100",
      title: "Office Chair Racing & Studio Cheers",
      description:
        "Chirag Sir flagging the Friday race start as Shubham Joshi and Kamal steer office chairs through the hallway to snap the finish ribbon!",
      image: "/englife/office-chair-race.jpg",
      location: "Studio Hallway",
      duration: "Sprint Completion Friday",
      tag: "Pure Camaraderie",
    },
    {
      id: "team-celebration",
      badge: "🙌 PRODUCTION HIGH-FIVES",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200 group-hover:bg-emerald-100",
      title: "Hands in the Air & Team Cheers",
      description:
        "Shiv Pahwa and the whole engineering pod cheering and clapping after a flawless production release. Genuine joy and zero corporate stiffness.",
      image: "/englife/team-cheer-celebration.jpg",
      location: "Main Engineering Floor",
      duration: "Milestone Release",
      tag: "Unfiltered Happiness",
    },
    {
      id: "games-night",
      badge: "🎮 FRIDAY GAME NIGHTS",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200 group-hover:bg-indigo-100",
      title: "Mario Kart Battles & Popcorn Bowls",
      description:
        "IDEs close at 4 PM! Controller rivalries, King of Tokyo board games, and laughing until your stomach hurts with Shubham, Kamal, and the crew.",
      image: "/englife/games-night.jpg",
      location: "Studio Lounge",
      duration: "Every Friday 4 PM",
      tag: "Fun & Games",
    },
    {
      id: "midnight-hackathon",
      badge: "⚡ 48H SHIP SPRINT",
      badgeColor: "bg-blue-50 text-[#0066ff] border-blue-200 group-hover:bg-blue-100",
      title: "Midnight Pizza & Production High-Fives",
      description:
        "Neon lights, late-night synthwave, and instant deployment. Watch autonomous AI agents make real multi-tool calls live at 2 AM.",
      image: "/englife/hackathon-night.jpg",
      location: "Vexus Studio",
      duration: "48-Hour Ship Sprint",
      tag: "Innovation & Pizzas",
    },
  ];

  return (
    <section
      id="engineering-life"
      className={`w-full py-16 sm:py-20 lg:py-24 border-b border-[#e5e7eb] bg-gradient-to-b from-[#f8f9fc] via-white to-[#f8f9fc] relative overflow-hidden ${className}`}
    >
      {/* Background Decorative Ambient Glows */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#0066ff]/8 rounded-full blur-[140px] pointer-events-none animate-float-gentle"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-0 w-[420px] h-[420px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border-blue-200/80 text-xs font-mono font-bold text-[#0066ff] uppercase tracking-wider mb-3.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#0066ff] animate-pulse" />
              <span>THE HUMAN TOUCH • TRIPS, GAMES &amp; PARTIES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#181a24] tracking-tight leading-[1.18]">
              Engineering Craft Meets{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066ff] via-[#38bdf8] to-teal-600">
                Real Friendship &amp; Play.
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#484f6b] leading-relaxed">
              We work on hard engineering problems, but we never take ourselves too seriously. From Mario Kart rivalries and acoustic rooftop barbecues to mountain retreats and midnight hackathons—this is life at Vexus.
            </p>
          </div>

          {/* Top CTA Link */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/englife"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#0066ff] hover:bg-[#0052cc] text-white shadow-md shadow-blue-500/20 hover:shadow-lg transition-all duration-200 hover:scale-103 active:scale-97 cursor-pointer"
            >
              <span>Explore Full Eng Life &amp; Games</span>
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* 4 Core Highlight Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <div
              key={item.id}
              style={{ animationDelay: `${idx * 120}ms` }}
              className="group rounded-3xl bg-white border border-slate-200/90 hover:border-[#0066ff]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden transform hover:-translate-y-1"
            >
              {/* Photo Banner with Zoom effect */}
              <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[#181a24] group-hover:text-[#0066ff] transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#484f6b] leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Card Footer with Direct Nav link */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/englife"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066ff] hover:text-[#0052cc] transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>View Story &amp; Photos</span>
                    <span>→</span>
                  </Link>

                  <span className="text-[11px] font-mono text-slate-400 group-hover:text-slate-600 transition-colors">
                    Vexus Life
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner: Call to Action */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#0066ff]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#0066ff]/25 transition-all duration-500" />
          <div className="space-y-1 text-center sm:text-left relative z-10">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Want to join our next hackathon or chair race?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              We&apos;re actively hiring senior frontend, AI, cloud, and mobile engineers across global hubs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0 justify-center sm:justify-end relative z-10">
            <Link
              href="/englife"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0066ff] hover:bg-[#0052cc] text-white shadow-md shadow-blue-500/20 transition-all hover:scale-103 active:scale-97 cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>See Full Gallery &amp; Stories</span>
              <span>→</span>
            </Link>

            {source !== "careers" && (
              <Link
                href="/careers"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors cursor-pointer"
              >
                Browse Open Roles
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
