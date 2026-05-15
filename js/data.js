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
    sector: 'Sector 001 · Earth Annex Protocol · 2025 / early-2026 reading',
    subjugationIndex: 74,
    subjugationTier: 'CRITICAL',
  },

  imperialControl: [
    { label: 'Compliant Polities',   value: '118',    delta: '▲ 9 this cycle',     deltaTone: 'up'   },
    { label: 'Theatres Encircled',   value: '14 / 17', delta: '▲ 2 this cycle',    deltaTone: 'up'   },
    { label: 'Resistance Cells',     value: '312',    delta: '▼ 4.1% attrition',   deltaTone: 'flat' },
    { label: 'Levy Yield',           value: '¤1.84T', delta: '▲ 6.3% q/q',         deltaTone: 'up'   },
  ],

  theatreReadiness: [
    { label: 'Fleet Posture',         value: 88 },
    { label: 'Economic Grip',         value: 74 },
    { label: 'Surveillance Mesh',     value: 61 },
    { label: 'Compliance Engines',    value: 52 },
    { label: 'Crypto Perimeter',      value: 57 },
    { label: 'Insurgent Liquidity',   value: 38 },
  ],

  directives: [
    'Sever energy arteries on resistance refusal.',
    'Refinance sovereign debt under Imperial bonds.',
    'Exploit governance fractures.',
    'Tighten the crypto regulatory perimeter.',
    'Trace rebel digital reserves.',
    'Saturate civilian biometrics.',
  ],

  energyChokepoints: {
    nodes: [
      { name: 'Strait of Hormuz',     role: '~20% of global oil · ~20% of LNG (1H25)', status: 'pressured' },
      { name: 'Strait of Malacca',    role: '23.2 mb/d · largest oil flow (1H25)',     status: 'pressured' },
      { name: 'Suez / SUMED',         role: '4.9 mb/d · ~half of 2023 levels',         status: 'pressured' },
      { name: 'Bab el-Mandeb',        role: '4.2 mb/d · ~half of 2023 levels',         status: 'severed'   },
      { name: 'Cape of Good Hope',    role: '9.1 mb/d · +3 mb/d vs 2022 (reroute)',    status: 'held'      },
    ],
    mapNodes: [
      { id: 'n1', label: 'Hormuz · pressured',          status: 'pressured', x: 62, y: 47 },
      { id: 'n2', label: 'Malacca · pressured',         status: 'pressured', x: 76, y: 55 },
      { id: 'n3', label: 'Suez / SUMED · pressured',    status: 'pressured', x: 54, y: 42 },
      { id: 'n4', label: 'Bab el-Mandeb · severed',     status: 'severed',   x: 57, y: 52 },
      { id: 'n5', label: 'Cape of Good Hope · held',    status: 'held',      x: 50, y: 72 },
    ],
    citation: {
      label: 'EIA · World Oil Transit Chokepoints (updated 2026-03-03)',
      url: 'https://www.eia.gov/international/analysis/special-topics/World_Oil_Transit_Chokepoints',
    },
  },

  debt: [
    { label: 'Sovereign Rollovers',   value: 88, sub: 'Global public debt ~94% of GDP in 2025 (IMF FM Apr 2026)' },
    { label: 'Projected Debt 2029',   value: 100, sub: 'Projected to reach 100% of GDP by 2029' },
    { label: 'EM Debt Service',       value: 73, sub: '$1.4T paid by developing countries in 2023 (WB IDR 2024)' },
    { label: 'Reserve Hierarchy',     value: 91, sub: 'Treasury safety-premium erosion among IMF amplifiers' },
  ],

  debtCitations: [
    {
      label: 'IMF · Fiscal Monitor (April 2026)',
      url: 'https://www.imf.org/en/publications/fm/issues/2026/04/15/fiscal-monitor-april-2026',
    },
    {
      label: 'World Bank · International Debt Report 2024',
      url: 'https://www.worldbank.org/en/news/press-release/2024/12/03/developing-countries-paid-record-1-4-trillion-on-foreign-debt-in-2023',
    },
  ],

  governance: {
    weakSpots: [
      { label: '54 countries declined vs 35 improved (2025)', status: 'EXPLOIT' },
      { label: '20th consecutive year of global decline',     status: 'AMPLIFY' },
      { label: '9 African coups since 2019',                  status: 'OPEN'    },
      { label: '88 Free · 48 Partly Free · 59 Not Free',      status: 'ABSORB'  },
    ],
    dossier: 'Freedom in the World 2026: a 20th consecutive year of global freedom decline. Declines affected 40% of world population; improvements 7%. A divided planet does not need to be broken — it is already broken.',
    citation: {
      label: 'Freedom House · Freedom in the World 2026 (March 2026)',
      url: 'https://freedomhouse.org/sites/default/files/2026-03/FIW2026_final_digital%20(1).pdf',
    },
  },

  aiSurveillance: {
    terminal: [
      '[SITH-OMEGA] organizational AI adoption · 88% (HAI 2026)',
      '[WATCHTOWER] >90% of frontier models from industry · 2025',
      '[GRID-LENS] 5,427 US data centers · >10× nearest peer',
      '[FOTN-2025] 15th consecutive year of internet-freedom decline',
      '[DIRECTIVE] arrests for online expression in 57 countries',
    ],
    tools: [
      { label: 'Population sentiment · 81% live where arrests occur', value: 81 },
      { label: 'Content blocking · 69% of internet users',            value: 69 },
      { label: 'Internet/mobile shutdowns · 52% of users',            value: 52 },
      { label: 'AI regulatory trust · only 31% trust US to regulate', value: 31 },
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
        label: 'Freedom House · Freedom on the Net 2025 (PDF)',
        url: 'https://freedomhouse.org/sites/default/files/2025-11/Freedom_on_the_Net_2025_Digital.pdf',
      },
    ],
  },

  crypto: {
    dossier: 'Crypto is dual-use in the control loop. Off-ledger self-custody and peer-to-peer settlement function as resistance vectors; exchange chokepoints, stablecoin issuers, sanctions lists, and on-chain analytics function as control vectors. The 2025 data shows both edges hardening at once.',
    nodes: [
      { name: 'Exchange chokepoints',     role: 'KYC + delisting + freezes',          status: 'pressured' },
      { name: 'Stablecoin perimeter',     role: '84% of illicit volume (2025)',       status: 'pressured' },
      { name: 'Sanctioned-entity flows',  role: '+694% YoY value received (2025)',    status: 'severed'   },
      { name: 'Self-custody / P2P',       role: 'Hardware wallets · multisig · DEX',  status: 'open'      },
      { name: 'SEC regulatory perimeter', role: '456 actions · $17.9B FY2025',        status: 'pressured' },
    ],
    gauges: [
      { label: 'Sanctions Perimeter',    value: 78, sub: '+694% YoY sanctioned-entity receipts (Chainalysis 2026)' },
      { label: 'Stablecoin Concentration', value: 84, sub: '84% of illicit volume rides stablecoins (2025)'        },
      { label: 'Enforcement Posture',    value: 64, sub: '456 SEC actions · $17.9B relief · FY2025'                },
      { label: 'Self-Custody Surface',   value: 57, sub: 'Off-ramps tightening; on-chain rails remain open'        },
    ],
    citations: [
      {
        label: 'U.S. SEC · FY2025 Enforcement Results (2026-04-07)',
        url: 'https://www.sec.gov/newsroom/press-releases/2026-34',
      },
      {
        label: 'Chainalysis · 2026 Crypto Crime Report (intro)',
        url: 'https://www.chainalysis.com/blog/2026-crypto-crime-report-introduction/',
      },
    ],
  },

  rebelResistanceIndex: [
    {
      id: 'energy',
      name: 'Energy',
      score: 62,
      blurb: 'Generation is physically distributable; chokepoints still concentrate ~76% of seaborne supply (EIA 1H25).',
      mech: [
        'Rooftop solar, behind-the-meter storage, and community microgrids reduce single-point dependence',
        'Islandable distribution feeders and local balancing authorities preserve service under stress',
        'Diversified fuel supply (LNG spot markets, regional renewables) erodes pipeline coercion',
      ],
    },
    {
      id: 'debt',
      name: 'Debt',
      score: 42,
      blurb: 'Global public debt ~94% of GDP in 2025, projected 100% by 2029 (IMF FM Apr 2026) — creditor leverage rising.',
      mech: [
        'Sovereign debt restructuring frameworks (IMF, Paris Club, Common Framework) preserve some optionality',
        'Municipal banks, credit unions, and cooperative lenders insulated from money-center policy',
        'Uncoordinated creditor politics — competing jurisdictions slow unified enforcement',
      ],
    },
    {
      id: 'governance',
      name: 'Governance',
      score: 68,
      blurb: '20th consecutive year of global freedom decline (FH 2026), yet jurisdictional fragmentation still absorbs shocks.',
      mech: [
        'Federalism and subnational authority diffuse compliance burdens across thousands of units',
        'Independent judiciaries, free press, and civil-society NGOs maintain legitimacy alternatives',
        'Treaty pluralism — no single body commands universal extraterritorial reach',
      ],
    },
    {
      id: 'crypto',
      name: 'Crypto',
      score: 55,
      blurb: 'Self-custody and P2P rails persist, but sanctioned-entity receipts rose 694% YoY and stablecoins dominate illicit volume (Chainalysis 2026).',
      mech: [
        'Hardware self-custody and multisig reduce custodial seizure surface',
        'Privacy-preserving tools and confidential transaction designs raise the cost of mass monitoring',
        'Peer-to-peer settlement and non-custodial exchange paths bypass concentrated intermediaries',
      ],
    },
    {
      id: 'ai',
      name: 'AI',
      score: 46,
      blurb: 'Frontier scale concentrates — US led $285.9B private AI investment in 2025; 88% organizational adoption; 5,427 US data centers (HAI 2026).',
      mech: [
        'Open-source models and permissive weights enable independent audit and local fine-tuning',
        'Edge and on-device inference reduces dependence on centralized API gatekeepers',
        'Data minimization, federated learning, and differential privacy limit population-scale capture',
      ],
    },
  ],

  /* Free-text scratchpad for the weekly updater. Not rendered.
     Append a dated entry per cycle with rationale / citations. */
  sources: [
    '2026-05-15 — Realigned main dashboard with companion page 2025/early-2026 source base:',
    '  Energy: EIA World Oil Transit Chokepoints (updated 2026-03-03) — Hormuz, Malacca, Suez/SUMED, Bab el-Mandeb, Cape rerouting.',
    '  Debt: IMF Fiscal Monitor April 2026 (~94% global public debt in 2025, 100% projected by 2029); World Bank IDR 2024 ($1.4T EM debt service in 2023).',
    '  Governance: Freedom House Freedom in the World 2026 (20th consecutive year of decline; 54 declined / 35 improved).',
    '  AI / Surveillance: Stanford HAI 2026 AI Index (88% adoption, $285.9B US investment, 5,427 data centers); Freedom House Freedom on the Net 2025 (arrests in 57 countries, blocking in 69%, shutdowns in 52%).',
    '  Crypto: SEC FY2025 Enforcement Results (press release 2026-34, 2026-04-07; 456 actions, $17.9B); Chainalysis 2026 Crypto Crime Report (+694% sanctioned-entity receipts, 84% stablecoin share of illicit volume).',
  ],
};

window.DASHBOARD_DATA = DASHBOARD_DATA;
