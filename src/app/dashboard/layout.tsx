"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isAdminAuthenticated, getAdminUser, logoutAdmin, AdminUser } from "@/utils/adminAuth";
import { getAdminContactsAPI } from "@/api/contact_api";
import { getAdminApplicationsAPI } from "@/api/application_api";
import { getAllApplications } from "@/utils/applicationsStorage";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [contactCount, setContactCount] = useState(0);
  const [hiringCount, setHiringCount] = useState(0);

  // Drawer states
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.replace("/adminLogin");
    } else {
      setCurrentUser(getAdminUser());
      setIsCheckingAuth(false);
    }
  }, [router]);

  useEffect(() => {
    const refreshAppCounts = async () => {
      let contactsList: any[] = [];
      let apiHiringList: any[] = [];

      try {
        const apiRes = await getAdminContactsAPI();
        if (apiRes.data && Array.isArray(apiRes.data)) {
          contactsList = apiRes.data;
        }
      } catch (err) {}

      try {
        const hiringRes = await getAdminApplicationsAPI();
        if (hiringRes.data && Array.isArray(hiringRes.data)) {
          apiHiringList = hiringRes.data;
        }
      } catch (err) {}

      const localHiring = getAllApplications();
      const mergedMap = new Map();
      [...apiHiringList, ...localHiring].forEach((item) => {
        const key = item._id || item.id;
        if (key && !mergedMap.has(key)) {
          mergedMap.set(key, item);
        }
      });

      const allApps = [...contactsList, ...Array.from(mergedMap.values())];
      const contacts = allApps.filter((a) => !a.jobTitle && !a.resumeFileName && !a.resumeDataUrl && !a.portfolioUrl);
      const hiring = allApps.filter((a) => Boolean(a.jobTitle || a.resumeFileName || a.resumeDataUrl || a.portfolioUrl));

      setContactCount(contacts.length);
      setHiringCount(hiring.length);
    };

    refreshAppCounts();

    window.addEventListener("vexus_applications_updated", refreshAppCounts);
    window.addEventListener("storage", refreshAppCounts);
    return () => {
      window.removeEventListener("vexus_applications_updated", refreshAppCounts);
      window.removeEventListener("storage", refreshAppCounts);
    };
  }, []);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setIsMobileDrawerOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logoutAdmin();
    router.push("/adminLogin");
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-700 font-sans">
        <div className="flex flex-col items-center gap-3 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="w-10 h-10 border-3 border-[#0066ff] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
            Verifying Admin Access...
          </p>
        </div>
      </div>
    );
  }

  const navLinks = [
    {
      label: "Dashboard Overview",
      href: "/dashboard",
      exact: true,
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      label: "All Job Positions",
      href: "/dashboard/jobs",
      exact: true,
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Contact Inquiries",
      href: "/dashboard/applications?type=contacts",
      exact: false,
      badge: contactCount > 0 ? contactCount : undefined,
      badgeStyle: "bg-blue-50 text-[#0066ff] border border-blue-200",
      icon: (
        <svg className="w-5 h-5 flex-shrink-0 text-[#0066ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Hiring Details",
      href: "/dashboard/applications?type=hiring",
      exact: false,
      badge: hiringCount > 0 ? hiringCount : undefined,
      badgeStyle: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      icon: (
        <svg className="w-5 h-5 flex-shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: "Post New Job",
      href: "/dashboard/jobs/create",
      exact: false,
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const isNavActive = (itemHref: string, exact: boolean) => {
    if (itemHref.includes("?")) {
      const [base, query] = itemHref.split("?");
      const targetType = new URLSearchParams(query).get("type");
      if (typeof window !== "undefined") {
        const currentType = new URLSearchParams(window.location.search).get("type") || "contacts";
        return pathname.startsWith(base) && currentType === targetType;
      }
      return pathname.startsWith(base);
    }
    if (exact) {
      return pathname === itemHref;
    }
    return pathname.startsWith(itemHref) && !pathname.includes("?type=");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex font-sans selection:bg-[#0066ff]/20 selection:text-[#0066ff]">
      {/* ========================================================================= */}
      {/* MOBILE DRAWER BACKDROP & OVERLAY                                         */}
      {/* ========================================================================= */}
      {isMobileDrawerOpen && (
        <div
          onClick={() => setIsMobileDrawerOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden transition-opacity"
        />
      )}

      {/* ========================================================================= */}
      {/* SIDEBAR DRAWER (COLLAPSIBLE DESKTOP + SLIDE-OVER MOBILE)                 */}
      {/* ========================================================================= */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-300 shadow-sm ${
          // Mobile visibility
          isMobileDrawerOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${
          // Desktop width
          isDesktopCollapsed ? "md:w-20" : "md:w-64"
        } w-64`}
      >
        {/* Top Drawer Header */}
        <div className={`border-b border-slate-100 flex items-center transition-all ${
          isDesktopCollapsed ? "p-3 flex-col justify-center gap-2" : "p-4 justify-between gap-3"
        }`}>
          <Link href="/dashboard" className="flex items-center gap-3 min-w-0" title="Vexus Lab Staff Portal">
            <div className="w-9 h-9 rounded-xl border border-slate-200 bg-slate-50 p-1 flex items-center justify-center flex-shrink-0 shadow-xs">
              <Image
                src="/logo-icon.png"
                alt="Vexus Lab Logo"
                width={26}
                height={26}
                className="object-contain"
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </div>
            {!isDesktopCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-sm tracking-tight text-slate-900 truncate">
                  Vexus Lab
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0066ff]">
                  Staff Portal
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Drawer Collapse Toggle */}
          <button
            onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title={isDesktopCollapsed ? "Expand Drawer" : "Collapse Drawer"}
          >
            <svg
              className={`w-4 h-4 transform transition-transform ${isDesktopCollapsed ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>

          {/* Mobile Drawer Close */}
          <button
            onClick={() => setIsMobileDrawerOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <div className="p-3 flex-1 overflow-y-auto space-y-6">
          {/* Main Links */}
          <div className="space-y-1">
            {!isDesktopCollapsed && (
              <div className="px-3 pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Menu
              </div>
            )}
            {navLinks.map((item) => {
              const active = isNavActive(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all relative ${
                    active
                      ? "bg-blue-50 text-[#0066ff] border border-blue-200/80 shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent"
                  } ${isDesktopCollapsed ? "justify-center" : ""}`}
                  title={isDesktopCollapsed ? `${item.label}${item.badge ? ` (${item.badge})` : ""}` : undefined}
                >
                  <div className="relative flex-shrink-0">
                    {item.icon}
                    {isDesktopCollapsed && item.badge !== undefined && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#0066ff] ring-2 ring-white" />
                    )}
                  </div>
                  {!isDesktopCollapsed && (
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <span className="truncate">{item.label}</span>
                      {item.badge !== undefined && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${item.badgeStyle || "bg-[#0066ff] text-white"} shadow-2xs`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Public Views Section */}
          <div className="space-y-1 pt-4 border-t border-slate-100">
            {!isDesktopCollapsed && (
              <div className="px-3 pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Live Sites
              </div>
            )}
            <Link
              href="/careers"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 transition-all ${
                isDesktopCollapsed ? "justify-center" : ""
              }`}
              title={isDesktopCollapsed ? "Public Careers Page" : undefined}
            >
              <svg className="w-5 h-5 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {!isDesktopCollapsed && <span>Live Careers Page</span>}
            </Link>

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 transition-all ${
                isDesktopCollapsed ? "justify-center" : ""
              }`}
              title={isDesktopCollapsed ? "Vexus Lab Website" : undefined}
            >
              <svg className="w-5 h-5 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              {!isDesktopCollapsed && <span>Studio Website</span>}
            </Link>
          </div>
        </div>

        {/* Drawer Footer: Admin User Badge & Logout */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          {!isDesktopCollapsed ? (
            <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0066ff] to-[#0084ff] flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-xs">
                  {currentUser?.name?.charAt(0) || "A"}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {currentUser?.name || "Admin"}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono truncate">
                    {currentUser?.role || "Talent Lead"}
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Sign Out"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0066ff] to-[#0084ff] flex items-center justify-center text-white font-bold text-xs shadow-xs"
                title={currentUser?.name || "Admin"}
              >
                {currentUser?.name?.charAt(0) || "A"}
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Sign Out"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN LAYOUT CANVAS (ADJUSTS WITH DESKTOP DRAWER WIDTH)                   */}
      {/* ========================================================================= */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isDesktopCollapsed ? "md:pl-20" : "md:pl-64"
        }`}
      >
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-white/95 border-b border-slate-200/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left: Mobile Drawer Trigger + Page Context */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100"
              title="Open Navigation Drawer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span className="font-bold text-slate-900">Vexus Console</span>
              <span>/</span>
              <span className="text-[#0066ff]">White Theme Portal</span>
            </div>
          </div>

          {/* Right: Quick actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Storage Active</span>
            </div>

            <Link
              href="/dashboard/jobs/create"
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#0066ff] hover:bg-[#0052cc] text-white shadow-xs shadow-blue-500/20 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Job</span>
            </Link>
          </div>
        </header>

        {/* Main Content Area (Fluid Full-Width with clean margins) */}
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 min-w-0">
          {children}
        </main>

        {/* White Theme Minimal Footer */}
        <footer className="w-full border-t border-slate-200 bg-white py-5 px-4 sm:px-6 lg:px-8">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div>
              © {new Date().getFullYear()} Vexus Lab Inc. Admin Dashboard Portal.
            </div>
            <div className="flex items-center gap-4">
              <Link href="/careers" target="_blank" className="hover:text-slate-900 transition-colors">
                Public Careers
              </Link>
              <span>·</span>
              <Link href="/" target="_blank" className="hover:text-slate-900 transition-colors">
                Public Site
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
