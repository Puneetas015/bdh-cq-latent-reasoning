import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LatentRelax | Recurrent Latent-Space Reasoning vs. Chain-of-Thought",
  description: "Interactive visual essay on continuous latent relaxation in BDH-CQ.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-brandGreen/20 selection:text-brandGreen">
        {children}
      </body>
    </html>
  );
}
