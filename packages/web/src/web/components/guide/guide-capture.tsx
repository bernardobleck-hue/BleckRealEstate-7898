import { useState } from "react";
import { ArrowRight, Check, Download, FileText, Loader2 } from "lucide-react";
import { useLanguage } from "../../lib/i18n";
import { GUIDE_PATH } from "../../lib/content";
import { useRequestGuide } from "../../queries/leads";
import { track } from "../../lib/analytics";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface GuideCaptureProps {
  /** "band" sits mid-article on cream; "panel" is the dark end-of-guide block. */
  variant?: "band" | "panel";
  title: string;
  sub: string;
}

/**
 * Email capture for the PDF copy of the guide. The whole guide is readable for
 * free, so this asks for the takeaway version rather than gating the content.
 */
export function GuideCapture({ variant = "band", title, sub }: GuideCaptureProps) {
  const { locale } = useLanguage();
  const requestGuide = useRequestGuide();
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);

  const dark = variant === "panel";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    requestGuide.mutate(
      { email: email.trim(), source: "guide", locale },
      { onSuccess: () => track("guide_requested", { source: "guide_page" }) },
    );
  };

  return (
    <div className={`${dark ? "bg-ink p-8 text-white md:p-11" : "border border-line bg-white p-7 md:p-9"}`}>
      <div className="flex items-center gap-3">
        <FileText size={19} className="text-gold" strokeWidth={1.5} />
        <span
          className={`text-[9.5px] font-bold tracking-[0.2em] uppercase ${dark ? "text-white/50" : "text-muted"}`}
        >
          Free PDF · 2026 edition
        </span>
      </div>

      <p className={`mt-5 font-display text-[25px] leading-tight md:text-[30px] ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </p>
      <p className={`mt-3 max-w-[440px] text-[15px] leading-[1.7] ${dark ? "text-white/60" : "text-muted"}`}>{sub}</p>

      {requestGuide.isSuccess ? (
        <div className="mt-7">
          <p className={`flex items-center gap-2.5 text-[15.5px] ${dark ? "text-white" : "text-ink"}`}>
            <Check size={17} className="text-gold" strokeWidth={2.6} />
            Check your inbox — the guide is on its way.
          </p>
          <a
            href={GUIDE_PATH}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("guide_pdf_downloaded", { placement: "guide_capture" })}
            className="btn btn-gold mt-6"
          >
            <Download size={15} strokeWidth={2.2} />
            Download now
          </a>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-7 flex max-w-[520px] flex-col gap-3 sm:flex-row">
          <input
            className="field flex-1"
            type="email"
            placeholder="you@email.com"
            aria-label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={requestGuide.isPending} className="btn btn-gold shrink-0">
            {requestGuide.isPending ? (
              <>
                <Loader2 size={15} className="animate-spin" strokeWidth={2.2} />
                Sending…
              </>
            ) : (
              <>
                Email me the PDF
                <ArrowRight size={15} strokeWidth={2.2} />
              </>
            )}
          </button>
        </form>
      )}

      {invalid && <p className="mt-3 text-[13px] text-[#c0553c]">Please enter a valid email address.</p>}
      <p className={`mt-3.5 text-[11.5px] ${dark ? "text-white/40" : "text-muted"}`}>
        No spam. Unsubscribe any time.
      </p>
    </div>
  );
}
