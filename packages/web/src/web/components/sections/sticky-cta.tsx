import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { useT } from "../../lib/i18n";
import { CONTACT } from "../../lib/content";
import { track } from "../../lib/analytics";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Mobile-only sticky action bar. Appears after the hero, hides while the form is on screen. */
export function StickyCta() {
  const t = useT();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.85;
      const form = document.getElementById("start");
      let overForm = false;
      if (form) {
        const rect = form.getBoundingClientRect();
        overForm = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
      }
      setVisible(past && !overForm);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/97 backdrop-blur-md transition-transform duration-500 ease-out md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-stretch gap-2 px-3 py-3">
        <button
          type="button"
          onClick={() => scrollToId("start")}
          className="btn btn-gold flex-1 !px-4 !py-3.5 !text-[10.5px]"
        >
          {t.sticky.cta}
          <ArrowRight size={14} strokeWidth={2.2} />
        </button>
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noreferrer"
          aria-label={t.sticky.whatsapp}
          onClick={() => track("whatsapp_click", { placement: "sticky_bar" })}
          className="flex w-12 items-center justify-center border border-white/25 text-white"
        >
          <MessageCircle size={17} strokeWidth={1.9} />
        </a>
        <a
          href={CONTACT.phoneHref}
          aria-label={t.sticky.call}
          onClick={() => track("phone_click", { placement: "sticky_bar" })}
          className="flex w-12 items-center justify-center border border-white/25 text-white"
        >
          <Phone size={17} strokeWidth={1.9} />
        </a>
      </div>
    </div>
  );
}
