import SparsityHeatmap from "./SparsityHeatmap";

export default function EquationsSection() {
  return (
    <section className="space-y-6">
      <div className="border-b border-borderDark pb-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">The Equations of Reasoning  </h2>
        <p className="text-sm text-mutedGray mt-1">
          Biological synaptic plasticity and sparse coding driving BDH-CQ  .
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-cardDark border border-borderDark rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-mono text-brandGreen uppercase font-bold">
            1. In-Context Associative State Accumulation  
          </h3>
          <p className="text-sm text-mutedGray leading-relaxed">
            Demonstrations update memory purely in the forward pass without test-time backpropagation 
            or learned parameter modifications  :
          </p>
          <div className="p-3 bg-bgDark rounded-lg border border-borderDark font-mono text-sm text-center text-gray-200">
            {"S_t = U_θ(S_{t-1}, D_t)"} 
          </div>
        </div>

        <div className="bg-cardDark border border-borderDark rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-mono text-brandBlue uppercase font-bold">
            2. Recurrent Latent Relaxation  
          </h3>
          <p className="text-sm text-mutedGray leading-relaxed">
            Internal vectors iterate directly within high-dimensional space without emitting text tokens  :
          </p>
          <div className="p-3 bg-bgDark rounded-lg border border-borderDark font-mono text-sm text-center text-gray-200">
            {"h_{t+1} = LayerNorm(h_t + α · ReLU(W h_t - b))"} 
          </div>
        </div>
      </div>

      <SparsityHeatmap />
    </section>
  );
}
