import Screen from "./Screen";
import { SHOTS } from "./shots";

const STEPS = [
  { n: "01", verb: "Understand", title: "Personal financial management", shot: SHOTS.pfm },
  { n: "02", verb: "Discover", title: "Financial-services marketplace", shot: SHOTS.marketplace },
  { n: "03", verb: "Connect", title: "Open Finance data", shot: SHOTS.bank },
];

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 12"
      className="hidden h-3 w-12 shrink-0 self-center md:block"
      fill="none"
      stroke="#8B93A1"
      strokeWidth="1"
    >
      <path d="M0 6h46M41 1.5 46 6l-5 4.5" />
    </svg>
  );
}

export default function Journey() {
  return (
    <figure className="mb-8">
      <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-4">
        {STEPS.map((s, i) => (
          <div key={s.n} className="contents">
            <div className="mx-auto w-full max-w-[250px] md:flex-1">
              <Screen shot={s.shot} sizes="(max-width: 768px) 70vw, 320px" />
              <p className="mt-5 font-mono text-xs tracking-widest text-accent">
                {s.n} — {s.verb.toUpperCase()}
              </p>
              <p className="mt-1 font-display text-lg font-medium text-paper">{s.title}</p>
            </div>
            {i < STEPS.length - 1 && <Arrow />}
          </div>
        ))}
      </div>
      <figcaption className="mt-10 font-mono text-xs text-muted">
        Product capabilities illustrated through the MiBolsillo white-label experience.
      </figcaption>
    </figure>
  );
}
