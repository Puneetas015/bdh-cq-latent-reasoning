"use client";

import React from "react";
import { Zap, HardDrive, DollarSign, Brain } from "lucide-react";

export default function WhyThisMatters() {
  const points = [
    {
      icon: HardDrive,
      title: "The KV-Cache Wall",
      desc: "Autoregressive generation stores key-value pairs for every intermediate reasoning token. For 32k-token CoT runs, memory bandwidth becomes the primary performance bottleneck.",
    },
    {
      icon: DollarSign,
      title: "Cost Disproportion",
      desc: "Users pay for every reasoning token emitted. Latent recurrence performs compute inside fixed-dimension continuous state updates without billing intermediate token fees.",
    },
    {
      icon: Zap,
      title: "Low Latency per Depth",
      desc: "Forward-pass matrix operations over fixed dimensions run at tensor-core peak efficiency without sequential autoregressive sampling overhead.",
    },
    {
      icon: Brain,
      title: "Biological Plausibility",
      desc: "Human cognition formulates intermediate continuous concepts prior to speech articulation. BDH-CQ unifies associative recall with recurrent relaxation.",
    },
  ];

  return (
    <section className="py-14 border-b border-white/10 space-y-8 relative z-10">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold">
          Context & Motivation
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          Why This Matters
        </h2>
        <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
          The scaling limits of text-based chain-of-thought and why the post-Transformer frontier requires continuous internal reasoning.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {points.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-neutral-900/40 border border-white/5 space-y-3 hover:border-orange-500/30 transition-colors backdrop-blur-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">{p.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{p.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}