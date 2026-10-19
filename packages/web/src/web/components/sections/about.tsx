import { ArrowRight, Check } from "lucide-react";
import { useReveal } from "../../hooks/use-reveal";
import { useT } from "../../lib/i18n";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function About() {
  const t = useT();
  const media = useReveal();
  const copy = useReveal();

  return (
    <section id="about" className="bg-white py-20 md:py-28">
      <div className="wrap">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div ref={media.ref} className={`${media.className} relative`}>
            <img
              src="/images/bernardo-diana.webp"
              alt="Bernardo and Diana Bleck, BleckTeam real estate consultants in Portugal"
              width={1024}
              height={1536}
              loading="lazy"
              decoding="async"
              className="relative z-10 w-full object-cover"
            />
            <span aria-hidden className="absolute -bottom-5 -left-5 -z-0 h-32 w-32 border border-gold/45" />
            <span aria-hidden className="absolute -top-5 -right-5 -z-0 h-24 w-24 bg-cream" />
          </div>

          <div ref={copy.ref} className={copy.className}>
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2 className="mt-5 text-[clamp(31px,3.7vw,50px)]">{t.about.title}</h2>
            <p className="mt-2 text-[11px] font-bold tracking-[0.2em] text-muted uppercase">{t.about.sub}</p>

            <p className="mt-7 text-[15.5px] leading-[1.78] text-muted">{t.about.p1}</p>
            <p className="mt-4 text-[15.5px] leading-[1.78] text-muted">{t.about.p2}</p>
            <p className="mt-4 text-[15.5px] leading-[1.78] text-muted">{t.about.p3}</p>

            <ul className="mt-8 space-y-3.5 border-t border-line pt-8">
              {t.about.points.map((point) => (
                <li key={point} className="flex gap-3 text-[14.5px] leading-[1.6] text-ink">
                  <Check size={15} className="mt-[4px] shrink-0 text-gold" strokeWidth={2.6} />
                  {point}
                </li>
              ))}
            </ul>

            <button type="button" onClick={() => scrollToId("start")} className="btn btn-gold mt-9">
              {t.about.cta}
              <ArrowRight size={15} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
