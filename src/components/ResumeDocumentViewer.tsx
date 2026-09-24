"use client";

import React, { useEffect, useRef, useState } from "react";

export interface ResumeDocumentProps {
  fileName: string;
  fileSize?: string;
  dataUrl?: string;
  candidateName: string;
  jobTitle: string;
  department?: string;
  email?: string;
  phone?: string;
  message?: string;
}

interface Props {
  resume: ResumeDocumentProps;
  onClose: () => void;
}

export default function ResumeDocumentViewer({ resume, onClose }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeMobileTab, setActiveMobileTab] = useState<"document" | "candidate">("document");
  const [isLoading, setIsLoading] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(100);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const fileNameLower = (resume.fileName || "").toLowerCase();
  const isDocx =
    fileNameLower.endsWith(".docx") ||
    (resume.dataUrl && resume.dataUrl.includes("officedocument.wordprocessingml"));
  const isDoc = fileNameLower.endsWith(".doc") && !isDocx;
  const isPdf =
    fileNameLower.endsWith(".pdf") ||
    (resume.dataUrl && resume.dataUrl.startsWith("data:application/pdf"));
  const isImage =
    /\.(jpg|jpeg|png|webp|gif)$/i.test(fileNameLower) ||
    (resume.dataUrl && resume.dataUrl.startsWith("data:image/"));

  useEffect(() => {
    if (!isDocx || !resume.dataUrl) return;

    let isMounted = true;
    setIsLoading(true);
    setRenderError(null);

    const loadAndRenderDocx = async () => {
      try {
        let blob: Blob;

        if (resume.dataUrl!.startsWith("data:")) {
          const commaIndex = resume.dataUrl!.indexOf(",");
          if (commaIndex === -1) throw new Error("Invalid base64 document format");

          const base64Data = resume.dataUrl!.substring(commaIndex + 1);
          const binaryString = atob(base64Data);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          blob = new Blob([bytes], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
        } else if (resume.dataUrl!.startsWith("http://") || resume.dataUrl!.startsWith("https://")) {
          const response = await fetch(resume.dataUrl!);
          if (!response.ok) {
            throw new Error(`Failed to load document (${response.status})`);
          }
          blob = await response.blob();
        } else {
          throw new Error("Unsupported document source format");
        }

        if (!isMounted) return;

        const docx = await import("docx-preview");

        if (containerRef.current && isMounted) {
          containerRef.current.innerHTML = "";
          await docx.renderAsync(blob, containerRef.current, undefined, {
            className: "docx-clean-page",
            inWrapper: true,
            ignoreWidth: false,
            ignoreHeight: false,
            breakPages: true,
            renderHeaders: true,
            renderFooters: true,
          });
        }
      } catch (err: any) {
        console.warn("⚠️ [ResumeViewer] DOCX rendering notice:", err?.message || err);
        if (isMounted) {
          setRenderError(err?.message || "Could not format Word document.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadAndRenderDocx();

    return () => {
      isMounted = false;
    };
  }, [resume.dataUrl, isDocx]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 15, 160));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 15, 70));
  const handleZoomReset = () => setZoom(100);

  const cleanPhone = (resume.phone || "").replace(/[^0-9+]/g, "");

  // Optimal PDF viewer URL parameters to fit width and eliminate side dark bars
  const pdfViewerUrl = resume.dataUrl
    ? `${resume.dataUrl}#toolbar=0&navpanes=0&view=FitH,top`
    : "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Scoped CSS for DOCX and unified custom scrollbars */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .docx-clean-container .docx-wrapper {
          background: transparent !important;
          padding: 0 !important;
          margin: 0 auto !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          gap: 24px !important;
          width: 100% !important;
          max-width: 100% !important;
          overflow: visible !important;
        }
        .docx-clean-container .docx-wrapper > section.docx-clean-page {
          background: #ffffff !important;
          box-shadow: 0 12px 30px -4px rgba(15, 23, 42, 0.12), 0 2px 8px -2px rgba(15, 23, 42, 0.06) !important;
          border-radius: 6px !important;
          border: 1px solid rgba(226, 232, 240, 0.9) !important;
          margin: 0 auto !important;
          box-sizing: border-box !important;
          max-width: 100% !important;
          width: 100% !important;
          padding: 48px 52px !important;
          color: #0f172a !important;
          overflow: visible !important;
        }
        .docx-clean-container p {
          margin-bottom: 0.85em !important;
          line-height: 1.65 !important;
        }
        .clean-scroll::-webkit-scrollbar {
          width: 7px;
          height: 7px;
        }
        .clean-scroll::-webkit-scrollbar-track {
          background: rgba(241, 245, 249, 0.5);
        }
        .clean-scroll::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.5);
          border-radius: 9999px;
        }
        .clean-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.7);
        }
      `}} />

      <div
        className="w-full max-w-7xl h-[94vh] flex flex-col rounded-2xl bg-white border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-black/5 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================================= */}
        {/* HEADER: APPLICATION TITLE, VIEW-ONLY BADGE & ACTION CONTROLS              */}
        {/* ========================================================================= */}
        <div className="px-4 py-3 sm:px-6 sm:py-3.5 border-b border-slate-200/90 bg-white flex items-center justify-between gap-3 flex-shrink-0 z-20 shadow-2xs">
          {/* Left: Document info & View Only Badge */}
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-[11px] sm:text-xs font-black shadow-xs flex-shrink-0 ${
              isDocx || isDoc
                ? "bg-gradient-to-tr from-blue-600 to-indigo-500 text-white"
                : isPdf
                ? "bg-gradient-to-tr from-rose-600 to-red-500 text-white"
                : "bg-gradient-to-tr from-indigo-600 to-violet-500 text-white"
            }`}>
              {isDocx ? "DOCX" : isDoc ? "DOC" : isPdf ? "PDF" : "DOC"}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate tracking-tight">
                  {resume.candidateName}
                </h3>
                <span className="hidden sm:inline-block text-slate-300 font-light">•</span>
                <span className="text-xs font-medium text-[#0066ff] truncate hidden sm:inline-block">
                  {resume.jobTitle}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  View Only
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-sans truncate mt-0.5">
                Attached Resume: <strong className="text-slate-700 font-mono font-medium">{resume.fileName}</strong>
                {resume.fileSize && ` · ${resume.fileSize}`}
              </p>
            </div>
          </div>

          {/* Right: Controls & Toggles */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Mobile Tab Switcher */}
            <div className="md:hidden flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveMobileTab("document")}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activeMobileTab === "document"
                    ? "bg-white text-slate-900 shadow-2xs font-bold"
                    : "text-slate-500"
                }`}
              >
                📄 Document
              </button>
              <button
                type="button"
                onClick={() => setActiveMobileTab("candidate")}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activeMobileTab === "candidate"
                    ? "bg-white text-slate-900 shadow-2xs font-bold"
                    : "text-slate-500"
                }`}
              >
                👤 Profile
              </button>
            </div>

            {/* Desktop Sidebar Toggle (Focus Document vs Split View) */}
            <button
              type="button"
              onClick={() => setShowSidebar((prev) => !prev)}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              title={showSidebar ? "Hide Profile Sidebar (Expand Document)" : "Show Profile Sidebar"}
            >
              <span>{showSidebar ? "⇄ Focus Document" : "⇥ Show Dossier"}</span>
            </button>

            {/* DOCX Zoom Controls */}
            {isDocx && (
              <div className="hidden lg:inline-flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-lg p-0.5 text-xs">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="w-6 h-6 flex items-center justify-center rounded-md text-slate-600 hover:text-slate-900 hover:bg-white transition-all cursor-pointer font-bold"
                  title="Zoom Out"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={handleZoomReset}
                  className="px-1.5 h-6 flex items-center justify-center rounded-md text-slate-700 hover:text-slate-900 hover:bg-white text-[10px] font-mono font-semibold transition-all cursor-pointer"
                  title="Reset Zoom"
                >
                  {zoom}%
                </button>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="w-6 h-6 flex items-center justify-center rounded-md text-slate-600 hover:text-slate-900 hover:bg-white transition-all cursor-pointer font-bold"
                  title="Zoom In"
                >
                  +
                </button>
              </div>
            )}

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
              title="Close Application Preview"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN BODY: SPLIT VIEW (CANDIDATE DOSSIER + FULL-FITTED DOCUMENT VIEWER)    */}
        {/* ========================================================================= */}
        <div className="flex-1 min-h-0 w-full flex overflow-hidden bg-slate-100/60">
          {/* ======================================================================= */}
          {/* LEFT PANEL: CANDIDATE DOSSIER & QUICK ACTIONS (COLLAPSIBLE)             */}
          {/* ======================================================================= */}
          <div
            className={`w-full md:w-[350px] lg:w-[380px] border-r border-slate-200 bg-white flex flex-col flex-shrink-0 overflow-y-auto clean-scroll transition-all duration-200 ${
              showSidebar ? "block" : "hidden"
            } ${activeMobileTab === "candidate" ? "block" : "hidden md:block"}`}
          >
            <div className="p-5 sm:p-6 space-y-5">
              {/* Candidate Identity Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#0066ff] text-white flex items-center justify-center font-bold text-base shadow-sm">
                    {resume.candidateName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase() || "CV"}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base font-extrabold text-slate-900 leading-tight truncate">
                      {resume.candidateName}
                    </h2>
                    <p className="text-xs font-semibold text-[#0066ff] mt-0.5 truncate">
                      {resume.jobTitle}
                    </p>
                    {resume.department && (
                      <p className="text-[10px] font-mono text-slate-400 mt-0.5 truncate">
                        {resume.department}
                      </p>
                    )}
                  </div>
                </div>

                {/* Quick Contact Action Bar */}
                <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-200/70">
                  {resume.phone ? (
                    <a
                      href={`tel:${cleanPhone}`}
                      className="py-2 px-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer text-center"
                      title="Direct Call"
                    >
                      <span>📞</span>
                      <span>Call</span>
                    </a>
                  ) : (
                    <span className="py-2 px-1.5 rounded-lg bg-slate-100 text-slate-400 text-[11px] text-center">
                      No Phone
                    </span>
                  )}

                  {resume.phone ? (
                    <a
                      href={`https://wa.me/${cleanPhone.replace("+", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer text-center"
                      title="Open WhatsApp"
                    >
                      <span>💬</span>
                      <span>WhatsApp</span>
                    </a>
                  ) : (
                    <span className="py-2 px-1.5 rounded-lg bg-slate-100 text-slate-400 text-[11px] text-center">
                      No Chat
                    </span>
                  )}

                  {resume.email ? (
                    <a
                      href={`mailto:${resume.email}`}
                      className="py-2 px-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer text-center truncate"
                      title="Send Email"
                    >
                      <span>✉️</span>
                      <span>Email</span>
                    </a>
                  ) : (
                    <span className="py-2 px-1.5 rounded-lg bg-slate-100 text-slate-400 text-[11px] text-center">
                      No Email
                    </span>
                  )}
                </div>
              </div>

              {/* Contact Details List */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                  Contact Information
                </span>
                <div className="space-y-2 text-xs">
                  {resume.phone && (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="min-w-0">
                        <span className="text-[10px] text-slate-400 block font-mono">Mobile / Phone</span>
                        <span className="font-semibold text-slate-800 font-mono truncate block">
                          {resume.phone}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText(resume.phone || "");
                          setCopiedPhone(true);
                          setTimeout(() => setCopiedPhone(false), 2000);
                        }}
                        className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 text-[10px] font-mono cursor-pointer transition-colors"
                      >
                        {copiedPhone ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                  )}

                  {resume.email && (
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                      <span className="text-[10px] text-slate-400 block font-mono">Email Address</span>
                      <a
                        href={`mailto:${resume.email}`}
                        className="font-semibold text-blue-600 hover:underline font-mono truncate block text-xs"
                      >
                        {resume.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Candidate Cover Statement / Note */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                  Candidate Cover Statement
                </span>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed max-h-48 overflow-y-auto clean-scroll whitespace-pre-wrap font-sans">
                  {resume.message || "Candidate application submitted via Vexus Labs Careers Portal."}
                </div>
              </div>

              {/* Attached Document Status */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                  Document Integrity
                </span>
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <p className="font-bold flex items-center gap-1.5 truncate">
                      <span>📄</span> {resume.fileName}
                    </p>
                    <p className="text-[10px] font-mono text-emerald-700 mt-0.5 truncate">
                      {resume.fileSize || "Verified Attachment"} · View-Only Mode
                    </p>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-300 flex-shrink-0">
                    ✓ Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* RIGHT PANEL: FULL DOCUMENT VIEWER (EDGE-TO-EDGE, ZERO WASTED SPACE)      */}
          {/* ======================================================================= */}
          <div
            className={`flex-1 min-h-0 w-full h-full flex flex-col bg-slate-200/50 ${
              activeMobileTab === "document" ? "flex" : "hidden md:flex"
            }`}
          >
            {/* PDF FULL-FITTED IN-BROWSER RENDERER (ZERO BLACK BARS, FITS WIDTH) */}
            {isPdf && resume.dataUrl ? (
              <div className="flex-1 min-h-0 w-full h-full overflow-hidden bg-slate-200/40 p-1 sm:p-2 flex items-center justify-center">
                <div className="w-full h-full rounded-xl overflow-hidden border border-slate-300/80 shadow-md bg-white">
                  <iframe
                    src={pdfViewerUrl}
                    className="w-full h-full border-0 block"
                    title={`PDF Document preview for ${resume.candidateName}`}
                  />
                </div>
              </div>
            ) : isDocx && resume.dataUrl ? (
              /* DOCX IN-BROWSER RENDERER (Single Scroll, Crisp Centered Paper) */
              <div className="flex-1 min-h-0 w-full h-full overflow-y-auto p-4 sm:p-6 clean-scroll flex flex-col items-center">
                {isLoading && (
                  <div className="py-24 text-center text-slate-500 my-auto">
                    <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-xs font-semibold text-slate-700 font-mono">
                      Rendering Word Document in-browser...
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Parsing document layout and typography
                    </p>
                  </div>
                )}

                {renderError && (
                  <div className="max-w-md mx-auto my-auto p-6 rounded-2xl bg-white border border-amber-200 shadow-md text-center space-y-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto text-base">
                      ⚠️
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">Document Layout Notice</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {renderError}
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowSidebar(true)}
                      className="px-4 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
                    >
                      View Candidate Details
                    </button>
                  </div>
                )}

                <div
                  ref={containerRef}
                  style={{
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: "top center",
                    transition: "transform 0.15s ease",
                  }}
                  className={`docx-clean-container w-full max-w-3xl mx-auto ${
                    isLoading || renderError ? "hidden" : "block"
                  }`}
                />
              </div>
            ) : isImage && resume.dataUrl ? (
              /* IMAGE RENDERER */
              <div className="flex-1 min-h-0 w-full h-full overflow-auto p-4 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resume.dataUrl}
                  alt={`Document for ${resume.candidateName}`}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
                />
              </div>
            ) : isDoc ? (
              /* LEGACY .DOC CARD */
              <div className="max-w-md mx-auto my-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-xl text-center space-y-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-xl mx-auto font-bold">
                  DOC
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {resume.fileName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Legacy Word Format · Protected View
                  </p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Legacy binary <code>.doc</code> files are protected for view-only in this portal.
                  All applicant credentials and cover notes are available in the candidate dossier.
                </p>
              </div>
            ) : (
              /* EMPTY / VERIFIED STATEMENT */
              <div className="max-w-md mx-auto my-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-xl text-center space-y-4">
                <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center text-xl mx-auto font-bold">
                  📄
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {resume.fileName || "Verified Document"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Document verified · View-only mode active
                  </p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  All candidate application info, cover statement, and direct contacts are available in the dossier panel on the left.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FOOTER: SECURITY WATERMARK & CLOSE BUTTON                                 */}
        {/* ========================================================================= */}
        <div className="px-4 py-2.5 sm:px-6 sm:py-3 border-t border-slate-200/90 bg-white flex items-center justify-between flex-shrink-0 z-20">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="hidden sm:inline">Protected Application Review ·</span>
            <span>Downloading &amp; Export Restricted</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-1.5 sm:py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer shadow-xs"
            >
              Close Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
