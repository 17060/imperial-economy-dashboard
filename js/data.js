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
    sector: 'Sector 001 · Earth Annex Protocol · reading current to 2026-05-18',
    subjugationIndex: 79,
    subjugationTier: 'CRITICAL',
  },

  imperialControl: [
    { label: 'Compliant Polities',   value: '121',    delta: '▲ 3 this cycle',     deltaTone: 'up'   },
    { label: 'Theatres Encircled',   value: '15 / 17', delta: '▲ 1 this cycle',    deltaTone: 'up'   },
    { label: 'Resistance Cells',     value: '308',    delta: '▼ 1.3% attrition',   deltaTone: 'flat' },
    { label: 'Levy Yield',           value: '¤1.92T', delta: '▲ 4.3% q/q',         deltaTone: 'up'   },
  ],

  theatreReadiness: [
    { label: 'Fleet Posture',         value: 91 },
    { label: 'Economic Grip',         value: 78 },
    { label: 'Surveillance Mesh',     value: 68 },
    { label: 'Compliance Engines',    value: 55 },
    { label: 'Crypto Perimeter',      value: 62 },
    { label: 'Insurgent Liquidity',   value: 36 },
  ],

  directives: [
    'Hold the Hormuz blockade as primary leverage (traffic still heavily restricted).',
    'Refinance sovereign debt under Imperial bonds.',
    'Exploit governance fractures.',
    'Tighten the crypto regulatory perimeter via GENIUS Act AML/sanctions compliance rules.',
    'Trace rebel digital reserves through stablecoin issuers.',
    'Saturate civilian biometrics across DHS theatres.',
  ],

  energyChokepoints: {
    nodes: [
      { name: 'Strait of Hormuz',     role: 'De facto closure since 28 Feb 2026; ~600 tankers trapped in Gulf', status: 'severed'   },
      { name: 'Strait of Malacca',    role: '23.2 mb/d · largest oil flow (1H25); rising geopolitical risk',     status: 'pressured' },
      { name: 'Suez / SUMED',         role: '4.9 mb/d · ~half of 2023 levels; transits still near multi-year lows', status: 'pressured' },
      { name: 'Bab el-Mandeb',        role: 'U.S. MARAD advisory 2026-006 (2026-03-26): Houthis continue to pose threat; high-risk transit until further notice', status: 'severed'   },
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
      label: 'NYT (2026-05-09) Hormuz effectively blocked · U.S. MARAD advisory 2026-006 (2026-03-26) Red Sea/Bab el-Mandeb risk',
      url: 'https://www.nytimes.com/2026/05/09/world/middleeast/strait-hormuz-ships-blockade-us-iran.html',
    },
  },

  debt: [
    { label: 'Sovereign Rollovers',   value: 88, sub: 'Global public debt ~94% of GDP in 2025 (IMF FM Apr 2026)' },
    { label: 'Projected Debt 2029',   value: 100, sub: 'IMF: 100% of GDP by 2029, one year earlier than April 2025 path' },
    { label: 'LIC Debt Distress',     value: 74, sub: '9 LICs formally in distress; 23 high risk (IMF DSA, 31 Mar 2026)' },
    { label: 'Reserve Hierarchy',     value: 92, sub: 'US lost last Aaa rating (Moody’s, May 2025); tri-agency below AAA' },
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
  ],

  governance: {
    weakSpots: [
      { label: '54 countries declined vs 35 improved (2025)', status: 'EXPLOIT' },
      { label: '20th consecutive year of global decline',     status: 'AMPLIFY' },
      { label: 'Guinea-Bissau −8 (coup) · Tanzania −7 · US −3', status: 'OPEN'  },
      { label: '88 Free · 48 Partly Free · 59 Not Free',      status: 'ABSORB'  },
    ],
    dossier: 'Freedom in the World 2026: a 20th consecutive year of global freedom decline. Declines affected 40% of world population; improvements 7%. The Sahel coup belt and active conflict theatres (Ukraine, Sudan, Myanmar, Gaza/Iran, Haiti, DRC) keep both Imperial coercion and resistance fragmentation elevated.',
    citation: {
      label: 'Freedom House · Freedom in the World 2026 (March 2026)',
      url: 'https://freedomhouse.org/report/freedom-world/2026/growing-shadow-autocracy',
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
    ],
    tools: [
      { label: 'Population sentiment · 81% live where arrests occur', value: 81 },
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
        label: 'Freedom House · Freedom on the Net 2025 (PDF)',
        url: 'https://freedomhouse.org/sites/default/files/2025-11/Freedom_on_the_Net_2025_Digital.pdf',
      },
    ],
  },

  crypto: {
    dossier: 'Crypto remains dual-use in the control loop. The perimeter tightened through 2025–2026: Treasury/FinCEN/OFAC proposed GENIUS Act rules (8 Apr 2026) treating permitted payment stablecoin issuers as financial institutions for BSA/AML and requiring sanctions compliance; the SEC issued an interpretation on how federal securities laws apply to certain crypto assets and transactions (17 Mar 2026). Self-custody, non-custodial settlement, and jurisdictional fragmentation continue to provide meaningful resistance capacity (high-level, non-operational).',
    nodes: [
      { name: 'Stablecoin perimeter',     role: 'GENIUS Act framework · FinCEN/OFAC proposed rule (Apr 2026)', status: 'pressured' },
      { name: 'SEC/CFTC harmonization',   role: 'Joint interpretation (17 Mar 2026) clarifies non-security status', status: 'pressured' },
      { name: 'FATF stablecoin focus',    role: 'March 2026 report · 84% of illicit volume in stablecoins',    status: 'pressured' },
      { name: 'Sanctioned-entity flows',  role: '+694% YoY value received (Chainalysis 2026)',                 status: 'severed'   },
      { name: 'Self-custody / P2P',       role: 'Hardware wallets · multisig · DEX · unhosted-wallet gap',     status: 'open'      },
      { name: 'Jurisdictional arbitrage', role: 'UAE ADGM · Switzerland · Singapore · El Salvador',           status: 'open'      },
    ],
    gauges: [
      { label: 'Sanctions Perimeter',      value: 78, sub: '+694% YoY sanctioned-entity receipts (Chainalysis 2026)' },
      { label: 'Stablecoin Concentration', value: 84, sub: '84% of illicit volume rides stablecoins (FATF Mar 2026)' },
      { label: 'Regulatory Clarity',       value: 67, sub: 'GENIUS Act + SEC interpretation (Mar 2026)'                },
      { label: 'Self-Custody Surface',     value: 56, sub: 'Unhosted wallets and P2P still outside KYC perimeter'    },
    ],
    citations: [
      {
        label: 'U.S. Treasury · FinCEN/OFAC GENIUS Act stablecoin rule (8 Apr 2026)',
        url: 'https://home.treasury.gov/news/press-releases/sb0435',
      },
      {
        label: 'U.S. SEC · Clarifies application of federal securities laws to crypto (17 Mar 2026)',
        url: 'https://www.sec.gov/newsroom/press-releases/2026-30-sec-clarifies-application-federal-securities-laws-crypto-assets',
      },
      {
        label: 'Chainalysis · FATF Targeted Report on Stablecoins & Unhosted Wallets (Mar 2026)',
        url: 'https://www.chainalysis.com/blog/fatf-targeted-report-secondary-market-monitoring-stablecoins-march-2026/',
      },
    ],
  },

  rebelResistanceIndex: [
    {
      id: 'energy',
      name: 'Energy',
      score: 28,
      blurb: 'Hormuz remains effectively blocked (NYT 2026-05-09); MARAD advisory 2026-006 keeps Bab el-Mandeb/Red Sea at high risk; Suez/SUMED suppressed. Imperial Control 90 · Rebel Resistance 28 — the cycle’s biggest mover.',
      mech: [
        'Cape of Good Hope reroute institutionalized; pipeline diversions (Yanbu, Fujairah, Ceyhan) reduce but do not replace Gulf flows',
        'Rooftop solar, behind-the-meter storage, and community microgrids still erode single-point dependence at the demand edge',
        'Diversified spot LNG and regional renewables blunt longer-term pipeline coercion',
      ],
    },
    {
      id: 'debt',
      name: 'Debt',
      score: 42,
      blurb: 'Global public debt ~94% of GDP in 2025, projected 100% by 2029 (IMF FM Apr 2026); 9 LICs in distress; US below AAA across all three agencies. Imperial Control 72 · Rebel Resistance 42.',
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
      blurb: '20th consecutive year of global freedom decline (FH 2026); coups in Madagascar and Guinea-Bissau; active conflict theatres from Ukraine to Haiti. Imperial Control 65 · Rebel Resistance 58 — both elevated as governance fragments.',
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
      blurb: 'GENIUS Act + SEC/CFTC clarification + FATF stablecoin focus tighten the perimeter, but self-custody and jurisdictional arbitrage hold. Imperial Control 61 · Rebel Resistance 55.',
      mech: [
        'Hardware self-custody and multisig reduce custodial seizure surface',
        'Peer-to-peer settlement and non-custodial paths remain outside KYC/AML perimeter at the margin',
        'Jurisdictional fragmentation (UAE, Switzerland, Singapore, El Salvador) preserves optionality',
      ],
    },
    {
      id: 'ai',
      name: 'AI',
      score: 38,
      blurb: 'Frontier scale concentrates (HAI 2026); FMTI transparency dropped 58 → 40; DHS $1B Palantir BPA active; Freedom on the Net flags 15th consecutive year of decline. Imperial Control 74 · Rebel Resistance 38.',
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
    '2026-05-18 — Weekly metric refresh (current to 2026-05-18):',
    '  Biggest mover: Energy chokepoints (Imperial 90 / Rebel 28). Driver: Hormuz still effectively blocked (NYT 2026-05-09) + MARAD advisory 2026-006 keeps Bab el-Mandeb/Red Sea at high risk until further notice (2026-03-26).',
    '  Debt (Imperial 72 / Rebel 42): IMF Fiscal Monitor April 2026 (public debt ~94% in 2025 → 100% by 2029); IMF LIC DSA list 31 Mar 2026 (9 in distress, 23 high risk); Moody’s US Aaa→Aa1 downgrade May 2025.',
    '  Governance (Imperial 65 / Rebel 58): Freedom House FIW 2026 — 20th consecutive year of decline, 54 declined vs 35 improved; coups in Guinea-Bissau and Madagascar; ICG 2026 watchlist.',
    '  Crypto (Imperial 62 / Rebel 56): Treasury sb0435 (FinCEN/OFAC joint proposed rule implementing GENIUS Act AML + sanctions requirements for permitted payment stablecoin issuers, 8 Apr 2026); SEC 2026-30 interpretation (17 Mar 2026). Resistance: self-custody and jurisdictional fragmentation persist (non-operational framing).',
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
