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
 *   energyChokepoints:   {nodes: [...], mapNodes: [...]}.
 *                          nodes      — Node Dossier rows: {name, role,
 *                                       status: 'pressured'|'held'|'severed'|
 *                                       'open'}.
 *                          mapNodes   — Threat-map dots: {id, label, status,
 *                                       x, y}. x/y are CSS percentages.
 *   debt:                Four debt gauges (0–100). Array of {label, value,
 *                        sub}.
 *   governance:          {weakSpots: [{label, status}], dossier: '...'}.
 *                        status is short uppercase tag text.
 *   aiSurveillance:      {terminal: [string,...], tools: [{label, value%}],
 *                        quotes: [string,...]}. quotes cycle on the
 *                        "Issue Vader Assessment" button.
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
 *   7. Add a dated entry to `sources` with rationale/citations for the cycle.
 *
 * Keep content high-level and analytical. Do NOT add operational targeting
 * data, personal information, or anything that breaks the in-universe framing.
 * ==========================================================================*/

const DASHBOARD_DATA = {
  meta: {
    operation: 'ASHEN HEEL',
    authority: 'Lord Vader',
    clearance: 'SITH-OMEGA',
    sector: 'Sector 001 · Earth Annex Protocol',
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
    { label: 'Insurgent Liquidity',   value: 38 },
  ],

  directives: [
    'Sever energy arteries on resistance refusal.',
    'Refinance sovereign debt under Imperial bonds.',
    'Exploit governance fractures.',
    'Trace rebel digital reserves.',
    'Saturate civilian biometrics.',
  ],

  energyChokepoints: {
    nodes: [
      { name: 'Strait of Hormuz', role: 'energy artery',   status: 'pressured' },
      { name: 'Suez corridor',    role: 'trade pulse',     status: 'pressured' },
      { name: 'Panama canal',     role: 'logistics hinge', status: 'held'      },
      { name: 'Rare earth basin', role: 'battery choke',   status: 'severed'   },
      { name: 'Grid interties',   role: 'urban voltage',   status: 'pressured' },
    ],
    mapNodes: [
      { id: 'n1', label: 'Hormuz · pressured',          status: 'pressured', x: 62, y: 47 },
      { id: 'n2', label: 'Suez · pressured',            status: 'pressured', x: 54, y: 42 },
      { id: 'n3', label: 'Panama · held',               status: 'held',      x: 38, y: 34 },
      { id: 'n4', label: 'Rare earth basin · severed',  status: 'severed',   x: 72, y: 64 },
      { id: 'n5', label: 'Grid interties · pressured',  status: 'pressured', x: 27, y: 57 },
    ],
  },

  debt: [
    { label: 'Sovereign Rollovers',   value: 88, sub: 'Bond-market dependency' },
    { label: 'Corporate Refinancing', value: 73, sub: 'Rate shock exposure'    },
    { label: 'Household Credit',      value: 64, sub: 'Consumer obedience layer' },
    { label: 'Reserve Hierarchy',     value: 91, sub: 'Currency chokepoint'    },
  ],

  governance: {
    weakSpots: [
      { label: 'Nation-state rivalry',        status: 'EXPLOIT'  },
      { label: 'Regulatory inconsistency',    status: 'OPEN'     },
      { label: 'Corporate sovereignty',       status: 'ABSORB'   },
      { label: 'Public trust decay',          status: 'AMPLIFY'  },
    ],
    dossier: 'A divided planet does not need to be broken. It is already broken.',
  },

  aiSurveillance: {
    terminal: [
      '[SITH-OMEGA] civilian sentiment mesh online',
      '[WATCHTOWER] 6.2B behavioral traces indexed',
      '[CREDIT-LENS] rebel liquidity probability: 38%',
      '[DIRECTIVE] centralize compute, license all models',
    ],
    tools: [
      { label: 'Population sentiment',         value: 61 },
      { label: 'Financial monitoring',         value: 74 },
      { label: 'Predictive enforcement',       value: 52 },
      { label: 'Propaganda personalization',   value: 88 },
    ],
    quotes: [
      'They have built a mirror that can learn their thoughts. They have not yet realized it can be turned into a window.',
      'The debtor already understands submission. He merely has not yet seen the face of his master.',
      'Energy is not a commodity. It is the spine of obedience.',
      'A corporation is not loyal. But it is afraid of loss. That is sufficient.',
      'The rebel who hides his credits in code is still afraid. Find the fear, and the code will fail him.',
    ],
  },

  rebelResistanceIndex: [
    {
      id: 'energy',
      name: 'Energy',
      score: 62,
      blurb: 'Generation is becoming physically distributable; the grid is no longer a single jugular.',
      mech: [
        'Rooftop solar, behind-the-meter storage, and community microgrids reduce single-point dependence',
        'Islandable distribution feeders and local balancing authorities preserve service under stress',
        'Diversified fuel supply (LNG spot markets, regional renewables) erodes pipeline coercion',
      ],
    },
    {
      id: 'debt',
      name: 'Debt',
      score: 48,
      blurb: 'Creditor coordination is fragile; relief precedents and local credit channels persist.',
      mech: [
        'Historical sovereign debt jubilees and statutory restructuring frameworks (IMF, Paris Club holdouts)',
        'Municipal banks, credit unions, and cooperative lenders insulated from money-center policy',
        'Uncoordinated creditor politics — competing jurisdictions slow unified enforcement',
      ],
    },
    {
      id: 'governance',
      name: 'Governance',
      score: 71,
      blurb: 'Jurisdictional fragmentation is the planet’s most durable shock absorber.',
      mech: [
        'Federalism and subnational authority diffuse compliance burdens across thousands of units',
        'Independent judiciaries, free press, and civil-society NGOs maintain legitimacy alternatives',
        'Treaty pluralism — no single body commands universal extraterritorial reach',
      ],
    },
    {
      id: 'crypto',
      name: 'Crypto',
      score: 58,
      blurb: 'Self-custody and privacy-preserving rails complicate financial surveillance, with caveats at on/off-ramps.',
      mech: [
        'Hardware self-custody and multisig reduce custodial seizure surface',
        'Privacy-preserving tools and confidential transaction designs raise the cost of mass monitoring',
        'Peer-to-peer settlement and non-custodial exchange paths bypass concentrated intermediaries',
      ],
    },
    {
      id: 'ai',
      name: 'AI',
      score: 54,
      blurb: 'Open weights and edge compute push capability outward, even as frontier scale concentrates.',
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
    // 'YYYY-MM-DD — short note on what shifted and why (link or doc ref).',
  ],
};

window.DASHBOARD_DATA = DASHBOARD_DATA;
