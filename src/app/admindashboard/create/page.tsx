"use client";

import React from "react";
import Link from "next/link";
import { JobPosition } from "@/data/careersData";
import { createJobAPI } from "@/api/job_api";
import { createJob } from "@/utils/jobsStorage";
import { JobForm } from "../components/JobForm";

export default function CreateJobPage() {
  const handleCreateJob = async (jobData: JobPosition) => {
    console.log("🚀 [AdminCreateJobPage] Posting new job via createJobAPI...", jobData);
    try {
      const apiRes = await createJobAPI(jobData);
      console.log("✅ [AdminCreateJobPage] Live Backend createJobAPI Response:", apiRes);
      createJob(jobData);
      return {
        success: true,
        data: apiRes.data,
        id: apiRes.data?._id || jobData.id,
      };
    } catch (err: any) {
      console.warn("⚠️ [AdminCreateJobPage] Live createJobAPI notice:", err.message);
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
        <span className="text-[#ff7849] font-semibold">Create New Job</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Create New Job Opening
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Specify requirements, compensation, and responsibilities. The posting goes live instantly on the Careers portal.
          </p>
        </div>

        <Link
          href="/admindashboard"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors w-fit"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to All Jobs</span>
        </Link>
      </div>

      {/* Form Component */}
      <JobForm mode="create" onSubmit={handleCreateJob} />
    </div>
  );
}
