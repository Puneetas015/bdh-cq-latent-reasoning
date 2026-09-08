"use client";

import React, { useState, useEffect, useRef } from "react";
import { Cpu, Activity, Sparkles, AlertTriangle, Layers, Info } from "lucide-react";

export default function SparsityHeatmap() {
  const [firingRate, setFiringRate] = useState<number>(5); // 5% BDH Target
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [hoveredNeuron, setHoveredNeuron] = useState<{ x: number; y: number; id: number } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const monaLisaImgRef = useRef<HTMLImageElement | null>(null);

  const GRID_SIZE = 20; // 20x20 = 400 neural units
  const TOTAL_UNITS = GRID_SIZE * GRID_SIZE;
  const activeCount = Math.round((firingRate / 100) * TOTAL_UNITS);

  // Biological & Monosemantic feature dictionary
  const featureMap: Record<number, string> = {
    148: 'Unit #148: "Enigmatic Smile Curvature" (Isolated Monosemantic Feature)',
    149: 'Unit #149: "Right Lip Shading Gradient" (Sfumato Operator)',
    108: 'Unit #108: "Pupil Gaze Vector" (Spatial Focus Coordinate)',
    111: 'Unit #111: "Eyebrow Ridge Absence" (Facial Landmark Detector)',
    68: 'Unit #68: "Translucent Veil Edge" (High-Frequency Border Filter)',
    188: 'Unit #188: "Hand Clasp Configuration" (Pose Symmetry Invariant)',
    228: 'Unit #228: "Textile Fold Topology" (Sub-Manifold Direction)',
    88: 'Unit #88: "Tuscan Horizon Line" (Depth Plane Anchor)',
  };

  useEffect(() => {
    const img = new Image();
    img.src = "/monalisa.jpg";
    img.onload = () => {
      monaLisaImgRef.current = img;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;

    const render = () => {
      time += 0.04;
      const w = canvas.width;
      const h = canvas.height;
      const cellSize = w / GRID_SIZE;

      ctx.clearRect(0, 0, w, h);

      // Background Mona Lisa portrait with subtle dark overlay
      if (monaLisaImgRef.current) {
        ctx.globalAlpha = 0.3;
        ctx.drawImage(monaLisaImgRef.current, 0, 0, w, h);
        ctx.globalAlpha = 1.0;
      } else {
        ctx.fillStyle = "#0A0F1D";
        ctx.fillRect(0, 0, w, h);
      }

      // Iterate across 400 neural units
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          const idx = y * GRID_SIZE + x;
          const px = x * cellSize;
          const py = y * cellSize;

          const seed = (x * 43 + y * 67 + 19) % TOTAL_UNITS;
          const isFiring = seed < activeCount;

          if (isFiring) {
            const pulse = 0.6 + 0.4 * Math.sin(time * 2.8 + (x + y) * 0.4);

            if (firingRate <= 7) {
              // 5% Monosemantic Target: Crisp Glowing Green
              ctx.fillStyle = `rgba(16, 185, 129, ${0.45 + 0.55 * pulse})`;
              ctx.shadowColor = "#10b981";
              ctx.shadowBlur = 10 * pulse;
              ctx.fillRect(px + 1.5, py + 1.5, cellSize - 3, cellSize - 3);
              ctx.shadowBlur = 0;

              // Center activation core
              ctx.fillStyle = "#FFFFFF";
              ctx.fillRect(px + cellSize * 0.35, py + cellSize * 0.35, cellSize * 0.3, cellSize * 0.3);
            } else if (firingRate <= 15) {
              // Moderate Superposition: Amber/Gold
              ctx.fillStyle = `rgba(245, 158, 11, ${0.4 + 0.6 * pulse})`;
              ctx.shadowColor = "#F59E0B";
              ctx.shadowBlur = 8 * pulse;
              ctx.fillRect(px + 1.5, py + 1.5, cellSize - 3, cellSize - 3);
              ctx.shadowBlur = 0;
            } else {
              // Dense Polysemantic Superposition: Hot Red
              ctx.fillStyle = `rgba(239, 68, 68, ${0.4 + 0.6 * pulse})`;
              ctx.shadowColor = "#EF4444";
              ctx.shadowBlur = 6 * pulse;
              ctx.fillRect(px + 1.5, py + 1.5, cellSize - 3, cellSize - 3);
              ctx.shadowBlur = 0;
            }
          }

          // Neural boundary lines
          ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
          ctx.lineWidth = 1;
          ctx.strokeRect(px + 0.5, py + 0.5, cellSize - 1, cellSize - 1);
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [firingRate, activeCount]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * GRID_SIZE);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * GRID_SIZE);

    if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
      const idx = y * GRID_SIZE + x;
      setHoveredNeuron({ x, y, id: idx });
      const seed = (x * 43 + y * 67 + 19) % TOTAL_UNITS;

      if (seed < activeCount) {
        if (firingRate <= 7) {
          setActiveFeature(
            featureMap[idx] || `Unit #${idx}: "Isolated Semantic Coordinate" (Monosemantic & Disentangled)`
          );
        } else {
          setActiveFeature(
            `Unit #${idx}: Tangled superposition of 8+ orthogonal features (Polysemantic Interference)`
          );
        }
      } else {
        setActiveFeature(`Unit #${idx}: Dormant Inactive Unit (Zero-FLOP Non-negative ReLU Gate)`);
      }
    }
  };

  const isOptimal = firingRate >= 4 && firingRate <= 6;

  return (
    <section className="py-14 border-b border-white/10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-orange-400 bg-orange-500/10 border border-orange-500/20 mb-2">
            <span>05 NEURAL SPARSITY SUBSTRATE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Non-Negative Activation Sparsity (~5%)
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
            In biological cortex and BDH models, roughly 5% of neurons fire concurrently. Non-negative 
            ReLU gates produce clean monosemantic units while eliminating 95% of inner-product computation.
          </p>
        </div>

        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-mono font-bold transition-all shrink-0 ${
            isOptimal
              ? "bg-emerald-500/15 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/20"
              : firingRate < 4
              ? "bg-amber-500/15 border-amber-500 text-amber-400"
              : "bg-red-500/15 border-red-500 text-red-400"
          }`}
        >
          {isOptimal ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Optimal Sparsity (~5% Monosemantic)</span>
            </>
          ) : firingRate < 4 ? (
            <>
              <Info className="w-4 h-4" />
              <span>Under-Activation State</span>
            </>
          ) : (
            <>
              <AlertTriangle className="w-4 h-4 animate-bounce" />
              <span>Polysemantic Interference</span>
            </>
          )}
        </div>
      </div>

      {/* Main Full-Width Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Interactive Controls & Live Concept Decoder (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Slider Card */}
          <div className="bg-neutral-950/70 p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-mono uppercase text-neutral-300 font-bold tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-orange-400" />
                <span>Neuron Concurrent Firing Rate</span>
              </label>
              <div className="flex items-baseline gap-1.5 font-mono">
                <span className="text-2xl font-black text-white">{firingRate}%</span>
                <span className="text-xs text-neutral-400">({activeCount} / {TOTAL_UNITS} Units)</span>
              </div>
            </div>

            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={firingRate}
              onChange={(e) => setFiringRate(parseInt(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
            />

            <div className="flex justify-between text-[11px] font-mono text-neutral-500">
              <span className="text-amber-400">1% (Under-activation)</span>
              <span className="text-emerald-400 font-bold">5% Target (BDH Baseline)</span>
              <span className="text-red-400">30% (Dense Superposition)</span>
            </div>
          </div>

          {/* Live Concept Decoder */}
          <div className="bg-neutral-950/70 p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="text-[11px] font-mono uppercase text-neutral-400 font-semibold tracking-wider flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-orange-400" />
              <span>Live Synaptic Concept Decoder</span>
            </div>
            <div className="font-mono text-xs text-white bg-black/70 p-3.5 rounded-xl border border-white/5 min-h-[46px] flex items-center">
              {activeFeature || "Hover over any neural unit in the grid to inspect its extracted semantic feature..."}
            </div>
          </div>

          {/* Real-time Telemetry */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-neutral-950/70 p-4 rounded-xl border border-white/10">
              <div className="text-[10px] font-mono uppercase text-neutral-500">Active Units</div>
              <div className="text-xl font-mono font-black text-white mt-1">
                {activeCount} <span className="text-xs text-neutral-500 font-normal">/ 400</span>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 mt-1">Non-negative ReLU</div>
            </div>

            <div className="bg-neutral-950/70 p-4 rounded-xl border border-white/10">
              <div className="text-[10px] font-mono uppercase text-neutral-500">Compute Bypass</div>
              <div className="text-xl font-mono font-black text-emerald-400 mt-1">
                {((1 - activeCount / TOTAL_UNITS) * 100).toFixed(0)}%
              </div>
              <div className="text-[10px] font-mono text-neutral-400 mt-1">Zero-cost paths</div>
            </div>

            <div className="bg-neutral-950/70 p-4 rounded-xl border border-white/10">
              <div className="text-[10px] font-mono uppercase text-neutral-500">Feature Purity</div>
              <div
                className={`text-xl font-mono font-black mt-1 ${
                  isOptimal ? "text-emerald-400" : firingRate > 15 ? "text-red-400" : "text-amber-400"
                }`}
              >
                {isOptimal ? "99.4%" : firingRate > 15 ? "38.2%" : "82.1%"}
              </div>
              <div className="text-[10px] font-mono text-neutral-400 mt-1">
                {isOptimal ? "Monosemantic" : "Polysemantic"}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 400-Unit Synaptic Matrix Canvas (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative p-2.5 bg-neutral-950/80 rounded-2xl border border-white/10 shadow-2xl w-full max-w-[400px] aspect-square flex items-center justify-center overflow-hidden">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                setActiveFeature(null);
                setHoveredNeuron(null);
              }}
              className="w-full h-full rounded-xl cursor-crosshair block shadow-inner"
            />

            {hoveredNeuron && (
              <div className="absolute top-4 right-4 text-[10px] font-mono bg-black/90 text-orange-400 px-2.5 py-1 rounded border border-orange-500/40 pointer-events-none shadow-lg">
                [{hoveredNeuron.x}, {hoveredNeuron.y}]
              </div>
            )}
          </div>

          <div className="text-center mt-3">
            <span
              className={`text-xs font-mono font-semibold tracking-wider ${
                isOptimal ? "text-emerald-400" : firingRate > 15 ? "text-red-400" : "text-amber-400"
              }`}
            >
              {isOptimal
                ? "● Isolated Monosemantic Synapses (~5% Active)"
                : firingRate > 15
                ? "▲ Tangled Feature Superposition (High Interference)"
                : "■ Partial Feature Decomposition"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}