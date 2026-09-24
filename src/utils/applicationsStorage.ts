"use client";

export interface JobApplication {
  id: string; // e.g., VX-APP-482910
  jobId: string;
  jobTitle: string;
  department: string;
  candidateName: string;
  email: string;
  phone: string;
  message: string;
  resumeFileName: string;
  resumeFileSize: string;
  resumeDataUrl?: string;
  submittedAt: string; // ISO string
}

const APPLICATIONS_STORAGE_KEY = "vexus_all_applications";

export const DEFAULT_APPLICATIONS: JobApplication[] = [];

/**
 * Retrieve all applications.
 */
export function getAllApplications(): JobApplication[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const clean = parsed.filter((a: any) => !a.id?.startsWith("VX-APP-"));
        return clean;
      }
    }
    return [];
  } catch (err) {
    console.error("Error loading applications from localStorage:", err);
    return [];
  }
}

/**
 * Find application by ID
 */
export function getApplicationById(id: string): JobApplication | null {
  const apps = getAllApplications();
  return apps.find((a) => a.id === id) || null;
}

/**
 * Save a new candidate application.
 */
export function saveApplication(
  appData: Omit<JobApplication, "id" | "submittedAt"> & {
    id?: string;
    submittedAt?: string;
  }
): { success: boolean; application?: JobApplication; error?: string } {
  if (typeof window === "undefined") {
    return { success: false, error: "Browser environment required." };
  }

  try {
    const apps = getAllApplications();

    const newApp: JobApplication = {
      id: appData.id || `VX-APP-${Math.floor(100000 + Math.random() * 900000)}`,
      jobId: appData.jobId || "general",
      jobTitle: appData.jobTitle || "General Application",
      department: appData.department || "Engineering",
      candidateName: appData.candidateName,
      email: appData.email,
      phone: appData.phone,
      message: appData.message || "",
      resumeFileName: appData.resumeFileName || "Resume.pdf",
      resumeFileSize: appData.resumeFileSize || "150 KB",
      resumeDataUrl: appData.resumeDataUrl,
      submittedAt: appData.submittedAt || new Date().toISOString(),
    };

    const updated = [newApp, ...apps];
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(updated));

    // Dispatch update notification event
    window.dispatchEvent(new Event("vexus_applications_updated"));

    return { success: true, application: newApp };
  } catch (err: any) {
    console.error("Error saving application:", err);
    return { success: false, error: err.message || "Failed to save application" };
  }
}

/**
 * Delete application by ID.
 */
export function deleteApplication(id: string): { success: boolean } {
  if (typeof window === "undefined") return { success: false };
  try {
    const apps = getAllApplications();
    const filtered = apps.filter((a) => a.id !== id && (a as any)._id !== id);
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event("vexus_applications_updated"));
    return { success: true };
  } catch {
    return { success: false };
  }
}

/**
 * Reset applications.
 */
export function resetApplications(): { success: boolean } {
  if (typeof window === "undefined") return { success: false };
  localStorage.removeItem(APPLICATIONS_STORAGE_KEY);
  window.dispatchEvent(new Event("vexus_applications_updated"));
  return { success: true };
}

export function resetApplicationsToDefault(): { success: boolean } {
  return resetApplications();
}
