import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { ArrowRight, Compass, Globe2, Handshake, LifeBuoy } from "lucide-react";
import { useIsSmallScreen, usePrefersReducedMotion } from "../../hooks/use-media";
import { useT } from "../../lib/i18n";
import { CONTACT } from "../../lib/content";

const HeroScene = lazy(() => import("../hero-scene"));

const BADGE_ICONS = [Compass, Globe2, LifeBuoy, Handshake];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  const t = useT();
  const small = useIsSmallScreen();
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);
  const [mounted, setMounted] = useState(false);

  const use3d = !small && !reduced;

  // Only mount WebGL after first paint so the headline never waits on it.
  useEffect(() => {
    if (!use3d) return;
    const id = window.setTimeout(() => setMounted(true), 120);
    return () => window.clearTimeout(id);
  }, [use3d]);

  // Stop rendering frames once the hero leaves the viewport.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), {
      threshold: 0.02,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="grain relative isolate flex min-h-[720px] flex-col justify-end overflow-hidden bg-ink lg:min-h-[100svh]"
    >
      {/* Photographic base — also the fallback when WebGL is skipped */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-lisbon.webp')" }}
      />
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}
      >
        {mounted && (
          <Suspense fallback={null}>
            <HeroScene paused={!inView} />
          </Suspense>
        )}
      </div>

      {/* Legibility scrim */}
      <div
        aria-hidden
        className="absolute inset-0 -z-[5] bg-[linear-gradient(96deg,rgba(8,11,12,.93)_0%,rgba(8,11,12,.72)_42%,rgba(8,11,12,.16)_78%),linear-gradient(0deg,rgba(8,11,12,.92)_0%,rgba(8,11,12,0)_46%)]"
      />

      <div className="wrap relative z-10 pt-[132px] pb-10 lg:pt-[168px] lg:pb-0">
        <div className="max-w-[660px]">
          <p className="eyebrow rise" style={{ animationDelay: "80ms" }}>
            {t.hero.eyebrow}
          </p>

          <h1 className="mt-5 text-[clamp(44px,6.6vw,84px)] text-white">
            <span className="rise block" style={{ animationDelay: "180ms" }}>
              {t.hero.titleA}
            </span>
            <span className="rise block text-gold" style={{ animationDelay: "300ms" }}>
              {t.hero.titleB}
            </span>
          </h1>

          <p
            className="rise mt-6 max-w-[560px] text-[15px] leading-[1.75] text-white/72 md:text-[16.5px]"
            style={{ animationDelay: "420ms" }}
          >
            {t.hero.sub}
          </p>

          <p
            className="rise mt-3.5 max-w-[560px] text-[14.5px] leading-[1.75] text-white/60 md:text-[15.5px]"
            style={{ animationDelay: "480ms" }}
          >
            {t.hero.sub2}
          </p>

          <p
            className="rise mt-6 max-w-[560px] border-l border-gold/60 pl-4 text-[13.5px] leading-[1.6] text-white/80 italic md:text-[14.5px]"
            style={{ animationDelay: "520ms" }}
          >
            {t.hero.tagline}
          </p>

          <div className="rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "540ms" }}>
            <button type="button" onClick={() => scrollToId("start")} className="btn btn-gold">
              {t.hero.primary}
              <ArrowRight size={15} strokeWidth={2.2} />
            </button>
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="btn btn-outline-light">
              {t.hero.secondary}
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-12 border-t border-white/15 lg:mt-16">
        <div className="wrap grid grid-cols-2 gap-x-6 gap-y-6 py-7 lg:grid-cols-4 lg:py-8">
          {t.hero.badges.map((badge, i) => {
            const Icon = BADGE_ICONS[i] ?? Compass;
            return (
              <div key={badge.title} className="rise flex gap-3" style={{ animationDelay: `${660 + i * 90}ms` }}>
                <Icon size={19} className="mt-[2px] shrink-0 text-gold" strokeWidth={1.4} />
                <div>
                  <div className="text-[11.5px] font-bold tracking-[0.05em] text-white">{badge.title}</div>
                  <div className="mt-1 text-[11.5px] leading-[1.5] text-white/55">{badge.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
