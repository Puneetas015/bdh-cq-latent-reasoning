"use client";

import React, { useState } from "react";
import {
  AlertCircle,
  Database,
  Activity,
  Cpu,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

interface StepItem {
  id: string;
  stepNum: string;
  title: string;
  subtitle: string;
  color: string;
  bgGlow: string;
  borderColor: string;
  icon: React.ElementType;
  position: "top" | "bottom";
}

const STEPS: StepItem[] = [
  {
    id: "section-paradox",
    stepNum: "Step 01",
    title: "The Paradox",
    subtitle: "Token vs Latent Scaling",
    color: "#8B5CF6",
    bgGlow: "rgba(139, 92, 246, 0.2)",
    borderColor: "#8B5CF6",
    icon: AlertCircle,
    position: "bottom",
  },
  {
    id: "section-architecture",
    stepNum: "Step 02",
    title: "Associative Store",
    subtitle: "In-Context Assimilation",
    color: "#06B6D4",
    bgGlow: "rgba(6, 182, 212, 0.2)",
    borderColor: "#06B6D4",
    icon: Database,
    position: "top",
  },
  {
    id: "section-sandbox",
    stepNum: "Step 03",
    title: "Latent Sandbox",
    subtitle: "Continuous Relaxation",
    color: "#10B981",
    bgGlow: "rgba(16, 185, 129, 0.2)",
    borderColor: "#10B981",
    icon: Activity,
    position: "bottom",
  },
  {
    id: "section-equations",
    stepNum: "Step 04",
    title: "Neural Sparsity",
    subtitle: "5% Monosemantic Coding",
    color: "#F59E0B",
    bgGlow: "rgba(245, 158, 11, 0.2)",
    borderColor: "#F59E0B",
    icon: Cpu,
    position: "top",
  },
  {
    id: "section-benchmarks",
    stepNum: "Step 05",
    title: "ARC Pareto",
    subtitle: "29.5% @ $0.0007 / task",
    color: "#EF4444",
    bgGlow: "rgba(239, 68, 68, 0.2)",
    borderColor: "#EF4444",
    icon: BarChart3,
    position: "bottom",
  },
  {
    id: "section-honesty",
    stepNum: "Step 06",
    title: "Rigor & Limits",
    subtitle: "Observability Gap",
    color: "#EC4899",
    bgGlow: "rgba(236, 72, 153, 0.2)",
    borderColor: "#EC4899",
    icon: ShieldCheck,
    position: "top",
  },
];

export default function ProcessRoadmap() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleScrollTo = (id: string, index: number) => {
    setActiveStep(index);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="bg-cardDark border border-borderDark rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-mono font-bold tracking-widest text-brandGreen uppercase">
          Interactive Architecture Flow
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          The BDH-CQ Latent Reasoning Pipeline
        </h2>
        <p className="text-xs sm:text-sm text-mutedGray mt-2">
          Click on any node to jump to its real-time mathematical simulation and interactive verification module.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto py-16 px-4">
        {/* Track Line */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-3.5 rounded-full shadow-inner overflow-hidden flex z-0 bg-gray-900 border border-borderDark/60">
          <div className="h-full flex-1 bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]" />
          <div className="h-full flex-1 bg-gradient-to-r from-[#06B6D4] to-[#10B981]" />
          <div className="h-full flex-1 bg-gradient-to-r from-[#10B981] to-[#F59E0B]" />
          <div className="h-full flex-1 bg-gradient-to-r from-[#F59E0B] to-[#EF4444]" />
          <div className="h-full flex-1 bg-gradient-to-r from-[#EF4444] to-[#EC4899]" />
        </div>

        {/* 6 Step Nodes */}
        <div className="relative z-10 grid grid-cols-6 gap-2 items-center">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isTop = step.position === "top";
            const isActive = activeStep === idx;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => handleScrollTo(step.id, idx)}
              >
                {isTop ? (
                  <div className="flex flex-col items-center mb-4 text-center transition-transform group-hover:-translate-y-1 duration-200">
                    <span
                      className="text-[11px] font-mono font-bold tracking-wider"
                      style={{ color: step.color }}
                    >
                      {step.stepNum}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white leading-tight mt-0.5 whitespace-nowrap">
                      {step.title}
                    </span>
                    <span className="text-[10px] text-mutedGray hidden sm:inline-block max-w-[110px] truncate">
                      {step.subtitle}
                    </span>
                    <div
                      className="w-0.5 h-6 mt-2 border-l-2 border-dashed transition-all"
                      style={{ borderColor: isActive ? step.color : "#2E384D" }}
                    />
                  </div>
                ) : (
                  <div className="h-20" />
                )}

                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center relative transition-all duration-300 transform group-hover:scale-110 shadow-lg"
                  style={{
                    backgroundColor: "#131B2A",
                    border: `3px solid ${isActive ? step.color : "#2E384D"}`,
                    boxShadow: isActive ? `0 0 20px ${step.bgGlow}` : "none",
                  }}
                >
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: isActive ? step.color : step.bgGlow,
                      color: isActive ? "#FFFFFF" : step.color,
                    }}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  {isActive && (
                    <span
                      className="absolute -inset-1 rounded-full animate-ping opacity-35"
                      style={{ border: `2px solid ${step.color}` }}
                    />
                  )}
                </div>

                {!isTop ? (
                  <div className="flex flex-col items-center mt-4 text-center transition-transform group-hover:translate-y-1 duration-200">
                    <div
                      className="w-0.5 h-6 mb-2 border-l-2 border-dashed transition-all"
                      style={{ borderColor: isActive ? step.color : "#2E384D" }}
                    />
                    <span
                      className="text-[11px] font-mono font-bold tracking-wider"
                      style={{ color: step.color }}
                    >
                      {step.stepNum}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white leading-tight mt-0.5 whitespace-nowrap">
                      {step.title}
                    </span>
                    <span className="text-[10px] text-mutedGray hidden sm:inline-block max-w-[110px] truncate">
                      {step.subtitle}
                    </span>
                  </div>
                ) : (
                  <div className="h-20" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}