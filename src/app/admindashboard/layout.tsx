"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isAdminAuthenticated, getAdminUser, logoutAdmin, AdminUser } from "@/utils/adminAuth";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.replace("/adminLogin");
    } else {
      setCurrentUser(getAdminUser());
      setIsCheckingAuth(false);
    }
  }, [router]);

  const handleLogout = () => {
    logoutAdmin();
    router.push("/adminLogin");
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#090a0f] flex items-center justify-center text-white font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#ff5f2d] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs tracking-widest uppercase text-neutral-400 font-mono">
            Verifying Admin Session...
          </p>
        </div>
      </div>
    );
  }

  const navItems = [
    {
      label: "All Job Postings",
      href: "/admindashboard",
      exact: true,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
    },
    {
      label: "Create New Job",
      href: "/admindashboard/create",
      exact: false,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
  ];

  const isNavActive = (itemHref: string, exact: boolean) => {
    if (exact) {
      return pathname === itemHref;
    }
    return pathname.startsWith(itemHref);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-neutral-200 flex flex-col font-sans selection:bg-[#ff5f2d]/30 selection:text-[#ff7849]">
      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-[#ff5f2d]/10 via-[#ff5f2d]/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#4f46e5]/10 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#090a0f]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-6">
            <Link href="/admindashboard" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 bg-white/5 p-1 transition-transform group-hover:scale-105">
                <Image
                  src="/logo-icon.png"
                  alt="Vexus Lab Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                  style={{ width: "auto", height: "auto" }}
                  priority
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-sm sm:text-base text-white group-hover:text-[#ff7849] transition-colors">
                  Vexus Lab
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-[#ff5f2d]/15 text-[#ff7849] border border-[#ff5f2d]/30 font-semibold tracking-wider">
                  Admin Console
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5 pl-4 border-l border-white/10">
              {navItems.map((item) => {
                const active = isNavActive(item.href, item.exact);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? "bg-white/10 text-white shadow-sm border border-white/15"
                        : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* View Live Careers Link */}
            <Link
              href="/careers"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-colors"
              title="Open public Careers page in new tab"
            >
              <span>Live Careers</span>
              <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>

            {/* User Session Info */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#12141c] border border-white/10">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#ff5f2d] to-[#ff7849] flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                {currentUser?.name?.charAt(0) || "A"}
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-semibold text-white leading-none">
                  {currentUser?.name || "Admin"}
                </span>
                <span className="text-[10px] text-neutral-400 font-mono leading-tight mt-0.5">
                  {currentUser?.role || "Talent Officer"}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all text-xs flex items-center gap-1.5"
              title="Sign out of Admin Session"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline font-medium">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center justify-around border-t border-white/5 bg-[#0d0e15] px-4 py-2">
          {navItems.map((item) => {
            const active = isNavActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                  active
                    ? "bg-white/10 text-white border border-white/15"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
          <Link
            href="/careers"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-white"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Live Site</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="w-full border-t border-white/10 bg-[#07080c] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Vexus Lab Admin Console · Connected to Local Persistence</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/careers" className="hover:text-white transition-colors">Public Careers</Link>
            <span>·</span>
            <Link href="/" className="hover:text-white transition-colors">Vexus Lab Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
