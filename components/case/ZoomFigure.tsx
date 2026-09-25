"use client";

import Image from "next/image";
import { useRef } from "react";

type Props = {
  src: string;
  w: number;
  h: number;
  alt: string;
  caption: string;
  /** Distinguishes real (anonymized) captures from illustrations. */
  kind: "Anonymized screenshot" | "Illustrative reconstruction";
  sizes: string;
  className?: string;
};

/** Figure with keyboard-accessible enlargement. The dialog serves the same (sanitized) file. */
export default function ZoomFigure({ src, w, h, alt, caption, kind, sizes, className = "" }: Props) {
  const dlg = useRef<HTMLDialogElement>(null);

  return (
    <figure className={className}>
      <button
        type="button"
        onClick={() => dlg.current?.showModal()}
        aria-label={`Enlarge: ${alt}`}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-rule bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        style={{ aspectRatio: `${w} / ${h}` }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-contain" />
        <span className="absolute bottom-3 right-3 rounded-full bg-ink/85 px-3 py-1 font-mono text-[11px] tracking-wider text-paper opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          ENLARGE
        </span>
      </button>
      <figcaption className="mt-3 font-mono text-xs leading-relaxed text-muted">
        <span className="mr-2 tracking-widest text-accent">{kind.toUpperCase()}</span>
        {caption}
      </figcaption>

      <dialog
        ref={dlg}
        aria-label={alt}
        onClick={(e) => e.target === dlg.current && dlg.current?.close()}
        className="m-auto max-h-[92vh] max-w-[96vw] overflow-auto rounded-xl border border-rule bg-ink p-0 backdrop:bg-black/80"
      >
        <form method="dialog" className="sticky top-0 z-10 flex justify-end bg-ink/90 p-2">
          <button
            autoFocus
            className="rounded-full border border-rule px-4 py-1 font-mono text-xs tracking-widest text-paper hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            CLOSE
          </button>
        </form>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={w} height={h} className="block h-auto w-[min(94vw,1500px)]" />
      </dialog>
    </figure>
  );
}
