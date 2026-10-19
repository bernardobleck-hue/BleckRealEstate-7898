import { ArrowUpRight, MapPin, Search } from "lucide-react";
import { useReveal } from "../../hooks/use-reveal";
import { useT } from "../../lib/i18n";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * The buyer's-agent / sourcing explainer. Structured as discrete, quotable
 * statements: two operating modes, the three on-request regions, and a plain
 * definition of what "off-market" means in the Portuguese market.
 */
export function Sourcing() {
  const t = useT();
  const head = useReveal();
  const modes = useReveal();
  const off = useReveal();

  return (
    <section id="sourcing" className="bg-white py-20 md:py-28">
      <div className="wrap">
        <div ref={head.ref} className={`${head.className} max-w-[820px]`}>
          <p className="eyebrow">{t.sourcing.eyebrow}</p>
          <h2 className="mt-5 text-[clamp(28px,3.5vw,48px)] text-balance">{t.sourcing.title}</h2>
          <p className="mt-6 max-w-[640px] text-[15.5px] leading-[1.78] text-muted">{t.sourcing.sub}</p>
        </div>

        <div ref={modes.ref} className={`${modes.className} mt-14 grid gap-5 lg:grid-cols-2`}>
          <div className="border border-line bg-cream p-7 md:p-9">
            <div className="flex items-center gap-2.5">
              <MapPin size={15} className="text-gold" strokeWidth={2} />
              <span className="text-[10px] font-bold tracking-[0.2em] text-muted uppercase">
                {t.sourcing.modeALabel}
              </span>
            </div>
            <h3 className="mt-4 font-display text-[26px] leading-[1.2] tracking-[-0.02em] text-ink md:text-[30px]">
              {t.sourcing.modeATitle}
            </h3>
            <p className="mt-4 text-[14.5px] leading-[1.78] text-muted">{t.sourcing.modeAText}</p>
          </div>

          <div className="border border-line bg-ink p-7 md:p-9">
            <div className="flex items-center gap-2.5">
              <Search size={15} className="text-gold" strokeWidth={2} />
              <span className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">
                {t.sourcing.modeBLabel}
              </span>
            </div>
            <h3 className="mt-4 font-display text-[26px] leading-[1.2] tracking-[-0.02em] text-white md:text-[30px]">
              {t.sourcing.modeBTitle}
            </h3>
            <p className="mt-4 text-[14.5px] leading-[1.78] text-white/60">{t.sourcing.modeBText}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-px border border-line bg-line md:grid-cols-3">
          {t.sourcing.regions.map((region) => (
            <div key={region.name} className="bg-white p-7">
              <h4 className="font-display text-[21px] leading-none tracking-[-0.02em] text-ink">{region.name}</h4>
              <p className="mt-3.5 text-[13.5px] leading-[1.75] text-muted">{region.text}</p>
            </div>
          ))}
        </div>

        <div
          ref={off.ref}
          className={`${off.className} mt-5 grid gap-8 border border-line bg-cream p-7 md:p-10 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-14`}
        >
          <div>
            <h3 className="font-display text-[24px] leading-[1.25] tracking-[-0.02em] text-ink md:text-[29px]">
              {t.sourcing.offTitle}
            </h3>
            <p className="mt-4 max-w-[560px] text-[14.5px] leading-[1.78] text-muted">{t.sourcing.offText}</p>
          </div>
          <div className="border-l-2 border-gold pl-6">
            <p className="font-display text-[19px] leading-[1.5] tracking-[-0.01em] text-ink md:text-[21px]">
              {t.sourcing.offNote}
            </p>
            <button
              type="button"
              onClick={() => scrollToId("start")}
              className="btn btn-outline-dark mt-7"
            >
              {t.sourcing.cta}
              <ArrowUpRight size={15} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
