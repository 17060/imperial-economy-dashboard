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
    sector: 'Sector 001 · Earth Annex Protocol · reading current to 2026-06-01',
    subjugationIndex: 78,
    subjugationTier: 'CRITICAL',
  },

  imperialControl: [
    { label: 'Compliant Polities',   value: '121',    delta: '▲ 3 this cycle',     deltaTone: 'up'   },
    { label: 'Theatres Encircled',   value: '15 / 17', delta: '▲ 1 this cycle',    deltaTone: 'up'   },
    { label: 'Resistance Cells',     value: '308',    delta: '▼ 1.3% attrition',   deltaTone: 'flat' },
    { label: 'Levy Yield',           value: '¤1.92T', delta: '▲ 4.3% q/q',         deltaTone: 'up'   },
  ],

  theatreReadiness: [
    { label: 'Fleet Posture',         value: 88 },
    { label: 'Economic Grip',         value: 80 },
    { label: 'Surveillance Mesh',     value: 71 },
    { label: 'Compliance Engines',    value: 55 },
    { label: 'Crypto Perimeter',      value: 69 },
    { label: 'Insurgent Liquidity',   value: 38 },
  ],

  directives: [
    'Manage the Hormuz drawdown: tentative US-Iran MOU and resumed escorts ease leverage, but the framework is unsigned.',
    'Prepare countermeasures for rerouting and black-flagged shipping around the Strait.',
    'Press sovereign debt advantage as US fiscal credibility erodes and EM restructurings open.',
    'Exploit governance fractures.',
    'Tighten the crypto regulatory perimeter via GENIUS Act AML/sanctions compliance rules.',
    'Trace rebel digital reserves through stablecoin issuers.',
    'Saturate civilian biometrics across DHS theatres.',
  ],

  energyChokepoints: {
    nodes: [
      { name: 'Strait of Hormuz',   role: 'Tentative US-Iran 60-day MOU (28–30 May) + resumed US Navy escorts; Brent ~$92 (worst month since 2020). Unsigned; traffic still constrained', status: 'pressured', detail: '~20% of global petroleum liquids; tentative MOU eases blockade but framework remains unsigned and traffic constrained.' },
      { name: 'Strait of Malacca',  role: '23.2 mb/d · largest oil flow (1H25); rising geopolitical risk',                                                                              status: 'pressured', detail: 'Busiest oil lane; ~25% of global trade transits here; US–China rivalry and piracy elevate interdiction risk.' },
      { name: 'Suez / SUMED',       role: '4.9 mb/d · ~half of 2023 levels; transits still near multi-year lows',                                                                       status: 'pressured', detail: 'Connects Mediterranean to Red Sea; Houthi threat has suppressed throughput since late 2023; Egyptian revenues severely hit.' },
      { name: 'Bab el-Mandeb',      role: 'U.S. MARAD advisory 2026-006 (2026-03-26): Houthis continue to pose threat; high-risk transit until further notice',                        status: 'severed',   detail: 'Gateway to Suez; MARAD advisory 2026-006 in force; Houthi interdiction posture resumes following ceasefire collapse.' },
      { name: 'Cape of Good Hope',  role: 'Reroute institutionalized; +~2 weeks transit and elevated bunker burn',                                                                       status: 'held',      detail: 'Alternate routing adds ~14 days and ~$1M/voyage in fuel; now treated as standard for many operators.' },
    ],
    mapNodes: [
      { id: 'n1', label: 'Hormuz · pressured',          status: 'pressured', x: 62, y: 47 },
      { id: 'n2', label: 'Malacca · pressured',         status: 'pressured', x: 76, y: 55 },
      { id: 'n3', label: 'Suez / SUMED · pressured',    status: 'pressured', x: 54, y: 42 },
      { id: 'n4', label: 'Bab el-Mandeb · severed',     status: 'severed',   x: 57, y: 52 },
      { id: 'n5', label: 'Cape of Good Hope · held',    status: 'held',      x: 50, y: 72 },
    ],
    citation: {
      label: 'CNBC (2026-05-29) Brent posts worst month since 2020 as market counts on a US-Iran deal · U.S. MARAD advisory 2026-006 (2026-03-26) Red Sea/Bab el-Mandeb risk',
      url: 'https://www.cnbc.com/2026/05/29/oil-price-iran-deal-war-ceasefire-trump.html',
    },
  },

  debt: [
    { label: 'Sovereign Rollovers',   value: 90, sub: 'Global public debt ~94% of GDP in 2025 (IMF FM Apr 2026); EM restructurings reopening (Venezuela, May 2026)' },
    { label: 'Projected Debt 2029',   value: 100, sub: 'IMF: 100% of GDP by 2029, one year earlier than April 2025 path' },
    { label: 'LIC Debt Distress',     value: 74, sub: '9 LICs formally in distress; 23 high risk (IMF DSA, 31 Mar 2026)' },
    { label: 'Reserve Hierarchy',     value: 93, sub: 'US below AAA tri-agency (Moody’s Aa1, May 2025); 30-yr UST touched 5.197% on 19 May 2026' },
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
      label: 'CNBC · Venezuela launches sovereign debt restructuring (~$150–170B, May 2026)',
      url: 'https://www.cnbc.com/2026/05/14/venezuela-bonds-debt-restructure-maduro-trump-oil.html',
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
    ],
  },

  crypto: {
    dossier: 'Crypto remains dual-use in the control loop. The perimeter tightened further into mid-2026: the FinCEN/OFAC GENIUS Act stablecoin rule (issued 8 Apr 2026) entered its public comment period (closing 9 Jun 2026), treating permitted payment stablecoin issuers as BSA financial institutions with mandatory sanctions programs; the Digital Asset Market CLARITY Act cleared the Senate Banking Committee 15–9 on 14 May 2026 and heads toward Senate floor reconciliation; and Tether froze $344M USDT in coordination with OFAC (23 Apr 2026). Self-custody, non-custodial settlement, and jurisdictional fragmentation continue to provide meaningful resistance capacity (high-level, non-operational).',
    nodes: [
      { name: 'Stablecoin perimeter',     role: 'GENIUS Act rule · FinCEN/OFAC comment period closes 9 Jun 2026 (issuers = BSA institutions)', status: 'severed' },
      { name: 'CLARITY Act market structure', role: 'Cleared Senate Banking Cttee 15–9 (14 May 2026); toward Senate floor', status: 'pressured' },
      { name: 'FATF stablecoin focus',    role: 'March 2026 report · 84% of illicit volume in stablecoins',    status: 'pressured' },
      { name: 'Sanctioned-entity flows',  role: '+694% YoY value received (Chainalysis 2026)',                 status: 'severed'   },
      { name: 'Self-custody / P2P',       role: 'Hardware wallets · multisig · DEX · unhosted-wallet gap',     status: 'open'      },
      { name: 'Jurisdictional arbitrage', role: 'UAE ADGM · Switzerland · Singapore · El Salvador',           status: 'open'      },
    ],
    gauges: [
      { label: 'Sanctions Perimeter',      value: 85, sub: 'Tether froze $344M USDT in coordination with OFAC (23 Apr 2026); GENIUS rule mandates issuer sanctions programs' },
      { label: 'Stablecoin Concentration', value: 84, sub: '84% of illicit volume rides stablecoins (FATF Mar 2026)' },
      { label: 'Regulatory Clarity',       value: 72, sub: 'CLARITY Act cleared Senate Banking 15–9 (14 May 2026); GENIUS rule comment period closes 9 Jun 2026' },
      { label: 'Self-Custody Surface',     value: 57, sub: 'Unhosted wallets and P2P still outside KYC perimeter'    },
    ],
    citations: [
      {
        label: 'U.S. Federal Register · Permitted Payment Stablecoin Issuer AML/CFT rule (comment period closes 9 Jun 2026)',
        url: 'https://www.federalregister.gov/documents/2026/04/10/2026-06963/permitted-payment-stablecoin-issuer-anti-money-launderingcountering-the-financing-of-terrorism',
      },
      {
        label: 'U.S. Senate Banking Committee · CLARITY Act advanced 15–9 (14 May 2026)',
        url: 'https://www.banking.senate.gov/newsroom/majority/chairman-scott-senate-banking-committee-advance-clarity-act-in-historic-bipartisan-vote',
      },
      {
        label: 'Tether · $344M USDT frozen in coordination with OFAC and U.S. law enforcement (Apr 2026)',
        url: 'https://tether.io/news/tether-supports-freeze-of-more-than-344-million-in-usdt-in-coordination-with-ofac-and-u-s-law-enforcement/',
      },
    ],
  },

  imperialRadar: [
    { axis: 'Authority', value: 79 },
    { axis: 'Data',      value: 68 },
    { axis: 'Energy',    value: 91 },
    { axis: 'Credit',    value: 89 },
    { axis: 'Crypto',    value: 66 },
    { axis: 'Unity',     value: 55 },
  ],

  rebelResistanceIndex: [
    {
      id: 'energy',
      name: 'Energy',
      score: 34,
      blurb: 'Tentative US-Iran 60-day MOU (28–30 May) and resumed US Navy escorts ease the Hormuz chokehold; Brent fell ~19% in May to ~$92. Framework unsigned and traffic still constrained. Imperial Control 78 · Rebel Resistance 34 — the cycle’s biggest mover (eased).',
      mech: [
        'Cape of Good Hope reroute institutionalized; pipeline diversions (Yanbu, Fujairah, Ceyhan) reduce but do not replace Gulf flows',
        'Rooftop solar, behind-the-meter storage, and community microgrids still erode single-point dependence at the demand edge',
        'Diversified spot LNG and regional renewables blunt longer-term pipeline coercion',
      ],
    },
    {
      id: 'debt',
      name: 'Debt',
      score: 40,
      blurb: 'Global public debt ~94% of GDP in 2025, projected 100% by 2029 (IMF FM Apr 2026); 9 LICs in distress; US below AAA across all three agencies; 30-yr UST hit 5.197% (19 May 2026) and Venezuela opened a ~$150–170B restructuring. Imperial Control 75 · Rebel Resistance 40.',
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
      score: 52,
      blurb: 'Perimeter tightened via the GENIUS Act stablecoin rule (issuer comment period closes 9 Jun 2026), the CLARITY Act clearing Senate Banking 15–9, and Tether’s $344M OFAC-coordinated freeze; resistance remains via self-custody and jurisdictional fragmentation. Imperial Control 67 · Rebel Resistance 52.',
      mech: [
        'Hardware self-custody and multisig reduce custodial seizure surface',
        'Peer-to-peer settlement and non-custodial paths remain outside KYC/AML perimeter at the margin',
        'Jurisdictional fragmentation (UAE, Switzerland, Singapore, El Salvador) preserves optionality',
      ],
    },
    {
      id: 'ai',
      name: 'AI',
      score: 36,
      blurb: 'Frontier scale concentrates (HAI 2026); FMTI transparency dropped 58 → 40; DHS $1B Palantir BPA active; ICE $25.1M iris-biometric award (May 2026) and EU AI Act Digital Omnibus deferring high-risk timelines expand surveillance headroom. Imperial Control 77 · Rebel Resistance 36.',
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
    '2026-06-01 — Weekly metric refresh (current to 2026-06-01):',
    '  Biggest mover: Energy chokepoints EASED (Imperial 90 → 78 / Rebel 28 → 34). Driver: tentative US-Iran 60-day MOU framework (28–30 May, unsigned), resumed US Navy commercial escorts, and Brent ~19% May decline to ~$92 (CNBC 2026-05-29, worst month since 2020). Conservative: moved Hormuz severed → pressured, not held — MOU unsigned, Iran state media denials, traffic still constrained.',
    '  Debt (Imperial 72 → 75 / Rebel 42 → 40): IMF FM Apr 2026 backdrop holds; added verified 30-yr UST 5.197% intraday (CNBC 2026-05-19) and Venezuela ~$150–170B restructuring launch (CNBC 2026-05-14, softened from memo “largest in history” to “one of the largest”).',
    '  Governance (Imperial 65 / Rebel 58): unchanged — persistent elevated baseline, no new state collapse in the window. Memo claims accepted as no-change.',
    '  Crypto (Imperial 64 → 67 / Rebel 54 → 52): GENIUS Act stablecoin rule comment period closes 9 Jun 2026 (Federal Register 2026-06963); CLARITY Act cleared Senate Banking 15–9 on 14 May 2026 (banking.senate.gov); Tether $344M USDT freeze coordinated with OFAC, 23 Apr 2026 (tether.io). Resistance framing kept high-level/non-operational.',
    '  AI (Imperial 74 → 77 / Rebel 38 → 36): ICE $25.1M sole-source BI2 iris-scanner award (NPR 2026-05-27, 5M+ records, Jun 2026 field run); EU AI Act Digital Omnibus (EU Council 2026-05-07) defers high-risk timelines. HAI 2026 / FOTN 2025 baselines retained.',
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
