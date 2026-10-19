import { useEffect, useState } from "react";
import { ArrowRight, Download, FileText, Loader2, X } from "lucide-react";
import { useLanguage } from "../../lib/i18n";
import { GUIDE_PATH } from "../../lib/content";
import { useRequestGuide } from "../../queries/leads";
import { track } from "../../lib/analytics";

const SESSION_KEY = "bleckteam.exitIntentShown";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Desktop exit-intent capture: last chance to trade the guide for an email. */
export function ExitIntent() {
  const { t, locale } = useLanguage();
  const requestGuide = useRequestGuide();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 900px)").matches) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const onLeave = (e: MouseEvent) => {
      if (e.clientY > 6 || e.relatedTarget) return;
      sessionStorage.setItem(SESSION_KEY, "1");
      setOpen(true);
      track("exit_intent_shown");
    };

    const timer = window.setTimeout(() => document.addEventListener("mouseout", onLeave), 12000);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    requestGuide.mutate(
      { email: email.trim(), source: "exit_intent", locale },
      { onSuccess: () => track("guide_requested", { source: "exit_intent" }) },
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.exit.title}
      className="fixed inset-0 z-[60] flex items-center justify-center p-5"
    >
      <button
        type="button"
        aria-label={t.exit.dismiss}
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-ink/75 backdrop-blur-sm"
      />

      <div className="rise relative w-full max-w-[520px] bg-white p-8 shadow-2xl md:p-11">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={t.exit.dismiss}
          className="absolute top-4 right-4 p-1.5 text-muted transition-colors hover:text-ink"
        >
          <X size={18} strokeWidth={1.9} />
        </button>

        <div className="flex items-center gap-3">
          <FileText size={19} className="text-gold" strokeWidth={1.5} />
          <span className="text-[10px] font-bold tracking-[0.2em] text-muted uppercase">Free PDF · 2026 edition</span>
        </div>

        <h3 className="mt-5 text-[clamp(24px,2.6vw,32px)] text-balance">{t.exit.title}</h3>
        <p className="mt-4 text-[14.5px] leading-[1.72] text-muted">{t.exit.sub}</p>

        {requestGuide.isSuccess ? (
          <div className="mt-7">
            <p className="text-[15px] leading-[1.7] text-ink">{t.guide.done}</p>
            <a href={GUIDE_PATH} target="_blank" rel="noreferrer" className="btn btn-gold mt-5 w-full">
              <Download size={15} strokeWidth={2.2} />
              {t.guide.download}
            </a>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-7 space-y-3">
            <input
              className="field"
              type="email"
              autoFocus
              placeholder={t.exit.emailPh}
              aria-label={t.exit.emailPh}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {invalid && <p className="text-[13px] text-[#b4553f]">{t.form.required}</p>}
            <button type="submit" disabled={requestGuide.isPending} className="btn btn-gold w-full">
              {requestGuide.isPending ? (
                <>
                  <Loader2 size={15} className="animate-spin" strokeWidth={2.2} />
                  {t.guide.sending}
                </>
              ) : (
                <>
                  {t.exit.cta}
                  <ArrowRight size={15} strokeWidth={2.2} />
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full pt-1 text-center text-[12.5px] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink"
            >
              {t.exit.dismiss}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
