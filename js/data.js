/* ============================================================================
 * Imperial Economy Dashboard — Editable Data Module
 * ----------------------------------------------------------------------------
 * THIS IS THE FILE THE WEEKLY SCHEDULED UPDATER EDITS.
 *
 * Everything visible on the dashboard that may shift week-to-week lives here.
 * The HTML/CSS/render code does not need to be touched for routine updates —
 * change values in this file, commit, and GitHub Pages will redeploy.
 *
 * Schema overview (keys on the exported `DASHBOARD_DATA` object):
 *
 *   meta:                Operation banner + subjugation meter (0–100).
 *   imperialControl:     Four hero KPI cards (compliant polities, theatres,
 *                        resistance cells, levy yield). Each card: {label,
 *                        value, delta, deltaTone: 'up'|'down'|'flat'}.
 *   theatreReadiness:    Sidebar progress bars. Array of {label, value}.
 *                        value is 0–100.
 *   directives:          Sidebar ordered list. Array of short strings.
 *   energyChokepoints:   {nodes: [...], mapNodes: [...], citation: {...}}.
 *                          nodes      — Node Dossier rows: {name, role, status,
 *                                       detail (optional, citation-grounded)}.
 *                          mapNodes   — Threat-map dots: {id, label, status,
 *                                       x, y}. x/y are CSS percentages.
 *                          citation   — {label, url} for the source line.
 *   debt:                Four debt gauges (0–100). Array of {label, value,
 *                        sub}. Plus debtCitations: [{label, url}, ...].
 *   governance:          {weakSpots: [{label, status}], dossier: '...',
 *                        citation: {label, url}}.
 *   aiSurveillance:      {terminal: [string,...], tools: [{label, value%}],
 *                        quotes: [string,...], citations: [{label, url}, ...]}.
 *   crypto:              {nodes: [{name, role, status, detail}],
 *                        gauges: [{label, value, sub}],
 *                        citations: [{label, url}, ...],
 *                        dossier: '...'}.
 *   rebelResistanceIndex:
 *                        Array of five domain cards (Energy, Debt, Governance,
 *                        Crypto, AI). Each: {id, name, score (0–100), blurb,
 *                        mech: [string,...]}. Tier coloring is derived from
 *                        score by app.js — do not hand-set tiers here.
 *   sources:             Optional free-text notes the weekly updater can use
 *                        to record where numbers came from. Not rendered.
 *
 * Weekly update checklist (typical edits):
 *   1. Bump `meta.subjugationIndex` and `meta.subjugationTier` if posture
 *      shifted.
 *   2. Refresh `imperialControl` KPI values + deltas.
 *   3. Adjust `theatreReadiness` bar values.
 *   4. Update `energyChokepoints.nodes[].status` and matching `mapNodes`.
 *   5. Re-score `debt` gauges and `aiSurveillance.tools` percentages.
 *   6. Re-score `rebelResistanceIndex` domains; refresh `blurb` and `mech`
 *      bullets if the rationale changed.
 *   7. Re-score crypto gauges and refresh detail / status text.
 *   8. Add a dated entry to `sources` with rationale/citations for the cycle.
 *
 * Keep content high-level and analytical. Do NOT add operational targeting
 * data, personal information, or anything that breaks the in-universe framing.
 * ==========================================================================*/

const DASHBOARD_DATA = {
  meta: {
    operation: 'ASHEN HEEL',
    authority: 'Lord Vader',
    clearance: 'SITH-OMEGA',
    sector: 'Sector 001 · Earth Annex Protocol · reading current to 2026-08-24',
    subjugationIndex: 88,
    subjugationTier: 'CRITICAL',
  },

  imperialControl: [
    { label: 'Compliant Polities',   value: '122',    delta: '▲ 1 this cycle',     deltaTone: 'up'   },
    { label: 'Theatres Encircled',   value: '16 / 17', delta: '▲ 1 this cycle',     deltaTone: 'up'   },
    { label: 'Resistance Cells',     value: '309',    delta: '▲ 0.3% churn',       deltaTone: 'flat' },
    { label: 'Levy Yield',           value: '¤1.93T', delta: '▲ 0.5% q/q',         deltaTone: 'up'   },
  ],

  theatreReadiness: [
    { label: 'Fleet Posture',         value: 96 },
    { label: 'Economic Grip',         value: 88 },
    { label: 'Surveillance Mesh',     value: 75 },
    { label: 'Compliance Engines',    value: 55 },
    { label: 'Crypto Perimeter',      value: 85 },
    { label: 'Insurgent Liquidity',   value: 31 },
  ],

  directives: [
    'Hormuz remains in the critical-risk baseline: Reuters/Kpler counted only 7 commodity ships on 21 Aug versus roughly 130–140 before the war; Bab el-Mandeb fell to 23 from 34 two days earlier. IEA’s 12 Aug report still finds reopening elusive and supply shortfall risk elevated.',
    'Prepare countermeasures for rerouting and black-flagged shipping around the Strait.',
    'Press sovereign debt advantage as US fiscal credibility erodes and EM restructurings open.',
    'Exploit governance fractures.',
    'Tighten the crypto regulatory perimeter via MiCA (EU) wind-down enforcement and OFAC/secondary-sanctions signaling; harden stablecoin and exchange chokepoints.',
    'Trace rebel digital reserves through stablecoin issuers.',
    'Saturate civilian biometrics across DHS theatres.',
  ],

  energyChokepoints: {
    nodes: [
      { name: 'Strait of Hormuz',     role: 'Reuters/Kpler (21 Aug): 7 commodity ships vs roughly 130–140 pre-war; IEA (12 Aug): reopening remains elusive and regional exports remain constrained', status: 'severed' },
      { name: 'Strait of Malacca',    role: '23.2 mb/d · largest oil flow (1H25); rising geopolitical risk',     status: 'pressured' },
      { name: 'Suez / SUMED',         role: '4.9 mb/d · ~half of 2023 levels; transits still near multi-year lows', status: 'pressured' },
      { name: 'Bab el-Mandeb',        role: 'Reuters/Kpler (21 Aug): 23 commodity ships vs 34 on each of the prior two days; Red Sea diversion and war-risk costs keep traffic below baseline', status: 'severed'   },
      { name: 'Cape of Good Hope',    role: 'Reroute institutionalized; +~2 weeks transit and elevated bunker burn', status: 'held'  },
    ],
    mapNodes: [
      { id: 'n1', label: 'Hormuz · severed',            status: 'severed',   x: 62, y: 47 },
      { id: 'n2', label: 'Malacca · pressured',         status: 'pressured', x: 76, y: 55 },
      { id: 'n3', label: 'Suez / SUMED · pressured',    status: 'pressured', x: 54, y: 42 },
      { id: 'n4', label: 'Bab el-Mandeb · severed',     status: 'severed',   x: 57, y: 52 },
      { id: 'n5', label: 'Cape of Good Hope · held',    status: 'held',      x: 50, y: 72 },
    ],
    citation: {
      label: 'Reuters/Kpler (2026-08-21) single-digit Hormuz/Bab el-Mandeb traffic · IEA (2026-08-12) Oil Market Report · EIA (2026-08-12) security data · UN/ITC (2026-08-04) trade-flow losses',
      url: 'https://www.iea.org/reports/oil-market-report-august-2026',
    },
    citation10: {
      label: 'Reuters/Kpler · Hormuz crossings hover in single digits; Bab el-Mandeb traffic slips (21 Aug 2026)',
      url: 'https://www.reuters.com/world/middle-east/hormuz-ship-crossings-hover-single-digits-data-shows-2026-08-21/',
    },
    citation3: {
      label: 'Reuters via U.S. News · Houthis threaten Israeli shipping; Bab el-Mandeb traffic still below pre-Oct 2023 (2026-06-08)',
      url: 'https://www.usnews.com/news/world/articles/2026-06-08/yemens-iran-backed-houthis-threaten-israeli-shipping-in-the-red-sea',
    },
    citation2: {
      label: 'U.S. Maritime Administration · Advisory 2026-006 (Red Sea / Bab el-Mandeb risk, expires 22 Sep 2026)',
      url: 'https://www.maritime.dot.gov/msci/2026-006-red-sea-bab-el-mandeb-strait-gulf-aden-arabian-sea-and-somali-basin-houthi-attacks',
    },
    citation4: {
      label: 'U.S. Treasury/OFAC · Hormuz insurance scheme and shadow-fleet sanctions (29 Jul 2026)',
      url: 'https://home.treasury.gov/news/press-releases/sb0581',
    },
    citation5: {
      label: 'Reuters · Red Sea / Caspian spillover and Houthi attacks on Saudi oil sites (25 Jul 2026)',
      url: 'https://www.reuters.com/world/asia-pacific/iran-war-spreads-red-sea-caspian-gulf-quiet-us-forgoes-strikes-2026-07-25/',
    },
    citation6: {
      label: 'IEA · Oil Market Report — August 2026 (12 Aug 2026)',
      url: 'https://www.iea.org/reports/oil-market-report-august-2026',
    },
    citation7: {
      label: 'U.S. EIA · Global Energy Security Data / STEO (12 Aug 2026)',
      url: 'https://www.eia.gov/outlooks/steo/report/energysecurity/article.php',
    },
    citation8: {
      label: 'UN News / ITC · Hormuz disruption cuts regional exports (4 Aug 2026)',
      url: 'https://news.un.org/en/story/2026/08/1168074',
    },
    citation9: {
      label: 'Reuters · IEA sees 1.8 mb/d Q3 deficit as Hormuz reopening remains elusive (12 Aug 2026)',
      url: 'https://www.reuters.com/business/energy/iea-slashes-2026-supply-forecast-hormuz-reopening-remains-elusive-2026-08-12/',
    },
  },

  debt: [
    { label: 'Sovereign Rollovers',   value: 96, sub: 'Reuters (18 Aug): U.S. 30-year yields rose above 5%, Japan’s 10-year reached a three-decade high, and long-end borrowing costs hit multi-year peaks amid debt and geopolitical stress' },
    { label: 'Projected Debt 2029',   value: 100, sub: 'IMF: 100% of GDP by 2029, one year earlier than April 2025 path' },
    { label: 'LIC Debt Distress',     value: 78, sub: 'World Bank: 32 low- and middle-income countries (40%) in distress or high risk; higher rates could deepen the count (Reuters, 22 Jul 2026)' },
    { label: 'Reserve Hierarchy',     value: 96, sub: 'Reuters (18 Aug): U.S. term premium near 80 bp, foreign Treasury holdings declined in June, and investors demanded more compensation for fiscal and policy risk' },
  ],

  debtCitations: [
    {
      label: 'IMF · Fiscal Monitor (April 2026)',
      url: 'https://www.imf.org/en/publications/fm/issues/2026/04/15/fiscal-monitor-april-2026',
    },
    {
      label: 'IMF · LIC Debt Sustainability list (as of 31 Mar 2026)',
      url: 'https://www.imf.org/external/pubs/ft/dsa/dsalist.pdf',
    },
    {
      label: 'World Bank · International Debt Report 2024',
      url: 'https://www.worldbank.org/en/news/press-release/2024/12/03/developing-countries-paid-record-1-4-trillion-on-foreign-debt-in-2023',
    },
    {
      label: 'CNBC · 30-year Treasury yield touches 5.197% (19 May 2026)',
      url: 'https://www.cnbc.com/2026/05/19/treasurys-yields-inflation-traders-fed-interest-rates.html',
    },
    {
      label: 'Reuters · Venezuela seeks swift restructuring; claims approaching $200B (9 Jul 2026)',
      url: 'https://www.reuters.com/world/americas/quake-hit-venezuelas-push-swift-debt-deal-raises-fears-future-crisis-2026-07-09/',
    },
    {
      label: 'Reuters · Fitch projects developed-market debt at $75.8T / 104% of GDP in 2026 (21 Jul 2026)',
      url: 'https://www.reuters.com/business/developed-market-debt-hit-record-758-trillion-shocks-spending-pressures-mount-2026-07-21/',
    },
    {
      label: 'Reuters · World Bank warns 32 LMICs are in debt distress or high risk (22 Jul 2026)',
      url: 'https://www.reuters.com/world/china/escalating-middle-east-war-could-slash-global-growth-13-2026-world-bank-chief-2026-07-22/',
    },
    {
      label: 'Institute of International Finance · Global Debt Monitor update (5 Aug 2026)',
      url: 'https://www.iif.com/Key-Topics/Sovereign-Debt/Monitors',
    },
    {
      label: 'Reuters · Global bond markets put governments on notice over fiscal stress (18 Aug 2026)',
      url: 'https://www.reuters.com/world/china/selling-grips-bond-markets-us-japan-inflation-fiscal-worries-take-hold-2026-08-18/',
    },
  ],

  governance: {
    weakSpots: [
      { label: '54 countries declined vs 35 improved (2025)', status: 'EXPLOIT' },
      { label: '20th consecutive year of global decline',     status: 'AMPLIFY' },
      { label: 'Yemen: 16 Houthi attacks on 7 oil facilities / 6 tankers (13 Jul–14 Aug)', status: 'OPEN'  },
      { label: '88 Free · 48 Partly Free · 59 Not Free',      status: 'ABSORB'  },
    ],
    dossier: 'Freedom in the World 2026: a 20th consecutive year of global freedom decline. ACLED’s 19 Aug Yemen report records 16 Houthi attacks on seven oil facilities and six tankers, near-daily internal clashes, and a rising risk of renewed civil war; fragmentation keeps coercive leverage and resistance capacity elevated.',
    citation: {
      label: 'Freedom House · Freedom in the World 2026 (March 2026)',
      url: 'https://freedomhouse.org/report/freedom-world/2026/growing-shadow-autocracy',
    },
    citation2: {
      label: 'ACLED · Ukraine war situation update (11–17 Jul 2026; published 22 Jul 2026)',
      url: 'https://acleddata.com/update/ukraine-war-situation-update-11-17-july-2026',
    },
    citation3: {
      label: 'ACLED · Sudan profile: SAF gains, RSF pressure, intensifying drone warfare (13 Aug 2026)',
      url: 'https://acleddata.com/country/sudan',
    },
    citation4: {
      label: 'ACLED · Houthi escalation in Yemen and Saudi Arabia (19 Aug 2026)',
      url: 'https://acleddata.com/report/houthis-ramp-activity-yemen-and-saudi-arabia-avoid-reigniting-civil-war-so-far',
    },
  },

  aiSurveillance: {
    terminal: [
      '[SITH-OMEGA] organizational AI adoption · 88% (HAI 2026)',
      '[WATCHTOWER] Foundation Model Transparency Index avg dropped 58 → 40',
      '[GRID-LENS] 5,427 US data centers · >10× nearest peer; TSMC fabricates almost every leading AI chip',
      '[DATA-CENTER] Reuters (18 Aug): Pennsylvania safeguards, Texas grid pause, and New York 50 MW moratorium show infrastructure control becoming a political chokepoint',
      '[FOTN-2025] 15th consecutive year of internet-freedom decline',
      '[DIRECTIVE] arrests for online expression in 57 countries',
      '[PALANTIR] $1B DHS blanket-purchase agreement active since Feb 2026',
      '[NSPM-11] White House directive (5 Jun 2026) accelerates AI adoption and multi-vendor onboarding across national-security enterprise',
      '[SOVEREIGN-AI] Stanford HAI (14 Jul): local hosting and sovereign clouds reconfigure, but do not remove, dependence on U.S. chips/cloud/models',
      '[WORLD-MODEL] Stanford HAI (27 Jul): continuous spatial observation can create persistent profiles; concentrated control and unsafe deployment remain governance risks',
      '[IRIS-NET] ICE $25.1M sole-source BI2 award (May 2026) · 5M+ booking records · field run Jun 2026',
      '[EU AI ACT] transparency rules took effect 2 Aug 2026: labels for synthetic/deepfake content and biometric/emotion categorisation; enforcement fines up to €15M or 3% turnover',
    ],
    tools: [
      { label: 'Population sentiment · 81% live where arrests occur', value: 81 },
      { label: 'Biometric capture · DHS/ICE iris + facial expansion',  value: 72 },
      { label: 'Content blocking · 69% of internet users',            value: 69 },
      { label: 'Internet/mobile shutdowns · 52% of users',            value: 52 },
      { label: 'AI regulatory trust · only 31% trust US to regulate', value: 31 },
      { label: 'Model transparency · FMTI average score',             value: 40 },
      { label: 'EU AI Act transparency enforcement · effective 2 Aug 2026', value: 63 },
    ],
    quotes: [
      'They have built a mirror that can learn their thoughts. They have not yet realized it can be turned into a window.',
      'The debtor already understands submission. He merely has not yet seen the face of his master.',
      'Energy is not a commodity. It is the spine of obedience.',
      'A corporation is not loyal. But it is afraid of loss. That is sufficient.',
      'The rebel who hides his credits in code is still afraid. Find the fear, and the code will fail him.',
    ],
    citations: [
      {
        label: 'Stanford HAI · 2026 AI Index Report (March 2026)',
        url: 'https://hai.stanford.edu/ai-index/2026-ai-index-report',
      },
      {
        label: 'White House · National Security Presidential Memorandum NSPM-11 (5 Jun 2026)',
        url: 'https://www.whitehouse.gov/presidential-actions/2026/06/national-security-presidential-memorandum-nspm-11/',
      },
      {
        label: 'Breaking Defense · NSPM-11 aims to avoid vendor lock-in / withdrawal risk (8 Jun 2026)',
        url: 'https://breakingdefense.com/2026/06/trump-memo-on-ai-aims-to-avoid-repeat-of-anthropic-debacle/',
      },
      {
        label: 'Freedom House · Freedom on the Net 2025 (PDF)',
        url: 'https://freedomhouse.org/sites/default/files/2025-11/Freedom_on_the_Net_2025_Digital.pdf',
      },
      {
        label: 'NPR · ICE buys iris scanners and biometric tools (27 May 2026)',
        url: 'https://www.npr.org/2026/05/27/nx-s1-5822429/ice-buys-iris-scanners-tech-tools',
      },
      {
        label: 'EU Council · AI Act Digital Omnibus agreement defers high-risk timelines (7 May 2026)',
        url: 'https://www.consilium.europa.eu/en/press/press-releases/2026/05/07/artificial-intelligence-council-and-parliament-agree-to-simplify-and-streamline-rules/',
      },
      {
        label: 'Stanford HAI · AI sovereignty offerings preserve U.S. chip/cloud/model dependence (14 Jul 2026)',
        url: 'https://hai.stanford.edu/news/the-ai-sovereignty-paradox-should-countries-buy-build-or-lease-to-maintain-strategic-control-of-their-ai',
      },
      {
        label: 'Stanford HAI · World models and persistent spatial profiles (27 Jul 2026)',
        url: 'https://hai.stanford.edu/assets/files/hai-issue-brief-the-world-model-and-spatial-intelligence-era.pdf',
      },
      {
        label: 'European Commission · AI Act transparency rules take effect (2 Aug 2026)',
        url: 'https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en',
      },
      {
        label: 'UN Special Rapporteur · Facial Recognition Technology position paper (June 2026)',
        url: 'https://www.ohchr.org/sites/default/files/documents/form/sr-ct-frt-paper-june-2026.pdf',
      },
      {
        label: 'Reuters · Authorities restrict data-centre construction amid AI boom (updated 18 Aug 2026)',
        url: 'https://www.reuters.com/legal/litigation/where-authorities-are-restricting-data-centres-amid-ai-boom-2026-08-18/',
      },
    ],
  },

  crypto: {
    dossier: 'Crypto remains dual-use in the control loop. Post-transition MiCA enforcement, the EU’s 21st Russia-sanctions package, and OFAC’s Iran exchange action tighten exchange and sanctions chokepoints. The SEC’s 18 Aug Regulation Crypto Assets proposal adds tailored exemptions and a safe harbor, improving rule clarity without removing disclosure, antifraud, or market-integrity controls. Self-hosted wallets remain an explicit migration option, but regulated gateways are more central (high-level, non-operational).',
    nodes: [
      { name: 'Stablecoin perimeter',     role: 'GENIUS Act / FinCEN-OFAC rulemaking requires permitted issuers to maintain sanctions programs; issuer-side chokepoints remain central', status: 'severed' },
      { name: 'CLARITY Act market structure', role: 'Cleared Senate Banking Cttee 15–9 (14 May 2026); U.S. market-structure perimeter remains in legislative motion', status: 'pressured' },
      { name: 'FATF stablecoin focus',    role: 'Targeted updates keep stablecoins and Travel Rule effectiveness on the perimeter agenda', status: 'pressured' },
      { name: 'Iran exchange chokepoints', role: 'OFAC’s 7 Aug action targets Shelbit and Aban Tether for Iran-linked sanctions evasion; secondary-risk signaling tightens global compliance posture', status: 'severed' },
      { name: 'Self-custody / P2P',       role: 'ESMA identifies transfer to a self-hosted wallet as an alternative when an EU provider is unauthorised; non-custodial surface persists',     status: 'open'      },
      { name: 'EU third-country perimeter', role: 'EU 21st Russia-sanctions package: transaction bans on 14 crypto platforms and a first-use full third-country crypto-service ban', status: 'severed' },
      { name: 'Jurisdictional arbitrage', role: 'UAE ADGM · Switzerland · Singapore · El Salvador',           status: 'open'      },
    ],
    gauges: [
      { label: 'Sanctions Perimeter',      value: 98, sub: 'OFAC’s 7 Aug action against Shelbit and Aban Tether plus EU transaction bans on 14 crypto platforms widen exchange and secondary-sanctions exposure' },
      { label: 'Stablecoin Concentration', value: 88, sub: 'GENIUS Act issuer sanctions programs, MiCA wind-down, and EU action against Russia-linked crypto rails make authorized issuers and exchanges more central' },
      { label: 'Regulatory Clarity',       value: 81, sub: 'SEC’s 18 Aug Regulation Crypto Assets proposal adds two tailored exemptions and a conditional safe harbor alongside MiCA wind-down and AML/sanctions duties' },
      { label: 'Self-Custody Surface',     value: 54, sub: 'ESMA keeps self-hosted wallets as a migration option, but EU third-country bans and OFAC exchange actions narrow regulated-adjacent paths'    },
    ],
    citations: [
      {
        label: 'U.S. Federal Register · Permitted Payment Stablecoin Issuer AML/CFT proposed rule (10 Apr 2026)',
        url: 'https://www.federalregister.gov/documents/2026/04/10/2026-06963/permitted-payment-stablecoin-issuer-anti-money-launderingcountering-the-financing-of-terrorism',
      },
      {
        label: 'European Securities and Markets Authority (ESMA) · Public statement: MiCA transitional period ends 1 July 2026; unauthorised CASPs should wind down',
        url: 'https://www.esma.europa.eu/sites/default/files/2026-06/ESMA75-113276571-1710_Public_Statement_MiCA_transitional_period_ends.pdf',
      },
      {
        label: 'U.S. Senate Banking Committee · CLARITY Act advanced 15–9 (14 May 2026)',
        url: 'https://www.banking.senate.gov/newsroom/majority/chairman-scott-senate-banking-committee-advance-clarity-act-in-historic-bipartisan-vote',
      },
      {
        label: 'OFAC · FAQ 1257 on secondary-sanctions exposure for Iran-based digital asset exchanges (June 2, 2026)',
        url: 'https://ofac.treasury.gov/faqs/1257',
      },
      {
        label: 'U.S. Treasury · Economic Fury notes freezing of nearly half a billion dollars in regime-linked cryptocurrency (5 Jun 2026)',
        url: 'https://home.treasury.gov/news/press-releases/sb0524',
      },
      {
        label: 'ESMA · Common Supervisory Action on CASP custody resilience (8 Jul 2026)',
        url: 'https://www.esma.europa.eu/press-news/esma-news/esma-launches-common-supervisory-action-casps-digital-operational-resilience',
      },
      {
        label: 'U.S. Treasury/OFAC · Hormuz insurance scheme accepts digital assets; shadow-fleet sanctions (29 Jul 2026)',
        url: 'https://home.treasury.gov/news/press-releases/sb0581',
      },
      {
        label: 'ESMA · MiCA post-transition wind-down and AML/sanctions expectations (updated Aug 2026)',
        url: 'https://www.esma.europa.eu/sites/default/files/2026-06/ESMA75-113276571-1710_Public_Statement_MiCA_transitional_period_ends.pdf',
      },
      {
        label: 'U.S. Treasury/OFAC · GENIUS Act permitted stablecoin issuer sanctions rulemaking (8 Apr 2026; page updated Aug 2026)',
        url: 'https://ofac.treasury.gov/recent-actions/20260408_33',
      },
      {
        label: 'SEC · Regulation Crypto Assets proposed rule (18 Aug 2026; Federal Register publication 21 Aug)',
        url: 'https://www.sec.gov/newsroom/press-releases/2026-76-sec-proposes-new-regulation-crypto-assets',
      },
      {
        label: 'U.S. Treasury/OFAC · Crypto exchanges funding Iran’s IRGC and sanctions evasion (7 Aug 2026)',
        url: 'https://home.treasury.gov/news/press-releases/sb0598',
      },
      {
        label: 'European External Action Service · EU 21st Russia-sanctions package targets crypto operators (24 Jul 2026)',
        url: 'https://www.eeas.europa.eu/delegations/ukraine/21st-package-sanctions-eu-hits-russian-energy-financial-services-and-crypto-hard_en',
      },
    ],
  },

  rebelResistanceIndex: [
    {
      id: 'energy',
      name: 'Energy',
      score: 21,
      blurb: 'Reuters/Kpler (21 Aug) counted 7 commodity ships through Hormuz versus roughly 130–140 before the war; Bab el-Mandeb fell to 23 from 34 on each of the prior two days. Imperial Control 91 · Rebel Resistance 21.',
      mech: [
        'Cape of Good Hope reroute institutionalized; pipeline diversions (Yanbu, Fujairah, Ceyhan) reduce but do not replace Gulf flows',
        'Rooftop solar, behind-the-meter storage, and community microgrids still erode single-point dependence at the demand edge',
        'Diversified spot LNG and regional renewables blunt longer-term pipeline coercion',
      ],
    },
    {
      id: 'debt',
      name: 'Debt',
      score: 35,
      blurb: 'Reuters (18 Aug) reports U.S. 30-year yields above 5%, Japan’s 10-year at a three-decade high, and term premium near 80 bp; creditor fragmentation and EM restructuring channels remain, but fiscal optionality narrows. Imperial Control 80 · Rebel Resistance 35.',
      mech: [
        'G20 Common Framework restructuring and IMF/Paris Club processes preserve some sovereign optionality',
        'EM local-currency debt markets and non-Western reserve diversification push back on dollar-only architecture',
        'Uncoordinated creditor politics slow unified enforcement across jurisdictions',
      ],
    },
    {
      id: 'governance',
      name: 'Governance',
      score: 60,
      blurb: 'Freedom House records a 20th consecutive year of global freedom decline; ACLED’s 19 Aug Yemen report records 16 Houthi attacks on oil assets and near-daily internal clashes, adding another fragmented multi-front theatre. Imperial Control 68 · Rebel Resistance 60.',
      mech: [
        'Federalism and subnational authority diffuse compliance burdens across thousands of units',
        'Independent judiciaries, free press, and civil-society NGOs maintain legitimacy alternatives',
        'Treaty pluralism — no single body commands universal extraterritorial reach',
      ],
    },
    {
      id: 'crypto',
      name: 'Crypto',
      score: 46,
      blurb: 'The EU’s 21st Russia-sanctions package adds transaction bans on 14 crypto platforms and a first-use full third-country crypto-service ban; OFAC’s 7 Aug action targets Iran-linked exchanges. SEC rulemaking improves clarity but preserves a supervised perimeter. Self-hosted wallets remain an option, but regulated gateways are tighter. Imperial Control 85 · Rebel Resistance 46.',
      mech: [
        'Hardware self-custody and multisig reduce custodial seizure surface',
        'Peer-to-peer settlement and non-custodial paths remain outside KYC/AML perimeter at the margin',
        'Jurisdictional fragmentation (UAE, Switzerland, Singapore, El Salvador) preserves optionality',
      ],
    },
    {
      id: 'ai',
      name: 'AI',
      score: 32,
      blurb: 'NSPM-11 accelerates national-security AI adoption; Stanford HAI documents concentrated compute/model production, while Reuters (18 Aug update) shows governments tightening control over scarce AI data-centre capacity. EU transparency rules add guardrails, but centralized infrastructure and monitoring readiness remain. Imperial Control 82 · Rebel Resistance 32.',
      mech: [
        'Open-weights models and permissive licenses enable independent audit and local fine-tuning',
        'Edge and on-device inference reduces dependence on centralized API gatekeepers',
        'Data minimization, federated learning, and differential privacy limit population-scale capture',
      ],
    },
  ],

  /* Free-text scratchpad for the weekly updater. Not rendered.
     Append a dated entry per cycle with rationale / citations. */
  sources: [
    '2026-08-24 — Weekly metric refresh (current to 2026-08-24):',
    '  Biggest mover: Debt stress (Imperial 78 → 80 / Rebel 37 → 35). Reuters (18 Aug) reports U.S. 30-year yields above 5%, Japan’s 10-year at a three-decade high, long-end yields at multi-year peaks, and a U.S. term premium near 80 bp as investors demand more compensation for fiscal and policy risk.',
    '  Energy (Imperial 91 / Rebel 21): held at critical — Reuters/Kpler (21 Aug) counted 7 commodity ships through Hormuz versus roughly 130–140 before the war, while Bab el-Mandeb fell to 23 from 34 on each of the prior two days; no additional score jump after the prior cycle’s severe disruption.',
    '  Governance (Imperial 68 / Rebel 60): elevated — ACLED (19 Aug) records 16 Houthi attacks on seven oil facilities and six tankers between 13 Jul and 14 Aug, near-daily Yemen clashes, and rising renewed-civil-war risk.',
    '  Crypto (Imperial 84 → 85 / Rebel 47 → 46): tightened — OFAC’s 7 Aug exchange designations and the EU’s 21st Russia-sanctions package widen exchange/third-country chokepoints; SEC’s 18 Aug Regulation Crypto Assets proposal adds a supervised offering regime and conditional safe harbor.',
    '  AI (Imperial 82 / Rebel 32): held — Reuters (18 Aug update) shows Pennsylvania safeguards, a Texas grid-approval pause, and New York’s 50 MW data-centre moratorium; infrastructure control is increasingly political, but the centralized compute baseline is unchanged.',
    '',
    '2026-08-17 — Weekly metric refresh (current to 2026-08-17):',
    '  Biggest mover: Energy chokepoints (Imperial 89 → 91 / Rebel 23 → 21). Driver: IEA (12 Aug) says renewed hostilities derailed the oil-market recovery and cut regional exports; UN/ITC (4 Aug) reports combined export volumes down 54% and natural-gas exports down 95% y/y; EIA’s 12 Aug security data keeps the Hormuz/Bab el-Mandeb shock in the critical-risk baseline.',
    '  Crypto (Imperial 83 → 84 / Rebel 48 → 47): tightened — ESMA’s post-1 Jul MiCA wind-down expectations clarify that unauthorised CASPs must stop onboarding and retain AML/sanctions controls; Treasury/OFAC’s stablecoin rulemaking keeps permitted issuers inside the sanctions perimeter. Self-hosted wallets remain an explicit alternative, but regulated gateways narrow.',
    '  Governance (Imperial 66 → 67 / Rebel 58 → 59): elevated — ACLED’s 13 Aug Sudan profile highlights SAF gains, RSF pressure, and intensifying drone warfare, adding coercive and fragmented resistance capacity.',
    '  Debt (Imperial 78 / Rebel 37): held — IIF’s 5 Aug monitor did not establish a new sovereign default trigger beyond the existing Fitch/IMF/World Bank stress baseline.',
    '  AI (Imperial 82 / Rebel 32): held — EU AI Act transparency rules took effect 2 Aug, adding formal labeling/enforcement around biometric categorisation and synthetic media while not changing the centralized compute/model baseline.',
    '',
    '2026-08-03 — Weekly metric refresh (current to 2026-08-03):',
    '  Biggest mover: Energy chokepoints (Imperial 87 → 89 / Rebel 25 → 23). Driver: Treasury/OFAC (29 Jul) describes an IRGC-backed maritime-insurance scheme that forces transit payments and accepts digital assets, while Reuters (25 Jul) reports Houthi blockade activity and attacks on Saudi oil sites threatening a second shipping route; the Hormuz shock remains severe.',
    '  Crypto (Imperial 80 → 83 / Rebel 50 → 48): tightened — ESMA’s 8 Jul CASP custody-resilience action and Treasury/OFAC’s 29 Jul designation of a digital-asset-funded Hormuz insurance scheme extend supervisory and sanctions leverage across custody, settlement, and shipping-linked finance.',
    '  Debt (Imperial 76 → 78 / Rebel 39 → 37): tightened — Fitch projects developed-market debt at $75.8T / 104% of GDP in 2026; World Bank says 32 LMICs (40%) are in distress or high risk and higher rates could worsen debt service.',
    '  Governance (Imperial 65 → 66 / Rebel 58 — flat): elevated — ACLED recorded 1,958 Ukraine conflict events, 239 civilian-targeting incidents, and at least 136 civilian deaths in 11–17 Jul; Sudan’s front shifted across Darfur with mass displacement.',
    '  AI (Imperial 81 → 82 / Rebel 33 → 32): tightened — Stanford HAI (14/27 Jul) documents sovereign-AI offerings that preserve U.S. chip/cloud/model dependence and the risk of persistent spatial profiles from world models.',
    '',
    '2026-07-20 — Weekly metric refresh (current to 2026-07-20):',
    '  Biggest mover: Crypto perimeter (Imperial 77 → 78 / Rebel 50 — flat). Driver: MiCA entered full EU enforcement (July 1, 2026) tightening licensed-venue and stablecoin issuer expectations; FATF updates continue to push Travel Rule effectiveness and stablecoin-focused enforcement.',
    '  Energy (Imperial 86 → 87 / Rebel 26 → 25): tightened — Reuters (17 Jul 2026) reports Hormuz transits down to ~3 commodity vessels/day vs ~125/day pre-war and rising U-turn/pauses after attacks, reinforcing chokepoint leverage.',
    '  Debt (Imperial 76 / Rebel 39): unchanged — IMF DSA + Fiscal Monitor baseline remains; no new sovereign default trigger in the window.',
    '  Governance (Imperial 65 / Rebel 58): unchanged — Freedom House FIW 2026 baseline remains; no new global step-change captured this week.',
    '  AI (Imperial 81 / Rebel 33): unchanged — AI Act and U.S. data-center permitting posture are structural but no new step-change in citations roster this week.',
    '',
    '2026-07-13 — Weekly metric refresh (current to 2026-07-13):',
    '  Biggest mover: Energy chokepoints (Imperial 82 → 86 / Rebel 31 → 26). Driver: Reuters (9 Jul 2026) reports Hormuz tanker traffic near standstill (two tankers transited early Thursday), insurer pause guidance, and AIS-off transits — sharply elevating perceived chokepoint leverage.',
    '  Crypto (Imperial 76 → 77 / Rebel 51 → 50): minor tighten — maintained OFAC Iran-exchange designations baseline; slight increase to sanctions-perimeter gauge given continued secondary-risk signaling and stablecoin-issuer freeze leverage.',
    '  Debt (Imperial 75 → 76 / Rebel 40 → 39): modest tighten — Venezuela restructuring complexity/urgency (claims approaching $200B; Reuters 9 Jul) reinforces rollover stress narrative.',
    '  Governance (Imperial 65 / Rebel 58): unchanged — ACLED July 2026 Africa overview shows continued multi-theatre escalations (Somalia political violence; Sudan drone fatalities; Sahel jihadist competition), consistent with fragmented baseline.',
    '  AI (Imperial 80 → 81 / Rebel 34 → 33): slight tighten — continued NSPM-11 rollout posture and DHS biometrics procurement narrative; no new primary-source step-change in this window.',
    '',
    '2026-06-29 — Weekly metric refresh (current to 2026-06-29):',
    '  Biggest mover: Crypto perimeter (Imperial 75 → 76 / Rebel 51 — flat). Driver: OFAC FAQ 1257 (June 2) explicitly warns of secondary-sanctions exposure for non-U.S. persons/FFIs transacting with Iran-based digital asset exchanges; Treasury SB0524 (June 5) repeats large-scale regime-linked crypto freezing language, slightly tightening perceived control leverage.',
    '  Energy (Imperial 82 / Rebel 31): unchanged — Hormuz remains the dominant chokepoint lever; Bab el-Mandeb remains severed with fresh Reuters note (June 8) on continued targeting language and depressed traffic.',
    '  Governance (Imperial 65 / Rebel 58): unchanged — added ACLED June 17 Ukraine update to citation roster as a continuing high-intensity conflict indicator.',
    '  Debt (Imperial 75 / Rebel 40): unchanged — IMF FM Apr 2026 baseline remains; no major new sovereign default trigger in the week.',
    '  AI (Imperial 80 / Rebel 34): unchanged — NSPM-11 remains the core procurement / onboarding control leverage justification.',
    '',
    '2026-06-22 — Weekly metric refresh (current to 2026-06-22):',
    '  Biggest mover: AI surveillance (Imperial 77 → 79 / Rebel 36 → 35). Driver: White House NSPM-11 (5 Jun 2026) accelerates AI adoption and multi-vendor onboarding across national-security enterprise, reinforcing procurement leverage and model concentration in security domains.',
    '  Debt (Imperial 72 → 75 / Rebel 42 → 40): IMF FM Apr 2026 backdrop holds; added verified 30-yr UST 5.197% intraday (CNBC 2026-05-19) and Venezuela ~$150–170B restructuring launch (CNBC 2026-05-14, softened from memo “largest in history” to “one of the largest”).',
    '  Governance (Imperial 65 / Rebel 58): unchanged — persistent elevated baseline, no new state collapse in the window.',
    '  Crypto (Imperial 64 → 72 / Rebel 54 → 51): OFAC designated major Iran domestic exchanges (June 2, 2026; TRM cites Nobitex, Bit Pin, Wallex, Ramzinex) and highlighted issuer coordination to freeze $344M USDT; SEC interpretive release S7-2026-09 (17 Mar 2026) clarifies securities-law perimeter; Chainalysis notes EU TFR zero-threshold Travel Rule requirements for CASPs. Resistance framing kept high-level/non-operational.',
    '  AI (Imperial 77 → 79 / Rebel 36 → 35): Added White House NSPM-11 (5 Jun 2026) accelerating AI adoption + procurement onboarding in national-security enterprise; kept DHS/ICE biometrics and HAI/FOTN baselines.',
    '  Conservatism / excluded-softened claims (verified against public sources): Memo dated Moody’s downgrade and OBBBA passage to May 2026 — INCORRECT; Moody’s Aa1 downgrade was May 2025 and OBBBA was signed into law July 2025 (not “now in the Senate”). Kept the correct Moody’s May-2025 date; did NOT render OBBBA as fresh legislation. Memo SCOTUS VRA ruling dated 29 May — actually 29 Apr 2026 (Louisiana v. Callais); EXCLUDED from rendered copy (not a tracked dashboard axis, avoid date error). May Day 1M figure is an organizer claim and “largest in recent memory” is unverified — NOT rendered as a hard metric. Tether “$514M total across May” aggregate is soft — used the verified $344M (Apr) figure instead. Subjugation index 79 → 78 (net slight ease: one large energy drawdown vs. three +1 increments).',
    '',
    '2026-05-25 — Weekly metric refresh (current to 2026-05-25):',
    '  Biggest mover: Crypto perimeter (Imperial 66 / Rebel 54). Driver: OFAC SDN list update + coordination with stablecoin issuers to freeze assets (Chainalysis cites Apr 2026 action) increases perceived control leverage; resistance capacity only slightly reduced.',
    '  Debt (Imperial 72 / Rebel 42): IMF Fiscal Monitor April 2026 (public debt ~94% in 2025 → 100% by 2029); IMF LIC DSA list 31 Mar 2026 (9 in distress, 23 high risk); Moody’s US Aaa→Aa1 downgrade May 2025.',
    '  Governance (Imperial 65 / Rebel 58): Freedom House FIW 2026 — 20th consecutive year of decline, 54 declined vs 35 improved; coups in Guinea-Bissau and Madagascar; ICG 2026 watchlist.',
    '  Crypto (Imperial 66 / Rebel 54): Treasury sb0435 (FinCEN/OFAC joint proposed rule implementing GENIUS Act AML + sanctions requirements for permitted payment stablecoin issuers, 8 Apr 2026); SEC Crypto Task Force input (May 2026); Chainalysis cites Apr 2026 OFAC SDN update + $344M USDT freeze tied to Iran-linked wallets. Resistance: self-custody and jurisdictional fragmentation persist (non-operational framing).',
    '  AI (Imperial 74 / Rebel 38): Stanford HAI 2026 AI Index (88% adoption, FMTI 58→40); Freedom on the Net 2025 (15th consecutive decline; 57 countries with arrests; 69% blocking; 52% shutdowns); DHS surveillance investment narrative from fedscoop reporting on AI funding documents.',
    '  Conservatism notes: Brent $111 spike and IRGC "Persian Gulf Strait Authority" toll figure NOT echoed in dashboard copy (single-source, time-sensitive). No operational evasion mechanisms surfaced for crypto resistance. Ceasefire-collapse / blockade language softened to "de facto closure" + status flag rather than rolling event narration.',
    '',
    '2026-05-15 — Prior baseline retained as reference:',
    '  Energy: EIA World Oil Transit Chokepoints (updated 2026-03-03) — Hormuz, Malacca, Suez/SUMED, Bab el-Mandeb, Cape rerouting.',
    '  Debt: IMF Fiscal Monitor April 2026; World Bank IDR 2024 ($1.4T EM debt service in 2023).',
    '  Governance: Freedom House FIW 2026.',
    '  AI / Surveillance: Stanford HAI 2026 AI Index; Freedom House Freedom on the Net 2025.',
    '  Crypto: SEC FY2025 Enforcement Results; Chainalysis 2026 Crypto Crime Report.',
  ],
};

window.DASHBOARD_DATA = DASHBOARD_DATA;
