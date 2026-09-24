"use client";

import React from "react";
import Link from "next/link";
import { JobPosition } from "@/data/careersData";
import { createJobAPI } from "@/api/job_api";
import { createJob } from "@/utils/jobsStorage";
import { JobFormWhite } from "../../components/JobForm";

export default function DashboardCreateJobPage() {
  const handleCreateJob = async (jobData: JobPosition) => {
    console.log("🚀 [CreateJobPage] Posting new job via createJobAPI...", jobData);
    try {
      const apiRes = await createJobAPI(jobData);
      console.log("✅ [CreateJobPage] Live Backend createJobAPI Response:", apiRes);
      createJob(jobData);
      return {
        success: true,
        data: apiRes.data,
        id: apiRes.data?._id || jobData.id,
      };
    } catch (err: any) {
      console.warn("⚠️ [CreateJobPage] Live createJobAPI notice:", err.message);
      const res = createJob(jobData);
      return {
        success: res.success,
        error: res.error,
        id: jobData.id,
      };
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link href="/dashboard" className="hover:text-slate-600">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/dashboard/jobs" className="hover:text-slate-600">
          Jobs
        </Link>
        <span>/</span>
        <span className="text-[#0066ff] font-semibold">Post New Job</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Post New Job Opening
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Specify candidate requirements, compensation packages, and responsibilities. Posts live immediately on the Careers portal.
          </p>
        </div>

        <Link
          href="/dashboard/jobs"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-colors w-fit"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to All Jobs</span>
        </Link>
      </div>

      {/* Form Component in clean white theme */}
      <JobFormWhite mode="create" onSubmit={handleCreateJob} />
    </div>
  );
}
