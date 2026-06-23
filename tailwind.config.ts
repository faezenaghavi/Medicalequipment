import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mint:    { DEFAULT: "#B9DFC5", 50: "#F0F9F3", 100: "#D9F0E2", 200: "#B9DFC5", 300: "#8FCBA8", 400: "#5EAF7E", 500: "#3A8F5F", 600: "#2C6E49" },
        surface: { DEFAULT: "#F5FFFA", 50: "#FFFFFF", 100: "#F5FFFA", 200: "#E8F7EE" },
        gold:    { DEFAULT: "#DEA25E", 50: "#FDF5EA", 100: "#FAE8CE", 200: "#F3CA98", 300: "#DEA25E", 400: "#C8853A", 500: "#A6682A" },
        forest:  { DEFAULT: "#1A2E24", 600: "#1A2E24", 700: "#142318", 800: "#0D180F", 900: "#060C07" },
        stone:   { DEFAULT: "#6B7C73", 300: "#A8B5AE", 400: "#7E9086", 500: "#6B7C73", 600: "#536159" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body:    ["var(--font-body)",    "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)",    "monospace"],
      },
      letterSpacing: { tight2: "-0.035em", wide2: "0.18em" },
      maxWidth:      { page: "1280px" },
      borderRadius:  { "2xl": "1rem", "3xl": "1.5rem", "4xl": "2rem" },
      backgroundImage: {
        "mint-radial":   "radial-gradient(ellipse at top left, #D9F0E2 0%, #F5FFFA 65%)",
        "hero-gradient": "linear-gradient(135deg, #F0F9F3 0%, #F5FFFA 50%, #FDF5EA 100%)",
      },
      boxShadow: {
        card:    "0 2px 20px rgba(26,46,36,0.06), 0 1px 4px rgba(26,46,36,0.04)",
        "card-hover": "0 8px 40px rgba(26,46,36,0.12), 0 2px 8px rgba(26,46,36,0.06)",
        gold:    "0 4px 24px rgba(222,162,94,0.3)",
        inner:   "inset 0 1px 3px rgba(26,46,36,0.08)",
      },
      animation: {
        "fade-up":      "fadeUp .6s ease forwards",
        "fade-in":      "fadeIn .4s ease forwards",
        "spin-slow":    "spin 8s linear infinite",
        "pulse-slow":   "pulse 3s ease-in-out infinite",
        "ticker":       "ticker 28s linear infinite",
      },
      keyframes: {
        fadeUp:  { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn:  { from: { opacity: "0" },                                 to: { opacity: "1" } },
        ticker:  { from: { transform: "translateX(0)" },                   to:  { transform: "translateX(-50%)" } },
      },
    },
  },
  plugins: [],
};
export default config;