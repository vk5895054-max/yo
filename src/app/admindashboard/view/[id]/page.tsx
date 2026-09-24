"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { JobPosition } from "@/data/careersData";
import { getJobById, deleteJob } from "@/utils/jobsStorage";

interface ViewJobProps {
  params?: Promise<{ id: string }>;
}

export default function ViewJobPage({ params }: ViewJobProps) {
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
    const loadedJob = getJobById(jobId);
    setJob(loadedJob);
    setIsLoading(false);
  }, [jobId]);

  const handleDelete = () => {
    if (!job) return;
    setIsDeleting(true);

    setTimeout(() => {
      deleteJob(job.id);
      setIsDeleting(false);
      router.push("/admindashboard");
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#ff5f2d] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-neutral-400">Loading Job Details...</span>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="p-12 rounded-3xl bg-[#12141c] border border-white/10 text-center space-y-4 max-w-lg mx-auto my-12">
        <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-white">Job Position Not Found</h2>
        <p className="text-xs text-neutral-400">
          The requested position <code className="text-neutral-300 font-mono">"{jobId}"</code> was not found or may have been deleted.
        </p>
        <div className="pt-2">
          <Link
            href="/admindashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-colors"
          >
            ← Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <Link href="/admindashboard" className="hover:text-white transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/admindashboard" className="hover:text-white transition-colors">
          Jobs
        </Link>
        <span>/</span>
        <span className="text-[#ff7849] font-semibold line-clamp-1">{job.title}</span>
      </nav>

      {/* Top Action Header */}
      <div className="p-6 rounded-3xl bg-[#12141c]/90 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 flex-1">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#ff5f2d]/15 text-[#ff7849] border border-[#ff5f2d]/30 font-semibold">
                {job.levelBadge}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 text-neutral-300 border border-white/10">
                {job.locationBadge}
              </span>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                {job.department}
              </span>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live on Careers
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {job.title}
            </h1>

            {/* Salary */}
            <div className="text-sm sm:text-base font-mono font-bold text-emerald-400">
              {job.salary}
            </div>
          </div>

          {/* Action Buttons Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5 pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
            <Link
              href="/careers"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <span>View Live</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>

            <Link
              href={`/admindashboard/edit/${job.id}`}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#ff5f2d] hover:bg-[#e54e1f] text-white shadow-lg shadow-[#ff5f2d]/25 transition-all flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit Job</span>
            </Link>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Short Summary Callout */}
        <div className="p-4 rounded-2xl bg-[#0a0b10] border border-white/10 text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
          "{job.shortSummary}"
        </div>

        {/* Tech Stack Pills */}
        <div className="pt-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block mb-2">
            Targeted Tech Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {job.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-[#ff5f2d]/10 border border-[#ff5f2d]/25 text-[#ff7849] text-xs font-mono font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Narrative & Requirements */}
        <div className="lg:col-span-2 space-y-6">
          {/* About the Role */}
          <div className="p-6 rounded-2xl bg-[#12141c]/90 border border-white/10 shadow-xl space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-[#ff5f2d]">✦</span>
              <span>About The Role</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
              {job.aboutRole}
            </p>
          </div>

          {/* Key Responsibilities */}
          <div className="p-6 rounded-2xl bg-[#12141c]/90 border border-white/10 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-[#ff5f2d]">✦</span>
              <span>Key Responsibilities</span>
              <span className="text-xs font-mono text-neutral-500 font-normal">
                ({(job.responsibilities || (job as any).keyResponsibilities || []).length})
              </span>
            </h2>
            <ul className="space-y-3">
              {(job.responsibilities || (job as any).keyResponsibilities || []).map((resp, i) => (
                <li key={i} className="text-xs sm:text-sm text-neutral-300 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#ff5f2d]/15 text-[#ff7849] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="p-6 rounded-2xl bg-[#12141c]/90 border border-white/10 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              <span>Must-Have Requirements</span>
              <span className="text-xs font-mono text-neutral-500 font-normal">
                ({(job.requirements || (job as any).mustHaveRequirements || []).length})
              </span>
            </h2>
            <ul className="space-y-3">
              {(job.requirements || (job as any).mustHaveRequirements || []).map((req, i) => (
                <li key={i} className="text-xs sm:text-sm text-neutral-300 flex items-start gap-3">
                  <svg
                    className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Nice to have (if any) */}
          {job.niceToHave && job.niceToHave.length > 0 && (
            <div className="p-6 rounded-2xl bg-[#12141c]/90 border border-white/10 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span className="text-[#ff7849]">★</span>
                <span>Nice-to-Have Bonus Qualifications</span>
                <span className="text-xs font-mono text-neutral-500 font-normal">
                  ({job.niceToHave.length})
                </span>
              </h2>
              <ul className="space-y-2.5">
                {job.niceToHave.map((nth, i) => (
                  <li key={i} className="text-xs sm:text-sm text-neutral-400 flex items-start gap-2.5">
                    <span className="text-[#ff7849] mt-0.5">•</span>
                    <span className="leading-relaxed">{nth}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column (1 Col): Benefits & Metadata */}
        <div className="space-y-6">
          {/* Benefits & Perks */}
          <div className="p-6 rounded-2xl bg-[#12141c]/90 border border-white/10 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-purple-400">🎁</span>
              <span>Benefits &amp; Perks</span>
            </h2>
            <ul className="space-y-3">
              {job.benefits.map((benefit, i) => (
                <li key={i} className="text-xs text-neutral-300 flex items-start gap-2.5">
                  <span className="text-purple-400 mt-0.5">▪</span>
                  <span className="leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Internal Metadata Card */}
          <div className="p-6 rounded-2xl bg-[#0a0b10] border border-white/10 text-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono">
              Role Metadata
            </h3>
            <div className="space-y-2 font-mono text-[11px] text-neutral-400">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Internal ID:</span>
                <span className="text-neutral-200 truncate max-w-[150px]">{job.id}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Slug:</span>
                <span className="text-neutral-200 truncate max-w-[150px]">{job.slug}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Department Key:</span>
                <span className="text-neutral-200">{job.departmentKey}</span>
              </div>
              <div className="flex justify-between">
                <span>Public Live URL:</span>
                <Link href="/careers" className="text-[#ff7849] hover:underline">
                  /careers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-[#12141c] border border-red-500/30 shadow-2xl p-6 space-y-5">
            <div className="flex items-center gap-3 text-red-400">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Delete Job Position</h3>
                <p className="text-xs text-neutral-400">This action will remove the position permanently.</p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Are you sure you want to delete <strong className="text-white">"{job.title}"</strong>? It will immediately stop appearing on the careers page.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25 transition-all flex items-center gap-2"
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
