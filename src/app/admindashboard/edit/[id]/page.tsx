"use client";

import React, { useState, useEffect, use } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { JobPosition } from "@/data/careersData";
import { getJobById, updateJob } from "@/utils/jobsStorage";
import { JobForm } from "../../components/JobForm";

interface EditJobProps {
  params?: Promise<{ id: string }>;
}

export default function EditJobPage({ params }: EditJobProps) {
  const routeParams = useParams();
  const resolvedParams = params ? use(params) : null;
  const rawId = (routeParams?.id as string) || resolvedParams?.id || "";
  const jobId = decodeURIComponent(rawId);

  const [job, setJob] = useState<JobPosition | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedJob = getJobById(jobId);
    setJob(loadedJob);
    setIsLoading(false);
  }, [jobId]);

  const handleUpdateJob = async (updatedJobData: JobPosition) => {
    if (!job) return { success: false, error: "Original job not found." };
    const res = updateJob(job.id, updatedJobData);
    return {
      success: res.success,
      error: res.error,
      id: updatedJobData.id,
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#ff5f2d] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-neutral-400">Loading Job Editor...</span>
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
          Cannot edit: The job position <code className="text-neutral-300 font-mono">"{jobId}"</code> was not found.
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
    <div className="space-y-6">
      {/* Streamlined Top Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
        <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Link href="/admindashboard" className="hover:text-white transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <Link href={`/admindashboard/view/${job.id}`} className="hover:text-white transition-colors line-clamp-1 max-w-[200px]">
            {job.title}
          </Link>
          <span>/</span>
          <span className="text-[#ff7849] font-semibold">Edit</span>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={`/admindashboard/view/${job.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <span>View Details</span>
          </Link>
          <Link
            href="/admindashboard"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            <span>Cancel</span>
          </Link>
        </div>
      </div>

      {/* Form Component in edit mode */}
      <JobForm key={job._id || job.id} mode="edit" initialJob={job} onSubmit={handleUpdateJob} />
    </div>
  );
}
