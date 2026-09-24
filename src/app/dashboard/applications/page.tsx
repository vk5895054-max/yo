"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getAdminContactsAPI, getAdminContactByIdAPI, deleteAdminContactAPI } from "@/api/contact_api";
import { getAdminApplicationsAPI, getAdminApplicationByIdAPI, deleteAdminApplicationAPI } from "@/api/application_api";
import {
  JobApplication,
  getAllApplications,
  deleteApplication,
  resetApplicationsToDefault,
} from "@/utils/applicationsStorage";
import ResumeDocumentViewer from "@/components/ResumeDocumentViewer";

export default function ApplicationsPage() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const [activeTab, setActiveTab] = useState<"contacts" | "hiring">("contacts");
  const [applications, setApplications] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] = useState<any | null>(null);
  const [deletingApp, setDeletingApp] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [viewingResume, setViewingResume] = useState<{
    fileName: string;
    fileSize: string;
    dataUrl?: string;
    candidateName: string;
    jobTitle: string;
    department: string;
    email: string;
    phone: string;
    message?: string;
  } | null>(null);

  // Pagination Configuration: Exactly 10 items per page
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (typeParam === "hiring") {
      setActiveTab("hiring");
    } else if (typeParam === "contacts") {
      setActiveTab("contacts");
    }
  }, [typeParam]);

  useEffect(() => {
    const refresh = async () => {
      console.log("📡 [ApplicationsPage] Fetching submissions via getAdminContactsAPI & getAdminApplicationsAPI...");
      let contactsList: any[] = [];
      let apiHiringList: any[] = [];

      try {
        const apiRes = await getAdminContactsAPI();
        if (apiRes.data && Array.isArray(apiRes.data)) {
          contactsList = apiRes.data;
        }
      } catch (err: any) {
        console.warn("⚠️ [ApplicationsPage] Live Contact API fetch warning:", err.message);
      }

      try {
        const hiringRes = await getAdminApplicationsAPI();
        if (hiringRes.data && Array.isArray(hiringRes.data)) {
          apiHiringList = hiringRes.data;
        }
      } catch (err: any) {
        console.warn("⚠️ [ApplicationsPage] Live Application API fetch warning:", err.message);
      }

      const localHiringList = getAllApplications();
      // Merge live API candidates and local candidates without duplicating
      const mergedMap = new Map();
      [...apiHiringList, ...localHiringList].forEach((item) => {
        const key = item._id || item.id;
        if (key && !mergedMap.has(key)) {
          mergedMap.set(key, item);
        }
      });

      setApplications([...contactsList, ...Array.from(mergedMap.values())]);
    };

    refresh();

    window.addEventListener("vexus_applications_updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("vexus_applications_updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const contactApps = useMemo(() => {
    return applications.filter((app) => !app.jobTitle && !app.resumeFileName && !app.resumeDataUrl && !app.portfolioUrl);
  }, [applications]);

  const hiringApps = useMemo(() => {
    return applications.filter((app) => Boolean(app.jobTitle || app.resumeFileName || app.resumeDataUrl || app.portfolioUrl));
  }, [applications]);

  const activeAppsList = activeTab === "hiring" ? hiringApps : contactApps;

  // Filtered applications (by search & department)
  const filteredApps = useMemo(() => {
    return activeAppsList.filter((app) => {
      const dept = app.department || "Contact Form";
      const matchesDept = selectedDepartment === "all" || dept === selectedDepartment;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesDept;

      const name = `${app.firstName || ''} ${app.lastName || ''}`.trim() || app.candidateName || app.fullName || '';
      const matchesName = name.toLowerCase().includes(q);
      const matchesEmail = (app.email || '').toLowerCase().includes(q);
      const matchesPhone = (app.phone || '').toLowerCase().includes(q);
      const matchesMessage = (app.message || app.candidateNote || '').toLowerCase().includes(q);
      const matchesJob = (app.jobTitle || '').toLowerCase().includes(q);
      const matchesRef = (app._id || app.id || '').toLowerCase().includes(q);

      return matchesDept && (matchesName || matchesEmail || matchesPhone || matchesMessage || matchesJob || matchesRef);
    });
  }, [activeAppsList, searchQuery, selectedDepartment]);

  // Reset to page 1 on filter or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDepartment]);

  const totalPages = Math.max(1, Math.ceil(filteredApps.length / ITEMS_PER_PAGE));
  const safePage = Math.max(1, Math.min(currentPage, totalPages));

  const paginatedApps = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredApps.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredApps, safePage]);

  const handleConfirmDelete = async () => {
    if (!deletingApp) return;
    const targetId = deletingApp._id || deletingApp.id;
    const isHiring = Boolean(deletingApp.jobTitle || deletingApp.resumeFileName || deletingApp.resumeDataUrl || deletingApp.portfolioUrl);

    console.log(`🗑️ [ApplicationsPage] Deleting ${isHiring ? "hiring application" : "contact submission"}...`, targetId);

    try {
      if (isHiring) {
        await deleteAdminApplicationAPI(targetId);
        deleteApplication(targetId);
      } else {
        await deleteAdminContactAPI(targetId);
      }
    } catch (err: any) {
      console.warn("⚠️ [ApplicationsPage] API delete warning:", err.message);
      if (isHiring) deleteApplication(targetId);
    }

    setApplications((prev) => prev.filter((a) => (a._id || a.id) !== targetId));
    if ((selectedApplication?._id || selectedApplication?.id) === targetId) {
      setSelectedApplication(null);
    }
    setDeletingApp(null);
    setToastMessage("Record deleted successfully.");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResetDefaults = () => {
    if (confirm("Restore demo candidate applications?")) {
      resetApplicationsToDefault();
      setToastMessage("Candidate list reset to default.");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-full overflow-hidden font-sans">
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
            <span className="text-[#0066ff] font-semibold">
              {activeTab === "hiring" ? "Hiring Details" : "Contact Inquiries"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {activeTab === "hiring" ? "Candidate Hiring Details" : "Contact Inquiries"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {activeTab === "hiring"
              ? "Candidate applications submitted for specific engineering roles. Review resumes, portfolios, and candidate messages."
              : "Submissions from website contact forms. View visitor name, contact details, and inquiry messages."}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 transition-colors shadow-xs"
          >
            Reset Demo Data
          </button>
          <Link
            href="/careers"
            target="_blank"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0066ff] hover:bg-[#0052cc] text-white shadow-xs transition-all flex items-center gap-2"
          >
            <span>Open Public Careers</span>
            <span>↗</span>
          </Link>
        </div>
      </div>



      {/* Neat & Clean Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidate name, phone number, email, or role..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0066ff] bg-slate-50/50"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Track Filter */}
        <div className="w-full sm:w-auto flex items-center gap-2 flex-shrink-0">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 focus:outline-none focus:border-[#0066ff]"
          >
            <option value="all">All Tracks ({activeAppsList.length})</option>
            <option value="Frontend & Full-Stack">Frontend &amp; Full-Stack</option>
            <option value="AI & Data Engineering">AI &amp; Data Engineering</option>
            <option value="Cloud & DevOps">Cloud &amp; DevOps</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Design Engineering">Design Engineering</option>
          </select>
        </div>
      </div>

      {/* Main List Section */}
      {filteredApps.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {activeTab === "hiring" ? "No Candidate Hiring Applications Found" : "No Contact Inquiries Found"}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchQuery
                ? `No submissions match "${searchQuery}".`
                : activeTab === "hiring"
                  ? "There are currently no job candidate applications submitted."
                  : "There are currently no website contact form submissions."}
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* ========================================================================= */}
          {/* 1. MOBILE/TABLET CARD VIEW (< lg)                                        */}
          {/* ========================================================================= */}
          <div className="space-y-4 lg:hidden">
            {paginatedApps.map((app) => {
              const fullName = app.firstName && app.lastName ? `${app.firstName} ${app.lastName}` : (app.candidateName || `${app.firstName || ''} ${app.lastName || ''}`.trim() || 'Candidate');
              const appId = app._id || app.id || 'ref-id';
              const isContactInquiry = !app.resumeFileName && !app.resumeDataUrl;
              const jobTitleText = app.jobTitle || (app.country ? `Contact Inquiry (${app.country})` : 'General Contact Inquiry');
              const deptText = app.department || (app.country ? `Location: ${app.country}` : 'Website Submission');
              const dateText = app.createdAt ? new Date(app.createdAt).toLocaleDateString() : (app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'Recent');

              return (
                <div
                  key={appId}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs transition-all space-y-3.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-slate-900">{fullName}</h3>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${isContactInquiry
                          ? "bg-blue-50 text-[#0066ff] border-blue-100"
                          : "bg-emerald-50 text-emerald-700 border-emerald-100"
                          }`}>
                          {isContactInquiry ? "Contact Inquiry" : "Job Application"}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-600 mt-1">{jobTitleText}</p>
                      <span className="text-[10px] font-mono text-slate-400">{deptText}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md flex-shrink-0">
                      {dateText}
                    </span>
                  </div>

                  {/* Direct Call & Email Contact Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={`tel:${app.phone}`}
                      className="py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>📞 Call</span>
                      <span className="truncate">{app.phone}</span>
                    </a>
                    <a
                      href={`mailto:${app.email}`}
                      className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 truncate transition-colors"
                    >
                      <span>✉ Email</span>
                    </a>
                  </div>

                  {app.message && (
                    <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 leading-relaxed">
                      &ldquo;{app.message}&rdquo;
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
                    <div className="text-[10px] font-mono text-slate-400 truncate">
                      Status: <span className="font-bold uppercase text-slate-700">{app.status || 'new'}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={async () => {
                          if (app._id) {
                            try {
                              const apiRes = await getAdminContactByIdAPI(app._id);
                              setSelectedApplication(apiRes.data || app);
                              return;
                            } catch (e) { }
                          }
                          setSelectedApplication(app);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0066ff] font-bold text-xs border border-blue-200 inline-flex items-center gap-1.5 transition-colors"
                      >
                        <span className="text-sm"></span>
                        <span>View Details</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingApp(app)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Application"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Mobile Pagination Bar Inside Card List */}
            {totalPages > 1 && (
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between gap-2">
                <div className="text-xs text-slate-500 font-mono">
                  {(safePage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(safePage * ITEMS_PER_PAGE, filteredApps.length)} of {filteredApps.length}
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
                  <span className="text-xs font-mono font-bold text-[#ff5f2d] px-2">
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
          {/* 2. DESKTOP DATA TABLE (lg+)                                              */}
          {/* ========================================================================= */}
          <div className="hidden lg:block rounded-2xl bg-white border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[980px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 px-4">Candidate Name</th>
                    <th className="py-3.5 px-4">Direct Contact &amp; Call</th>
                    <th className="py-3.5 px-4">Role Applied</th>
                    <th className="py-3.5 px-4">Resume</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {paginatedApps.map((app) => {
                    const appId = app._id || app.id;
                    const fullName = app.firstName && app.lastName ? `${app.firstName} ${app.lastName}` : (app.candidateName || `${app.firstName || ''} ${app.lastName || ''}`.trim() || 'Candidate');
                    const hasResume = Boolean(app.resumeFileName || app.resumeDataUrl);
                    const jobTitleText = app.jobTitle || (app.country ? `Contact (${app.country})` : "General Contact Inquiry");
                    const deptText = app.department || (app.country ? `Location: ${app.country}` : "Website Submission");
                    const resumeName = app.resumeFileName || "Resume.pdf";
                    const resumeSize = app.resumeFileSize || "Document";
                    const dateText = app.createdAt || app.submittedAt ? new Date(app.createdAt || app.submittedAt).toLocaleDateString() : "N/A";

                    return (
                      <tr key={appId} className="hover:bg-slate-50/60 transition-colors">
                        {/* Candidate Name */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-900 text-sm">{fullName}</div>
                          <div className="text-slate-400 font-mono text-[10px] mt-0.5">Ref: {appId}</div>
                        </td>

                        {/* Direct Call & Email Contact */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${app.phone}`}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold border border-emerald-200 text-xs transition-colors"
                              title={`Click to call ${fullName} directly`}
                            >
                              <span>📞</span>
                              <span>{app.phone}</span>
                            </a>
                            <a
                              href={`mailto:${app.email}`}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-medium transition-colors"
                              title={`Click to email ${app.email}`}
                            >
                              <span>✉</span>
                              <span className="truncate max-w-[140px]">{app.email}</span>
                            </a>
                          </div>
                        </td>

                        {/* Position */}
                        <td className="py-4 px-4">
                          <div className="font-semibold text-slate-900">{jobTitleText}</div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">{deptText}</div>
                        </td>

                        {/* Resume or Note Attachment Indicator */}
                        <td className="py-4 px-4">
                          {hasResume ? (
                            <button
                              type="button"
                              onClick={() =>
                                setViewingResume({
                                  fileName: resumeName,
                                  fileSize: resumeSize,
                                  dataUrl: app.resumeDataUrl,
                                  candidateName: fullName,
                                  jobTitle: jobTitleText,
                                  department: deptText,
                                  email: app.email,
                                  phone: app.phone,
                                  message: app.message,
                                })
                              }
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-medium transition-colors cursor-pointer"
                              title="View Resume Document"
                            >
                              <span>📄</span>
                              <span className="truncate max-w-[120px] font-mono text-[11px]">{resumeName}</span>
                              <span className="text-[10px] text-slate-500 font-bold"> View</span>
                            </button>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-500 border border-slate-200/80 text-[11px] font-mono">
                              <span>💬</span>
                              <span>Direct Note</span>
                            </span>
                          )}
                        </td>

                        {/* Date */}
                        <td className="py-4 px-4 font-mono text-slate-500 text-[11px]">
                          <div>{dateText}</div>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedApplication(app)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0066ff] border border-blue-200 font-bold transition-colors text-xs shadow-2xs"
                              title="View Full Application Details"
                            >

                              <span>View</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setDeletingApp(app)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete Record"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
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
                Showing <strong className="text-slate-900">{(safePage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(safePage * ITEMS_PER_PAGE, filteredApps.length)}</strong> of <strong className="text-slate-900">{filteredApps.length}</strong> applications
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
                        className={`w-8 h-8 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${safePage === pageNum
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
                        ? `Next (${safePage * ITEMS_PER_PAGE + 1}–${Math.min((safePage + 1) * ITEMS_PER_PAGE, filteredApps.length)})`
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

      {/* ========================================================================= */}
      {/* CANDIDATE / CONTACT INQUIRY VIEW MODAL (CLEAN & PROFESSIONAL)             */}
      {/* ========================================================================= */}
      {selectedApplication && (() => {
        const firstName = selectedApplication.firstName || "";
        const lastName = selectedApplication.lastName || "";
        const fullName = firstName && lastName
          ? `${firstName} ${lastName}`
          : (selectedApplication.candidateName || `${firstName} ${lastName}`.trim() || "Contact Inquiry");

        const initials = (firstName.slice(0, 1) + lastName.slice(0, 1)).toUpperCase() || (fullName.slice(0, 2)).toUpperCase();

        const isContactInquiry = !selectedApplication.resumeFileName && !selectedApplication.resumeDataUrl;
        const countryText = selectedApplication.country || "Not specified";
        const dateText = selectedApplication.createdAt || selectedApplication.submittedAt
          ? new Date(selectedApplication.createdAt || selectedApplication.submittedAt).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short'
          })
          : "N/A";
        const appId = selectedApplication._id || selectedApplication.id || "N/A";

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-slate-200 shadow-xl p-6 space-y-5">
              {/* Modal Header */}
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-base font-bold text-slate-900 truncate">
                        {fullName}
                      </h2>
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${isContactInquiry
                        ? "bg-blue-50 text-[#0066ff] border border-blue-100"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        }`}>
                        {isContactInquiry ? "Contact Inquiry" : "Job Application"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Submitted {dateText}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedApplication(null)}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer flex-shrink-0"
                  title="Close modal"
                >
                  ✕
                </button>
              </div>

              {/* Contact Info Card */}
              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                {/* Email */}
                <div>
                  <span className="text-[11px] font-medium text-slate-400 block mb-0.5">Email Address</span>
                  <a
                    href={`mailto:${selectedApplication.email}`}
                    className="font-semibold text-slate-800 hover:text-[#0066ff] transition-colors truncate flex items-center gap-1.5"
                    title={`Send email to ${selectedApplication.email}`}
                  >
                    <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="truncate">{selectedApplication.email || "N/A"}</span>
                  </a>
                </div>

                {/* Phone */}
                <div>
                  <span className="text-[11px] font-medium text-slate-400 block mb-0.5">Phone Number</span>
                  <a
                    href={`tel:${selectedApplication.phone}`}
                    className="font-semibold text-slate-800 hover:text-[#0066ff] transition-colors truncate flex items-center gap-1.5"
                    title={`Call ${selectedApplication.phone}`}
                  >
                    <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="truncate">{selectedApplication.phone || "N/A"}</span>
                  </a>
                </div>

                {/* Country / Location */}
                <div>
                  <span className="text-[11px] font-medium text-slate-400 block mb-0.5">Location</span>
                  <span className="font-semibold text-slate-800 truncate flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{countryText}</span>
                  </span>
                </div>

                {/* Reference ID */}
                <div>
                  <span className="text-[11px] font-medium text-slate-400 block mb-0.5">Reference ID</span>
                  <span className="font-mono text-[11px] text-slate-500 truncate block">
                    #{appId}
                  </span>
                </div>
              </div>

              {/* Direct Quick Actions */}
              <div className="space-y-2">
                <a
                  href={`tel:${selectedApplication.phone}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0066ff] hover:bg-blue-600 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Call {selectedApplication.phone || "Candidate"}</span>
                </a>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedApplication.phone) {
                        navigator.clipboard?.writeText(selectedApplication.phone);
                        setCopiedPhone(true);
                        setTimeout(() => setCopiedPhone(false), 2000);
                      }
                    }}
                    className="py-2 px-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>{copiedPhone ? "Copied" : "Copy Phone"}</span>
                  </button>

                  <a
                    href={`https://wa.me/${(selectedApplication.phone || "").replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l.399.637-1.157 4.227 4.321-1.133.58.343z" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${selectedApplication.email}`}
                    className="py-2 px-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Email</span>
                  </a>
                </div>
              </div>

              {/* Inquiry Message / Cover Statement */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-medium text-slate-500 block">
                  {isContactInquiry ? "Inquiry Message" : "Candidate Cover Statement"}
                </span>
                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs text-slate-700 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap font-sans">
                  {selectedApplication.message || "(No message provided)"}
                </div>
              </div>

              {/* Resume Document (Render ONLY if a real file exists) */}
              {!isContactInquiry && (
                <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 truncate">
                        {selectedApplication.resumeFileName || "Resume_Document.pdf"}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {selectedApplication.resumeFileSize || "Document Attached"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setViewingResume({
                        fileName: selectedApplication.resumeFileName || "Resume_Document.pdf",
                        fileSize: selectedApplication.resumeFileSize || "File Preview",
                        dataUrl: selectedApplication.resumeDataUrl,
                        candidateName: fullName,
                        jobTitle: selectedApplication.jobTitle || "Job Application",
                        department: selectedApplication.department || "Application",
                        email: selectedApplication.email,
                        phone: selectedApplication.phone,
                        message: selectedApplication.message,
                      })
                    }
                    className="px-3.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0066ff] font-semibold text-xs border border-blue-200/70 transition-colors flex-shrink-0 inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>View Resume</span>
                  </button>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setDeletingApp(selectedApplication)}
                  className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete Record</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedApplication(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer shadow-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ========================================================================= */}
      {/* RESUME VIEWER MODAL (VIEW ONLY - NO DOWNLOAD)                              */}
      {/* ========================================================================= */}
      {viewingResume && (
        <ResumeDocumentViewer
          resume={viewingResume}
          onClose={() => setViewingResume(null)}
        />
      )}

      {/* Delete Confirmation Plain Alert Dialog */}
      {deletingApp && (() => {
        const delName = deletingApp.firstName && deletingApp.lastName
          ? `${deletingApp.firstName} ${deletingApp.lastName}`
          : (deletingApp.candidateName || "Candidate");
        const delRef = deletingApp._id || deletingApp.id || "";

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
            <div className="w-full max-w-sm rounded-2xl bg-white border border-slate-200 shadow-xl p-6 space-y-4">
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-slate-900">
                  Delete Record?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Are you sure you want to delete the record for <strong className="text-slate-900 font-semibold">{delName}</strong> <span className="text-slate-400 font-mono text-[11px]">(Ref: #{delRef})</span>? This action cannot be undone.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setDeletingApp(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer shadow-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
