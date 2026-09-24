"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface ArchitectureBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ArchitectureBriefingModal({
  isOpen,
  onClose,
}: ArchitectureBriefingModalProps) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    projectType: "Full Stack Web Application",
    details: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 750);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      email: "",
      projectType: "Full Stack Web Application",
      details: "",
    });
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* 3D Glassmorphic Modal Box with Multi-Stop Gradient */}
      <div
        className="relative w-full max-w-lg bg-gradient-to-b from-[#0c1226]/95 via-[#080d1e]/95 to-[#040714]/98 text-white rounded-[32px] border border-white/15 p-6 sm:p-9 shadow-[0_30px_100px_-15px_rgba(0,102,255,0.45)] backdrop-blur-2xl overflow-hidden transform-gpu transition-all duration-300 ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Multi-layered 3D Animated Ambient Gradient Orbs */}
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-gradient-to-br from-[#0066ff]/30 via-[#3b82f6]/20 to-purple-600/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-sky-500/20 via-[#0066ff]/20 to-indigo-600/25 rounded-full blur-3xl pointer-events-none" />

        {/* 3D Corner Hexagon Lattice Highlight */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-white/10 to-transparent pointer-events-none opacity-60" />

        {/* Top Close Button with 3D Ring */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer z-20 shadow-md hover:scale-105 active:scale-95"
        >
          ✕
        </button>

        {!isSubmitted ? (
          <div className="relative z-10">
            {/* 3D Glowing Header Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#0066ff]/20 via-purple-500/20 to-cyan-500/20 border border-blue-400/40 text-xs font-mono font-bold text-[#38bdf8] uppercase tracking-wider mb-5 shadow-[0_0_20px_rgba(0,102,255,0.3)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0066ff] shadow-[0_0_10px_#0066ff] animate-ping" />
              <span>3D ARCHITECTURE BRIEFING • 14-DAY TURNKEY</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 tracking-tight leading-tight">
              Schedule Architecture Briefing
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-300/90 leading-relaxed font-normal">
              Direct 30-minute video session with senior system architects to map out technical constraints, schemas, and 14-day production targets.
            </p>

            {/* Glassmorphic Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-[#38bdf8]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#0066ff] focus:bg-white/[0.08] focus:ring-4 focus:ring-[#0066ff]/25 backdrop-blur-md shadow-inner transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Work Email / Slack <span className="text-[#38bdf8]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#0066ff] focus:bg-white/[0.08] focus:ring-4 focus:ring-[#0066ff]/25 backdrop-blur-md shadow-inner transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Project Domain / Architecture
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) =>
                    setFormData({ ...formData, projectType: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl bg-[#090e21] border border-white/15 text-white text-sm focus:outline-none focus:border-[#0066ff] focus:ring-4 focus:ring-[#0066ff]/25 shadow-inner transition-all cursor-pointer"
                >
                  <option value="Full Stack Web Application">
                    Full Stack Web Application
                  </option>
                  <option value="Mobile App (Flutter / React Native)">
                    Mobile App (Flutter / React Native)
                  </option>
                  <option value="Autonomous AI Agent Pipeline">
                    Autonomous AI Agent Pipeline
                  </option>
                  <option value="Cloud Infrastructure & Microservices">
                    Cloud Infrastructure &amp; Microservices
                  </option>
                  <option value="14-Day MVP Incubator">
                    14-Day MVP Incubator
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Project Notes / SLA Targets (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe key requirements, timeline, or target integrations..."
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#0066ff] focus:bg-white/[0.08] focus:ring-4 focus:ring-[#0066ff]/25 backdrop-blur-md shadow-inner transition-all resize-none"
                />
              </div>

              {/* 3D Radiant Gradient Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0066ff] via-[#2563eb] to-[#7c3aed] hover:from-[#0052cc] hover:to-[#6d28d9] text-white font-bold text-sm sm:text-base shadow-[0_10px_35px_-5px_rgba(0,102,255,0.5)] hover:shadow-[0_15px_45px_-5px_rgba(124,58,237,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>Processing Blueprint...</span>
                  </span>
                ) : (
                  <>
                    <span>Confirm Briefing Request</span>
                    <span className="text-sm">→</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="relative z-10 text-center py-6">
            {/* 3D Success Badge Orb */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500/30 via-teal-400/20 to-cyan-500/30 border-2 border-emerald-400/50 text-emerald-400 text-4xl font-extrabold flex items-center justify-center mx-auto mb-5 shadow-[0_0_35px_rgba(16,185,129,0.4)] animate-bounce-slow">
              ✓
            </div>
            <h4 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200">
              Briefing Scheduled!
            </h4>
            <p className="mt-3 text-sm text-slate-300 max-w-xs mx-auto leading-relaxed">
              Thank you, <strong className="text-white font-bold">{formData.fullName}</strong>. Our principal architect will review your technical blueprint and contact you at <span className="text-[#38bdf8] font-mono font-bold">{formData.email}</span> within 2 hours.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="mt-7 px-8 py-3 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 border border-white/10 text-white text-xs font-bold transition-all cursor-pointer shadow-md hover:scale-105"
            >
              Done &amp; Close
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
