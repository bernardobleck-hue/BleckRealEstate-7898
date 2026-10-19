import { useState } from "react";
import { ArrowRight, BookOpen, Check, Download, FileText, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useReveal } from "../../hooks/use-reveal";
import { useLanguage } from "../../lib/i18n";
import { GUIDE_PATH } from "../../lib/content";
import { useRequestGuide } from "../../queries/leads";
import { track } from "../../lib/analytics";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Guide() {
  const { t, locale } = useLanguage();
  const reveal = useReveal();
  const requestGuide = useRequestGuide();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    requestGuide.mutate(
      { name: name.trim() || undefined, email: email.trim(), source: "guide", locale },
      { onSuccess: () => track("guide_requested", { source: "homepage_section" }) },
    );
  };

  return (
    <section id="guide" className="bg-cream py-20 md:py-28">
      <div className="wrap">
        <div
          ref={reveal.ref}
          className={`${reveal.className} grid items-center gap-10 border border-line bg-white p-7 md:p-12 lg:grid-cols-[1fr_0.82fr] lg:gap-16`}
        >
          <div>
            <p className="eyebrow">{t.guide.eyebrow}</p>
            <h2 className="mt-5 text-[clamp(27px,3vw,41px)] text-balance">{t.guide.title}</h2>
            <p className="mt-5 max-w-[520px] text-[15px] leading-[1.75] text-muted">{t.guide.sub}</p>

            <ul className="mt-7 space-y-3">
              {t.guide.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-[14px] leading-[1.65] text-ink">
                  <Check size={15} className="mt-[3px] shrink-0 text-gold" strokeWidth={2.6} />
                  {bullet}
                </li>
              ))}
            </ul>

            <Link
              href="/guide"
              className="mt-8 inline-flex items-center gap-2.5 text-[12px] font-semibold tracking-[0.14em] text-ink uppercase transition-colors hover:text-gold"
            >
              <BookOpen size={15} strokeWidth={2} className="text-gold" />
              {t.guide.readOnline}
              <ArrowRight size={14} strokeWidth={2.2} />
            </Link>
          </div>

          <div className="bg-ink p-7 md:p-9">
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-gold" strokeWidth={1.5} />
              <span className="text-[10px] font-bold tracking-[0.2em] text-white/55 uppercase">Free PDF · 2026 edition</span>
            </div>

            {requestGuide.isSuccess ? (
              <div className="mt-6">
                <p className="text-[16px] leading-[1.7] text-white">{t.guide.done}</p>
                <a
                  href={GUIDE_PATH}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("guide_pdf_downloaded", { placement: "homepage_section" })}
                  className="btn btn-gold mt-6 w-full"
                >
                  <Download size={15} strokeWidth={2.2} />
                  {t.guide.download}
                </a>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 space-y-3">
                <input
                  className="field"
                  placeholder={t.guide.namePh}
                  aria-label={t.guide.namePh}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="field"
                  type="email"
                  placeholder={t.guide.emailPh}
                  aria-label={t.guide.emailPh}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {invalid && <p className="text-[13px] text-[#e0917f]">{t.guide.emailPh}</p>}
                <button type="submit" disabled={requestGuide.isPending} className="btn btn-gold w-full">
                  {requestGuide.isPending ? (
                    <>
                      <Loader2 size={15} className="animate-spin" strokeWidth={2.2} />
                      {t.guide.sending}
                    </>
                  ) : (
                    <>
                      {t.guide.cta}
                      <ArrowRight size={15} strokeWidth={2.2} />
                    </>
                  )}
                </button>
                <p className="pt-1 text-center text-[11.5px] text-white/40">{t.guide.privacy}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
