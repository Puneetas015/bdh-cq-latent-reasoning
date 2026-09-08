"use client";

import React, { useState, useEffect, useRef } from "react";
import ScrambleTitle from "./ScrambleTitle";
import { ArrowRight, BookOpen, Users, Compass, Sparkles } from "lucide-react";

export default function HeroSection() {
  const [stage, setStage] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 500);
    const t2 = setTimeout(() => setStage(2), 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const smoothScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Orbiting attractor canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    let animId: number;

    const render = () => {
      time += 0.022;
      const w = (canvas.width = 380);
      const h = (canvas.height = 380);
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Coordinate crosshairs
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, 20);
      ctx.lineTo(cx, h - 20);
      ctx.moveTo(20, cy);
      ctx.lineTo(w - 20, cy);
      ctx.stroke();

      // Concentric orbit rings
      [55, 90, 125].forEach((radius, i) => {
        ctx.strokeStyle = i === 1 ? "rgba(249, 115, 22, 0.28)" : "rgba(249, 115, 22, 0.12)";
        ctx.lineWidth = i === 1 ? 1.5 : 1;
        if (i === 1) ctx.setLineDash([4, 4]);
        else ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Particles
      const particles = [
        { r: 90, speed: 1.8, offset: 0, color: "#f97316", size: 4 },
        { r: 90, speed: 1.8, offset: (2 * Math.PI) / 3, color: "#fb923c", size: 3.5 },
        { r: 90, speed: 1.8, offset: (4 * Math.PI) / 3, color: "#fdba74", size: 3.5 },
        { r: 125, speed: -0.9, offset: 1.2, color: "#ea580c", size: 2.5 },
        { r: 55, speed: 2.6, offset: 2.4, color: "#fbbf24", size: 2.5 },
      ];

      particles.forEach((p) => {
        const angle = time * p.speed + p.offset;
        const px = cx + Math.cos(angle) * p.r;
        const py = cy + Math.sin(angle) * p.r;

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Problem entering vector
      const cycle = (time * 0.35) % 1;
      if (cycle < 0.34) {
        const prog = cycle / 0.34;
        const startX = 25;
        const curX = startX + prog * (cx - startX - 45);

        ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(startX, cy);
        ctx.lineTo(curX, cy);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = "#38bdf8";
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(curX, cy, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.fillText("Problem X", startX, cy - 10);
      }

      // Solution emerging vector
      if (cycle > 0.66) {
        const outProg = (cycle - 0.66) / 0.34;
        const endX = w - 25;
        const curX = cx + 45 + outProg * (endX - (cx + 45));

        ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(cx + 45, cy);
        ctx.lineTo(curX, cy);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = "#10b981";
        ctx.shadowColor = "#10b981";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(curX, cy, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = "#10b981";
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.fillText("Solution Y", endX - 60, cy + 18);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="py-12 md:py-20 border-b border-white/10 relative z-10 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        {/* Left Column */}
        <div className="md:col-span-7 space-y-6">
          <div
            className={`transition-all duration-700 ${
              stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-orange-400 bg-orange-500/10 border border-orange-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
              <span>DATAFORGE 2026 // PATHWAY TRACK: PROBLEM STATEMENT ROUND</span>
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-150 ${
              stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <ScrambleTitle
              text="What if reasoning didn't require more words?"
              className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight uppercase"
            />
          </div>

          <p
            className={`text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed transition-all duration-700 delay-300 ${
              stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Recurrent latent computation repeatedly updates an internal state instead of extending an explicit reasoning transcript.
          </p>

          <div
            className={`flex flex-wrap items-center gap-4 pt-2 transition-all duration-700 delay-500 ${
              stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <button
              onClick={() => smoothScrollTo("section-sandbox")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-orange-500 hover:bg-orange-400 text-black transition-all shadow-lg shadow-orange-500/20 cursor-pointer"
            >
              <span>Explore Sandbox</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => smoothScrollTo("section-method")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-neutral-700 hover:border-neutral-500 text-neutral-300 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read the Method</span>
            </button>
          </div>
        </div>

        {/* Right Column Visual */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center bg-neutral-950/70 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md overflow-hidden">
            <canvas ref={canvasRef} width={380} height={380} className="w-full h-full block" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none">
              <div className="absolute w-28 h-28 rounded-full bg-orange-500/10 blur-xl animate-pulse" />
              <div className="relative z-10 px-4 py-2.5 rounded-xl bg-neutral-950/90 border border-orange-500/40 shadow-xl shadow-orange-500/20 flex flex-col items-center text-center">
                <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block font-semibold mb-0.5">
                  Internal State
                </span>
                <span className="font-mono text-sm font-bold text-orange-400 flex items-center gap-1">
                  <span>h</span>
                  <sub className="text-[10px] text-orange-300 -bottom-1">t</sub>
                  <span className="text-neutral-400 font-normal mx-0.5">∈</span>
                  <span>ℝ</span>
                  <sup className="text-[10px] text-orange-300 -top-1">32</sup>
                </span>
                <span className="text-[9px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Relaxing
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 mt-3 text-center">
            <Sparkles className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span>Problem enters latent state, relaxes across depth T, emerges as Solution</span>
          </div>
        </div>
      </div>

      {/* Relocated Research Audience & Prerequisites Card */}
      <div className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-neutral-950/60 border border-white/5 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 shrink-0 mt-0.5">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-neutral-400 font-bold block">
                Target Audience
              </span>
              <p className="text-xs text-neutral-300 mt-0.5">
                ML Researchers & Data Scientists familiar with Transformer Attention & Recurrent State Models.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-neutral-800 border border-white/10 text-neutral-300 shrink-0 mt-0.5">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-neutral-400 font-bold block">
                Prerequisites
              </span>
              <p className="text-xs text-neutral-300 mt-0.5 font-mono">
                Linear Attention, Hebbian Learning, Latent State Dynamics
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}