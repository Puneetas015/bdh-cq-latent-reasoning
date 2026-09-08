import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BDH-CQ // Latent Reasoning Research",
  description: "Recurrent latent computation vs autoregressive token chain-of-thought",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#080B10] text-[#e2e8f0] antialiased">
        {children}
      </body>
    </html>
  );
}