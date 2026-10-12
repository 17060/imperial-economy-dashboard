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
    sector: 'Sector 001 · Earth Annex Protocol · reading current to 2026-10-12',
    subjugationIndex: 98,
    subjugationTier: 'CRITICAL',
  },

  imperialControl: [
    { label: 'Compliant Polities',   value: '123',    delta: '▲ 1 this cycle',     deltaTone: 'up'   },
    { label: 'Theatres Encircled',   value: '16 / 17', delta: '▲ 1 this cycle',     deltaTone: 'up'   },
    { label: 'Resistance Cells',     value: '310',    delta: '▲ 0.3% churn',       deltaTone: 'flat' },
    { label: 'Levy Yield',           value: '¤1.94T', delta: '▲ 0.5% q/q',         deltaTone: 'up'   },
  ],

  theatreReadiness: [
    { label: 'Fleet Posture',         value: 100 },
    { label: 'Economic Grip',         value: 97 },
    { label: 'Surveillance Mesh',     value: 83 },
    { label: 'Compliance Engines',    value: 61 },
    { label: 'Crypto Perimeter',      value: 96 },
    { label: 'Insurgent Liquidity',   value: 20 },
  ],

  directives: [
    'EIA’s 6 Oct outlook expects Middle East oil flows to remain constrained through Q4 after attacks interrupted Saudi Arabia’s East-West bypass pipeline; partial recovery and rerouting limit additional score movement.',
    'Prepare countermeasures for rerouting and black-flagged shipping around the Strait.',
    'Press sovereign debt advantage: IMF’s 7 Oct warning links record public debt and multi-decade sovereign yields to rising refinancing pressure.',
    'Exploit governance fractures: ACLED reports renewed fighting and Eritrean cross-border movement in Tigray; militant spillover is also approaching Guinea’s mining regions.',
    'Balance the crypto perimeter: ESMA tightened MiCA controls on non-compliant stablecoins, while FinCEN withdrew proposed unhosted-wallet and mixing rules and the SEC proposed conditional self-custody options for advisers and funds.',
    'Trace rebel digital reserves through stablecoin issuers and regulated gateways.',
    'Expand identity and biometric readiness; monitor AI-assisted intelligence and national-scale digital control systems.',
  ],

  energyChokepoints: {
    nodes: [
      { name: 'Strait of Hormuz',     role: 'EIA (6 Oct): Middle East flows remain constrained through Q4; September shipments recovered slightly as Saudi Arabia shifted exports and used ship-to-ship transfers', status: 'severed' },
      { name: 'Strait of Malacca',    role: '23.2 mb/d · largest oil flow (1H25); rising geopolitical risk',     status: 'pressured' },
      { name: 'Suez / SUMED',         role: '4.9 mb/d · ~half of 2023 levels; transits still near multi-year lows', status: 'pressured' },
      { name: 'Bab el-Mandeb',        role: 'September reporting shows disrupted traffic and continued regional risk; alternative routes remain exposed to attacks on nearby energy infrastructure', status: 'severed'   },
      { name: 'Cape of Good Hope',    role: 'Rerouting remains established; EIA says bypass routes help but do not remove Q4 supply constraints', status: 'held'  },
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
    citation11: {
      label: 'Reuters · Hormuz traffic slows to 7 commodity vessels after retaliation warning (8 Sep 2026)',
      url: 'https://www.reuters.com/world/middle-east/hormuz-traffic-slows-after-iran-threatens-retaliation-us-attacks-2026-09-08/',
    },
    citation12: {
      label: 'IEA · Oil Market Report — September 2026 (11 Sep 2026)',
      url: 'https://www.iea.org/reports/oil-market-report-september-2026',
    },
    citation13: {
      label: 'Reuters/Kpler · Hormuz traffic below 10-day average; LNG vessels reappear outside strait (18 Sep 2026)',
      url: 'https://www.reuters.com/world/middle-east/shipping-traffic-via-strait-hormuz-stays-below-10-day-average-data-shows-2026-09-18/',
    },
    citation14: {
      label: 'Moneycontrol analysis · Hormuz seven-day average 3.1 vessels/day vs 86 a year earlier; Bab el-Mandeb near 70% of normal (24 Sep 2026)',
      url: 'https://www.moneycontrol.com/world/hormuz-ship-traffic-down-96-bab-el-mandeb-at-70-of-normal-levels-article-14037505.html',
    },
    citation15: {
      label: 'Anadolu Agency · Bab el-Mandeb traffic falls to four vessels amid Yemen conflict (17 Sep 2026)',
      url: 'https://www.aa.com.tr/en/middle-east/bab-el-mandeb-strait-s-shipping-traffic-comes-to-halt-amid-conflict-in-yemen/4060177',
    },
    citation16: {
      label: 'U.S. EIA · Short-Term Energy Outlook, October 2026 (6 Oct 2026)',
      url: 'https://www.eia.gov/outlooks/steo/',
    },
  },

  debt: [
    { label: 'Sovereign Rollovers',   value: 100, sub: 'IMF (7 Oct): energy-driven inflation and multi-decade sovereign-yield highs compound the refinancing burden' },
    { label: 'Projected Debt 2029',   value: 100, sub: 'IMF: 100% of GDP by 2029, one year earlier than April 2025 path' },
    { label: 'LIC Debt Distress',     value: 78, sub: 'World Bank: 32 low- and middle-income countries (40%) in distress or high risk; higher rates could deepen the count (Reuters, 22 Jul 2026)' },
    { label: 'Reserve Hierarchy',     value: 100, sub: 'IMF (7 Oct): rising benchmark yields and elevated public debt increase funding pressure across advanced and developing economies' },
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
    {
      label: 'World Bank · Global Economic Prospects 2026 debt highlights (June 2026)',
      url: 'https://thedocs.worldbank.org/en/doc/2b672b3b0415d6b66c45b66579db4ef5-0050012026/related/GEP-Jun-2026-Chapter-3-highlights.pdf',
    },
    {
      label: 'Fitch Ratings · Sovereign bond-yield spike highlights persistent fiscal challenges (26 Aug 2026)',
      url: 'https://www.fitchratings.com/research/sovereigns/sovereign-bond-yield-spike-highlights-persistent-fiscal-challenges-26-08-2026',
    },
    {
      label: 'Reuters · Global bond selloff deepens as oil prices and debt fears jolt markets (2 Sep 2026)',
      url: 'https://www.reuters.com/world/asia-pacific/bond-selloff-deepens-inflation-oil-prices-jolt-markets-2026-09-02/',
    },
    {
      label: 'Reuters · IMF warns rising bond yields threaten developing-country debt progress (3 Sep 2026)',
      url: 'https://www.reuters.com/world/china/imfs-georgieva-says-rising-bond-yields-threaten-progress-developing-country-debt-2026-09-03/',
    },
    {
      label: 'IMF · Global Markets Monitor: long-term Treasury yields reach two-decade highs (25 Sep 2026)',
      url: 'https://www.imfconnect.org/content/dam/imf/News%20and%20Generic%20Content/GMM/latest.pdf',
    },
    {
      label: 'IMF · Executive Board reviews joint IMF–World Bank LIC debt-sustainability framework (21 Sep 2026)',
      url: 'https://www.imf.org/en/news/articles/2026/09/21/pr26296-lics-imf-executive-board-reviews-the-joint-world-bank-debt-sustainability-framework',
    },
    {
      label: 'IMF Managing Director · Annual Meetings curtain-raiser on debt, energy, and AI crosscurrents (7 Oct 2026)',
      url: 'https://www.imf.org/en/news/articles/2026/10/07/sp100726-2026-annual-meetings-curtain-raiser',
    },
    {
      label: 'Reuters · IMF warns record debt and multi-decade sovereign yields are rising amid energy shock (7 Oct 2026)',
      url: 'https://www.reuters.com/world/asia-pacific/imf-chief-warns-energy-shock-growing-debt-ai-risks-threaten-global-growth-2026-10-07/',
    },
  ],

  governance: {
    weakSpots: [
      { label: '54 countries declined vs 35 improved (2025)', status: 'EXPLOIT' },
      { label: '20th consecutive year of global decline',     status: 'AMPLIFY' },
      { label: 'Sudan Blue Nile: drone strikes on al-Damazine and six-village advance (ACLED 13–14 Sep)', status: 'OPEN'  },
      { label: 'Mozambique: ISM incursions, abductions, and post-election unrest risk (ACLED Sep)', status: 'ABSORB' },
      { label: 'Middle East: 8–14 Sep ACLED data logs 10 US-Israeli and 11 Iranian strike events', status: 'OPEN' },
      { label: 'Ethiopia: Eritrean forces crossed into Tigray; Ethiopian drones targeted troops (ACLED, 7 Oct)', status: 'OPEN' },
      { label: 'Guinea: militant spillover approaches eastern gold-producing region (ACLED, 8 Oct)', status: 'OPEN' },
      { label: 'Türkiye: rights groups report 1,270 X-account blocking orders in September (12 Oct)', status: 'AMPLIFY' },
      { label: '88 Free · 48 Partly Free · 59 Not Free',      status: 'ABSORB'  },
    ],
    dossier: 'Freedom in the World 2026 marks a 20th consecutive year of global freedom decline. ACLED reports Eritrean forces crossed into Tigray on 7 October amid Ethiopian drone strikes and expanding front-line control; its 8 October analysis finds militant spillover nearing Guinea’s mining region. A 12 October statement by Human Rights Watch and partner groups says Turkish authorities ordered at least 1,270 X accounts blocked in September. New conflict and information-control pressures deepen fragmentation, while local institutions and civic networks remain counterweights.',
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
    citation5: {
      label: 'ACLED · Ukraine Conflict Monitor (current weekly monitor, accessed 7 Sep 2026)',
      url: 'https://acleddata.com/monitor/ukraine-conflict-monitor',
    },
    citation6: {
      label: 'ACLED · Mozambique Conflict Monitor Update (September 2026)',
      url: 'https://acleddata.com/update/mozambique-conflict-monitor-update-september-2026',
    },
    citation7: {
      label: 'ACLED · Middle East Conflict Monitor (10 Sep 2026)',
      url: 'https://acleddata.com/monitor/middle-east-conflict-monitor',
    },
    citation8: {
      label: 'ACLED · Global analysis and Ethiopia/Tigray conflict risk (24–27 Sep 2026)',
      url: 'https://acleddata.com/global-analysis',
    },
    citation9: {
      label: 'NPR · Fears of return to war grow in Ethiopia’s Tigray region (24 Sep 2026)',
      url: 'https://www.npr.org/2026/09/24/nx-s1-5978861/conflict-ethiopia-tigray',
    },
    citation10: {
      label: 'ACLED · Eritrean forces cross into Tigray as Ethiopian forces deploy drones (7 Oct 2026)',
      url: 'https://acleddata.com/expert-comment/what-main-reason-eritrean-forces-crossed-border-fight-within-ethiopias-tigray-region',
    },
    citation11: {
      label: 'ACLED · Militant spillover from Mali raises mining-related security risks in Guinea (8 Oct 2026)',
      url: 'https://acleddata.com/report/militant-spillover-mali-raises-mining-related-security-risks-guinea',
    },
    citation12: {
      label: 'Human Rights Watch and partner groups · Türkiye: End Internet Censorship (12 Oct 2026)',
      url: 'https://www.bignewsnetwork.com/news/279367980/trkiye-end-internet-censorship',
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
      '[IDENTITY-MESH] UK OfDIA (Sep 2026): 275 digital-identity firms; 75% verify identity/attributes and 57% offer biometrics/liveness detection',
      '[IDENTITY-PILOT] VA (7 Oct 2026): optional CLEAR biometric login pilot across VA.gov and six medical centers; selfie sign-in and in-person enrollment',
      '[CLAUDE-WATCH] Anthropic (Sep 2026): AI-assisted surveillance pipelines mapped populations, identities, sentiment, and political opposition; one Mali platform targeted ~25M SIM cards',
    ],
    tools: [
      { label: 'Population sentiment · 81% live where arrests occur', value: 81 },
      { label: 'Biometric capture · DHS/ICE iris + facial expansion',  value: 82 },
      { label: 'Content blocking · 69% of internet users',            value: 71 },
      { label: 'Internet/mobile shutdowns · 52% of users',            value: 52 },
      { label: 'AI regulatory trust · only 31% trust US to regulate', value: 31 },
      { label: 'Model transparency · FMTI average score',             value: 40 },
      { label: 'EU AI Act transparency enforcement · effective 2 Aug 2026', value: 63 },
      { label: 'Digital identity / biometric readiness · UK sector + VA pilot', value: 72 },
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
      {
        label: 'Amnesty International · Argentina AI-driven surveillance report (August 2026)',
        url: 'https://www.amnesty.org/en/latest/news/2026/08/argentina-unchecked-deployment-of-ai-driven-surveillance-reinforces-a-techno-authoritarian-infrastructure-of-social-control/',
      },
      {
        label: 'UK National Audit Office · Managing digital identity (2 Sep 2026)',
        url: 'https://www.nao.org.uk/wp-content/uploads/2026/09/Managing-digital-identity.pdf',
      },
      {
        label: 'UK OfDIA · Digital Identity Sectoral Analysis Report 2026',
        url: 'https://www.gov.uk/government/publications/digital-identity-sectoral-analysis-report-2026/digital-identity-sectoral-analysis-report-2026',
      },
      {
        label: 'Anthropic · Detecting and countering misuse of AI: September 2026',
        url: 'https://www.anthropic.com/threat-intelligence-report-september-2026',
      },
      {
        label: 'CLEAR · VA.gov optional biometric identity pilot (7 Oct 2026)',
        url: 'https://ir.clearme.com/news-events/press-releases/detail/197/u-s-department-of-veterans-affairs-selects-clear-for-new',
      },
    ],
  },

  crypto: {
    dossier: 'Crypto remains dual-use. ESMA’s 8 October opinion says MiCA-authorised firms should cease a broad range of services involving non-compliant stablecoins, tightening regulated access points. On 5 October, FinCEN withdrew proposed rules for certain unhosted-wallet transactions and virtual-currency mixing; the SEC’s 1 October custody proposal would permit conditional self-custody for advisers and regulated funds. The U.S. changes widen policy optionality for self-custody and decentralized settlement, while stablecoin issuer and exchange controls remain substantial. This cycle lifts Rebel Resistance and holds Imperial Control near its high baseline.',
    nodes: [
      { name: 'Stablecoin perimeter',     role: 'ESMA (8 Oct): MiCA-authorised firms should stop services involving non-compliant stablecoins; controls span trading, transfers, and custody', status: 'severed' },
      { name: 'CLARITY Act market structure', role: 'Cleared Senate Banking Cttee 15–9 (14 May 2026); U.S. market-structure perimeter remains in legislative motion', status: 'pressured' },
      { name: 'FATF / DeFi perimeter',    role: 'July 2026 FATF DeFi report focuses AML/CFT expectations on identifiable control or sufficient influence', status: 'pressured' },
      { name: 'U.S. custody perimeter', role: 'SEC (1 Oct): proposed adviser/fund rules would allow crypto self-custody in specified circumstances and state trust companies as custodians', status: 'pressured' },
      { name: 'Self-custody / P2P',       role: 'FinCEN withdrew proposed reporting rules for certain unhosted-wallet transactions and its virtual-currency mixing proposal; policy space is broader, not unlimited', status: 'open' },
      { name: 'EU third-country perimeter', role: 'EU 21st Russia-sanctions package: transaction bans on 14 crypto platforms and a first-use full third-country crypto-service ban', status: 'severed' },
      { name: 'Jurisdictional arbitrage', role: 'UAE ADGM · Switzerland · Singapore · El Salvador',           status: 'open'      },
    ],
    gauges: [
      { label: 'Sanctions Perimeter',      value: 100, sub: 'OFAC’s September designations and Iran-related exchange actions keep sanctions and analytics leverage high; no new U.S. crypto designation was score-changing this cycle' },
      { label: 'Stablecoin Concentration', value: 98, sub: 'ESMA’s 8 Oct opinion extends MiCA access controls across trading, transfers, custody, and other services tied to non-compliant stablecoins' },
      { label: 'Regulatory Clarity',       value: 89, sub: 'SEC’s 1 Oct adviser/fund custody proposal defines supervised paths for crypto custody, including conditional self-custody and state trust-company custodians' },
      { label: 'Self-Custody Surface',     value: 55, sub: 'FinCEN withdrew proposed unhosted-wallet and mixing rules; the SEC proposal also permits self-custody in specified cases. These are policy signals, not a guarantee against other laws or controls' },
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
      {
        label: 'PwC · Treasury GENIUS Act stablecoin proposal (21 Aug 2026)',
        url: 'https://www.pwc.com/us/en/industries/financial-services/library/our-take/stablecoin-proposal-fincen-boi-aug-21-2026.html',
      },
      {
        label: 'Monetary Authority of Singapore · Stablecoin regulatory framework consultation (1 Sep 2026)',
        url: 'https://www.mas.gov.sg/news/media-releases/2026/mas-consults-on-legislative-amendments-to-implement-stablecoin-regulatory-framework',
      },
      {
        label: 'U.S. Treasury · GENIUS Act issuance, offer and sale NPRM (2026)',
        url: 'https://home.treasury.gov/news/press-releases/sb0605',
      },
      {
        label: 'FATF · Targeted report on stablecoins and unhosted wallets / P2P transactions (March 2026)',
        url: 'https://www.fatf-gafi.org/en/publications/Methodsandtrends/targeted-report-stablecoins-unhosted-wallets-peer-to-peer-transactions.html',
      },
      {
        label: 'Thailand SEC · Travel Rule for Digital Assets (2 Sep 2026)',
        url: 'https://www.sec.or.th/EN/Pages/News_Detail.aspx?SECID=13277',
      },
      {
        label: 'U.S. Treasury · Operation Economic Outcast expands Iran digital-asset sanctions risk (2026)',
        url: 'https://home.treasury.gov/news/press-releases/sb0613',
      },
      {
        label: 'U.S. Treasury/OFAC · BitBank digital-asset exchange designation (17 Sep 2026)',
        url: 'https://home.treasury.gov/news/press-releases/sb0632',
      },
      {
        label: 'U.S. Treasury/OFAC · Xinbi Guarantee digital-currency marketplace designation (9 Sep 2026)',
        url: 'https://home.treasury.gov/news/press-releases/sb0624',
      },
      {
        label: 'FATF · Targeted report on regulatory challenges from DeFi (July 2026)',
        url: 'https://www.fatf-gafi.org/content/dam/fatf-gafi/reports/targeted-report-decentralised-finance-2026.pdf.coredownload.pdf',
      },
      {
        label: 'Reuters · Binance faces U.S. scrutiny over possible Iran-sanctions violations (22 Sep 2026)',
        url: 'https://www.reuters.com/legal/government/binance-under-us-scrutiny-over-possible-iran-sanctions-violations-bloomberg-news-2026-09-22/',
      },
      {
        label: 'Skadden · SDNY $61M crypto forfeiture action reflects sanctions and seizure perimeter (23 Sep 2026)',
        url: 'https://www.skadden.com/insights/publications/2026/09/sdnys-$61-million-crypto-forfeiture-action',
      },
      {
        label: 'CNBC · U.S. seeks crypto tied to Iran oil sales investigation (15 Sep 2026)',
        url: 'https://www.cnbc.com/2026/09/15/us-attorney-crypto-tether-iran-china-.html',
      },
      {
        label: 'FinCEN · Withdrawal of proposed rules on unhosted-wallet transactions and virtual-currency mixing (5 Oct 2026)',
        url: 'https://www.fincen.gov/news/news-releases/fincen-announces-withdrawals-proposed-digital-asset-related-rules',
      },
      {
        label: 'ESMA · Supervisory expectations for services involving non-MiCA-compliant stablecoins (8 Oct 2026)',
        url: 'https://www.esma.europa.eu/press-news/esma-news/esma-sets-out-supervisory-expectations-services-related-unauthorised',
      },
      {
        label: 'SEC · Proposed adviser and regulated-fund crypto custody rules (1 Oct 2026)',
        url: 'https://www.sec.gov/newsroom/press-releases/2026-100-sec-proposal-would-address-how-investment-advisers-funds-can-custody-crypto-assets-under-federal',
      },
    ],
  },

  rebelResistanceIndex: [
    {
      id: 'energy',
      name: 'Energy',
      score: 12,
      blurb: 'EIA’s 6 Oct outlook expects Middle East flows to remain constrained through Q4 after attacks interrupted the East-West pipeline; September shipping and oil exports partially recovered through alternative routing. Imperial Control 100 · Rebel Resistance 12.',
      citations: [
        { label: 'EIA · October 2026 Short-Term Energy Outlook', url: 'https://www.eia.gov/outlooks/steo/' },
        { label: 'Moneycontrol · Hormuz and Bab el-Mandeb traffic analysis (24 Sep 2026)', url: 'https://www.moneycontrol.com/world/hormuz-ship-traffic-down-96-bab-el-mandeb-at-70-of-normal-levels-article-14037505.html' },
      ],
      mech: [
        'Cape of Good Hope reroute institutionalized; pipeline diversions (Yanbu, Fujairah, Ceyhan) reduce but do not replace Gulf flows',
        'Rooftop solar, behind-the-meter storage, and community microgrids still erode single-point dependence at the demand edge',
        'Diversified spot LNG and regional renewables blunt longer-term pipeline coercion',
      ],
    },
    {
      id: 'debt',
      name: 'Debt',
      score: 27,
      blurb: 'IMF’s 7 Oct warning links record public debt with multi-decade sovereign-yield highs and rising refinancing costs; energy inflation and higher benchmark rates add pressure. Imperial Control 88 · Rebel Resistance 27.',
      citations: [
        { label: 'IMF · Annual Meetings curtain-raiser on debt, energy, and AI (7 Oct 2026)', url: 'https://www.imf.org/en/news/articles/2026/10/07/sp100726-2026-annual-meetings-curtain-raiser' },
        { label: 'Reuters · IMF warns of record debt and multi-decade sovereign yields (7 Oct 2026)', url: 'https://www.reuters.com/world/asia-pacific/imf-chief-warns-energy-shock-growing-debt-ai-risks-threaten-global-growth-2026-10-07/' },
      ],
      mech: [
        'G20 Common Framework restructuring and IMF/Paris Club processes preserve some sovereign optionality',
        'EM local-currency debt markets and non-Western reserve diversification push back on dollar-only architecture',
        'Uncoordinated creditor politics slow unified enforcement across jurisdictions',
      ],
    },
    {
      id: 'governance',
      name: 'Governance',
      score: 65,
      blurb: 'ACLED reports Eritrean forces crossed into Tigray and Ethiopian drones targeted troops (7 Oct), while militant spillover approached Guinea’s eastern mining region (8 Oct). HRW and partners document expanded Turkish online blocking. Imperial Control 73 · Rebel Resistance 65.',
      citations: [
        { label: 'ACLED · Eritrean forces cross into Tigray (7 Oct 2026)', url: 'https://acleddata.com/expert-comment/what-main-reason-eritrean-forces-crossed-border-fight-within-ethiopias-tigray-region' },
        { label: 'ACLED · Militant spillover in Guinea (8 Oct 2026)', url: 'https://acleddata.com/report/militant-spillover-mali-raises-mining-related-security-risks-guinea' },
        { label: 'Human Rights Watch and partners · Türkiye: End Internet Censorship (12 Oct 2026)', url: 'https://www.bignewsnetwork.com/news/279367980/trkiye-end-internet-censorship' },
      ],
      mech: [
        'Federalism and subnational authority diffuse compliance burdens across thousands of units',
        'Independent judiciaries, free press, and civil-society NGOs maintain legitimacy alternatives',
        'Treaty pluralism — no single body commands universal extraterritorial reach',
      ],
    },
    {
      id: 'crypto',
      name: 'Crypto',
      score: 36,
      blurb: 'FinCEN withdrew proposed rules on certain unhosted-wallet transactions and virtual-currency mixing (5 Oct); the SEC’s 1 Oct proposal permits conditional self-custody for advisers and funds. ESMA tightened MiCA access controls on non-compliant stablecoins. Imperial Control 96 · Rebel Resistance 36.',
      citations: [
        { label: 'FinCEN · Withdrawn unhosted-wallet and mixing proposals (5 Oct 2026)', url: 'https://www.fincen.gov/news/news-releases/fincen-announces-withdrawals-proposed-digital-asset-related-rules' },
        { label: 'SEC · Proposed adviser/fund crypto custody rules (1 Oct 2026)', url: 'https://www.sec.gov/newsroom/press-releases/2026-100-sec-proposal-would-address-how-investment-advisers-funds-can-custody-crypto-assets-under-federal' },
        { label: 'ESMA · Supervisory expectations for non-MiCA stablecoins (8 Oct 2026)', url: 'https://www.esma.europa.eu/press-news/esma-news/esma-sets-out-supervisory-expectations-services-related-unauthorised' },
      ],
      mech: [
        'Hardware self-custody and multisig reduce custodial seizure surface',
        'Peer-to-peer settlement and non-custodial paths remain outside KYC/AML perimeter at the margin',
        'Jurisdictional fragmentation (UAE, Switzerland, Singapore, El Salvador) preserves optionality',
      ],
    },
    {
      id: 'ai',
      name: 'AI',
      score: 24,
      blurb: 'VA and CLEAR launched an optional biometric identity pilot for VA.gov on 7 Oct, with selfie sign-in and in-person enrollment at six medical centers; the AI compute and model-concentration baseline remains. Imperial Control 90 · Rebel Resistance 24.',
      citations: [
        { label: 'CLEAR · VA.gov biometric identity pilot (7 Oct 2026)', url: 'https://ir.clearme.com/news-events/press-releases/detail/197/u-s-department-of-veterans-affairs-selects-clear-for-new' },
        { label: 'Stanford HAI · 2026 AI Index Report', url: 'https://hai.stanford.edu/ai-index/2026-ai-index-report' },
      ],
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
    '2026-10-12 — Weekly metric refresh (current to 2026-10-12):',
    '  Biggest movement: Crypto Rebel Resistance (32 → 36), while Imperial Control holds at 96. FinCEN withdrew its proposed rules on certain unhosted-wallet transactions and virtual-currency mixing (5 Oct), and the SEC proposed conditional adviser/fund self-custody pathways (1 Oct); ESMA simultaneously tightened MiCA access controls for non-compliant stablecoins (8 Oct). Sources: https://www.fincen.gov/news/news-releases/fincen-announces-withdrawals-proposed-digital-asset-related-rules ; https://www.sec.gov/newsroom/press-releases/2026-100-sec-proposal-would-address-how-investment-advisers-funds-can-custody-crypto-assets-under-federal ; https://www.esma.europa.eu/press-news/esma-news/esma-sets-out-supervisory-expectations-services-related-unauthorised',
    '  Energy (Imperial 100 / Rebel 12): EIA’s 6 Oct outlook expects constrained Middle East flows through Q4; attacks temporarily halted the East-West pipeline, which partially resumed by 22 Sep, while alternative routes and ship-to-ship transfers supported some recovery. Scores held at the ceiling/constrained baseline. Source: https://www.eia.gov/outlooks/steo/',
    '  Debt (Imperial 87 → 88 / Rebel 28 → 27): IMF’s 7 Oct curtain-raiser warns of record global public debt and multi-decade sovereign-yield highs, with energy inflation adding pressure to borrowing and refinancing costs. Sources: https://www.imf.org/en/news/articles/2026/10/07/sp100726-2026-annual-meetings-curtain-raiser ; https://www.reuters.com/world/asia-pacific/imf-chief-warns-energy-shock-growing-debt-ai-risks-threaten-global-growth-2026-10-07/',
    '  Governance (Imperial 72 → 73 / Rebel 64 → 65): ACLED reported Eritrean forces crossing into Tigray and Ethiopian drone strikes (7 Oct), plus militant spillover near Guinea’s mining region (8 Oct); HRW and partners described 1,270 September blocking orders targeting X accounts in Türkiye. Sources: https://acleddata.com/expert-comment/what-main-reason-eritrean-forces-crossed-border-fight-within-ethiopias-tigray-region ; https://acleddata.com/report/militant-spillover-mali-raises-mining-related-security-risks-guinea ; https://www.bignewsnetwork.com/news/279367980/trkiye-end-internet-censorship',
    '  AI / digital control (Imperial 89 → 90 / Rebel 25 → 24): VA and CLEAR launched an optional biometric login pilot for VA.gov on 7 Oct, including selfie sign-in and in-person enrollment at six VA medical centers; no change to the frontier-compute concentration baseline. Source: https://ir.clearme.com/news-events/press-releases/detail/197/u-s-department-of-veterans-affairs-selects-clear-for-new',
    '',
    '2026-09-28 — Weekly metric refresh (current to 2026-09-28):',
    '  Biggest mover: Crypto perimeter (Imperial 94 → 96 / Rebel 35 → 32). U.S. scrutiny of Binance over possible Iran-sanctions violations (22 Sep) and a New York $61M crypto forfeiture action (23 Sep) add exchange, analytics, and seizure leverage after the BitBank/Xinbi designations. Sources: https://www.reuters.com/legal/government/binance-under-us-scrutiny-over-possible-iran-sanctions-violations-bloomberg-news-2026-09-22/ ; https://www.skadden.com/insights/publications/2026/09/sdnys-$61-million-crypto-forfeiture-action ; https://home.treasury.gov/news/press-releases/sb0632 ; https://home.treasury.gov/news/press-releases/sb0624',
    '  Energy (Imperial 98 → 100 / Rebel 14 → 12): 24 Sep traffic analysis puts Hormuz at 3.1 vessels/day in the seven-day average versus 86 a year earlier, while Bab el-Mandeb weakened and the East-West pipeline remained vulnerable. Sources: https://www.moneycontrol.com/world/hormuz-ship-traffic-down-96-bab-el-mandeb-at-70-of-normal-levels-article-14037505.html ; https://issafrica.org/iss-today/middle-eastern-maritime-chokepoints-no-windfall-for-southern-africa ; https://www.iea.org/reports/oil-market-report-september-2026',
    '  Debt (Imperial 85 → 87 / Rebel 30 → 28): IMF’s 25 Sep Global Markets Monitor says nearly the entire U.S. Treasury curve traded above 5%, with long-term yields at two-decade highs and dollar-funded EM carry trades under pressure; the IMF–World Bank LIC framework review keeps debt architecture in focus. Sources: https://www.imfconnect.org/content/dam/imf/News%20and%20Generic%20Content/GMM/latest.pdf ; https://www.imf.org/en/news/articles/2026/09/21/pr26296-lics-imf-executive-board-reviews-the-joint-world-bank-debt-sustainability-framework',
    '  Governance (Imperial 71 → 72 / Rebel 63 → 64): ACLED’s late-September global analysis flags renewed Tigray conflict risk after four years of fragile peace, adding another fragmented flashpoint to the Sudan, Mozambique, and Middle East dossiers. Sources: https://acleddata.com/global-analysis ; https://www.npr.org/2026/09/24/nx-s1-5978861/conflict-ethiopia-tigray',
    '  AI / digital control (Imperial 89 / Rebel 25): held — no post-21 September deployment or concentration step-change was verified; Anthropic, UK NAO, Stanford HAI, and Freedom House remain the current evidence base. Sources: https://www.anthropic.com/threat-intelligence-report-september-2026 ; https://www.nao.org.uk/wp-content/uploads/2026/09/Managing-digital-identity.pdf',
    '',
    '2026-09-21 — Weekly metric refresh (current to 2026-09-21):',
    '  Biggest mover: Crypto perimeter (Imperial 91 → 94 / Rebel 39 → 35). OFAC designated BitBank on 17 Sep and Xinbi Guarantee on 9 Sep, extending sanctions and seizure pressure across Iranian exchange and digital-currency service nodes; SEC rulemaking also keeps supervised gateways central. Sources: https://home.treasury.gov/news/press-releases/sb0632 ; https://home.treasury.gov/news/press-releases/sb0624 ; https://www.sec.gov/newsroom/press-releases/2026-76-sec-proposes-new-regulation-crypto-assets',
    '  Energy (Imperial 96 → 98 / Rebel 16 → 14): Reuters/Kpler counted 4 commodity vessels through Hormuz on 18 Sep versus a 10-day average near 16; IEA reports more than 10 mb/d of Gulf output remained shut in August, inventories have drawn 507 mb since February, and recovery is deferred to 2027. Sources: https://www.reuters.com/world/middle-east/shipping-traffic-via-strait-hormuz-stays-below-10-day-average-data-shows-2026-09-18/ ; https://www.iea.org/reports/oil-market-report-september-2026',
    '  Debt (Imperial 84 → 85 / Rebel 31 → 30): IMF (7 Sep) says US, French, and Japanese 10-year yields are at multi-decade highs and higher core yields can more than offset spread compression in emerging markets. Source: https://www.imf.org/en/news/articles/2026/09/07/sp090726-md-monetary-policy-with-supply-shocks-and-high-debt',
    '  Governance (Imperial 70 → 71 / Rebel 62 → 63): ACLED records Blue Nile drone strikes on 13–14 Sep and 10 US-Israeli versus 11 Iranian strike events during 8–14 Sep. Sources: https://acleddata.com/expert-comment/why-has-blue-nile-become-new-flashpoint-sudans-war ; https://acleddata.com/iran-crisis-live',
    '  AI / digital control (Imperial 89 / Rebel 25): held — Anthropic’s September report remains the latest deployment signal; South Korea’s 15 Sep autonomous-agent security guidance and the UK NAO digital-identity audit add guardrail evidence but no score-changing step-change. Sources: https://www.anthropic.com/threat-intelligence-report-september-2026 ; https://www.nao.org.uk/wp-content/uploads/2026/09/Managing-digital-identity.pdf',
    '',
    '  Biggest mover: AI / digital control (Imperial 86 → 89 / Rebel 28 → 25). Anthropic’s September report documents AI-assisted identity resolution, sentiment monitoring, opposition profiling, and a Mali surveillance platform aimed at roughly 25 million SIM cards; concentration and deployment readiness materially increased. Source: https://www.anthropic.com/threat-intelligence-report-september-2026',
    '  Energy (Imperial 94 → 96 / Rebel 18 → 16): Reuters reports 7 commodity vessels through Hormuz on 7 Sep and a 10-day average of 10, the lowest since May, after retaliation warnings; IEA (11 Sep) cuts 2026 supply by 5.7 mb/d and delays Gulf recovery to 2027. Sources: https://www.reuters.com/world/middle-east/hormuz-traffic-slows-after-iran-threatens-retaliation-us-attacks-2026-09-08/ ; https://www.iea.org/reports/oil-market-report-september-2026',
    '  Debt (Imperial 83 → 84 / Rebel 32 → 31): IMF chief Georgieva warned rising bond yields threaten developing-country debt progress; high refinancing costs keep sovereign leverage elevated. Source: https://www.reuters.com/world/china/imfs-georgieva-says-rising-bond-yields-threaten-progress-developing-country-debt-2026-09-03/',
    '  Governance (Imperial 69 → 70 / Rebel 61 → 62): ACLED September monitors report ISM incursions and abductions in Mozambique, post-election unrest risk, Houthi/Saudi escalation, and Kurdish-region contestation. Sources: https://acleddata.com/update/mozambique-conflict-monitor-update-september-2026 ; https://acleddata.com/monitor/middle-east-conflict-monitor',
    '  Crypto (Imperial 89 → 91 / Rebel 42 → 39): Thailand SEC Travel Rule adds originator/beneficiary and self-custody checks for regulated transfers from 2027; Treasury’s Operation Economic Outcast places Iran’s digital-asset sector inside expanded sanctions risk and describes over $100M in crypto payments tied to oil sanctions evasion. Sources: https://www.sec.or.th/EN/Pages/News_Detail.aspx?SECID=13277 ; https://home.treasury.gov/news/press-releases/sb0613',
    '',
    '2026-09-07 — Weekly metric refresh (current to 2026-09-07):',
    '  Biggest mover: Energy chokepoints (Imperial 91 → 94 / Rebel 21 → 18). Reuters (2 Sep) reports only 4 commodity vessels transited Hormuz, below a 10-day average near 13 and below the prior week’s single-digit baseline; the chokepoint remains critically constrained. Source: https://www.reuters.com/business/energy/shipping-traffic-via-strait-hormuz-stays-below-10-day-average-data-shows-2026-09-02/',
    '  Debt (Imperial 81 → 83 / Rebel 34 → 32): Fitch (26 Aug) reports average G7 long-term yields at their highest since 2008 and the U.S. 30-year at a 19-year high of 5.33%; Reuters (2 Sep) reports the global bond selloff deepening as oil and debt fears lift borrowing costs. Sources: https://www.fitchratings.com/research/sovereigns/sovereign-bond-yield-spike-highlights-persistent-fiscal-challenges-26-08-2026 ; https://www.reuters.com/world/asia-pacific/bond-selloff-deepens-inflation-oil-prices-jolt-markets-2026-09-02/',
    '  Governance (Imperial 69 / Rebel 61): held — ACLED’s Yemen dossier remains a renewed-war risk; its current Ukraine monitor lists 1,821 conflict events and 203 civilian-targeting incidents, but no single new consolidation trigger. Source: https://acleddata.com/monitor/ukraine-conflict-monitor',
    '  Crypto (Imperial 87 → 89 / Rebel 44 → 42): tightened — Singapore MAS’s 1 Sep consultation would reserve the MAS-regulated stablecoin label for licensed issuers, treat non-MAS coins as DPTs, and add recognition, stress-testing, no-interest, and wind-down requirements; Treasury’s GENIUS Act NPRM adds U.S. licensing/order-compliance conditions. Sources: https://www.mas.gov.sg/news/media-releases/2026/mas-consults-on-legislative-amendments-to-implement-stablecoin-regulatory-framework ; https://home.treasury.gov/news/press-releases/sb0605',
    '  AI / digital control (Imperial 85 → 86 / Rebel 29 → 28): modest tighten — UK OfDIA’s 2026 sector report counts 275 providers and says 57% offer biometrics/liveness detection; market consolidation and digital-ID infrastructure add readiness leverage. Source: https://www.gov.uk/government/publications/digital-identity-sectoral-analysis-report-2026/digital-identity-sectoral-analysis-report-2026',
    '',
    '2026-08-31 — Weekly metric refresh (current to 2026-08-31):',
    '  Biggest mover: AI surveillance / digital control (Imperial 82 → 85 / Rebel 32 → 29). Driver: Amnesty’s August 2026 Argentina report documents at least $1.2M in 2024–25 surveillance purchases spanning social-media monitoring, facial recognition, drones, automated tracking, and real-time imagery; Stanford HAI’s concentration baseline remains structural (5,427 U.S. data centers, >90% of notable frontier models from industry, and TSMC fabricating almost every leading AI chip).',
    '  Energy (Imperial 91 / Rebel 21): held at critical — Reuters (27 Aug) reports traffic through Hormuz rose slightly, but the EIA says flows remain severely constrained through August and some Middle East output may stay shut through 2027; no evidence of durable normalization.',
    '  Debt (Imperial 81 / Rebel 34): tightened — Reuters (18 Aug) global bond-market stress persists; World Bank GEP 2026 finds EMDE government debt above 70% of GDP, debt service near 10% of revenue in 2025, and a nonlinear spread penalty at higher debt ratios.',
    '  Governance (Imperial 69 / Rebel 61): elevated — ACLED records 16 Houthi attacks on Saudi assets, seven oil facilities, six tankers, and near-daily Yemen clashes through mid-August; fragmentation remains a dual-use control/resistance condition.',
    '  Crypto (Imperial 87 / Rebel 44): tightened — Treasury’s 18 Aug GENIUS Act proposal would apply location/knowledge tests to U.S. stablecoin issuance and reach intermediaries that convert, redeem, or list stablecoins; OFAC, EU, and SEC actions keep exchange/sanctions perimeter leverage high while self-custody and jurisdictional fragmentation preserve a narrower resistance surface.',
    '',
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
