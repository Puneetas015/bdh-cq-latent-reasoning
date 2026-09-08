# BDH-CQ: Recurrent Latent-Space Reasoning vs. Chain-of-Thought

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-00D26A?style=for-the-badge&logo=vercel&logoColor=white)](https://bdh-cq-latent-reasoning.vercel.app)
[![NeurIPS 2026](https://img.shields.io/badge/NeurIPS_2026-Education_Track-3B82F6?style=for-the-badge)](https://bdh-cq-latent-reasoning.vercel.app)
[![Pathway Track](https://img.shields.io/badge/Pathway_Track-DataForge_2026-FF7700?style=for-the-badge)](https://bdh-cq-latent-reasoning.vercel.app)
[![Summary PDF](https://img.shields.io/badge/1--Page_Summary-PDF-F59E0B?style=for-the-badge&logo=adobe-acrobat-reader&logoColor=white)](https://bdh-cq-latent-reasoning.vercel.app/concept_summary.pdf)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> An interactive, research-grade visual briefing exploring **BDH-CQ**, forward-pass associative memory, and recurrent latent relaxation. Built for **DataForge 2026 (Pathway Track)** and the **NeurIPS 2026 Education Track**.

---

## 🔗 Quick Links

- 🌐 **Live Web Application:** [https://bdh-cq-latent-reasoning.vercel.app](https://bdh-cq-latent-reasoning.vercel.app)
- 📄 **1-Page Concept Summary (PDF):** [https://bdh-cq-latent-reasoning.vercel.app/concept_summary.pdf](https://bdh-cq-latent-reasoning.vercel.app/concept_summary.pdf)
- 💻 **Source Repository:** [https://github.com/Puneetas015/bdh-cq-latent-reasoning](https://github.com/Puneetas015/bdh-cq-latent-reasoning)
- 👤 **Author:** Puneet Tiwari

---

## 🎯 Target Audience & Prerequisites

- **Target Audience:** Machine Learning researchers, systems engineers, and data scientists investigating post-Transformer reasoning paradigms and inference economics.
- **Prerequisites:** Familiarity with linear attention mechanisms, Key-Value (KV) cache memory scaling, dynamical systems/attractors, and Hebbian associative learning.

---

## 🧠 Central Research Thesis

Standard autoregressive Large Language Models (LLMs) rely on verbal **Chain-of-Thought (CoT)** prompting to borrow computational depth:

$$\text{Fixed Layers } L \implies \text{Expand Sequence Length } T \implies \mathcal{O}(T) \text{ KV Cache Overhead}$$

This introduces severe structural inefficiencies:
1. **The KV-Cache Wall:** Working memory footprint grows linearly with sequence length $\mathcal{O}(T)$, quickly saturating High-Bandwidth Memory (HBM).
2. **Token Compute Overhead:** Full autoregressive matrix projections and softmax passes are expended on conversational syntax, punctuation, and linguistic filler.
3. **Verbosity-Bound Economics:** Inference costs scale with natural-language token volume rather than intrinsic problem complexity.

### The BDH-CQ Paradigm

**BDH-CQ** (Pathway Research) eliminates intermediate token generation by decoupling reasoning depth from context length:
- Context demonstrations are compressed into fixed-rank associative memory **in a single forward pass** without backpropagation.
- Multi-step reasoning unfolds via **iterative latent relaxation** inside stationary continuous vectors ($h_t \in \mathbb{R}^d$), keeping working memory bounded at $\mathcal{O}(1)$.

---

## 🔬 Mathematical Formulation

### 1. In-Context Associative Memory Update
Unlike test-time training (TTT) frameworks that perform gradient descent on demonstration examples, BDH-CQ assimilates demonstration context $D_t = (x_t, y_t)$ directly during the forward pass:

$$S_t = U_{\theta}(S_{t-1}, D_t)$$

- $S_t \in \mathbb{R}^{d \times d}$: Fixed-rank associative context state preserving $\mathcal{O}(1)$ working memory.
- $U_{\theta}$: Frozen, learned linear-attention projection operator simulating Hebbian weight assimilation without test-time backpropagation.

### 2. Recurrent Latent Relaxation
Target constraints are solved by cycling an internal continuous state $h_t$ through a recurrent dynamical operator across depth steps $t \in \{1, \dots, T\}$:

$$h_{t+1} = \mathrm{LayerNorm}\Big(h_t + \alpha \cdot \mathrm{ReLU}(W h_t - b)\Big)$$

- $h_t \in \mathbb{R}^{32}$: Continuous working state vector (no textual tokens emitted).
- $W, b$: Weight tensor and bias vector defining the global energy landscape.
- $\mathrm{ReLU}$: Enforces non-negative activations, producing $\sim$5% biological monosemantic sparsity.
- $\alpha$: Damped step-size relaxation parameter ensuring convergence toward the target attractor basin.

---

## 📊 Architectural Landscape Comparison

| Dimension | Standard Transformer + CoT | Test-Time Training (TTT / TRM) | BDH-CQ (Pathway Research) |
| :--- | :--- | :--- | :--- |
| **Working Memory** | $\mathcal{O}(T)$ (expands per reasoning token) | $\mathcal{O}(1)$ (fixed prompt buffer) | **$\mathcal{O}(1)$ (invariant continuous state)** |
| **KV-Cache Scaling** | Linearly growing memory footprint | Architecture-dependent flat buffer | **Constant working buffer ($0.00\text{ MB}$ intermediate expansion)** |
| **Test-Time Adaptation** | Appended prompt context tokens | Test-time gradient descent / backprop | **Forward-pass associative update ($U_\theta$)** |
| **Reasoning Mechanism** | Autoregressive token generation | Multi-epoch backward-pass search | **Recurrent continuous latent relaxation** |
| **Intermediate Tokens** | Emitted natural language strings | None | **Zero intermediate tokens ($0\text{ tokens billed}$)** |
| **Mechanistic Observability** | High (human-readable English steps) | Low (weight parameter shifts) | Low (continuous vector trajectories in $\mathbb{R}^d$) |

---

## 📈 Empirical Benchmarks & Pareto Dynamics

Empirical results establish that continuous latent relaxation shifts the intelligence-per-dollar Pareto frontier on multi-constraint tasks:
```
Inference Cost ($/task, log scale)
$0.0650 ┤                                                 [Claude 3.7 Sonnet (48.0%)]
$0.0240 ┤                                      [o3-mini (41.0%)]
$0.0112 ┤                         [DeepSeek-R1 14B (31.8%)]
$0.0077 ┤                         [GPT-5.6 Luna Low (34.2%)]
$0.0007 ┼──────────────★ BDH-CQ 150M (29.5%)
$0.0005 ┴─────────────────────────────────────────────────────────────────────────────→
0%             10%            20%            30%            40%            50%
ARC-AGI-1 Pass@2 Accuracy (%)
```
## 🎮 Interactive Artifact Features

The deployed web application provides a didactic testbench built in Next.js, Tailwind CSS, and HTML5 Canvas:

1. **Staged Hero Sequence & Scramble Decode:** 
   - Staged sequence reveal (`DATAFORGE 2026 // PATHWAY TRACK`).
   - Dynamic glyph scramble/decode header on scroll.
   - Dual-loop vector visualization illustrating input problem trajectory, internal attractor cycling, and solution extraction.
2. **Interactive Latent Relaxation Playground (A/B Manifold Studio):**
   - **Interactive Split Slider:** Compare real-time latent reconstruction alongside the ground-truth target manifold.
   - **Recurrence Depth ($T$) Control:** Observe step-by-step de-quantization from $T=1$ (high noise) to $T=16$ (attractor lock).
   - **Stochastic Noise Injection ("Perturb"):** Inject synthetic entropy spikes into the latent vector to watch the recurrent operator damp perturbations and recover stability.
   - **Web Audio Telemetry:** Synthesizes real-time acoustic feedback corresponding to relaxation frequency shifts.
3. **Synaptic Sparsity Substrate (400-Unit Grid):**
   - Interactive 20×20 neural matrix demonstrating the transition between under-activation ($<4\%$), optimal monosemantic isolation ($\sim 5\%$), and polysemantic interference ($>15\%$).
   - Live synaptic concept decoder inspecting individual unit activations across visual feature manifolds.
4. **Interactive Pareto Scatter Plot & Comprehensive Data Table:**
   - Accurate logarithmic cost-vs-accuracy frontier tracking 8 baseline architectures.
   - Toggleable multi-column evaluation matrix reporting parameter counts, Sudoku Extreme scores, KV footprints, and test-time compute types.

---

## ⚠️ Scientific Boundaries & Honest Limitations

In compliance with academic evaluation standards, this project explicitly documents four key operational limitations:

1. **The Mechanistic Observability Gap:** Autoregressive CoT exposes conversational failure steps directly in English. In BDH-CQ, reasoning unfolds inside continuous 32-dimensional latent vectors. Diagnosing failure modes requires external linear probes or Sparse Autoencoders (SAEs).
2. **Non-Convex Attractor Trapping:** Recurrent relaxation behaves dynamically as an energy minimization process. On deceptive constraint puzzles, $h_t$ can settle into local minima without the explicit backtracking pathways available to rejection-sampled token models.
3. **Compositional Property Binding Failure:** Interventions in Engdahl et al. (2026) reveal sharp degradation on multi-attribute binding (e.g., scoring **0/72 on color-swap tasks**), exposing a limitation in relational feature binding.
4. **Domain Bounds:** Verified empirical results are demonstrated on structured discrete grids (ARC-AGI-1, Sudoku Extreme); extension to open-ended dialogue, theorem proving, and multi-turn tool-calling remains unestablished.

*Substrate Transparency Notice:* The client-side interactive sandbox runs a deterministic, real-time geometric surrogate to illustrate mathematical convergence properties in the browser without requiring a dedicated server-side GPU cluster.

---

## 🛠️ Local Development & Build

### Prerequisites
- Node.js LTS (v18.x or v20.x recommended)
- npm / yarn / pnpm

### Setup
```bash
# 1. Clone the repository
git clone [https://github.com/Puneetas015/bdh-cq-latent-reasoning.git](https://github.com/Puneetas015/bdh-cq-latent-reasoning.git)
cd bdh-cq-latent-reasoning

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

```
Open http://localhost:3000 to view the application.
## Production Build

```
npm run build
npm run start

```

📁 Repository Structure
```
bdh-cq-latent-reasoning/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│bdh-cq-latent-reasoning/
├── app/
│   ├── globals.css                   # Custom DataForge dark theme & typography
│   ├── layout.tsx                    # Root HTML wrapper with smooth-scroll configuration
│   └── page.tsx                      # 1400px constrained desktop research layout
├── components/
│   ├── ArchitectureDiagram.tsx       # 02 Token Serialization vs Latent Relaxation
│   ├── AttractorCanvas.tsx           # Canvas phase-space trajectory renderer
│   ├── ConstellationBackground.tsx   # Moving particle node & binary bit backdrop
│   ├── EquationsSection.tsx          # 04 Math typesetting (U_theta & LayerNorm recurrence)
│   ├── HeroSection.tsx               # 01 Staged entrance, scramble decode & attractor visual
│   ├── HonestySection.tsx            # 07 Limitations & 08 Academic sources footer
│   ├── InteractiveSandbox.tsx        # 03 A/B split-screen slider & noise injection studio
│   ├── ParetoChart.tsx               # 06 Logarithmic scatter plot & benchmark matrix
│   ├── ScrambleTitle.tsx             # Text decode scroll-triggered animation
│   ├── SparsityHeatmap.tsx           # 05 400-unit neural sparsity & concept decoder
│   └── WhyThisMatters.tsx            # Context & economic motivation cards
├── docs/
│   └── main.tex                      # LaTeX source for the 1-page summary briefing
├── public/
│   ├── concept_summary.pdf           # Self-contained one-page research document
│   └── hero.jpg                      # High-resolution benchmark reference asset
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```


## 📚 Primary References

```
@article{engdahl2026bdhcq,
  title={BDH-CQ: In-Context Learning with Recurrent Latent Reasoning},
  author={Engdahl, B. and Kosowski, A. and Chorowski, J. and Stamirowska, Z. and Uzna{\'n}ski, P. and Zhong, R. and others},
  journal={arXiv preprint arXiv:2608.09888},
  year={2026},
  url={[https://arxiv.org/pdf/2608.09888](https://arxiv.org/pdf/2608.09888)}
}

@techreport{pathway2025bdh,
  title={BDH (Dragon Hatchling): A Brain-Inspired Post-Transformer Architecture},
  author={{Pathway Research}},
  institution={Pathway},
  year={2025}
}

@article{chollet2019measure,
  title={On the Measure of Intelligence},
  author={Chollet, Fran{\c{c}}ois},
  journal={arXiv preprint arXiv:1911.01547},
  year={2019},
  url={[https://arcprize.org](https://arcprize.org)}
}
```
## 📜 License
Distributed under the MIT License. See LICENSE for details. Built by Puneet Tiwari for the DataForge 2026 Pathway Track and the NeurIPS 2026 Education Track.

### Push the Updated README to GitHub

Run these commands in your PowerShell terminal:

```powershell
git add README.md
git commit -m "docs: sync README with DataForge theme, math formalizations, and benchmark metrics"
git push origin main
