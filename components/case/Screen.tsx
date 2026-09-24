import Image from "next/image";
import type { Shot } from "./shots";

/**
 * Renders a product image fitted to its phone's visible box (Shot.body), so every phone
 * has the same proportions and lines up exactly. Only empty margin around the phone is
 * trimmed; the full device and screen stay visible.
 */
export default function Screen({
  shot,
  sizes,
  priority = false,
  decorative = false,
  blend = true,
  className = "",
}: {
  shot: Shot;
  sizes: string;
  priority?: boolean;
  decorative?: boolean;
  /** Blend a solid black image background into the page. Off for transparent images. */
  blend?: boolean;
  className?: string;
}) {
  const { x, y, w, h, pad = 0 } = shot.body;
  const bw = w + pad * 2;
  const bh = h + pad * 2;
  return (
    <div
      className={`relative w-full overflow-hidden ${blend ? "mix-blend-lighten" : ""} ${className}`}
      style={{ aspectRatio: `${bw} / ${bh}` }}
    >
      <Image
        src={shot.src}
        width={shot.width}
        height={shot.height}
        alt={decorative ? "" : shot.alt}
        sizes={sizes}
        priority={priority}
        className="absolute h-auto max-w-none"
        style={{
          left: `${(-(x - pad) / bw) * 100}%`,
          top: `${(-(y - pad) / bh) * 100}%`,
          width: `${(shot.width / bw) * 100}%`,
        }}
      />
    </div>
  );
}
