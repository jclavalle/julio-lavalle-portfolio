type Item = { label: string; value: string };

/**
 * The one deliberate data-forward moment on the homepage: a short list of
 * verified numbers, styled like a ledger line rather than a stat-card grid.
 */
export default function LedgerStrip({ items }: { items: Item[] }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-baseline justify-between gap-4 font-mono text-sm"
        >
          <dt className="text-muted">{item.label}</dt>
          <dd className="tabular-nums text-lg text-paper">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
