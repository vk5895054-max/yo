"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EngLife3DVisual } from "@/components/EngLife3DVisual";

export default function EngineeringLifePage() {
  const [activeTab, setActiveTab] = useState<"all" | "games" | "parties" | "hackathons">("all");

  const stories = [
    {
      id: "chair-racing",
      category: "games",
      badge: "🏎️ FRIDAY HALLWAY GRAND PRIX",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
      title: "The Office Chair Grand Prix: Red Tape Finishes & Studio Cheers",
      location: "Vexus Studio Hallway",
      timing: "Sprint Completion Friday • 4:30 PM",
      image: "/englife/office-chair-race.jpg",
      quote:
        "Nothing builds authentic team spirit like an impromptu hallway office chair race! Watching Shubham Joshi and Kamal steering at top speed while the whole studio cheered and snapped photos on phones—that's the real heartbeat of Vexus.",
      author: "Chirag Sir",
      authorRole: "Engineering Director & Pod Mentor",
      authorAvatar: "/team/marcus-vance.jpg",
      highlights: [
        "Custom red-ribbon finish line and studio hallway racing heats",
        "Chirag Sir flagging the sprint start with Shubham and Kamal competing",
        "Zero corporate stiffness—celebrating sprint velocity with pure laughter",
      ],
    },
    {
      id: "team-celebration",
      category: "parties",
      badge: "🙌 UNFILTERED TEAM CELEBRATION",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      title: "Big Cheers, Clapping Hands & Unstoppable Joy",
      location: "Main Engineering Floor",
      timing: "Production Cutover Milestone",
      image: "/englife/team-cheer-celebration.jpg",
      quote:
        "When we founded Vexus, I promised our engineers would never feel like cogs in a corporate machine. Seeing Chirag Sir, Shubham Joshi, Kamal, and the whole pod laughing and clapping after a flawless production release is why we do this.",
      author: "Shiv Pahwa",
      authorRole: "Founder & CEO // Chief Architect",
      authorAvatar: "/team/shiv-pahwa.jpg",
      highlights: [
        "Whole team cheering with hands in the air as major client platforms deploy",
        "Applauding individual breakthroughs, bug fixes, and late-night heroics",
        "Psychological safety, mutual respect, and genuine lifelong friendships",
      ],
    },
    {
      id: "games-night",
      category: "games",
      badge: "🎮 FRIDAY MARIO KART & BOARD GAMES",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      title: "Couch Controller Wars, King of Tokyo & Unstoppable Laughs",
      location: "Vexus Studio Lounge",
      timing: "Every Friday 4 PM • Drop All Code",
      image: "/englife/games-night.jpg",
      quote:
        "At 4 PM on Fridays, Chirag Sir calls the tournament start. Between Mario Kart rivalries, King of Tokyo dice rolls with Kamal, and endless popcorn, it's the absolute best way to end the week. Shiv Pahwa and the leadership team are always right there competing.",
      author: "Shubham Joshi",
      authorRole: "Senior Full-Stack & Pod Lead",
      authorAvatar: "/team/arjun-mehta.jpg",
      highlights: [
        "Mario Kart 8, Super Smash Bros & King of Tokyo tournament brackets",
        "Big bowls of buttery popcorn, sodas, and zero work talk permitted",
        "Custom 3D-printed championship trophy passed around weekly",
      ],
    },
    {
      id: "midnight-hackathon",
      category: "hackathons",
      badge: "⚡ 48-HOUR SHIP SPRINT",
      badgeColor: "bg-blue-50 text-[#0066ff] border-blue-200",
      title: "Neon Lights, Midnight Pizza & Production High-Fives",
      location: "Vexus Studio & Remote Hubs",
      timing: "Quarterly Hackathon • 48 Hours",
      image: "/englife/hackathon-night.jpg",
      quote:
        "At 2 AM when the entire studio is blasting synthwave, pizza boxes are stacked high, and our autonomous agent makes its first multi-tool call—that feeling is pure magic.",
      author: "Elena Rostova",
      authorRole: "Lead AI Systems Engineer",
      authorAvatar: "/team/elena-rostova.jpg",
      highlights: [
        "$15,000 in custom hardware awards and instant production deployment",
        "Unlimited gourmet catering, craft energy drinks, and midnight snacks",
        "Pods demo live to Shiv Pahwa and founders with zero red tape",
      ],
    },
  ];

  const filteredStories =
    activeTab === "all"
      ? stories
      : stories.filter((s) => s.category === activeTab);

  const culturePillars = [
    {
      icon: "✈️",
      title: "3+ Paid Annual Trips & Offsites",
      desc: "Every year we take the entire team to unforgettable destinations—mountains, beaches, and vibrant tech cities. 100% flights, luxury stays, food, and activities covered.",
    },
    {
      icon: "🖥️",
      title: "$4,200 Workstation Grant",
      desc: "Top-tier hardware: Apple M3/M4 Max MacBooks, Herman Miller ergonomic chairs, dual 4K monitors, and custom mechanical keyboards of your choice.",
    },
    {
      icon: "⚡",
      title: "Zero Bureaucracy & Maker Time",
      desc: "No standups that could have been a message. Every engineer gets a dedicated 4-hour uninterrupted deep work block every single day.",
    },
    {
      icon: "🏖️",
      title: "Work From Anywhere Worldwide",
      desc: "True remote-first autonomy. Work from our studios, your home, or a seaside café in Europe or Asia with guaranteed async flexibility.",
    },
    {
      icon: "📚",
      title: "$3,000 Continuous Learning",
      desc: "Generous yearly stipend for tech conferences (React Summit, NeurIPS, AWS re:Invent), books, courses, and certifications with zero red tape.",
    },
    {
      icon: "🍕",
      title: "Friday Demos & Community Fun",
      desc: "Every Friday at 4 PM we drop code, play multiplayer games, share wild side projects, and kick off the weekend with food and drinks.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-[#181a24] flex flex-col font-sans selection:bg-[#0066ff]/20 selection:text-[#0066ff]">
      <Navbar variant="floating" activePath="/englife" />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* HERO SECTION                                                              */}
        {/* ========================================================================= */}
        <section className="w-full border-b border-[#e5e7eb] bg-gradient-to-b from-[#f8f9fc] via-white to-[#fcfdfe] pt-12 pb-16 lg:pt-18 lg:pb-24 relative overflow-hidden">
          <div
            className="absolute top-10 right-1/4 w-[550px] h-[550px] bg-[#0066ff]/10 rounded-full blur-[140px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-5 left-10 w-[400px] h-[400px] bg-teal-500/6 rounded-full blur-[110px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
              <Link href="/" className="hover:text-slate-700 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/careers" className="hover:text-slate-700 transition-colors">
                Careers
              </Link>
              <span>/</span>
              <span className="text-[#0066ff] font-semibold">Engineering Life</span>
            </div>

            {/* 2-Column Hero Layout with 3D Interactive Model Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Hero Content */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold text-[#0066ff] uppercase tracking-wider mb-5">
                  <span className="w-2 h-2 rounded-full bg-[#0066ff] animate-pulse" />
                  <span>LIFE AT VEXUS LABS</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-[-0.03em] text-[#181a24] leading-[1.14]">
                  Build Great Software.{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066ff] via-[#38bdf8] to-teal-600">
                    Travel Far. Enjoy Every Day.
                  </span>
                </h1>

                <p className="mt-5 text-base sm:text-lg text-[#484f6b] leading-relaxed max-w-2xl">
                  Engineering shouldn&apos;t feel like an endless series of sterile meetings. At Vexus Labs, we unite world-class technical craft with genuine human camaraderie—from mountain retreats and coastal workations to midnight hackathons and rooftop celebrations.
                </p>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/careers"
                    className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#0066ff] hover:bg-[#0052cc] shadow-md shadow-blue-500/20 hover:shadow-lg transition-all duration-200 hover:scale-102 active:scale-98 cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Explore Open Engineering Roles</span>
                    <span>⚡</span>
                  </Link>

                  <a
                    href="#stories"
                    className="px-6 py-3.5 rounded-xl text-sm font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>See Trips &amp; Stories</span>
                    <span>↓</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Unique 3D Gyroscope & Holographic Tech Visual */}
              <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex items-center justify-center">
                <EngLife3DVisual />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STORIES & PHOTO HIGHLIGHTS SECTION                                        */}
        {/* ========================================================================= */}
        <section id="stories" className="w-full py-16 sm:py-20 bg-white border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            {/* Section Header with Category Tabs */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0066ff] mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0066ff] animate-pulse" />
                  <span>✦ REAL EXPERIENCES &amp; PHOTO LOGS</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#181a24] tracking-tight">
                  Unforgettable Moments From the Road
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Candid snapshots of our hallway grand prix, hackathons, and celebrations.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200 text-xs shadow-inner">
                {[
                  { key: "all", label: "All Moments" },
                  { key: "games", label: "🏎️ Chair Race & Games" },
                  { key: "parties", label: "🙌 Victory Celebrations" },
                  { key: "hackathons", label: "⚡ 48H Hackathons" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 cursor-pointer ${
                      activeTab === tab.key
                        ? "bg-white text-slate-900 shadow-md scale-102 border border-slate-200/80"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stories Grid */}
            <div className="space-y-12">
              {filteredStories.map((story, index) => (
                <div
                  key={`${activeTab}-${story.id}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                  className={`group rounded-3xl bg-[#f8f9fc]/90 border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-0 transform hover:-translate-y-1.5 animate-card-enter animate-shimmer-hover ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image Column */}
                  <div
                    className={`relative min-h-[320px] sm:min-h-[400px] lg:min-h-full lg:col-span-6 overflow-hidden bg-slate-200 ${
                      index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent group-hover:opacity-90 transition-opacity duration-300" />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-black/60 text-white backdrop-blur-md border border-white/20 group-hover:bg-[#0066ff]/80 group-hover:border-[#0066ff] transition-colors duration-300">
                        {story.location}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                        {story.timing}
                      </span>
                      <span className="text-sky-300 font-bold text-[11px] animate-pulse">
                        ● VERIFIED MEMORY
                      </span>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div
                    className={`p-6 sm:p-8 lg:p-10 lg:col-span-6 flex flex-col justify-between space-y-6 ${
                      index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="space-y-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider border transition-colors ${story.badgeColor}`}
                      >
                        {story.badge}
                      </span>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#181a24] leading-snug group-hover:text-[#0066ff] transition-colors duration-300">
                        {story.title}
                      </h3>

                      {/* Quote Callout */}
                      <blockquote className="p-4 rounded-2xl bg-white border border-slate-200/90 text-xs sm:text-sm text-slate-700 italic leading-relaxed border-l-4 border-l-[#0066ff] shadow-xs group-hover:border-l-[#0052cc] transition-all">
                        &ldquo;{story.quote}&rdquo;
                      </blockquote>

                      {/* Author row */}
                      <div className="flex items-center gap-3 pt-1">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 ring-2 ring-[#0066ff]/20">
                          <Image
                            src={story.authorAvatar}
                            alt={story.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-[#0066ff] transition-colors">
                            {story.author}
                          </div>
                          <div className="text-[11px] font-mono text-slate-500">
                            {story.authorRole}
                          </div>
                        </div>
                      </div>

                      {/* Bullet Highlights */}
                      <ul className="space-y-2 pt-2 text-xs text-[#484f6b]">
                        {story.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#0066ff] font-bold">✓</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">
                        Verified Vexus Team Memory
                      </span>
                      <Link
                        href="/careers"
                        className="text-xs font-bold text-[#0066ff] hover:text-[#0052cc] transition-colors inline-flex items-center gap-1 group-hover:translate-x-1 duration-200"
                      >
                        <span>Join This Crew</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* THE HUMAN TOUCH: SILLINESS, GAMES & REAL CAMARADERIE                      */}
        {/* ========================================================================= */}
        <section className="w-full py-16 sm:py-20 bg-gradient-to-b from-white via-blue-50/25 to-white border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-xs font-mono font-bold uppercase tracking-wider text-[#0066ff] mb-2 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#0066ff] animate-pulse" />
                <span>✦ REAL HUMANS, NOT CORPORATE ROBOTS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#181a24] tracking-tight">
                The Human Touch: Fun, Games, Parties &amp; Real Laughter
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#484f6b] leading-relaxed">
                Writing production code is intense. That&apos;s why we deliberately cultivate an environment overflowing with laughter, healthy rivalries, inside jokes, and spontaneous celebrations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="group p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all duration-300 transform hover:-translate-y-1.5 space-y-3">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">🎮</div>
                <h3 className="text-lg font-bold text-[#181a24] group-hover:text-indigo-600 transition-colors">4 PM Friday Mario Kart &amp; Board Games</h3>
                <p className="text-xs text-[#484f6b] leading-relaxed">
                  Every Friday at 4 PM, IDEs shut down. The big screen boots up Mario Kart 8 and Smash Bros, while tables fill up with King of Tokyo, Catan, and bowls of warm popcorn.
                </p>
                <div className="text-[11px] font-mono text-indigo-600 font-bold pt-1 flex items-center gap-1">
                  <span>✦</span> <span>Fierce Blue Shell Rivalries</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-rose-300 transition-all duration-300 transform hover:-translate-y-1.5 space-y-3">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">🎸</div>
                <h3 className="text-lg font-bold text-[#181a24] group-hover:text-rose-600 transition-colors">Rooftop BBQ &amp; Acoustic Jams</h3>
                <p className="text-xs text-[#484f6b] leading-relaxed">
                  Charcoal grill skewers, cold local beers, and acoustic guitars on the terrace at sunset. Nothing connects people faster than singing along terribly to 90s rock while the city skyline glitters.
                </p>
                <div className="text-[11px] font-mono text-rose-600 font-bold pt-1 flex items-center gap-1">
                  <span>✦</span> <span>Music &amp; Sizzling Cookouts</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-amber-300 transition-all duration-300 transform hover:-translate-y-1.5 space-y-3">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">🏆</div>
                <h3 className="text-lg font-bold text-[#181a24] group-hover:text-amber-600 transition-colors">The "Golden Rubber Duck" Award</h3>
                <p className="text-xs text-[#484f6b] leading-relaxed">
                  Introduced the most creatively absurd non-critical bug this month? You win the Golden Duck! We laugh together, learn together, and actively celebrate psychological safety over finger-pointing.
                </p>
                <div className="text-[11px] font-mono text-amber-600 font-bold pt-1 flex items-center gap-1">
                  <span>✦</span> <span>Zero-Blame Culture</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="group p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 transform hover:-translate-y-1.5 space-y-3">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">🐶</div>
                <h3 className="text-lg font-bold text-[#181a24] group-hover:text-emerald-600 transition-colors">Chief Happiness Officers (Pets)</h3>
                <p className="text-xs text-[#484f6b] leading-relaxed">
                  Studio golden retrievers sleeping under standing desks and remote cats stepping across keycaps during standup calls are treated as senior technical advisors. Pet cameos are mandatory.
                </p>
                <div className="text-[11px] font-mono text-emerald-600 font-bold pt-1 flex items-center gap-1">
                  <span>✦</span> <span>Four-Legged Teammates</span>
                </div>
              </div>

              {/* Card 5 */}
              <div className="group p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1.5 space-y-3">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">🌮</div>
                <h3 className="text-lg font-bold text-[#181a24] group-hover:text-[#0066ff] transition-colors">1 AM Street Food Runs</h3>
                <p className="text-xs text-[#484f6b] leading-relaxed">
                  When a tough race-condition finally surrenders at midnight, someone posts "taco run?" on Slack. Ten minutes later, half the pod is outside enjoying street food under street lamps.
                </p>
                <div className="text-[11px] font-mono text-blue-600 font-bold pt-1 flex items-center gap-1">
                  <span>✦</span> <span>Late-Night Bonding</span>
                </div>
              </div>

              {/* Card 6 */}
              <div className="group p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-1.5 space-y-3">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">🎂</div>
                <h3 className="text-lg font-bold text-[#181a24] group-hover:text-purple-600 transition-colors">Custom Birthday Memes &amp; Treats</h3>
                <p className="text-xs text-[#484f6b] leading-relaxed">
                  Zero boring corporate cards. Every teammate gets personalized meme art created by our design pod, their favorite cake or treat delivered to their door globally, and a whole lot of love.
                </p>
                <div className="text-[11px] font-mono text-purple-600 font-bold pt-1 flex items-center gap-1">
                  <span>✦</span> <span>Genuine Appreciation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CULTURE PILLARS GRID                                                      */}
        {/* ========================================================================= */}
        <section className="w-full py-16 sm:py-20 bg-[#f8f9fc] border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="max-w-3xl mb-12">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0066ff] mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0066ff] animate-pulse" />
                <span>✦ WHAT WE BELIEVE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#181a24] tracking-tight">
                Engineering Benefits That Actually Matter
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#484f6b] leading-relaxed">
                We skipped ping-pong tables and corporate jargon. Instead, we invest directly in your autonomy, travel adventures, top-market pay, and mental clarity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {culturePillars.map((p, idx) => (
                <div
                  key={idx}
                  style={{ animationDelay: `${idx * 100}ms` }}
                  className="group p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#0066ff]/40 transition-all duration-300 transform hover:-translate-y-1.5 space-y-3"
                >
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">{p.icon}</div>
                  <h3 className="text-lg font-bold text-[#181a24] group-hover:text-[#0066ff] transition-colors">{p.title}</h3>
                  <p className="text-xs text-[#484f6b] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* A DAY IN THE LIFE OF A VEXUS ENGINEER                                     */}
        {/* ========================================================================= */}
        <section className="w-full py-16 sm:py-20 bg-white border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="max-w-3xl mb-12">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0066ff] mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0066ff] animate-pulse" />
                <span>✦ 24-HOUR RHYTHM</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#181a24] tracking-tight">
                A Day in the Life of a Vexus Engineer
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#484f6b]">
                Here is what normal days look like when useless meetings are banned.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="group p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-xs font-mono font-bold text-[#0066ff] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0066ff] animate-pulse" />
                  <span>09:30 AM</span>
                </div>
                <h4 className="font-bold text-slate-900 mt-1.5 group-hover:text-[#0066ff] transition-colors">Deep Maker Block</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  No meetings permitted. Fresh coffee, noise-canceling headphones, and uninterrupted deep technical focus on core architecture.
                </p>
              </div>

              <div className="group p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-xs font-mono font-bold text-blue-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span>01:30 PM</span>
                </div>
                <h4 className="font-bold text-slate-900 mt-1.5 group-hover:text-blue-600 transition-colors">Async Pod Sync</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  A tight 15-minute sync or Slack thread to clear road blocks, review PRs, and align on daily release targets.
                </p>
              </div>

              <div className="group p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>03:30 PM</span>
                </div>
                <h4 className="font-bold text-slate-900 mt-1.5 group-hover:text-emerald-600 transition-colors">Pairing &amp; Review</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Collaborative whiteboarding on system edge cases, pairing with principal architects, and optimizing performance.
                </p>
              </div>

              <div className="group p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-xs font-mono font-bold text-purple-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  <span>06:00 PM</span>
                </div>
                <h4 className="font-bold text-slate-900 mt-1.5 group-hover:text-purple-600 transition-colors">Sign Off &amp; Recharge</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Laptops closed. Gym, evening run, dinner with family, or studio video game lounge. We fiercely protect work-life balance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CLOSING CALL TO ACTION                                                    */}
        {/* ========================================================================= */}
        <section className="w-full py-20 bg-gradient-to-b from-[#0d1117] to-[#161b22] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066ff]/20 blur-[130px] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0066ff]/15 border border-[#0066ff]/30 text-xs font-mono font-bold text-[#0066ff] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#0066ff] animate-pulse" />
              <span>JOIN THE NEXT RETREAT</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to Ship Great Code and Travel the World?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              We are actively hiring across Frontend, AI/Data, Cloud/DevOps, and Mobile engineering. Our 7-Day Assessment SLA guarantees you speak directly to senior engineers with zero algorithmic trivia.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/careers"
                className="px-8 py-4 rounded-xl font-bold text-sm bg-[#0066ff] hover:bg-[#0052cc] text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-103 active:scale-97 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Browse All Open Roles (12 Positions)</span>
                <span>→</span>
              </Link>

              <Link
                href="/about-us"
                className="px-8 py-4 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
              >
                Learn About Vexus Team
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
