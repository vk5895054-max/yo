"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

// Classic 4-Pointed Vector Sparkle Star
function SparkleStar({
  size = 18,
  color = "#0066ff",
  className = "",
  style = {},
}: {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ color, ...style }}
    >
      <path
        d="M12 0C12 7 17 12 24 12C17 12 12 17 12 24C12 17 7 12 0 12C7 12 12 7 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function HeroOrbitShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const ring4Ref = useRef<HTMLDivElement>(null);

  // Dynamic physical rotation & scroll tracking
  const angleRef = useRef<number>(0);
  const velocityRef = useRef<number>(-0.25); // default subtle anticlockwise drift
  const scrollYRef = useRef<number>(0);
  const lastMousePosRef = useRef<{ x: number; y: number; time: number } | null>(null);

  // Parallax translation states for scroll depth
  const [scrollParallax, setScrollParallax] = useState({ y: 0, scale: 1, starY1: 0, starY2: 0 });
  const [tiltOffset, setTiltOffset] = useState({ x: 0, y: 0 });

  // 1. High-Performance Scroll Listener: Injects momentum & creates luxurious 3D parallax depth
  useEffect(() => {
    let ticking = false;
    let lastScroll = typeof window !== "undefined" ? window.scrollY : 0;
    let lastTime = performance.now();

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const now = performance.now();
          const dy = currentScroll - lastScroll;

          // Natural momentum: Scrolling down injects elegant spin into the orbits!
          const spinImpulse = Math.min(Math.max(dy * 0.035, -3), 3);
          velocityRef.current -= spinImpulse;

          scrollYRef.current = currentScroll;
          lastScroll = currentScroll;
          lastTime = now;

          // Parallax depth calculation:
          // Clamped safely on small screens to never push circles over cards below
          const isSmallScreen = window.innerWidth < 1024;
          const maxParallaxY = isSmallScreen ? 12 : 75;
          const parallaxFactor = isSmallScreen ? 0.03 : 0.14;

          setScrollParallax({
            y: Math.min(currentScroll * parallaxFactor, maxParallaxY),
            scale: Math.min(1 + currentScroll * (isSmallScreen ? 0.0001 : 0.0003), 1.05),
            starY1: Math.max(currentScroll * (isSmallScreen ? -0.1 : -0.22), -80),
            starY2: Math.max(currentScroll * (isSmallScreen ? -0.05 : -0.11), -45),
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Cursor movement handler: spins clockwise or anticlockwise with 3D tactile tilt
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const now = performance.now();

    // 3D tactile perspective tilt
    const tiltX = ((mouseX - cx) / (rect.width / 2)) * 7;
    const tiltY = ((mouseY - cy) / (rect.height / 2)) * -7;
    setTiltOffset({ x: tiltX, y: tiltY });

    if (lastMousePosRef.current) {
      const dx = mouseX - lastMousePosRef.current.x;
      const dy = mouseY - lastMousePosRef.current.y;

      // Angular torque calculation: (rx * dy - ry * dx)
      const rx = mouseX - cx;
      const ry = mouseY - cy;
      const torque = (rx * dy - ry * dx) / Math.max(80, Math.hypot(rx, ry));

      // Direct horizontal scrub influence:
      // Moving left (dx < 0) pushes anticlockwise
      // Moving right (dx > 0) pushes clockwise
      const scrubImpulse = dx * 0.12;
      const angularImpulse = torque * 0.18;

      velocityRef.current += scrubImpulse + angularImpulse;
      velocityRef.current = Math.max(-10, Math.min(10, velocityRef.current));
    }

    lastMousePosRef.current = { x: mouseX, y: mouseY, time: now };
  }, []);

  const handleMouseLeave = () => {
    lastMousePosRef.current = null;
    setTiltOffset({ x: 0, y: 0 });
  };

  // 3. 60fps Physics & Smooth Rotation Loop
  useEffect(() => {
    let animId: number;

    const update = () => {
      // Natural damping towards gentle anticlockwise ambient float (-0.22 deg/frame)
      const ambientFloat = -0.22;
      velocityRef.current += (ambientFloat - velocityRef.current) * 0.036;

      angleRef.current += velocityRef.current;
      const baseAngle = angleRef.current;

      // Proportional gear ratios to concentric rings for organic celestial depth
      if (ring1Ref.current) {
        ring1Ref.current.style.transform = `translate(-50%, -50%) rotate(${baseAngle * 1.3}deg)`;
      }
      if (ring2Ref.current) {
        ring2Ref.current.style.transform = `translate(-50%, -50%) rotate(${baseAngle * 1.0}deg)`;
      }
      if (ring3Ref.current) {
        ring3Ref.current.style.transform = `translate(-50%, -50%) rotate(${baseAngle * 0.74}deg)`;
      }
      if (ring4Ref.current) {
        ring4Ref.current.style.transform = `translate(-50%, -50%) rotate(${baseAngle * 0.52}deg)`;
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[420px] lg:max-w-[490px] aspect-square mx-auto select-none cursor-crosshair overflow-visible perspective-[1200px] mb-8 sm:mb-12 lg:mb-0"
    >
      {/* Dynamic 3D Perspective + Smooth Scroll Parallax Wrapper */}
      <div
        style={{
          transform: `translateY(${scrollParallax.y}px) scale(${scrollParallax.scale}) rotateY(${tiltOffset.x}deg) rotateX(${tiltOffset.y}deg)`,
          transition: "transform 0.12s ease-out",
        }}
        className="relative w-full h-full flex items-center justify-center will-change-transform"
      >
        {/* Ambient Radiant Energy Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72%] h-[72%] rounded-full bg-gradient-to-tr from-[#0066ff]/15 via-orange-400/10 to-indigo-500/5 blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* ================================================================= */}
        {/* MINIMALIST DELICATE CROSSHAIRS (NO CLUTTERED TEXT)                */}
        {/* ================================================================= */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="absolute w-[92%] h-[1px] bg-gradient-to-r from-transparent via-slate-300/35 to-transparent" />
          <div className="absolute h-[92%] w-[1px] bg-gradient-to-b from-transparent via-slate-300/35 to-transparent" />
        </div>

        {/* ================================================================= */}
        {/* CONCENTRIC ORBITAL RINGS (Sized safely at 90%, 70%, 50%, 30%)     */}
        {/* Guaranteed 100% inside container with zero left/right cut off     */}
        {/* ================================================================= */}

        {/* --------------------------------------------------------------- */}
        {/* RING 4: OUTERMOST ORBITAL RING (90% width - Fully rounded)       */}
        {/* --------------------------------------------------------------- */}
        <div
          ref={ring4Ref}
          className="absolute top-1/2 left-1/2 w-[90%] h-[90%] rounded-full border border-slate-300/65 pointer-events-none will-change-transform"
          style={{
            borderStyle: "dashed",
          }}
        >
          {/* Star riding on Ring 4 */}
          <div className="absolute -top-3 left-1/3 -translate-x-1/2">
            <SparkleStar size={20} color="#0066ff" className="animate-star-twinkle-1 drop-shadow-md" />
          </div>

          {/* Clean glowing orange planetary node on Ring 4 */}
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2">
            <div className="w-3 h-3 rounded-full bg-[#0066ff] shadow-[0_0_12px_#0066ff]" />
          </div>

          {/* Star riding on bottom-left of Ring 4 */}
          <div className="absolute bottom-10 left-12">
            <SparkleStar size={16} color="#64748b" className="animate-star-twinkle-3" />
          </div>

          {/* Subtle slate node on Ring 4 */}
          <div className="absolute bottom-1/4 -left-1 w-2 h-2 rounded-full bg-slate-400" />
        </div>

        {/* --------------------------------------------------------------- */}
        {/* RING 3: MIDDLE-OUTER ORBITAL RING (70% width)                    */}
        {/* --------------------------------------------------------------- */}
        <div
          ref={ring3Ref}
          className="absolute top-1/2 left-1/2 w-[70%] h-[70%] rounded-full border border-slate-300/75 pointer-events-none will-change-transform"
        >
          {/* Star riding on Ring 3 */}
          <div className="absolute top-6 right-10">
            <SparkleStar size={18} color="#0066ff" className="animate-star-twinkle-2 drop-shadow-sm" />
          </div>

          {/* Star riding on bottom-left of Ring 3 */}
          <div className="absolute bottom-8 left-10">
            <SparkleStar size={16} color="#f59e0b" className="animate-star-twinkle-4" />
          </div>

          {/* Orbiting pulse dot on Ring 3 */}
          <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0066ff] ring-4 ring-[#0066ff]/25" />
          </div>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* RING 2: MIDDLE-INNER ORBITAL RING (50% width)                    */}
        {/* --------------------------------------------------------------- */}
        <div
          ref={ring2Ref}
          className="absolute top-1/2 left-1/2 w-[50%] h-[50%] rounded-full border border-slate-300/85 pointer-events-none will-change-transform"
          style={{
            borderStyle: "dashed",
          }}
        >
          {/* Star riding on Ring 2 */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
            <SparkleStar size={16} color="#f59e0b" className="animate-star-twinkle-1" />
          </div>

          {/* Orbiting star on bottom of Ring 2 */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2">
            <SparkleStar size={15} color="#0066ff" className="animate-star-twinkle-3" />
          </div>

          {/* Clean node on Ring 2 */}
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-500" />
        </div>

        {/* --------------------------------------------------------------- */}
        {/* RING 1: INNERMOST ORBITAL RING (30% width)                       */}
        {/* --------------------------------------------------------------- */}
        <div
          ref={ring1Ref}
          className="absolute top-1/2 left-1/2 w-[30%] h-[30%] rounded-full border border-slate-400/60 pointer-events-none will-change-transform"
        >
          {/* Star on Ring 1 */}
          <div className="absolute top-2 -right-1">
            <SparkleStar size={14} color="#0066ff" className="animate-star-twinkle-2" />
          </div>

          {/* Accent dot on Ring 1 */}
          <div className="absolute bottom-2 -left-1 w-2 h-2 rounded-full bg-[#0066ff]" />
        </div>

        {/* ================================================================= */}
        {/* PURE RADIANT STAR CORE (NO WHITE CIRCLE BOX, NO TEXT BADGES)      */}
        {/* Minimalist, luxurious glowing celestial nucleus                   */}
        {/* ================================================================= */}
        <div className="relative z-10 flex items-center justify-center pointer-events-none">
          {/* Soft ambient inner aura */}
          <div className="absolute w-12 h-12 rounded-full bg-[#0066ff]/15 blur-md animate-pulse" />
          {/* Glowing central pulse dot */}
          <div className="absolute w-2 h-2 rounded-full bg-[#0066ff] shadow-[0_0_12px_#0066ff]" />
          {/* Pulsing Core Sparkle Star */}
          <SparkleStar
            size={26}
            color="#0066ff"
            className="animate-pulse drop-shadow-[0_0_10px_rgba(0,102,255,0.7)]"
          />
        </div>

        {/* ================================================================= */}
        {/* PARALLAX-RESPONSIVE CELESTIAL STARS                               */}
        {/* Floats dynamically across layers when scrolling the screen        */}
        {/* ================================================================= */}

        {/* Foreground Layer Stars (Moves faster on scroll: starY1) */}
        <div
          style={{ transform: `translateY(${scrollParallax.starY1}px)` }}
          className="absolute inset-0 pointer-events-none transition-transform duration-100 ease-out"
        >
          {/* Star: Top-Right */}
          <div className="absolute top-3 right-8 pointer-events-none z-10">
            <SparkleStar size={24} color="#0066ff" className="animate-star-twinkle-1 drop-shadow-md" />
          </div>

          {/* Star: Bottom-Right */}
          <div className="absolute bottom-6 right-10 pointer-events-none z-10">
            <SparkleStar size={25} color="#0066ff" className="animate-star-twinkle-4 drop-shadow-md" />
          </div>

          {/* Star: Mid-Left */}
          <div className="absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none z-10">
            <SparkleStar size={20} color="#0066ff" className="animate-star-twinkle-3 drop-shadow-sm" />
          </div>
        </div>

        {/* Midground Layer Stars (Moves moderately on scroll: starY2) */}
        <div
          style={{ transform: `translateY(${scrollParallax.starY2}px)` }}
          className="absolute inset-0 pointer-events-none transition-transform duration-100 ease-out"
        >
          {/* Star: Top-Left */}
          <div className="absolute top-5 left-10 pointer-events-none z-10">
            <SparkleStar size={17} color="#64748b" className="animate-star-twinkle-2" />
          </div>

          {/* Star: Mid-Right */}
          <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none z-10">
            <SparkleStar size={18} color="#f59e0b" className="animate-star-twinkle-4 drop-shadow-sm" />
          </div>

          {/* Star: Bottom-Left */}
          <div className="absolute bottom-6 left-10 pointer-events-none z-10">
            <SparkleStar size={16} color="#f59e0b" className="animate-star-twinkle-2" />
          </div>

          {/* Star: Inner Upper-Left */}
          <div className="absolute top-18 left-18 pointer-events-none z-10">
            <SparkleStar size={14} color="#94a3b8" className="animate-star-twinkle-1" />
          </div>

          {/* Star: Inner Lower-Right */}
          <div className="absolute bottom-18 right-18 pointer-events-none z-10">
            <SparkleStar size={15} color="#ff8f6b" className="animate-star-twinkle-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
