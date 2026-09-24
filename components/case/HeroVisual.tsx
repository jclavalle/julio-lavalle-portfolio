import Screen from "./Screen";
import { SHOTS } from "./shots";

export default function HeroVisual() {
  return (
    <figure className="relative mx-auto mb-10 w-[180px] sm:w-[210px] lg:mb-0 lg:w-[232px]">
      <Screen shot={SHOTS.hero} sizes="(max-width: 640px) 180px, 232px" priority blend={false} />
      <figcaption className="mt-4 text-center font-mono text-xs text-muted lg:absolute lg:inset-x-0 lg:top-full">
        MiBolsillo financial-advisor experience
      </figcaption>
    </figure>
  );
}
