import { useEffect, useRef, useState } from "react";
import { useT } from "../../lib/i18n";
import { usePrefersReducedMotion } from "../../hooks/use-media";

/** Counts up to the numeric part of a value like "120+" once it scrolls in. */
function useCountUp(value: string, active: boolean, reduced: boolean) {
  const numeric = Number.parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[\d]/g, "");
  const [shown, setShown] = useState(reduced ? numeric : 0);

  useEffect(() => {
    if (!active || reduced) {
      setShown(numeric);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const duration = 1400;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - p) ** 3;
      setShown(Math.round(numeric * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, numeric, reduced]);

  return `${shown}${suffix}`;
}

function Stat({ value, label, active }: { value: string; label: string; active: boolean }) {
  const reduced = usePrefersReducedMotion();
  const display = useCountUp(value, active, reduced);

  return (
    <div className="text-center lg:text-left">
      <div className="font-display text-[clamp(38px,4.4vw,58px)] leading-none text-gold">{display}</div>
      <div className="mt-3 text-[11px] leading-[1.5] font-semibold tracking-[0.13em] text-white/55 uppercase">
        {label}
      </div>
    </div>
  );
}

export function TrustBar() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="grain relative bg-char py-14 md:py-16">
      <div className="wrap" ref={ref}>
        <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:gap-y-0">
          {t.trust.items.map((item) => (
            <Stat key={item.label} value={item.value} label={item.label} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
