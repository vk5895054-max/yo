"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  inverted?: boolean;
}

export function VexusLabLogo({ className = "", size = "md", inverted = false }: LogoProps) {
  const scale = size === "sm" ? 0.82 : size === "lg" ? 1.2 : 1;

  return (
    <div className={`inline-flex flex-col select-none leading-none ${className}`}>
      <div className="flex items-center gap-2">
        {/* Company Logo Image from public/logo.png */}
        <div
          className={`relative flex items-center justify-center overflow-hidden rounded-lg transition-transform duration-200 hover:scale-105 ${inverted ? "bg-white p-0.5 shadow-sm ring-1 ring-white/20" : ""
            }`}
          style={{
            width: `${30 * scale}px`,
            height: `${30 * scale}px`,
          }}
        >
          <Image
            src="/logo.png"
            alt="Vexus Labs Logo"
            width={48}
            height={48}
            priority
            className="w-full h-full object-contain scale-110"
          />
        </div>

        {/* Brand Wordmark: Vexus Labs */}
        <div className="flex items-baseline tracking-tight">
          <span
            className={`font-extrabold font-sans transition-colors duration-200 ${inverted ? "text-white" : "text-[#181a24]"
              }`}
            style={{ fontSize: `${22 * scale}px`, letterSpacing: "-0.03em" }}
          >
            Vexus
          </span>
          <span
            className="font-extrabold text-[#0066ff] font-sans ml-1"
            style={{ fontSize: `${22 * scale}px`, letterSpacing: "-0.03em" }}
          >
            Labs
          </span>
        </div>
      </div>

      {/* Subtitle */}
      <span
        className={`font-medium tracking-normal font-sans transition-colors duration-200 ${inverted ? "text-[#8b949e]" : "text-[#484f6b]"
          }`}
        style={{
          fontSize: `${9.5 * scale}px`,
          marginTop: `${3 * scale}px`,
          letterSpacing: "0.02em",
          paddingLeft: `${36 * scale}px`,
        }}
      >
      </span>
    </div>
  );
}
