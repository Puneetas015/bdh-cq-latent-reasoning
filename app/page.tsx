"use client";

import HeroSection from "@/components/HeroSection";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import InteractiveSandbox from "@/components/InteractiveSandbox";
import EquationsSection from "@/components/EquationsSection";
import ParetoChart from "@/components/ParetoChart";
import HonestySection from "@/components/HonestySection";

export default function Home() {
  return (
    <main className="min-h-screen bg-bgDark max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Top Navigation Bar */}
      <header className="flex justify-between items-center pb-6 border-b border-borderDark">
        <div className="font-mono text-sm font-bold text-white tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brandGreen animate-pulse" />
          <span>LATENT-RELAX // BDH-CQ</span>
        </div>
        <a
          href="/concept_summary.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-cardDark border border-borderDark text-white hover:border-brandGreen transition-colors flex items-center gap-1.5"
        >
          <span>Page Summary (PDF)</span>
          <span>↗</span>
        </a>
      </header>

      {/* Main Content Sections */}
      <HeroSection />
      <ArchitectureDiagram />
      <InteractiveSandbox />
      <EquationsSection />
      <ParetoChart />
      <HonestySection />

      {/* Footer */}
      <footer className="border-t border-borderDark pt-8 pb-16 text-center text-xs text-mutedGray space-y-2">
        <p>Built for DataForge 2026: Pathway Track / NeurIPS 2026 Education Track[cite: 1].</p>
        <p>All vector dynamics and phase-space attractors run deterministically on the client[cite: 2].</p>
      </footer>
    </main>
  );
}
