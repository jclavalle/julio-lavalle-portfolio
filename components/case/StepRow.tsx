export default function StepRow({ items }: { items: { k: string; d: string }[] }) {
  return (
    <ol className={`grid gap-6 md:gap-8 ${items.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
      {items.map((s) => (
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
