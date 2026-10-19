import { CHAPTERS, GUIDE_META } from "../../lib/guide-content";

const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "").replace(/\/$/, "");

/**
 * Route-level structured data for /guide.
 *
 * The homepage graph in index.html describes the organisation and the Book;
 * this adds what only the guide route can supply: the Article itself, its
 * chapter list as an ItemList (so engines can cite a specific chapter), a
 * HowTo covering the purchase sequence, and a breadcrumb. Kept in one script
 * tag so it is trivial to validate.
 */
export function GuideSchema() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${SITE_URL}/guide#article`,
        headline: "How to Buy Property in Portugal as a Foreigner — The 2026 Blueprint",
        description: GUIDE_META.standfirst,
        inLanguage: "en",
        isAccessibleForFree: true,
        articleSection: CHAPTERS.map((c) => c.title),
        about: [
          { "@type": "Thing", name: "Buying property in Portugal" },
          { "@type": "Thing", name: "IMT property transfer tax" },
          { "@type": "Thing", name: "Portuguese residency visas" },
        ],
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide` },
        image: `${SITE_URL}/images/facade.webp`,
        timeRequired: "PT20M",
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/guide#chapters`,
        name: "Chapters",
        numberOfItems: CHAPTERS.length,
        itemListElement: CHAPTERS.map((chapter, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: chapter.title,
          url: `${SITE_URL}/guide#${chapter.id}`,
        })),
      },
      {
        "@type": "HowTo",
        "@id": `${SITE_URL}/guide#howto`,
        name: "How to buy property in Portugal as a foreign buyer",
        description:
          "The end-to-end sequence a non-resident buyer follows to purchase property in Portugal, from tax number to deed.",
        inLanguage: "en",
        totalTime: "P90D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Get a Portuguese tax number (NIF)",
            text: "Obtain a NIF, remotely through a fiscal representative if you are outside the EU. Nothing can be signed or bought without it.",
            url: `${SITE_URL}/guide#paperwork`,
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Open a Portuguese bank account and confirm financing",
            text: "Open a local account for the deposit and tax payments, and secure a mortgage pre-approval in principle if you are borrowing — banks typically lend 60–80% to non-residents.",
            url: `${SITE_URL}/guide#financing`,
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Define the brief and search on- and off-market",
            text: "Fix budget, area and objective, then search both listed and off-market stock. A buyer's agent represents only your side of the transaction.",
            url: `${SITE_URL}/guide#location`,
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Run due diligence before committing",
            text: "Check the caderneta predial, certidão permanente, licence of use and condominium debts through your lawyer before any binding signature.",
            url: `${SITE_URL}/guide#diligence`,
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Sign the CPCV and pay the deposit",
            text: "The promissory contract (contrato de promessa de compra e venda) fixes the price and conditions. The deposit is typically 10–20% and is legally at risk if you walk away.",
            url: `${SITE_URL}/guide#timeline`,
          },
          {
            "@type": "HowToStep",
            position: 6,
            name: "Pay IMT and stamp duty, then sign the deed",
            text: "Pay IMT — a flat 7.5% for buyers who are not Portuguese tax residents — plus 0.8% stamp duty before the escritura, which is signed before a notary in person or by power of attorney.",
            url: `${SITE_URL}/guide#costs`,
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/guide#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Buying property in Portugal — 2026 guide",
            item: `${SITE_URL}/guide`,
          },
        ],
      },
    ],
  };

  return <script type="application/ld+json">{JSON.stringify(graph)}</script>;
}
