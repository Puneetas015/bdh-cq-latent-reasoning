"use client";

import { ARC_BENCHMARKS } from "@/lib/benchmarkData";

export default function ParetoChart() {
  return (
    <section className="bg-cardDark border border-borderDark rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="border-b border-borderDark pb-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          ARC-AGI-1 Cost-Accuracy Pareto Frontier 
        </h2>
        <p className="text-sm text-mutedGray mt-1">
          Evaluating intelligence-per-dollar: verified published benchmarks vs. token-CoT architectures .
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-borderDark text-mutedGray font-mono text-xs uppercase">
              <th className="py-3 px-4">Model Architecture</th>
              <th className="py-3 px-4">Cost / Task (USD)</th>
              <th className="py-3 px-4">ARC-AGI-1 (Pass@2)</th>
              <th className="py-3 px-4">Evidence Classification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borderDark/60 font-mono">
            {ARC_BENCHMARKS.map((m) => (
              <tr key={m.model} className={m.family === "BDH-CQ" ? "bg-brandGreen/5" : ""}>
                <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                  {m.family === "BDH-CQ" && <span className="text-brandGreen">★</span>}
                  {m.model}
                </td>
                <td className="py-3 px-4 text-gray-300">${m.cost.toFixed(4)}</td>
                <td className="py-3 px-4 text-white font-bold">{m.accuracy.toFixed(1)}%</td>
                <td className="py-3 px-4">
                  {m.verified ? (
                    <span className="px-2 py-0.5 rounded text-[11px] bg-brandGreen/20 text-brandGreen border border-brandGreen/40">
                      VERIFIED PUBLISHED  
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[11px] bg-brandAmber/20 text-brandAmber border border-brandAmber/40">
                      ILLUSTRATIVE APPROX  
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
