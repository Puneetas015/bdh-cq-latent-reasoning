"use client";

import React from "react";
import { EyeOff, AlertTriangle, Crosshair, RefreshCw, Github, ExternalLink, ShieldCheck, User } from "lucide-react";

export default function HonestySection() {
  const limitations = [
    {
      id: "01",
      title: "The Mechanistic Observability Gap",
      icon: EyeOff,
      short: "Absence of inspectable reasoning scratchpads",
      description:
        "Autoregressive Chain-of-Thought produces human-readable diagnostic transcripts that expose intermediate logical missteps. In BDH-CQ, reasoning unfolds inside continuous 32-dimensional latent vectors. When a constraint fails, researchers cannot easily audit intermediate steps without probing projection heads or running linear readouts.",
      mitigation: "Future work requires integrating sparse autoencoders (SAEs) directly over recurrent trajectories.",
    },
    {
      id: "02",
      title: "Non-Convex Attractor Trapping",
      icon: AlertTriangle,
      short: "Local energy minima without symbolic backtracking",
      description:
        "Recurrent state relaxation behaves dynamically as an energy minimization process over an associative manifold. On highly deceptive constraint puzzles, the latent state can settle into suboptimal local minima. Unlike token models that can backtrack via rejection sampling, pure latent loops require external perturbation noise.",
      mitigation: "Stochastic noise injection (simulated in our sandbox) helps kick states out of false attractors.",
    },
    {
      id: "03",
      title: "Domain Scope & Conversational Boundary",
      icon: Crosshair,
      short: "Verified on discrete grids, unproven on open dialogue",
      description:
        "Empirical efficiency gains (29.5% ARC pass@2 at $0.0007) are established on structured, multi-constraint visual and spatial benchmarks (ARC-AGI-1, Latin Squares, Sudoku). Generalization to open-ended dialogue, mathematical theorem proving, or code synthesis remains unverified.",
      mitigation: "Hybrid architectures coupling token decoders with latent recurrent cores offer the most plausible transition.",
    },
    {
      id: "04",
      title: "Recurrent Depth Vanishing Gradients",
      icon: RefreshCw,
      short: "Depth saturation beyond T = 24 iterations",
      description:
        "While memory complexity remains constant at O(1), extending recurrence depth beyond T = 20-24 steps exhibits diminishing returns. Without residual normalization and non-negative ReLU activation clamping, deep latent relaxation can suffer from spectral radius drift.",
      mitigation: "LayerNorm and strict non-negative clamping are mandatory to guarantee asymptotic contraction mapping.",
    },
  ];

  return (
    <section id="section-limitations" className="py-14 space-y-12">
      {/* 07 Scientific Limitations */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-orange-400 bg-orange-500/10 border border-orange-500/20 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>07 SCIENTIFIC RIGOR &amp; BOUNDARIES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Honest Boundaries &amp; Failure Modes
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-500">
            Falsifiable Analysis • NeurIPS Education Standards
          </span>
        </div>

        <p className="text-sm text-neutral-400 max-w-3xl leading-relaxed">
          Peer-reviewed research requires transparently identifying where architectures degrade. Below is the operational failure profile of latent recurrence in comparison to autoregressive token models.
        </p>

        {/* 4 Limitations Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {limitations.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-neutral-950/70 border border-white/10 space-y-4 shadow-xl backdrop-blur-md hover:border-orange-500/30 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-orange-400 font-bold block">
                        LIMITATION {item.id}
                      </span>
                      <h3 className="text-base font-bold text-white leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.description}
                </p>

                <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/5 text-[11px] font-mono text-neutral-300">
                  <strong className="text-orange-400 font-semibold">Mitigation Strategy: </strong>
                  <span>{item.mitigation}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 08 Sources & Footer with Puneet Tiwari + GitHub Link */}
      <footer className="pt-10 border-t border-white/10 text-xs text-neutral-400 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Author & GitHub Repository Badge */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-neutral-900/80 border border-white/10 font-mono">
              <User className="w-4 h-4 text-orange-400" />
              <div className="flex flex-col">
                <span className="text-[10px] text-neutral-500">Research &amp; Development</span>
                <span className="text-xs font-bold text-white">Puneet Tiwari</span>
              </div>
            </div>

            <a
              href="https://github.com/Puneetas015/bdh-cq-latent-reasoning"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-neutral-900/80 border border-white/10 hover:border-orange-500/50 hover:bg-neutral-800 transition-all text-white font-mono group"
            >
              <Github className="w-4 h-4 text-white group-hover:text-orange-400 transition-colors" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-neutral-500">Open-Source Codebase</span>
                <span className="text-xs font-bold text-neutral-200 group-hover:text-white">
                  Puneetas015/bdh-cq-latent-reasoning
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-orange-400 ml-1" />
            </a>
          </div>

          {/* Academic Citations */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-neutral-500">
            <a
              href="https://arxiv.org/pdf/2608.09888"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition flex items-center gap-1"
            >
              <span>[1] Engdahl et al. (2026) BDH-CQ</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://arcprize.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition flex items-center gap-1"
            >
              <span>[2] Chollet (2019) ARC-AGI</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-neutral-600">MIT License</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-white/5 pt-6 text-[11px] text-neutral-500 font-mono gap-2">
          <p>Designed &amp; Engineered by Puneet Tiwari • DataForge 2026: Pathway Track.</p>
          <p>Deterministic Client-Side Mathematical Simulation.</p>
        </div>
      </footer>
    </section>
  );
}