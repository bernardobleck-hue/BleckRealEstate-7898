import { ArrowRight, MessageCircle } from "lucide-react";
import { useReveal } from "../../hooks/use-reveal";
import { useT } from "../../lib/i18n";
import { CONTACT } from "../../lib/content";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function FinalCta() {
  const t = useT();
  const reveal = useReveal();

  return (
    <section className="relative overflow-hidden">
      <img
        src="/images/facade.webp"
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span aria-hidden className="absolute inset-0 bg-ink/82" />
      <span aria-hidden className="grain absolute inset-0" />

      <div className="wrap relative py-24 text-center text-white md:py-32">
        <div ref={reveal.ref} className={`${reveal.className} mx-auto max-w-[720px]`}>
          <p className="eyebrow">{t.finalCta.eyebrow}</p>
          <h2 className="mt-5 text-[clamp(33px,4.4vw,60px)] text-balance">{t.finalCta.title}</h2>
          <p className="mx-auto mt-6 max-w-[520px] text-[15.5px] leading-[1.75] text-white/70">{t.finalCta.sub}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={() => scrollToId("start")} className="btn btn-gold w-full sm:w-auto">
              {t.finalCta.primary}
              <ArrowRight size={15} strokeWidth={2.2} />
            </button>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-light w-full sm:w-auto"
            >
              <MessageCircle size={15} strokeWidth={2.2} />
              {t.finalCta.secondary}
            </a>
          </div>

          <p className="mt-8 text-[12.5px] tracking-[0.06em] text-white/45">
            {CONTACT.phoneDisplay} · {CONTACT.email}
          </p>
        </div>
      </div>
    </section>
  );
}
