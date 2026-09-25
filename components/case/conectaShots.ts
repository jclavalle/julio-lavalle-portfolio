import type { Shot } from "./shots";

// Conecta Pro phone mockups (transparent background, phone bezel included).
// body = the visible phone box (px); Screen fits each one into an identical box.
const W = 851;
const H = 1847;

export const CONECTA_SHOTS = {
  hero: {
    src: "/conecta/phones/conecta-01-hero-phone.png",
    width: W,
    height: H,
    alt: "Conecta construction project screen with a bathroom illustration and width and length inputs.",
    body: { x: 20, y: 125, w: 813, h: 1610, pad: 4 },
  },
  define: {
    src: "/conecta/phones/conecta-02-define-phone.png",
    width: W,
    height: H,
    alt: "Kitchen improvement choices including plumbing, flooring, walls, lighting and roofing.",
    body: { x: 18, y: 126, w: 817, h: 1617, pad: 4 },
  },
  measure: {
    src: "/conecta/phones/conecta-03-measure-phone.png",
    width: W,
    height: H,
    alt: "Detailed construction budget showing a bathroom illustration and a breakdown of floor-slab work.",
    body: { x: 13, y: 89, w: 826, h: 1679, pad: 4 },
  },
  budget: {
    src: "/conecta/phones/conecta-04-budget-phone.png",
    width: W,
    height: H,
    alt: "Construction budget summary with material and labor costs and a total.",
    body: { x: 10, y: 125, w: 831, h: 1631, pad: 4 },
  },
  application: {
    src: "/conecta/phones/conecta-05-application-phone.png",
    width: W,
    height: H,
    alt: "Application tracking screen showing the request under analysis and later approval, contract and disbursement stages.",
    body: { x: 29, y: 119, w: 793, h: 1639, pad: 4 },
  },
} satisfies Record<string, Shot>;

export const PHONE_FIT = 0.5;
