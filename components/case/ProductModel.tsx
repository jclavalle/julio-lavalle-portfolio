const STEPS = [
  { k: "CONNECT", d: "Financial accounts + user inputs + financial context" },
  { k: "UNDERSTAND", d: "Build a richer financial profile" },
  { k: "PERSONALIZE", d: "Translate financial context into relevant journeys" },
  { k: "MATCH", d: "Identify relevant financial products" },
  { k: "ACCESS", d: "Connect users with third-party financial providers" },
  { k: "LEARN", d: "New behavior and financial data improve future context" },
];

const INPUTS = ["Credit data", "User-provided data", "Bank-account data", "Open Finance data"];

const CX = 300;
const CY = 232;
const R = 140;
const rad = (deg: number) => (deg * Math.PI) / 180;
const at = (deg: number, r = R): [number, number] => [
  CX + r * Math.cos(rad(deg)),
  CY + r * Math.sin(rad(deg)),
];

export default function ProductModel() {
  const nodes = STEPS.map((s, i) => {
    const deg = -90 + i * 60;
    const [x, y] = at(deg);
    const [lx, ly] = at(deg, R + 24);
    const c = Math.cos(rad(deg));
    const anchor = c > 0.3 ? "start" : c < -0.3 ? "end" : "middle";
    return { ...s, i, deg, x, y, lx, ly, anchor };
  });

  const arcs = nodes.map((n) => {
    const [x1, y1] = at(n.deg + 11);
    const [x2, y2] = at(n.deg + 49);
    return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${R} ${R} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  });

  return (
    <div className="mb-8 grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <svg
        viewBox="0 0 600 470"
        className="w-full"
        role="img"
        aria-label="Product model loop: connect, understand, personalize, match, access, learn, then back to connect"
      >
        <defs>
          <marker id="pm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M1 1.5 8 5 1 8.5" fill="none" stroke="#5FA88C" strokeWidth="1.3" />
          </marker>
        </defs>

        {arcs.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#5FA88C" strokeWidth="1.2" markerEnd="url(#pm-arrow)" />
        ))}

        <text x={CX} y={CY - 2} textAnchor="middle" fontSize="11" fill="#8B93A1" fontFamily="var(--font-mono), monospace">
          continuous loop
        </text>
        <text x={CX} y={CY + 14} textAnchor="middle" fontSize="11" fill="#8B93A1" fontFamily="var(--font-mono), monospace">
          ↺
        </text>

        {nodes.map((n) => (
          <g key={n.k}>
            <circle cx={n.x} cy={n.y} r="8" fill="#10141C" stroke="#EDE9DE" strokeWidth="1.2" />
            <text
              x={n.lx}
              y={n.ly + (n.i === 0 ? -4 : n.i === 3 ? 10 : 4)}
              textAnchor={n.anchor as "start" | "middle" | "end"}
              fontSize="12"
              letterSpacing="1.4"
              fill="#EDE9DE"
              fontFamily="var(--font-mono), monospace"
            >
              {String(n.i + 1).padStart(2, "0")} {n.k}
            </text>
          </g>
        ))}

        <g fontFamily="var(--font-mono), monospace" fontSize="11" fill="#8B93A1">
          {INPUTS.map((t, i) => (
            <text key={t} x="6" y={40 + i * 22}>
              {t}
            </text>
          ))}
          <path d="M156 30v88" stroke="#2A303C" strokeWidth="1" fill="none" />
          <path d={`M156 74H${CX - 14}`} stroke="#2A303C" strokeWidth="1" fill="none" strokeDasharray="3 3" />
        </g>
      </svg>

      <ol className="space-y-4">
        {STEPS.map((s, i) => (
          <li key={s.k} className="grid grid-cols-[2rem_1fr] border-t border-rule pt-3">
            <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="font-mono text-xs tracking-widest text-paper">{s.k}</p>
              <p className="mt-1 text-sm leading-relaxed text-paper/80">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
