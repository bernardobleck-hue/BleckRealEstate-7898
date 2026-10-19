import { useEffect, useState } from "react";
import { CHAPTERS } from "../../lib/guide-content";

/** Thin gold reading-progress bar pinned under the header. */
export function GuideProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
      <div className="h-full bg-gold transition-[width] duration-150 ease-linear" style={{ width: `${pct}%` }} />
    </div>
  );
}

/** Tracks which chapter heading is currently closest to the top of the viewport. */
export function useActiveChapter() {
  const [active, setActive] = useState(CHAPTERS[0]?.id ?? "");

  useEffect(() => {
    const onScroll = () => {
      let current = CHAPTERS[0]?.id ?? "";
      for (const chapter of CHAPTERS) {
        const node = document.getElementById(chapter.id);
        if (!node) continue;
        if (node.getBoundingClientRect().top <= 180) current = chapter.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return active;
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Sticky chapter index — desktop only. */
export function GuideRail({ active }: { active: string }) {
  return (
    <nav aria-label="Chapters" className="sticky top-[124px] hidden self-start lg:block">
      <p className="text-[9.5px] font-bold tracking-[0.2em] text-muted uppercase">Contents</p>
      <ul className="mt-5 space-y-0.5 border-l border-line">
        {CHAPTERS.map((chapter) => {
          const on = active === chapter.id;
          return (
            <li key={chapter.id}>
              <button
                type="button"
                onClick={() => scrollToId(chapter.id)}
                className={`-ml-px flex w-full items-baseline gap-2.5 border-l-2 py-2 pl-4 text-left transition-colors duration-300 ${
                  on ? "border-gold text-ink" : "border-transparent text-muted hover:text-ink"
                }`}
              >
                <span className={`text-[10px] font-bold tracking-[0.1em] ${on ? "text-gold" : "text-muted/70"}`}>
                  {chapter.num}
                </span>
                <span className="text-[13px] leading-[1.4]">{chapter.short}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
