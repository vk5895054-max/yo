"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { JobPosition } from "@/data/careersData";
import { getAllJobs, deleteJob, normalizeBackendJob } from "@/utils/jobsStorage";
import { getAdminJobsAPI, deleteJobAPI } from "@/api/job_api";

export default function AllJobsPage() {
  const [jobs, setJobs] = useState<JobPosition[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [deletingJob, setDeletingJob] = useState<JobPosition | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // View mode: 'auto' (cards on mobile/tablet, table on desktop), 'table' (force table), 'cards' (force cards)
  const [viewMode, setViewMode] = useState<"auto" | "table" | "cards">("auto");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        console.log("📡 [Dashboard Jobs] Fetching live jobs via getAdminJobsAPI...");
        const apiRes = await getAdminJobsAPI();
        if (Array.isArray(apiRes.data)) {
          const normalized = apiRes.data.map(normalizeBackendJob);
          setJobs(normalized);
          return;
        }
      } catch (err: any) {
        console.warn("⚠️ [Dashboard Jobs] API fetch notice:", err.message);
      }
      setJobs(getAllJobs());
    };

    fetchJobs();

    window.addEventListener("vexus_jobs_updated", fetchJobs);
    return () => window.removeEventListener("vexus_jobs_updated", fetchJobs);
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesDept =
        selectedDepartment === "all" || job.departmentKey === selectedDepartment;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesDept;

      const matchesTitle = job.title.toLowerCase().includes(q);
      const matchesDeptText = job.department.toLowerCase().includes(q);
      const matchesLocation = job.locationBadge.toLowerCase().includes(q);
      const matchesTech = job.techStack.some((t) => t.toLowerCase().includes(q));

      return matchesDept && (matchesTitle || matchesDeptText || matchesLocation || matchesTech);
    });
  }, [jobs, searchQuery, selectedDepartment]);

  // Pagination Configuration: 10 data items each
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever filters or search query change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDepartment]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / ITEMS_PER_PAGE));
  const safePage = Math.max(1, Math.min(currentPage, totalPages));

  const paginatedJobs = useMemo(() => {
    const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredJobs, safePage]);

  const handleConfirmDelete = async () => {
    if (!deletingJob) return;
    setIsDeleting(true);

    const targetId = deletingJob._id || deletingJob.id;
    try {
      await deleteJobAPI(targetId);
    } catch (err: any) {
      console.warn("⚠️ Delete Job API notice:", err.message);
    }

    const res = deleteJob(deletingJob.id);
    setIsDeleting(false);
    setDeletingJob(null);
    setJobs((prev) => prev.filter((j) => (j._id || j.id) !== targetId));

    setToastMessage(`Job "${deletingJob.title}" was deleted.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-white border border-slate-200 shadow-xl text-slate-800 text-sm flex items-center gap-3 animate-fade-in">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0066ff] animate-ping flex-shrink-0" />
          <span className="font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-slate-700 text-xs ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
            <Link href="/dashboard" className="hover:text-slate-600 transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-[#0066ff] font-semibold">All Jobs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            All Job Positions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse, inspect, modify, and manage all published roles across engineering, AI, and design.
          </p>
        </div>

        <Link
          href="/dashboard/jobs/create"
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0066ff] hover:bg-[#0052cc] text-white shadow-xs shadow-blue-500/20 transition-all flex items-center gap-2 w-fit active:scale-95 flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          <span>Post New Job</span>
        </Link>
      </div>

      {/* Search & Filter Strip */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title, tech stack, location..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0066ff] pl-9 transition-colors"
            />
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3 top-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Controls: Active count + View Mode Switcher */}
          <div className="flex items-center justify-between md:justify-end gap-3 flex-shrink-0">
            <div className="text-xs font-mono text-slate-500">
              Total active: <span className="font-bold text-slate-900">{filteredJobs.length}</span>
              {totalPages > 1 && (
                <span className="text-slate-400 ml-1">
                  (Page {safePage} of {totalPages})
                </span>
              )}
            </div>

            {/* View Mode Toggle Buttons */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-600 text-xs">
              <button
                type="button"
                onClick={() => setViewMode("auto")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  viewMode === "auto"
                    ? "bg-white text-slate-900 font-bold shadow-xs"
                    : "hover:text-slate-900"
                }`}
                title="Responsive mode (Cards on mobile/tablet, Table on desktop)"
              >
                Auto
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 ${
                  viewMode === "table"
                    ? "bg-white text-slate-900 font-bold shadow-xs"
                    : "hover:text-slate-900"
                }`}
                title="Force Table View"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span className="hidden sm:inline">Table</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("cards")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 ${
                  viewMode === "cards"
                    ? "bg-white text-slate-900 font-bold shadow-xs"
                    : "hover:text-slate-900"
                }`}
                title="Force Cards View"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span className="hidden sm:inline">Cards</span>
              </button>
            </div>
          </div>
        </div>

        {/* Department / Track Pills (Scrollable horizontally on mobile) */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { key: "all", label: "All Tracks" },
            { key: "frontend", label: "Frontend & Full-Stack" },
            { key: "ai", label: "AI & Data" },
            { key: "cloud", label: "Cloud & DevOps" },
            { key: "mobile", label: "Mobile" },
            { key: "design", label: "Design" },
          ].map((dept) => (
            <button
              key={dept.key}
              onClick={() => setSelectedDepartment(dept.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                selectedDepartment === dept.key
                  ? "bg-blue-50 text-[#0066ff] border border-blue-200 font-bold shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200"
              }`}
            >
              {dept.label}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredJobs.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No matching positions found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchQuery
                ? `No positions match your search query "${searchQuery}".`
                : "There are currently no job positions in this track."}
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/dashboard/jobs/create"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#0066ff] hover:bg-[#0052cc] text-white shadow-xs transition-all"
            >
              <span>+ Create First Position</span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* ========================================================================= */}
          {/* 1. RESPONSIVE MOBILE & TABLET CARDS VIEW                                 */}
          {/* Visible on screens < lg (or when user selects 'cards' mode)              */}
          {/* ========================================================================= */}
          <div
            className={`space-y-4 ${
              viewMode === "table" ? "hidden" : viewMode === "cards" ? "block" : "block lg:hidden"
            }`}
          >
            {paginatedJobs.map((job, idx) => {
              const jobId = job._id || job.id || `job-card-${idx}`;
              return (
                <div
                  key={jobId}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all space-y-3.5"
                >
                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#0066ff] border border-blue-200 font-mono text-[10px] font-bold">
                      {job.levelBadge}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-mono text-[10px] font-medium">
                      {job.department}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 font-mono text-[10px]">
                      {job.locationBadge}
                    </span>
                  </div>

                  {/* Title & Salary */}
                  <div>
                    <Link
                      href={`/dashboard/jobs/view/${jobId}`}
                      className="font-bold text-slate-900 hover:text-[#0066ff] transition-colors text-base sm:text-lg block"
                    >
                      {job.title}
                    </Link>
                    <div className="font-mono font-bold text-emerald-700 text-xs sm:text-sm mt-1">
                      {job.salary}
                    </div>
                  </div>

                  {/* Short Summary */}
                  {job.shortSummary && (
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                      {job.shortSummary}
                    </p>
                  )}

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.techStack.slice(0, 5).map((tech, idx) => (
                      <span
                        key={`${tech}-${idx}`}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-mono font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {job.techStack.length > 5 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-slate-50 text-slate-400 border border-slate-200 text-[10px] font-mono">
                        +{job.techStack.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons: Full-width, Touch-Friendly */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                    <Link
                      href={`/dashboard/jobs/view/${jobId}`}
                      className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 text-center"
                    >
                      <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>View</span>
                    </Link>

                    <Link
                      href={`/dashboard/jobs/edit/${jobId}`}
                      className="py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0066ff] border border-blue-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 text-center"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Edit</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => setDeletingJob(job)}
                      className="py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 text-center"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Mobile Card Pagination Bar Inside List */}
            {totalPages > 1 && (
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between gap-2">
                <div className="text-xs text-slate-500 font-mono">
                  {(safePage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(safePage * ITEMS_PER_PAGE, filteredJobs.length)} of {filteredJobs.length}
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={safePage <= 1}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
                  >
                    ← Prev
                  </button>
                  <span className="text-xs font-mono font-bold text-[#0066ff] px-2">
                    {safePage} / {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={safePage >= totalPages}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* 2. DESKTOP DATA TABLE VIEW                                               */}
          {/* Visible on screens lg+ (or when user selects 'table' mode)               */}
          {/* Guaranteed min-width so columns & action buttons NEVER get clipped       */}
          {/* ========================================================================= */}
          <div
            className={`bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden ${
              viewMode === "cards" ? "hidden" : viewMode === "table" ? "block" : "hidden lg:block"
            }`}
          >
            {/* Scroll Container with visual scrollbar cue */}
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[980px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 px-6 min-w-[260px]">Role Title</th>
                    <th className="py-3.5 px-4 min-w-[150px]">Track</th>
                    <th className="py-3.5 px-4 min-w-[160px]">Level &amp; Location</th>
                    <th className="py-3.5 px-4 min-w-[140px]">Compensation</th>
                    <th className="py-3.5 px-4 min-w-[160px]">Tech Stack</th>
                    <th className="py-3.5 px-6 min-w-[200px] text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {paginatedJobs.map((job, idx) => {
                    const jobId = job._id || job.id || `job-table-${idx}`;
                    return (
                      <tr key={jobId} className="hover:bg-slate-50/80 transition-colors group">
                        {/* Role Title */}
                        <td className="py-4 px-6 min-w-[260px]">
                          <Link
                            href={`/dashboard/jobs/view/${jobId}`}
                            className="font-bold text-slate-900 group-hover:text-[#0066ff] transition-colors block text-sm"
                          >
                            {job.title}
                          </Link>
                          <span className="text-[11px] text-slate-400 font-mono mt-0.5 block truncate max-w-xs">
                            {job.shortSummary || "No summary provided"}
                          </span>
                        </td>

                        {/* Track */}
                        <td className="py-4 px-4 min-w-[150px]">
                          <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-mono font-medium whitespace-nowrap">
                            {job.department}
                          </span>
                        </td>

                        {/* Level & Location */}
                        <td className="py-4 px-4 min-w-[160px] space-y-1">
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-[#0066ff] border border-blue-200 font-mono text-[10px] font-bold block w-fit whitespace-nowrap">
                            {job.levelBadge}
                          </span>
                          <span className="text-[11px] text-slate-500 block truncate max-w-[150px]">
                            {job.locationBadge}
                          </span>
                        </td>

                        {/* Compensation */}
                        <td className="py-4 px-4 min-w-[140px] font-mono font-bold text-emerald-700 whitespace-nowrap">
                          {job.salary}
                        </td>

                        {/* Tech Stack */}
                        <td className="py-4 px-4 min-w-[160px]">
                          <div className="flex flex-wrap gap-1 max-w-[180px]">
                            {job.techStack.slice(0, 3).map((t, idx) => (
                              <span
                                key={`${t}-${idx}`}
                                className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-mono whitespace-nowrap"
                              >
                                {t}
                              </span>
                            ))}
                            {job.techStack.length > 3 && (
                              <span className="text-[10px] font-mono text-slate-400 px-1 py-0.5">
                                +{job.techStack.length - 3}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Actions: Guaranteed non-clipping, high-contrast, easy to click */}
                        <td className="py-4 px-6 min-w-[200px] text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2 justify-end">
                            <Link
                              href={`/dashboard/jobs/view/${jobId}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 font-semibold transition-colors"
                              title="View Full Position Details"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              <span>View</span>
                            </Link>

                            <Link
                              href={`/dashboard/jobs/edit/${jobId}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0066ff] border border-blue-200 font-semibold transition-colors"
                              title="Edit Job Position"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              <span>Edit</span>
                            </Link>

                            <button
                              type="button"
                              onClick={() => setDeletingJob(job)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-semibold transition-colors"
                              title="Delete Job Position"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer Inside Card (1-10 to 11-20 Pagination) */}
            <div className="px-5 py-3.5 border-t border-slate-200/80 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-500 font-mono">
                Showing <strong className="text-slate-900">{(safePage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(safePage * ITEMS_PER_PAGE, filteredJobs.length)}</strong> of <strong className="text-slate-900">{filteredJobs.length}</strong> roles
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={safePage <= 1}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-35 disabled:cursor-not-allowed transition-all inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <span>←</span>
                    <span>
                      {safePage > 1
                        ? `Prev (${(safePage - 2) * ITEMS_PER_PAGE + 1}–${(safePage - 1) * ITEMS_PER_PAGE})`
                        : "Prev"}
                    </span>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                          safePage === pageNum
                            ? "bg-[#0066ff] text-white shadow-xs"
                            : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={safePage >= totalPages}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-35 disabled:cursor-not-allowed transition-all inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <span>
                      {safePage < totalPages
                        ? `Next (${safePage * ITEMS_PER_PAGE + 1}–${Math.min((safePage + 1) * ITEMS_PER_PAGE, filteredJobs.length)})`
                        : "Next"}
                    </span>
                    <span>→</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deletingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 space-y-5">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Delete Job Position</h3>
                <p className="text-xs text-slate-500">Confirm permanent removal.</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <p className="font-bold text-slate-900">{deletingJob.title}</p>
              <p className="text-slate-500">{deletingJob.department} · {deletingJob.locationBadge}</p>
            </div>

            <p className="text-xs text-slate-600">
              Are you sure you want to delete this position? It will be removed immediately from both Admin and public Careers pages.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingJob(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-xs"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

