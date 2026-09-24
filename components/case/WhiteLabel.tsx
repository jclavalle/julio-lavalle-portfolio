import Screen from "./Screen";
import { SHOTS } from "./shots";

const ITEMS = [
  { shot: SHOTS.health, caption: "Financial health and personalized offers", width: "max-w-[250px]", img: "md:max-w-[250px]" },
  { shot: SHOTS.loan, caption: "Credit journey connected to Open Finance", width: "max-w-[300px]", img: "md:max-w-[320px]" },
  { shot: SHOTS.success, caption: "Better financial services offers", width: "max-w-[250px]", img: "md:max-w-[250px]" },
];

export default function WhiteLabel() {
  return (
    <div className="mt-10 grid gap-12 md:grid-cols-[1fr_1.2fr_1fr] md:items-center md:gap-6">
      {ITEMS.map((i) => (
        <figure key={i.shot.src} className={`mx-auto w-full ${i.width} md:max-w-none`}>
          <Screen shot={i.shot} sizes="(max-width: 768px) 70vw, 360px" className={`md:mx-auto ${i.img}`} />
          <figcaption className="mt-4 text-center font-mono text-xs leading-relaxed text-muted">
            {i.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
