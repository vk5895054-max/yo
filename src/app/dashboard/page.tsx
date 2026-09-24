"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { JobPosition } from "@/data/careersData";
import { getAdminJobsAPI, deleteJobAPI } from "@/api/job_api";
import { getAdminContactsAPI } from "@/api/contact_api";
import { getAdminApplicationsAPI } from "@/api/application_api";
import { getAllApplications, resetApplicationsToDefault, JobApplication } from "@/utils/applicationsStorage";
import { normalizeBackendJob, resetJobsToDefault } from "@/utils/jobsStorage";

export default function DashboardOverviewPage() {
  const [jobs, setJobs] = useState<JobPosition[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [deletingJob, setDeletingJob] = useState<JobPosition | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const refreshJobs = async () => {
      console.log("📡 [Dashboard] Fetching live jobs via getAdminJobsAPI...");
      try {
        const apiRes = await getAdminJobsAPI();
        console.log("✅ [Dashboard] Live Backend API Response:", apiRes);
        if (Array.isArray(apiRes.data)) {
          setJobs(apiRes.data.map(normalizeBackendJob));
        } else {
          setJobs([]);
        }
      } catch (err: any) {
        console.error("❌ [Dashboard] Live API fetch error:", err.message);
        setJobs([]);
      }
    };

    const refreshApps = async () => {
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

      setApplications([...contactsList, ...Array.from(mergedMap.values())]);
    };

    refreshJobs();
    refreshApps();

    window.addEventListener("vexus_jobs_updated", refreshJobs);
    window.addEventListener("vexus_applications_updated", refreshApps);
    window.addEventListener("storage", refreshApps);
    return () => {
      window.removeEventListener("vexus_jobs_updated", refreshJobs);
      window.removeEventListener("vexus_applications_updated", refreshApps);
      window.removeEventListener("storage", refreshApps);
    };
  }, []);

  const contactApps = useMemo(() => {
    return applications.filter((app) => !app.jobTitle && !app.resumeFileName && !app.resumeDataUrl && !app.portfolioUrl);
  }, [applications]);

  const hiringApps = useMemo(() => {
    return applications.filter((app) => Boolean(app.jobTitle || app.resumeFileName || app.resumeDataUrl || app.portfolioUrl));
  }, [applications]);

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

  // Pagination Configuration: 10 items each
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDepartment]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / ITEMS_PER_PAGE));
  const safePage = Math.max(1, Math.min(currentPage, totalPages));

  const paginatedJobs = useMemo(() => {
    const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredJobs, safePage]);

  const stats = useMemo(() => {
    const total = jobs.length;
    const departments = new Set(jobs.map((j) => j.departmentKey)).size;
    const remote = jobs.filter((j) =>
      j.locationBadge.toLowerCase().includes("remote")
    ).length;
    const custom = jobs.length;

    return { total, departments, remote, custom };
  }, [jobs]);

  const handleConfirmDelete = async () => {
    if (!deletingJob) return;
    setIsDeleting(true);
    const targetId = deletingJob._id || deletingJob.id;
    console.log("🗑️ [Dashboard] Deleting job via deleteJobAPI...", targetId, deletingJob.title);

    try {
      const apiRes = await deleteJobAPI(targetId);
      console.log("✅ [Dashboard] Live Backend deleteJobAPI Response:", apiRes);
      setJobs((prev) => prev.filter((j) => (j._id || j.id) !== targetId));
      setToastMessage(`Job "${deletingJob.title}" removed successfully.`);
    } catch (err: any) {
      console.error("❌ [Dashboard] Live deleteJobAPI Error:", err.message);
      setToastMessage(`Failed to delete job: ${err.message}`);
    } finally {
      setIsDeleting(false);
      setDeletingJob(null);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleResetDefaults = () => {
    if (confirm("Reset all jobs and applications to default demo data?")) {
      resetJobsToDefault();
      resetApplicationsToDefault();
      setToastMessage("All data reset to default.");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-900 text-white text-xs font-medium shadow-2xl flex items-center gap-3 border border-slate-700 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
            <span className="text-[#0066ff] font-semibold">System Dashboard</span>
            <span>/</span>
            <span>Overview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Enterprise Architecture Control
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage active roles, inspect specifications, and publish new openings across Vexus Lab.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 transition-colors shadow-xs"
          >
            Restore Defaults
          </button>
          <Link
            href="/dashboard/jobs/create"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0066ff] hover:bg-[#0052cc] text-white shadow-xs shadow-blue-500/25 transition-all flex items-center gap-2 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            <span>Create New Job</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row (White Theme - Separate Contact Inquiries & Hiring Details) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Positions */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs relative overflow-hidden">
          <div className="text-slate-500 text-xs font-mono font-bold uppercase tracking-wider">
            Total Positions
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
            {stats.total}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">Published on Careers</div>
        </div>

        {/* Card 2: Contact Inquiries */}
        <Link
          href="/dashboard/applications?type=contacts"
          className="p-5 rounded-2xl bg-white hover:bg-blue-50/20 border border-slate-200/90 hover:border-blue-300 shadow-xs relative overflow-hidden group transition-all"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-bold uppercase tracking-wider">
            <span>Contact Inquiries</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-[#0066ff]">
              Form
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-[#0066ff] mt-1 tracking-tight transition-colors">
            {contactApps.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono flex items-center justify-between">
            <span>View Inquiries</span>
            <span className="text-[#0066ff] font-bold">View List →</span>
          </div>
        </Link>

        {/* Card 3: Candidate Hiring Details */}
        <Link
          href="/dashboard/applications?type=hiring"
          className="p-5 rounded-2xl bg-white hover:bg-emerald-50/20 border border-slate-200/90 hover:border-emerald-300 shadow-xs relative overflow-hidden group transition-all"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-bold uppercase tracking-wider">
            <span>Hiring Details</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
              Resumes
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-emerald-600 mt-1 tracking-tight transition-colors">
            {hiringApps.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono flex items-center justify-between">
            <span>View Candidates</span>
            <span className="text-emerald-600 font-bold">View List →</span>
          </div>
        </Link>

        {/* Card 4: Engineering Tracks */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs relative overflow-hidden">
          <div className="text-slate-500 text-xs font-mono font-bold uppercase tracking-wider">
            Engineering Tracks
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
            {stats.departments}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">Frontend, AI, Cloud, etc.</div>
        </div>

        {/* Card 5: Public Status */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs relative overflow-hidden">
          <div className="text-slate-500 text-xs font-mono font-bold uppercase tracking-wider">
            Public Status
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight flex items-center gap-2">
            <span>Live</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">Synced to /careers</div>
        </div>
      </div>

      {/* Filter & Search Card */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title, technology, location, or department..."
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

          <div className="text-xs font-mono text-slate-500 flex items-center justify-between md:justify-end gap-2">
            <span>Showing:</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
              {filteredJobs.length} roles
              {totalPages > 1 && ` (Page ${safePage}/${totalPages})`}
            </span>
          </div>
        </div>

        {/* Department Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          {[
            { key: "all", label: "All Departments" },
            { key: "frontend", label: "Frontend & Full-Stack" },
            { key: "ai", label: "AI & Data" },
            { key: "cloud", label: "Cloud & DevOps" },
            { key: "mobile", label: "Mobile" },
            { key: "design", label: "Design Engineering" },
          ].map((dept) => {
            const count =
              dept.key === "all"
                ? jobs.length
                : jobs.filter((j) => j.departmentKey === dept.key).length;

            return (
              <button
                key={dept.key}
                onClick={() => setSelectedDepartment(dept.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  selectedDepartment === dept.key
                    ? "bg-blue-50 text-[#0066ff] border border-blue-200 font-bold shadow-xs"
                    : "bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
                }`}
              >
                <span>{dept.label}</span>
                <span className="text-[10px] font-mono opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No positions found</h3>
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
          <div className="space-y-4">
          {paginatedJobs.map((job, idx) => {
            const jobId = job._id || job.id || `job-${idx}`;
            const deptText = job.departmentTrack || job.department || "Engineering";
            const levelText = job.seniorityLevel || job.levelBadge || "SENIOR";
            const locationText = job.locationBadge || "REMOTE";
            const salaryText = job.compensation || job.salary || "Competitive";
            const summaryText = job.shortSummary || job.aboutRole || "";
            const techList = Array.isArray(job.techStack) ? job.techStack : [];

            return (
              <div
                key={jobId}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 transition-all shadow-xs group hover:shadow-sm"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Role Details */}
                  <div className="space-y-2.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-50 text-[#0066ff] border border-blue-200 font-bold">
                        {levelText}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                        {locationText}
                      </span>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                        {deptText}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#0066ff] transition-colors">
                        <Link href={`/dashboard/jobs/view/${jobId}`}>
                          {job.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {summaryText}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs pt-1">
                      <span className="font-mono font-bold text-emerald-700">
                        {salaryText}
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {techList.slice(0, 5).map((tech, techIdx) => (
                          <span
                            key={`${jobId}-${tech}-${techIdx}`}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {techList.length > 5 && (
                          <span className="text-[10px] font-mono text-slate-400">
                            +{techList.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 flex-shrink-0">
                    {/* View */}
                    <Link
                      href={`/dashboard/jobs/view/${jobId}`}
                      className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                      title="View Full Spec"
                    >
                      <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>View</span>
                    </Link>

                    {/* Edit */}
                    <Link
                      href={`/dashboard/jobs/edit/${jobId}`}
                      className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-[#0066ff] border border-blue-200 transition-colors flex items-center justify-center gap-1.5"
                      title="Edit Position"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Edit</span>
                    </Link>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => setDeletingJob(job)}
                      className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors flex items-center justify-center gap-1.5"
                      title="Delete Position"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          </div>

        {/* Pagination Bar Inside Roles Container */}
        {filteredJobs.length > 0 && totalPages > 1 && (
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500 font-mono">
              Showing <strong className="text-slate-900">{(safePage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(safePage * ITEMS_PER_PAGE, filteredJobs.length)}</strong> of <strong className="text-slate-900">{filteredJobs.length}</strong> roles
            </div>

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
          </div>
        )}
      </>
      )}

      {/* Delete Confirmation Modal (White Theme) */}
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
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
              <p className="font-bold text-slate-900">{deletingJob.title}</p>
              <p className="text-slate-500">{deletingJob.department} · {deletingJob.locationBadge}</p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to unpublish and delete this position? It will be removed immediately from the public Careers portal.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingJob(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-xs transition-all flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Yes, Delete Position</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
