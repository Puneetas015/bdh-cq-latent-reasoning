export interface PuzzlePreset {
  id: string;
  name: string;
  description: string;
  trapped: boolean;
  groundTruth: number[][];
  initialMask: number[][];
}

export const PUZZLE_PRESETS: Record<string, PuzzlePreset> = {
  preset1: {
    id: "preset1",
    name: "Preset 1 — Single Missing Cell",
    description: "4x4 Latin-square constraint grid with 1 hidden cell. Both architectures converge easily.",
    trapped: false,
    groundTruth: [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [2, 1, 4, 3],
      [4, 3, 2, 1],
    ],
    initialMask: [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 0, 1],
      [1, 1, 1, 1],
    ],
  },
  preset2: {
    id: "preset2",
    name: "Preset 2 — Dual Constraint Conflict",
    description: "Coupled interacting cells. Pure latent relaxation can stall in shallow local minima without backtrack.",
    trapped: true,
    groundTruth: [
      [2, 4, 1, 3],
      [1, 3, 4, 2],
      [4, 2, 3, 1],
      [3, 1, 2, 4],
    ],
    initialMask: [
      [1, 1, 1, 0],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [0, 1, 1, 1],
    ],
  },
};

export function getConfidence(t: number, tMax: number, isLatent: boolean, trapped: boolean): number {
  if (isLatent) {
    let c = 1.0 - Math.exp(-t / 2.8);
    if (trapped) {
      c = Math.min(c, 0.68 + 0.015 * Math.sin(t * 1.3));
    }
    return Math.min(Math.max(c, 0), 1.0);
  } else {
    // Discrete token emission jumps
    let c = 1.0 - Math.exp(-t / 5.2);
    c = Math.floor(c * 10) / 10;
    if (trapped) {
      c = Math.min(1.0 - Math.exp(-t / 6.5) + 0.02 * Math.max(t - 8, 0), 0.99);
    }
    return Math.min(Math.max(c, 0), 1.0);
  }
}

export function computeTelemetry(t: number, isLatent: boolean) {
  if (isLatent) {
    return {
      tokens: 0,
      kvCacheMb: "0.00",
      costUsd: (0.0007 * (t / 8.0)).toFixed(6),
      latencyMs: (t * 7.5).toFixed(1),
      flopsRatio: (t * 4.0).toFixed(0),
    };
  }
  const tokens = 120 * t;
  return {
    tokens,
    kvCacheMb: (tokens * 0.0025).toFixed(2),
    costUsd: (0.0080 * (t / 8.0)).toFixed(5),
    latencyMs: (tokens * 3.4).toFixed(1),
    flopsRatio: (tokens * 3.2).toFixed(0),
  };
}
