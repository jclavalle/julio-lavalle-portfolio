"use client";

import { useEffect } from "react";

// Hash links point at homepage sections; "/cv" is its own route.
const LINKS = [
  { href: "#method", label: "Method" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "/cv", label: "CV" },
  { href: "#contact", label: "Contact" },
];

// `current` is set on pages other than the homepage: section links then point
// back to "/#…" and the link matching `current` is marked active.
export default function SectionNav({ current }: { current?: string }) {
  const href = (h: string) => (current && h.startsWith("#") ? `/${h}` : h);

  useEffect(() => {
    if (current) return;
    const anchors = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".rail a, .topnav a")
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          anchors.forEach((a) =>
            a.classList.toggle("on", a.getAttribute("href") === `#${entry.target.id}`)
          );
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    LINKS.filter((l) => l.href.startsWith("#")).forEach((l) => {
      const section = document.querySelector(l.href);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [current]);

  const links = LINKS.map((l) => (
    <a key={l.href} href={href(l.href)} className={l.href === current ? "on" : undefined}>
      {l.label}
    </a>
  ));

  return (
    <>
      <nav className="topnav" aria-label="Sections">
        {links}
      </nav>
      <nav className="rail" aria-label="Sections">
        {links}
      </nav>
    </>
  );
}
