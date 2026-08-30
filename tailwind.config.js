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
        bloom: "hsl(var(--color-bloom) / <alpha-value>)"
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sans: ["Manrope", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      boxShadow: {
        glow: "0 0 0 1px hsl(var(--color-signal) / .25), 0 20px 80px hsl(var(--color-signal) / .22)",
        card: "0 24px 60px hsl(231 61% 4% / .32)"
      }
    }
  },
  plugins: []
};
