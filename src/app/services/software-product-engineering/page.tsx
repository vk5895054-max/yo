"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function SoftwareProductEngineeringPage() {
  const [activeCapabilityIndex, setActiveCapabilityIndex] = useState(0);

  const approaches = [
    {
      title: "Human-powered distributed product development",
      desc: "Offers reliable development that is ideal for mission-critical or sensitive areas or for enterprises with legal, security, or technical concerns about using AI.",
    },
    {
      title: "AI-enabled product development",
      desc: "Combines human ingenuity with advanced AI tools while leveraging proven methodologies to create innovative, human-centric solutions.",
    },
    {
      title: "AI-native product development",
      desc: "Embraces a transformative, AI-native method that redefines software product development for the future.",
    },
  ];

  const capabilities = [
    {
      id: "product-strategy",
      title: "Product Strategy",
      desc: "Start with a strategy to validate product-market fit, accelerate transformation, and ensure long-term success. We’ll partner to uncover growth opportunities, align products with business goals, and create tailored, user-validated plans.",
    },
    {
      id: "ai-sdlc",
      title: "Vexus Lab AI-Powered SDLC",
      desc: "Reinvent software development with AI-driven precision and productivity, harnessing AI-driven, human-guided approaches to work smarter, get to market faster, and lower costs.",
    },
    {
      id: "ai-architecture",
      title: "AI-Enabled Architecture",
      desc: "Implement platform-centered transformation, legacy transformations, cloud migrations and greenfield solutions faster with AI-based tooling.",
    },
    {
      id: "ai-agile",
      title: "AI-Enabled Agile",
      desc: "Pioneer innovation solutions that shape the future of software development by harnessing our expertise in AI practices and Agile.",
    },
    {
      id: "devops-service",
      title: "DevOps-as-a-Service",
      desc: "Set up ephemeral environments with containerized, cloud-native microservices and generate necessary documentation in record time using AI.",
    },
    {
      id: "velocity-testing",
      title: "VelocityAI Testing",
      desc: "Use AI to optimize quality engineering, automate processes, and make intelligent decisions to enhance efficiency, accuracy, scalability, and customer experience.",
    },
    {
      id: "portable-devices",
      title: "Smart and Portable Devices",
      desc: "Streamline and optimize every mobile app development lifecycle phase, positioning your ecosystem to be ready for the future.",
    },
    {
      id: "platform-support",
      title: "Platform Management and Tech Support",
      desc: "Take a unique engineering led approach for product enhancement, sustenance, and customer success to deliver business outcomes.",
    },
  ];

  const caseStudies = [
    {
      client: "Global SaaS Unicorn",
      title: "AI-Native Software Platform Scale",
      desc: "Engineered scalable cloud product architecture using AI-assisted SDLC tooling.",
      image: "/hero-startup.jpg",
    },
    {
      client: "Enterprise FinTech Leader",
      title: "Legacy Monolith Microservice Migration",
      desc: "Accelerated cloud transformation and reduced regression test cycles by 60%.",
      image: "/products-engineering.png",
    },
    {
      client: "Smart Connected Mobility",
      title: "Portable Device Firmware & Mobile Platform",
      desc: "Built unified cross-platform mobile application and connected hardware telemetry suite.",
      image: "/about/team-collaboration.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-[#181a24] flex flex-col font-sans selection:bg-[#0066ff]/20 selection:text-[#0066ff]">
      <Navbar variant="floating" activePath="/services" />

      <main className="flex-1 w-full">
        {/* HERO SECTION */}
        <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#e5e7eb] bg-gradient-to-b from-[#fcfdfe] via-[#f8f9fc] to-[#f2f3f6]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-[#484f6b] mb-8 font-medium">
              <Link href="/services" className="hover:text-[#0066ff] transition-colors">Services</Link>
              <span className="text-slate-400">›</span>
              <span className="text-[#181a24] font-bold">Software Product Engineering</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0066ff] bg-[#0066ff]/10 px-3 py-1 rounded-full border border-[#0066ff]/20 mb-4">
                  SOFTWARE ENGINEERING EXCELLENCE
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#181a24] tracking-tight leading-[1.08] mb-6">
                  Software Product Engineering
                </h1>
                <p className="text-[#0066ff] text-xl font-bold mb-4">
                  Innovate, adapt, and accelerate revenue streams with AI-powered software solutions
                </p>
                <p className="text-[#484f6b] text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                  Harness Vexus VelocityAI – a flexible, IP-secure, and end-to-end SDLC tooling environment to build software products and platforms that fuel competitive advantage.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Start a product engineering consultation →
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
                    src="/hero-engineering.jpg"
                    alt="Software Product Engineering"
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

        {/* OUR APPROACH SECTION */}
        <section className="py-20 lg:py-28 bg-white border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#484f6b]">
                Our approach
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] mt-2 tracking-tight">
                Harness the AI opportunity in software product development
              </h2>
              <p className="mt-4 text-[#484f6b] text-base sm:text-lg max-w-3xl leading-relaxed">
                The software product development process is evolving from traditional human-powered distributed product development to AI-enabled to AI-native. As this continuum unfolds, we help you with the right approach to capitalize on AI’s impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {approaches.map((item) => (
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
          </div>
        </section>

        {/* OUR CAPABILITIES SECTION */}
        <section className="py-20 lg:py-28 bg-[#f8f9fb] border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#484f6b]">
                Our capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] mt-2 tracking-tight">
                Improve speed, quality, and cost
              </h2>
              <p className="mt-4 text-[#484f6b] text-base sm:text-lg max-w-3xl">
                We offer tailored, end-to-end development solutions that combine global talent, Agile methodologies, AI tools, and cloud-native architectures to deliver quality software products.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {capabilities.map((cap, idx) => {
                const isActive = idx === activeCapabilityIndex;
                return (
                  <div
                    key={cap.id}
                    onClick={() => setActiveCapabilityIndex(idx)}
                    className={`group cursor-pointer rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between border ${
                      isActive
                        ? "bg-[#e8ebf0] border-[#c0c7d4] shadow-md"
                        : "bg-white border-[#e5e7eb] hover:bg-[#f1f3f7] hover:border-[#cbd5e1] hover:shadow-md"
                    }`}
                  >
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-[#181a24] group-hover:text-[#0066ff] transition-colors">
                        {cap.title}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed text-[#484f6b]">
                        {cap.desc}
                      </p>
                    </div>
                    <div className="mt-6">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066ff] uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                      >
                        <span>Learn more</span>
                        <span>→</span>
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
