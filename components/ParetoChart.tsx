"use client";

import React, { useState } from "react";

interface BenchmarkModel {
  name: string;
  parameters: string;
  arc1Pass2: string;
  sudokuExtreme: string;
  costPerTask: string;
  costNum: number;
  accNum: number;
  kvCacheComplexity: string;
  testTimeCompute: string;
  highlight: boolean;
}

const BENCHMARK_DATA: BenchmarkModel[] = [
  {
    name: "BDH-CQ (Pathway Research)",
    parameters: "150M",
    arc1Pass2: "29.5%",
    sudokuExtreme: "97.4%",
    costPerTask: "$0.0007",
    costNum: 0.0007,
    accNum: 29.5,
    kvCacheComplexity: "O(1) Constant",
    testTimeCompute: "Forward Latent Relaxation (T=8-16)",
    highlight: true,
  },
  {
    name: "Standard Transformer Base",
    parameters: "7B",
    arc1Pass2: "8.2%",
    sudokuExtreme: "14.1%",
    costPerTask: "$0.0009",
    costNum: 0.0009,
    accNum: 8.2,
    kvCacheComplexity: "O(1) Flat",
    testTimeCompute: "Single-token greedy argmax",
    highlight: false,
  },
  {
    name: "GPT-5.6 Luna Low",
    parameters: "~8B (MoE)",
    arc1Pass2: "34.2%",
    sudokuExtreme: "71.8%",
    costPerTask: "$0.0077",
    costNum: 0.0077,
    accNum: 34.2,
    kvCacheComplexity: "O(T) Linear",
    testTimeCompute: "Autoregressive CoT (~1.2k tokens)",
    highlight: false,
  },
  {
    name: "Test-Time Training (TTT-Linear)",
    parameters: "1.3B",
    arc1Pass2: "21.0%",
    sudokuExtreme: "62.5%",
    costPerTask: "$0.0094",
    costNum: 0.0094,
    accNum: 21.0,
    kvCacheComplexity: "O(1) Flat",
    testTimeCompute: "Gradient-based Test-Time Optimization",
    highlight: false,
  },
  {
    name: "DeepSeek-R1 (Distill 14B)",
    parameters: "14B",
    arc1Pass2: "31.8%",
    sudokuExtreme: "76.4%",
    costPerTask: "$0.0112",
    costNum: 0.0112,
    accNum: 31.8,
    kvCacheComplexity: "O(T) Linear",
    testTimeCompute: "Autoregressive CoT (~2.5k tokens)",
    highlight: false,
  },
  {
    name: "Llama-3.3-70B + CoT",
    parameters: "70B",
    arc1Pass2: "26.4%",
    sudokuExtreme: "58.0%",
    costPerTask: "$0.0185",
    costNum: 0.0185,
    accNum: 26.4,
    kvCacheComplexity: "O(T) Linear",
    testTimeCompute: "Zero-shot CoT (~1.8k tokens)",
    highlight: false,
  },
  {
    name: "o3-mini (Medium Reasoning)",
    parameters: "Undisclosed",
    arc1Pass2: "41.0%",
    sudokuExtreme: "83.6%",
    costPerTask: "$0.0240",
    costNum: 0.0240,
    accNum: 41.0,
    kvCacheComplexity: "O(T) Linear",
    testTimeCompute: "Autoregressive CoT (~3.8k tokens)",
    highlight: false,
  },
  {
    name: "Claude 3.7 Sonnet (Extended)",
    parameters: "~70B",
    arc1Pass2: "48.0%",
    sudokuExtreme: "89.2%",
    costPerTask: "$0.0650",
    costNum: 0.0650,
    accNum: 48.0,
    kvCacheComplexity: "O(T) Linear",
    testTimeCompute: "Autoregressive CoT (~8k tokens)",
    highlight: false,
  },
];

export default function ParetoChart() {
  const [showTable, setShowTable] = useState(false);

  // Accurate Logarithmic Y coordinate calculation (Bottom = $0.0005, Top = $0.1000)
  const minCostLog = Math.log10(0.0005); // -3.30
  const maxCostLog = Math.log10(0.1000); // -1.00
  const costLogRange = maxCostLog - minCostLog;

  const minAcc = 5.0;
  const maxAcc = 52.0;

  return (
    <section id="section-benchmarks" className="py-14 border-b border-white/10 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold">
            06 Empirical Verification
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            ARC-AGI-1 & Constraint Pareto Frontier
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-3xl">
            Benchmarked accuracy vs. inference economics. BDH-CQ achieves 29.5% pass@2 at an inference cost of $0.0007 per task — an 11× cost reduction compared to equivalent token-based reasoners.
          </p>
        </div>

        <button
          onClick={() => setShowTable(!showTable)}
          className="text-xs font-mono px-3.5 py-2 rounded-lg border border-neutral-700 hover:border-orange-400 text-neutral-300 transition-colors shrink-0 bg-neutral-900/60"
        >
          {showTable ? "View Pareto Scatter Plot" : "View Comprehensive Data Table"}
        </button>
      </div>

      {!showTable ? (
        /* Corrected Standard Scatter Plot: Cost on Y-axis (Low at bottom, High at top) */
        <div className="p-8 bg-neutral-950/70 rounded-2xl border border-white/10 space-y-6 shadow-2xl backdrop-blur-md">
          <div className="relative h-88 w-full border-l border-b border-neutral-700 px-6 py-4" style={{ height: "360px" }}>
            {/* Axis Labels */}
            <span className="absolute -left-14 top-1/2 -translate-y-1/2 -rotate-90 text-[11px] font-mono text-neutral-400 font-semibold tracking-wider">
              Cost ($ / task, log) ↑
            </span>
            <span className="absolute right-4 -bottom-8 text-[11px] font-mono text-neutral-400 font-semibold tracking-wider">
              ARC-AGI-1 Pass@2 Accuracy (%) →
            </span>

            {/* Horizontal Gridlines & Cost Ticks */}
            {[
              { val: "$0.0007", num: 0.0007 },
              { val: "$0.0010", num: 0.0010 },
              { val: "$0.0100", num: 0.0100 },
              { val: "$0.0500", num: 0.0500 },
            ].map((tick, idx) => {
              const bottomPercent = ((Math.log10(tick.num) - minCostLog) / costLogRange) * 100;
              return (
                <div
                  key={idx}
                  className="absolute left-0 right-0 border-t border-dashed border-white/10 flex items-center -translate-y-1/2"
                  style={{ bottom: `${bottomPercent}%` }}
                >
                  <span className="text-[10px] font-mono text-neutral-500 -ml-14 w-12 text-right">
                    {tick.val}
                  </span>
                </div>
              );
            })}

            {/* Scatter Plot Points */}
            {BENCHMARK_DATA.map((m, i) => {
              // Left: Accuracy from 5% to 52%
              const left = `${Math.min(Math.max(((m.accNum - minAcc) / (maxAcc - minAcc)) * 100, 4), 96)}%`;
              // Bottom: Cost from $0.0005 to $0.1000
              const bottom = `${Math.min(
                Math.max(((Math.log10(m.costNum) - minCostLog) / costLogRange) * 100, 4),
                94
              )}%`;

              return (
                <div
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10"
                  style={{ left, bottom }}
                >
                  <div
                    className={`rounded-full border transition-all duration-300 group-hover:scale-150 ${
                      m.highlight
                        ? "w-4 h-4 bg-orange-500 border-orange-300 shadow-xl shadow-orange-500/60 ring-4 ring-orange-500/30"
                        : "w-3 h-3 bg-neutral-600 border-neutral-400 group-hover:bg-neutral-300"
                    }`}
                  />

                  {/* Hover Tooltip */}
                  <div className="hidden group-hover:flex flex-col items-center absolute bottom-6 bg-black/95 border border-neutral-700 rounded-xl p-2.5 text-[11px] font-mono text-white whitespace-nowrap z-40 shadow-2xl">
                    <span className="font-bold text-orange-400">{m.name}</span>
                    <span className="text-neutral-300">Accuracy: {m.arc1Pass2} | Cost: {m.costPerTask}</span>
                    <span className="text-[10px] text-neutral-500">{m.testTimeCompute}</span>
                  </div>

                  {/* Label */}
                  <span
                    className={`text-[10px] font-mono whitespace-nowrap mt-1.5 px-1.5 py-0.5 rounded ${
                      m.highlight
                        ? "text-orange-300 font-bold bg-orange-500/20 border border-orange-500/30"
                        : "text-neutral-400 bg-black/60"
                    }`}
                  >
                    {m.name.split(" ")[0]} ({m.arc1Pass2})
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-between items-center text-xs text-neutral-400 font-mono pt-4 border-t border-white/5">
            <span className="text-emerald-400">● Ideal Frontier: Lower Cost (Bottom) + Higher Accuracy (Right)</span>
            <span className="text-orange-400 font-semibold">
              BDH-CQ (150M): 29.5% accuracy @ $0.0007 / task
            </span>
          </div>
        </div>
      ) : (
        /* Comprehensive Multi-Column Data Table */
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-neutral-950/70 shadow-2xl">
          <table className="w-full text-xs font-mono text-neutral-300 border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-neutral-400 text-left bg-neutral-900/60">
                <th className="py-3.5 px-4 font-semibold">Model Architecture</th>
                <th className="py-3.5 px-4 font-semibold">Parameters</th>
                <th className="py-3.5 px-4 font-semibold">ARC-AGI-1 Pass@2</th>
                <th className="py-3.5 px-4 font-semibold">Sudoku Extreme</th>
                <th className="py-3.5 px-4 font-semibold">Inference Cost / Task</th>
                <th className="py-3.5 px-4 font-semibold">KV-Cache Footprint</th>
                <th className="py-3.5 px-4 font-semibold">Test-Time Compute Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {BENCHMARK_DATA.map((row, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    row.highlight
                      ? "bg-orange-500/15 text-orange-200 font-semibold"
                      : "hover:bg-white/[0.02]"
                  }`}
                >
                  <td className="py-3.5 px-4 flex items-center gap-2">
                    {row.highlight && (
                      <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0 animate-pulse" />
                    )}
                    <span>{row.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-400">{row.parameters}</td>
                  <td className="py-3.5 px-4 text-white font-bold">{row.arc1Pass2}</td>
                  <td className="py-3.5 px-4">{row.sudokuExtreme}</td>
                  <td
                    className={`py-3.5 px-4 font-bold ${
                      row.highlight ? "text-orange-400" : "text-neutral-300"
                    }`}
                  >
                    {row.costPerTask}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-400">{row.kvCacheComplexity}</td>
                  <td className="py-3.5 px-4 text-neutral-400">{row.testTimeCompute}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}