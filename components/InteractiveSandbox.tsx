"use client";

import { useState } from "react";
import { PUZZLE_PRESETS, getConfidence, computeTelemetry } from "@/lib/simulation";
import AttractorCanvas from "./AttractorCanvas";
import { Zap, Database, DollarSign, Clock } from "lucide-react";

export default function InteractiveSandbox() {
  const [selectedPresetKey, setSelectedPresetKey] = useState("preset1");
  const [isLatent, setIsLatent] = useState(true);
  const [tStep, setTStep] = useState(6);
  const tMax = 16;

  const preset = PUZZLE_PRESETS[selectedPresetKey];
  const conf = getConfidence(tStep, tMax, isLatent, preset.trapped);
  const telemetry = computeTelemetry(tStep, isLatent);

  const digitColors: Record<number, string> = {
    1: "bg-blue-500/80 border-blue-400 text-white",
    2: "bg-emerald-500/80 border-emerald-400 text-white",
    3: "bg-amber-500/80 border-amber-400 text-white",
    4: "bg-red-500/80 border-red-400 text-white",
  };

  return (
    <section className="bg-cardDark border border-borderDark rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Interactive Latent Reasoning Sandbox
        </h2>
        <p className="text-sm text-mutedGray mt-1">
          Manipulate reasoning depth T in real time. Observe how internal state relaxation resolves 
          spatial constraints beside the ground truth.
        </p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-bgDark/60 p-5 rounded-xl border border-borderDark">
        <div>
          <label className="text-xs font-mono uppercase text-mutedGray block mb-2 font-semibold">
            1. Puzzle Preset
          </label>
          <select
            value={selectedPresetKey}
            onChange={(e) => setSelectedPresetKey(e.target.value)}
            className="w-full bg-cardDark border border-borderDark rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brandGreen"
          >
            {Object.values(PUZZLE_PRESETS).map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-mono uppercase text-mutedGray block mb-2 font-semibold">
            2. Compute Paradigm
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setIsLatent(true)}
              className={`px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                isLatent
                  ? "bg-brandGreen text-black font-bold border border-brandGreen"
                  : "bg-cardDark border border-borderDark text-mutedGray"
              }`}
            >
              BDH-CQ (Latent)
            </button>
            <button
              onClick={() => setIsLatent(false)}
              className={`px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                !isLatent
                  ? "bg-brandRed text-white font-bold border border-brandRed"
                  : "bg-cardDark border border-borderDark text-mutedGray"
              }`}
            >
              Token CoT
            </button>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-mono uppercase text-mutedGray font-semibold">
              3. Recurrence Depth (T)
            </label>
            <span className="text-xs font-mono text-brandGreen font-bold">{tStep} steps</span>
          </div>
          <input
            type="range"
            min={1}
            max={tMax}
            value={tStep}
            onChange={(e) => setTStep(parseInt(e.target.value))}
            className="w-full accent-brandGreen cursor-pointer"
          />
        </div>
      </div>

      {/* Grid Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-mono text-mutedGray uppercase tracking-wider mb-3">
            Current Prediction at Step T={tStep}
          </h3>
          <div className="grid grid-cols-4 gap-2 bg-bgDark p-3 rounded-xl border border-borderDark max-w-xs mx-auto">
            {preset.groundTruth.map((row, rIdx) =>
              row.map((val, cIdx) => {
                const isMasked = preset.initialMask[rIdx][cIdx] === 0;
                const isResolved = !isMasked || conf >= 0.65;
                const displayVal = isResolved ? val : ((val % 4) + 1);

                return (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    className={`h-16 flex items-center justify-center rounded-lg font-mono text-xl font-bold border transition-all duration-300 ${
                      digitColors[displayVal]
                    } ${isMasked && !isResolved ? "opacity-35 ring-2 ring-brandRed animate-pulse" : "opacity-95"}`}
                  >
                    {displayVal}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-mono text-mutedGray uppercase tracking-wider mb-3">
            Ground Truth Solution
          </h3>
          <div className="grid grid-cols-4 gap-2 bg-bgDark p-3 rounded-xl border border-borderDark max-w-xs mx-auto">
            {preset.groundTruth.map((row, rIdx) =>
              row.map((val, cIdx) => (
                <div
                  key={`gt-${rIdx}-${cIdx}`}
                  className={`h-16 flex items-center justify-center rounded-lg font-mono text-xl font-bold border opacity-80 ${digitColors[val]}`}
                >
                  {val}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Attractor & Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-borderDark">
        <div>
          <h3 className="text-sm font-mono text-mutedGray uppercase mb-2">Phase Space Projection</h3>
          <AttractorCanvas tStep={tStep} tMax={tMax} trapped={preset.trapped} />
        </div>

        <div>
          <h3 className="text-sm font-mono text-mutedGray uppercase mb-2">Real-Time Compute Telemetry</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-bgDark border border-borderDark rounded-xl">
              <div className="flex items-center gap-1.5 text-xs text-mutedGray font-mono">
                <Zap className="w-3.5 h-3.5 text-brandGreen" /> Generated Tokens
              </div>
              <div className="text-xl font-mono font-bold text-white mt-1">{telemetry.tokens}</div>
              <div className="text-[11px] text-mutedGray mt-0.5">{isLatent ? "O(1) flat" : "O(T) sequence expansion"}</div>
            </div>

            <div className="p-3.5 bg-bgDark border border-borderDark rounded-xl">
              <div className="flex items-center gap-1.5 text-xs text-mutedGray font-mono">
                <Database className="w-3.5 h-3.5 text-brandBlue" /> KV-Cache Footprint
              </div>
              <div className="text-xl font-mono font-bold text-white mt-1">{telemetry.kvCacheMb} MB</div>
              <div className="text-[11px] text-mutedGray mt-0.5">{isLatent ? "Constant state" : "Linearly growing"}</div>
            </div>

            <div className="p-3.5 bg-bgDark border border-borderDark rounded-xl">
              <div className="flex items-center gap-1.5 text-xs text-mutedGray font-mono">
                <DollarSign className="w-3.5 h-3.5 text-brandAmber" /> Task Cost (USD)
              </div>
              <div className="text-xl font-mono font-bold text-white mt-1">${telemetry.costUsd}</div>
              <div className="text-[11px] text-mutedGray mt-0.5">{isLatent ? "$0.0007 anchor" : "$0.0080 anchor"}</div>
            </div>

            <div className="p-3.5 bg-bgDark border border-borderDark rounded-xl">
              <div className="flex items-center gap-1.5 text-xs text-mutedGray font-mono">
                <Clock className="w-3.5 h-3.5 text-brandGreen" /> Latency
              </div>
              <div className="text-xl font-mono font-bold text-white mt-1">{telemetry.latencyMs} ms</div>
              <div className="text-[11px] text-mutedGray mt-0.5">{isLatent ? "Pure recurrent ops" : "Token auto-regression"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
