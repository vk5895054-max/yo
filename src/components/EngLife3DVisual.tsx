"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export function EngLife3DVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  // Smooth continuous rotation loop
  useEffect(() => {
    let animId: number;
    let angle = 0;
    const animate = () => {
      angle = (angle + 0.4) % 360;
      setRotationAngle(angle);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Tactile 3D tilt interaction on cursor movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // max tilt 10deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
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
      className="relative w-full max-w-[420px] aspect-square mx-auto flex items-center justify-center cursor-pointer select-none perspective-[1000px]"
    >
      {/* 3D Perspective Wrapper */}
      <div
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${isHovered ? 1.05 : 1})`,
          transition: isHovered ? "transform 0.15s ease-out" : "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
        className="relative w-full h-full flex items-center justify-center will-change-transform transform-style-3d"
      >
        {/* Ambient Glowing Energy Core */}
        <div className="absolute w-[75%] h-[75%] rounded-full bg-gradient-to-tr from-[#0066ff]/20 via-sky-400/15 to-emerald-400/10 blur-3xl pointer-events-none animate-pulse" />

        {/* Outer 3D Gyroscope Ring 1 */}
        <div
          style={{ transform: `rotate3d(1, 1, 0, ${rotationAngle}deg)` }}
          className="absolute w-[88%] h-[88%] rounded-full border-2 border-dashed border-[#0066ff]/40 shadow-[0_0_25px_rgba(0,102,255,0.18)] pointer-events-none"
        />

        {/* Outer 3D Gyroscope Ring 2 */}
        <div
          style={{ transform: `rotate3d(1, -1, 1, ${-rotationAngle * 1.2}deg)` }}
          className="absolute w-[74%] h-[74%] rounded-full border border-sky-400/50 pointer-events-none shadow-[0_0_15px_rgba(56,189,248,0.2)]"
        />

        {/* Outer 3D Gyroscope Ring 3 */}
        <div
          style={{ transform: `rotate3d(0, 1, 1, ${rotationAngle * 0.8}deg)` }}
          className="absolute w-[60%] h-[60%] rounded-full border border-emerald-400/45 pointer-events-none"
        />

        {/* Central Holographic Tech Sphere Core */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-white/95 backdrop-blur-md border border-white shadow-[0_20px_60px_rgba(0,102,255,0.28)] flex flex-col items-center justify-center p-6 text-center group transition-transform duration-300">
          {/* Top: Icon in Rounded Circle Container with Increased Border Radius */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-white via-slate-50 to-blue-50/40 border border-slate-200/90 shadow-md flex items-center justify-center p-2.5 mb-2.5 group-hover:scale-110 group-hover:border-[#0066ff]/40 transition-all duration-300">
            <Image
              src="/logo.png"
              alt="Vexus Lab Logo Icon"
              width={56}
              height={56}
              className="w-full h-full object-contain scale-110"
              priority
            />
          </div>

          {/* Middle: Vertical Stacked Name overall "Vexus Lab" */}
          <div className="flex items-baseline justify-center tracking-tight leading-none font-extrabold font-sans text-xl sm:text-2xl text-[#181a24]">
            <span>Vexus</span>
            <span className="text-[#0066ff] ml-1">Lab</span>
          </div>

          {/* Bottom: Subtitle */}
          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-[#484f6b] mt-1.5">
            ENGINEERING POD
          </span>
        </div>
      </div>
    </div>
  );
}
