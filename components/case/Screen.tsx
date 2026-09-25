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
  fit,
  className = "",
}: {
  shot: Shot;
  sizes: string;
  priority?: boolean;
  decorative?: boolean;
  /** Blend a solid black image background into the page. Off for transparent images. */
  blend?: boolean;
  /** Wrapper aspect ratio (width / height). The phone is scaled uniformly to fit inside it, centered. */
  fit?: number;
  className?: string;
}) {
  const { x, y, w, h, pad = 0 } = shot.body;
  const bw = w + pad * 2;
  const bh = h + pad * 2;

  if (fit) {
    const hUnits = 1 / fit; // wrapper height in units of its width
    const scale = Math.min(1 / bw, hUnits / bh);
    const left = (1 - bw * scale) / 2 - (x - pad) * scale;
    const top = (hUnits - bh * scale) / 2 - (y - pad) * scale;
    return (
      <div
        className={`relative w-full overflow-hidden ${blend ? "mix-blend-lighten" : ""} ${className}`}
        style={{ aspectRatio: `${fit}` }}
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
            left: `${left * 100}%`,
            top: `${(top / hUnits) * 100}%`,
            width: `${shot.width * scale * 100}%`,
          }}
        />
      </div>
    );
  }

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
