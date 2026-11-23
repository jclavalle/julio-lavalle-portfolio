import Image from "next/image";

/** Hero frame for the Caja Clara case: the "Plan nuevo" shortfall view of the prototype. */
export default function CajaClaraHero() {
  return (
    <figure>
      <div className="overflow-hidden rounded-xl border border-rule bg-surface">
        <div className="flex items-center gap-1.5 border-b border-rule px-4 py-2.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-paper/20" />
          <span className="h-2 w-2 rounded-full bg-paper/20" />
          <span className="h-2 w-2 rounded-full bg-paper/20" />
        </div>
        <Image
          src="/caja-clara/hero-plan-nuevo.jpg"
          alt="Caja Clara on Plan nuevo: a cash-shortfall banner, weekly route contribution of R$2,250, a maximum shortfall of R$3,500 and closing cash of R$11,500."
          width={705}
          height={408}
          sizes="(max-width: 1024px) 92vw, 440px"
          priority
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 font-mono text-xs text-muted">
        Plan nuevo: fewer stops, longer routes, and a cash gap on Nov 11
      </figcaption>
    </figure>
  );
}
