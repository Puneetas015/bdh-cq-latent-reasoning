"use client";

import { useState } from "react";

export default function ArchitectureDiagram() {
  const [activeTab, setActiveTab] = useState<"latent" | "cot">("latent");

  return (
    <section className="bg-cardDark border border-borderDark rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-borderDark pb-5">
        <div>
          <h2 className="text-xl font-bold text-white">The Architectural Paradox</h2>
          <p className="text-sm text-mutedGray">How computational depth is synthesized at inference time.</p>
        </div>
        <div className="flex p-1 bg-bgDark rounded-lg border border-borderDark">
          <button
            onClick={() => setActiveTab("latent")}
            className={`px-4 py-2 rounded-md text-xs font-mono font-medium transition-all ${
              activeTab === "latent" ? "bg-brandGreen text-black font-bold shadow" : "text-mutedGray hover:text-white"
            }`}
          >
            BDH-CQ (Latent Loop)
          </button>
          <button
            onClick={() => setActiveTab("cot")}
            className={`px-4 py-2 rounded-md text-xs font-mono font-medium transition-all ${
              activeTab === "cot" ? "bg-brandRed text-white font-bold shadow" : "text-mutedGray hover:text-white"
            }`}
          >
            Token CoT (Autoregressive)
          </button>
        </div>
      </div>

      <div className="relative h-48 w-full flex items-center justify-center overflow-hidden bg-bgDark/80 rounded-xl border border-borderDark/80">
        {activeTab === "latent" ? (
          <div className="flex items-center gap-8 sm:gap-16">
            <div className="p-4 rounded-lg bg-cardDark border border-borderDark text-center">
              <span className="text-xs text-mutedGray font-mono block">INPUT</span>
              <span className="text-sm font-bold text-white">Problem X</span>
            </div>

            <div className="relative flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-brandGreen flex items-center justify-center relative">
                <div className="w-8 h-8 rounded-full bg-brandGreen/20 animate-pulse-glow flex items-center justify-center">
                  <span className="text-xs font-mono text-brandGreen font-bold">h_t</span>
                </div>
              </div>
              <span className="mt-2 text-xs font-mono text-brandGreen font-semibold">
                Fixed Latent State (O(1) Memory)
              </span>
            </div>

            <div className="p-4 rounded-lg bg-cardDark border border-borderDark text-center">
              <span className="text-xs text-mutedGray font-mono block">OUTPUT</span>
              <span className="text-sm font-bold text-white">Projection Y</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto px-4 py-2">
            <div className="p-3 rounded-lg bg-cardDark border border-borderDark text-center shrink-0">
              <span className="text-xs text-mutedGray font-mono block">INPUT</span>
              <span className="text-xs font-bold text-white">Problem X</span>
            </div>
            {["Token 1", "Token 2", "Token 3", "...", "Token N"].map((t, idx) => (
              <div key={idx} className="p-2.5 rounded border border-brandRed/40 bg-brandRed/10 text-center shrink-0">
                <span className="text-xs font-mono text-brandRed font-semibold">{t}</span>
              </div>
            ))}
            <div className="p-3 rounded-lg bg-cardDark border border-borderDark text-center shrink-0">
              <span className="text-xs text-mutedGray font-mono block">MEMORY</span>
              <span className="text-xs font-bold text-brandRed">KV-Cache O(T)</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
