"use client";

import { JobPosition, JOB_POSITIONS } from "@/data/careersData";

const ALL_JOBS_KEY = "vexus_all_jobs";
const CUSTOM_JOBS_KEY = "vexus_custom_jobs";

/**
 * Standardize API backend job object into client JobPosition format.
 */
export function normalizeBackendJob(item: any): JobPosition {
  if (!item) return {} as JobPosition;
  const deptTrack = item.departmentTrack || item.department || "Frontend & Full-Stack";
  
  let deptKey = item.departmentKey;
  if (!deptKey) {
    const lower = deptTrack.toLowerCase();
    if (lower.includes("ai") || lower.includes("data") || lower.includes("machine")) deptKey = "ai";
    else if (lower.includes("cloud") || lower.includes("devops") || lower.includes("infra")) deptKey = "cloud";
    else if (lower.includes("mobile") || lower.includes("ios") || lower.includes("android")) deptKey = "mobile";
    else if (lower.includes("design") || lower.includes("ui") || lower.includes("ux")) deptKey = "design";
    else deptKey = "frontend";
  }

  const responsibilities = Array.isArray(item.responsibilities)
    ? item.responsibilities
    : (Array.isArray(item.keyResponsibilities) ? item.keyResponsibilities : []);

  const requirements = Array.isArray(item.requirements)
    ? item.requirements
    : (Array.isArray(item.mustHaveRequirements) ? item.mustHaveRequirements : []);

  const niceToHave = Array.isArray(item.niceToHave)
    ? item.niceToHave
    : (Array.isArray(item.niceToHaveQualifications) ? item.niceToHaveQualifications : []);

  return {
    id: item._id || item.id || `job-${Math.random().toString(36).substring(2, 7)}`,
    _id: item._id || item.id,
    slug: item.slug || item.id || "",
    title: item.title || "Untitled Role",
    departmentKey: deptKey,
    department: deptTrack,
    departmentTrack: deptTrack,
    levelBadge: item.seniorityLevel || item.levelBadge || "SENIOR L5",
    seniorityLevel: item.seniorityLevel || item.levelBadge || "SENIOR L5",
    locationBadge: item.locationBadge || item.location || "REMOTE GLOBAL",
    salary: item.compensation || item.salary || "Competitive",
    compensation: item.compensation || item.salary || "Competitive",
    techStack: Array.isArray(item.techStack) ? item.techStack : [],
    shortSummary: item.shortSummary || item.aboutRole || "",
    aboutRole: item.aboutRole || item.shortSummary || "",
    responsibilities,
    requirements,
    niceToHave,
    keyResponsibilities: responsibilities,
    mustHaveRequirements: requirements,
    niceToHaveQualifications: niceToHave,
    benefits: Array.isArray(item.benefits) ? item.benefits : [],
    status: item.status || "published",
  };
}

/**
 * Initialize and get all jobs.
 * Merges default seed jobs with any user-created or edited jobs in localStorage.
 */
export function getAllJobs(): JobPosition[] {
  if (typeof window === "undefined") return [];
  try {
    const rawAll = localStorage.getItem(ALL_JOBS_KEY);
    if (rawAll) {
      const parsed = JSON.parse(rawAll);
      if (Array.isArray(parsed)) {
        const cleanJobs = parsed.filter(
          (j: any) =>
            !["staff-distributed-systems", "senior-full-stack", "autonomous-ai-architect", "senior-mobile-engineer", "cloud-devops-security"].includes(j.id || j.slug)
        );
        return cleanJobs;
      }
    }

    // Migration fallback: check legacy custom jobs
    const rawCustom = localStorage.getItem(CUSTOM_JOBS_KEY);
    if (rawCustom) {
      const parsedCustom = JSON.parse(rawCustom);
      if (Array.isArray(parsedCustom)) {
        const cleanCustom = parsedCustom.filter(
          (j: any) =>
            !["staff-distributed-systems", "senior-full-stack", "autonomous-ai-architect", "senior-mobile-engineer", "cloud-devops-security"].includes(j.id || j.slug)
        );
        return cleanCustom;
      }
    }

    return [];
  } catch (err) {
    console.error("Error reading jobs from localStorage:", err);
    return [];
  }
}

/**
 * Find a job by either its ID or slug.
 */
export function getJobById(idOrSlug: string): JobPosition | null {
  if (!idOrSlug) return null;
  const jobs = getAllJobs();
  const found = jobs.find(
    (j) => j.id === idOrSlug || j.slug === idOrSlug || j.id.toLowerCase() === idOrSlug.toLowerCase()
  );
  return found || null;
}

/**
 * Create a new job position.
 */
export function createJob(job: JobPosition): { success: boolean; error?: string } {
  if (typeof window === "undefined") {
    return { success: false, error: "Browser environment required." };
  }

  try {
    const existing = getAllJobs();
    // Ensure unique ID
    const exists = existing.some((j) => j.id === job.id);
    const finalJob = exists
      ? { ...job, id: `${job.id}-${Math.random().toString(36).slice(2, 6)}` }
      : job;

    const updated = [finalJob, ...existing];
    localStorage.setItem(ALL_JOBS_KEY, JSON.stringify(updated));

    // Also sync legacy custom storage
    const custom = getCustomJobs();
    const updatedCustom = [finalJob, ...custom.filter((j) => j.id !== finalJob.id)];
    localStorage.setItem(CUSTOM_JOBS_KEY, JSON.stringify(updatedCustom));

    window.dispatchEvent(new Event("vexus_jobs_updated"));
    return { success: true };
  } catch (err) {
    console.error("Failed to create job:", err);
    return { success: false, error: "Storage error occurred while creating job." };
  }
}

/**
 * Update an existing job position by ID or original slug.
 */
export function updateJob(id: string, updatedJob: JobPosition): { success: boolean; error?: string } {
  if (typeof window === "undefined") {
    return { success: false, error: "Browser environment required." };
  }

  try {
    const existing = getAllJobs();
    const index = existing.findIndex((j) => j.id === id || j.slug === id);

    if (index === -1) {
      // If not found, append it
      const updated = [updatedJob, ...existing];
      localStorage.setItem(ALL_JOBS_KEY, JSON.stringify(updated));
    } else {
      const updated = [...existing];
      updated[index] = { ...updatedJob, id: existing[index].id }; // preserve original id reference
      localStorage.setItem(ALL_JOBS_KEY, JSON.stringify(updated));
    }

    // Sync legacy custom storage
    const custom = getCustomJobs();
    const customIdx = custom.findIndex((j) => j.id === id || j.slug === id);
    if (customIdx !== -1) {
      const updatedCustom = [...custom];
      updatedCustom[customIdx] = updatedJob;
      localStorage.setItem(CUSTOM_JOBS_KEY, JSON.stringify(updatedCustom));
    }

    window.dispatchEvent(new Event("vexus_jobs_updated"));
    return { success: true };
  } catch (err) {
    console.error("Failed to update job:", err);
    return { success: false, error: "Storage error occurred while updating job." };
  }
}

/**
 * Delete a job position by ID or slug.
 */
export function deleteJob(id: string): { success: boolean; error?: string } {
  if (typeof window === "undefined") {
    return { success: false, error: "Browser environment required." };
  }

  try {
    const existing = getAllJobs();
    const updated = existing.filter((j) => j.id !== id && j.slug !== id);
    localStorage.setItem(ALL_JOBS_KEY, JSON.stringify(updated));

    // Sync legacy custom storage
    const custom = getCustomJobs();
    const updatedCustom = custom.filter((j) => j.id !== id && j.slug !== id);
    localStorage.setItem(CUSTOM_JOBS_KEY, JSON.stringify(updatedCustom));

    window.dispatchEvent(new Event("vexus_jobs_updated"));
    return { success: true };
  } catch (err) {
    console.error("Failed to delete job:", err);
    return { success: false, error: "Failed to delete job." };
  }
}

/**
 * Restore all jobs back to initial defaults.
 */
export function resetJobsToDefault(): { success: boolean } {
  if (typeof window === "undefined") return { success: false };
  localStorage.setItem(ALL_JOBS_KEY, JSON.stringify(JOB_POSITIONS));
  localStorage.removeItem(CUSTOM_JOBS_KEY);
  window.dispatchEvent(new Event("vexus_jobs_updated"));
  return { success: true };
}

// -------------------------------------------------------------
// Backwards Compatibility Helpers (for legacy pages)
// -------------------------------------------------------------

export function getCustomJobs(): JobPosition[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOM_JOBS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCustomJob(job: JobPosition): { success: boolean; error?: string } {
  return createJob(job);
}

export function deleteCustomJob(jobId: string): { success: boolean; error?: string } {
  return deleteJob(jobId);
}

export function getAllCombinedJobs(): JobPosition[] {
  return getAllJobs();
}
