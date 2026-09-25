const INPUTS = [
  { k: "Construction intelligence", d: "Measurements, requirements and material quantities." },
  { k: "Local retail data", d: "Material prices and project cost inputs." },
  { k: "Credit information", d: "Third-party credit data and risk signals." },
  {
    k: "Financial institution",
    d: "Available products, internal business intelligence and risk criteria.",
  },
];

const OUTPUTS = [
  {
    k: "Preliminary assessment",
    d: "Conceptual states: Recommend · Consider · Do not recommend.",
  },
  { k: "Structured application", d: "Project, budget and applicant information in one request." },
  { k: "Financial institution review", d: "The lender keeps the final credit decision." },
];

function ArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 28"
      className={`mx-auto h-7 w-3 ${className}`}
      fill="none"
      stroke="#5FA88C"
      strokeOpacity="0.7"
      strokeWidth="1"
    >
      <path d="M6 0v26M1.5 21 6 26l4.5-5" />
    </svg>
  );
}

export default function PlatformDiagram() {
  return (
    <div className="mt-8">
      <div className="grid gap-3 md:grid-cols-4">
        {INPUTS.map((i) => (
          <div key={i.k} className="relative border border-rule p-4">
            <p className="font-mono text-xs tracking-widest text-accent">{i.k.toUpperCase()}</p>
            <p className="mt-2 text-sm leading-relaxed text-paper/85">{i.d}</p>
            <span
              aria-hidden="true"
              className="absolute -bottom-4 left-1/2 hidden h-4 w-px bg-accent/50 md:block"
            />
          </div>
        ))}
      </div>

      <div aria-hidden="true" className="relative hidden h-10 md:block">
        <span className="absolute left-[12.5%] right-[12.5%] top-0 h-px bg-accent/50" />
        <span className="absolute left-1/2 top-0 h-full w-px bg-accent/50" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 border-x-[4px] border-t-[6px] border-x-transparent border-t-accent/70" />
      </div>
      <ArrowDown className="my-1 md:hidden" />

      <div className="mx-auto max-w-md border border-accent p-5 text-center">
        <p className="font-mono text-xs tracking-widest text-accent">CONECTA PRO</p>
        <p className="mt-2 leading-relaxed text-paper">Project + budget + applicant information</p>
      </div>

      <ArrowDown className="my-1" />

      <ol className="grid gap-2 md:grid-cols-3 md:gap-8">
        {OUTPUTS.map((o, i) => (
          <li
            key={o.k}
            className="relative border-t border-rule pt-4 md:after:absolute md:after:-right-6 md:after:top-3 md:after:font-mono md:after:text-sm md:after:text-muted md:after:content-['→'] md:last:after:content-none"
          >
            <p className="font-mono text-xs tracking-widest text-paper">
              {String(i + 1).padStart(2, "0")} {o.k.toUpperCase()}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-paper/80">{o.d}</p>
          </li>
        ))}
      </ol>

      <p className="mt-6 font-mono text-xs leading-relaxed text-muted">
        Products and rules flow in from the institution; application information returns to it.
        Conceptual information flows, not a description of specific APIs or infrastructure.
      </p>

      <div className="mt-8 max-w-prose border-l-2 border-accent pl-4">
        <p className="font-mono text-xs tracking-widest text-accent">DECISION BOUNDARY</p>
        <p className="mt-2 leading-relaxed text-paper/90">
          Conecta assembled the information and supported a preliminary recommendation. The financial
          institution retained the final credit decision.
        </p>
      </div>
    </div>
  );
}
