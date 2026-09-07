"use client";

import { useEffect, useRef } from "react";

interface Props {
  tStep: number;
  tMax: number;
  trapped: boolean;
}

export default function AttractorCanvas({ tStep, tMax, trapped }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    // Draw Gridlines
    ctx.strokeStyle = "#1A2333";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Points calculation: Target star at center-right
    const targetX = w * 0.78;
    const targetY = h * 0.45;
    const startX = w * 0.15;
    const startY = h * 0.75;

    // Attractor path with a subtle curve
    const points: [number, number][] = [];
    for (let i = 0; i <= tMax; i++) {
      const prog = i / tMax;
      let px = startX + (targetX - startX) * prog;
      let py = startY + (targetY - startY) * Math.sin((prog * Math.PI) / 2);
      if (trapped && i > 6) {
        // Stall in local minimum
        px += 8 * Math.sin(i * 1.5);
        py += 15 * Math.cos(i * 1.2);
      }
      points.push([px, py]);
    }

    // Draw Trajectory line up to current step
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i <= tStep; i++) {
      ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.strokeStyle = "#00D26A";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw target star
    ctx.fillStyle = "#F59E0B";
    ctx.beginPath();
    ctx.arc(targetX, targetY, 7, 0, Math.PI * 2);
    ctx.fill();

    // Draw Current State Point
    const curr = points[tStep];
    ctx.fillStyle = "#3B82F6";
    ctx.beginPath();
    ctx.arc(curr[0], curr[1], 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.stroke();

  }, [tStep, tMax, trapped]);

  return (
    <div className="w-full h-56 bg-bgDark rounded-xl border border-borderDark relative overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-2 left-3 text-[10px] font-mono text-mutedGray">
        PCA Latent Space (h_t ∈ ℝ³²) 
      </div>
      <div className="absolute bottom-2 right-3 text-[10px] font-mono text-brandAmber flex items-center gap-1">
        ★ Target Attractor Basin 
      </div>
    </div>
  );
}
