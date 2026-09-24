"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { loginAdminAPI } from "@/api/auth_api";
import { isAdminAuthenticated, loginAdmin } from "@/utils/adminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (isAdminAuthenticated()) {
      router.replace("/dashboard");
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage("Please enter your admin email address.");
      return;
    }
    if (!password.trim()) {
      setErrorMessage("Please enter your admin password.");
      return;
    }

    setIsLoading(true);

    try {
      console.log("🔑 [AdminLogin] Authenticating with Live Backend...", { email });
      const res = await loginAdminAPI({ email, password });
      console.log("✅ [AdminLogin] Live Authentication Success:", res);

      if (res.token) {
        localStorage.setItem("vexus_admin_token", res.token);
        localStorage.setItem("token", res.token);
        localStorage.setItem(
          "vexus_admin_session",
          JSON.stringify({
            email: res.admin?.email || email,
            name: "Vexus Admin",
            role: res.admin?.role || "Admin",
            token: res.token,
            loginAt: new Date().toISOString(),
          })
        );
      }

      setIsLoading(false);
      router.push("/dashboard");
    } catch (err: any) {
      console.warn("⚠️ [AdminLogin] Live auth failed, checking fallback:", err.message);
      const res = await loginAdmin(email, password);
      setIsLoading(false);

      if (res.success) {
        router.push("/dashboard");
      } else {
        setErrorMessage(err.message || "Invalid credentials. Please verify your email and password.");
      }
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-800 font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#0066ff] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs tracking-widest uppercase text-slate-500 font-mono">
            Verifying Session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row selection:bg-[#0066ff]/20 selection:text-[#0066ff] font-sans">
      {/* ======================================================================= */}
      {/* LEFT PANE: BRAND WORKSPACE & CYBERSECURITY HERO (DESKTOP)               */}
      {/* ======================================================================= */}
      <div className="hidden md:flex md:w-[48%] lg:w-[50%] xl:w-[52%] p-5 lg:p-7 xl:p-8 flex-col">
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 flex flex-col justify-between p-8 lg:p-12 bg-slate-950">
          {/* Background Hero Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/admin-auth-bg.png"
              alt="Vexus Lab Security Portal"
              fill
              className="object-cover object-center filter brightness-[0.85] contrast-105"
              priority
            />
            {/* Multi-layered subtle gradients for seamless blending & high readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/65" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-950/20 to-slate-950/60" />
            <div className="absolute inset-0 bg-[#0066ff]/10 mix-blend-overlay" />
          </div>

          {/* Top Brand Header */}
          <div className="relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/90 hover:bg-white backdrop-blur-md border border-slate-200 shadow-md transition-all group"
            >
              <div className="w-8 h-8 rounded-xl overflow-hidden bg-white p-1 transition-transform group-hover:scale-105 shadow-2xs">
                <Image
                  src="/logo-icon.png"
                  alt="Vexus Lab Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <span className="font-extrabold tracking-tight text-sm text-slate-900 block leading-tight">
                  Vexus Lab
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#0066ff] font-bold block">
                  Security Gateway
                </span>
              </div>
            </Link>
          </div>

          {/* Narrative & Visual Glass Card */}
          <div className="relative z-10 max-w-lg my-auto py-8 space-y-6 text-white">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-xs font-semibold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span>Enterprise Identity Verification</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.25]">
                Administrative &amp; Talent{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-200">
                  Operations
                </span>
              </h1>
              <p className="text-sm text-slate-200 leading-relaxed font-normal drop-shadow-sm">
                Protected console to oversee talent acquisition, review candidate applications, manage openings, and govern system telemetry.
              </p>
            </div>

            {/* Frosted Capability Badges */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-slate-900/65 border border-white/15 backdrop-blur-md space-y-1">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="text-blue-400">🛡️</span>
                  <span>Protected ATS</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  In-browser view-only document inspection with zero download risk.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/65 border border-white/15 backdrop-blur-md space-y-1">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="text-sky-400">⚡</span>
                  <span>Role-Based RBAC</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Cryptographic JWT token authentication &amp; encrypted sessions.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Status */}
          <div className="relative z-10 flex items-center justify-between text-xs text-slate-300 pt-5 border-t border-white/15">
            <span className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Systems Online · TLS 1.3 Encrypted</span>
            </span>
            <span className="font-mono text-[11px] text-slate-400">v2.4 Enterprise</span>
          </div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* RIGHT PANE: CRISP WHITE AUTHENTICATION FORM                             */}
      {/* ======================================================================= */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-16 bg-white border-l border-slate-200/80">
        {/* Mobile Brand Bar */}
        <div className="flex md:hidden items-center justify-between pb-6 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-100 p-1 border border-slate-200">
              <Image
                src="/logo-icon.png"
                alt="Vexus Lab"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <span className="font-bold text-sm text-slate-900">Vexus Lab</span>
          </Link>
          <Link
            href="/"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50"
          >
            Public Site →
          </Link>
        </div>

        {/* Top Desktop Navigation */}
        <div className="hidden md:flex justify-end">
          <Link
            href="/"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200/90 bg-slate-50 hover:bg-slate-100 shadow-2xs"
          >
            <span>Return to Public Site</span>
            <span>→</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[390px] mx-auto my-auto py-8">
          <div className="space-y-6">
            {/* Form Header */}
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066ff] mb-5 shadow-2xs">
                <svg className="w-6 h-6 text-[#0066ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Admin Sign In
              </h2>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Enter your authorized credentials to access the management console.
              </p>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 animate-fade-in shadow-2xs">
                <svg className="w-4 h-4 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="leading-snug font-medium">{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Work Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Work Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@vexuslab.com"
                    autoComplete="email"
                    className="w-full bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200 hover:border-slate-300 focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/15 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all pl-10 shadow-2xs"
                    required
                  />
                  <svg
                    className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    autoComplete="current-password"
                    className="w-full bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200 hover:border-slate-300 focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/15 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all pl-10 pr-10 shadow-2xs"
                    required
                  />
                  <svg
                    className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                        />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-[#0066ff] hover:bg-[#0052cc] text-white shadow-sm shadow-blue-500/25 transition-all transform active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Admin Console</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Security Badge */}
            <div className="pt-4 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                <span>Protected by Vexus Lab Role-Based Access Control</span>
              </p>
            </div>
          </div>
        </div>

        {/* Page Footer */}
        <div className="text-center text-xs text-slate-400 pt-4">
          <p>© {new Date().getFullYear()} Vexus Lab. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
