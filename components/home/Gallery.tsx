"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type GalleryItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  inProgress: boolean;
  image?: string;
  imageAlt?: string;
  contain?: boolean;
};

const GAP = 28;

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(1);

  const step = () => {
    const first = track.current?.children[0] as HTMLElement | undefined;
    return (first?.getBoundingClientRect().width ?? 380) + GAP;
  };

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setIndex(Math.min(items.length, Math.round(el.scrollLeft / step()) + 1));
  }, [items.length]);

  useEffect(() => {
    update();
  }, [update]);

  const scrollBy = (dir: 1 | -1) =>
    track.current?.scrollBy({ left: dir * step(), behavior: "smooth" });

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <div className="g-head">
        <h2 className="h2">Selected work</h2>
        <div className="g-ctrl">
          <span>
            {pad(index)} / {pad(items.length)}
          </span>
          <button type="button" aria-label="Previous project" onClick={() => scrollBy(-1)}>
            &larr;
          </button>
          <button type="button" aria-label="Next project" onClick={() => scrollBy(1)}>
            &rarr;
          </button>
        </div>
      </div>
      <div className="g-track" ref={track} onScroll={update}>
        {items.map((item) => (
          <article className="pcard" key={item.slug}>
            <Link href={`/projects/${item.slug}`} className="plink">
              <div className="pvis">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.imageAlt ?? ""}
                    fill
                    sizes="(max-width: 480px) 82vw, 380px"
                    className={item.contain ? "object-contain" : "object-cover"}
                    style={item.contain ? undefined : { objectPosition: "85% 50%" }}
                  />
                ) : (
                  "[Project visual — TBD]"
                )}
              </div>
              <div className="pmeta">
                <span className={item.inProgress ? "tag wip" : "tag"}>{item.tag}</span>
                <span className="pdate">{item.date}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
