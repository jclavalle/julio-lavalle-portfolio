const ROWS = [
  {
    k: "Mejorando mi casa",
    d: "Home-improvement planning and financing.",
    institution: "Financiera Confianza (Peru)",
  },
  {
    k: "Construyendo mi casa ideal",
    d: "Guided construction planning and credit application.",
    institution: "Acreimex (Mexico)",
  },
  {
    k: "VRGO",
    d: "Financial guidance and connections to financial services.",
    institution: "Fintech (Guatemala)",
  },
];

export default function UseCases() {
  return (
    <ul>
      {ROWS.map((r) => (
        <li
          key={r.k}
          className="grid gap-2 border-t border-rule py-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,0.8fr)] md:items-baseline md:gap-8"
        >
          <p className="font-display text-lg font-medium text-paper">{r.k}</p>
          <p className="leading-relaxed text-paper/85">{r.d}</p>
          <p className="font-mono text-xs text-muted md:text-right">{r.institution}</p>
        </li>
      ))}
    </ul>
  );
}
