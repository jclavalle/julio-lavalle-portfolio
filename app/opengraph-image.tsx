import { OG_SIZE, stageImage } from "@/lib/og";

// Link preview for every page (WhatsApp, LinkedIn, Slack, X).
export const alt = "Julio Lavalle — product leader and founder building AI-native and fintech products";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return stageImage();
}
