"use client";

import { useEffect } from "react";

const LINKS = [
  { href: "#method", label: "Method" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function SectionNav() {
  useEffect(() => {
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
    LINKS.forEach((l) => {
      const section = document.querySelector(l.href);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav className="topnav" aria-label="Sections">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <nav className="rail" aria-label="Sections">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
    </>
  );
}
