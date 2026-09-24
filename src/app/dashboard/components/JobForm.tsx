"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { JobPosition } from "@/data/careersData";

interface JobFormProps {
  mode: "create" | "edit";
  initialJob?: JobPosition;
  onSubmit: (jobData: JobPosition) => Promise<{ success: boolean; error?: string; id?: string; data?: any }>;
}

const DEPARTMENT_OPTIONS: {
  key: "frontend" | "ai" | "cloud" | "mobile" | "design";
  label: string;
}[] = [
  { key: "frontend", label: "Frontend & Full-Stack" },
  { key: "ai", label: "AI & Data Engineering" },
  { key: "cloud", label: "Cloud & DevOps" },
  { key: "mobile", label: "Mobile Development" },
  { key: "design", label: "Design Engineering" },
];

const DEFAULT_BENEFITS = [
  "Top-market base salary with performance bonuses and equity participation.",
  "Flexible working hours with remote-first autonomy or Mohali HQ seating.",
  "₹3,50,000 ($4,200) annual hardware & home-office workstation allowance.",
  "Comprehensive premium family health and dental insurance with zero deductible.",
  "Annual $3,000 conference, books, and continuous engineering education budget.",
];

const POPULAR_TAGS = [
  "React",
  "Next.js 16",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "LangGraph",
  "PostgreSQL",
  "Rust",
  "Go",
  "Kubernetes",
  "Docker",
  "AWS",
  "Redis",
  "GraphQL",
  "React Native",
  "Figma",
];

const SAMPLE_TEMPLATES = [
  {
    name: "AI Agents Architect",
    data: {
      title: "Lead Autonomous AI Agents Architect",
      departmentKey: "ai" as const,
      department: "AI & Data Engineering",
      locationBadge: "REMOTE GLOBAL / US-EU COMPATIBLE",
      levelBadge: "LEAD / STAFF",
      salary: "$210,000 - $260,000 / ₹50L - ₹68L + Equity",
      techStack: ["Python", "LangGraph", "TypeScript", "vLLM", "PostgreSQL", "FastAPI"],
      shortSummary:
        "Architect multi-agent autonomous reasoning loops, deterministic tool-calling runtimes, and low-latency embeddings for enterprise SaaS.",
      aboutRole:
        "As Lead Autonomous AI Agents Architect at Vexus Lab, you will design production-grade multi-agent reasoning orchestrations, self-healing RAG pipelines, and deterministic tool execution engines for hyper-growth startups.",
      responsibilities: [
        "Architect autonomous agentic workflows using LangGraph, CrewAI, and custom stateful finite state machines.",
        "Optimize token streaming latency and implement speculative decoding pipelines.",
        "Design semantic memory layers using pgvector, Milvus, and hybrid reciprocal rank fusion.",
        "Direct automated evaluation benches testing agent hallucination, step accuracy, and safety constraints.",
      ],
      requirements: [
        "6+ years building production systems in Python and TypeScript.",
        "Demonstrated mastery of LLM tool-calling, function calling schemas, and prompt chaining.",
        "Hands-on experience with vector databases and high-dimensional semantic search.",
        "Strong systems architecture foundations in concurrency, async event loops, and API design.",
      ],
      niceToHave: [
        "Published research or open-source agent tooling with 500+ GitHub stars.",
        "Experience fine-tuning SLMs (Llama 3, Mistral) using LoRA / QLoRA.",
      ],
      benefits: DEFAULT_BENEFITS,
    },
  },
  {
    name: "Senior Full-Stack Engineer",
    data: {
      title: "Senior Full-Stack Engineer",
      departmentKey: "frontend" as const,
      department: "Frontend & Full-Stack",
      locationBadge: "REMOTE GLOBAL - MOHALI CAMPUS",
      levelBadge: "SENIOR L5",
      salary: "$180,000 - $225,000 / ₹42L - ₹58L + Equity",
      techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "PostgreSQL"],
      shortSummary:
        "Craft high-performance Next.js 16 applications, real-time WebSocket pipelines, and zero-drift database schemas.",
      aboutRole:
        "You will lead end-to-end full stack development for enterprise SaaS and AI-driven products. You will build buttery-smooth 120fps responsive web interfaces powered by React 19 and Next.js 16 Server Actions, backed by high-throughput PostgreSQL databases and clean microservices.",
      responsibilities: [
        "Architect and ship complete full-stack web applications using Next.js 16 (App Router), TypeScript, and Tailwind CSS.",
        "Design normalized relational schemas, query optimizers, and automated migration pipelines in PostgreSQL.",
        "Implement real-time collaboration features using WebSockets, WebRTC, and Redis Pub/Sub.",
        "Enforce strict AST type safety, automated tests, and zero-runtime-exception guarantees.",
      ],
      requirements: [
        "5+ years of extensive experience building scalable web applications with React, TypeScript, and Node.js.",
        "Mastery of Next.js App Router, Server Components, streaming SSR, and Edge runtimes.",
        "Deep understanding of relational database performance, indexing strategies, and ACID transactions.",
      ],
      niceToHave: [
        "Experience with AI SDK integrations (Vercel AI SDK, OpenAI/Anthropic tool-use streaming).",
        "Open-source packages published to npm with active maintainership.",
      ],
      benefits: DEFAULT_BENEFITS,
    },
  },
  {
    name: "Staff Cloud Architect",
    data: {
      title: "Staff Cloud & Platform Architect",
      departmentKey: "cloud" as const,
      department: "Cloud & DevOps",
      locationBadge: "REMOTE GLOBAL / MOHALI HQ",
      levelBadge: "STAFF LEVEL",
      salary: "$220,000 - $275,000 / ₹52L - ₹72L + Equity",
      techStack: ["Kubernetes", "Rust", "Go", "Terraform", "AWS", "Kafka", "Docker"],
      shortSummary:
        "Build zero-downtime multi-region Kubernetes clusters, automated GitOps pipelines, and micro-latency event streams.",
      aboutRole:
        "Lead the cloud architecture and infrastructure pod across multi-cloud deployments. You will define security postures, automated canary deployments, and multi-region failover topologies.",
      responsibilities: [
        "Design and maintain distributed consensus engines, replication pipelines, and low-latency microservices.",
        "Direct disaster recovery, cross-region failover automation, and chaos engineering simulations.",
        "Build infrastructure as code (IaC) using Terraform, Pulumi, and ArgoCD.",
      ],
      requirements: [
        "7+ years operating distributed cloud infrastructure on AWS/GCP at scale.",
        "Deep production experience with Kubernetes operators, service meshes (Istio/Linkerd), and Helm.",
        "Proficiency in Go, Python, or Rust for systems automation.",
      ],
      niceToHave: [
        "CKA/CKS Kubernetes certifications.",
        "Prior experience handling SOC2 Type II or ISO 27001 compliance standards.",
      ],
      benefits: DEFAULT_BENEFITS,
    },
  },
];

export function JobFormWhite({ mode, initialJob, onSubmit }: JobFormProps) {
  const router = useRouter();

  // Core form fields
  const [title, setTitle] = useState(initialJob?.title || "");
  const [departmentKey, setDepartmentKey] = useState<
    "frontend" | "ai" | "cloud" | "mobile" | "design"
  >(initialJob?.departmentKey || "frontend");
  const [department, setDepartment] = useState(
    initialJob?.department || (initialJob as any)?.departmentTrack || "Frontend & Full-Stack"
  );
  const [locationBadge, setLocationBadge] = useState(
    initialJob?.locationBadge || "REMOTE GLOBAL - MOHALI CAMPUS"
  );
  const [levelBadge, setLevelBadge] = useState(
    initialJob?.levelBadge || (initialJob as any)?.seniorityLevel || "SENIOR L5"
  );
  const [salary, setSalary] = useState(
    initialJob?.salary || (initialJob as any)?.compensation || "$180,000 - $220,000 / ₹42L - ₹55L + Equity"
  );

  // Tech stack
  const [techStack, setTechStack] = useState<string[]>(
    initialJob?.techStack && initialJob.techStack.length > 0
      ? initialJob.techStack
      : ["React", "Next.js 16", "TypeScript", "Tailwind CSS"]
  );
  const [tagInput, setTagInput] = useState("");

  // Descriptions
  const [shortSummary, setShortSummary] = useState(initialJob?.shortSummary || "");
  const [aboutRole, setAboutRole] = useState(initialJob?.aboutRole || "");

  // Lists with dual property fallback (MongoDB schema vs Local Storage schema)
  const initialResp = (initialJob as any)?.keyResponsibilities || initialJob?.responsibilities || [];
  const initialReq = (initialJob as any)?.mustHaveRequirements || initialJob?.requirements || [];
  const initialNth = (initialJob as any)?.niceToHaveQualifications || initialJob?.niceToHave || [];
  const initialBen = initialJob?.benefits || [];

  const [responsibilitiesText, setResponsibilitiesText] = useState(
    Array.isArray(initialResp) ? initialResp.join("\n") : ""
  );
  const [requirementsText, setRequirementsText] = useState(
    Array.isArray(initialReq) ? initialReq.join("\n") : ""
  );
  const [niceToHaveText, setNiceToHaveText] = useState(
    Array.isArray(initialNth) ? initialNth.join("\n") : ""
  );
  const [benefitsText, setBenefitsText] = useState(
    Array.isArray(initialBen) && initialBen.length > 0
      ? initialBen.join("\n")
      : DEFAULT_BENEFITS.join("\n")
  );

  // Sync state if initialJob arrives asynchronously
  useEffect(() => {
    if (initialJob) {
      if (initialJob.title) setTitle(initialJob.title);
      if (initialJob.departmentKey) setDepartmentKey(initialJob.departmentKey);
      if (initialJob.department || (initialJob as any).departmentTrack) {
        setDepartment(initialJob.department || (initialJob as any).departmentTrack);
      }
      if (initialJob.locationBadge) setLocationBadge(initialJob.locationBadge);
      if (initialJob.levelBadge || (initialJob as any).seniorityLevel) {
        setLevelBadge(initialJob.levelBadge || (initialJob as any).seniorityLevel);
      }
      if (initialJob.salary || (initialJob as any).compensation) {
        setSalary(initialJob.salary || (initialJob as any).compensation);
      }
      if (initialJob.techStack && initialJob.techStack.length > 0) {
        setTechStack(initialJob.techStack);
      }
      if (initialJob.shortSummary) setShortSummary(initialJob.shortSummary);
      if (initialJob.aboutRole) setAboutRole(initialJob.aboutRole);

      const respList = (initialJob as any).keyResponsibilities || initialJob.responsibilities || [];
      if (Array.isArray(respList) && respList.length > 0) {
        setResponsibilitiesText(respList.join("\n"));
      }

      const reqList = (initialJob as any).mustHaveRequirements || initialJob.requirements || [];
      if (Array.isArray(reqList) && reqList.length > 0) {
        setRequirementsText(reqList.join("\n"));
      }

      const nthList = (initialJob as any).niceToHaveQualifications || initialJob.niceToHave || [];
      if (Array.isArray(nthList) && nthList.length > 0) {
        setNiceToHaveText(nthList.join("\n"));
      }

      const benList = initialJob.benefits || [];
      if (Array.isArray(benList) && benList.length > 0) {
        setBenefitsText(benList.join("\n"));
      }
    }
  }, [initialJob]);

  // Interaction state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // View mode: "split" (side-by-side), "form" (focused inputs), "preview" (full preview)
  const [viewMode, setViewMode] = useState<"split" | "form" | "preview">("split");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDepartmentSelect = (key: "frontend" | "ai" | "cloud" | "mobile" | "design") => {
    setDepartmentKey(key);
    const match = DEPARTMENT_OPTIONS.find((d) => d.key === key);
    if (match) {
      setDepartment(match.label);
    }
  };

  const handleAddTag = (tagToAdd: string) => {
    const trimmed = tagToAdd.trim();
    if (!trimmed) return;
    if (!techStack.includes(trimmed)) {
      setTechStack([...techStack, trimmed]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTechStack(techStack.filter((t) => t !== tagToRemove));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag(tagInput);
    }
  };

  const applyTemplate = (templateData: (typeof SAMPLE_TEMPLATES)[0]["data"]) => {
    setTitle(templateData.title);
    setDepartmentKey(templateData.departmentKey);
    setDepartment(templateData.department);
    setLocationBadge(templateData.locationBadge);
    setLevelBadge(templateData.levelBadge);
    setSalary(templateData.salary);
    setTechStack(templateData.techStack);
    setShortSummary(templateData.shortSummary);
    setAboutRole(templateData.aboutRole);
    setResponsibilitiesText(templateData.responsibilities.join("\n"));
    setRequirementsText(templateData.requirements.join("\n"));
    setNiceToHaveText(templateData.niceToHave.join("\n"));
    setBenefitsText(templateData.benefits.join("\n"));
    setErrorMessage(null);
  };

  const parseLines = (text: string): string[] => {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  };

  // Parsed lists for real-time checking
  const responsibilitiesList = parseLines(responsibilitiesText);
  const requirementsList = parseLines(requirementsText);
  const niceToHaveList = parseLines(niceToHaveText);
  const benefitsList = parseLines(benefitsText);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!title.trim()) {
      setErrorMessage("Please enter a Job Title.");
      return;
    }
    if (!shortSummary.trim()) {
      setErrorMessage("Please provide a short summary for the role.");
      return;
    }
    if (!aboutRole.trim()) {
      setErrorMessage("Please provide the 'About the Role' description.");
      return;
    }
    if (techStack.length === 0) {
      setErrorMessage("Please specify at least one technology in the Tech Stack.");
      return;
    }
    if (responsibilitiesList.length === 0) {
      setErrorMessage("Please provide at least one responsibility item.");
      return;
    }
    if (requirementsList.length === 0) {
      setErrorMessage("Please provide at least one requirement item.");
      return;
    }

    const slug =
      initialJob?.slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") +
        "-" +
        Math.random().toString(36).slice(2, 6);

    const jobData: any = {
      id: initialJob?.id || slug,
      slug: slug,
      title: title.trim(),
      department: department.trim(),
      departmentTrack: department.trim(),
      departmentKey: departmentKey,
      locationBadge: locationBadge.trim(),
      levelBadge: levelBadge.trim(),
      seniorityLevel: levelBadge.trim(),
      salary: salary.trim(),
      compensation: salary.trim(),
      techStack: techStack,
      shortSummary: shortSummary.trim(),
      aboutRole: aboutRole.trim(),
      responsibilities: responsibilitiesList,
      keyResponsibilities: responsibilitiesList,
      requirements: requirementsList,
      mustHaveRequirements: requirementsList,
      niceToHave: niceToHaveList,
      niceToHaveQualifications: niceToHaveList,
      benefits: benefitsList.length > 0 ? benefitsList : DEFAULT_BENEFITS,
    };

    setIsSubmitting(true);
    const res = await onSubmit(jobData);
    setIsSubmitting(false);

    if (res.success) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("vexus_jobs_updated"));
      }
      setSuccessMessage(
        mode === "create"
          ? `Job "${jobData.title}" published successfully!`
          : `Job "${jobData.title}" updated successfully!`
      );
      const targetId = res.data?._id || res.data?.id || jobData.id;
      setTimeout(() => {
        router.push(mode === "create" ? `/dashboard/jobs` : `/dashboard/jobs/view/${targetId}`);
      }, 700);
    } else {
      setErrorMessage(res.error || "An error occurred while saving the job.");
    }
  };

  /**
   * Complete All-Data Live Preview Renderer
   * Shows every single piece of data entered:
   * Title, Track, Level, Location, Salary, Tech, Summary, Full About Role,
   * ALL Responsibilities, ALL Requirements, ALL Nice-to-Have, and ALL Benefits.
   */
  const renderAllDataLivePreview = () => (
    <div className="space-y-6">
      {/* Main Role Specifications Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-md bg-blue-50 text-[#0066ff] border border-blue-200 font-bold">
            {levelBadge || "LEVEL BADGE"}
          </span>
          <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-medium">
            {locationBadge || "LOCATION BADGE"}
          </span>
          <span className="text-xs font-mono px-3 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-medium">
            {department}
          </span>
          <span className="text-xs font-mono px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Public Card Preview
          </span>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {title || "Enter Job Position Title"}
          </h2>
          <div className="text-sm sm:text-base font-mono font-bold text-emerald-700 mt-2">
            {salary || "$0 / Negotiable"}
          </div>
        </div>

        {/* Short Summary Card */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Short Summary (Card Preview):
          </span>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
            "{shortSummary || "Provide a concise 1-2 sentence overview of the role..."}"
          </p>
        </div>

        {/* Targeted Tech Stack */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              Targeted Tech Stack ({techStack.length} technologies):
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {techStack.length > 0 ? (
              techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-[#0066ff] text-xs font-mono font-bold"
                >
                  {tech}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">No technologies added yet</span>
            )}
          </div>
        </div>

        {/* About The Role (Full Text) */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[#0066ff] font-bold">✦</span>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              About the Role *
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {aboutRole || "Provide the detailed 'About the Role' description in the form to preview it here."}
          </p>
        </div>

        {/* Key Highlights / Responsibilities (Shows ALL items, zero slicing) */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#0066ff] font-bold">✦</span>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                Key Highlights ({responsibilitiesList.length}):
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Showing all {responsibilitiesList.length} items
            </span>
          </div>

          {responsibilitiesList.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No highlights added yet.</p>
          ) : (
            <ul className="space-y-2">
              {responsibilitiesList.map((resp, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[#0066ff] font-bold text-sm leading-none mt-0.5">•</span>
                  <span className="leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Must-Have Requirements (Shows ALL items) */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                Must-Have Requirements ({requirementsList.length}):
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Showing all {requirementsList.length} items
            </span>
          </div>

          {requirementsList.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No requirements specified yet.</p>
          ) : (
            <ul className="space-y-2">
              {requirementsList.map((req, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50/40 border border-emerald-200/70">
                  <span className="text-emerald-600 font-bold text-sm leading-none mt-0.5">✓</span>
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Nice-to-Have Bonus Qualifications (Shows ALL items) */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#0066ff] font-bold">★</span>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                Nice-to-Have / Bonus Qualifications ({niceToHaveList.length}):
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Showing all {niceToHaveList.length} items
            </span>
          </div>

          {niceToHaveList.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No bonus qualifications added.</p>
          ) : (
            <ul className="space-y-2">
              {niceToHaveList.map((nth, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-600 flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-[#0066ff] font-bold text-sm leading-none mt-0.5">•</span>
                  <span className="leading-relaxed">{nth}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Company Benefits & Perks (Shows ALL items) */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-purple-600 font-bold">🎁</span>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                Benefits &amp; Perks ({benefitsList.length}):
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Showing all {benefitsList.length} perks
            </span>
          </div>

          {benefitsList.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No benefits listed.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {benefitsList.map((benefit, i) => (
                <div key={i} className="text-xs text-slate-700 flex items-start gap-2 p-2.5 rounded-xl bg-purple-50/50 border border-purple-100">
                  <span className="text-purple-600 font-bold mt-0.5">▪</span>
                  <span className="leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Controls Toolbar: Clean View Mode Switcher */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* View Mode Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => setViewMode("split")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === "split"
                ? "bg-white text-[#0066ff] shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="Split Editor & Preview"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            <span>Split</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("form")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === "form"
                ? "bg-white text-slate-900 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="Form Inputs Only"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Form</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("preview")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === "preview"
                ? "bg-white text-slate-900 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="Full Live Preview"
          >
            <svg className="w-4 h-4 text-[#0066ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Preview</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {mode === "create" && (
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="text-[11px] font-mono text-slate-400">Presets:</span>
              {SAMPLE_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.name}
                  type="button"
                  onClick={() => applyTemplate(tmpl.data)}
                  className="px-2 py-1 rounded-md text-[11px] font-medium bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 transition-colors"
                >
                  {tmpl.name}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs flex items-center gap-1.5 transition-colors"
            title="Open Live Preview in Modal"
          >
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="hidden sm:inline">Preview Modal</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 1: FULL LIVE PREVIEW                                            */}
      {/* ========================================================================= */}
      {viewMode === "preview" && (
        <div className="space-y-6">
          {renderAllDataLivePreview()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 2 & 3: FORM ONLY OR SPLIT VIEW                                 */}
      {/* ========================================================================= */}
      {viewMode !== "preview" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Modular Form Inputs */}
          <div className={`${viewMode === "split" ? "lg:col-span-6" : "lg:col-span-12"} space-y-6`}>
            {/* Card 1: Role Overview & Identity */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 pb-3.5 border-b border-slate-100">
                <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#0066ff] flex items-center justify-center text-xs font-bold font-mono">
                  1
                </span>
                <h2 className="text-base font-bold text-slate-900">Role Identity &amp; Department</h2>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Job Title <span className="text-[#0066ff]">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Full-Stack Engineer"
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-all"
                  required
                />
              </div>

              {/* Department Buttons */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Department Track <span className="text-[#0066ff]">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {DEPARTMENT_OPTIONS.map((dept) => (
                    <button
                      key={dept.key}
                      type="button"
                      onClick={() => handleDepartmentSelect(dept.key)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all ${
                        departmentKey === dept.key
                          ? "bg-blue-50 border-blue-300 text-[#0066ff] font-semibold shadow-xs"
                          : "bg-slate-50/60 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      {dept.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seniority & Location Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Seniority Level Badge
                  </label>
                  <input
                    type="text"
                    value={levelBadge}
                    onChange={(e) => setLevelBadge(e.target.value)}
                    placeholder="e.g. SENIOR L5, STAFF LEVEL"
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#ff5f2d]"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {["MID L4", "SENIOR L5", "STAFF LEVEL", "LEAD / ARCHITECT"].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setLevelBadge(lvl)}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Location &amp; Workplace Badge
                  </label>
                  <input
                    type="text"
                    value={locationBadge}
                    onChange={(e) => setLocationBadge(e.target.value)}
                    placeholder="e.g. REMOTE GLOBAL - MOHALI CAMPUS"
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0066ff]"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {["REMOTE GLOBAL", "MOHALI CAMPUS", "HYBRID"].map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setLocationBadge(loc)}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Compensation & Tech Stack */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 pb-3.5 border-b border-slate-100">
                <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#0066ff] flex items-center justify-center text-xs font-bold font-mono">
                  2
                </span>
                <h2 className="text-base font-bold text-slate-900">Compensation &amp; Tech Stack</h2>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Compensation &amp; Equity Range
                </label>
                <input
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="e.g. $180,000 - $220,000 / ₹42L - ₹55L + Equity"
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0066ff]"
                />
              </div>

              {/* Interactive Tech Stack */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Tech Stack Tags ({techStack.length} selected)
                </label>

                <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50/70 border border-slate-200 rounded-xl min-h-[50px] mb-3">
                  {techStack.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-[#0066ff] text-xs font-mono font-semibold"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-blue-950 transition-colors ml-0.5"
                        title="Remove technology"
                      >
                        ×
                      </button>
                    </span>
                  ))}

                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagInputKeyDown}
                    placeholder={techStack.length === 0 ? "Type tech and hit Enter..." : "Add tech..."}
                    className="bg-transparent border-none text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none flex-1 min-w-[120px] py-1"
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] text-slate-500 font-mono">
                    Suggested &amp; Selected technologies (click to toggle):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {Array.from(new Set([...techStack, ...POPULAR_TAGS])).map((tag) => {
                      const isSelected = techStack.some((t) => {
                        const a = t.toLowerCase().trim();
                        const b = tag.toLowerCase().trim();
                        return a === b || a.startsWith(b) || b.startsWith(a);
                      });

                      const handleToggle = () => {
                        if (isSelected) {
                          setTechStack((prev) =>
                            prev.filter((t) => {
                              const a = t.toLowerCase().trim();
                              const b = tag.toLowerCase().trim();
                              return !(a === b || a.startsWith(b) || b.startsWith(a));
                            })
                          );
                        } else {
                          handleAddTag(tag);
                        }
                      };

                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={handleToggle}
                          className={`text-[11px] font-mono px-2.5 py-1 rounded-md transition-all ${
                            isSelected
                              ? "bg-[#0066ff] text-white font-semibold shadow-xs"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Descriptions & Narratives */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 pb-3.5 border-b border-slate-100">
                <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#0066ff] flex items-center justify-center text-xs font-bold font-mono">
                  3
                </span>
                <h2 className="text-base font-bold text-slate-900">Role Descriptions</h2>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Short Summary (Card Preview) <span className="text-[#0066ff]">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {shortSummary.length} chars
                  </span>
                </div>
                <textarea
                  rows={2}
                  value={shortSummary}
                  onChange={(e) => setShortSummary(e.target.value)}
                  placeholder="1-2 sentences summarizing the role..."
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0066ff] leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  About the Role <span className="text-[#0066ff]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={aboutRole}
                  onChange={(e) => setAboutRole(e.target.value)}
                  placeholder="Detailed background about why this position exists and what the candidate will build..."
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0066ff] leading-relaxed"
                  required
                />
              </div>
            </div>

            {/* Card 4: Responsibilities & Requirements */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 pb-3.5 border-b border-slate-100">
                <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#0066ff] flex items-center justify-center text-xs font-bold font-mono">
                  4
                </span>
                <h2 className="text-base font-bold text-slate-900">Responsibilities &amp; Criteria</h2>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Key Responsibilities (one per line) <span className="text-[#0066ff]">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {responsibilitiesList.length} items
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={responsibilitiesText}
                  onChange={(e) => setResponsibilitiesText(e.target.value)}
                  placeholder="Architect and ship complete full-stack web applications...&#10;Implement real-time collaboration features..."
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0066ff] leading-relaxed"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Must-Have Requirements (one per line) <span className="text-[#0066ff]">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {requirementsList.length} items
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={requirementsText}
                  onChange={(e) => setRequirementsText(e.target.value)}
                  placeholder="5+ years building production applications...&#10;Deep proficiency in TypeScript and systems architecture..."
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0066ff] leading-relaxed"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Nice-to-Have Bonus Qualifications (one per line)
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {niceToHaveList.length} items
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={niceToHaveText}
                  onChange={(e) => setNiceToHaveText(e.target.value)}
                  placeholder="Open-source contributions on GitHub...&#10;Experience fine-tuning SLMs..."
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0066ff] leading-relaxed"
                />
              </div>
            </div>

            {/* Card 5: Benefits */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#0066ff] flex items-center justify-center text-xs font-bold font-mono">
                    5
                  </span>
                  <h2 className="text-base font-bold text-slate-900">Benefits &amp; Perks</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setBenefitsText(DEFAULT_BENEFITS.join("\n"))}
                  className="text-xs font-mono text-[#0066ff] hover:underline"
                >
                  Reset Default Perks
                </button>
              </div>

              <div>
                <textarea
                  rows={4}
                  value={benefitsText}
                  onChange={(e) => setBenefitsText(e.target.value)}
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0066ff] leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Right: Live Comprehensive Preview (Showing ALL Data in Split View) */}
          {viewMode === "split" && (
            <div className="lg:col-span-6 sticky top-24 space-y-4 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
              <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                    Live All-Data Preview
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setViewMode("preview")}
                  className="text-xs font-bold text-[#0066ff] hover:underline flex items-center gap-1"
                >
                  <span>Expand to Full Page</span>
                  <span>→</span>
                </button>
              </div>

              {renderAllDataLivePreview()}
            </div>
          )}
        </div>
      )}

      {/* Sticky Bottom Action Bar */}
      <div className="sticky bottom-6 z-30 p-4 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-md shadow-lg flex items-center justify-between gap-4">
        <Link
          href="/dashboard/jobs"
          className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
        >
          Cancel &amp; Return
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setViewMode(viewMode === "preview" ? "split" : "preview")}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
          >
            {viewMode === "preview" ? "Back to Edit" : "🔍 Check All Data"}
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#0066ff] to-[#0084ff] hover:from-[#0052cc] hover:to-[#0066ff] text-white shadow-md shadow-blue-500/20 transition-all transform active:scale-95 disabled:opacity-60 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Publishing Position...</span>
              </>
            ) : (
              <span>{mode === "create" ? "🚀 Publish Job Position" : "💾 Update Job Position"}</span>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULL-SCREEN ALL-DATA INSPECTION MODAL                                     */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-4xl max-h-[90vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                  All Data Pre-Flight Verification
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto flex-1 bg-[#f8fafc]">
              {renderAllDataLivePreview()}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200"
              >
                Back to Editing
              </button>

              <button
                type="submit"
                onClick={(e) => {
                  setIsModalOpen(false);
                  handleSubmit(e);
                }}
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0066ff] hover:bg-[#0052cc] text-white shadow-xs"
              >
                Looks Great — Publish Now
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
export default JobFormWhite;
