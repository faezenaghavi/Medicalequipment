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
        // Background layers
        navy: {
          950: "#0B1120",   // page bg
          900: "#111827",   // card surface
          800: "#1A2235",   // elevated surface
          700: "#243047",   // borders / dividers
        },
        // Primary accent
        teal: {
          DEFAULT: "#00C9A7",
          600: "#00A88C",
          400: "#2DDFC3",
          200: "#9EFAEC",
        },
        // Secondary accent
        amber: {
          DEFAULT: "#F59E0B",
          600: "#D97706",
          400: "#FBC34A",
        },
        // Text
        slate: {
          50:  "#F0F4FF",
          300: "#B8C8DF",
          400: "#8FA0BC",
          600: "#4E617A",
        },
      },

      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
        body:    ["Inter", "system-ui", "sans-serif"],
        mono:    ["JetBrains Mono", "Fira Mono", "monospace"],
      },

      fontSize: {
        "2xs": ["10px", { lineHeight: "1.4" }],
        xs:   ["12px", { lineHeight: "1.5" }],
        sm:   ["14px", { lineHeight: "1.57" }],
        base: ["16px", { lineHeight: "1.6" }],
        lg:   ["18px", { lineHeight: "1.6" }],
        xl:   ["20px", { lineHeight: "1.5" }],
        "2xl": ["24px", { lineHeight: "1.4" }],
        "3xl": ["30px", { lineHeight: "1.3" }],
        "4xl": ["36px", { lineHeight: "1.2" }],
        "5xl": ["48px", { lineHeight: "1.1" }],
        "6xl": ["60px", { lineHeight: "1.07" }],
        "7xl": ["72px", { lineHeight: "1.05" }],
      },

      borderRadius: {
        sm:   "6px",
        DEFAULT: "12px",
        lg:   "20px",
        pill: "999px",
      },

      boxShadow: {
        card:  "0 2px 12px rgba(0,0,0,0.45), 0 0 0 1px rgba(240,244,255,0.08)",
        glow:  "0 0 24px rgba(0,201,167,0.18)",
        "glow-lg": "0 0 48px rgba(0,201,167,0.22)",
      },

      backdropBlur: {
        xs: "4px",
        sm: "8px",
        DEFAULT: "16px",
        lg: "24px",
      },

      animation: {
        "ticker":   "ticker 24s linear infinite",
        "float":    "float 6s ease-in-out infinite",
        "fade-up":  "fade-up 0.55s ease both",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },

      keyframes: {
        ticker: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%":      { opacity: "0.5", transform: "scale(0.7)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;