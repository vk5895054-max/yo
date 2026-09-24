"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800 font-sans">
      <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-slate-200 shadow-xl text-center space-y-4">
        <div className="w-10 h-10 border-3 border-[#0066ff] border-t-transparent rounded-full animate-spin mx-auto" />
        <h2 className="text-lg font-bold text-slate-900">Routing to Dashboard...</h2>
        <p className="text-xs text-slate-500">
          The dashboard has been updated to the white theme with navigation drawer at <code className="font-mono text-slate-800">/dashboard</code>.
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-4 py-2 rounded-xl text-xs font-bold bg-[#0066ff] text-white shadow-xs"
        >
          Go to /dashboard →
        </Link>
      </div>
    </div>
  );
}
