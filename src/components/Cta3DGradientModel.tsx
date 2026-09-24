"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export function Cta3DGradientModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  // Smooth continuous rotation loop for outer 3D rings
  useEffect(() => {
    let animId: number;
    let angle = 0;
    const animate = () => {
      angle = (angle + 0.45) % 360;
      setRotationAngle(angle);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // 3D tilt interaction on cursor movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 22; // max tilt 11deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -22;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[420px] aspect-square mx-auto flex items-center justify-center cursor-pointer select-none perspective-[1000px] py-4"
    >
      {/* 3D Perspective Wrapper */}
      <div
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${isHovered ? 1.05 : 1})`,
          transition: isHovered
            ? "transform 0.12s ease-out"
            : "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
        className="relative w-full h-full flex items-center justify-center will-change-transform transform-style-3d"
      >
        {/* Multi-Stop Glowing Ambient Energy Core */}
        <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-[#0066ff]/30 via-[#8b5cf6]/25 to-[#06b6d4]/20 blur-3xl pointer-events-none animate-pulse" />

        {/* Outer 3D Gyroscope Ring 1 (Cyan/Blue Dashed) */}
        <div
          style={{ transform: `rotate3d(1, 1, 0, ${rotationAngle}deg)` }}
          className="absolute w-[90%] h-[90%] rounded-full border-2 border-dashed border-[#0066ff]/45 shadow-[0_0_30px_rgba(0,102,255,0.3)] pointer-events-none"
        />

        {/* Outer 3D Gyroscope Ring 2 (Purple/Violet Solid) */}
        <div
          style={{ transform: `rotate3d(1, -1, 1, ${-rotationAngle * 1.3}deg)` }}
          className="absolute w-[76%] h-[76%] rounded-full border-2 border-purple-500/50 shadow-[0_0_20px_rgba(139,92,246,0.35)] pointer-events-none"
        />

        {/* Outer 3D Gyroscope Ring 3 (Emerald/Teal Glow) */}
        <div
          style={{ transform: `rotate3d(0, 1, 1, ${rotationAngle * 0.9}deg)` }}
          className="absolute w-[62%] h-[62%] rounded-full border border-teal-400/50 pointer-events-none shadow-[0_0_15px_rgba(45,212,191,0.25)]"
        />

        {/* Central Holographic 3D Glass Sphere Core */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-b from-[#111833]/95 via-[#0c1329]/95 to-[#070b1c]/98 border border-white/20 shadow-[0_25px_70px_rgba(0,102,255,0.4)] backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center group transition-all duration-300 ring-1 ring-white/10">
          {/* Logo Badge in 3D Container */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-white/10 via-white/5 to-blue-500/10 border border-white/20 shadow-lg flex items-center justify-center p-2.5 mb-2.5 group-hover:scale-110 group-hover:border-[#0066ff] transition-all duration-300">
            <Image
              src="/logo.png"
              alt="Vexus Lab 3D Logo Core"
              width={56}
              height={56}
              className="w-full h-full object-contain scale-110 drop-shadow-[0_0_12px_rgba(0,102,255,0.8)]"
              priority
            />
          </div>

          {/* Core Name */}
          <div className="flex items-baseline justify-center tracking-tight leading-none font-extrabold font-sans text-xl sm:text-2xl text-white">
            <span>Vexus</span>
            <span className="text-[#38bdf8] ml-1">Lab</span>
          </div>

          {/* Subtitle */}
          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-[#0066ff] mt-1.5">
            HIGH-VELOCITY 3D CORE
          </span>
        </div>
      </div>
    </div>
  );
}
