import { ERAS, RINGS, SIGNALS, type Signal, type Status } from "@/content/methodology";

const SVG_NS = "http://www.w3.org/2000/svg";
const CX = 400;
const CY = 400;
const R0 = 30;
const STEP = 26;
const DEFAULT_SELECTED = 18;

// [label, css color for the card dot, color for the map dot]
const DURABILITY: Record<Status, [string, string, string]> = {
  e: ["Established", "var(--o-deep)", "#5FA88C"],
  c: ["Converging", "var(--o-mid)", "#4A9377"],
  m: ["Emerging", "var(--o-pale)", "#2F6E58"],
};

type Placed = Signal & {
  t0: number;
  rr: number;
  th: number;
  x: number;
  y: number;
  el: SVGCircleElement;
};

const rad = (deg: number) => (deg * Math.PI) / 180;
const point = (r: number, t: number): [number, number] => [
  CX + r * Math.sin(rad(t)),
  CY - r * Math.cos(rad(t)),
];
const rmid = (k: number) => R0 + (k - 0.5) * STEP;

function arc(r: number, t1: number, t2: number, sweep: 0 | 1): string {
  const [a, b] = point(r, t1);
  const [c, d] = point(r, t2);
  const large = Math.abs(t2 - t1) > 180 ? 1 : 0;
  return `M${a.toFixed(2)} ${b.toFixed(2)} A${r} ${r} 0 ${large} ${sweep} ${c.toFixed(2)} ${d.toFixed(2)}`;
}

function el<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number>,
  parent?: Element
): SVGElementTagNameMap[K] {
  const node = document.createElementNS(SVG_NS, tag);
  for (const key in attrs) node.setAttribute(key, String(attrs[key]));
  if (parent) parent.appendChild(node);
  return node;
}

/**
 * Builds the radial map inside `root` (the methodology section) and wires up
 * hover, focus and click. Returns a cleanup function.
 */
export function initMethodology(root: HTMLElement): () => void {
  const q = <T extends Element>(sel: string): T => {
    const found = root.querySelector<T>(sel);
    if (!found) throw new Error(`Methodology markup is missing ${sel}`);
    return found;
  };

  const svg = q<SVGSVGElement>("#map");
  const band = q<SVGGElement>("#band");
  const hls = q<SVGGElement>("#hls");
  const grid = q<SVGGElement>("#grid");
  const labels = q<SVGGElement>("#labels");
  const dotsG = q<SVGGElement>("#dots");
  const selRing = q<SVGCircleElement>("#selring");
  const legend = q<HTMLOListElement>("#legend");

  const defs = el("defs", {});
  svg.insertBefore(defs, svg.children[1] ?? null);

  el("circle", { cx: CX, cy: CY, r: 256, fill: "none", stroke: "var(--band)", "stroke-width": 24 }, band);
  ERAS.forEach((e, i) => {
    el("path", { id: `era${i}`, d: arc(252, e.e1 + 2, e.e2 - 2, 1), fill: "none" }, defs);
    const text = el("text", { class: "band-t" }, band);
    const tp = el("textPath", { href: `#era${i}`, startOffset: "50%", "text-anchor": "middle" }, text);
    tp.textContent = e.label;
  });

  [-145, -92.5, -12.5, 79, 145].forEach((t) => {
    const [a, b] = point(244, t);
    const [c, d] = point(268, t);
    el("line", { x1: a, y1: b, x2: c, y2: d, stroke: "var(--ink)", "stroke-width": 1.2 }, band);
    const [e, f] = point(R0, t);
    const [g, h] = point(R0 + 8 * STEP, t);
    el("line", { x1: e, y1: f, x2: g, y2: h, stroke: "var(--ink-2)", "stroke-width": 0.7, "stroke-dasharray": "2 3" }, grid);
  });

  const hlEls: SVGCircleElement[] = [];
  for (let k = 1; k <= 8; k++) {
    hlEls[k] = el("circle", { class: "hl", cx: CX, cy: CY, r: rmid(k), "stroke-width": STEP }, hls);
    el("circle", { cx: CX, cy: CY, r: R0 + k * STEP, fill: "none", stroke: "var(--ink)", "stroke-width": 0.8 }, grid);
    el("path", { id: `rl${k}`, d: arc(rmid(k) + 3.4, 262, 98, 0), fill: "none" }, defs);
    const text = el("text", { class: "ring-t" }, labels);
    const tp = el("textPath", { href: `#rl${k}`, startOffset: "50%", "text-anchor": "middle" }, text);
    tp.textContent = RINGS[k - 1].label;
  }
  el("circle", { cx: CX, cy: CY, r: R0, fill: "var(--ink)" }, grid);
  const center = el(
    "text",
    {
      x: CX,
      y: CY + 3.5,
      "text-anchor": "middle",
      fill: "var(--on-ink)",
      "font-family": "IBM Plex Mono, monospace",
      "font-size": 9.5,
      "letter-spacing": ".08em",
    },
    grid
  );
  center.textContent = "OUTCOME";

  // Place signals: angle by era, radius by layer, then nudge apart.
  const placed: Placed[] = SIGNALS.map((s) => ({ ...s, t0: 0, rr: 0, th: 0, x: 0, y: 0, el: null as unknown as SVGCircleElement }));

  ERAS.forEach((e) => {
    const group = placed
      .filter((x) => x.date >= e.lo && x.date < e.hi)
      .sort((p, q2) => p.date - q2.date || p.ring - q2.ring);
    group.forEach((x, i) => {
      x.t0 = e.a + ((i + 0.5) / group.length) * (e.b - e.a);
    });
  });

  const offsets = [0, -6, 6];
  for (let k = 1; k <= 8; k++) {
    placed
      .filter((x) => x.ring === k)
      .sort((p, q2) => p.t0 - q2.t0)
      .forEach((x, i) => {
        x.rr = rmid(k) + offsets[i % 3];
        x.th = x.t0;
      });
  }

  for (let it = 0; it < 80; it++) {
    for (let k = 1; k <= 8; k++) {
      const g = placed.filter((x) => x.ring === k);
      for (let i = 0; i < g.length; i++) {
        for (let j = i + 1; j < g.length; j++) {
          const A = g[i];
          const B = g[j];
          const [ax, ay] = point(A.rr, A.th);
          const [bx, by] = point(B.rr, B.th);
          const dist = Math.hypot(ax - bx, ay - by);
          if (dist < 15) {
            const r = (A.rr + B.rr) / 2;
            const push = (((15 - dist) / 2) / r) * (180 / Math.PI) + 0.2;
            if (A.th <= B.th) {
              A.th -= push;
              B.th += push;
            } else {
              A.th += push;
              B.th -= push;
            }
            A.th = Math.max(-142, Math.min(142, A.th));
            B.th = Math.max(-142, Math.min(142, B.th));
          }
        }
      }
    }
  }

  let current = DEFAULT_SELECTED;

  function renderSource(s: Signal["source"]) {
    const box = q<HTMLDivElement>("#s-src");
    box.textContent = "";
    const k = document.createElement("span");
    k.className = "src-k";
    k.append("Source · ");
    const b = document.createElement("b");
    b.textContent = s.type;
    k.append(b);
    box.append(k);
    const c = document.createElement("span");
    c.textContent = s.cite;
    box.append(c);
    box.append(document.createElement("br"));
    if (s.url) {
      const a = document.createElement("a");
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.title = s.url;
      let t = s.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
      if (t.length > 64) t = `${t.slice(0, 61)}…`;
      a.textContent = t;
      box.append(a);
    } else {
      const m = document.createElement("span");
      m.className = "pend";
      m.textContent = "Link to be added";
      box.append(m);
    }
  }

  function select(i: number) {
    current = i;
    const x = placed[i];
    q<HTMLElement>("#s-name").textContent = x.name;
    q<HTMLElement>("#s-ring").textContent = `${String(x.ring).padStart(2, "0")} · ${RINGS[x.ring - 1].label}`;
    q<HTMLElement>("#s-dot").style.background = DURABILITY[x.status][1];
    q<HTMLElement>("#s-dur").textContent = DURABILITY[x.status][0];
    q<HTMLElement>("#s-when").textContent = x.when;
    q<HTMLElement>("#s-note").textContent = x.note;
    renderSource(x.source);
    selRing.setAttribute("cx", String(x.x));
    selRing.setAttribute("cy", String(x.y));
    legend.querySelectorAll("li").forEach((li) => {
      li.setAttribute("aria-current", Number(li.dataset.ring) === x.ring ? "true" : "false");
    });
  }

  placed.forEach((x, i) => {
    const [px, py] = point(x.rr, x.th);
    x.x = px;
    x.y = py;
    const c = el(
      "circle",
      {
        class: "dot",
        cx: px.toFixed(2),
        cy: py.toFixed(2),
        r: 5.5,
        fill: DURABILITY[x.status][2],
        tabindex: 0,
        role: "button",
        "data-i": i,
        "aria-label": `${x.name}. ${DURABILITY[x.status][0]}, ${x.when}.`,
      },
      dotsG
    );
    x.el = c;
    c.addEventListener("pointerenter", () => select(i));
    c.addEventListener("click", () => select(i));
    c.addEventListener("focus", () => select(i));
  });

  function setHighlight(k: number | null) {
    hlEls.forEach((h, i) => h && h.classList.toggle("on", i === k));
    legend.querySelectorAll("li").forEach((li) => li.classList.toggle("on", Number(li.dataset.ring) === k));
    placed.forEach((x) => x.el.classList.toggle("dim", k !== null && x.ring !== k));
  }

  RINGS.forEach((r, idx) => {
    const k = idx + 1;
    const li = document.createElement("li");
    li.tabIndex = 0;
    li.dataset.ring = String(k);
    li.innerHTML = `<span class="idx">${String(k).padStart(2, "0")}</span><span class="nm">${r.name}</span><span class="ds">${r.desc}</span>`;
    li.addEventListener("pointerenter", () => setHighlight(k));
    li.addEventListener("pointerleave", () => setHighlight(null));
    li.addEventListener("focus", () => setHighlight(k));
    li.addEventListener("blur", () => setHighlight(null));
    legend.appendChild(li);
  });

  select(current);

  return () => {
    [band, hls, grid, labels, dotsG, legend].forEach((n) => n.replaceChildren());
    defs.remove();
  };
}
