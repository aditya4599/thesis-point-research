import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#071A34",
        background: "#FCFCFD",
        surface: "#F5F7FA",
        text: {
          primary: "#111827",
          muted: "#5B6472",
        },
        border: "#E5E8EB",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      borderRadius: {
        sm: "0.125rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(7 26 52 / 0.06), 0 1px 2px -1px rgb(7 26 52 / 0.06)",
        "card-hover": "0 10px 25px -5px rgb(7 26 52 / 0.1), 0 4px 6px -4px rgb(7 26 52 / 0.06)",
      },
      animation: {
        marquee: "marquee 500s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
