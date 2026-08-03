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
    sector: 'Sector 001 · Earth Annex Protocol · reading current to 2026-08-03',
    subjugationIndex: 84,
    subjugationTier: 'CRITICAL',
  },

  imperialControl: [
    { label: 'Compliant Polities',   value: '122',    delta: '▲ 1 this cycle',     deltaTone: 'up'   },
    { label: 'Theatres Encircled',   value: '16 / 17', delta: '▲ 1 this cycle',     deltaTone: 'up'   },
    { label: 'Resistance Cells',     value: '309',    delta: '▲ 0.3% churn',       deltaTone: 'flat' },
    { label: 'Levy Yield',           value: '¤1.93T', delta: '▲ 0.5% q/q',         deltaTone: 'up'   },
  ],

  theatreReadiness: [
    { label: 'Fleet Posture',         value: 94 },
    { label: 'Economic Grip',         value: 85 },
    { label: 'Surveillance Mesh',     value: 75 },
    { label: 'Compliance Engines',    value: 55 },
    { label: 'Crypto Perimeter',      value: 83 },
    { label: 'Insurgent Liquidity',   value: 33 },
  ],

  directives: [
    'Hormuz remains functionally severed: Reuters/Kpler reported ~3 commodity vessels/day vs ~125/day pre-war, while Treasury (29 Jul) says Iran used mandatory maritime insurance and digital-asset payments to monetize transit control.',
    'Prepare countermeasures for rerouting and black-flagged shipping around the Strait.',
    'Press sovereign debt advantage as US fiscal credibility erodes and EM restructurings open.',
    'Exploit governance fractures.',
    'Tighten the crypto regulatory perimeter via MiCA (EU) wind-down enforcement and OFAC/secondary-sanctions signaling; harden stablecoin and exchange chokepoints.',
    'Trace rebel digital reserves through stablecoin issuers.',
    'Saturate civilian biometrics across DHS theatres.',
  ],

  energyChokepoints: {
    nodes: [
      { name: 'Strait of Hormuz',     role: 'Reuters/Kpler (17 Jul): ~3 commodity vessels/day vs ~125/day pre-war; Treasury (29 Jul): IRGC-backed maritime-insurance scheme uses digital-asset payments to monetize transit control', status: 'severed' },
      { name: 'Strait of Malacca',    role: '23.2 mb/d · largest oil flow (1H25); rising geopolitical risk',     status: 'pressured' },
      { name: 'Suez / SUMED',         role: '4.9 mb/d · ~half of 2023 levels; transits still near multi-year lows', status: 'pressured' },
      { name: 'Bab el-Mandeb',        role: 'Reuters (8 Jun): Houthi ban on Israeli vessels; traffic still below pre-Oct 2023; Reuters (25 Jul): Houthi naval blockade and strikes on Saudi oil sites threaten a second route', status: 'severed'   },
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
      label: 'Reuters/Kpler (2026-07-17) Hormuz transits collapse · Reuters (2026-07-25) Red Sea spread / Houthi blockade · Treasury (2026-07-29) Hormuz insurance and shadow-fleet sanctions · MARAD Advisory 2026-006',
      url: 'https://www.reuters.com/world/middle-east/strait-hormuz-transits-drop-us-iran-escalate-attacks-across-gulf-2026-07-17/',
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
  },

  debt: [
    { label: 'Sovereign Rollovers',   value: 94, sub: 'Fitch: developed-market debt projected at $75.8T / 104% of GDP in 2026; 10-year yields remain ~51 bp above pre-war levels (Reuters, 21 Jul 2026)' },
    { label: 'Projected Debt 2029',   value: 100, sub: 'IMF: 100% of GDP by 2029, one year earlier than April 2025 path' },
    { label: 'LIC Debt Distress',     value: 78, sub: 'World Bank: 32 low- and middle-income countries (40%) in distress or high risk; higher rates could deepen the count (Reuters, 22 Jul 2026)' },
    { label: 'Reserve Hierarchy',     value: 95, sub: 'US below AAA tri-agency (Moody’s Aa1, May 2025); Fitch says major-market 10-year yields remain ~51 bp above pre-war levels' },
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
  ],

  governance: {
    weakSpots: [
      { label: '54 countries declined vs 35 improved (2025)', status: 'EXPLOIT' },
      { label: '20th consecutive year of global decline',     status: 'AMPLIFY' },
      { label: 'Guinea-Bissau −8 (coup) · Tanzania −7 · US −3', status: 'OPEN'  },
      { label: '88 Free · 48 Partly Free · 59 Not Free',      status: 'ABSORB'  },
    ],
    dossier: 'Freedom in the World 2026: a 20th consecutive year of global freedom decline. Declines affected 40% of world population; improvements 7%. ACLED’s July Ukraine update recorded 1,958 conflict events, 239 incidents targeting civilians, and at least 136 civilian deaths in one week; its Sudan analysis describes a shifting multi-front war and mass displacement. Fragmentation keeps both Imperial coercion and resistance capacity elevated.',
    citation: {
      label: 'Freedom House · Freedom in the World 2026 (March 2026)',
      url: 'https://freedomhouse.org/report/freedom-world/2026/growing-shadow-autocracy',
    },
    citation2: {
      label: 'ACLED · Ukraine war situation update (11–17 Jul 2026; published 22 Jul 2026)',
      url: 'https://acleddata.com/update/ukraine-war-situation-update-11-17-july-2026',
    },
    citation3: {
      label: 'ACLED · Sudan front shifts to North/West Darfur (23 Jul 2026)',
      url: 'https://acleddata.com/expert-comment/where-sudans-frontline-moving-next',
    },
  },

  aiSurveillance: {
    terminal: [
      '[SITH-OMEGA] organizational AI adoption · 88% (HAI 2026)',
      '[WATCHTOWER] Foundation Model Transparency Index avg dropped 58 → 40',
      '[GRID-LENS] 5,427 US data centers · >10× nearest peer',
      '[FOTN-2025] 15th consecutive year of internet-freedom decline',
      '[DIRECTIVE] arrests for online expression in 57 countries',
      '[PALANTIR] $1B DHS blanket-purchase agreement active since Feb 2026',
      '[NSPM-11] White House directive (5 Jun 2026) accelerates AI adoption and multi-vendor onboarding across national-security enterprise',
      '[SOVEREIGN-AI] Stanford HAI (14 Jul): local hosting and sovereign clouds reconfigure, but do not remove, dependence on U.S. chips/cloud/models',
      '[WORLD-MODEL] Stanford HAI (27 Jul): continuous spatial observation can create persistent profiles; concentrated control and unsafe deployment remain governance risks',
      '[IRIS-NET] ICE $25.1M sole-source BI2 award (May 2026) · 5M+ booking records · field run Jun 2026',
    ],
    tools: [
      { label: 'Population sentiment · 81% live where arrests occur', value: 81 },
      { label: 'Biometric capture · DHS/ICE iris + facial expansion',  value: 72 },
      { label: 'Content blocking · 69% of internet users',            value: 69 },
      { label: 'Internet/mobile shutdowns · 52% of users',            value: 52 },
      { label: 'AI regulatory trust · only 31% trust US to regulate', value: 31 },
      { label: 'Model transparency · FMTI average score',             value: 40 },
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
    ],
  },

  crypto: {
    dossier: 'Crypto remains dual-use in the control loop. The perimeter tightened again in late July: ESMA launched a Common Supervisory Action on CASP custody resilience (8 Jul, running from 2H26 to 1H27), while Treasury/OFAC’s 29 Jul action designated an IRGC-backed maritime-insurance scheme that accepts Bitcoin and other digital assets and uses them to monetize Strait-of-Hormuz transit control. MiCA wind-down rules, GENIUS Act stablecoin AML/sanctions requirements, and Iran-exchange designations keep regulated gateways central. Self-custody, non-custodial settlement, and jurisdictional fragmentation still provide meaningful resistance capacity (high-level, non-operational).',
    nodes: [
      { name: 'Stablecoin perimeter',     role: 'MiCA enforcement (EU) + U.S. stablecoin AML rulemaking keep issuer-side chokepoints central', status: 'severed' },
      { name: 'CLARITY Act market structure', role: 'Cleared Senate Banking Cttee 15–9 (14 May 2026); U.S. market-structure perimeter remains in legislative motion', status: 'pressured' },
      { name: 'FATF stablecoin focus',    role: 'Targeted updates keep stablecoins and Travel Rule effectiveness on the perimeter agenda', status: 'pressured' },
      { name: 'Iran exchange chokepoints', role: 'OFAC June designations plus Treasury 29 Jul action: digital-asset payments tied to Iran-linked maritime insurance and sanctions-evasion finance; secondary-risk signaling tightens global compliance posture', status: 'severed' },
      { name: 'Self-custody / P2P',       role: 'Hardware wallets · multisig · DEX · unhosted-wallet gap',     status: 'open'      },
      { name: 'Jurisdictional arbitrage', role: 'UAE ADGM · Switzerland · Singapore · El Salvador',           status: 'open'      },
    ],
    gauges: [
      { label: 'Sanctions Perimeter',      value: 96, sub: 'Treasury/OFAC 29 Jul designates an IRGC-backed maritime-insurance scheme accepting digital assets; earlier Iran-exchange designations and issuer freezes keep secondary exposure high' },
      { label: 'Stablecoin Concentration', value: 86, sub: 'Stablecoin rails remain a concentrated settlement perimeter; MiCA enforcement, issuer authorization, and stablecoin AML/sanctions programs increase gateway leverage' },
      { label: 'Regulatory Clarity',       value: 76, sub: 'ESMA’s 8 Jul CASP custody-resilience action runs from 2H26 to 1H27; MiCA wind-down and Travel Rule expectations make regulated venue obligations clearer' },
      { label: 'Self-Custody Surface',     value: 56, sub: 'Unhosted wallets and P2P still provide a non-custodial surface, but fiat on/off ramps and custody providers face tighter supervisory controls'    },
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
    ],
  },

  rebelResistanceIndex: [
    {
      id: 'energy',
      name: 'Energy',
      score: 23,
      blurb: 'Hormuz remains functionally severed: Reuters/Kpler reported ~3 commodity vessels/day vs ~125/day pre-war, while Treasury (29 Jul) describes mandatory maritime insurance and shadow-fleet pressure; Red Sea blockade risk widens the route shock. Imperial Control 89 · Rebel Resistance 23.',
      mech: [
        'Cape of Good Hope reroute institutionalized; pipeline diversions (Yanbu, Fujairah, Ceyhan) reduce but do not replace Gulf flows',
        'Rooftop solar, behind-the-meter storage, and community microgrids still erode single-point dependence at the demand edge',
        'Diversified spot LNG and regional renewables blunt longer-term pipeline coercion',
      ],
    },
    {
      id: 'debt',
      name: 'Debt',
      score: 37,
      blurb: 'Fitch projects developed-market debt at $75.8T / 104% of GDP in 2026 with major-market yields ~51 bp above pre-war; World Bank says 32 LMICs (40%) are in debt distress or high risk. Imperial Control 78 · Rebel Resistance 37.',
      mech: [
        'G20 Common Framework restructuring and IMF/Paris Club processes preserve some sovereign optionality',
        'EM local-currency debt markets and non-Western reserve diversification push back on dollar-only architecture',
        'Uncoordinated creditor politics slow unified enforcement across jurisdictions',
      ],
    },
    {
      id: 'governance',
      name: 'Governance',
      score: 58,
      blurb: '20th consecutive year of global freedom decline (FH 2026); ACLED’s July Ukraine and Sudan updates show high-intensity, multi-front violence and displacement. Imperial Control 66 · Rebel Resistance 58 — both elevated as governance fragments.',
      mech: [
        'Federalism and subnational authority diffuse compliance burdens across thousands of units',
        'Independent judiciaries, free press, and civil-society NGOs maintain legitimacy alternatives',
        'Treaty pluralism — no single body commands universal extraterritorial reach',
      ],
    },
    {
      id: 'crypto',
      name: 'Crypto',
      score: 48,
      blurb: 'Perimeter tightened again: ESMA’s 8 Jul custody-resilience supervision and Treasury’s 29 Jul designation of a digital-asset-funded Hormuz insurance scheme extend control into custody and sanctions-linked settlement. Self-custody and jurisdictional fragmentation retain capacity, but the resistance surface narrows. Imperial Control 83 · Rebel Resistance 48.',
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
      blurb: 'NSPM-11 accelerates national-security AI adoption; Stanford HAI’s July briefs warn that sovereign clouds can reconfigure dependence on U.S. chips, clouds, and models while world models enable persistent spatial profiles. Imperial Control 82 · Rebel Resistance 32.',
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
