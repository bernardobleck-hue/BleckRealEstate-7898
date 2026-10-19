import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Plus } from "lucide-react";
import { useReveal } from "../../hooks/use-reveal";
import { useT } from "../../lib/i18n";
import { CONTACT } from "../../lib/content";

/** Maps each FAQ item to the matching chapter anchor on /guide. */
const FAQ_CHAPTERS = ["next", "remote", "location", "location", "eligibility", "costs", "financing", "next"];

export function Faq() {
  const t = useT();
  const reveal = useReveal();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream py-20 md:py-28">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1fr] lg:gap-20">
          <div ref={reveal.ref} className={`${reveal.className} lg:sticky lg:top-32 lg:self-start`}>
            <p className="eyebrow">{t.faq.eyebrow}</p>
            <h2 className="mt-5 text-[clamp(29px,3.4vw,46px)] text-balance">{t.faq.title}</h2>
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="btn btn-outline-dark mt-8">
              {t.finalCta.secondary}
            </a>
          </div>

          <div className="border-t border-line">
            {t.faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={`font-display text-[18px] leading-[1.35] tracking-[-0.02em] transition-colors md:text-[21px] ${
                        isOpen ? "text-gold" : "text-ink"
                      }`}
                    >
                      {item.q}
                    </span>
                    <Plus
                      size={19}
                      strokeWidth={1.6}
                      className={`mt-1 shrink-0 transition-transform duration-400 ${
                        isOpen ? "rotate-45 text-gold" : "text-muted"
                      }`}
                    />
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-400 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[620px] text-[15px] leading-[1.78] text-muted">{item.a}</p>
                      {FAQ_CHAPTERS[i] ? (
                        <Link
                          href={`/guide#${FAQ_CHAPTERS[i]}`}
                          className="mt-3 inline-flex items-center gap-2 text-[13px] tracking-[0.02em] text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold"
                          tabIndex={isOpen ? 0 : -1}
                        >
                          {t.faq.more}
                          <ArrowRight size={14} strokeWidth={1.8} />
                        </Link>
                      ) : null}
                      <div className="pb-7" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
