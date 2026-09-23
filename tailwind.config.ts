import type { Config } from "tailwindcss";

// Design tokens for the site. See DESIGN.md for the reasoning behind
// the palette and type pairing.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#10141C", // page background — deep navy, not pure black
        surface: "#171C26", // card / raised-surface background
        rule: "#2A303C", // hairline borders and dividers
        paper: "#EDE9DE", // primary text color — warm off-white "paper" ink
        muted: "#8B93A1", // secondary text, labels
        accent: "#5FA88C", // the one accent — desaturated ledger-green
        warm: "#D9A868", // reserved for "in progress" status only
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
