interface LeadFields {
  name?: string | null;
  email: string;
  phone?: string | null;
  country?: string | null;
  intent?: string | null;
  budget?: string | null;
  timeline?: string | null;
  area?: string | null;
  message?: string | null;
  source: string;
  locale: string;
}

const GOLD = "#bb985a";
const INK = "#101211";

function row(label: string, value?: string | null) {
  if (!value) return "";
  return `<tr>
    <td style="padding:9px 0;border-bottom:1px solid #eceae4;color:#6b706b;font-size:12px;text-transform:uppercase;letter-spacing:.08em;width:150px;vertical-align:top">${label}</td>
    <td style="padding:9px 0;border-bottom:1px solid #eceae4;color:${INK};font-size:15px">${escapeHtml(value)}</td>
  </tr>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Internal notification with everything needed to call the lead back. */
export function ownerNotificationHtml(lead: LeadFields) {
  const heat =
    lead.source === "guide"
      ? "Guide download"
      : lead.timeline === "asap" || lead.timeline === "1-3m"
        ? "HOT — moving soon"
        : "New enquiry";

  const wa = lead.phone ? lead.phone.replace(/[^\d]/g, "") : "";

  return `<!doctype html><html><body style="margin:0;background:#f8f6f1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif">
  <div style="max-width:620px;margin:0 auto;padding:28px 20px">
    <div style="background:${INK};padding:22px 26px">
      <div style="color:${GOLD};font-size:10px;letter-spacing:.22em;text-transform:uppercase;font-weight:700">BleckTeam · ${heat}</div>
      <div style="color:#fff;font-size:22px;margin-top:8px">${escapeHtml(lead.name || lead.email)}</div>
    </div>
    <div style="background:#fff;padding:8px 26px 24px">
      <table style="width:100%;border-collapse:collapse">
        ${row("Name", lead.name)}
        ${row("Email", lead.email)}
        ${row("Phone", lead.phone)}
        ${row("Country", lead.country)}
        ${row("Looking to", lead.intent)}
        ${row("Budget", lead.budget)}
        ${row("Timeline", lead.timeline)}
        ${row("Area", lead.area)}
        ${row("Message", lead.message)}
        ${row("Source", lead.source)}
        ${row("Language", lead.locale.toUpperCase())}
      </table>
      <div style="margin-top:22px">
        <a href="mailto:${escapeHtml(lead.email)}" style="display:inline-block;background:${GOLD};color:#fff;padding:13px 20px;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase">Reply by email</a>
        ${wa ? `<a href="https://wa.me/${wa}" style="display:inline-block;margin-left:8px;border:1px solid ${INK};color:${INK};padding:12px 20px;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase">WhatsApp</a>` : ""}
      </div>
    </div>
  </div></body></html>`;
}

const COPY = {
  en: {
    subject: "Thanks for reaching out — BleckTeam",
    hi: (n: string) => `Hello ${n},`,
    body: [
      "Thank you for getting in touch. Your enquiry has landed with us and one of us — Bernardo or Diana — will come back to you personally within one business day.",
      "In the meantime, if anything is urgent you can reach us straight away on WhatsApp.",
    ],
    cta: "Message us on WhatsApp",
    sign: "Bernardo & Diana Bleck<br/>BleckTeam · Real Estate Consultants",
  },
  pt: {
    subject: "Obrigado pelo seu contacto — BleckTeam",
    hi: (n: string) => `Olá ${n},`,
    body: [
      "Obrigado pelo seu contacto. O seu pedido chegou até nós e um de nós — Bernardo ou Diana — responderá pessoalmente dentro de um dia útil.",
      "Entretanto, se for urgente, pode falar connosco de imediato por WhatsApp.",
    ],
    cta: "Falar por WhatsApp",
    sign: "Bernardo & Diana Bleck<br/>BleckTeam · Real Estate Consultants",
  },
};

/** Auto-reply that keeps the lead warm while Bernardo gets back to them. */
export function leadConfirmationHtml(lead: LeadFields, guideUrl?: string) {
  const t = lead.locale === "pt" ? COPY.pt : COPY.en;
  const first = (lead.name || "").split(" ")[0] || (lead.locale === "pt" ? "olá" : "there");

  const guideBlock = guideUrl
    ? `<p style="margin:0 0 18px">
         <a href="${guideUrl}" style="display:inline-block;background:${INK};color:#fff;padding:14px 22px;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase">
           ${lead.locale === "pt" ? "Descarregar o guia" : "Download the guide"}
         </a>
       </p>`
    : "";

  return `<!doctype html><html><body style="margin:0;background:#f8f6f1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px">
    <div style="background:${INK};padding:26px">
      <div style="color:#fff;font-size:15px;letter-spacing:.34em;font-weight:600">BLECKTEAM</div>
      <div style="color:${GOLD};font-size:9px;letter-spacing:.2em;margin-top:6px;text-transform:uppercase">Real Estate Consultants</div>
    </div>
    <div style="background:#fff;padding:30px 26px;color:${INK};font-size:15px;line-height:1.7">
      <p style="margin:0 0 16px">${t.hi(escapeHtml(first))}</p>
      ${t.body.map((p) => `<p style="margin:0 0 16px;color:#4a4f4a">${p}</p>`).join("")}
      ${guideBlock}
      <p style="margin:0 0 22px">
        <a href="https://wa.me/351962804636" style="display:inline-block;border:1px solid ${GOLD};color:${GOLD};padding:13px 21px;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase">${t.cta}</a>
      </p>
      <p style="margin:0;color:#6b706b;font-size:14px">${t.sign}<br/>
      <a href="tel:+351962804636" style="color:#6b706b">+351 962 804 636</a></p>
    </div>
  </div></body></html>`;
}

export function confirmationSubject(locale: string) {
  return (locale === "pt" ? COPY.pt : COPY.en).subject;
}
