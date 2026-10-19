import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, MessageCircle, ShieldCheck } from "lucide-react";
import { Chip } from "../ui/chip";
import { useReveal } from "../../hooks/use-reveal";
import { useLanguage } from "../../lib/i18n";
import { CONTACT } from "../../lib/content";
import { useCreateLead } from "../../queries/leads";
import { track } from "../../lib/analytics";

interface Draft {
  intent: string;
  area: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  message: string;
}

const EMPTY: Draft = {
  intent: "",
  area: "",
  budget: "",
  timeline: "",
  name: "",
  email: "",
  phone: "",
  country: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function LeadForm() {
  const { t, locale } = useLanguage();
  const reveal = useReveal();
  const createLead = useCreateLead();

  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [touchedError, setTouchedError] = useState(false);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const done = createLead.isSuccess;
  const total = 3;

  const canAdvance = step === 0 ? Boolean(draft.intent) : step === 1 ? Boolean(draft.budget) : true;
  const contactValid = draft.name.trim().length > 1 && EMAIL_RE.test(draft.email.trim());

  const submit = () => {
    if (!contactValid) {
      setTouchedError(true);
      return;
    }
    setTouchedError(false);
    createLead.mutate({
      name: draft.name.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim() || undefined,
      country: draft.country.trim() || undefined,
      intent: draft.intent || undefined,
      area: draft.area || undefined,
      budget: draft.budget || undefined,
      timeline: draft.timeline || undefined,
      message: draft.message.trim() || undefined,
      locale,
    }, {
      onSuccess: () =>
        track("lead_submitted", {
          intent: draft.intent || "unspecified",
          area: draft.area || "unspecified",
          budget: draft.budget || "unspecified",
          timeline: draft.timeline || "unspecified",
        }),
    });
  };

  return (
    <section id="start" className="relative bg-cream py-20 md:py-28">
      <div className="wrap">
        <div ref={reveal.ref} className={`${reveal.className} grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20`}>
          <div className="lg:pt-4">
            <p className="eyebrow">{t.form.eyebrow}</p>
            <h2 className="mt-5 text-[clamp(31px,3.7vw,50px)] text-balance">{t.form.title}</h2>
            <p className="mt-6 max-w-[430px] text-[15.5px] leading-[1.75] text-muted">{t.form.sub}</p>

            <ul className="mt-9 space-y-3.5">
              {t.form.reassure.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[14px] text-ink">
                  <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-gold/15">
                    <Check size={12} className="text-gold" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-start gap-3 border-l-2 border-gold pl-4 text-[13.5px] leading-[1.7] text-muted">
              <ShieldCheck size={17} className="mt-[3px] shrink-0 text-gold" strokeWidth={1.5} />
              <span>{t.trust.note}</span>
            </div>
          </div>

          <div className="border border-line bg-white p-6 shadow-[0_28px_70px_-40px_rgba(16,18,17,.42)] md:p-9">
            {done ? (
              <div className="flex min-h-[420px] flex-col items-start justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/12">
                  <Check size={26} className="text-gold" strokeWidth={2} />
                </span>
                <h3 className="mt-6 text-[30px]">{t.form.success.title}</h3>
                <p className="mt-4 max-w-[400px] text-[15px] leading-[1.75] text-muted">{t.form.success.text}</p>
                <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="btn btn-gold mt-8">
                  <MessageCircle size={15} strokeWidth={2} />
                  {t.form.success.cta}
                </a>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[0.18em] text-muted uppercase">
                    {t.form.stepLabel} {step + 1} {t.form.of} {total}
                  </span>
                  <div className="flex gap-1.5">
                    {Array.from({ length: total }).map((_, i) => (
                      <span
                        // eslint-disable-next-line react/no-array-index-key
                        key={i}
                        className={`h-[3px] w-9 transition-colors duration-500 ${i <= step ? "bg-gold" : "bg-line"}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-7 min-h-[368px]">
                  {step === 0 && (
                    <div className="space-y-7">
                      <div>
                        <h3 className="text-[22px]">{t.form.step1.title}</h3>
                        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                          {t.form.step1.intents.map((option) => (
                            <Chip
                              key={option.value}
                              label={option.label}
                              selected={draft.intent === option.value}
                              onSelect={() => set("intent", option.value)}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-[18px]">{t.form.step1.areaTitle}</h3>
                        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                          {t.form.step1.areas.map((option) => (
                            <Chip
                              key={option.value}
                              label={option.label}
                              selected={draft.area === option.value}
                              onSelect={() => set("area", option.value)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-7">
                      <div>
                        <h3 className="text-[22px]">{t.form.step2.title}</h3>
                        <p className="mt-4 text-[11px] font-bold tracking-[0.16em] text-muted uppercase">
                          {t.form.step2.budgetTitle}
                        </p>
                        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                          {t.form.step2.budgets.map((option) => (
                            <Chip
                              key={option.value}
                              label={option.label}
                              selected={draft.budget === option.value}
                              onSelect={() => set("budget", option.value)}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold tracking-[0.16em] text-muted uppercase">
                          {t.form.step2.timelineTitle}
                        </p>
                        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                          {t.form.step2.timelines.map((option) => (
                            <Chip
                              key={option.value}
                              label={option.label}
                              selected={draft.timeline === option.value}
                              onSelect={() => set("timeline", option.value)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-3.5">
                      <h3 className="text-[22px]">{t.form.step3.title}</h3>
                      <div className="grid gap-3.5 sm:grid-cols-2">
                        <input
                          className="field"
                          placeholder={t.form.step3.namePh}
                          aria-label={t.form.step3.name}
                          value={draft.name}
                          onChange={(e) => set("name", e.target.value)}
                        />
                        <input
                          className="field"
                          type="email"
                          placeholder={t.form.step3.emailPh}
                          aria-label={t.form.step3.email}
                          value={draft.email}
                          onChange={(e) => set("email", e.target.value)}
                        />
                        <input
                          className="field"
                          placeholder={t.form.step3.phonePh}
                          aria-label={t.form.step3.phone}
                          value={draft.phone}
                          onChange={(e) => set("phone", e.target.value)}
                        />
                        <input
                          className="field"
                          placeholder={t.form.step3.countryPh}
                          aria-label={t.form.step3.country}
                          value={draft.country}
                          onChange={(e) => set("country", e.target.value)}
                        />
                      </div>
                      <textarea
                        className="field min-h-[104px] resize-y"
                        placeholder={t.form.step3.messagePh}
                        aria-label={t.form.step3.message}
                        value={draft.message}
                        onChange={(e) => set("message", e.target.value)}
                      />
                      {touchedError && !contactValid && (
                        <p className="text-[13px] text-[#b4402f]">{t.form.required}</p>
                      )}
                      {createLead.isError && <p className="text-[13px] text-[#b4402f]">{t.form.error}</p>}
                    </div>
                  )}
                </div>

                <div className="mt-7 flex items-center gap-3 border-t border-line pt-6">
                  {step > 0 && (
                    <button type="button" onClick={() => setStep((s) => s - 1)} className="btn btn-outline-dark">
                      <ArrowLeft size={15} strokeWidth={2.2} />
                      {t.form.back}
                    </button>
                  )}
                  {step < total - 1 ? (
                    <button
                      type="button"
                      disabled={!canAdvance}
                      onClick={() => setStep((s) => s + 1)}
                      className="btn btn-gold ml-auto"
                    >
                      {t.form.next}
                      <ArrowRight size={15} strokeWidth={2.2} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={submit}
                      disabled={createLead.isPending}
                      className="btn btn-gold ml-auto"
                    >
                      {createLead.isPending ? (
                        <>
                          <Loader2 size={15} className="animate-spin" strokeWidth={2.2} />
                          {t.form.submitting}
                        </>
                      ) : (
                        <>
                          {t.form.submit}
                          <ArrowRight size={15} strokeWidth={2.2} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
