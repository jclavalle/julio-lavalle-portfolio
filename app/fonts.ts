import { Barlow, Saira } from "next/font/google";

// Homepage-only faces: Saira for headlines, Barlow for body copy.
// (IBM Plex Mono is already loaded site-wide in layout.tsx as --font-mono.)
export const saira = Saira({
  subsets: ["latin"],
  variable: "--font-saira",
  weight: ["400", "500"],
  display: "swap",
});

export const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-barlow",
  weight: ["400", "500"],
  display: "swap",
});
