import { useReveal } from "../../hooks/use-reveal";
import { useT } from "../../lib/i18n";

export function Process() {
  const t = useT();
  const head = useReveal();

  return (
    <section id="process" className="bg-cream py-20 md:py-28">
      <div className="wrap">
        <div ref={head.ref} className={`${head.className} max-w-[720px]`}>
          <p className="eyebrow">{t.process.eyebrow}</p>
          <h2 className="mt-5 text-[clamp(31px,3.9vw,54px)] text-balance">{t.process.title}</h2>
          <p className="mt-6 max-w-[560px] text-[15.5px] leading-[1.75] text-muted">{t.process.sub}</p>
        </div>

        <div className="mt-14 grid gap-px bg-line md:grid-cols-2 xl:grid-cols-4">
          {t.process.steps.map((step, i) => (
            <Step key={step.n} n={step.n} title={step.title} text={step.text} delay={i * 110} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Step({ n, title, text, delay }: { n: string; title: string; text: string; delay: number }) {
  const reveal = useReveal();

  return (
    <div
      ref={reveal.ref}
      className={`${reveal.className} group relative bg-cream p-8 transition-colors duration-500 hover:bg-white md:p-9`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="font-display text-[34px] leading-none text-gold/45 transition-colors duration-500 group-hover:text-gold">
        {n}
      </span>
      <h3 className="mt-5 text-[21px]">{title}</h3>
      <p className="mt-3.5 text-[14.5px] leading-[1.72] text-muted">{text}</p>
      <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-[width] duration-700 group-hover:w-full" />
    </div>
  );
}
