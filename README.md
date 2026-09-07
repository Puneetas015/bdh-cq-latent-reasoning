# BDH-CQ: Recurrent Latent-Space Reasoning vs. Chain-of-Thought

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-00D26A?style=for-the-badge&logo=vercel&logoColor=white)](https://bdh-cq-latent-reasoning.vercel.app)
[![NeurIPS 2026](https://img.shields.io/badge/NeurIPS_2026-Education_Track-3B82F6?style=for-the-badge)](https://bdh-cq-latent-reasoning.vercel.app)
[![Pathway Track](https://img.shields.io/badge/Pathway_Track-DataForge_2026-00D26A?style=for-the-badge)](https://bdh-cq-latent-reasoning.vercel.app)
[![Summary PDF](https://img.shields.io/badge/1--Page_Summary-PDF-F59E0B?style=for-the-badge&logo=adobe-acrobat-reader&logoColor=white)](https://bdh-cq-latent-reasoning.vercel.app/concept_summary.pdf)

> An interactive visual explainer exploring BDH-CQ, recurrent latent reasoning, associative memory, and how latent-state computation can provide an alternative to explicitly generating long token-based reasoning chains.

---

## 🔗 Quick Links

- 🌐 **Live Demo:** https://bdh-cq-latent-reasoning.vercel.app
- 📄 **1-Page Concept Summary:** https://bdh-cq-latent-reasoning.vercel.app/concept_summary.pdf
- 💻 **GitHub Repository:** https://github.com/Puneetas015/bdh-cq-latent-reasoning

---

## 🧠 What Is This Project?

Large Language Models commonly perform reasoning by generating a sequence of intermediate tokens.

For example:

```text
Question
   ↓
Reasoning Step 1
   ↓
Reasoning Step 2
   ↓
Reasoning Step 3
   ↓
Final Answer
```
This approach is commonly associated with Chain-of-Thought (CoT) reasoning.

BDH-CQ explores a different idea:
```
Question
   ↓
Latent State
   ↓
State Update
   ↓
State Update
   ↓
State Update
   ↓
Final Answer
```
Instead of requiring every intermediate reasoning step to become a text token, the model can repeatedly refine an internal latent representation.

This project provides an interactive way to understand that idea through visual simulations, equations, resource comparisons, and reasoning experiments.

## 🎯 Central Research Question

Can iterative refinement of a fixed-dimensional latent state provide useful reasoning without explicitly expanding the context with a long chain of generated reasoning tokens?

The project explores this question from three perspectives:

Reasoning efficiency
Memory efficiency
Interpretability trade-offs
## 🔬 Core Concepts
1. Recurrent Latent Reasoning

Traditional token-based reasoning can be represented as:
```
Input
 ↓
Token
 ↓
Token
 ↓
Token
 ↓
Token
 ↓
Answer
```
Recurrent latent reasoning instead maintains an internal state:
```
Input
 ↓
h₀
 ↓
h₁
 ↓
h₂
 ↓
h₃
 ↓
Answer
```
The internal state is repeatedly updated rather than continuously extending the textual context.

Conceptually:
```
hₜ₊₁ = Uθ(hₜ, xₜ)
```
2. KV-Cache Bottleneck

Transformer models typically maintain Key/Value representations for previously processed tokens.

Conceptually:
```
Token 1 → K₁, V₁
Token 2 → K₂, V₂
Token 3 → K₃, V₃
...
Token N → Kₙ, Vₙ
```
As the context grows:
```
More Tokens
     ↓
More K/V Entries
     ↓
Larger KV Cache
     ↓
Higher Memory Usage
```
This becomes an important consideration for very long-context reasoning.

3. Synaptic Plasticity

BDH draws inspiration from biological neural systems.

In biological learning, synaptic connections can change their strength based on neural activity.

A simplified Hebbian-learning intuition is:

Neurons that repeatedly activate together can strengthen their connection.

The computational intuition can be represented as:
```
New Information
      ↓
Internal State
      ↓
Associative Update
      ↓
Updated State
```
The project does not claim that BDH literally reproduces biological synapses. Instead, it explores computational mechanisms inspired by associative memory and synaptic plasticity.

## 🧩 Interactive Architecture

The web application is built as an interactive educational experience.
```
┌──────────────────────────────────────────────┐
│          Architectural Paradox               │
│                                              │
│ Token Growth vs. Latent-State Recurrence     │
└──────────────────────┬───────────────────────┘
                       ↓
┌──────────────────────────────────────────────┐
│        Interactive Reasoning Sandbox         │
│                                              │
│ Constraint puzzles + recurrence controls     │
└──────────────────────┬───────────────────────┘
                       ↓
┌──────────────────────────────────────────────┐
│          Latent State Visualization          │
│                                              │
│ State trajectory + convergence visualization │
└──────────────────────┬───────────────────────┘
                       ↓
┌──────────────────────────────────────────────┐
│             Resource Telemetry               │
│                                              │
│ Tokens • Memory • Latency • Compute          │
└──────────────────────┬───────────────────────┘
                       ↓
┌──────────────────────────────────────────────┐
│          Reasoning & Sparsity                │
│                                              │
│ Associative updates + sparse activations     │
└──────────────────────┬───────────────────────┘
                       ↓
┌──────────────────────────────────────────────┐
│       Benchmark & Limitations Section        │
│                                              │
│ Evidence + trade-offs + open questions       │
└──────────────────────────────────────────────┘
```
## 📊 Architectural Comparison
Dimension	Transformer + CoT	Test-Time Optimization	Recurrent Latent Reasoning
Reasoning representation	Generated tokens	Optimization process	Latent state
Context expansion	Yes	Generally limited	Designed to remain bounded
Intermediate reasoning	Text tokens	Optimization process	Hidden continuous state
KV-cache pressure	Increases with context	Architecture dependent	Can be bounded with recurrent state
Test-time learning	Usually no weight updates	Gradient-based updates	Forward-pass state updates
Interpretability	Higher	Lower	Lower than textual CoT
Long-context motivation	Expensive memory	Compute intensive	Compact recurrent representation

Complexity and memory characteristics depend on the exact implementation. The table describes the architectural motivation rather than claiming that every implementation has identical scaling.

## 🧪 Interactive Reasoning Sandbox

The project includes deterministic reasoning environments designed to demonstrate the difference between:

Token-Based Reasoning
```
Question
   ↓
Reasoning Token
   ↓
Reasoning Token
   ↓
Reasoning Token
   ↓
Answer
```
Latent-State Iterative Refinement
```
Question
   ↓
State₀
   ↓
State₁
   ↓
State₂
   ↓
State₃
   ↓
Answer
```
Users can adjust recurrence depth and observe how the internal state changes over multiple iterations.

## 📈 Latent-State Visualization

The application visualizes the evolution of the latent state:
```
h₀ → h₁ → h₂ → h₃ → ... → hₜ
```
A dimensionality-reduction projection can be used to display the trajectory in a human-readable 2D space.

Conceptually:

```
Latent State Space
       • h₀

          • h₁

             • h₂

                • h₃

                   • h₄
                      ↓
                  Attractor
```
The visualization is intended for intuition rather than claiming that a 2D projection completely represents the model's internal computation.

## ⚡ Resource Telemetry

The demo provides conceptual comparisons of:

Generated reasoning tokens
Approximate KV-cache growth
Latent-state iterations
Relative memory requirements
Relative computation
Reasoning depth

The telemetry is primarily educational and should not be interpreted as a hardware-level benchmark unless explicitly labeled as such.

## 🧠 Why This Matters

The project investigates an important question for future reasoning systems:

Does reasoning always need to be represented as a growing sequence of language tokens?

Token-based reasoning has an important advantage:
```
Human-readable
      ↓
Easy to inspect
      ↓
Easy to debug
```
Latent reasoning potentially offers:
```
Compact internal computation
      ↓
Less explicit token generation
      ↓
Potentially different memory/compute trade-offs
```
But it introduces an important disadvantage:
```
Less visible reasoning
      ↓
Harder to interpret
      ↓
Harder to verify directly
```
Therefore, this project treats efficiency and interpretability as a trade-off, rather than assuming latent reasoning is universally superior.

## 🌐 Deployment

The project can be deployed using Vercel.

For a standard Next.js deployment, Vercel can automatically detect the framework and configure the build.

Build locally before deployment:
```
npm run build
```
📁 Project Structure
```
bdh-cq-latent-reasoning/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── reasoning-sandbox.tsx
│   ├── latent-visualization.tsx
│   ├── telemetry.tsx
│   └── architecture-comparison.tsx
│
├── public/
│   └── concept_summary.pdf
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```
The structure above is an example. Your actual repository structure may differ.

## 📚 Primary References
BDH-CQ
```
\@article{engdahl2026bdhcq,
  title={BDH-CQ: In-Context Learning with Recurrent Latent Reasoning},
  author={Engdahl, B. and Chorowski, J. and Kosowski, A. and Stamirowska, Z. and Uznański, P. and others},
  journal={arXiv preprint arXiv:2608.09888},
  year={2026}
}
```
Measure of Intelligence
```
@article{chollet2019measure,
  title={On the Measure of Intelligence},
  author={Chollet, Francois},
  journal={arXiv preprint arXiv:1911.01547},
  year={2019}
}
```
BDH / Dragon Hatchling
```
@techreport{pathway2025bdh,
  title={BDH (Dragon Hatchling): A Brain-Inspired Post-Transformer Architecture},
  author={{Pathway Research}},
  institution={Pathway},
  year={2025}
}
```
## ⚠️ Limitations

This project is primarily an interactive educational and research-exploration artifact.

It should not be interpreted as:

A complete reproduction of the BDH-CQ training pipeline
Proof that latent reasoning universally outperforms Chain-of-Thought
A replacement for published benchmark evaluations
Evidence that biological neurons and BDH perform identical computations

The visualizations are designed to make difficult architectural concepts easier to understand.

## 🔭 Future Work

Potential extensions include:

Implementing a trainable recurrent latent-reasoning model
Comparing latent recurrence against token-based CoT under matched compute budgets
Evaluating memory scaling experimentally
Testing larger reasoning benchmarks
Studying latent-state interpretability
Investigating sparse associative updates
Adding reproducible benchmark scripts
Comparing different recurrent state sizes and recurrence depths

## ⭐ If you find this project useful

Consider giving the repository a star and sharing it with others interested in:

Latent Reasoning • Post-Transformer Architectures • Associative Memory • AI Research • Reasoning Systems


Then push it:

```bash
git add README.md
git commit -m "docs: update comprehensive README"
git push origin main
```
