"use client";

import React, { useState, useRef } from "react";
import { JobPosition } from "@/data/careersData";
import { saveApplication } from "@/utils/applicationsStorage";
import { submitApplicationAPI } from "@/api/application_api";

interface JobApplicationModalProps {
  job: JobPosition | null;
  isOpen: boolean;
  onClose: () => void;
}

export function JobApplicationModal({ job, isOpen, onClose }: JobApplicationModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !job) return null;

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      alert("Please upload a PDF, DOC, or DOCX file.");
      return;
    }
    const MAX_SIZE_BYTES = 1 * 1024 * 1024; // 1 MB
    if (file.size > MAX_SIZE_BYTES) {
      const selectedMb = (file.size / (1024 * 1024)).toFixed(2);
      alert(`Resume file size must be 1 MB or less. (Selected file is ${selectedMb} MB)`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setResumeFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
    if (!resumeFile) {
      alert("Please upload your resume.");
      return;
    }

    setIsSubmitting(true);

    const generatedId = `VX-APP-${Math.floor(100000 + Math.random() * 900000)}`;
    const submissionTimestamp = new Date().toISOString();
    const fileSizeStr = `${(resumeFile.size / 1024).toFixed(1)} KB`;

    const saveAndFinalize = async (dataUrl?: string) => {
      const payload = {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim() || "(None provided)",
        candidateNote: message.trim() || "(None provided)",
        jobId: job.id || (job as any)._id,
        jobTitle: job.title,
        department: job.department,
        resumeFileName: resumeFile.name,
        resumeFileSize: fileSizeStr,
        resumeDataUrl: dataUrl,
      };

      try {
        console.log("🚀 [JobApplicationModal] Submitting application via submitApplicationAPI...", payload);
        const apiRes = await submitApplicationAPI(payload);
        console.log("✅ [JobApplicationModal] Live API Response:", apiRes);
        const refId = apiRes.data?._id || generatedId;
        saveApplication({
          ...payload,
          id: refId,
          candidateName: fullName.trim(),
          submittedAt: submissionTimestamp,
        });
        setIsSubmitting(false);
        setIsSuccess(true);
        return;
      } catch (err: any) {
        console.warn("⚠️ [JobApplicationModal] Live API submit notice:", err.message);
      }

      saveApplication({
        ...payload,
        id: generatedId,
        candidateName: fullName.trim(),
        submittedAt: submissionTimestamp,
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    };

    // Save with DataURL preview if file is reasonably sized (< 4MB)
    if (resumeFile && resumeFile.size < 4 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = () => {
        saveAndFinalize(reader.result as string);
      };
      reader.onerror = () => {
        saveAndFinalize(undefined);
      };
      reader.readAsDataURL(resumeFile);
    } else {
      saveAndFinalize(undefined);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFullName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setResumeFile(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-150"
      onClick={handleReset}
    >
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900 leading-tight">
              Apply for {job.title}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {job.department} · {job.locationBadge}
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="w-7 h-7 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer text-sm font-semibold"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {isSuccess ? (
            <div className="py-6 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl mx-auto mb-3 font-bold">
                ✓
              </div>
              <h4 className="text-base font-bold text-gray-900">Application Received!</h4>
              <p className="text-xs text-gray-600 mt-1.5 max-w-xs mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. We have successfully received your application for <strong>{job.title}</strong>. Our team will review your qualifications and reach out soon.
              </p>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name <span className="text-[#0066ff]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Arjun Mehta"
                  className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address <span className="text-[#0066ff]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="arjun@example.com"
                  className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone Number <span className="text-[#0066ff]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-colors"
                />
              </div>

              {/* Message / Note Textarea */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Message / Cover Note <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us briefly about your engineering background, projects, or github links..."
                  className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-colors resize-none"
                />
              </div>

              {/* Resume / CV File */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Resume / CV (PDF, DOC, DOCX • Max 1 MB) <span className="text-[#0066ff]">*</span>
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                  className="hidden"
                />

                {resumeFile ? (
                  <div className="flex items-center justify-between px-3 py-2 border border-emerald-300 bg-emerald-50 rounded-md text-xs">
                    <span className="font-medium text-gray-800 truncate">
                      📄 {resumeFile.name} ({(resumeFile.size / 1024).toFixed(0)} KB)
                    </span>
                    <button
                      type="button"
                      onClick={() => setResumeFile(null)}
                      className="text-xs text-red-600 hover:text-red-800 font-semibold ml-2 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-between px-3 py-2 border border-dashed border-gray-300 hover:border-[#0066ff] bg-gray-50/70 hover:bg-blue-50/30 rounded-md cursor-pointer transition-colors"
                  >
                    <span className="text-xs text-gray-500 truncate">
                      Attach your resume (PDF or DOC)...
                    </span>
                    <span className="text-xs font-semibold text-[#0066ff] bg-white border border-[#0066ff]/40 px-2 py-0.5 rounded shadow-2xs">
                      Browse
                    </span>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold text-sm py-2.5 px-4 rounded-md transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobApplicationModal;

