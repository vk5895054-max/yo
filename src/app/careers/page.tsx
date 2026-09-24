"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JOB_POSITIONS, JobPosition } from "@/data/careersData";
import { JobApplicationModal } from "@/components/JobApplicationModal";
import { getPublicJobsAPI } from "@/api/job_api";
import { getAllJobs, normalizeBackendJob } from "@/utils/jobsStorage";

import { EngLife3DVisual } from "@/components/EngLife3DVisual";

export default function CareersPage() {
  const [allJobs, setAllJobs] = useState<JobPosition[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [activeApplyJob, setActiveApplyJob] = useState<JobPosition | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rolesPerPage = 10;

  useEffect(() => {
    const updateJobs = async () => {
      console.log("💼 [CareersPage] Fetching live public jobs via getPublicJobsAPI...");
      try {
        const apiRes = await getPublicJobsAPI();
        console.log("✅ [CareersPage] Live Backend API Response:", apiRes);
        if (Array.isArray(apiRes.data) && apiRes.data.length > 0) {
          setAllJobs(apiRes.data.map(normalizeBackendJob));
        } else {
          console.log("ℹ️ [CareersPage] Live API returned empty array, fetching from local data fallback...");
          setAllJobs(getAllJobs());
        }
      } catch (err: any) {
        console.error("❌ [CareersPage] Live getPublicJobsAPI Error, using fallback:", err.message);
        setAllJobs(getAllJobs());
      }
    };

    updateJobs();

    window.addEventListener("vexus_jobs_updated", updateJobs);
    window.addEventListener("storage", updateJobs);
    return () => {
      window.removeEventListener("vexus_jobs_updated", updateJobs);
      window.removeEventListener("storage", updateJobs);
    };
  }, []);

  const categories = [
    { key: "all", label: `All Roles (${allJobs.length})` },
    {
      key: "frontend",
      label: `Frontend & Full-Stack (${allJobs.filter((j) => j.departmentKey === "frontend").length})`,
    },
    {
      key: "ai",
      label: `AI & Data Engineering (${allJobs.filter((j) => j.departmentKey === "ai").length})`,
    },
    {
      key: "cloud",
      label: `Cloud & DevOps (${allJobs.filter((j) => j.departmentKey === "cloud").length})`,
    },
    {
      key: "mobile",
      label: `Mobile Development (${allJobs.filter((j) => j.departmentKey === "mobile").length})`,
    },
    {
      key: "design",
      label: `Design Engineering (${allJobs.filter((j) => j.departmentKey === "design").length})`,
    },
  ];

  const filteredJobs =
    selectedCategory === "all"
      ? allJobs
      : allJobs.filter((j) => j.departmentKey === selectedCategory);

  const totalRoles = filteredJobs.length;
  const totalPages = Math.ceil(totalRoles / rolesPerPage) || 1;
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (safeCurrentPage - 1) * rolesPerPage;
  const endIndex = Math.min(startIndex + rolesPerPage, totalRoles);
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  const handleCategoryChange = (catKey: string) => {
    setSelectedCategory(catKey);
    setCurrentPage(1);
    setExpandedJobId(null);
  };

  const handlePageChange = (page: number) => {
    setSelectedCategory("all");
    setCurrentPage(page);
    setExpandedJobId(null);
    const el = document.getElementById("open-roles");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleToggleInfo = (jobId: string) => {
    setExpandedJobId((prev) => (prev === jobId ? null : jobId));
  };

  const handleOpenApply = (job: JobPosition) => {
    setActiveApplyJob(job);
    setIsApplyModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-[#181a24] flex flex-col font-sans selection:bg-[#0066ff]/20 selection:text-[#0066ff]">
      <Navbar variant="floating" activePath="/careers" />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* HERO SECTION                                                              */}
        {/* ========================================================================= */}
        <section className="w-full border-b border-[#e5e7eb] bg-gradient-to-b from-[#f8f9fc] via-white to-[#fcfdfe] pt-12 pb-16 lg:pt-18 lg:pb-22 relative overflow-hidden">
          <div
            className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-[#0066ff]/10 rounded-full blur-[140px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-5 left-10 w-[350px] h-[350px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7">
                <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-[-0.03em] text-[#181a24] leading-[1.12]">
                  Build Scalable Software{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066ff] via-[#38bdf8] to-[#0d9488]">
                    Alongside Elite Engineers.
                  </span>
                </h1>

                <p className="mt-5 text-base sm:text-lg text-[#484f6b] leading-relaxed max-w-2xl">
                  No corporate bureaucracy. No 8-round puzzle interviews. Just deep craft, high-velocity shipping, transparent compensation, and autonomous engineering pods building production systems for global scale.
                </p>

                <div className="mt-8">
                  <a
                    href="#open-roles"
                    className="inline-flex items-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all"
                  >
                    <span>View Open Roles ({allJobs.length})</span>
                    <span>↓</span>
                  </a>
                </div>
              </div>

              {/* Right Column: 3D Holographic Gyroscope Visual */}
              <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex items-center justify-center">
                <EngLife3DVisual />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ACTIVE REQUISITIONS / OPEN ROLES                                          */}
        {/* ========================================================================= */}
        <section id="open-roles" className="w-full py-16 lg:py-24 border-b border-[#e5e7eb] bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            {/* Section Header */}
            <div className="mb-10">
              <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400 ">
                02 - ACTIVE REQUISITIONS
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#181a24] tracking-tight">
                Open Technical Roles
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#484f6b] max-w-2xl leading-relaxed">
                Explore our current openings. Use <strong>More Info</strong> to review pod responsibilities, or click <strong>Apply Now</strong> to submit your application via modal.
              </p>
            </div>

            {/* Horizontally Scrollable Category Filter Pills */}
            <div className="relative mb-8 sm:mb-10">
              <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2.5 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => handleCategoryChange(cat.key)}
                      className={`flex-shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${isActive
                        ? "bg-[#181a24] text-white shadow-sm ring-1 ring-[#181a24]"
                        : "bg-slate-100 text-[#484f6b] hover:bg-slate-200/80 hover:text-[#181a24]"
                        }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Roles List */}
            <div className="space-y-4">
              {paginatedJobs.map((job) => {
                const isExpanded = expandedJobId === job.id;

                return (
                  <div
                    key={job.id}
                    className={`rounded-2xl border transition-all duration-200 p-5 sm:p-6 ${isExpanded
                      ? "border-[#0066ff]/50 bg-white shadow-md ring-1 ring-[#0066ff]/20"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs"
                      }`}
                  >
                    {/* Top Row: Job Badges, Title, Comp & Action Buttons */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                      {/* Left Column */}
                      <div className="flex-1 min-w-0">
                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-md text-[9.5px] font-mono font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
                            {job.department}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md text-[9.5px] font-mono font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-100">
                            {job.locationBadge}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md text-[9.5px] font-mono font-bold uppercase tracking-wider bg-blue-50 text-[#0066ff] border border-blue-100">
                            {job.levelBadge}
                          </span>
                        </div>

                        {/* Title - clickable to toggle info */}
                        <h3
                          onClick={() => handleToggleInfo(job.id)}
                          className="text-lg sm:text-xl font-bold text-[#181a24] hover:text-[#0066ff] cursor-pointer transition-colors"
                        >
                          {job.title}
                        </h3>

                        {/* Salary & Tech Stack */}
                        <div className="mt-2 text-xs text-[#484f6b] flex flex-wrap items-center gap-1.5 leading-relaxed">
                          <span className="font-semibold text-[#181a24]">{job.salary}</span>
                          <span>•</span>
                          <span className="text-slate-500">
                            {(job.techStack || []).join(" • ")}
                          </span>
                        </div>
                      </div>

                      {/* Right Column: Toggle More Info & Apply Button */}
                      <div className="flex items-center gap-2.5 flex-shrink-0 self-start lg:self-center">
                        {/* Toggle Button for More Info */}
                        <button
                          type="button"
                          onClick={() => handleToggleInfo(job.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5 ${isExpanded
                            ? "bg-slate-800 hover:bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 hover:bg-slate-200 text-[#181a24] border border-slate-300/80"
                            }`}
                        >
                          <span>{isExpanded ? "Close Info" : "More Info"}</span>
                          <span className="text-xs">{isExpanded ? "✕" : "↓"}</span>
                        </button>

                        {/* Apply Button -> Opens Modal Form */}
                        <button
                          type="button"
                          onClick={() => handleOpenApply(job)}
                          className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#0066ff] hover:bg-[#0052cc] shadow-xs hover:shadow transition-all duration-200 hover:scale-102 active:scale-98 cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <span>Apply Now</span>
                          <span>⚡</span>
                        </button>
                      </div>
                    </div>

                    {/* Expandable "More Info" Section */}
                    {isExpanded && (
                      <div className="mt-5 pt-5 border-t border-slate-200 text-xs sm:text-sm text-[#334155] space-y-5 animate-in fade-in duration-200">
                        {/* Summary / Mission */}
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                          <div className="text-[10px] font-mono font-bold uppercase text-[#0066ff] tracking-wider mb-1">
                            ROLE MISSION &amp; CONTEXT
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {job.aboutRole}
                          </p>
                        </div>

                        {/* Responsibilities & Qualifications Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Responsibilities */}
                          <div className="p-4 rounded-xl bg-white border border-slate-200">
                            <div className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider mb-2">
                              KEY RESPONSIBILITIES
                            </div>
                            <ul className="space-y-2 text-xs text-slate-600">
                              {(job.responsibilities || (job as any).keyResponsibilities || []).slice(0, 4).map((item: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-[#0066ff] font-bold text-xs mt-0.5">⚡</span>
                                  <span className="leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Requirements */}
                          <div className="p-4 rounded-xl bg-white border border-slate-200">
                            <div className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider mb-2">
                              CORE REQUIREMENTS
                            </div>
                            <ul className="space-y-2 text-xs text-slate-600">
                              {(job.requirements || (job as any).mustHaveRequirements || []).slice(0, 4).map((item: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-emerald-600 font-bold text-xs mt-0.5">✓</span>
                                  <span className="leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Tech Stack Quorum & Direct Apply Button */}
                        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div>
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                              POD TECH STACK:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {(job.techStack || []).map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-slate-100 text-slate-800 border border-slate-200"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Quick CTA to open modal */}
                          <button
                            type="button"
                            onClick={() => handleOpenApply(job)}
                            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0066ff] hover:bg-[#0052cc] shadow-xs hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer flex-shrink-0"
                          >
                            <span>Apply for {job.title}</span>
                            <span>→</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls Bar */}
            {totalPages > 1 && (
              <div className="mt-10 pt-6 border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Page Summary Counter */}
                <div className="text-xs text-slate-500 font-mono">
                  Showing <span className="font-bold text-[#181a24]">{startIndex + 1}</span>–
                  <span className="font-bold text-[#181a24]">{endIndex}</span> of{" "}
                  <span className="font-bold text-[#181a24]">{totalRoles}</span> open roles
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Previous Page Button */}
                  <button
                    type="button"
                    disabled={safeCurrentPage === 1}
                    onClick={() => handlePageChange(safeCurrentPage - 1)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                  >
                    <span>←</span>
                    <span className="hidden sm:inline">Prev</span>
                  </button>

                  {/* Page Number Buttons */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    const isActive = pageNum === safeCurrentPage;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${isActive
                          ? "bg-[#181a24] text-white shadow-sm"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {/* Next Page Button */}
                  <button
                    type="button"
                    disabled={safeCurrentPage === totalPages}
                    onClick={() => handlePageChange(safeCurrentPage + 1)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Unified Global Footer */}
      <Footer />

      {/* Application Form Modal (Triggered by Apply Now on any role) */}
      <JobApplicationModal
        job={activeApplyJob}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
}
