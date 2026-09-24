"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface HubLocation {
  id: string;
  name: string;
  country: string;
  role: string;
  lat: number;
  lon: number;
}

const GLOBAL_HUBS: HubLocation[] = [
  { id: "sf", name: "San Francisco", country: "USA", role: "AI Architecture HQ", lat: 37.7749, lon: -122.4194 },
  { id: "nyc", name: "New York", country: "USA", role: "Enterprise Scale Hub", lat: 40.7128, lon: -74.006 },
  { id: "ldn", name: "London", country: "UK", role: "Fintech Systems Lab", lat: 51.5074, lon: -0.1278 },
  { id: "fra", name: "Frankfurt", country: "Germany", role: "Zero-Trust Cloud Mesh", lat: 50.1109, lon: 8.6821 },
  { id: "zrh", name: "Zurich", country: "Switzerland", role: "High-Security AST Lab", lat: 47.3769, lon: 8.5417 },
  { id: "tky", name: "Tokyo", country: "Japan", role: "Autonomous Robotics Core", lat: 35.6762, lon: 139.6503 },
  { id: "sgp", name: "Singapore", country: "Singapore", role: "APAC Velocity Gateway", lat: 1.3521, lon: 103.8198 },
  { id: "blr", name: "Bengaluru", country: "India", role: "Principal Engineering Core", lat: 12.9716, lon: 77.5946 },
  { id: "syd", name: "Sydney", country: "Australia", role: "Oceania Edge Cluster", lat: -33.8688, lon: 151.2093 },
  { id: "sao", name: "São Paulo", country: "Brazil", role: "LATAM Delivery Center", lat: -23.5505, lon: -46.6333 },
];

export function InteractiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Rotation angles
  const yawRef = useRef<number>(0.6); // longitude spin
  const pitchRef = useRef<number>(0.38); // tilt angle (shows North Pole nicely)
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocityRef = useRef<{ yaw: number; pitch: number }>({ yaw: 0.0035, pitch: 0 });
  const hoveredHubRef = useRef<HubLocation | null>(null);

  const [hoveredHub, setHoveredHub] = useState<HubLocation | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Drag interaction handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isDraggingRef.current) {
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };

      yawRef.current += dx * 0.007;
      pitchRef.current = Math.max(-0.8, Math.min(0.8, pitchRef.current - dy * 0.007));
      velocityRef.current = { yaw: dx * 0.003, pitch: -dy * 0.003 };
    }

    // Hit-testing hubs for tooltip
    checkHover(mouseX, mouseY, rect.width, rect.height);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const checkHover = useCallback((mouseX: number, mouseY: number, width: number, height: number) => {
    const R = Math.min(width, height) * 0.385;
    const cx = width / 2;
    const cy = height / 2;
    const yaw = yawRef.current;
    const pitch = pitchRef.current;

    let found: HubLocation | null = null;
    let tooltipCoord: { x: number; y: number } | null = null;

    for (const hub of GLOBAL_HUBS) {
      const phi = (hub.lat * Math.PI) / 180;
      const lambda = (hub.lon * Math.PI) / 180;

      const x0 = R * Math.cos(phi) * Math.sin(lambda);
      const y0 = R * Math.sin(phi);
      const z0 = R * Math.cos(phi) * Math.cos(lambda);

      const x1 = x0 * Math.cos(yaw) + z0 * Math.sin(yaw);
      const y1 = y0;
      const z1 = -x0 * Math.sin(yaw) + z0 * Math.cos(yaw);

      const x2 = x1;
      const y2 = y1 * Math.cos(pitch) - z1 * Math.sin(pitch);
      const z2 = y1 * Math.sin(pitch) + z1 * Math.cos(pitch);

      if (z2 > 0) {
        const screenX = cx + x2;
        const screenY = cy - y2;
        const dist = Math.hypot(mouseX - screenX, mouseY - screenY);

        if (dist < 18) {
          found = hub;
          tooltipCoord = { x: screenX, y: screenY };
          break;
        }
      }
    }

    hoveredHubRef.current = found;
    setHoveredHub(found);
    setTooltipPos(tooltipCoord);
  }, []);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let startTime = performance.now();

    const render = (time: number) => {
      const elapsed = (time - startTime) * 0.001;

      // Inertia & auto-spin
      if (!isDraggingRef.current) {
        yawRef.current += 0.0038;
        // Smooth return to default pitch tilt
        pitchRef.current += (0.36 - pitchRef.current) * 0.02;
      }

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width;
      const h = rect.height;

      if (w === 0 || h === 0) {
        animationId = requestAnimationFrame(render);
        return;
      }

      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.385; // Sphere Radius
      const yaw = yawRef.current;
      const pitch = pitchRef.current;

      // -------------------------------------------------------------
      // 1. SOFT TRANSLUCENT SPHERE BACKDROP & VOLUME SHADING
      // -------------------------------------------------------------
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);

      // Radial sphere shading for 3D depth matching classic wireframe
      const sphereGrad = ctx.createRadialGradient(
        cx - R * 0.28,
        cy - R * 0.28,
        R * 0.05,
        cx,
        cy,
        R
      );
      sphereGrad.addColorStop(0, "rgba(255, 255, 255, 0.98)");
      sphereGrad.addColorStop(0.65, "rgba(248, 250, 252, 0.94)");
      sphereGrad.addColorStop(0.92, "rgba(235, 241, 248, 0.88)");
      sphereGrad.addColorStop(1, "rgba(215, 225, 238, 0.82)");

      ctx.fillStyle = sphereGrad;
      ctx.shadowColor = "rgba(15, 23, 42, 0.08)";
      ctx.shadowBlur = 32;
      ctx.shadowOffsetY = 12;
      ctx.fill();
      ctx.restore();

      // Clip subsequent rendering inside the sphere boundary
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // -------------------------------------------------------------
      // 2. 3D PROJECTION HELPER
      // -------------------------------------------------------------
      const projectPoint = (phi: number, lambda: number) => {
        const x0 = R * Math.cos(phi) * Math.sin(lambda);
        const y0 = R * Math.sin(phi);
        const z0 = R * Math.cos(phi) * Math.cos(lambda);

        // Spin around Y axis
        const x1 = x0 * Math.cos(yaw) + z0 * Math.sin(yaw);
        const y1 = y0;
        const z1 = -x0 * Math.sin(yaw) + z0 * Math.cos(yaw);

        // Tilt around X axis
        const x2 = x1;
        const y2 = y1 * Math.cos(pitch) - z1 * Math.sin(pitch);
        const z2 = y1 * Math.sin(pitch) + z1 * Math.cos(pitch);

        return {
          x: cx + x2,
          y: cy - y2,
          z: z2,
        };
      };

      // -------------------------------------------------------------
      // 3. BACK-FACING MERIDIANS & PARALLELS (FAINT)
      // -------------------------------------------------------------
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = "rgba(203, 213, 225, 0.35)";

      // Back Latitudes (Parallels)
      const latSteps = 16;
      for (let i = 1; i < latSteps; i++) {
        const phi = ((i / latSteps) * 180 - 90) * (Math.PI / 180);
        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= 72; j++) {
          const lambda = (j / 72) * Math.PI * 2;
          const pt = projectPoint(phi, lambda);
          if (pt.z <= 0) {
            if (first) {
              ctx.moveTo(pt.x, pt.y);
              first = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Back Longitudes (Meridians)
      const lonSteps = 24;
      for (let i = 0; i < lonSteps; i++) {
        const lambda = (i / lonSteps) * Math.PI * 2;
        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= 64; j++) {
          const phi = ((j / 64) * 180 - 90) * (Math.PI / 180);
          const pt = projectPoint(phi, lambda);
          if (pt.z <= 0) {
            if (first) {
              ctx.moveTo(pt.x, pt.y);
              first = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Translucent inner sphere mist to create genuine 3D glass volume
      ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

      // -------------------------------------------------------------
      // 4. FRONT-FACING WIREFRAME GRID (CRISP & ELEGANT)
      // -------------------------------------------------------------
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = "rgba(148, 163, 184, 0.55)";

      // Front Latitudes
      for (let i = 1; i < latSteps; i++) {
        const phi = ((i / latSteps) * 180 - 90) * (Math.PI / 180);
        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= 90; j++) {
          const lambda = (j / 90) * Math.PI * 2;
          const pt = projectPoint(phi, lambda);
          if (pt.z > 0) {
            if (first) {
              ctx.moveTo(pt.x, pt.y);
              first = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Front Longitudes (Meridians)
      for (let i = 0; i < lonSteps; i++) {
        const lambda = (i / lonSteps) * Math.PI * 2;
        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= 72; j++) {
          const phi = ((j / 72) * 180 - 90) * (Math.PI / 180);
          const pt = projectPoint(phi, lambda);
          if (pt.z > 0) {
            if (first) {
              ctx.moveTo(pt.x, pt.y);
              first = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // -------------------------------------------------------------
      // 5. GLOBAL HUBS (ORANGE NODES LIKE IN USER'S SCREENSHOT)
      // -------------------------------------------------------------
      for (let i = 0; i < GLOBAL_HUBS.length; i++) {
        const hub = GLOBAL_HUBS[i];
        const phi = (hub.lat * Math.PI) / 180;
        const lambda = (hub.lon * Math.PI) / 180;
        const pt = projectPoint(phi, lambda);

        if (pt.z > 0) {
          // FRONT HEMISPHERE: Vibrant, glowing signature orange dots (#0066ff)
          const isHovered = hoveredHubRef.current?.id === hub.id;
          const pulse = Math.sin(elapsed * 3 + i) * 1.5;

          // Outer glowing aura
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, (isHovered ? 13 : 9) + pulse, 0, Math.PI * 2);
          ctx.fillStyle = isHovered ? "rgba(0, 102, 255, 0.35)" : "rgba(0, 102, 255, 0.18)";
          ctx.fill();

          // Outer crisp ring
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, (isHovered ? 8 : 6.5) + pulse * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0, 102, 255, 0.35)";
          ctx.fill();

          // Solid core dot (#0066ff)
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, isHovered ? 6 : 5, 0, Math.PI * 2);
          ctx.fillStyle = "#0066ff";
          ctx.fill();

          // Clean white center glint
          ctx.beginPath();
          ctx.arc(pt.x - 1.2, pt.y - 1.2, isHovered ? 1.8 : 1.4, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();

          // Subtle label next to major hubs if hovered or on desktop
          if (isHovered) {
            ctx.save();
            ctx.font = "bold 11px system-ui, -apple-system, sans-serif";
            ctx.fillStyle = "#181a24";
            ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
            ctx.shadowBlur = 4;
            ctx.fillText(hub.name, pt.x + 10, pt.y + 3.5);
            ctx.restore();
          }
        } else {
          // BACK HEMISPHERE: Faint, translucent orange dot indicating 3D depth
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.8, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 95, 45, 0.22)";
          ctx.fill();
        }
      }

      ctx.restore(); // Restore clipping

      // -------------------------------------------------------------
      // 6. CRISP SPHERE RIM BORDER & HIGHLIGHT
      // -------------------------------------------------------------
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = "rgba(180, 195, 212, 0.75)";
      ctx.stroke();

      // Top-left subtle specular arc highlight
      ctx.beginPath();
      ctx.arc(cx, cy, R - 0.5, Math.PI * 1.1, Math.PI * 1.65);
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
      ctx.stroke();
      ctx.restore();

      ctx.restore(); // Restore canvas scale

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center select-none w-full max-w-[500px] mx-auto py-2"
    >
      {/* Subtle Classic Ambient Glow Behind the Sphere */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-gradient-to-tr from-[#0066ff]/10 via-slate-200/40 to-sky-100/20 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Classic Minimalist Category Watermark */}
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] animate-ping" />
        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#64748b]">
          GLOBAL DELIVERY ARCHITECTURE
        </span>
      </div>

      {/* =================================================================== */}
      {/* 3D WIREFRAME GLOBE CANVAS CONTAINER                                */}
      {/* =================================================================== */}
      <div className="relative w-full aspect-square max-w-[440px] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-full h-full cursor-grab active:cursor-grabbing touch-none drop-shadow-sm"
          style={{ width: "100%", height: "100%" }}
        />

        {/* ================================================================= */}
        {/* INTERACTIVE HUB TOOLTIP (CLASSIC & PREMIUM)                        */}
        {/* ================================================================= */}
        {hoveredHub && tooltipPos && (
          <div
            style={{
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y - 14}px`,
              transform: "translate(-50%, -100%)",
            }}
            className="absolute pointer-events-none z-30 transition-all duration-150 animate-in fade-in zoom-in-95"
          >
            <div className="bg-[#181a24]/95 backdrop-blur-md text-white text-xs rounded-xl py-2 px-3.5 shadow-xl border border-slate-700/80 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0066ff] animate-pulse" />
                <span className="font-bold text-sm tracking-tight text-white">
                  {hoveredHub.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                  {hoveredHub.country}
                </span>
              </div>
              <div className="text-[11px] text-slate-300 mt-1 font-sans">
                {hoveredHub.role}
              </div>
            </div>
            {/* Arrow pointer */}
            <div className="w-2 h-2 bg-[#181a24] rotate-45 mx-auto -mt-1 border-r border-b border-slate-700/80" />
          </div>
        )}

        {/* ================================================================= */}
        {/* FLOATING PIECE A: TOP-LEFT CLASSIC MINIMALIST BADGE                */}
        {/* ================================================================= */}
        <div className="absolute top-4 -left-2 sm:-left-6 z-20 pointer-events-none hidden sm:block">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2.5 border border-slate-200/90 shadow-md flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066ff] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066ff]" />
            </span>
            <div>
              <div className="text-[11px] font-bold text-[#181a24] tracking-tight">
                10 Global Delivery Hubs
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                Continuous Follow-The-Sun
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* FLOATING PIECE B: BOTTOM-RIGHT CLASSIC MINIMALIST BADGE            */}
        {/* ================================================================= */}
        <div className="absolute bottom-4 -right-2 sm:-right-6 z-20 pointer-events-none hidden sm:block">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2.5 border border-slate-200/90 shadow-md flex items-center gap-2.5">
            <span className="text-sm">⚡</span>
            <div>
              <div className="text-[11px] font-bold text-[#181a24] tracking-tight">
                &lt; 20ms Edge Mesh
              </div>
              <div className="text-[10px] text-emerald-600 font-mono font-semibold">
                99.99% Global Uptime
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classic Interactive Instruction / Active Hub Indicator */}
      <div className="mt-2 text-center">
        <span className="text-xs text-slate-500 font-medium">
          Drag to rotate globe • Click or hover nodes to explore delivery centers
        </span>
      </div>
    </div>
  );
}
