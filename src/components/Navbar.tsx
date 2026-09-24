"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { VexusLabLogo } from "./VexusLabLogo";
import { useLanguage } from "@/context/LanguageContext";

export interface NavSubItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavColumn {
  title?: string;
  items: NavSubItem[];
}

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  isAccent?: boolean; // For "Vexus VelocityAI" orange accent
  hasDropdown?: boolean;
  dropdownType?: "mega" | "list";
  megaColumns?: NavColumn[];
  listItems?: { label: string; href: string }[];
}

const TECH_TICKER_ITEMS = [
  "Software Development",
  "UI/UX Design",
  "Cyber Security",
  "Digital Marketing",
  "SaaS",
];

export interface NavbarProps {
  variant?: "full" | "floating";
  className?: string;
  activePath?: string;
}

export function Navbar({
  variant = "full",
  className = "",
  activePath = "",
}: NavbarProps) {
  const { t } = useLanguage();

  const [mounted, setMounted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic translated nav items
  const navItems: NavItem[] = [
    {
      id: "services",
      label: t("nav.services"),
      href: "/services",
      hasDropdown: true,
      dropdownType: "mega",
      megaColumns: [
        {
          items: [
            {
              label: "Digital Product Architecture",
              href: "/services/digital-architecture",
              description: "Enterprise architecture, scalable microservices, and digital execution.",
            },
            {
              label: "Generative AI & LLM Solutions",
              href: "/services/generative-ai",
              description: "Custom foundation models, RAG vector architectures, and autonomous AI agents.",
            },
          ],
        },
        {
          items: [
            {
              label: "Cloud & DevOps Engineering",
              href: "/services/cloud-devops",
              description: "Automated multi-cloud CI/CD pipelines, Kubernetes, and IaC.",
            },
            {
              label: "Cybersecurity & Compliance",
              href: "/services/cybersecurity",
              description: "Zero-trust architectures, cryptographic defense, and SOC2/HIPAA compliance.",
            },
          ],
        },
      ],
    },
    {
      id: "products",
      label: t("nav.products"),
      href: "/products",
    },
    {
      id: "industries",
      label: t("nav.industries"),
      href: "/industries",
      hasDropdown: true,
      dropdownType: "mega",
      megaColumns: [
        {
          items: [
            {
              label: t("ind.privateEquity"),
              href: "/industries/private-equity",
              description: t("ind.privateEquity.desc"),
            },
            {
              label: t("ind.financialServices"),
              href: "/industries/financial-services",
              description: t("ind.financialServices.desc"),
            },
            {
              label: t("ind.industrialEnergy"),
              href: "/industries/industrial-energy",
              description: t("ind.industrialEnergy.desc"),
            },
            {
              label: t("ind.mobility"),
              href: "/industries/mobility",
              description: t("ind.mobility.desc"),
            },
            {
              label: t("ind.technology"),
              href: "/industries/technology",
              description: t("ind.technology.desc"),
            },
          ],
        },
        {
          items: [
            {
              label: t("ind.communications"),
              href: "/industries/communications-network",
              description: t("ind.communications.desc"),
            },
            {
              label: t("ind.healthcare"),
              href: "/industries/healthcare-life-sciences",
              description: t("ind.healthcare.desc"),
            },
            {
              label: t("ind.media"),
              href: "/industries/media-entertainment",
              description: t("ind.media.desc"),
            },
            {
              label: t("ind.retail"),
              href: "/industries/retail-consumer",
              description: t("ind.retail.desc"),
            },
            {
              label: t("ind.aerospace"),
              href: "/industries/aerospace-defense",
              description: t("ind.aerospace.desc"),
            },
          ],
        },
      ],
    },
    {
      id: "about",
      label: t("nav.aboutUs"),
      href: "/about-us",
    },
    {
      id: "careers",
      label: t("nav.careers"),
      href: "/careers",
      hasDropdown: true,
      dropdownType: "list",
      listItems: [
        { label: "Explore Open Roles", href: "/careers/jobs" },
        { label: "Engineering Life & Trips", href: "/englife" },
      ],
    },
  ];

  // Mark client mounted for portal safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll detection for sticky elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle outside clicks to close desktop menus
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Escape key handler for WCAG compliance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = (id: string) => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    setOpenDropdown(id);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const toggleMobileAccordion = (id: string) => {
    setMobileAccordion((prev) => (prev === id ? null : id));
  };

  const isFloating = false; // Always Full-Width (No floating pill)
  const currentOpenItem = navItems.find((it) => it.id === openDropdown);

  return (
    <header
      ref={navRef}
      role="banner"
      className={`sticky top-0 z-50 transition-all duration-300 font-sans ${
        isFloating
          ? `w-full sm:w-[96%] max-w-[1540px] mx-auto px-3 sm:px-0 ${
              isScrolled ? "pt-1.5 sm:pt-2" : "pt-2.5 sm:pt-5"
            }`
          : "w-full"
      } ${className}`}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top Infinite Horizontal Tech Marquee Ticker */}
      <div className="w-full bg-[#090a0f] text-[#f1f5f9] text-[11px] sm:text-xs font-mono font-semibold py-2 overflow-hidden border-b border-white/10 select-none relative z-50 shadow-xs">
        <div className="flex animate-hero-marquee whitespace-nowrap items-center">
          {[...Array(10)].map((_, arrayIdx) => (
            <React.Fragment key={arrayIdx}>
              {TECH_TICKER_ITEMS.map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-3 px-4">
                  <span className="tracking-wider uppercase hover:text-[#0066ff] transition-colors">{item}</span>
                  <span className="text-[#0066ff] text-[11px] opacity-90 font-bold">✦</span>
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Top Navbar Container */}
      <div
        className={`relative flex items-center justify-between transition-all duration-300 ${
          isFloating
            ? `bg-white/95 backdrop-blur-md rounded-[50px] sm:rounded-[100px] border border-[#e5e7eb] px-4 sm:px-8 ${
                isScrolled
                  ? "py-2 sm:py-2.5 shadow-[0_12px_32px_-6px_rgba(24,26,36,0.12)] border-[#d6d9e0]"
                  : "py-2.5 sm:py-3 shadow-[0_10px_30px_-5px_rgba(24,26,36,0.1)] hover:shadow-[0_15px_35px_-5px_rgba(24,26,36,0.15)]"
              }`
            : `w-full bg-white/95 backdrop-blur-md border-b border-[#e5e7eb] px-4 sm:px-6 lg:px-12 ${
                isScrolled ? "py-2.5 shadow-sm" : "py-3.5"
              }`
        }`}
      >
        {/* Left: Brand Logo (Vexus Lab) */}
        <div className="flex-shrink-0 flex items-center">
          <Link
            href="/"
            aria-label="Vexus Lab Homepage"
            className="flex items-center rounded-lg p-1 -m-1 focus-visible:outline-2 focus-visible:outline-[#0066ff] focus-visible:outline-offset-2"
          >
            <VexusLabLogo size="md" />
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6 xl:gap-8 mx-4"
        >
          {navItems.map((item) => {
            const isMenuOpen = openDropdown === item.id;
            const isVelocity = item.isAccent;
            const isActive =
              isMenuOpen ||
              (activePath && item.href && activePath.startsWith(item.href));

            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.id)}
              >
                {item.hasDropdown ? (
                  <button
                    type="button"
                    aria-expanded={isMenuOpen}
                    aria-haspopup={item.dropdownType === "mega" ? "dialog" : "menu"}
                    onClick={() => toggleDropdown(item.id)}
                    className={`inline-flex items-center gap-1.5 text-[15px] xl:text-[16px] font-medium transition-colors duration-200 py-2 focus-visible:outline-2 focus-visible:outline-[#0066ff] focus-visible:outline-offset-2 ${
                      isVelocity
                        ? "text-[#0066ff] font-semibold hover:text-[#0052cc]"
                        : isActive
                        ? "text-[#0066ff] font-semibold"
                        : "text-[#181a24] hover:text-[#0066ff]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${
                        isMenuOpen ? "rotate-180 text-[#0066ff]" : "text-[#484f6b]"
                      }`}
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className={`inline-flex items-center text-[15px] xl:text-[16px] font-medium transition-colors duration-200 py-2 focus-visible:outline-2 focus-visible:outline-[#0066ff] focus-visible:outline-offset-2 ${
                      isVelocity
                        ? "text-[#0066ff] font-semibold hover:text-[#0052cc]"
                        : "text-[#181a24] hover:text-[#0066ff]"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* List Dropdown Menu (for About Us, Careers) */}
                {item.hasDropdown &&
                  item.dropdownType === "list" &&
                  isMenuOpen && (
                    <div
                      role="menu"
                      aria-label={`${item.label} Submenu`}
                      className="absolute left-0 mt-2 w-64 rounded-xl bg-white border border-[#e5e7eb] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[75vh] overflow-y-auto"
                    >
                      {item.listItems?.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          role="menuitem"
                          className="block px-4 py-2.5 text-[14px] text-[#181a24] hover:text-[#0066ff] hover:bg-[#f2f3f6] transition-colors focus-visible:outline-2 focus-visible:outline-[#0066ff]"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Contact Direct Link Button (Pill shaped, no form) */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center justify-center bg-[#0066ff] hover:bg-[#0052cc] active:bg-[#003d99] text-white font-semibold text-[15px] px-6 py-2 rounded-[50px] shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#181a24] focus-visible:outline-offset-2"
          >
            {t("nav.contact")}
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-[#181a24] hover:bg-[#f2f3f6] transition-colors focus-visible:outline-2 focus-visible:outline-[#0066ff]"
          >
            {mobileMenuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* =========================================================================
          EQUAL 2-COLUMN MEGA MENU PANEL (Industries, Services, Insights)
          ========================================================================= */}
      {currentOpenItem && currentOpenItem.dropdownType === "mega" && currentOpenItem.megaColumns && (
        <div
          role="region"
          aria-label={`${currentOpenItem.label} Directory`}
          className={`absolute left-0 right-0 z-40 bg-white transition-all duration-300 animate-in fade-in slide-in-from-top-3 max-h-[82vh] overflow-y-auto ${
            isFloating
              ? "mt-3 rounded-3xl w-full max-w-[1540px] mx-auto border border-[#e5e7eb] shadow-[0_25px_50px_-12px_rgba(24,26,36,0.15)]"
              : "mt-0 border-b border-[#e5e7eb] shadow-[0_20px_40px_-10px_rgba(24,26,36,0.12)]"
          }`}
          onMouseEnter={() => handleMouseEnter(currentOpenItem.id)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-[1540px] mx-auto px-6 sm:px-12 py-8 lg:py-10">
            {/* Equal 2-Column Split: Column 1 and Column 2 are perfectly symmetric */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24">
              {currentOpenItem.megaColumns.map((col, colIdx) => (
                <div key={colIdx} className="flex flex-col">
                  {col.items.map((item, idx) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`group flex items-start justify-between py-3.5 border-b border-[#ebecee] hover:text-[#0066ff] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#0066ff] focus-visible:outline-offset-2 ${
                        idx === 0 ? "pt-0" : ""
                      }`}
                      onClick={() => setOpenDropdown(null)}
                    >
                      <div className="flex flex-col pr-4">
                        <span className="text-[16px] lg:text-[17px] font-medium text-[#181a24] group-hover:text-[#0066ff] transition-colors tracking-tight">
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="text-[13px] text-[#484f6b] font-normal leading-relaxed mt-0.5 line-clamp-1">
                            {item.description}
                          </span>
                        )}
                      </div>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#0066ff] mt-1 flex-shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MOBILE NAVIGATION DRAWER (< 1024px)
          ========================================================================= */}
      {/* =========================================================================
          MOBILE NAVIGATION FULL-SCREEN OVERLAY (< 1024px)
          ========================================================================= */}
      {/* =========================================================================
          MOBILE NAVIGATION FULL-SCREEN OVERLAY (< 1024px)
          Rendered via React Portal directly into document.body to eliminate
          any containment, padding, or overflow overlap artifacts from parent containers.
          ========================================================================= */}
      {mobileMenuOpen &&
        mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            className="fixed inset-0 z-[99999] w-screen h-[100dvh] bg-white lg:hidden flex flex-col justify-between overflow-hidden animate-in fade-in duration-200"
          >
            {/* 1. Mobile Overlay Top Header (Edge-to-edge, clean, seamless) */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e5e7eb] bg-white flex-shrink-0">
              {/* Brand Logo */}
              <Link
                href="/"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
                aria-label="Vexus Lab Homepage"
                className="flex items-center rounded focus-visible:outline-2 focus-visible:outline-[#0066ff]"
              >
                <VexusLabLogo size="sm" />
              </Link>

              {/* Right: Close Button */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  aria-label="Close Navigation Menu"
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 rounded-full text-[#181a24] hover:bg-[#f2f3f6] active:bg-[#ebecee] transition-colors"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 2. Scrollable Navigation Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1 divide-y divide-[#ebecee]">
              {navItems.map((item) => {
                const isAccordionOpen = mobileAccordion === item.id;

                if (item.hasDropdown) {
                  return (
                    <div key={item.id} className="pt-2 first:pt-0">
                      <button
                        type="button"
                        aria-expanded={isAccordionOpen}
                        onClick={() => toggleMobileAccordion(item.id)}
                        className="w-full flex items-center justify-between py-3 text-[17px] font-semibold text-[#181a24] hover:text-[#0066ff] transition-colors text-left"
                      >
                        <span className={item.isAccent ? "text-[#0066ff] font-bold" : ""}>
                          {item.label}
                        </span>
                        <svg
                          width="12"
                          height="8"
                          viewBox="0 0 10 6"
                          fill="none"
                          aria-hidden="true"
                          className={`transition-transform duration-200 text-[#484f6b] ${
                            isAccordionOpen ? "rotate-180 text-[#0066ff]" : ""
                          }`}
                        >
                          <path
                            d="M1 1L5 5L9 1"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      {/* Accordion Sub-items */}
                      {isAccordionOpen && (
                        <div className="pl-3 pb-3 pt-1 space-y-1.5 bg-[#f8f9fa] rounded-xl my-1 border border-[#ebecee]">
                          {item.dropdownType === "mega" ? (
                            item.megaColumns?.map((col, cIdx) => (
                              <div key={cIdx} className="space-y-1">
                                {col.title && (
                                  <div className="px-3 pt-2 text-[11px] font-bold uppercase tracking-wider text-[#484f6b]">
                                    {col.title}
                                  </div>
                                )}
                                {col.items.map((subItem) => (
                                  <Link
                                    key={subItem.label}
                                    href={subItem.href}
                                    className="block px-3 py-2 rounded-lg text-[14.5px] font-medium text-[#181a24] hover:text-[#0066ff] hover:bg-white transition-colors"
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                    }}
                                  >
                                    <div className="font-semibold">{subItem.label}</div>
                                    {subItem.description && (
                                      <div className="text-[12px] font-normal text-[#484f6b] mt-0.5 line-clamp-1">
                                        {subItem.description}
                                      </div>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            ))
                          ) : (
                            item.listItems?.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                className="block px-3 py-2 rounded-lg text-[14.5px] font-medium text-[#484f6b] hover:text-[#0066ff] hover:bg-white transition-colors"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                }}
                              >
                                {subItem.label}
                              </Link>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div key={item.id} className="pt-2 first:pt-0">
                    <Link
                      href={item.href || "#"}
                      className={`block py-3 text-[17px] transition-colors ${
                        item.isAccent
                          ? "text-[#0066ff] font-bold hover:text-[#0052cc]"
                          : "font-semibold text-[#181a24] hover:text-[#0066ff]"
                      }`}
                      onClick={() => {
                        setMobileMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* 3. Bottom Actions: Direct Contact CTA */}
            <div className="p-5 bg-[#f8f9fa] border-t border-[#e5e7eb] flex-shrink-0">
              {/* Direct Contact Button (Pill shaped, high contrast) */}
              <Link
                href="/contact"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center py-3.5 bg-[#0066ff] hover:bg-[#0052cc] active:bg-[#003d99] text-white font-bold text-[16px] rounded-[50px] text-center shadow-[0_4px_14px_rgba(0,102,255,0.35)] transition-all active:scale-[0.99]"
              >
                {t("nav.contact")}
              </Link>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}
