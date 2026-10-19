/**
 * Long-form web version of the 2026 buyer's guide.
 * Same substance as the PDF, restructured for reading on screen.
 */

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "check"; items: string[] }
  | { kind: "callout"; title: string; text: string }
  | { kind: "table"; head: string[]; rows: string[][]; foot?: string }
  | { kind: "steps"; items: { title: string; text: string }[] };

export interface Chapter {
  id: string;
  num: string;
  title: string;
  short: string;
  kicker: string;
  blocks: Block[];
}

export const GUIDE_META = {
  eyebrow: "The 2026 Portugal Property Blueprint",
  titleA: "Buying property",
  titleB: "in Portugal.",
  standfirst:
    "Costs, taxes, residency, timelines and the five mistakes that cost foreign buyers the most money — written for international buyers by consultants who do this every week. Updated for the 2026 rules, including the flat 7.5% IMT for non-tax-resident buyers.",
  readTime: "20 min read",
  chapterCount: "12 chapters",
  updated: "Updated 2026",
  disclaimer:
    "This guide is general information, not legal, tax or financial advice. Figures are indicative and subject to change. Always obtain independent professional advice before committing to a purchase.",
};

export const CHAPTERS: Chapter[] = [
  {
    id: "eligibility",
    num: "01",
    title: "Can you buy? Yes — and no visa is required to own",
    short: "Eligibility",
    kicker: "Eligibility",
    blocks: [
      {
        kind: "p",
        text: "Portugal places no restrictions on foreign ownership of property. Nationality and residency are irrelevant to your right to buy: an American, a Brazilian, a Canadian and a German all buy on exactly the same legal terms as a Portuguese citizen.",
      },
      {
        kind: "p",
        text: "Owning property does not by itself grant you residency, and residency is not required to own. They are two separate tracks, and it is worth deciding early which ones you actually need.",
      },
      { kind: "h3", text: "What you do need" },
      {
        kind: "check",
        items: [
          "A NIF — Portuguese tax identification number. Non-negotiable for any transaction.",
          "A Portuguese bank account — practically essential for the transaction, utilities and taxes.",
          "A lawyer acting for you — independent of the seller and of the agency.",
          "Proof of funds — banks and notaries apply strict anti-money-laundering checks. Have documentation of the origin of your funds ready before you make an offer.",
        ],
      },
      { kind: "h3", text: "What you don't need" },
      {
        kind: "list",
        items: [
          "Residency, a visa, or a Portuguese address.",
          "To be physically present in Portugal at any stage — see chapter 07.",
          "A Portuguese company. Buying through a corporate structure occasionally makes sense for investors, but for a family home it usually adds cost, not value.",
        ],
      },
    ],
  },
  {
    id: "costs",
    num: "02",
    title: "The real cost of a purchase, line by line",
    short: "True cost",
    kicker: "True cost",
    blocks: [
      {
        kind: "p",
        text: "Your acquisition costs depend heavily on one thing: whether you are a Portuguese tax resident. Since 2026, buyers who are not tax resident in Portugal pay IMT at a flat 7.5% on residential property, rather than the progressive scale. Below is an indicative €750,000 resale home, bought by a non-tax-resident buyer.",
      },
      {
        kind: "table",
        head: ["Item", "Typical range", "On €750,000"],
        rows: [
          ["IMT — non-tax-resident", "7.5% flat", "€56,250"],
          ["IMT — tax resident, own home", "progressive scale", "≈ €39,000"],
          ["Stamp duty", "0.8% of price", "€6,000"],
          ["Notary, deed & registration", "€900–€1,500", "≈ €1,200"],
          ["Legal fees", "1–1.5% (+ VAT)", "≈ €9,000"],
          ["Survey / technical report", "€400–€1,200", "≈ €700"],
          ["Mortgage costs (if financing)", "0.5–1.5% of loan", "≈ €3,000"],
        ],
        foot: "Total extra for a non-tax-resident ≈ €76,000 (≈ 10% of price)",
      },
      {
        kind: "callout",
        title: "The single most under-budgeted number",
        text: "The move to a flat 7.5% IMT for non-tax-residents can add tens of thousands of euros against the old progressive scale on the same property. If a cost estimate you were given predates 2026, assume it is wrong. Confirm your own position with a Portuguese accountant before you commit — tax residency, not nationality, is what decides the rate.",
      },
      { kind: "h3", text: "Costs people forget" },
      {
        kind: "list",
        items: [
          "Currency conversion spread — on a seven-figure transfer this can dwarf your legal fees. Use a specialist FX broker, not your retail bank.",
          "Furnishing and renovation. Portuguese resales frequently come empty, including kitchen appliances.",
          "Condominium arrears in apartment buildings — always request the minutes and accounts.",
          "Annual IMI, plus insurance and, in a condominium, monthly charges.",
        ],
      },
    ],
  },
  {
    id: "taxes",
    num: "03",
    title: "IMT, stamp duty, IMI and AIMI",
    short: "Taxes",
    kicker: "Taxes",
    blocks: [
      { kind: "h3", text: "IMT — property transfer tax" },
      {
        kind: "p",
        text: "Paid by the buyer, before the deed, and always calculated on the higher of the purchase price and the tax authority's rateable value (VPT) — not simply on the price you agreed.",
      },
      {
        kind: "table",
        head: ["Buyer status", "Residential IMT", "Notes"],
        rows: [
          ["Not tax resident in Portugal", "7.5% flat", "Applies from 2026 regardless of property value"],
          ["Tax resident — primary residence", "progressive, 0–6%", "Low-value primary homes can be fully exempt"],
          ["Tax resident — second home", "progressive, higher scale", "No primary-residence relief"],
        ],
        foot: "Land and commercial property are taxed at separate flat rates.",
      },
      {
        kind: "p",
        text: "The distinction is tax residency, not nationality or visa status. A foreign national who has become tax resident in Portugal is on the resident scale; a Portuguese citizen living abroad is not. Confirm your status with an accountant before budgeting.",
      },
      { kind: "h3", text: "Stamp duty (Imposto do Selo)" },
      {
        kind: "p",
        text: "0.8% of the purchase price, paid at the same moment as IMT. If you take a mortgage, a separate stamp duty applies to the loan itself.",
      },
      { kind: "h3", text: "IMI — annual municipal property tax" },
      {
        kind: "p",
        text: "Between 0.3% and 0.45% of the rateable value for urban property, set by each municipality — Lisbon and Cascais sit at the lower end of the band. Payable each year, in one to three instalments. Young families and low-value primary residences may qualify for temporary exemptions.",
      },
      { kind: "h3", text: "AIMI — the “wealth” surcharge" },
      {
        kind: "p",
        text: "An additional levy on the portion of your Portuguese rateable property value above €600,000 per owner (€1.2M for a couple filing jointly), starting at 0.7%. It affects genuinely high-value portfolios, not the average buyer — but it is worth structuring ownership with it in mind.",
      },
      {
        kind: "callout",
        title: "If you rent it out",
        text: "Rental income from Portuguese property is taxable in Portugal, typically at a flat 25–28% on the net amount for non-residents, with deductible expenses. Short-term holiday letting (Alojamento Local) is licensed at municipal level and restricted in parts of Lisbon — check before you count on that yield.",
      },
    ],
  },
  {
    id: "residency",
    num: "04",
    title: "Residency, the Golden Visa, and where property actually fits",
    short: "Residency",
    kicker: "Residency",
    blocks: [
      {
        kind: "p",
        text: "Buying property in Portugal does not grant you residency. Since October 2023, real estate has been removed entirely from the list of qualifying Golden Visa investments — purchasing a home, an apartment or a property fund no longer earns a residence permit, at any price point.",
      },
      {
        kind: "p",
        text: "If you have been told otherwise by anyone selling you a property, treat every other claim they make with the same scepticism.",
      },
      { kind: "h3", text: "What still works" },
      {
        kind: "table",
        head: ["Route", "Who it suits", "Core requirement"],
        rows: [
          ["Golden Visa", "Passive investors", "Qualifying funds, research, cultural or job-creation investment — not property"],
          ["D7", "Retirees, passive income", "Stable, recurring income from outside Portugal"],
          ["D8 (digital nomad)", "Remote workers, freelancers", "Remote income of roughly €3,680/month gross in 2026, indexed to the minimum wage"],
          ["D2", "Entrepreneurs", "A viable business or investment plan in Portugal"],
        ],
        foot: "Thresholds are revised annually. Verify current figures with an immigration lawyer before applying.",
      },
      { kind: "h3", text: "The tax side: IFICI, or “NHR 2.0”" },
      {
        kind: "p",
        text: "The old Non-Habitual Resident regime closed to new entrants. Its successor, IFICI (Tax Incentive for Scientific Research and Innovation), offers a 20% flat rate on qualifying Portuguese employment and self-employment income and an exemption on most foreign-sourced income, for ten years. Eligibility is narrower than NHR: it is tied to specific qualifying activities and professions, and pensions are no longer covered.",
      },
      {
        kind: "callout",
        title: "Sequence matters",
        text: "Your tax residency status determines your IMT rate on purchase (7.5% flat if non-resident) and your income tax treatment afterwards. If residency is part of your plan, decide the order of operations with an accountant before you sign anything — not after.",
      },
      {
        kind: "p",
        text: "We are not immigration lawyers and we do not sell visas. We coordinate with specialists who do, and we will tell you plainly when a property purchase has nothing to do with the residency outcome you are hoping for.",
      },
    ],
  },
  {
    id: "timeline",
    num: "05",
    title: "From first viewing to keys in hand",
    short: "Timeline",
    kicker: "Timeline",
    blocks: [
      {
        kind: "p",
        text: "A straightforward cash purchase takes six to ten weeks from accepted offer to deed. With a mortgage, plan on ten to sixteen.",
      },
      {
        kind: "table",
        head: ["Stage", "What happens", "Typical time"],
        rows: [
          ["Brief & shortlist", "We define criteria and filter the market, including off-market stock", "1–2 weeks"],
          ["Viewings", "An efficient trip, or video tours with detailed reports", "2–4 days"],
          ["Offer & negotiation", "Written offer, counters, agreement on price and conditions", "2–10 days"],
          ["Due diligence", "Your lawyer checks title, licences, debts, planning", "1–3 weeks"],
          ["CPCV (promissory contract)", "Signed; deposit of 10–20% paid; penalties become binding", "1 day"],
          ["Mortgage completion", "Valuation, formal offer, loan documents", "4–8 weeks"],
          ["Deed (escritura)", "Notary; balance paid; keys handed over", "1 day"],
          ["Post-deed", "Registration, utilities, tax address, insurance", "1–2 weeks"],
        ],
      },
      {
        kind: "callout",
        title: "The CPCV is the real commitment",
        text: "Once the promissory contract is signed, a buyer who walks away normally forfeits the deposit, and a seller who walks away typically owes double it. Everything you want checked must be checked before that signature — or written into it as a condition.",
      },
    ],
  },
  {
    id: "paperwork",
    num: "06",
    title: "NIF, bank account, lawyer",
    short: "Paperwork",
    kicker: "Paperwork",
    blocks: [
      {
        kind: "steps",
        items: [
          {
            title: "The NIF",
            text: "Your Portuguese tax number. Residents outside the EU generally need a fiscal representative in Portugal to obtain one; your lawyer or an accountant can act in that role. Allow a few days to two weeks. Everything downstream — bank, utilities, deed — depends on it, so start here.",
          },
          {
            title: "The bank account",
            text: "Opening remotely is possible with most Portuguese banks but slower than in person; expect certified ID, proof of address, proof of income and source-of-funds documentation. Two weeks is realistic. Open it early: sellers expect a Portuguese bank cheque or transfer at the deed.",
          },
          {
            title: "The lawyer",
            text: "Instruct an independent lawyer who represents only you — not the seller, and not the agency. Typical fees run 1–1.5% of the price plus VAT. Their job is due diligence, drafting and reviewing the CPCV, coordinating the notary, and protecting your deposit.",
          },
        ],
      },
      {
        kind: "callout",
        title: "What we handle for you",
        text: "Introductions to vetted lawyers, accountants, FX brokers and mortgage intermediaries who work with international buyers daily — and the coordination between them, so you are not chasing five parties across time zones.",
      },
    ],
  },
  {
    id: "remote",
    num: "07",
    title: "Buying without flying over",
    short: "Remote purchase",
    kicker: "Remote purchase",
    blocks: [
      {
        kind: "p",
        text: "A significant share of our clients complete their purchase from abroad. It is routine, provided the structure is right from day one.",
      },
      { kind: "h3", text: "The power of attorney" },
      {
        kind: "p",
        text: "You grant a specific power of attorney to your lawyer, authorising them to sign the CPCV and the deed on your behalf. It is signed in front of a notary in your own country, then apostilled (Hague Convention) or legalised at a Portuguese consulate, and translated. Budget two to three weeks for the round trip of documents — this is the step that most often delays a remote deal.",
      },
      { kind: "h3", text: "How we replace being there" },
      {
        kind: "list",
        items: [
          "Live video viewings, walked at your pace, with the questions you'd ask in person.",
          "A written property report: condition, orientation, noise, light at different hours, the street and the neighbours.",
          "Independent technical survey where the age or condition of the building warrants one.",
          "Drone or street-level footage of the surroundings, not just the interior.",
        ],
      },
      {
        kind: "callout",
        title: "Our rule",
        text: "We will tell you when a property should not be bought sight-unseen. Some homes photograph better than they live, and it is our job to say so.",
      },
    ],
  },
  {
    id: "financing",
    num: "08",
    title: "Mortgages for non-residents",
    short: "Financing",
    kicker: "Financing",
    blocks: [
      {
        kind: "p",
        text: "Portuguese banks lend to non-residents regularly. Terms are tighter than for residents, but perfectly workable.",
      },
      {
        kind: "table",
        head: ["", "Resident", "Non-resident"],
        rows: [
          ["Loan-to-value", "up to 90%", "60–80%"],
          ["Max term", "to age 75–80", "often shorter"],
          ["Debt-to-income cap", "≈ 35% of net income", "≈ 35%, assessed conservatively"],
          ["Rate type", "Euribor-linked or fixed", "Euribor-linked or fixed"],
        ],
      },
      { kind: "h3", text: "What banks will ask for" },
      {
        kind: "list",
        items: [
          "Passport, NIF, and proof of address.",
          "Last two to three years of tax returns and recent payslips or company accounts.",
          "Six months of bank statements and a full statement of existing debts.",
          "Life and buildings insurance, usually required as a condition of the loan.",
        ],
      },
      {
        kind: "p",
        text: "Get a pre-approval in principle before you start making offers. In competitive segments a financed offer without pre-approval loses to a slower cash offer more often than buyers expect.",
      },
    ],
  },
  {
    id: "location",
    num: "09",
    title: "Lisbon, Cascais, or the West Coast?",
    short: "Location",
    kicker: "Location",
    blocks: [
      { kind: "h3", text: "Lisbon — city living and yield" },
      {
        kind: "p",
        text: "Best for buyers who want walkability, culture and rental demand. Lapa and Príncipe Real for classic townhouses; Alfama and Graça for character at a lower entry; Alcântara and Marvila for buildings with genuine upside. Watch for: short-term rental restrictions, parking, and the true cost of renovating a protected façade.",
      },
      { kind: "h3", text: "Cascais & Estoril — family and coastline" },
      {
        kind: "p",
        text: "The default choice for relocating families: international schools, the marina, thirty minutes to Lisbon and the Atlantic at the end of the road. Deeper resale market, higher entry price, and the strongest year-round international community. Watch for: the difference in feel — and price — between Monte Estoril, Quinta da Marinha and Birre.",
      },
      { kind: "h3", text: "West Coast — space and surf" },
      {
        kind: "p",
        text: "Ericeira through Santa Cruz: land, farmhouses and new builds with ocean views at a fraction of Lisbon pricing. Best for buyers who want square metres, quiet and a project. Watch for: what a plot is actually licensed to build, water and access, and winter isolation in the smaller villages.",
      },
      {
        kind: "callout",
        title: "Our advice",
        text: "Rent for a season in your shortlisted area before you commit, if your timeline allows it. It is the cheapest due diligence available.",
      },
    ],
  },
  {
    id: "diligence",
    num: "10",
    title: "What gets checked before you sign",
    short: "Due diligence",
    kicker: "Due diligence",
    blocks: [
      {
        kind: "check",
        items: [
          "Caderneta predial — the tax register entry: does the described property match what you viewed?",
          "Certidão permanente do registo predial — title, ownership history, mortgages, liens, seizures, rights of way.",
          "Licença de utilização — the habitation licence, and whether the current use is the licensed use.",
          "Ficha técnica de habitação — the technical datasheet for property built or refurbished after 2004.",
          "Energy certificate — legally required to market a property; also a proxy for running costs.",
          "Illegal alterations — closed balconies, converted basements, added floors. Extremely common, and the buyer inherits the problem.",
          "Condominium — accounts, minutes, reserve fund, arrears, and any approved future works.",
          "Planning — what can be built next door, and whether that sea view is protected.",
          "Tenancies — old Portuguese leases can be near-impossible to end. Verify occupancy status in writing.",
        ],
      },
      {
        kind: "callout",
        title: "Non-negotiable",
        text: "Nothing is signed and no deposit leaves your account until your own lawyer has cleared the title in writing.",
      },
    ],
  },
  {
    id: "mistakes",
    num: "11",
    title: "The five most expensive mistakes",
    short: "Mistakes",
    kicker: "Mistakes",
    blocks: [
      {
        kind: "steps",
        items: [
          {
            title: "Budgeting only for the asking price",
            text: "Buyers who ignore the 6–8% in costs end up cutting the renovation budget instead — and live with the compromise for years. Model the total before you shortlist.",
          },
          {
            title: "Using the seller's lawyer, or no lawyer",
            text: "The single most costly shortcut in the process. Independent representation costs about 1% and is the only thing standing between you and an unlicensed extension or an undisclosed lien.",
          },
          {
            title: "Signing the CPCV to “secure” the property",
            text: "The promissory contract is binding, and the deposit is genuinely at risk. Rushing it to beat another buyer is how due diligence gets skipped.",
          },
          {
            title: "Believing the rental yield in the listing",
            text: "Projected returns rarely include vacancy, management, IMI, insurance, condominium charges, tax or licensing limits. Ask for twelve months of actual figures, or discount the projection heavily.",
          },
          {
            title: "Buying the house and ignoring the street",
            text: "Renovation fixes a kitchen. It does not fix noise at 2am, no parking, a school run that takes forty minutes, or the crane going up next door. Visit at different hours and on different days — or have someone do it for you.",
          },
        ],
      },
    ],
  },
  {
    id: "next",
    num: "12",
    title: "Where we come in",
    short: "Next step",
    kicker: "Next step",
    blocks: [
      {
        kind: "p",
        text: "We are a two-person team, on purpose. You deal with Bernardo and Diana directly — never an assistant, never whoever happens to be free that week. Most of our clients come from abroad, and most of our new clients come from the last ones.",
      },
      {
        kind: "check",
        items: [
          "A 30-minute discovery call: what you want, what it realistically costs, and whether Portugal is the right move at all.",
          "A curated shortlist — including off-market — with video tours if you're abroad.",
          "Negotiation on your behalf, with local market data behind every number.",
          "Coordination of lawyer, notary, bank and contractors right through to the keys, and after.",
        ],
      },
      {
        kind: "p",
        text: "Bring your questions. There is no obligation and no fee to you — in Portugal our commission is paid by the seller side.",
      },
    ],
  },
];
