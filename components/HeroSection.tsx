import { Sparkles, ArrowDownRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="space-y-6 pt-6">
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-brandGreen/10 text-brandGreen border border-brandGreen/30">
          NeurIPS 2026 Education Track
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-brandBlue/10 text-brandBlue border border-brandBlue/30">
          Pathway Track (DataForge)
        </span>
      </div>

      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
        Recurrent Latent-Space Reasoning <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandGreen to-brandBlue">
          vs. Chain-of-Thought
        </span>
      </h1>

      <p className="text-lg text-mutedGray max-w-3xl leading-relaxed">
        Why must an LLM speak 500 words to solve a spatial constraint? Traditional Transformers 
        externalize computational depth into sequential text tokens. <b>BDH-CQ</b> proves that continuous 
        latent vector relaxation achieves state convergence without appending a single token to context.
      </p>

      {/* Central Claim Box */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-brandGreen/10 via-cardDark to-brandBlue/5 border-l-4 border-brandGreen border border-borderDark shadow-xl">
        <div className="flex items-center gap-2 text-brandGreen font-mono text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> Falsifiable Research Claim
        </div>
        <p className="mt-3 text-lg font-medium text-gray-100 leading-relaxed">
          &ldquo;Iterative refinement of a fixed-dimension latent state can satisfy multi-constraint 
          abstract reasoning tasks without expanding sequence length or generating an explicit 
          verbal chain-of-thought, establishing a Pareto improvement in compute cost while 
          trading off token-level intermediate interpretability.
        </p>
      </div>
    </section>
  );
}
