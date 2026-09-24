const STEPS = [
  { k: "CONSUMER PFM", d: "Understand personal finances" },
  { k: "FINANCIAL DATA", d: "Connected accounts + financial context" },
  { k: "MARKETPLACE", d: "Access third-party financial services" },
  { k: "WHITE-LABEL", d: "Financial institutions deliver the experience to their customers" },
];

export default function Evolution() {
  return (
    <ol className="grid gap-6 md:grid-cols-4 md:gap-8">
      {STEPS.map((s) => (
        <li
          key={s.k}
          className="relative border-t border-rule pt-4 md:after:absolute md:after:-right-6 md:after:top-3 md:after:font-mono md:after:text-sm md:after:text-muted md:after:content-['→'] md:last:after:content-none"
        >
          <p className="font-mono text-xs tracking-widest text-accent">{s.k}</p>
          <p className="mt-2 text-sm leading-relaxed text-paper/85">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}
