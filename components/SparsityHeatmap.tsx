"use client";

import { useState, useEffect, useRef } from "react";

export default function SparsityHeatmap() {
  const [sparsity, setSparsity] = useState(5);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 16;
    const cellSize = canvas.width / size;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const activeCount = Math.floor((size * size * sparsity) / 100);
    const activeIndices = new Set<number>();
    
    // Deterministic distribution
    let seed = 42;
    while (activeIndices.size < activeCount) {
      seed = (seed * 9301 + 49297) % 233280;
      const idx = Math.floor((seed / 233280) * (size * size));
      activeIndices.add(idx);
    }

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const idx = r * size + c;
        if (activeIndices.has(idx)) {
          ctx.fillStyle = "#00D26A";
        } else {
          ctx.fillStyle = "#131B2A";
        }
        ctx.fillRect(c * cellSize, r * cellSize, cellSize - 1, cellSize - 1);
      }
    }
  }, [sparsity]);

  return (
    <div className="bg-cardDark border border-borderDark rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div className="space-y-4">
        <h3 className="text-sm font-mono text-white font-bold uppercase">
          Sparse Non-Negative Activations (~5%) 
        </h3>
        <p className="text-sm text-mutedGray leading-relaxed">
          In biological systems and BDH, roughly 5% of neurons fire simultaneously . 
          This high sparsity creates <b>monosemantic synapses</b> where individual units represent 
          isolated concepts rather than dense, tangled polysemantic mixtures .
        </p>
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono text-mutedGray">
            <span>Neuron Firing Rate: {sparsity}%</span>
          </div>
          <input
            type="range"
            min={2}
            max={40}
            value={sparsity}
            onChange={(e) => setSparsity(parseInt(e.target.value))}
            className="w-full accent-brandGreen cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          width={220}
          height={220}
          className="border border-borderDark rounded-lg shadow-inner bg-bgDark"
        />
        <span className="text-[11px] font-mono text-mutedGray mt-2">
          {sparsity <= 8 ? "Monosemantic Separation" : "Dense Feature Superposition"} 
        </span>
      </div>
    </div>
  );
}
