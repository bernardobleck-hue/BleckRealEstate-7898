import { Mail, MapPin, Phone } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Logo } from "../ui/logo";
import { useT } from "../../lib/i18n";
import { track } from "../../lib/analytics";
import { CONTACT } from "../../lib/content";

const LINKS = [
  { id: "process", key: "process" as const },
  { id: "areas", key: "areas" as const },
  { id: "sourcing", key: "sourcing" as const },
  { id: "about", key: "about" as const },
  { id: "reviews", key: "reviews" as const },
  { id: "faq", key: "faq" as const },
];

export function Footer() {
  const t = useT();
  const [pathname] = useLocation();
  const onHome = pathname === "/";

  const goTo = (id: string) => {
    if (!onHome) {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const year = new Date().getFullYear();

  return (
    <footer className="bg-char pt-16 pb-28 text-white/70 md:pb-14">
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Logo />
            <p className="mt-4 text-[11px] font-bold tracking-[0.2em] text-gold uppercase">{t.footer.tagline}</p>
            <p className="mt-5 max-w-[300px] text-[14px] leading-[1.75] text-white/55">{t.footer.blurb}</p>
          </div>

          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">{t.footer.navTitle}</p>
            <ul className="mt-5 space-y-3">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => goTo(link.id)}
                    className="text-[14px] text-white/70 transition-colors hover:text-gold"
                  >
                    {t.nav[link.key]}
                  </button>
                </li>
              ))}
              <li>
                <Link href="/guide" className="text-[14px] text-white/70 transition-colors hover:text-gold">
                  {t.footer.guideLink}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">{t.footer.servicesTitle}</p>
            <ul className="mt-5 space-y-3">
              {t.footer.services.map((service) => (
                <li key={service} className="text-[14px] text-white/60">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">{t.footer.contactTitle}</p>
            <ul className="mt-5 space-y-3.5">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  onClick={() => track("phone_click", { placement: "footer" })}
                  className="flex items-center gap-3 text-[14px] text-white/70 transition-colors hover:text-gold"
                >
                  <Phone size={14} className="text-gold" strokeWidth={1.8} />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.emailHref}
                  className="flex items-center gap-3 text-[14px] break-all text-white/70 transition-colors hover:text-gold"
                >
                  <Mail size={14} className="shrink-0 text-gold" strokeWidth={1.8} />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-[14px] text-white/60">
                <MapPin size={14} className="text-gold" strokeWidth={1.8} />
                {t.footer.areasLine}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-7 text-[12px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} BleckTeam. {t.footer.rights}
          </p>
          <p>
            Century 21 Portugal · <span className="text-white/55">{t.footer.ami}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
