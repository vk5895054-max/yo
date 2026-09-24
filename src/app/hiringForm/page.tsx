"use client";

import React from "react";
import Link from "next/link";
import { JobPosition } from "@/data/careersData";
import { createJobAPI } from "@/api/job_api";
import DashboardLayout from "../dashboard/layout";
import { JobFormWhite } from "../dashboard/components/JobForm";

export default function HiringFormPage() {
  const handleCreateJob = async (jobData: JobPosition) => {
    console.log("📝 [HiringFormPage] Sending payload to Live Backend API...", jobData);
    try {
      const apiResponse = await createJobAPI(jobData);
      console.log("🎉 [HiringFormPage] Live Backend API Response:", apiResponse);

      return {
        success: true,
        id: apiResponse.data?._id || jobData.id,
      };
    } catch (error: any) {
      console.error("❌ [HiringFormPage] Backend API Error:", error.message);
      return {
        success: false,
        error: error.message || "Failed to create job on server",
      };
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
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
          <span className="text-[#0066ff] font-semibold">Post New Job</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Post New Job Opening
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Specify candidate requirements, compensation packages, and responsibilities. Preview all data in real-time below.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/jobs"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-colors w-fit"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>View All Jobs</span>
            </Link>
          </div>
        </div>

        {/* Full Form with Complete Live Public Card Preview */}
        <JobFormWhite mode="create" onSubmit={handleCreateJob} />
      </div>
    </DashboardLayout>
  );
}
