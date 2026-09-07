/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: "#0B0F17",
        cardDark: "#131B2A",
        borderDark: "#232F46",
        brandGreen: "#00D26A",
        brandBlue: "#3B82F6",
        brandAmber: "#F59E0B",
        brandRed: "#EF4444",
        mutedGray: "#8A93A6",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};