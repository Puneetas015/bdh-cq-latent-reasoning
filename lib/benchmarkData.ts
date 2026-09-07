export interface BenchmarkItem {
  model: string;
  family: "BDH-CQ" | "Frontier LLM (CoT)" | "Test-Time Optimization";
  cost: number;
  accuracy: number;
  params: "<200M" | ">10B";
  verified: boolean;
  notes: string;
}

export const ARC_BENCHMARKS: BenchmarkItem[] = [
  {
    model: "BDH-CQ (150M)",
    family: "BDH-CQ",
    cost: 0.0007,
    accuracy: 29.5,
    params: "<200M",
    verified: true,
    notes: "Engdahl et al. (Aug 2026); independent replication by Ł. Kaiser"
  },
  {
    model: "GPT-5.6 Luna Low",
    family: "Frontier LLM (CoT)",
    cost: 0.0077,
    accuracy: 34.2,
    params: ">10B",
    verified: true,
    notes: "Published pricing & ARC-AGI-1 evaluation (11x cost differential)"
  },
  {
    model: "HRM (27M)",
    family: "Test-Time Optimization",
    cost: 0.045,
    accuracy: 32.0,
    params: "<200M",
    verified: false,
    notes: "Requires test-time backpropagation steps"
  },
  {
    model: "TRM (7M)",
    family: "Test-Time Optimization",
    cost: 0.028,
    accuracy: 29.0,
    params: "<200M",
    verified: false,
    notes: "Test-time optimization search"
  },
  {
    model: "o3-mini",
    family: "Frontier LLM (CoT)",
    cost: 0.011,
    accuracy: 24.0,
    params: ">10B",
    verified: false,
    notes: "Representative token-CoT evaluation"
  },
  {
    model: "DeepSeek R1",
    family: "Frontier LLM (CoT)",
    cost: 0.021,
    accuracy: 20.5,
    params: ">10B",
    verified: false,
    notes: "High reasoning token footprint"
  },
  {
    model: "Claude 3.7 Sonnet",
    family: "Frontier LLM (CoT)",
    cost: 0.016,
    accuracy: 21.2,
    params: ">10B",
    verified: false,
    notes: "Hybrid token reasoning split"
  }
];
