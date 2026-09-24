"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { JobPosition } from "@/data/careersData";
import { getAdminJobByIdAPI, deleteJobAPI } from "@/api/job_api";
import { getJobById, deleteJob } from "@/utils/jobsStorage";

interface ViewJobProps {
  params?: Promise<{ id: string }>;
}

export default function DashboardViewJobPage({ params }: ViewJobProps) {
  const router = useRouter();
  const routeParams = useParams();
  const resolvedParams = params ? use(params) : null;
  const rawId = (routeParams?.id as string) || resolvedParams?.id || "";
  const jobId = decodeURIComponent(rawId);

  const [job, setJob] = useState<JobPosition | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true);
      console.log("📡 [ViewJobPage] Fetching job details via getAdminJobByIdAPI...", jobId);
      try {
        const apiRes = await getAdminJobByIdAPI(jobId);
        console.log("✅ [ViewJobPage] Live Backend API Response:", apiRes);
        if (apiRes.data) {
          setJob(apiRes.data);
          setIsLoading(false);
          return;
        }
      } catch (err: any) {
        console.warn("⚠️ [ViewJobPage] API fetch warning, checking local storage:", err.message);
      }
      const loadedJob = getJobById(jobId);
      setJob(loadedJob);
      setIsLoading(false);
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const handleDelete = async () => {
    if (!job) return;
    setIsDeleting(true);

    try {
      await deleteJobAPI(job._id || job.id);
    } catch (err: any) {
      console.warn("⚠️ [ViewJobPage] Live deleteJobAPI warning:", err.message);
    }
    deleteJob(job.id);
    setIsDeleting(false);
    router.push("/dashboard/jobs");
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#0066ff] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-slate-400">Loading Job Specifications...</span>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-4 max-w-lg mx-auto my-12 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-slate-900">Job Position Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested position <code className="text-slate-800 font-mono">"{jobId}"</code> was not found.
        </p>
        <div className="pt-2">
          <Link
            href="/dashboard/jobs"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            ← Return to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const targetId = job._id || job.id || "";
  const responsibilities = job.keyResponsibilities || job.responsibilities || [];
  const requirements = job.mustHaveRequirements || job.requirements || [];
  const niceToHave = job.niceToHaveQualifications || job.niceToHave || [];
  const benefits = Array.isArray(job.benefits) ? job.benefits : [];
  const techStack = Array.isArray(job.techStack) ? job.techStack : [];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link href="/dashboard" className="hover:text-slate-600">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/dashboard/jobs" className="hover:text-slate-600">
          Jobs
        </Link>
        <span>/</span>
        <span className="text-[#0066ff] font-semibold">{job.title}</span>
      </nav>

      {/* Header Banner (White Theme) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-md bg-blue-50 text-[#0066ff] border border-blue-200 font-bold">
                {job.seniorityLevel || job.levelBadge || "SENIOR"}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                {job.locationBadge || "REMOTE"}
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                {job.departmentTrack || job.department || "Engineering"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {job.title}
            </h1>
            <div className="text-sm font-mono font-bold text-emerald-700">
              {job.compensation || job.salary || "Competitive"}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
            <Link
              href="/careers"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors flex items-center gap-1.5"
            >
              <span>View Public</span>
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>

            <Link
              href={`/dashboard/jobs/edit/${targetId}`}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0066ff] hover:bg-[#0052cc] text-white shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit Job</span>
            </Link>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Short Summary */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
          "{job.shortSummary || job.aboutRole}"
        </div>

        {/* Tech Stack */}
        {techStack.length > 0 && (
          <div className="pt-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">
              Targeted Tech Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, idx) => (
                <span
                  key={`${tech}-${idx}`}
                  className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-[#0066ff] text-xs font-mono font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* About the Role */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[#0066ff]">✦</span>
              <span>About The Role</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {job.aboutRole || job.shortSummary}
            </p>
          </div>

          {/* Key Responsibilities */}
          {responsibilities.length > 0 && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#0066ff]">✦</span>
                <span>Key Responsibilities</span>
                <span className="text-xs font-mono text-slate-400 font-normal">
                  ({responsibilities.length})
                </span>
              </h2>
              <ul className="space-y-3">
                {responsibilities.map((resp: string, i: number) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0066ff] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {requirements.length > 0 && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                <span>Must-Have Requirements</span>
                <span className="text-xs font-mono text-slate-400 font-normal">
                  ({requirements.length})
                </span>
              </h2>
              <ul className="space-y-3">
                {requirements.map((req: string, i: number) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-3">
                    <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Nice to Have */}
          {niceToHave.length > 0 && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#0066ff]">★</span>
                <span>Nice-to-Have Bonus Qualifications</span>
                <span className="text-xs font-mono text-slate-400 font-normal">
                  ({niceToHave.length})
                </span>
              </h2>
              <ul className="space-y-2.5">
                {niceToHave.map((nth: string, i: number) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-600 flex items-start gap-2.5">
                    <span className="text-[#0066ff] font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{nth}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column (1 Col) */}
        <div className="space-y-6">
          {/* Benefits */}
          {benefits.length > 0 && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="text-purple-600">🎁</span>
                <span>Benefits &amp; Perks</span>
              </h2>
              <ul className="space-y-3">
                {benefits.map((benefit, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start gap-2.5">
                    <span className="text-purple-500 font-bold mt-0.5">▪</span>
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Metadata Card */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              Position Metadata
            </h3>
            <div className="space-y-2 font-mono text-[11px] text-slate-500">
              <div className="flex justify-between border-b border-slate-200/60 pb-1">
                <span>Internal ID:</span>
                <span className="text-slate-800 truncate max-w-[150px]">{targetId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1">
                <span>Track:</span>
                <span className="text-slate-800">{job.departmentTrack || job.department || "Engineering"}</span>
              </div>
              <div className="flex justify-between">
                <span>Public URL:</span>
                <Link href="/careers" target="_blank" className="text-[#0066ff] hover:underline font-bold">
                  /careers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
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

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-900">"{job.title}"</strong>? It will immediately stop appearing on the careers page.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-xs"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete Position"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
