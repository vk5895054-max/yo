"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function RetailConsumerPage() {
  const [activeSolutionIndex, setActiveSolutionIndex] = useState(0);

  const whoWeHelp = [
    {
      title: "Retail",
      desc: "Reimagine how consumers discover, shop, and purchase with cutting-edge digital technologies and omnichannel accelerators.",
    },
    {
      title: "Consumer Goods",
      desc: "Empower your CPG brand with advanced technologies to drive innovation, operational efficiency, and future-ready customer experiences.",
    },
    {
      title: "Quick Service Restaurants",
      desc: "Deliver hyper-personalized ordering experiences, innovative digital touchpoints, and memorable customer interactions across QSR locations at scale.",
    },
    {
      title: "Consumer Analytics",
      desc: "Transform decision-making with advanced retail and consumer analytics, leveraging big data and AI/ML technologies for actionable insights.",
    },
  ];

  const whatWeOffer = [
    {
      id: "omnichannel",
      title: "Omnichannel Adoption",
      desc: "Deliver seamless, personalized omnichannel experiences by integrating strategic planning, advanced technology, and data-driven solutions.",
    },
    {
      id: "loyalty",
      title: "Loyalty and Personalization",
      desc: "Advanced analytics algorithms and solutions drive actionable insights into customer behavior for enhanced personalization and loyalty.",
    },
    {
      id: "supply-chain",
      title: "In-Store & Supply Chain Transformation",
      desc: "In-store transformation and supply chain optimization powered by IoT enablement, real-time analytics, robotics, and warehouse automation.",
    },
  ];

  const caseStudies = [
    {
      client: "Global Enterprise Retailer",
      title: "Headless Commerce & Omnichannel Engine",
      desc: "Delivered seamless shopping experiences integrating web, mobile app, and in-store POS systems.",
      image: "/hero-startup.jpg",
    },
    {
      client: "CPG Brand Leader",
      title: "Consumer Analytics & AI Insights",
      desc: "Transformed decision-making with big data analytics driving 22% lift in customer loyalty.",
      image: "/products-engineering.png",
    },
    {
      client: "QSR Chain",
      title: "Hyper-Personalized Mobile Ordering",
      desc: "Built high-scale mobile ordering platform serving 5,000+ restaurant locations.",
      image: "/about/team-collaboration.jpg",
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
              <span className="text-[#181a24] font-bold">Retail &amp; Consumer</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0066ff] bg-[#0066ff]/10 px-3 py-1 rounded-full border border-[#0066ff]/20 mb-4">
                  RETAIL &amp; CONSUMER GOODS
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#181a24] tracking-tight leading-[1.08] mb-6">
                  Retail &amp; Consumer
                </h1>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0066ff] mb-4">
                  Engineering impact for the retail and consumer goods industry
                </h2>
                <p className="text-[#484f6b] text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                  Harness cutting-edge digital platforms to deliver seamless transactions, personalized marketing, and efficient operations — building world-class customer experiences that drive growth and loyalty.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Start a retail consultation →
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
                    src="/retail.png"
                    alt="Retail & Consumer Engineering"
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

        {/* WHO WE HELP SECTION */}
        <section className="py-20 lg:py-28 bg-white border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#484f6b]">
                Who we help
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] mt-2 tracking-tight">
                Elevate customer experiences with smart solutions
              </h2>
              <p className="mt-4 text-[#484f6b] text-base sm:text-lg max-w-3xl leading-relaxed">
                We partner with retail and consumer goods companies to create world-class customer experiences, unlock new revenue, and redefine industry standards with disruptive digital solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whoWeHelp.map((item) => (
                <div
                  key={item.title}
                  className="group p-8 rounded-3xl bg-[#f8f9fb] border border-[#e5e7eb] hover:bg-white hover:border-[#0066ff]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-bold text-[#181a24] group-hover:text-[#0066ff] transition-colors mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#484f6b] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                <Image
                  src="/retail1.png"
                  alt="Retail & Consumer E-Commerce Acceleration"
                  width={800}
                  height={600}
                  className="w-full h-[380px] sm:h-[440px] object-cover"
                />
              </div>
              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#181a24]">
                  Transforming modern shopping touchpoints
                </h3>
                <p className="text-[#484f6b] text-base leading-relaxed">
                  From intelligent supply chain automation to AI-driven customer personalization, Vexus Lab delivers digital accelerators that empower retail brands and consumer goods leaders to thrive in the modern omnichannel ecosystem.
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 font-bold text-[#0066ff] hover:text-[#0052cc]"
                  >
                    <span>Consult our retail engineering team</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE OFFER SECTION */}
        <section className="py-20 lg:py-28 bg-[#f8f9fb] border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#484f6b]">
                What we offer
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] mt-2 tracking-tight">
                Unleash potential with intelligent digital &amp; cloud solutions
              </h2>
              <p className="mt-4 text-[#484f6b] text-base sm:text-lg max-w-3xl leading-relaxed">
                Empower your retail and CPG business with digital engineering, AI-driven analytics, cloud deployment, and growth accelerators for seamless, personalized customer experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whatWeOffer.map((item, idx) => {
                const isActive = idx === activeSolutionIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveSolutionIndex(idx)}
                    className={`group cursor-pointer rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between border ${
                      isActive
                        ? "bg-[#e8ebf0] border-[#c0c7d4] shadow-md"
                        : "bg-white border-[#e5e7eb] hover:bg-[#f1f3f7] hover:border-[#cbd5e1] hover:shadow-md"
                    }`}
                  >
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-[#181a24] group-hover:text-[#0066ff] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#484f6b]">
                        {item.desc}
                      </p>
                    </div>
                    <div className="mt-6">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#0066ff] hover:text-[#0052cc]"
                      >
                        Learn more →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CASE STUDIES SECTION */}
        <section className="py-20 lg:py-28 bg-white">
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
