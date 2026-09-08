"use client";

import ConstellationBackground from "@/components/ConstellationBackground";
import HeroSection from "@/components/HeroSection";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import WhyThisMatters from "@/components/WhyThisMatters";
import InteractiveSandbox from "@/components/InteractiveSandbox";
import EquationsSection from "@/components/EquationsSection";
import SparsityHeatmap from "@/components/SparsityHeatmap";
import ParetoChart from "@/components/ParetoChart";
import HonestySection from "@/components/HonestySection";

export default function Home() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#080B10] text-[#e2e8f0] overflow-x-hidden selection:bg-orange-500 selection:text-black">
      <ConstellationBackground />

      <main className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
        {/* Navigation Bar with Smooth Scroll Actions */}
        <nav className="flex justify-between items-center py-6 border-b border-white/10 text-sm">
          <div className="font-semibold tracking-tight text-white flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-orange-500 shadow-sm shadow-orange-500" />
            <span className="font-mono tracking-wider font-bold text-base">BDH-CQ</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-neutral-400 text-xs font-medium">
            <button onClick={() => scrollTo("section-core")} className="hover:text-white transition cursor-pointer">
              Research
            </button>
            <button onClick={() => scrollTo("section-sandbox")} className="hover:text-white transition cursor-pointer">
              Sandbox
            </button>
            <button onClick={() => scrollTo("section-method")} className="hover:text-white transition cursor-pointer">
              Equations
            </button>
            <button onClick={() => scrollTo("section-benchmarks")} className="hover:text-white transition cursor-pointer">
              Benchmark
            </button>
            <button onClick={() => scrollTo("section-limitations")} className="hover:text-white transition cursor-pointer">
              Limitations
            </button>
          </div>

          <a
            href="/concept_summary.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3.5 py-1.5 rounded border border-neutral-700 hover:border-orange-400 text-neutral-300 transition font-mono"
          >
            1-Page PDF ↗
          </a>
        </nav>

        <HeroSection />
        <ArchitectureDiagram />
        <WhyThisMatters />
        <InteractiveSandbox />
        <EquationsSection />
        <SparsityHeatmap />
        <ParetoChart />
        <HonestySection />
      </main>
    </div>
  );
}