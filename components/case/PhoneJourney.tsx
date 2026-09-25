import Screen from "./Screen";
import { CONECTA_SHOTS, PHONE_FIT } from "./conectaShots";

const STEPS = [
  { n: "01", label: "DEFINE", caption: "Select the improvements needed.", shot: CONECTA_SHOTS.define },
  { n: "02", label: "MEASURE", caption: "Review the project scope and required work.", shot: CONECTA_SHOTS.measure },
  { n: "03", label: "BUDGET", caption: "Review the estimated project budget.", shot: CONECTA_SHOTS.budget },
  { n: "04", label: "APPLICATION", caption: "Follow the application through institutional review.", shot: CONECTA_SHOTS.application },
];

export default function PhoneJourney() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-6">
      {STEPS.map((s) => (
        <figure key={s.n} className="mx-auto w-full max-w-[230px]">
          <a
            href={s.shot.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View full-size image: ${s.n} ${s.label}`}
            className="block"
          >
            <Screen
              shot={s.shot}
              fit={PHONE_FIT}
              sizes="(max-width: 640px) 70vw, 230px"
              blend={false}
            />
          </a>
          <figcaption className="mt-4">
            <p className="font-mono text-xs tracking-widest text-accent">
              {s.n} — {s.label}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-paper/85">{s.caption}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
