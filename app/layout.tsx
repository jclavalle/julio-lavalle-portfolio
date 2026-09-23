import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Fraunces carries the narrative — case-study prose, headlines, the
// human/founder side of the story.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// IBM Plex Mono carries the ledger — dates, metrics, stack tags, nav.
// Two families, two clearly distinct jobs: story vs. receipts.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Julio Lavalle — Product",
  description:
    "Founder and product leader building AI-native and fintech products end-to-end, across the US and Latin America.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${plexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
