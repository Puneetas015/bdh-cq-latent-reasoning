"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Layers, Cpu, CheckCircle2 } from "lucide-react";

export default function EquationsSection() {
  const [activeStep, setActiveStep] = useState<"associative" | "relaxation">("relaxation");
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null);

  return (
    <section id="section-method" className="py-14 border-b border-white/10 space-y-10">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-orange-400 bg-orange-500/10 border border-orange-500/20 mb-2">
          <span>04 MATHEMATICAL FOUNDATION</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Associative Memory & Continuous Relaxation
        </h2>
        <p className="text-sm text-neutral-400 mt-2 max-w-3xl leading-relaxed">
          How BDH-CQ replaces autoregressive sequence generation with two forward-pass operations: 
          one-shot contextual demonstration assimilation and recurrence depth minimization.
        </p>
      </div>

      {/* Equations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Card 1: Associative Memory Update */}
        <div
          onClick={() => setActiveStep("associative")}
          className={`p-7 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-md flex flex-col justify-between space-y-6 ${
            activeStep === "associative"
              ? "bg-neutral-900/90 border-orange-500/60 shadow-xl shadow-orange-500/10"
              : "bg-neutral-950/60 border-white/10 hover:border-white/20"
          }`}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center text-xs font-mono font-bold">
                  01
                </span>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  In-Context Associative Assimilation
                </h3>
              </div>
              <span className="text-[11px] font-mono text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded border border-orange-500/30">
                Forward Pass Only
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Task demonstrations are fused into an associative weight matrix during a single forward pass without test-time backpropagation or fine-tuning.
            </p>

            {/* Rendered Mathematical Typography */}
            <div className="p-6 rounded-xl bg-black/80 border border-neutral-800 shadow-inner flex items-center justify-center select-none">
              <div className="text-xl sm:text-2xl font-mono tracking-wider text-amber-300 flex items-center gap-2">
                <span
                  onMouseEnter={() => setHoveredTerm("S_t")}
                  onMouseLeave={() => setHoveredTerm(null)}
                  className="hover:text-white cursor-pointer transition border-b border-dashed border-amber-400/40"
                >
                  S<sub>t</sub>
                </span>
                <span className="text-neutral-500 font-sans">=</span>
                <span
                  onMouseEnter={() => setHoveredTerm("U_theta")}
                  onMouseLeave={() => setHoveredTerm(null)}
                  className="text-orange-400 hover:text-white cursor-pointer transition border-b border-dashed border-orange-500/40"
                >
                  U<sub>θ</sub>
                </span>
                <span className="text-neutral-400">(</span>
                <span
                  onMouseEnter={() => setHoveredTerm("S_prev")}
                  onMouseLeave={() => setHoveredTerm(null)}
                  className="hover:text-white cursor-pointer transition border-b border-dashed border-amber-400/40"
                >
                  S<sub>t-1</sub>
                </span>
                <span className="text-neutral-500">,</span>
                <span
                  onMouseEnter={() => setHoveredTerm("D_t")}
                  onMouseLeave={() => setHoveredTerm(null)}
                  className="text-cyan-400 hover:text-white cursor-pointer transition border-b border-dashed border-cyan-400/40"
                >
                  D<sub>t</sub>
                </span>
                <span className="text-neutral-400">)</span>
              </div>
            </div>

            {/* Variable Breakdown */}
            <div className="space-y-2 text-xs font-mono text-neutral-400 pt-2">
              <div className="p-2 rounded bg-neutral-900/60 border border-white/5 flex items-start gap-2">
                <span className="text-amber-300 font-bold w-14 shrink-0">S_t:</span>
                <span>Context memory tensor in ℝ<sup>d × d</sup> maintaining constant O(1) space.</span>
              </div>
              <div className="p-2 rounded bg-neutral-900/60 border border-white/5 flex items-start gap-2">
                <span className="text-orange-400 font-bold w-14 shrink-0">U_θ:</span>
                <span>Inference-frozen linear projection operator simulating Hebbian storage.</span>
              </div>
              <div className="p-2 rounded bg-neutral-900/60 border border-white/5 flex items-start gap-2">
                <span className="text-cyan-400 font-bold w-14 shrink-0">D_t:</span>
                <span>Observation tuple (x_demo, y_demo) integrated without parameter updates.</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-neutral-500 flex justify-between items-center">
            <span>Zero backpropagation cost</span>
            <span className="text-orange-400 font-bold">100% In-Context</span>
          </div>
        </div>

        {/* Card 2: Recurrent Latent Relaxation */}
        <div
          onClick={() => setActiveStep("relaxation")}
          className={`p-7 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-md flex flex-col justify-between space-y-6 ${
            activeStep === "relaxation"
              ? "bg-neutral-900/90 border-emerald-500/60 shadow-xl shadow-emerald-500/10"
              : "bg-neutral-950/60 border-white/10 hover:border-white/20"
          }`}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">
                  02
                </span>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  Recurrent Latent State Relaxation
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30">
                Zero Token Emissions
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Complex constraint manifolds settle into energy minima by cycling an internal continuous vector through a sparse non-negative dynamical operator.
            </p>

            {/* Rendered Mathematical Typography */}
            <div className="p-6 rounded-xl bg-black/80 border border-neutral-800 shadow-inner flex items-center justify-center select-none overflow-x-auto">
              <div className="text-lg sm:text-xl font-mono tracking-wider text-emerald-300 flex items-center gap-1.5 whitespace-nowrap">
                <span className="text-emerald-400 font-bold">
                  h<sub>t+1</sub>
                </span>
                <span className="text-neutral-500 font-sans">=</span>
                <span className="text-neutral-300 font-sans">LayerNorm</span>
                <span className="text-neutral-400">(</span>
                <span>h<sub>t</sub></span>
                <span className="text-neutral-500 font-sans">+</span>
                <span className="text-amber-400 font-bold">α</span>
                <span className="text-neutral-500">·</span>
                <span className="text-orange-400 font-semibold">ReLU</span>
                <span className="text-neutral-400">(</span>
                <span className="text-white">W</span>
                <span>h<sub>t</sub></span>
                <span className="text-neutral-500">-</span>
                <span className="text-purple-400">b</span>
                <span className="text-neutral-400">)</span>
                <span className="text-neutral-400">)</span>
              </div>
            </div>

            {/* Variable Breakdown */}
            <div className="space-y-2 text-xs font-mono text-neutral-400 pt-2">
              <div className="p-2 rounded bg-neutral-900/60 border border-white/5 flex items-start gap-2">
                <span className="text-emerald-400 font-bold w-16 shrink-0">h_t:</span>
                <span>Continuous latent state vector in ℝ<sup>32</sup> (stationary working memory).</span>
              </div>
              <div className="p-2 rounded bg-neutral-900/60 border border-white/5 flex items-start gap-2">
                <span className="text-orange-400 font-bold w-16 shrink-0">ReLU:</span>
                <span>Non-negative activation gating inducing ~5% biological monosemantic sparsity.</span>
              </div>
              <div className="p-2 rounded bg-neutral-900/60 border border-white/5 flex items-start gap-2">
                <span className="text-amber-400 font-bold w-16 shrink-0">α, W, b:</span>
                <span>Step relaxation factor, recurrence matrix, and energy bias defining the attractor.</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-neutral-500 flex justify-between items-center">
            <span>Deterministic state convergence</span>
            <span className="text-emerald-400 font-bold">Attractor Basin</span>
          </div>
        </div>
      </div>

      {/* Interactive Dataflow Pipeline Diagram */}
      <div className="p-6 rounded-2xl bg-neutral-950/60 border border-white/10 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-orange-400" />
            <span className="text-white font-bold">End-to-End Latent Compute Signal Pipeline</span>
          </div>
          <span className="text-neutral-500 hidden sm:inline">Execution Flow: Left → Right</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center py-3 text-center">
          <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/10">
            <span className="text-[10px] font-mono text-neutral-500 block uppercase">Step 01</span>
            <span className="text-sm font-bold text-white block mt-1">Prompt / Demos</span>
            <span className="text-[11px] font-mono text-neutral-400 mt-1 block">Context Input X</span>
          </div>

          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
            <span className="text-[10px] font-mono text-orange-400 block uppercase">Step 02</span>
            <span className="text-sm font-bold text-orange-300 block mt-1">Associative Store</span>
            <span className="text-[11px] font-mono text-neutral-300 mt-1 block">S<sub>t</sub> = U<sub>θ</sub>(S<sub>t-1</sub>, D<sub>t</sub>)</span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-[10px] font-mono text-emerald-400 block uppercase">Step 03</span>
            <span className="text-sm font-bold text-emerald-300 block mt-1">Recurrent Loop</span>
            <span className="text-[11px] font-mono text-neutral-300 mt-1 block">h<sub>t</sub> → h<sub>t+1</sub> (Depth T)</span>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/10">
            <span className="text-[10px] font-mono text-neutral-500 block uppercase">Step 04</span>
            <span className="text-sm font-bold text-white block mt-1">Projection Head</span>
            <span className="text-[11px] font-mono text-neutral-400 mt-1 block">Output Answer Y</span>
          </div>
        </div>
      </div>
    </section>
  );
}