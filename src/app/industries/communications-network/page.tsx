"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CommunicationsNetworkPage() {
  const [activeSolutionIndex, setActiveSolutionIndex] = useState(0);

  const capabilities = [
    {
      title: "5G Network Slicing & Edge Orchestration",
      desc: "Architecting low-latency dynamic network slices and edge computing nodes for mission-critical enterprise applications.",
    },
    {
      title: "Virtualized Telecom Core (vRAN / OpenRAN)",
      desc: "Deconstructing legacy hardware into open, cloud-native virtualized radio access networks and microservice control planes.",
    },
    {
      title: "Software-Defined Networking (SDN) & NFV",
      desc: "Automating network configuration, traffic steering, and virtual network functions with programmable orchestrators.",
    },
    {
      title: "Telecom OSS/BSS Digital Transformation",
      desc: "Modernizing legacy billing, provisioning, and customer care engines with real-time API integrations and cloud infrastructure.",
    },
  ];

  const solutions = [
    {
      id: "5g-core",
      title: "5G Core & Network Slicing",
      desc: "Cloud-native 5G packet core deployment with automated network slice management and QoS enforcement.",
    },
    {
      id: "openran",
      title: "OpenRAN & vRAN Architectures",
      desc: "Decoupled software-defined radio interfaces enabling vendor-neutral wireless infrastructure deployment.",
    },
    {
      id: "edge-nodes",
      title: "Multi-Access Edge Computing (MEC)",
      desc: "Deploying low-latency compute and storage clusters at the telecom edge for AR/VR and smart mobility.",
    },
    {
      id: "sdn-automation",
      title: "SDN & NFV Orchestration Engine",
      desc: "Programmable network orchestration tools for zero-touch provisioning and dynamic routing.",
    },
    {
      id: "bss-oss",
      title: "BSS/OSS Cloud Modernization",
      desc: "Migrating legacy telecom billing, CRM, and inventory systems to scalable microservice platforms.",
    },
  ];

  const caseStudies = [
    {
      client: "Tier-1 Telecom Operator",
      title: "5G Network Slicing & Edge Deployment",
      desc: "Deployed automated network slicing engine delivering <10ms latency for autonomous industrial clients.",
      image: "/projects/city-pulse.jpg",
    },
    {
      client: "Global Carrier",
      title: "Virtualized Core Modernization with OpenRAN",
      desc: "Migrated legacy wireless core to OpenRAN architecture, reducing infrastructure CAPEX by 35%.",
      image: "/about/team-collaboration.jpg",
    },
    {
      client: "Satellite Communications Provider",
      title: "Software-Defined Orchestration Platform",
      desc: "Built cloud-native SDN controller orchestrating hybrid LEO satellite and terrestrial network traffic.",
      image: "/hero-engineering.jpg",
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
              <span className="text-[#181a24] font-bold">Communications &amp; Network Providers</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0066ff] bg-[#0066ff]/10 px-3 py-1 rounded-full border border-[#0066ff]/20 mb-4">
                  TELECOM &amp; 5G NETWORKS
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#181a24] tracking-tight leading-[1.08] mb-6">
                  Communications &amp; Network Providers
                </h1>
                <p className="text-[#484f6b] text-lg sm:text-xl leading-relaxed max-w-2xl font-normal">
                  5G network slicing, virtualized telecom core, and SDN orchestration.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Start a telecom engineering consultation →
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
                    src="/networking.png"
                    alt="Communications Network Infrastructure"
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

        {/* HOW WE HELP SECTION */}
        <section className="py-20 lg:py-28 bg-white border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                  <Image
                    src="/networking1.png"
                    alt="Network Engineering Architecture"
                    width={800}
                    height={700}
                    className="w-full h-[400px] sm:h-[480px] object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-center">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#484f6b] mb-3">
                  How we help
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] tracking-tight leading-tight">
                  Powering next-generation telecommunications
                </h2>
                <p className="mt-5 text-[#484f6b] text-base sm:text-lg leading-relaxed font-normal">
                  Vexus Lab partners with global MNOs, satellite operators, and network equipment providers to build cloud-native 5G cores, software-defined networks, and OpenRAN architectures.
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

        {/* CAPABILITIES SECTION */}
        <section className="py-20 lg:py-28 bg-[#f8f9fb] border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#484f6b]">
                Core Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] mt-2 tracking-tight">
                Telecom &amp; Networking Expertise
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="group p-8 rounded-3xl bg-white border border-[#e5e7eb] hover:bg-[#f1f3f7] hover:border-[#cbd5e1] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-bold text-[#181a24] group-hover:text-[#0066ff] transition-colors mb-3">
                      {cap.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#484f6b] leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUTIONS STAGE SECTION */}
        <section className="py-20 lg:py-28 bg-white border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#484f6b]">
                Our Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] mt-2 tracking-tight">
                Telecom Infrastructure Solutions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {solutions.map((item, idx) => {
                const isActive = idx === activeSolutionIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveSolutionIndex(idx)}
                    className={`group cursor-pointer rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between border ${
                      isActive
                        ? "bg-[#e8ebf0] border-[#c0c7d4] shadow-md"
                        : "bg-white border-[#e5e7eb] hover:bg-[#f1f3f7] hover:border-[#cbd5e1] hover:shadow-md"
                    }`}
                  >
                    <div className="transition-transform duration-300 group-hover:translate-x-1.5">
                      <h3 className="text-xl font-bold mb-3 text-[#181a24] group-hover:text-[#0066ff] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed text-[#484f6b]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CASE STUDIES SECTION */}
        <section className="py-20 lg:py-28 bg-[#f8f9fb]">
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
