import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useReveal } from "../../hooks/use-reveal";
import { usePrefersReducedMotion } from "../../hooks/use-media";
import { useT } from "../../lib/i18n";
import { TESTIMONIALS } from "../../lib/content";

const AUTOPLAY_MS = 9000;

export function Testimonials() {
  const t = useT();
  const reveal = useReveal();
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = TESTIMONIALS.length;
  const go = useCallback((next: number) => setIndex(((next % total) + total) % total), [total]);

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, total]);

  const active = TESTIMONIALS[index];

  return (
    <section id="reviews" className="relative overflow-hidden bg-ink py-20 text-white md:py-28">
      <span aria-hidden className="grain absolute inset-0" />

      <div className="wrap relative">
        <div ref={reveal.ref} className={`${reveal.className} max-w-[620px]`}>
          <p className="eyebrow">{t.reviews.eyebrow}</p>
          <h2 className="mt-5 text-[clamp(31px,3.7vw,50px)] text-balance">{t.reviews.title}</h2>
        </div>

        <div
          className="mt-12 md:mt-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <Quote size={44} className="text-gold/45" strokeWidth={1.1} />

          <blockquote
            key={index}
            className="rise mt-6 max-w-[900px] font-display text-[clamp(19px,2.15vw,29px)] leading-[1.5] tracking-[-0.02em] text-white/95"
          >
            {active.quote}
          </blockquote>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[14px] font-semibold tracking-[0.03em] text-white">{active.author}</p>
              <p className="mt-1 text-[11px] font-semibold tracking-[0.18em] text-gold uppercase">{active.place}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label={t.reviews.prev}
                className="flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-gold hover:text-gold"
              >
                <ArrowLeft size={16} strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label={t.reviews.next}
                className="flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-gold hover:text-gold"
              >
                <ArrowRight size={16} strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="mt-10 flex gap-2" role="tablist" aria-label={t.reviews.title}>
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.author}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={item.author}
                onClick={() => go(i)}
                className={`h-[3px] flex-1 transition-colors duration-500 ${i === index ? "bg-gold" : "bg-white/15"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
