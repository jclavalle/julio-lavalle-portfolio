import Link from "next/link";

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 max-w-prose font-mono text-xs leading-relaxed text-muted">{children}</p>
  );
}

export function Owned({ items }: { items: { k: string; d: string }[] }) {
  return (
    <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
      {items.map((i) => (
        <div key={i.k} className="border-t border-rule pt-4">
          <p className="font-mono text-xs tracking-widest text-accent">{i.k}</p>
          <p className="mt-2 max-w-prose leading-relaxed text-paper/85">{i.d}</p>
        </div>
      ))}
    </div>
  );
}

export function Outcomes({ items }: { items: { value: string; label: string; note?: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
      {items.map((i) => (
        <div key={i.label} className="border-t border-rule pt-4">
          <p className="font-display text-4xl font-medium text-paper md:text-5xl">{i.value}</p>
          <p className="mt-2 font-mono text-xs tracking-widest text-paper/90">
            {i.label.toUpperCase()}
          </p>
          {i.note && <p className="mt-2 text-sm leading-relaxed text-muted">{i.note}</p>}
        </div>
      ))}
    </div>
  );
}

export function Bridge() {
  return (
    <div className="mt-8 grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
      <div className="border-t border-rule pt-4">
        <p className="font-mono text-xs tracking-widest text-paper">MIBOLSILLO</p>
        <p className="mt-2 text-sm text-paper/80">Consumer financial experience</p>
      </div>
      <span aria-hidden="true" className="hidden font-mono text-muted md:block">
        →
      </span>
      <Link
        href="/projects/conecta-pro"
        className="group block border-t border-accent pt-4 transition-colors hover:border-paper"
      >
        <p className="font-mono text-xs tracking-widest text-accent group-hover:text-paper">
          CONECTA PRO
        </p>
        <p className="mt-2 text-sm text-paper/80">Institutional financial-journey platform</p>
      </Link>
    </div>
  );
}

export function Lessons({ items }: { items: { k: string; d: string }[] }) {
  return (
    <div className="space-y-8">
      {items.map((i) => (
        <div key={i.k} className="grid gap-2 border-t border-rule pt-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-10">
          <p className="font-mono text-xs leading-relaxed tracking-widest text-paper">{i.k}</p>
          <p className="max-w-prose leading-relaxed text-paper/85">{i.d}</p>
        </div>
      ))}
    </div>
  );
}
