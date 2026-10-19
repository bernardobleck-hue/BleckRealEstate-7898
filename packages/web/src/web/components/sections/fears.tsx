import { useReveal } from "../../hooks/use-reveal";
import { useT } from "../../lib/i18n";

/**
 * Four short, self-contained answers to the objections foreign buyers arrive with.
 * Written as extractable Q→A units so generative engines can quote a single card.
 */
export function Fears() {
  const t = useT();
  const head = useReveal();

  return (
    <section id="answers" className="bg-cream py-20 md:py-28">
      <div className="wrap">
        <div ref={head.ref} className={`${head.className} max-w-[720px]`}>
          <p className="eyebrow">{t.fears.eyebrow}</p>
          <h2 className="mt-5 text-[clamp(29px,3.4vw,46px)] text-balance">{t.fears.title}</h2>
          <p className="mt-5 max-w-[540px] text-[15px] leading-[1.75] text-muted">{t.fears.sub}</p>
        </div>

        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2">
          {t.fears.items.map((item, i) => (
            <FearCard key={item.q} q={item.q} a={item.a} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FearCard({ q, a, delay }: { q: string; a: string; delay: number }) {
  const reveal = useReveal();

  return (
    <div
      ref={reveal.ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${reveal.className} bg-white p-7 md:p-9`}
    >
      <h3 className="font-display text-[20px] leading-[1.35] tracking-[-0.02em] text-ink md:text-[23px]">{q}</h3>
      <p className="mt-4 text-[14.5px] leading-[1.78] text-muted">{a}</p>
    </div>
  );
}
