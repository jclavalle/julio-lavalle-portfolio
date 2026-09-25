import Screen from "./Screen";
import { CONECTA_SHOTS, PHONE_FIT } from "./conectaShots";

export default function ConectaHeroPhone() {
  return (
    <div className="mx-auto w-[170px] sm:w-[190px] lg:w-[210px]">
      <Screen
        shot={CONECTA_SHOTS.hero}
        fit={PHONE_FIT}
        sizes="(max-width: 1024px) 190px, 210px"
        priority
        blend={false}
      />
    </div>
  );
}
