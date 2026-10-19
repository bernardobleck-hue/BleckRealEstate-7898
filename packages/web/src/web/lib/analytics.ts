/**
 * Conversion tracking shim.
 *
 * The site already loads Runable's own page analytics. This adds *conversion*
 * events on top, in a vendor-neutral way: every event is pushed to
 * window.dataLayer (Google Tag Manager), forwarded to gtag (GA4) and to fbq
 * (Meta Pixel) when those globals exist. Nothing is sent and nothing breaks
 * when no tag manager is installed — so the code can ship before the tracking
 * IDs are configured.
 *
 * To activate: add the GTM (or GA4) snippet to index.html, then map these
 * event names to conversions in the tag manager UI.
 */

type EventName =
  | "lead_submitted" // multi-step enquiry form completed
  | "guide_requested" // email given for the PDF guide
  | "guide_pdf_downloaded" // download button clicked
  | "whatsapp_click"
  | "phone_click"
  | "exit_intent_shown"
  | "guide_page_view";

interface Win extends Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
}

/** Fire a conversion event to whichever tag manager is present. */
export function track(event: EventName, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  const w = window as Win;

  try {
    (w.dataLayer ??= []).push({ event, ...params });
    w.gtag?.("event", event, params);

    // Map our events onto Meta's standard event names where one exists.
    const metaEvent = event === "lead_submitted" ? "Lead" : event === "guide_requested" ? "CompleteRegistration" : null;
    if (metaEvent) w.fbq?.("track", metaEvent, params);
  } catch {
    // Analytics must never break the page.
  }
}
