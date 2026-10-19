import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "../ui/logo";
import { useLanguage } from "../../lib/i18n";

const LINKS = [
  { id: "process", key: "process" as const },
  { id: "areas", key: "areas" as const },
  { id: "sourcing", key: "sourcing" as const },
  { id: "about", key: "about" as const },
  { id: "reviews", key: "reviews" as const },
  { id: "faq", key: "faq" as const },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Nav() {
  const { t, locale, toggle } = useLanguage();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 90);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid ? "bg-ink/92 shadow-[0_1px_0_rgba(255,255,255,.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="wrap flex h-[76px] items-center justify-between md:h-[92px]">
        <button type="button" onClick={() => go("top")} aria-label="BleckTeam — home">
          <Logo />
        </button>

        <nav className="hidden items-center gap-8 xl:flex">
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              className="text-[10px] font-semibold tracking-[0.16em] text-white/80 uppercase transition-colors hover:text-gold"
            >
              {t.nav[link.key]}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label="Switch language"
            className="flex items-center gap-1 border border-white/25 px-2.5 py-1.5 text-[10px] font-bold tracking-[0.1em] text-white/85 transition-colors hover:border-gold hover:text-gold"
          >
            <span className={locale === "en" ? "text-gold" : ""}>EN</span>
            <span className="text-white/30">/</span>
            <span className={locale === "pt" ? "text-gold" : ""}>PT</span>
          </button>

          <button type="button" onClick={() => go("start")} className="btn btn-gold hidden !px-5 !py-3 sm:inline-flex">
            {t.nav.cta}
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="p-1 text-white xl:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink/97 backdrop-blur-md xl:hidden">
          <div className="wrap flex flex-col gap-1 py-5">
            {LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                className="py-3 text-left text-[13px] font-semibold tracking-[0.12em] text-white/85 uppercase"
              >
                {t.nav[link.key]}
              </button>
            ))}
            <button type="button" onClick={() => go("start")} className="btn btn-gold mt-3 w-full">
              {t.nav.cta}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
