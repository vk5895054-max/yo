"use client";

import React from "react";
import Link from "next/link";
import { VexusLabLogo } from "@/components/VexusLabLogo";

interface SocialLink {
  name: string;
  href: string;
  handle: string;
  icon: React.ReactNode;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/vexuslab",
    handle: "vexuslab",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.5a1.63 1.63 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/vexuslab",
    handle: "@vexuslab",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/vexuslab",
    handle: "@vexuslab",
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    href: "https://discord.gg/vexuslab",
    handle: "Community",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@vexuslab",
    handle: "@vexuslab",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/vexuslab",
    handle: "@vexuslab",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-[#080c14] text-white border-t border-slate-800/80 pt-16 pb-12 px-6 sm:px-8 mt-auto relative overflow-hidden">
      {/* Background Ambient Glow Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0066ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/70">
          {/* Brand Column (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <VexusLabLogo size="md" inverted />
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              The high-velocity software engineering studio for ambitious startups and enterprises. We design, architect, and ship production-grade web apps, AI agents, and cloud platforms in 14-day sprints.
            </p>

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-mono text-[11px]">All Systems Operational · Edge v2.8</span>
            </div>

            {/* Social Media Links Block */}
            <div className="pt-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-3 flex items-center gap-2">
                <span>Connect &amp; Follow</span>
                <span className="w-8 h-px bg-slate-800" />
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Vexus Lab on ${item.name}`}
                    title={`${item.name} (${item.handle})`}
                    className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-[#0066ff] hover:bg-[#0066ff] flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-110 active:scale-95 group"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 1: Core Services */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Services
            </div>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/services/digital-architecture" className="hover:text-white transition-colors">
                  Digital Product Architecture
                </Link>
              </li>
              <li>
                <Link href="/services/generative-ai" className="hover:text-white transition-colors">
                  Generative AI &amp; LLM Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/cloud-devops" className="hover:text-white transition-colors">
                  Cloud &amp; DevOps Engineering
                </Link>
              </li>
              <li>
                <Link href="/services/cybersecurity" className="hover:text-white transition-colors">
                  Cybersecurity &amp; Compliance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Technologies */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Technologies
            </div>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <span className="hover:text-white transition-colors">Next.js 16 &amp; React 19</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">Python &amp; FastAPI</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">Golang Microservices</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">PostgreSQL &amp; Redis</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">Docker &amp; Kubernetes</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Studio / Company */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Studio
            </div>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/projects" className="hover:text-white transition-colors text-white font-semibold">
                  Products &amp; Projects
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors">
                  About Vexus Lab
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers (We&apos;re Hiring)
                </Link>
              </li>
              <li>
                <Link href="/englife" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Engineering Life</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#0066ff]/20 text-[#38bdf8] font-bold">Retreats</span>
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  Engineering Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors text-[#38bdf8] font-semibold">
                  Start a Project →
                </Link>
              </li>
              <li>
                <Link href="/adminLogin" className="hover:text-slate-300 transition-colors text-slate-500 flex items-center gap-1.5 pt-1">
                  <span>Admin Console</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-400">Staff</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Socials & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Vexus Lab Inc. All rights reserved. High-velocity software engineering.
          </div>

          {/* Symmetrical Social Media Quick Links */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-400">
            {SOCIAL_LINKS.map((item, idx) => (
              <React.Fragment key={item.name}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#38bdf8] transition-colors"
                >
                  {item.name}
                </a>
                {idx < SOCIAL_LINKS.length - 1 && <span className="text-slate-700">·</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Security / SOC2</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
