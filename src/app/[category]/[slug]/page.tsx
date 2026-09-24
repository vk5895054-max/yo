"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default function SubcategoryPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { category, slug } = resolvedParams;

  const [activeSolutionIndex, setActiveSolutionIndex] = useState(0);

  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const formattedCategory = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Custom data overrides for specific subcategories, with sensible fallbacks
  const getSubcategoryDetails = () => {
    let heroImage = "/about/team-collaboration.jpg";
    let howWeHelpImage = "/about/about-hero-team.jpg";

    if (slug.includes("ai") || slug.includes("data") || slug.includes("intelligence")) {
      heroImage = "/aiml.png";
      howWeHelpImage = "/aiml1.png";
    } else if (slug.includes("health") || slug.includes("bio")) {
      heroImage = "/health.png";
      howWeHelpImage = "/health1.png";
    } else if (slug.includes("fin") || slug.includes("bank")) {
      heroImage = "/financial.png";
      howWeHelpImage = "/financial1.png";
    } else if (slug.includes("aero") || slug.includes("defense")) {
      heroImage = "/aerospace.png";
      howWeHelpImage = "/aerospace1.png";
    } else if (slug.includes("retail") || slug.includes("commerce")) {
      heroImage = "/retail.png";
      howWeHelpImage = "/retail1.png";
    } else if (slug.includes("media") || slug.includes("entertainment")) {
      heroImage = "/media.png";
      howWeHelpImage = "/media1.png";
    } else if (slug.includes("auto") || slug.includes("mobility")) {
      heroImage = "/mobility.png";
      howWeHelpImage = "/mobility1.png";
    } else if (slug.includes("net") || slug.includes("cloud")) {
      heroImage = "/networking.png";
      howWeHelpImage = "/networking1.png";
    } else if (slug.includes("indus") || slug.includes("manuf")) {
      heroImage = "/industrial.png";
      howWeHelpImage = "/industrial1.png";
    } else if (slug.includes("tech") || slug.includes("soft")) {
      heroImage = "/technology.png";
      howWeHelpImage = "/technology1.png";
    } else if (slug === "private-equity") {
      heroImage = "/pe.png";
      howWeHelpImage = "/pe1.png";
    }

    if (slug === "digital-architecture") {
      return {
        badge: "DIGITAL ARCHITECTURE & STRATEGY",
        title: "Digital Architecture & Product Strategy",
        lead: "Design and build what's next with help from Vexus Lab, providing strategic design, cloud-native digital architecture, and enterprise product development expertise.",
        howWeHelpBody: "Since 1999, Method and Vexus Lab have helped global brands across industries design and build what's next: understanding customer needs, discovering new opportunities, accelerating time to market, and driving digital transformation.",
        heroImage,
        howWeHelpImage,
      };
    }
    if (slug === "generative-ai" || slug === "intelligence-engineering" || slug === "data-ai") {
      return {
        badge: "VEXUS VELOCITYAI • INTELLIGENCE ENGINEERING",
        title: "Intelligence Engineering & GenAI",
        lead: "Leveraging strengths in design, engineering, and data, Vexus VelocityAI helps you transform your business through AI-powered innovation. Develop intelligent products that delight customers and create new revenue streams.",
        howWeHelpBody: "Vexus Lab supports you at any stage of your journey—whether you need help setting your AI strategy and building your implementation roadmap, or you're ready to use rapid prototyping to validate specific use cases and functional proofs of concept to test technical viability.",
        heroImage: "/aiml.png",
        howWeHelpImage: "/aiml1.png",
      };
    }
    if (slug === "private-equity") {
      return {
        badge: "PRIVATE EQUITY VALUE CREATION",
        title: "Private Equity",
        lead: "Engineering impact for private equity-backed companies to scale, innovate, and transform into tomorrow's market leaders.",
        howWeHelpBody: "We empower Portfolio Companies with our unparalleled expertise in AI and Digital Product Engineering, and Intelligent Systems that are strategically designed to match the rapid pace of private equity value creation.",
        heroImage: "/pe.png",
        howWeHelpImage: "/pe1.png",
      };
    }
    return {
      badge: `${formattedCategory.toUpperCase()} • EXCELLENCE`,
      title: `${formattedTitle}`,
      lead: `Design and build what's next with help from Vexus Lab, providing strategic design, robust ${formattedTitle.toLowerCase()} engineering, and product strategy expertise.`,
      howWeHelpBody: `Since inception, Vexus Lab has helped global brands across industries design and build what's next in ${formattedTitle.toLowerCase()}: understanding customer needs, discovering new opportunities, accelerating time to market, and driving digital transformation.`,
      heroImage,
      howWeHelpImage,
    };
  };

  const details = getSubcategoryDetails();

  const solutions = [
    {
      id: "design-systems",
      title: "Design Systems",
      desc: "Create a single source of truth to help your team and partners deliver seamless, consistent digital experiences at every touchpoint. Your design system could contain patterns, components, guidelines, and other core UX and brand elements.",
    },
    {
      id: "product-strategy",
      title: "Product Strategy",
      desc: "Start with strategy to validate product-market fit, accelerate transformation, and ensure long-term success. We'll partner to uncover growth opportunities, align products with business goals, and create tailored, user-validated plans.",
    },
    {
      id: "ux-ui-design",
      title: "Product & UX/UI Design",
      desc: "User wireframes, user flows, sitemaps, component libraries, and more to design the product experience. This includes crafting structure, look, and functionality while considering medium, brand, accessibility, and best practices.",
    },
    {
      id: "innovation-prototyping",
      title: "Innovation & Rapid Prototyping",
      desc: "Refine concepts, reduce risks, and bring market-ready products to users faster. Together, we'll build a realistic, limited-functionality representation of your proposed experience for testing, iteration, socialization, and spec creation.",
    },
    {
      id: "launch-adoption",
      title: "Product Launch & Adoption",
      desc: "Just because you build it doesn't mean users will come. Prepare a smooth launch and drive adoption by partnering with Vexus Lab on change management and strategic launch plans that consider your users, culture constraints, and more.",
    },
  ];

  const pillarHighlights = [
    {
      title: "Integrated Strategic Design & Development",
      desc: "Vexus Lab's team works alongside client engineering teams from concept to completion, ensuring alignment and seamless execution.",
      tag: "SYNCHRONIZED PODS",
    },
    {
      title: "Concierge Service, Enterprise Scale",
      desc: "Get the personal attention you deserve, backed by enterprise scale to accelerate efficiency and speed to market.",
      tag: "ENTERPRISE SLA",
    },
    {
      title: "Organizational Empowerment",
      desc: "Vexus Lab's team can embed with yours and help upskill team members through live demonstration, pairing, and co-creation.",
      tag: "UPSKILL & EMBED",
    },
  ];

  const caseStudies = [
    {
      client: "Jenius Bank",
      title: "Next-Gen Digital Banking Architecture",
      desc: "Built a resilient, cloud-native microservices platform empowering friction-free financial services.",
      image: "/projects/sovereign-asset.png",
      tag: "FINANCIAL SERVICES",
    },
    {
      client: "Ben & Jerry's",
      title: "Global DTC & Engagement Experience",
      desc: "Transformed digital customer engagement with personalized ordering and reward loyalty platforms.",
      image: "/projects/city-pulse.jpg",
      tag: "RETAIL & CONSUMER",
    },
    {
      client: "Cegid",
      title: "Enterprise SaaS Optimization",
      desc: "Accelerated cloud platform performance and redesigned unified design system for enterprise software.",
      image: "/products-engineering.png",
      tag: "ENTERPRISE SAAS",
    },
  ];

  const featuredInsights = [
    {
      date: "8 July 2024",
      category: "BLOGS",
      title: "6 Pillars of Successful Customer Experience Transformation",
      excerpt: "Learn how modern digital studios align design architecture, user feedback loops, and high-velocity engineering to drive lasting customer retention.",
      href: "/insights/customer-experience-transformation",
    },
    {
      date: "5 August 2024",
      category: "BLOGS",
      title: "Human-Centered Design in Healthcare: Bridging the Gap Between Innovation and Execution",
      excerpt: "Learn how Vexus Lab prioritizes user needs to create impactful solutions, bridging technical innovation and healthcare compliance.",
      href: "/insights/human-centered-design-in-healthcare",
    },
    {
      date: "18 June 2024",
      category: "BLOGS",
      title: "Turning Customer Insights Into a Personalization Strategy",
      excerpt: "Unlock the power of personalization strategies for enhanced customer engagement across web and mobile touchpoints.",
      href: "/insights/customer-insights-personalization-strategy",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-[#181a24] flex flex-col font-sans selection:bg-[#0066ff]/20 selection:text-[#0066ff]">
      {/* Dynamic Floating Navbar */}
      <Navbar variant="floating" activePath={`/${category}`} />

      <main className="flex-1 w-full">
        {/* ========================================================================= */}
        {/* HERO SECTION (Matching Screenshot 1) */}
        {/* ========================================================================= */}
        <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#e5e7eb] bg-gradient-to-b from-[#fcfdfe] via-[#f8f9fc] to-[#f2f3f6]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-[#484f6b] mb-8 font-medium">
              <Link href="/" className="hover:text-[#0066ff] transition-colors">Services</Link>
              <span className="text-slate-400">›</span>
              <span className="text-[#181a24] font-bold">{formattedTitle}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Hero Headlines */}
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0066ff] bg-[#0066ff]/10 px-3 py-1 rounded-full border border-[#0066ff]/20 mb-4">
                  {details.badge}
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#181a24] tracking-tight leading-[1.08] mb-6">
                  {details.title}
                </h1>
                <p className="text-[#484f6b] text-lg sm:text-xl leading-relaxed max-w-2xl font-normal">
                  {details.lead}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Start a project consultation →
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white border border-[#e5e7eb] hover:bg-[#f2f3f6] text-[#181a24] font-bold text-sm transition-all duration-200 shadow-xs"
                  >
                    Explore case studies
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Image Showcase (Matching Screenshot 1) */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/60 bg-slate-100 group">
                  <Image
                    src={details.heroImage}
                    alt={`${formattedTitle} Team Strategy Session`}
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
        {/* "HOW WE HELP" / "DESIGN TO BUILD" SECTION (Matching Screenshot 2) */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 bg-white border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Image (Whiteboard Presenter) */}
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                  <Image
                    src={details.howWeHelpImage}
                    alt="Design to Build Session"
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
                  Design to build
                </h2>
                <p className="mt-5 text-[#484f6b] text-base sm:text-lg leading-relaxed font-normal">
                  {details.howWeHelpBody}
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
        {/* "SOLUTIONS FOR EVERY STAGE" CAROUSEL/GRID (Matching Screenshot 4) */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 bg-[#f8f9fb] border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#484f6b]">
                  Our solutions
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] mt-2 tracking-tight">
                  Solutions for every stage
                </h2>
              </div>

            </div>

            {/* Interactive Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {solutions.map((item, idx) => {
                const isActive = idx === activeSolutionIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveSolutionIndex(idx)}
                    className={`group cursor-pointer rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between border ${isActive
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
                    <div className="mt-6 text-xs font-bold flex items-center gap-1 text-[#0066ff] transition-transform duration-300 group-hover:translate-x-1.5">
                      <span>{isActive ? "Active View" : "Select stage"}</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Strategic Pillars Summary Banner (Prompt Text) */}
            <div className="mt-16 bg-white rounded-3xl p-8 sm:p-10 border border-[#e5e7eb] shadow-sm">
              <p className="text-xs font-mono font-bold text-[#0066ff] uppercase tracking-wider mb-4">
                ENTERPRISE OPERATING MODEL
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pillarHighlights.map((pillar) => (
                  <div key={pillar.title} className="flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#484f6b] uppercase tracking-wider bg-[#f2f3f6] px-2.5 py-1 rounded-md">
                        {pillar.tag}
                      </span>
                      <h4 className="text-lg font-bold text-[#181a24] mt-3 mb-2">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-[#484f6b] leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* "SUCCESS STORIES" CASE STUDIES SECTION (Matching Screenshot 5) */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 bg-white border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#484f6b]">
                  Our work
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181a24] mt-2 tracking-tight">
                  Success stories
                </h2>
              </div>
              {/* <div className="max-w-md">
                <p className="text-xs sm:text-sm text-[#484f6b] leading-relaxed">
                  Vexus Lab and Method help brands across industries and geographies make their vision a reality today and sustain success in the future.
                </p>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0066ff] hover:text-[#0052cc] mt-2 transition-colors"
                >
                  <span>View all case studies</span>
                  <span>→</span>
                </Link>
              </div> */}
            </div>

            {/* 3 Case Study Image Cards */}
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


      </main>

      {/* Unified Brand Footer */}
      <Footer />
    </div>
  );
}

