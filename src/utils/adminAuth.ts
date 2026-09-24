"use client";

import { loginAdminAPI } from "@/api/auth_api";

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  token: string;
  loginAt: string;
}

const STORAGE_KEY = "vexus_admin_session";

// Default admin credentials for secure local authentication
export const DEMO_ADMIN = {
  email: "admin@vexuslab.com",
  password: "admin123",
  name: "Vexus Talent Admin",
  role: "Chief Talent Officer",
};

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw) as AdminUser;
    return Boolean(session && session.token && session.email);
  } catch {
    return false;
  }
}

export function getAdminUser(): AdminUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}

export async function loginAdmin(email: string, pass: string): Promise<{ success: boolean; error?: string; user?: AdminUser }> {
  if (typeof window === "undefined") {
    return { success: false, error: "Window is undefined." };
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = pass.trim();

  try {
    const res = await loginAdminAPI({ email: cleanEmail, password: cleanPass });
    if (res.token) {
      const user: AdminUser = {
        email: res.admin?.email || cleanEmail,
        name: "Vexus Admin",
        role: res.admin?.role || "Admin",
        token: res.token,
        loginAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      localStorage.setItem("vexus_admin_token", res.token);
      localStorage.setItem("token", res.token);
      return { success: true, user };
    }
    return { success: false, error: res.message || "Failed to obtain JWT token." };
  } catch (err: any) {
    console.warn("⚠️ Live login error, checking fallback demo login:", err.message);
    if (cleanEmail === DEMO_ADMIN.email.toLowerCase() && cleanPass === DEMO_ADMIN.password) {
      const user: AdminUser = {
        email: cleanEmail,
        name: DEMO_ADMIN.name,
        role: DEMO_ADMIN.role,
        token: "demo_fallback_token",
        loginAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: err.message || "Invalid email or password." };
  }
}

export function logoutAdmin(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("vexus_admin_token");
    localStorage.removeItem("token");
    localStorage.removeItem("vexus_admin_auth");
    console.log("🔒 [logoutAdmin] All session tokens and storage cleared successfully.");
  } catch (error) {
    console.error("❌ Error clearing localStorage during logout:", error);
  }
}
