"use client";

import React, { useState } from "react";
import { ArrowDown } from "lucide-react";

export default function ArchitectureDiagram() {
  const [selectedToken, setSelectedToken] = useState<number | null>(null);

  return (
    <section id="section-core" className="py-14 border-b border-white/10 space-y-8">
      <div className="max-w-2xl">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
          02 The Core Idea
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          Token Serialization vs. Latent Relaxation
        </h2>
        <p className="text-sm text-neutral-400 mt-2">
          Dense Transformers scale compute by expanding context length. BDH-CQ keeps sequence length invariant while iterating continuous states.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Token CoT Vertical Stream */}
        <div className="bg-neutral-900/40 p-6 rounded-xl border border-white/5 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <span className="text-sm font-semibold text-neutral-200">Token-Based CoT</span>
            <span className="text-xs font-mono text-red-400 bg-red-400/10 px-2 py-0.5 rounded border border-red-400/20">
              Sequence O(T)
            </span>
          </div>

          <div className="flex flex-col items-center space-y-2 py-2">
            <div className="px-4 py-2 rounded border border-neutral-700 bg-neutral-800 text-xs font-mono text-neutral-200">
              Problem X
            </div>
            <ArrowDown className="w-3.5 h-3.5 text-neutral-600" />
            
            {["Token 1 (Hypothesis)", "Token 2 (Sub-step)", "Token 3 (Correction)"].map((t, idx) => (
              <React.Fragment key={idx}>
                <div 
                  onClick={() => setSelectedToken(idx)}
                  className={`w-48 text-center px-3 py-1.5 rounded border text-xs font-mono cursor-pointer transition-all ${
                    selectedToken === idx 
                      ? "border-red-400 bg-red-500/20 text-white" 
                      : "border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  {t}
                </div>
                <ArrowDown className="w-3.5 h-3.5 text-neutral-600" />
              </React.Fragment>
            ))}

            <div className="px-4 py-2 rounded border border-neutral-700 bg-neutral-800 text-xs font-mono text-neutral-200">
              Final Answer
            </div>
          </div>

          <p className="text-xs text-neutral-500 text-center font-mono">
            Every step adds tokens into the attention matrix, ballooning the KV-cache.
          </p>
        </div>

        {/* Latent Recurrence Stream */}
        <div className="bg-neutral-900/40 p-6 rounded-xl border border-white/5 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <span className="text-sm font-semibold text-neutral-200">Latent Recurrence (BDH-CQ)</span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
              State O(1)
            </span>
          </div>

          <div className="flex flex-col items-center space-y-2 py-2">
            <div className="px-4 py-2 rounded border border-neutral-700 bg-neutral-800 text-xs font-mono text-neutral-200">
              Problem X
            </div>
            <ArrowDown className="w-3.5 h-3.5 text-neutral-600" />
            
            {["h₀ (Initial Latent)", "h₁ (Relaxation Depth 1)", "h₂ (Attractor Basin)"].map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="w-48 text-center px-3 py-1.5 rounded border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono">
                  {step}
                </div>
                <ArrowDown className="w-3.5 h-3.5 text-amber-500/40" />
              </React.Fragment>
            ))}

            <div className="px-4 py-2 rounded border border-neutral-700 bg-neutral-800 text-xs font-mono text-neutral-200">
              Projection Y (Answer)
            </div>
          </div>

          <p className="text-xs text-neutral-500 text-center font-mono">
            Zero token emissions during intermediate computation. Context length remains static.
          </p>
        </div>
      </div>
    </section>
  );
}