"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  RotateCcw,
  Radio,
  Sliders,
  Sparkles,
  ShieldAlert,
  Flame,
  CheckCircle2,
} from "lucide-react";

export default function InteractiveSandbox() {
  const [paradigm, setParadigm] = useState<"latent" | "cot">("latent");
  const [tDepth, setTDepth] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [perturbation, setPerturbation] = useState<number>(0);
  const [splitPos, setSplitPos] = useState<number>(50);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  const tMax = 16;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playBlip = useCallback((freq: number) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // audio fallback
    }
  }, [soundEnabled]);

  useEffect(() => {
    const img = new Image();
    img.src = "/hero.jpg";
    img.onload = () => {
      imgRef.current = img;
      drawCanvas();
    };
  }, []);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const progress = Math.min(tDepth / tMax, 1.0);
    const effectiveProgress = Math.max(0, progress - perturbation * 0.35);
    const res = Math.max(6, Math.floor(6 + Math.pow(effectiveProgress, 2.5) * (w - 6)));

    const offscreen = document.createElement("canvas");
    offscreen.width = res;
    offscreen.height = res;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;
    offCtx.drawImage(img, 0, 0, res, res);

    // Ground truth right
    ctx.save();
    ctx.drawImage(img, 0, 0, w, h);
    ctx.restore();

    // Latent reconstruction left
    const splitPx = (splitPos / 100) * w;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, splitPx, h);
    ctx.clip();

    ctx.imageSmoothingEnabled = effectiveProgress > 0.85;
    ctx.drawImage(offscreen, 0, 0, res, res, 0, 0, w, h);

    if (tDepth < 13 || perturbation > 0) {
      ctx.fillStyle = paradigm === "latent" ? "rgba(249, 115, 22, 0.08)" : "rgba(239, 68, 68, 0.12)";
      ctx.fillRect(0, 0, splitPx, h);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 1;
      for (let y = 0; y < h; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(splitPx, y);
        ctx.stroke();
      }
    }
    ctx.restore();

    // Split Divider Bar
    ctx.strokeStyle = "#f97316";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(splitPx, 0);
    ctx.lineTo(splitPx, h);
    ctx.stroke();

    ctx.fillStyle = "#f97316";
    ctx.beginPath();
    ctx.arc(splitPx, h / 2, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(splitPx, h / 2, 3, 0, Math.PI * 2);
    ctx.fill();
  }, [tDepth, perturbation, splitPos, paradigm]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  useEffect(() => {
    if (!isPlaying) return;
    if (tDepth >= tMax) {
      setIsPlaying(false);
      playBlip(880);
      return;
    }
    const timer = setTimeout(() => {
      setTDepth((prev) => {
        playBlip(320 + prev * 30);
        return prev + 1;
      });
      setPerturbation((p) => Math.max(0, p - 0.25));
    }, 180);
    return () => clearTimeout(timer);
  }, [isPlaying, tDepth, playBlip]);

  const handleInjectNoise = () => {
    setPerturbation(1.2);
    playBlip(180);
    setTimeout(() => setPerturbation(0.7), 200);
    setTimeout(() => setPerturbation(0.3), 500);
    setTimeout(() => setPerturbation(0), 800);
  };

  const convergencePercent = Math.min(100, Math.round((tDepth / tMax) * 100));

  return (
    <section id="section-sandbox" className="py-14 border-b border-white/10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-orange-400 bg-orange-500/10 border border-orange-500/20 mb-2">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>INTERACTIVE TESTBENCH // LIVE CONTRAST ENGINE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            The Latent Relaxation Playground
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            Experience how the recurrent operator h<sub>t</sub> damps entropy and snaps into the global attractor without generating autoregressive tokens.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-3 py-1.5 rounded text-xs font-mono border transition ${
              soundEnabled
                ? "border-orange-500 text-orange-400 bg-orange-500/10"
                : "border-neutral-800 text-neutral-500 hover:text-neutral-300"
            }`}
          >
            {soundEnabled ? "Audio FX: ON" : "Audio FX: OFF"}
          </button>

          <div className="flex items-center gap-3 bg-neutral-900/80 border border-white/10 px-4 py-2 rounded-xl">
            <div className="text-right">
              <span className="text-[10px] font-mono text-neutral-500 block uppercase">Convergence</span>
              <span className="text-sm font-mono font-bold text-orange-400">{convergencePercent}%</span>
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-neutral-800 border-t-orange-500 flex items-center justify-center animate-spin">
              <Sparkles className="w-3 h-3 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: A/B Split Viewport */}
        <div className="lg:col-span-7 bg-neutral-950/70 p-5 rounded-2xl border border-white/10 space-y-4 shadow-2xl backdrop-blur-md">
          <div className="flex justify-between items-center text-xs font-mono text-neutral-400 border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              <span className="text-white font-bold">A/B Manifold Split View</span>
            </div>
            <div className="flex gap-4 text-[11px]">
              <span className="text-orange-400 font-semibold">◀ Latent h_t ({convergencePercent}%)</span>
              <span className="text-neutral-400">Ground Truth ▶</span>
            </div>
          </div>

          <div className="relative w-full aspect-square max-h-[460px] mx-auto rounded-xl overflow-hidden border border-white/10 bg-black group select-none">
            <canvas
              ref={canvasRef}
              width={460}
              height={460}
              className="w-full h-full object-cover block"
            />

            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono text-orange-400">
              RELAXATION STEP: T={tDepth} / {tMax}
            </div>

            {perturbation > 0 && (
              <div className="absolute top-3 right-3 bg-red-500/80 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-mono text-white font-bold animate-bounce">
                ENTROPY SPIKE INJECTED!
              </div>
            )}

            <div className="absolute bottom-3 left-6 right-6 flex items-center gap-2 bg-black/80 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
              <Sliders className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <input
                type="range"
                min={0}
                max={100}
                value={splitPos}
                onChange={(e) => setSplitPos(parseInt(e.target.value))}
                className="w-full accent-orange-500 cursor-ew-resize h-1 bg-neutral-800 rounded-lg"
              />
              <span className="text-[10px] font-mono text-neutral-400 shrink-0">{splitPos}%</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <button
              onClick={() => {
                if (tDepth >= tMax) setTDepth(1);
                setIsPlaying(!isPlaying);
              }}
              className="py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-mono text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isPlaying ? "HALT" : tDepth >= tMax ? "REPLAY" : "RUN DESCENT"}</span>
            </button>

            <button
              onClick={handleInjectNoise}
              className="py-2.5 px-4 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-red-400 hover:bg-red-500/10 text-red-300 font-mono text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-red-400" />
              <span>PERTURB (NOISE)</span>
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setTDepth(1);
                setPerturbation(0);
                playBlip(200);
              }}
              className="py-2.5 px-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-400 text-xs font-mono transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET</span>
            </button>
          </div>
        </div>

        {/* Right Column: Controls and Telemetry */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-950/70 border border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-mono uppercase text-neutral-300 font-bold tracking-wider">
                Recurrence Depth (T)
              </label>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold">
                T = {tDepth}
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={tMax}
              value={tDepth}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setTDepth(val);
                playBlip(320 + val * 25);
              }}
              className="w-full accent-orange-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
            />

            <div className="flex justify-between text-[11px] font-mono text-neutral-500">
              <span>T=1 (Coarse/Noisy)</span>
              <span>T=8 (Boundaries Resolved)</span>
              <span className="text-orange-400 font-bold">T=16 (Attractor Lock)</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950/70 border border-white/10 space-y-3">
            <span className="text-[11px] font-mono uppercase text-neutral-400 block font-semibold">
              Execution Paradigm
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setParadigm("latent")}
                className={`py-2 px-3 rounded-xl text-xs font-mono font-bold border transition cursor-pointer ${
                  paradigm === "latent"
                    ? "bg-orange-500/15 border-orange-500 text-orange-400 shadow-md shadow-orange-500/10"
                    : "border-neutral-800 text-neutral-500 hover:text-neutral-300"
                }`}
              >
                BDH-CQ (Latent)
              </button>
              <button
                onClick={() => setParadigm("cot")}
                className={`py-2 px-3 rounded-xl text-xs font-mono font-bold border transition cursor-pointer ${
                  paradigm === "cot"
                    ? "bg-red-500/15 border-red-500 text-red-400 shadow-md shadow-red-500/10"
                    : "border-neutral-800 text-neutral-500 hover:text-neutral-300"
                }`}
              >
                Token CoT
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-neutral-950/70 border border-white/10 rounded-xl">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block">Token Burden</span>
              <span className="text-xl font-mono font-black text-white mt-0.5 block">
                {paradigm === "latent" ? "0 Tokens" : `${tDepth * 140} Toks`}
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                {paradigm === "latent" ? "Zero token billing" : "O(T) sequence growth"}
              </span>
            </div>

            <div className="p-3.5 bg-neutral-950/70 border border-white/10 rounded-xl">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block">KV-Cache State</span>
              <span className="text-xl font-mono font-black text-white mt-0.5 block">
                {paradigm === "latent" ? "0.00 MB" : `${(tDepth * 140 * 0.0028).toFixed(1)} MB`}
              </span>
              <span className="text-[10px] font-mono text-orange-400">
                {paradigm === "latent" ? "O(1) invariant" : "Linear memory growth"}
              </span>
            </div>

            <div className="p-3.5 bg-neutral-950/70 border border-white/10 rounded-xl">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block">Inference Cost</span>
              <span className="text-xl font-mono font-black text-orange-400 mt-0.5 block">
                {paradigm === "latent"
                  ? `$${(0.0007 * (tDepth / 8.0)).toFixed(5)}`
                  : `$${(0.0080 * (tDepth / 8.0)).toFixed(4)}`}
              </span>
              <span className="text-[10px] font-mono text-neutral-500">Fixed-dimension FLOPs</span>
            </div>

            <div className="p-3.5 bg-neutral-950/70 border border-white/10 rounded-xl">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block">Convergence Status</span>
              <div className="flex items-center gap-1.5 mt-1">
                {tDepth >= 14 ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono text-emerald-400 font-bold">LOCKED</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span className="text-xs font-mono text-amber-400 font-bold">RELAXING</span>
                  </>
                )}
              </div>
              <span className="text-[10px] font-mono text-neutral-500 mt-0.5 block">
                Energy: {Math.max(0.02, (1 - tDepth / tMax) * 1.8).toFixed(3)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}