"use client";

import React, { useState, useEffect, use } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { JobPosition } from "@/data/careersData";
import { getAdminJobByIdAPI, updateJobAPI } from "@/api/job_api";
import { getJobById, updateJob } from "@/utils/jobsStorage";
import { JobFormWhite } from "../../../components/JobForm";

interface EditJobProps {
  params?: Promise<{ id: string }>;
}

export default function DashboardEditJobPage({ params }: EditJobProps) {
  const routeParams = useParams();
  const resolvedParams = params ? use(params) : null;
  const rawId = (routeParams?.id as string) || resolvedParams?.id || "";
  const jobId = decodeURIComponent(rawId);

  const [job, setJob] = useState<JobPosition | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true);
      console.log("📡 [EditJobPage] Fetching job details via getAdminJobByIdAPI...", jobId);
      try {
        const apiRes = await getAdminJobByIdAPI(jobId);
        console.log("✅ [EditJobPage] Live Backend API Response:", apiRes);
        if (apiRes.data) {
          setJob(apiRes.data);
          setIsLoading(false);
          return;
        }
      } catch (err: any) {
        console.warn("⚠️ [EditJobPage] API fetch warning, checking local storage:", err.message);
      }
      const loadedJob = getJobById(jobId);
      setJob(loadedJob);
      setIsLoading(false);
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const handleUpdateJob = async (updatedJobData: JobPosition) => {
    if (!job) return { success: false, error: "Original job not found." };
    const targetId = job._id || job.id;
    console.log("✏️ [EditJobPage] Updating job via updateJobAPI...", targetId, updatedJobData);

    try {
      const apiRes = await updateJobAPI(targetId, updatedJobData);
      console.log("✅ [EditJobPage] Live Backend updateJobAPI Response:", apiRes);
      return {
        success: true,
        id: apiRes.data?._id || targetId,
      };
    } catch (err: any) {
      console.warn("⚠️ [EditJobPage] Live updateJobAPI error:", err.message);
      const res = updateJob(job.id, updatedJobData);
      return {
        success: res.success,
        error: res.error,
        id: updatedJobData.id,
      };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#0066ff] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-slate-400">Loading Job Editor...</span>
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
          Cannot edit: The job position <code className="text-slate-800 font-mono">"{jobId}"</code> was not found.
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

  return (
    <div className="space-y-6">
      {/* Streamlined Top Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/dashboard" className="hover:text-slate-600 transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <Link href="/dashboard/jobs" className="hover:text-slate-600 transition-colors">
            Jobs
          </Link>
          <span>/</span>
          <Link href={`/dashboard/jobs/view/${job.id}`} className="hover:text-slate-600 transition-colors line-clamp-1 max-w-[200px]">
            {job.title}
          </Link>
          <span>/</span>
          <span className="text-[#0066ff] font-semibold">Edit</span>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/jobs/view/${job.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-colors"
            title="View Live Job"
          >
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>View</span>
          </Link>
          <Link
            href="/dashboard/jobs"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors"
          >
            <span>Cancel</span>
          </Link>
        </div>
      </div>

      {/* Form in white theme */}
      <JobFormWhite key={job._id || job.id} mode="edit" initialJob={job} onSubmit={handleUpdateJob} />
    </div>
  );
}
