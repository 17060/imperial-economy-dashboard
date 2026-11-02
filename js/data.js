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
    sector: 'Sector 001 · Earth Annex Protocol · reading current to 2026-11-02',
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
    { label: 'Surveillance Mesh',     value: 85 },
    { label: 'Compliance Engines',    value: 61 },
    { label: 'Crypto Perimeter',      value: 100 },
    { label: 'Insurgent Liquidity',   value: 23 },
  ],

  directives: [
    'UKMTO/JMIC rates Hormuz severe and Bab el-Mandeb substantial; Hormuz commercial traffic is reduced, while Bab el-Mandeb remains open at about 35 daily transits. Neither is reported fully closed.',
    'Prepare countermeasures for rerouting and black-flagged shipping around the Strait.',
    'Press sovereign debt advantage: IMF’s 14 Oct Fiscal Monitor says debt is very high and rising, with higher interest rates and persistent spending pressures increasing fiscal risk.',
    'Exploit governance fractures: CrisisWatch lists seven deteriorations in October; ACLED reports suspected Russian hybrid activity targeting European infrastructure, with attribution caveats.',
    'Balance the crypto perimeter: the SEC’s 29 Oct complaint alleges a crypto-investment fraud; Chainalysis’ new regional report shows both personal-wallet/P2P capacity and mixed trends. Allegations and regional measures are not universal.',
    'Trace rebel digital reserves through stablecoin issuers and regulated gateways.',
    'Track AI-assisted monitoring carefully: HRF reports Belarus says 60,000 cameras feed AI for traffic violations, but does not establish political use of that AI system; Vietnam’s VNeID expansion remains planned.',
  ],

  energyChokepoints: {
    nodes: [
      { name: 'Strait of Hormuz',     role: 'UKMTO/JMIC (1 Nov): threat level severe, 18 confirmed attacks since 6 Oct, and reduced commercial traffic; the strait is not fully closed', status: 'pressured' },
      { name: 'Strait of Malacca',    role: '23.2 mb/d · largest oil flow (1H25); rising geopolitical risk',     status: 'pressured' },
      { name: 'Suez / SUMED',         role: '4.9 mb/d · ~half of 2023 levels; transits still near multi-year lows', status: 'pressured' },
      { name: 'Bab el-Mandeb',        role: 'UKMTO/JMIC (1 Nov): substantial threat level; open at about 35 daily transits, with no confirmed shipping attack during the advisory period', status: 'pressured'   },
      { name: 'Cape of Good Hope',    role: 'Rerouting remains established; EIA says bypass routes help but do not remove Q4 supply constraints', status: 'held'  },
    ],
    mapNodes: [
      { id: 'n1', label: 'Hormuz · severe threat / open', status: 'pressured', x: 62, y: 47 },
      { id: 'n2', label: 'Malacca · pressured',         status: 'pressured', x: 76, y: 55 },
      { id: 'n3', label: 'Suez / SUMED · pressured',    status: 'pressured', x: 54, y: 42 },
      { id: 'n4', label: 'Bab el-Mandeb · substantial / open', status: 'pressured', x: 57, y: 52 },
      { id: 'n5', label: 'Cape of Good Hope · held',    status: 'held',      x: 50, y: 72 },
    ],
    citation: {
      label: 'EIA · October STEO: September flows partially recover, while Q4 Middle East flows remain constrained (6 Oct 2026)',
      url: 'https://www.eia.gov/outlooks/steo/report/global_oil.php',
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
      label: 'U.S. EIA · October Short-Term Energy Outlook, global oil markets (6 Oct 2026; updated 15 Oct)',
      url: 'https://www.eia.gov/outlooks/steo/report/global_oil.php',
    },
    citation17: {
      label: 'IEA · Oil Market Report — October 2026 (15 Oct 2026)',
      url: 'https://www.iea.org/reports/oil-market-report-october-2026',
    },
    citation18: {
      label: 'U.S. EIA · October 21 Short-Term Energy Outlook: Q4 flows remain constrained',
      url: 'https://www.eia.gov/outlooks/steo/report/global_oil.php',
    },
    citation19: {
      label: 'ACLED · Saudi Arabia: Houthi attacks threaten aviation and energy infrastructure (23 Oct 2026)',
      url: 'https://acleddata.com/global-analysis',
    },
    citation20: {
      label: 'UKMTO/JMIC · Advisory 110: Hormuz attacks and Red Sea transit conditions (1 Nov 2026)',
      url: 'https://www.ukmto.org/-/media/ukmto/products/jmic_advisory_update_110_01-nov-1.pdf?rev=d2be223caff04f09bbf58d94c9aa8e0a',
    },
    citation21: {
      label: 'ACLED · Saudi energy-export infrastructure risks from Houthi attacks (2026)',
      url: 'https://acleddata.com/report/escalating-houthi-attacks-disrupt-saudi-aviation-and-increase-risks-energy-exports',
    },
  },

  debt: [
    { label: 'Sovereign Rollovers',   value: 100, sub: 'IMF (14 Oct): G7 10-year yields rose by more than one percentage point since February, reaching a near-20-year high' },
    { label: 'Projected Debt 2030',   value: 100, sub: 'IMF (Oct 2026): global public debt is expected to exceed 100% of GDP by 2030' },
    { label: 'LIC Debt Distress',     value: 78, sub: 'World Bank: 32 low- and middle-income countries (40%) in distress or high risk; higher rates could deepen the count (Reuters, 22 Jul 2026)' },
    { label: 'Reserve Hierarchy',     value: 100, sub: 'IMF (14 Oct): rising benchmark yields and high debt increase funding pressure across advanced and developing economies' },
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
    {
      label: 'IMF · Fiscal Monitor briefing: fiscal risks rise as debt, interest rates, and spending pressures increase (14 Oct 2026)',
      url: 'https://mediacenter.imf.org/news/imf---fiscal-monitor-report-annual-meetings--2026/s/1b05cec6-cde8-4b75-80ec-2b29f9fb5d19',
    },
    {
      label: 'IMF · Rising sovereign yields raise the fiscal stakes (13 Oct 2026)',
      url: 'https://www.imf.org/en/blogs/articles/2026/10/13/rising-sovereign-yields-raise-the-fiscal-stakes',
    },
  ],

  governance: {
    weakSpots: [
      { label: '54 countries declined vs 35 improved (2025)', status: 'EXPLOIT' },
      { label: '20th consecutive year of global decline',     status: 'AMPLIFY' },
      { label: 'Seven deteriorations in CrisisWatch October overview (30 Oct)', status: 'AMPLIFY' },
      { label: 'Russia-linked hybrid activity against European infrastructure is suspected, not confirmed (ACLED, 30 Oct)', status: 'OPEN' },
      { label: 'Saudi Arabia / Yemen: Houthi cross-border attacks widen (CrisisWatch, Oct)', status: 'OPEN' },
      { label: 'Ethiopia–Eritrea: border and diplomatic tensions worsen (CrisisWatch, Oct)', status: 'OPEN' },
      { label: 'Eastern DRC: former president forms alliance with M23, raising escalation risk (ACLED, 16 Oct)', status: 'OPEN' },
      { label: 'Kenya: goon violence and retaliatory mob justice rise ahead of 2027 elections (ACLED, 13 Oct)', status: 'AMPLIFY' },
      { label: 'Guinea / Senegal: militant spillover approaches mining and trade corridors (ACLED, 8 Oct)', status: 'OPEN' },
      { label: 'Türkiye: rights groups report 1,270 X-account blocking orders in September (12 Oct)', status: 'AMPLIFY' },
      { label: '88 Free · 48 Partly Free · 59 Not Free',      status: 'ABSORB'  },
    ],
    dossier: 'CrisisWatch’s 30 October overview lists seven deteriorated situations, including DRC, Eritrea, Ethiopia, Haiti, Saudi Arabia, Ukraine, and Yemen. ACLED’s 30 October report describes a more aggressive suspected Russian hybrid campaign against European critical infrastructure, while cautioning that its suspected-activity tag does not establish attribution. The control score rises one point on the broader fragmentation signal; resistance remains held because conflict does not alone demonstrate civic resilience.',
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
      label: 'ACLED · Global analysis: Tigray, DRC, Kenya and Red Sea flashpoints (13–16 Oct 2026)',
      url: 'https://acleddata.com/global-analysis',
    },
    citation9: {
      label: 'NPR · Fears of return to war grow in Ethiopia’s Tigray region (24 Sep 2026)',
      url: 'https://www.npr.org/2026/09/24/nx-s1-5978861/conflict-ethiopia-tigray',
    },
    citation10: {
      label: 'ACLED · New Tigray caretaker administration and breakdown of Pretoria agreement (16 Oct 2026)',
      url: 'https://acleddata.com/expert-comment/does-ethiopias-new-caretaker-administration-signal-end-pretoria-peace-agreement',
    },
    citation11: {
      label: 'ACLED · Former DRC president forms rebel alliance with M23 (16 Oct 2026)',
      url: 'https://acleddata.com/global-analysis',
    },
    citation12: {
      label: 'Human Rights Watch and partner groups · Türkiye: End Internet Censorship (12 Oct 2026)',
      url: 'https://www.bignewsnetwork.com/news/279367980/trkiye-end-internet-censorship',
    },
    citation13: {
      label: 'ACLED · Global analysis: Saudi Arabia, Somalia, and Syria flashpoints (23 Oct 2026)',
      url: 'https://acleddata.com/global-analysis',
    },
    citation14: {
      label: 'International Crisis Group · CrisisWatch October 2026 global overview (30 Oct)',
      url: 'https://www.crisisgroup.org/es/crisiswatch',
    },
    citation15: {
      label: 'ACLED · Suspected Russian hybrid threats ramp across Europe (30 Oct 2026; attribution caveat)',
      url: 'https://acleddata.com/report/sabotage-escalation-russias-hybrid-threats-ramp-across-europe',
    },
  },

  aiSurveillance: {
    terminal: [
      '[SITH-OMEGA] organizational AI adoption · 88% (HAI 2026)',
      '[WATCHTOWER] Foundation Model Transparency Index avg dropped 58 → 40',
      '[GRID-LENS] 5,427 US data centers · >10× nearest peer; TSMC fabricates almost every leading AI chip',
      '[DATA-CENTER] Reuters (18 Aug): Pennsylvania safeguards, Texas grid pause, and New York 50 MW moratorium show infrastructure control becoming a political chokepoint',
      '[FOTN-2025] 15th consecutive year of internet-freedom decline',
      '[FOTN-2026] Report published 22 Oct: 16/38 countries declined; 8 improved; its reporting period is Jun 2025–May 2026',
      '[AGE-GATE] Freedom House (22 Oct): age-assurance laws proposed, passed, or implemented in 10/38 assessed countries as of Jun 2026; Turkey’s bill would gate access through government ID',
      '[SHUTDOWN-2026] Iran: ~88-day nationwide internet blackout, longest in Freedom House’s 16-year series',
      '[AI-CONTENT] Freedom House (22 Oct): some AI-content rules address real harms but have also been abused to restrict online expression',
      '[FOTN-2025] arrests for online expression in 57 countries',
      '[PALANTIR] $1B DHS blanket-purchase agreement active since Feb 2026',
      '[NSPM-11] White House directive (5 Jun 2026) accelerates AI adoption and multi-vendor onboarding across national-security enterprise',
      '[SOVEREIGN-AI] Stanford HAI (14 Jul): local hosting and sovereign clouds reconfigure, but do not remove, dependence on U.S. chips/cloud/models',
      '[WORLD-MODEL] Stanford HAI (27 Jul): continuous spatial observation can create persistent profiles; concentrated control and unsafe deployment remain governance risks',
      '[IRIS-NET] ICE $25.1M sole-source BI2 award (May 2026) · 5M+ booking records · field run Jun 2026',
      '[EU AI ACT] transparency rules took effect 2 Aug 2026: labels for synthetic/deepfake content and biometric/emotion categorisation; enforcement fines up to €15M or 3% turnover',
      '[IDENTITY-MESH] UK OfDIA (Sep 2026): 275 digital-identity firms; 75% verify identity/attributes and 57% offer biometrics/liveness detection',
      '[CHINA-ID] Freedom House 2026: 2025 national digital-ID pilot centralizes verification; real-name accounts and facial scans expand identity-linked monitoring',
      '[IDENTITY-PILOT] VA (7 Oct 2026): optional CLEAR biometric login pilot across VA.gov and six medical centers; selfie sign-in and in-person enrollment',
      '[CLAUDE-WATCH] Anthropic (Sep 2026): AI-assisted surveillance pipelines mapped populations, identities, sentiment, and political opposition; one Mali platform targeted ~25M SIM cards',
      '[GENESIS-MISSION] DOE (16 Oct 2026): national AI platform links labs, supercomputers, AI systems, experimental facilities, and datasets with industry/academic partners',
      '[MODEL-CONCENTRATION] Stanford HAI 2026 AI Index: industry produced >90% of notable models; Nvidia supplies >60% of compute and TSMC fabricates almost every leading AI chip',
      '[AI-IDENTITY-PLAN] HRF (30 Oct): Vietnam plans broader AI integration of VNeID and public/private data sources; planned integration is not a completed deployment',
      '[AI-CAMERA-NET] HRF (30 Oct): Belarus reports 60,000 cameras feed AI for traffic-violation detection; political use of this AI system is not established',
      '[ELECTION-AI] Nigeria INEC formed an AI unit for election safeguards; human oversight is emphasized, so this is not scored as coercive surveillance',
    ],
    tools: [
      { label: 'Population sentiment · 81% (Freedom on the Net 2025)', value: 81 },
      { label: 'Biometric capture · DHS/ICE iris + facial expansion',  value: 82 },
      { label: 'Content blocking · 69% (Freedom on the Net 2025)',    value: 71 },
      { label: 'Internet/mobile shutdowns · 52% (Freedom on the Net 2025)', value: 52 },
      { label: 'AI regulatory trust · only 31% trust US to regulate', value: 31 },
      { label: 'Model transparency · FMTI average score',             value: 40 },
      { label: 'EU AI Act transparency enforcement · effective 2 Aug 2026', value: 63 },
      { label: 'Digital identity / biometric readiness · UK sector + VA pilot', value: 72 },
      { label: 'AI-linked camera network · Belarus traffic-detection use (reported)', value: 61 },
      { label: 'Age-assurance / digital-ID gates · 10 of 38 countries', value: 26 },
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
      {
        label: 'U.S. Department of Energy · Genesis Mission integrated AI and science platform (updated 16 Oct 2026)',
        url: 'https://www.energy.gov/undersecretaryforscience/genesis-mission/genesis-mission',
      },
      {
        label: 'Stanford HAI · 2026 AI Index: research and development concentration',
        url: 'https://hai.stanford.edu/ai-index/2026-ai-index-report/research-and-development',
      },
      {
        label: 'Freedom House · China digital identity, facial scans, and surveillance (Freedom in the World 2026)',
        url: 'https://freedomhouse.org/country/china/freedom-world/2026',
      },
      {
        label: 'Freedom House · Freedom on the Net 2026: global decline, age assurance, and AI-content controls (22 Oct 2026)',
        url: 'https://freedomhouse.org/article/new-report-authoritarian-internet-controls-drive-16th-consecutive-year-decline-global',
      },
      {
        label: 'Human Rights Foundation · AI for Individual Rights newsletter 24: Vietnam, Belarus, and surveillance plans (30 Oct 2026)',
        url: 'https://hrf.org/latest/hrfs-ai-for-individual-rights-newsletter-24/',
      },
      {
        label: 'Voice of Nigeria · INEC AI safeguards and human oversight ahead of 2027 elections',
        url: 'https://von.gov.ng/inec-unveils-ai-safeguards-ahead-of-2027-elections/',
      },
    ],
  },

  crypto: {
    dossier: 'Crypto remains dual-use. On 29 October, the SEC filed a complaint alleging that BG Wealth and DSJ Exchange raised more than $130 million through a crypto-investment fraud; the allegations are unproven and the case has no reported outcome. Chainalysis’ 29 October Sub-Saharan Africa report documents personal-wallet and cross-border P2P activity, but also reports declines in Nigerian DEX and P2P activity; these are regional data for July 2025–June 2026, not a one-week adoption surge. The OCC’s October stablecoin rule and ESMA’s non-MiCA supervisory expectations illustrate the regulated perimeter; the score rises modestly on verified enforcement reach and documented, mixed custody/settlement capacity.',
    nodes: [
      { name: 'Stablecoin perimeter',     role: 'OCC final payment-stablecoin rule (21 Oct; effective 18 Jan 2027) and ESMA (8 Oct) clarify issuer, custody, and service boundaries', status: 'severed' },
      { name: 'CLARITY Act market structure', role: 'Cleared Senate Banking Cttee 15–9 (14 May 2026); U.S. market-structure perimeter remains in legislative motion', status: 'pressured' },
      { name: 'CFTC / SEC rulemaking',     role: 'SEC staff FAQ (20 Oct) explains limited, conditional five-year exemptions for certain DLT venues and liquidity providers trading tokenized NMS stocks; other proposals remain proposals', status: 'pressured' },
      { name: 'Enforcement / analytics',    role: 'SEC filed a civil complaint on 29 Oct alleging a $130M crypto-investment fraud; allegations are unproven and no case outcome is reported', status: 'severed' },
      { name: 'U.S. custody perimeter', role: 'SEC (1 Oct): proposed adviser/fund rules would allow crypto self-custody in specified circumstances and state trust companies as custodians', status: 'pressured' },
      { name: 'Self-custody / P2P',       role: 'Chainalysis (29 Oct; Jul 2025–Jun 2026) reports regional personal-wallet/P2P activity alongside declines in Nigerian DEX and P2P use; evidence is mixed and not universal', status: 'open' },
      { name: 'EU third-country perimeter', role: 'EU 21st Russia-sanctions package: transaction bans on 14 crypto platforms and a first-use full third-country crypto-service ban', status: 'severed' },
      { name: 'Jurisdictional arbitrage', role: 'UAE ADGM · Switzerland · Singapore · El Salvador',           status: 'open'      },
    ],
    gauges: [
      { label: 'Sanctions Perimeter',      value: 100, sub: 'FinCEN’s 1 Oct A7 alert details a sanctions-linked digital-asset network and reinforces financial-institution screening and reporting leverage' },
      { label: 'Stablecoin Concentration', value: 99, sub: 'ESMA’s MiCA controls and FinCEN’s A7 alert underscore issuer, redemption, and regulated-service chokepoints around stablecoin settlement' },
      { label: 'Regulatory Clarity',       value: 90, sub: 'SEC staff clarified limited, temporary and conditional exemptive relief for certain DLT trading venues and liquidity providers in tokenized NMS stocks; this is not a broadly adopted rule' },
      { label: 'Self-Custody Surface',     value: 61, sub: 'New Chainalysis regional data document personal-wallet and cross-border P2P activity, with declines in Nigerian DEX/P2P use; measured capacity is mixed, geographically bounded, and not a one-week surge' },
      { label: 'Conditional DLT Venue Access', value: 44, sub: 'The SEC order is limited to qualifying tokenized-stock trading venues and liquidity providers, is conditional, and lasts five years; it does not open a general crypto exemption' },
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
      {
        label: 'FinCEN · Alert on the A7 Network and sanctions-linked digital-asset settlement (1 Oct 2026)',
        url: 'https://www.fincen.gov/system/files/2026-10/FinCEN-Alert-A7-Network.pdf',
      },
      {
        label: 'Chainalysis · 2026 Global Crypto Adoption Index: personal-wallet P2P transfers up 302.9%',
        url: 'https://www.chainalysis.com/blog/2026-global-crypto-adoption-index/',
      },
      {
        label: 'CFTC · CTX/CAM advance notice of proposed crypto market-structure rules (5 Oct 2026)',
        url: 'https://www.cftc.gov/PressRoom/PressReleases/9307-26',
      },
      {
        label: 'SEC · Regulation Crypto Assets public comment file (comments posted through 16 Oct 2026)',
        url: 'https://www.sec.gov/rules-regulations/public-comments/s7-2026-27',
      },
      {
        label: 'SEC · Crypto Task Force: Oct 20 FAQs on the conditional innovation exemption for tokenized NMS-stock venues',
        url: 'https://www.sec.gov/featured-topics/crypto-task-force/cryptosec',
      },
      {
        label: 'U.S. DOJ · Crypto-investment fraud prosecution: defendant extradited and appeared in court (23 Oct 2026; allegations only)',
        url: 'https://www.justice.gov/usao-cdca/pr/chinese-national-extradited-alleged-role-multimillion-dollar-cryptocurrency-scam',
      },
      {
        label: 'SEC · BG Wealth and DSJ Exchange crypto-investment fraud complaint (29 Oct 2026; allegations only)',
        url: 'https://www.sec.gov/enforcement-litigation/litigation-releases/lr-26679',
      },
      {
        label: 'Chainalysis · Sub-Saharan Africa crypto adoption, personal wallets, and P2P (29 Oct 2026; Jul 2025–Jun 2026 data)',
        url: 'https://www.chainalysis.com/blog/sub-saharan-africa-crypto-adoption-2026/',
      },
      {
        label: 'OCC · Final rule for permitted payment stablecoin issuers (21 Oct 2026; effective 18 Jan 2027)',
        url: 'https://www.occ.gov/news-issuances/news-releases/2026/nr-occ-2026-92.html',
      },
    ],
  },

  rebelResistanceIndex: [
    {
      id: 'energy',
      name: 'Energy',
      score: 12,
      blurb: 'UKMTO/JMIC’s 1 Nov advisory rates Hormuz threat severe and Bab el-Mandeb substantial; it reports 18 confirmed Hormuz attacks since 6 Oct and reduced commercial traffic, while Bab el-Mandeb remains open at about 35 daily transits with no confirmed shipping attack during the advisory period. EIA still forecasts constrained Q4 flows. Neither strait is represented as fully closed. Imperial Control 100 · Rebel Resistance 12.',
      citations: [
        { label: 'IEA · Oil Market Report October 2026 (15 Oct)', url: 'https://www.iea.org/reports/oil-market-report-october-2026' },
        { label: 'EIA · October Short-Term Energy Outlook, updated 21 Oct', url: 'https://www.eia.gov/outlooks/steo/report/global_oil.php' },
        { label: 'ACLED · Houthi attacks threaten Saudi aviation and energy infrastructure (23 Oct)', url: 'https://acleddata.com/global-analysis' },
        { label: 'UKMTO/JMIC · Advisory 110 (1 Nov 2026)', url: 'https://www.ukmto.org/-/media/ukmto/products/jmic_advisory_update_110_01-nov-1.pdf?rev=d2be223caff04f09bbf58d94c9aa8e0a' },
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
      score: 26,
      blurb: 'The IMF’s 14 Oct Fiscal Monitor says public debt is very high and rising as interest rates and persistent spending pressures add to fiscal risk; its October analysis reports G7 yields near two-decade highs. Imperial Control 89 · Rebel Resistance 26.',
      citations: [
        { label: 'IMF · Fiscal Monitor briefing on rising fiscal risks (14 Oct 2026)', url: 'https://mediacenter.imf.org/news/imf---fiscal-monitor-report-annual-meetings--2026/s/1b05cec6-cde8-4b75-80ec-2b29f9fb5d19' },
        { label: 'IMF · Rising sovereign yields raise the fiscal stakes (13 Oct 2026)', url: 'https://www.imf.org/en/blogs/articles/2026/10/13/rising-sovereign-yields-raise-the-fiscal-stakes' },
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
      score: 66,
      blurb: 'CrisisWatch’s 30 Oct overview lists seven deteriorations; ACLED’s 30 Oct report describes suspected, not confirmed, Russian-linked hybrid activity against European infrastructure. Imperial Control rises one point on the widened fragmentation signal; Rebel Resistance is held because conflict does not alone demonstrate civic resilience. Imperial Control 76 · Rebel Resistance 66.',
      citations: [
        { label: 'ACLED · Tigray caretaker administration and Pretoria agreement (16 Oct 2026)', url: 'https://acleddata.com/expert-comment/does-ethiopias-new-caretaker-administration-signal-end-pretoria-peace-agreement' },
        { label: 'ACLED · Global analysis: Saudi Arabia, Somalia, and Syria flashpoints (23 Oct 2026)', url: 'https://acleddata.com/global-analysis' },
        { label: 'International Crisis Group · CrisisWatch October 2026 overview (30 Oct)', url: 'https://www.crisisgroup.org/es/crisiswatch' },
        { label: 'ACLED · Suspected Russian hybrid threats ramp across Europe (30 Oct; attribution caveat)', url: 'https://acleddata.com/report/sabotage-escalation-russias-hybrid-threats-ramp-across-europe' },
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
      score: 40,
      blurb: 'The SEC’s 29 Oct complaint alleges a $130M crypto-investment fraud; allegations remain unproven. A newly published Chainalysis report documents regional personal-wallet and P2P settlement activity but also declines in Nigerian DEX/P2P use (data cover Jul 2025–Jun 2026, not a one-week surge). Control rises on targeted enforcement reach; resistance rises one point for documented, mixed settlement capacity. Imperial Control 100 · Rebel Resistance 40.',
      citations: [
        { label: 'SEC · FAQs on limited conditional innovation exemption for tokenized NMS-stock venues (20 Oct 2026)', url: 'https://www.sec.gov/featured-topics/crypto-task-force/cryptosec' },
        { label: 'U.S. DOJ · Crypto-investment fraud prosecution (23 Oct 2026; allegations only)', url: 'https://www.justice.gov/usao-cdca/pr/chinese-national-extradited-alleged-role-multimillion-dollar-cryptocurrency-scam' },
        { label: 'FinCEN · A7 Network alert (1 Oct 2026; prior-cycle baseline)', url: 'https://www.fincen.gov/system/files/2026-10/FinCEN-Alert-A7-Network.pdf' },
        { label: 'Chainalysis · 2026 Global Crypto Adoption Index (prior-cycle wallet/P2P measurements)', url: 'https://www.chainalysis.com/blog/2026-global-crypto-adoption-index/' },
        { label: 'SEC · BG Wealth and DSJ Exchange crypto-investment fraud complaint (29 Oct; allegations only)', url: 'https://www.sec.gov/enforcement-litigation/litigation-releases/lr-26679' },
        { label: 'Chainalysis · Sub-Saharan Africa crypto adoption report (29 Oct; Jul 2025–Jun 2026 data)', url: 'https://www.chainalysis.com/blog/sub-saharan-africa-crypto-adoption-2026/' },
        { label: 'OCC · Final permitted payment stablecoin issuer rule (21 Oct; effective 18 Jan 2027)', url: 'https://www.occ.gov/news-issuances/news-releases/2026/nr-occ-2026-92.html' },
      ],
      mech: [
        'Hardware self-custody and multisig reduce custodial seizure surface',
        'Peer-to-peer settlement preserves limited venue-independent optionality, though coverage and compliance obligations vary',
        'Jurisdictional fragmentation (UAE, Switzerland, Singapore, El Salvador) preserves optionality',
      ],
    },
    {
      id: 'ai',
      name: 'AI',
      score: 23,
      blurb: 'HRF’s 30 Oct report says Belarus reports 60,000 cameras already feed AI for traffic-violation detection; it warns footage has been used against protesters but does not establish that this AI system is used for political monitoring. Vietnam’s VNeID AI integration remains planned, while Nigeria’s election AI emphasizes human oversight. Installed monitoring capacity supports a one-point readiness increase; Rebel Resistance holds. Imperial Control 93 · Rebel Resistance 23.',
      citations: [
        { label: 'U.S. DOE · Genesis Mission integrated AI platform (updated 16 Oct 2026)', url: 'https://www.energy.gov/undersecretaryforscience/genesis-mission/genesis-mission' },
        { label: 'Stanford HAI · 2026 AI Index research and development', url: 'https://hai.stanford.edu/ai-index/2026-ai-index-report/research-and-development' },
        { label: 'Freedom House · Freedom on the Net 2026 findings (published 22 Oct; report covers Jun 2025–May 2026)', url: 'https://freedomhouse.org/article/new-report-authoritarian-internet-controls-drive-16th-consecutive-year-decline-global' },
        { label: 'Freedom House · Freedom on the Net 2026 full report', url: 'https://freedomhouse.org/report/freedom-net/2026/seismic-shifts-global-internet' },
        { label: 'Human Rights Foundation · AI for Individual Rights newsletter 24 (30 Oct 2026)', url: 'https://hrf.org/latest/hrfs-ai-for-individual-rights-newsletter-24/' },
        { label: 'Voice of Nigeria · INEC AI safeguards and human oversight', url: 'https://von.gov.ng/inec-unveils-ai-safeguards-ahead-of-2027-elections/' },
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
    '2026-11-02 — Weekly metric refresh (current to 2026-11-02):',
    '  Biggest movement: Crypto (Imperial Control 99 → 100; Rebel Resistance 39 → 40; +1 on each score). SEC’s 29 Oct complaint alleges a $130M crypto-investment fraud (not an adjudicated finding). Chainalysis’ 29 Oct Sub-Saharan Africa report says personal wallets were 32.3% of regional value received and cross-border P2P 70.9% in its received-value breakdown; Nigeria DEX activity fell 45% y/y and cross-border P2P flows 17% y/y. These data cover Jul 2025–Jun 2026 and are not a one-week growth measure; the report does not characterize them as resistance. OCC’s final stablecoin issuer rule (21 Oct; effective 18 Jan 2027) and ESMA’s 8 Oct guidance remain perimeter context, not new this week. Sources: https://www.sec.gov/enforcement-litigation/litigation-releases/lr-26679 ; https://www.chainalysis.com/blog/sub-saharan-africa-crypto-adoption-2026/ ; https://www.occ.gov/news-issuances/news-releases/2026/nr-occ-2026-92.html ; https://www.esma.europa.eu/press-news/esma-news/esma-sets-out-supervisory-expectations-services-related-unauthorised',
    '  Energy (Imperial Control 100 / Rebel Resistance 12 — held): UKMTO/JMIC (1 Nov) rates Hormuz severe and Bab el-Mandeb substantial; it reports 18 confirmed Hormuz attacks since 6 Oct, reduced Hormuz commercial traffic, no confirmed Bab el-Mandeb shipping attack during the advisory period, and about 35 daily transits while describing Bab el-Mandeb as open. Both routes are marked pressured, not closed. EIA’s Q4 shut-in forecast remains a structural constraint. Sources: https://www.ukmto.org/-/media/ukmto/products/jmic_advisory_update_110_01-nov-1.pdf?rev=d2be223caff04f09bbf58d94c9aa8e0a ; https://www.eia.gov/outlooks/steo/report/global_oil.php',
    '  Governance (Imperial Control 75 → 76 / Rebel Resistance 66 — held): CrisisWatch (30 Oct) lists seven deteriorations; ACLED (30 Oct) documents suspected Russian-linked hybrid activity against European infrastructure and explicitly cautions that its suspected-activity tag does not prove attribution. Sources: https://www.crisisgroup.org/es/crisiswatch ; https://acleddata.com/report/sabotage-escalation-russias-hybrid-threats-ramp-across-europe',
    '  AI / digital control (Imperial Control 92 → 93 / Rebel Resistance 23 — held): HRF (30 Oct) reports Belarus says 60,000 cameras already feed AI for traffic-violation detection. Although HRF notes that footage has been used to identify and arrest protesters, it does not establish that this AI system is used for political monitoring; newly documented installed capacity supports a modest readiness reweighting, not a claim of a new deployment. Vietnam VNeID AI integration remains planned, while Nigeria INEC’s AI unit emphasizes election safeguards and human oversight. Sources: https://hrf.org/latest/hrfs-ai-for-individual-rights-newsletter-24/ ; https://von.gov.ng/inec-unveils-ai-safeguards-ahead-of-2027-elections/',
    '  Debt (Imperial Control 89 / Rebel Resistance 26 — held): selected official debt/yield series through September did not establish a comparable post-26-Oct stress step-change; retain the 13–14 Oct IMF baseline. Sources: https://www.imf.org/en/blogs/articles/2026/10/13/rising-sovereign-yields-raise-the-fiscal-stakes ; https://mediacenter.imf.org/news/imf---fiscal-monitor-report-annual-meetings--2026/s/1b05cec6-cde8-4b75-80ec-2b29f9fb5d19',
    '',
    '2026-10-26 — Weekly metric refresh (current to 2026-10-26):',
    '  Biggest movement: Crypto (Imperial Control 97 → 99 / Rebel Resistance 38 → 39; 3 paired points). DOJ reported an Oct 23 initial appearance after extradition in a crypto-fraud case; allegations describe bank transfers converted to USDT and onward wallet movement. SEC staff FAQs (20 Oct) clarified the Commission’s limited, temporary, conditional five-year exemptions for certain DLT venues/liquidity providers trading tokenized NMS stocks. Control leverage rises on targeted enforcement reach (+2); the Rebel score rises only one point for narrow institutional DLT access, not broad P2P growth. Sources: https://www.justice.gov/usao-cdca/pr/chinese-national-extradited-alleged-role-multimillion-dollar-cryptocurrency-scam ; https://www.sec.gov/featured-topics/crypto-task-force/cryptosec',
    '  AI / digital control (Imperial Control 91 → 92 / Rebel Resistance 24 → 23): Freedom House published Freedom on the Net 2026 on 22 Oct; its reporting period is Jun 2025–May 2026. The report records decline in 16/38 countries, gains in 8, age-assurance laws in 10/38, and concerns about digital-ID-linked access and AI-content rules being used to restrict expression. Sources: https://freedomhouse.org/article/new-report-authoritarian-internet-controls-drive-16th-consecutive-year-decline-global ; https://freedomhouse.org/report/freedom-net/2026/seismic-shifts-global-internet',
    '  Energy (Imperial Control 100 — held at ceiling / Rebel Resistance 13 → 12): EIA’s 21 Oct outlook still forecasts 4.5 million b/d of Middle East shut-ins in Q4 and ACLED (23 Oct) reports renewed Houthi threats to Saudi aviation and energy infrastructure; bypass routes and partial recovery remain exposed workarounds. Sources: https://www.eia.gov/outlooks/steo/report/global_oil.php ; https://acleddata.com/global-analysis',
    '  Governance (Imperial Control 74 → 75 / Rebel Resistance 66 — held): ACLED’s 23 Oct analysis flags Houthi threats to Saudi infrastructure, Somalia territorial contestation, and rising tribal disputes in Syria amid state inaction. No resistance increase is inferred from armed conflict alone. Source: https://acleddata.com/global-analysis',
    '  Debt (Imperial Control 89 / Rebel Resistance 26 — held): no distinct post-19 Oct sovereign debt or yield update was verified; retain the 13–14 Oct IMF baseline. Sources: https://mediacenter.imf.org/news/imf---fiscal-monitor-report-annual-meetings--2026/s/1b05cec6-cde8-4b75-80ec-2b29f9fb5d19 ; https://www.imf.org/en/blogs/articles/2026/10/13/rising-sovereign-yields-raise-the-fiscal-stakes',
    '',
    '2026-10-19 — Weekly metric refresh (current to 2026-10-19):',
    '  Biggest movement: Crypto (Imperial Control 96 → 97 / Rebel Resistance 36 → 38). FinCEN’s 1 Oct A7 Network alert reinforces sanctions-linked digital-asset and stablecoin screening; CFTC and SEC proposals remain under comment rather than adopted. Chainalysis finds one direct domestic personal-wallet transfer series rose 302.9% to $228.7B and its share rose 0.6% → 2.5%, while the overall measured crypto economy fell 1.6% and a separate all-asset domestic P2P measure fell 19.7%. The resistance score rises modestly from a small/defined base, not a claim of broad adoption. Treasury’s 15 Oct Iran financial-network release did not expressly designate crypto services, so it was not counted as a direct crypto enforcement action. Sources: https://www.fincen.gov/system/files/2026-10/FinCEN-Alert-A7-Network.pdf ; https://www.chainalysis.com/blog/2026-global-crypto-adoption-index/ ; https://www.cftc.gov/PressRoom/PressReleases/9307-26 ; https://www.sec.gov/rules-regulations/public-comments/s7-2026-27 ; https://home.treasury.gov/news/press-releases/sb0660',
    '  Energy (Imperial Control 100 / Rebel Resistance 12 → 13): EIA reports September exports and Hormuz flows partly recovered via bypass routes and ship-to-ship transfers, but Q4 Middle East flows remain constrained; IEA’s 15 Oct Oil Market Report describes the disruption as historically severe. Sources: https://www.eia.gov/outlooks/steo/report/global_oil.php ; https://www.iea.org/reports/oil-market-report-october-2026',
    '  Debt (Imperial Control 88 → 89 / Rebel Resistance 27 → 26): IMF’s 14 Oct Fiscal Monitor briefing says global public debt is very high and rising, interest rates are higher, spending pressures persist, and fiscal risks are increasing; its October sovereign-yield analysis reports G7 10-year yields rose by over one percentage point since February to a near-20-year high. Sources: https://mediacenter.imf.org/news/imf---fiscal-monitor-report-annual-meetings--2026/s/1b05cec6-cde8-4b75-80ec-2b29f9fb5d19 ; https://www.imf.org/en/blogs/articles/2026/10/13/rising-sovereign-yields-raise-the-fiscal-stakes',
    '  Governance (Imperial Control 73 → 74 / Rebel Resistance 65 → 66): ACLED’s 16 Oct analysis says a federal caretaker administration marks a further breakdown of the Pretoria arrangements in Tigray, while its global analysis flags a former DRC president’s M23 alliance and election-linked violence in Kenya. Sources: https://acleddata.com/expert-comment/does-ethiopias-new-caretaker-administration-signal-end-pretoria-peace-agreement ; https://acleddata.com/global-analysis',
    '  AI / digital control (Imperial Control 90 → 91 / Rebel Resistance 24 — held): DOE’s October Genesis Mission progress advances an integrated national AI/science platform; Stanford’s 2026 Index documents model and compute concentration. No distinct new surveillance deployment was verified, so resistance stays unchanged. Sources: https://www.energy.gov/undersecretaryforscience/genesis-mission/genesis-mission ; https://hai.stanford.edu/ai-index/2026-ai-index-report/research-and-development ; https://freedomhouse.org/country/china/freedom-world/2026',
    '',
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
