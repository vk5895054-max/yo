"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function VelocityAiPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const capabilities = [
    {
      title: "GenAI",
      desc: "Identify viable use cases, fine-tune generative AI models, and develop production-level applications that make real-life business impact. Use our suite of accelerators for faster implementation of enterprise-grade AI solutions.",
      href: "/services/generative-ai",
    },
    {
      title: "Data Engineering",
      desc: "Connect data across your enterprise to enable better intelligence. Vexus Lab offers proven experience architecting and engineering data platforms at enterprise scale—while staying at the forefront of innovative approaches and technologies.",
      href: "/services/data-ai",
    },
    {
      title: "Analytics",
      desc: "Transform raw data into actionable insights to improve short-term decision-making and long-term strategic planning. Drive intelligence with a full range of analytics: descriptive, diagnostic, predictive, prescriptive, and generative.",
      href: "/services/data-ai",
    },
    {
      title: "Content Engineering",
      desc: "Some of the world's largest and most innovative organizations count on us for model alignment. Tap into our proven human-in-the-loop processes to support deployment of LLMs and LLM-powered applications within your organization.",
      href: "/services/generative-ai",
    },
    {
      title: "MLOps",
      desc: "Blending deep industry and technical experience, our team helps organizations establish and maintain clear processes for leveraging AI/ML solutions. We are platform agnostic and have a track record delivering multiple use cases.",
      href: "/services/cloud-devops",
    },
    {
      title: "Cybersecurity",
      desc: "Vexus Lab has a dedicated practice with experience and expertise in cybersecurity and cryptography. We harness these strengths as we deliver all Intelligence Engineering capabilities—including deploying security for AI and AI for security.",
      href: "/services/cybersecurity",
    },
  ];

  const caseStudies = [
    {
      title: "AI-powered Fleet Management Transformation",
      desc: "Leveraging telemetry data and computer vision models to optimize routing, driver safety, and fuel efficiency at global scale.",
      image: "/projects/city-pulse.jpg",
    },
    {
      title: "Automating Internal Search with LLMs",
      desc: "Deployed enterprise RAG architecture across millions of unstructured documents, reducing search time by 75%.",
      image: "/projects/sovereign-asset.png",
    },
    {
      title: "Enhancing Financial Data Accuracy with Predictive Models",
      desc: "Built automated ML validation pipelines ensuring sub-millisecond fraud detection and regulatory compliance.",
      image: "/products-engineering.png",
    },
  ];

  const whyUsPillars = [
    {
      title: "Designed for Desirability",
      desc: "We help you imagine and define possible applications of AI capabilities, with a focus on ultimate business value.",
    },
    {
      title: "Engineered for Excellence",
      desc: "From chip to cloud, our tech skills enable us to build fully featured AI solutions.",
    },
    {
      title: "Curated for Intelligence",
      desc: "Augment the power of automation with a human touch for the curation of content to create safety guardrails for AI.",
    },
  ];

  const faqs = [
    {
      question: "What capabilities are included in Intelligence Engineering from Vexus Lab?",
      answer:
        "Vexus Lab Intelligence Engineering encompasses GenAI model fine-tuning, enterprise data platform engineering, predictive analytics, human-in-the-loop content curation, platform-agnostic MLOps, and zero-trust AI security guardrails.",
    },
    {
      question: "What are some of the most sought-after use cases for AI and GenAI?",
      answer:
        "Common high-impact use cases include enterprise RAG knowledge search, automated customer copilots, predictive maintenance, automated document processing, agentic workflow automation, and synthetic data generation.",
    },
    {
      question: "Are Intelligence Engineering capabilities available as standalone services or as part of larger digital engineering engagements?",
      answer:
        "They are fully flexible. You can leverage Vexus VelocityAI as modular standalone accelerators or integrate them directly into larger end-to-end digital transformation programs.",
    },
    {
      question: "What are the technology solutions that Vexus Lab delivers as part of Intelligence Engineering?",
      answer:
        "We deliver production RAG pipelines, fine-tuned open-source and proprietary LLMs, high-performance vector databases (Pinecone, Qdrant, Milvus), MLOps orchestration (Kubeflow, MLflow), and zero-trust telemetry guardrails.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-[#181a24] flex flex-col font-sans selection:bg-[#0066ff]/20 selection:text-[#0066ff]">
      {/* Dynamic Navigation */}
      <Navbar variant="floating" activePath="/velocity-ai" />

      <main className="flex-1 w-full">
        {/* ========================================================================= */}
        {/* HERO SECTION (Screenshot 1) */}
        {/* ========================================================================= */}
        <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#e5e7eb] bg-gradient-to-b from-[#fcfdfe] via-[#f8f9fc] to-[#f2f3f6]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-[#484f6b] mb-8 font-medium">
              <Link href="/services" className="hover:text-[#0066ff] transition-colors">Services</Link>
              <span className="text-slate-400">›</span>
              <span className="text-[#181a24] font-bold">Intelligence Engineering</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0066ff] bg-[#0066ff]/10 px-3 py-1 rounded-full border border-[#0066ff]/20 mb-4">
                  VEXUS VELOCITYAI ACCELERATOR
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#181a24] tracking-tight leading-[1.08] mb-6">
                  Intelligence Engineering
                </h1>
                <p className="text-[#484f6b] text-lg sm:text-xl leading-relaxed max-w-2xl font-normal">
                  Leverage AI to monetize data across products, services, and operations.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Start an AI consultation →
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white border border-[#e5e7eb] hover:bg-[#f2f3f6] text-[#181a24] font-bold text-sm transition-all duration-200 shadow-xs"
                  >
                    Explore case studies
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Showcase */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/60 bg-slate-100 group">
                  <Image
                    src="/about/team-collaboration.jpg"
                    alt="Intelligence Engineering Collaboration"
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

        {/* ========================================================================= */}
        {/* "HOW WE HELP" SECTION (Screenshot 2) */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 bg-white border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Image */}
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                  <Image
                    src="/about/about-hero-team.jpg"
                    alt="AI Strategy and Prototype Session"
                    width={800}
                    height={700}
                    className="w-full h-[400px] sm:h-[480px] object-cover"
                  />
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#484f6b] mb-3">
                  How we help
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] tracking-tight leading-tight">
                  Supporting AI implementations from strategy to prototype to production
                </h2>
                <p className="mt-5 text-[#484f6b] text-base sm:text-lg leading-relaxed font-normal">
                  Vexus Lab can support you at any stage of your journey—whether you need help setting your AI strategy and building your implementation roadmap, or you&apos;re ready to use rapid prototyping to validate specific use cases and functional proofs of concept to test technical viability. We also offer a full range of engineering capabilities for developing pilot applications and full-scale, production-level systems.
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

        {/* ========================================================================= */}
        {/* "OUR CAPABILITIES" SECTION (Screenshot 3 - Single Row Horizontal Carousel) */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 bg-[#f8f9fb] border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div className="max-w-2xl">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#484f6b]">
                  Our capabilities
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] mt-2 tracking-tight">
                  Engineered for intelligence
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const el = document.getElementById("capabilities-carousel");
                    if (el) el.scrollBy({ left: -360, behavior: "smooth" });
                  }}
                  aria-label="Scroll left"
                  className="w-11 h-11 rounded-full bg-white border border-[#e5e7eb] hover:bg-[#f1f3f7] hover:border-[#0066ff] text-[#181a24] hover:text-[#0066ff] font-bold text-lg shadow-xs transition-all flex items-center justify-center cursor-pointer"
                >
                  ←
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById("capabilities-carousel");
                    if (el) el.scrollBy({ left: 360, behavior: "smooth" });
                  }}
                  aria-label="Scroll right"
                  className="w-11 h-11 rounded-full bg-white border border-[#e5e7eb] hover:bg-[#f1f3f7] hover:border-[#0066ff] text-[#181a24] hover:text-[#0066ff] font-bold text-lg shadow-xs transition-all flex items-center justify-center cursor-pointer"
                >
                  →
                </button>
              </div>
            </div>

            {/* Single Row Horizontally Scrollable Cards Container */}
            <div
              id="capabilities-carousel"
              className="flex overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {capabilities.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-3xl p-8 bg-white border border-[#e5e7eb] hover:bg-[#f1f3f7] hover:border-[#cbd5e1] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-w-[300px] sm:min-w-[360px] max-w-[380px] shrink-0 snap-start"
                >
                  <div className="transition-transform duration-300 group-hover:translate-x-1.5">
                    <h3 className="text-2xl font-bold mb-3 text-[#181a24] group-hover:text-[#0066ff] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#484f6b] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-8">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066ff] group-hover:translate-x-1 transition-transform"
                    >
                      <span>Learn more</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* "CASE STUDIES" SECTION (Screenshot 4) */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 bg-white border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#484f6b]">
                  Our work
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] mt-2 tracking-tight">
                  Case studies
                </h2>
              </div>
              {/* <div className="max-w-md">
                <p className="text-xs sm:text-sm text-[#484f6b] leading-relaxed">
                  We work with the world&apos;s largest and most innovative companies—forging deep collaborations to create intelligent products, platforms, and services.
                </p>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0066ff] hover:text-[#0052cc] mt-2 transition-colors"
                >
                  <span>View all our case studies</span>
                  <span>→</span>
                </Link>
              </div> */}
            </div>

            {/* 3 Case Study Image Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies.map((cs) => (
                <div
                  key={cs.title}
                  className="group rounded-3xl overflow-hidden border border-[#e5e7eb] bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                    <Image
                      src={cs.image}
                      alt={cs.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-xl font-bold leading-snug">{cs.title}</h3>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-[#484f6b] leading-relaxed">
                      {cs.desc}
                    </p>
                    <div className="mt-6 flex items-center text-xs font-bold text-[#0066ff] group-hover:translate-x-1 transition-transform">
                      <span>Read full case study</span>
                      <span className="ml-1">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ISG GENAI RECOGNITION & "WHY VEXUS LAB?" (Screenshot 5 & Prompt Text) */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 bg-[#f8f9fb] border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            {/* ISG Leadership Recognition Banner (Prompt Text) */}
            <div className="mb-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-900 via-[#181a24] to-slate-900 text-white shadow-xl relative overflow-hidden">
              <div className="max-w-3xl relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-mono text-xs font-bold uppercase tracking-wider mb-4 border border-blue-400/30">
                  GENAI INDUSTRY LEADER
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 text-white">
                  Vexus Lab Recognized as an Enterprise Leader in Generative AI Services
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  Leveraging strengths in design, engineering, and data, Vexus VelocityAI helps you transform your business through AI-powered innovation. Develop intelligent products that delight customers and create new revenue streams. Optimize your internal business processes for higher efficiency and agility. Vexus Lab has been recognized as a leader in GenAI &amp; Intelligence Engineering.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-xs transition-colors"
                >
                  <span>Learn more</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Why Vexus Lab? Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Image */}
              <div className="lg:col-span-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] mb-8 tracking-tight">
                  Why Vexus Lab?
                </h2>
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                  <Image
                    src="/hero-engineering.jpg"
                    alt="Engineered for Intelligence dashboard"
                    width={700}
                    height={500}
                    className="w-full h-[360px] sm:h-[420px] object-cover"
                  />
                </div>
              </div>

              {/* Right Pillars List */}
              <div className="lg:col-span-6 flex flex-col justify-center gap-8">
                <p className="text-xs font-mono font-bold text-[#484f6b] uppercase tracking-widest">
                  OUR THREE CORE PRINCIPLES
                </p>

                {whyUsPillars.map((pillar) => (
                  <div key={pillar.title} className="p-6 rounded-2xl bg-white border border-[#e5e7eb] shadow-xs">
                    <h3 className="text-xl font-bold text-[#181a24] mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#484f6b] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ACCORDION FAQS SECTION (Screenshot 5) */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#484f6b] mb-3 block">
              FAQS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] tracking-tight mb-10">
              Your Intelligence Engineering questions, answered
            </h2>

            {/* Accordions */}
            <div className="divide-y divide-[#e5e7eb] border-t border-b border-[#e5e7eb]">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={faq.question} className="py-6">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left flex items-center justify-between gap-4 group"
                    >
                      <span className="text-lg sm:text-xl font-bold text-[#181a24] group-hover:text-[#0066ff] transition-colors leading-snug">
                        {faq.question}
                      </span>
                      <span className="text-2xl font-light text-[#484f6b] group-hover:text-[#0066ff] transition-colors shrink-0">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="mt-4 text-sm text-[#484f6b] leading-relaxed font-normal">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
