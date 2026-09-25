/** Numbered workflow. Arrows only show when all steps fit on one row. */
export function Flow({ steps }: { steps: string[] }) {
  const cols = steps.length >= 6 ? "md:grid-cols-3 lg:grid-cols-6" : "md:grid-cols-5";
  return (
    <ol className={`grid grid-cols-2 gap-x-6 gap-y-6 ${cols}`}>
      {steps.map((s, i) => (
        <li
          key={s}
          className="relative border-t border-rule pt-4 lg:after:absolute lg:after:-right-5 lg:after:top-3.5 lg:after:font-mono lg:after:text-sm lg:after:text-muted lg:after:content-['→'] lg:last:after:content-none"
        >
          <p className="font-mono text-xs tracking-widest text-accent">{String(i + 1).padStart(2, "0")}</p>
          <p className="mt-2 text-sm leading-snug text-paper/90">{s}</p>
        </li>
      ))}
    </ol>
  );
}

const HERO_STEPS = [
  { k: "Observe", d: "Trial activity" },
  { k: "Investigate", d: "Session and error evidence" },
  { k: "Fix", d: "Engineering story" },
  { k: "Verify", d: "E2E and CI checks" },
];

export function CladeHeroFlow() {
  return (
    <figure className="rounded-xl border border-rule bg-surface/40 p-5 md:p-6">
      <figcaption className="mb-6 font-mono text-[11px] tracking-widest text-muted">
        CUSTOMER EXPERIENCE <span className="text-accent">→</span> PRODUCT QUALITY
      </figcaption>
      <ol className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 sm:gap-x-4">
        {HERO_STEPS.map((s, i) => (
          <li key={s.k} className="relative">
            <div className="mb-3 flex items-center" aria-hidden="true">
              <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span className={`ml-1 h-px flex-1 bg-accent/40 ${i === HERO_STEPS.length - 1 ? "sm:invisible" : ""}`} />
            </div>
            <p className="font-display text-base leading-none text-paper">{s.k}</p>
            <p className="mt-2 text-xs leading-snug text-muted">{s.d}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function Principles({ items }: { items: string[] }) {
  return (
    <div className="mt-10 space-y-6">
      {items.map((t) => (
        <p
          key={t}
          className="max-w-2xl border-l-2 border-accent pl-5 font-display text-xl leading-snug text-paper md:text-2xl"
        >
          {t}
        </p>
      ))}
    </div>
  );
}

export function Callout({ value, label }: { value: string; label: string }) {
  return (
    <div className="my-6 inline-flex flex-wrap items-baseline gap-x-4 gap-y-1 border-l-2 border-accent pl-4">
      <span className="font-display text-2xl text-paper md:text-3xl">{value}</span>
      <span className="font-mono text-xs tracking-widest text-muted">{label.toUpperCase()}</span>
    </div>
  );
}
