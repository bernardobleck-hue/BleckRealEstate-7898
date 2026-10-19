import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowDown, ArrowLeft, Download, MessageCircle, Phone } from "lucide-react";
import { Logo } from "../components/ui/logo";
import { Footer } from "../components/sections/footer";
import { GuideBlock } from "../components/guide/guide-blocks";
import { GuideProgress, GuideRail, useActiveChapter } from "../components/guide/guide-rail";
import { GuideCapture } from "../components/guide/guide-capture";
import { GuideSchema } from "../components/guide/guide-schema";
import { CHAPTERS, GUIDE_META } from "../lib/guide-content";
import { CONTACT, GUIDE_PATH } from "../lib/content";
import { useReveal } from "../hooks/use-reveal";
import { useSeo } from "../hooks/use-seo";
import { track } from "../lib/analytics";

/** Mid-article capture appears after this chapter index. */
const CAPTURE_AFTER = 4;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function GuidePage() {
  const active = useActiveChapter();

  useSeo({
    title: "How to Buy Property in Portugal as a Foreigner (2026 Guide) | BleckTeam",
    description:
      "A 12-chapter guide to buying property in Portugal as a foreign buyer in 2026: NIF, IMT at 7.5% for non-tax-residents, CPCV, escritura, mortgages, residency routes and total closing costs.",
    path: "/guide",
    image: "/images/facade.webp",
    type: "article",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    track("guide_page_view");
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <GuideSchema />
      <GuideProgress />

      {/* Slim reading header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur-md">
        <div className="wrap flex h-[72px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-4">
            <Logo />
          </Link>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="hidden items-center gap-2 text-[10px] font-semibold tracking-[0.16em] text-white/70 uppercase transition-colors hover:text-gold md:inline-flex"
            >
              <ArrowLeft size={13} strokeWidth={2.2} />
              Back to site
            </Link>
            <a
              href={GUIDE_PATH}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("guide_pdf_downloaded", { placement: "guide_header" })}
              className="btn btn-gold !px-4 !py-3 !text-[10px] md:!px-5"
            >
              <Download size={14} strokeWidth={2.2} />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        {/* Cover */}
        <section className="grain relative isolate overflow-hidden bg-ink pt-[128px] pb-16 md:pt-[168px] md:pb-24">
          <img
            src="/images/facade.webp"
            alt=""
            aria-hidden
            className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45"
          />
          <span
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(8,11,12,.96)_0%,rgba(8,11,12,.86)_46%,rgba(8,11,12,.55)_100%)]"
          />

          <div className="wrap relative">
            <div className="max-w-[720px]">
              <p className="eyebrow rise">{GUIDE_META.eyebrow}</p>
              <h1 className="mt-5 text-[clamp(40px,6vw,76px)] text-white">
                <span className="rise block" style={{ animationDelay: "140ms" }}>
                  {GUIDE_META.titleA}
                </span>
                <span className="rise block text-gold" style={{ animationDelay: "240ms" }}>
                  {GUIDE_META.titleB}
                </span>
              </h1>
              <p
                className="rise mt-7 max-w-[560px] text-[16px] leading-[1.8] text-white/70"
                style={{ animationDelay: "360ms" }}
              >
                {GUIDE_META.standfirst}
              </p>

              <div
                className="rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[10.5px] font-semibold tracking-[0.16em] text-white/45 uppercase"
                style={{ animationDelay: "460ms" }}
              >
                <span>{GUIDE_META.chapterCount}</span>
                <span aria-hidden className="h-3 w-px bg-white/20" />
                <span>{GUIDE_META.readTime}</span>
                <span aria-hidden className="h-3 w-px bg-white/20" />
                <span>{GUIDE_META.updated}</span>
              </div>

              <div className="rise mt-10 flex flex-wrap gap-3" style={{ animationDelay: "560ms" }}>
                <button
                  type="button"
                  onClick={() => scrollToId(CHAPTERS[0]?.id ?? "")}
                  className="btn btn-gold"
                >
                  Start reading
                  <ArrowDown size={15} strokeWidth={2.2} />
                </button>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("whatsapp_click", { placement: "guide_page" })}
                  className="btn btn-outline-light"
                >
                  <MessageCircle size={15} strokeWidth={2.2} />
                  Ask us a question
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contents overview */}
        <section className="border-b border-line bg-cream py-14 md:py-16">
          <div className="wrap">
            <p className="eyebrow">In this guide</p>
            <ol className="mt-8 grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
              {CHAPTERS.map((chapter) => (
                <li key={chapter.id} className="border-t border-line">
                  <button
                    type="button"
                    onClick={() => scrollToId(chapter.id)}
                    className="group flex w-full items-baseline gap-4 py-4 text-left"
                  >
                    <span className="font-display text-[15px] text-gold">{chapter.num}</span>
                    <span className="text-[15px] leading-[1.5] text-ink transition-colors group-hover:text-gold">
                      {chapter.short}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Body */}
        <div className="bg-cream pt-4 pb-20 md:pb-28">
          <div className="wrap grid gap-14 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-20">
            <GuideRail active={active} />

            <article className="max-w-[720px]">
              {CHAPTERS.map((chapter, index) => (
                <div key={chapter.id}>
                  <Chapter chapter={chapter} />
                  {index === CAPTURE_AFTER && (
                    <div className="mt-16">
                      <GuideCapture
                        title="Prefer to read it offline?"
                        sub="We'll email you the printable PDF edition — the same version we send every new client."
                      />
                    </div>
                  )}
                </div>
              ))}

              <p className="mt-16 border-t border-line pt-7 text-[12.5px] leading-[1.7] text-muted">
                {GUIDE_META.disclaimer}
              </p>
            </article>
          </div>
        </div>

        {/* End CTA */}
        <section className="bg-char py-16 md:py-24">
          <div className="wrap grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <p className="eyebrow">Next step</p>
              <h2 className="mt-5 text-[clamp(30px,3.6vw,50px)] text-balance text-white">
                Questions the guide didn't answer?
              </h2>
              <p className="mt-5 max-w-[480px] text-[15.5px] leading-[1.8] text-white/60">
                Every purchase has one detail that decides it. Book a 30-minute call and we'll go through yours —
                no obligation, and no fee to you.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/" className="btn btn-gold">
                  Start your search
                </Link>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("whatsapp_click", { placement: "guide_page" })}
                  className="btn btn-outline-light"
                >
                  <MessageCircle size={15} strokeWidth={2.2} />
                  WhatsApp us
                </a>
                <a
                  href={CONTACT.phoneHref}
                  onClick={() => track("phone_click", { placement: "guide_page" })}
                  className="btn btn-outline-light"
                >
                  <Phone size={15} strokeWidth={2.2} />
                  {CONTACT.phoneDisplay}
                </a>
              </div>
            </div>

            <GuideCapture
              variant="panel"
              title="Take the PDF with you"
              sub="The printable PDF edition, in your inbox in a few seconds."
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Chapter({ chapter }: { chapter: (typeof CHAPTERS)[number] }) {
  const reveal = useReveal();

  return (
    <section id={chapter.id} className="scroll-mt-[104px] border-t border-line pt-12 first:border-0 md:pt-16">
      <div ref={reveal.ref} className={reveal.className}>
        <div className="flex items-center gap-3.5">
          <span className="font-display text-[15px] text-gold">{chapter.num}</span>
          <span aria-hidden className="h-px w-8 bg-gold/50" />
          <span className="text-[9.5px] font-bold tracking-[0.2em] text-muted uppercase">{chapter.kicker}</span>
        </div>

        <h2 className="mt-5 text-[clamp(27px,3.2vw,42px)] text-balance">{chapter.title}</h2>

        {chapter.blocks.map((block, i) => (
          <GuideBlock key={`${chapter.id}-${i}`} block={block} />
        ))}
      </div>
    </section>
  );
}
