module.exports = {
  content: ["./index.html", "./src/scripts/**/*.js"],
  theme: {
    extend: {
      colors: {
        canvas: "hsl(var(--color-canvas) / <alpha-value>)",
        surface: "hsl(var(--color-surface) / <alpha-value>)",
        ink: "hsl(var(--color-ink) / <alpha-value>)",
        muted: "hsl(var(--color-muted) / <alpha-value>)",
        line: "hsl(var(--color-line) / <alpha-value>)",
        signal: "hsl(var(--color-signal) / <alpha-value>)",
        bloom: "hsl(var(--color-bloom) / <alpha-value>)",
        ice: "hsl(var(--color-ice) / <alpha-value>)"
      },
      fontFamily: {
        display: ["Gilroy", "Syne", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
        mono: ["DM Mono", "monospace"]
      },
      boxShadow: {
        glow: "0 0 0 1px hsl(var(--color-signal) / .25), 0 20px 80px hsl(var(--color-signal) / .22)",
        card: "0 8px 40px hsl(229 45% 9% / .55)"
      }
    }
  },
  plugins: []
};
