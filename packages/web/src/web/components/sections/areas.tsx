import { ArrowUpRight } from "lucide-react";
import { useReveal } from "../../hooks/use-reveal";
import { useT } from "../../lib/i18n";

const IMAGES = ["/images/area-lisbon.webp", "/images/area-cascais.webp", "/images/area-westcoast.webp"];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Areas() {
  const t = useT();
  const head = useReveal();

  return (
    <section id="areas" className="grain relative bg-ink py-20 md:py-28">
      <div className="wrap">
        <div ref={head.ref} className={`${head.className} max-w-[720px]`}>
          <p className="eyebrow">{t.areas.eyebrow}</p>
          <h2 className="mt-5 text-[clamp(31px,3.9vw,54px)] text-balance text-white">{t.areas.title}</h2>
          <p className="mt-6 max-w-[560px] text-[15.5px] leading-[1.75] text-white/60">{t.areas.sub}</p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {t.areas.items.map((item, i) => (
            <AreaCard
              key={item.name}
              name={item.name}
              tag={item.tag}
              text={item.text}
              image={IMAGES[i] ?? IMAGES[0]!}
              delay={i * 120}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button type="button" onClick={() => scrollToId("start")} className="btn btn-outline-light">
            {t.areas.cta}
            <ArrowUpRight size={15} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </section>
  );
}

interface AreaCardProps {
  name: string;
  tag: string;
  text: string;
  image: string;
  delay: number;
}

function AreaCard({ name, tag, text, image, delay }: AreaCardProps) {
  const reveal = useReveal();

  return (
    <button
      type="button"
      onClick={() => scrollToId("start")}
      ref={reveal.ref as React.Ref<HTMLButtonElement>}
      className={`${reveal.className} group relative block h-[440px] overflow-hidden text-left`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <img
        src={image}
        alt={`Property in ${name}, Portugal`}
        width={1400}
        height={933}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.07]"
      />
      <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,11,12,.95)_0%,rgba(8,11,12,.66)_44%,rgba(8,11,12,.24)_100%)]" />

      <span className="absolute inset-x-0 bottom-0 p-7">
        <span className="eyebrow block">{tag}</span>
        <span className="mt-2.5 block font-display text-[30px] leading-none text-white">{name}</span>
        <span className="mt-3.5 block max-w-[300px] text-[13.5px] leading-[1.7] text-white/72 transition-colors duration-500 md:text-white/0 md:group-hover:text-white/72">
          {text}
        </span>
        <span className="mt-5 flex h-9 w-9 items-center justify-center border border-white/30 text-white transition-colors duration-500 group-hover:border-gold group-hover:bg-gold">
          <ArrowUpRight size={16} strokeWidth={2} />
        </span>
      </span>
    </button>
  );
}
