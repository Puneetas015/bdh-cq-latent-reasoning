export default function HonestySection() {
  return (
    <section className="space-y-6">
      <div className="border-b border-borderDark pb-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Scientific Rigor & Known Limitations 
        </h2>
        <p className="text-sm text-mutedGray mt-1">
          Honest disclosure of architectural trade-offs, failure modes, and boundaries .
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-cardDark border border-borderDark rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-brandAmber">1. The Observability Gap  </h3>
          <p className="text-xs text-mutedGray leading-relaxed">
            Verbal CoT outputs readable English scratchpads  . If a recurrent latent model fails, 
            practitioners cannot inspect a natural language transcript to determine where the derivation failed  .
          </p>
        </div>

        <div className="bg-cardDark border border-borderDark rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-brandAmber">2. Local Minima Trapping  </h3>
          <p className="text-xs text-mutedGray leading-relaxed">
            Latent vector dynamics are non-convex  . Without stochastic exploration or backtracking, 
            models can stall in shallow secondary attractor basins (demonstrated in Preset 2)  .
          </p>
        </div>

        <div className="bg-cardDark border border-borderDark rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-brandAmber">3. Scope Boundaries  </h3>
          <p className="text-xs text-mutedGray leading-relaxed">
            Published benchmarks specifically test structured constraint satisfaction (ARC, Sudoku) . 
            Dominance across open-ended natural language dialog or external tool APIs has not yet been demonstrated  .
          </p>
        </div>
      </div>
    </section>
  );
}
