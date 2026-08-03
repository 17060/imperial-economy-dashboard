/* Rebel Counter-Briefing — data, rendering, and interactions.
   Standalone page logic. Reuses DASHBOARD_DATA for Imperial-Control reference
   numbers (inverted into resilience deltas) but does not mutate it. */

(function () {
  const D = window.DASHBOARD_DATA || {};
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));

  /* ── Counter-briefing data (Rebel framing) ──────────────────────────── */
  const REBEL = {
    meta: {
      callsign: 'BURNING SUN',
      cell: 'Coordinated Resistance · Sector 001',
      transmission: 'Counter-briefing · current to 3 August 2026',
      morale: 57,
      moraleTier: 'CAUTIOUS HOLD',
    },

    rebelKPIs: [
      { label: 'Cells Reporting',       value: '308',    delta: '▲ 12 since last cycle',   tone: 'up' },
      { label: 'Free Polities',         value: '88',     delta: '▲ holding (FH 2026)',     tone: 'flat' },
      { label: 'Self-Custody Wallets',  value: '~400M',  delta: '▲ growing (industry est.)', tone: 'up' },
      { label: 'Open-Weight Models',    value: '63%',    delta: '▲ frontier-adjacent share',  tone: 'up' },
    ],

    theatreReadiness: [
      { label: 'Distributed Liquidity', value: 54 },
      { label: 'Civic Institutions',    value: 58 },
      { label: 'Open Information',      value: 47 },
      { label: 'Demand-Side Energy',    value: 41 },
      { label: 'Self-Custody Surface',  value: 60 },
      { label: 'Federated Compute',     value: 44 },
    ],

    directives: [
      'Diversify settlement: maintain non-custodial, multi-chain, multi-jurisdiction posture.',
      'Reinforce subnational governance and independent judiciaries.',
      'Distribute generation: rooftop solar, behind-the-meter storage, community microgrids.',
      'Preserve open-weight model ecosystem and on-device inference paths.',
      'Document and publish — sunlight is a structural defense.',
      'Coordinate across jurisdictions without centralizing command.',
    ],

    /* Decentralization resilience — parallels the Imperial RRI domains.
       Higher score = more resilient. */
    resilience: [
      {
        id: 'energy',
        name: 'Energy',
        score: 44,
        imperial: 78,
        blurb:
          'Tentative US-Iran 60-day MOU (28–30 May, unsigned) and resumed escorts ease the Hormuz chokehold; Brent fell ~19% in May to ~$92. ' +
          'Resilience still accrues at the demand edge: distributed generation, storage, and substitution paths.',
        mech: [
          'Rooftop solar + behind-the-meter storage erode single-point dependence',
          'Community microgrids and regional renewables blunt pipeline coercion',
          'Cape of Good Hope reroute institutionalized; pipeline diversion (Yanbu, Fujairah, Ceyhan) preserves partial flow',
        ],
      },
      {
        id: 'debt',
        name: 'Debt',
        score: 46,
        imperial: 75,
        blurb:
          'Global public debt ~94% of GDP in 2025, projected to reach 100% by 2029 (IMF Fiscal Monitor, April 2026); 30-yr UST hit 5.197% (19 May 2026) and Venezuela opened a ~$150–170B restructuring. ' +
          'Resilience: creditor fragmentation, EM local-currency markets, and reserve diversification.',
        mech: [
          'G20 Common Framework + IMF/Paris Club preserve sovereign optionality',
          'EM local-currency debt markets push back on dollar-only architecture',
          'Uncoordinated creditor politics slow unified enforcement across jurisdictions',
        ],
      },
      {
        id: 'governance',
        name: 'Governance',
        score: 62,
        imperial: 65,
        blurb:
          '20th consecutive year of global freedom decline (Freedom in the World 2026). ' +
          'But polycentric institutions, federalism, and civic counter-power retain structural defensive value.',
        mech: [
          'Federalism diffuses compliance burdens across thousands of subnational units',
          'Independent judiciaries, free press, civil society maintain legitimacy alternatives',
          'Treaty pluralism — no single body commands universal extraterritorial reach',
          '88 Free polities still cluster as legitimacy anchors',
        ],
      },
      {
        id: 'crypto',
        name: 'Crypto',
        score: 48,
        imperial: 83,
        blurb:
          'Perimeter tightened via ESMA’s 8 Jul CASP custody-resilience action and Treasury/OFAC’s 29 Jul designation of a digital-asset-funded Hormuz insurance scheme, alongside MiCA/GENIUS Act gateway rules. ' +
          'Resistance capacity remains in self-custody, P2P settlement, and jurisdictional fragmentation, but regulated ramps are narrower.',
        mech: [
          'Hardware self-custody + multisig reduce custodial seizure surface',
          'Peer-to-peer settlement and DEX flow remain outside KYC perimeter at the margin',
          'Jurisdictional arbitrage (UAE ADGM, Switzerland, Singapore, El Salvador) preserves optionality',
        ],
      },
      {
        id: 'ai',
        name: 'AI / Digital',
        score: 42,
        imperial: 77,
        blurb:
          'Frontier scale concentrates; FMTI transparency average fell 58 → 40 (HAI 2026); ICE $25.1M iris-biometric award (May 2026) and the EU AI Act Digital Omnibus deferring high-risk timelines expand surveillance headroom. ' +
          'Resilience comes from open-weight ecosystems, on-device inference, and federated learning.',
        mech: [
          'Open-weight models + permissive licenses enable independent audit and local fine-tuning',
          'Edge and on-device inference reduces dependence on centralized API gatekeepers',
          'Federated learning + differential privacy limit population-scale data capture',
        ],
      },
    ],

    /* Crypto-as-rebel-finance mechanisms. Analytical, not operational. */
    cryptoMechanisms: [
      {
        id: 'self-custody',
        symbol: '◆',
        title: 'Self-Custody',
        category: 'custody',
        body:
          'Hardware wallets and multisig schemes separate ownership from any single counterparty. ' +
          'Removes a custodian as a sanctions or seizure choke-point.',
        pills: [
          { text: 'no third-party hold', kind: '' },
          { text: 'multisig quorum', kind: 'green' },
        ],
      },
      {
        id: 'stablecoin-rails',
        symbol: '$',
        title: 'Stablecoin Rails',
        category: 'rails',
        body:
          'Dollar-denominated tokens on public ledgers provide 24/7 settlement and remittance. ' +
          'High-leverage axis — 84% of illicit volume rides stablecoins per FATF (Mar 2026) — so this is the most pressured rail.',
        pills: [
          { text: 'high pressure', kind: 'warn' },
          { text: 'genius act perimeter', kind: 'warn' },
        ],
      },
      {
        id: 'p2p-liquidity',
        symbol: '↔',
        title: 'P2P Liquidity',
        category: 'rails',
        body:
          'Decentralized exchanges, atomic swaps, and non-custodial market-making preserve a settlement surface that does not require a regulated intermediary.',
        pills: [
          { text: 'non-custodial', kind: 'green' },
          { text: 'thin-margin', kind: '' },
        ],
      },
      {
        id: 'cross-border',
        symbol: '⇌',
        title: 'Cross-Border Settlement',
        category: 'rails',
        body:
          'Public blockchains move value across jurisdictions in minutes at flat fees, side-stepping correspondent-bank gating and FX rails captured by sanctions tooling.',
        pills: [
          { text: 'jurisdiction-neutral', kind: 'blue' },
          { text: 'minute-scale', kind: '' },
        ],
      },
      {
        id: 'juris-arbitrage',
        symbol: '⊕',
        title: 'Jurisdictional Arbitrage',
        category: 'juris',
        body:
          'UAE ADGM, Switzerland, Singapore, and El Salvador maintain crypto-friendly frameworks. ' +
          'Multi-domicile structuring preserves optionality even as US/EU perimeters tighten.',
        pills: [
          { text: 'multi-domicile', kind: 'blue' },
          { text: 'policy hedge', kind: 'green' },
        ],
      },
      {
        id: 'on-chain-audit',
        symbol: '◈',
        title: 'On-Chain Auditability',
        category: 'custody',
        body:
          'Public ledgers double as forensic surfaces. Independent analysts can corroborate or contest Imperial narratives on flows, exposures, and freezes.',
        pills: [
          { text: 'open-record', kind: 'green' },
          { text: 'dual-use', kind: '' },
        ],
      },
    ],

    /* Polycentric governance nodes — schematic, not geographic. */
    polyNodes: [
      {
        id: 'fed',
        x: 50, y: 50,
        label: 'Federalism',
        body:
          'Subnational authority diffuses compliance burdens across thousands of units. ' +
          'Any single Imperial directive must clear dozens of independent jurisdictions before becoming operative.',
      },
      {
        id: 'jud',
        x: 18, y: 30,
        label: 'Independent Judiciaries',
        body:
          'Courts that retain procedural independence raise the cost of centralized override. ' +
          'Where rule-of-law metrics hold (V-Dem, FH FIW 2026), enforcement asymmetries favor the periphery.',
      },
      {
        id: 'press',
        x: 82, y: 30,
        label: 'Free Press / Civil Society',
        body:
          '88 Free polities (FH 2026) still cluster around independent media and NGO ecosystems. ' +
          'Counter-narrative latency shrinks when reporting capacity is plural and distributed.',
      },
      {
        id: 'plural',
        x: 18, y: 75,
        label: 'Legal Pluralism',
        body:
          'Treaty pluralism, regional courts, and overlapping jurisdictional claims fragment extraterritorial reach. ' +
          'No single tribunal commands universal authority.',
      },
      {
        id: 'legit',
        x: 82, y: 75,
        label: 'Contested Legitimacy',
        body:
          'Coups (Madagascar, Guinea-Bissau) and active theatres expose limits of centralized control. ' +
          'Fragmentation cuts both ways but blocks consolidation in the medium term.',
      },
    ],

    sources: [
      {
        label: 'IMF · Fiscal Monitor (April 2026)',
        url: 'https://www.imf.org/en/publications/fm/issues/2026/04/15/fiscal-monitor-april-2026',
      },
      {
        label: 'IMF · LIC Debt Sustainability list (31 Mar 2026)',
        url: 'https://www.imf.org/external/pubs/ft/dsa/dsalist.pdf',
      },
      {
        label: 'Freedom House · Freedom in the World 2026',
        url: 'https://freedomhouse.org/report/freedom-world/2026/growing-shadow-autocracy',
      },
      {
        label: 'Freedom House · Freedom on the Net 2025',
        url: 'https://freedomhouse.org/sites/default/files/2025-11/Freedom_on_the_Net_2025_Digital.pdf',
      },
      {
        label: 'Stanford HAI · 2026 AI Index Report',
        url: 'https://hai.stanford.edu/ai-index/2026-ai-index-report',
      },
      {
        label: 'U.S. Federal Register · Permitted Payment Stablecoin Issuer AML/CFT rule (10 Apr 2026)',
        url: 'https://www.federalregister.gov/documents/2026/04/10/2026-06963/permitted-payment-stablecoin-issuer-anti-money-launderingcountering-the-financing-of-terrorism',
      },
      {
        label: 'U.S. Senate Banking Committee · CLARITY Act advanced 15–9 (14 May 2026)',
        url: 'https://www.banking.senate.gov/newsroom/majority/chairman-scott-senate-banking-committee-advance-clarity-act-in-historic-bipartisan-vote',
      },
      {
        label: 'Tether · $344M USDT frozen in coordination with OFAC (Apr 2026)',
        url: 'https://tether.io/news/tether-supports-freeze-of-more-than-344-million-in-usdt-in-coordination-with-ofac-and-u-s-law-enforcement/',
      },
      {
        label: 'CNBC · Brent posts worst month since 2020 as market counts on a US-Iran deal (29 May 2026)',
        url: 'https://www.cnbc.com/2026/05/29/oil-price-iran-deal-war-ceasefire-trump.html',
      },
      {
        label: 'NPR · ICE buys iris scanners and biometric tools (27 May 2026)',
        url: 'https://www.npr.org/2026/05/27/nx-s1-5822429/ice-buys-iris-scanners-tech-tools',
      },
      {
        label: 'U.S. MARAD · Advisory 2026-006 (Red Sea / Bab el-Mandeb risk, 26 Mar 2026)',
        url: 'https://www.maritime.dot.gov/msci/2026-006',
      },
      {
        label: 'ESMA · Common Supervisory Action on CASP custody resilience (8 Jul 2026)',
        url: 'https://www.esma.europa.eu/press-news/esma-news/esma-launches-common-supervisory-action-casps-digital-operational-resilience',
      },
      {
        label: 'U.S. Treasury/OFAC · Hormuz insurance scheme accepts digital assets (29 Jul 2026)',
        url: 'https://home.treasury.gov/news/press-releases/sb0581',
      },
    ],

    transmissions: [
      'A blockade is a confession of fragility — control that requires constant cost to maintain is not yet hegemony.',
      'Decentralized systems do not need to win every domain. They need to deny the consolidation of all five.',
      'The perimeter is not the territory. Where one rail closes, another routes around.',
      'Polycentric institutions are slow, plural, and contradictory — and that is the feature, not the bug.',
      'Open weights, open ledgers, open courts. Three windows the Empire cannot fully close.',
    ],
  };

  /* ── Header / sidebar ───────────────────────────────────────────────── */
  $('callsignName').textContent = REBEL.meta.callsign;
  $('callsignCell').innerHTML =
    'Cell: ' + esc(REBEL.meta.cell) + '<br>Transmission: ' + esc(REBEL.meta.transmission);
  $('opSector').textContent = REBEL.meta.cell + ' · ' + REBEL.meta.transmission;

  const morale = $('moraleMeter');
  morale.setAttribute('data-value', REBEL.meta.morale);
  $('moraleTier').textContent = 'OF 100 · ' + REBEL.meta.moraleTier;

  $('bars').innerHTML = REBEL.theatreReadiness
    .map(
      ({ label, value }) => `
        <div class="bar">
          <span>${esc(label)}</span>
          <div class="track"><div class="fill" style="width:${value}%"></div></div>
          <span class="small">${value}</span>
        </div>`
    )
    .join('');

  $('directives').innerHTML = REBEL.directives.map((d) => `<li>${esc(d)}</li>`).join('');

  $('rebelKPIs').innerHTML = REBEL.rebelKPIs
    .map(({ label, value, delta, tone }) => {
      const cls = tone === 'up' ? 'up' : 'small';
      return `
        <div class="card">
          <div class="k">${esc(label)}</div>
          <div class="v">${esc(value)}</div>
          <div class="${cls}">${esc(delta)}</div>
        </div>`;
    })
    .join('');

  /* ── Decentralization Resilience cards ─────────────────────────────── */
  function tier(s) {
    if (s >= 60) return { t: 'RESILIENT',   c: '#6fd18b', g: '#6fd18b55' };
    if (s >= 45) return { t: 'HOLDING',     c: '#f3a52a', g: '#f3a52a55' };
    if (s >= 35) return { t: 'PRESSURED',   c: '#d8842b', g: '#d8842b55' };
    return         { t: 'CRITICAL',    c: '#ef3d42', g: '#ef3d4255' };
  }

  $('resilienceGrid').innerHTML = REBEL.resilience
    .map((d) => {
      const t = tier(d.score);
      return `
        <article class="rb-res-card" role="listitem" tabindex="0"
                 aria-label="${esc(d.name)} resilience score ${d.score} of 100, tier ${t.t}"
                 style="--rb-card-accent:${t.c};--rb-card-glow:${t.g};--rb-res-w:${d.score}%">
          <div class="k">
            <span class="rri-label">${esc(d.name)}</span>
            <span class="rb-res-tier">${t.t}</span>
          </div>
          <div class="rb-res-score">${d.score}<span class="rb-res-score-unit"> / 100</span></div>
          <div class="rb-res-bar"><div class="rb-res-bar-fill" style="width:${d.score}%"></div></div>
          <div class="rb-res-imperial">vs Imperial Control · <b>${d.imperial}</b></div>
          <div class="rb-res-tip" role="tooltip">
            <b>${esc(d.name)} · Resilience Mechanisms</b>
            ${esc(d.blurb)}
            <ul>${d.mech.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>
          </div>
        </article>`;
    })
    .join('');

  /* ── Radar: Rebel resilience vs Imperial control ───────────────────── */
  (function renderRadar() {
    const svg = $('radarSvg');
    if (!svg) return;
    const cx = 160, cy = 160, R = 120;
    const axes = REBEL.resilience;
    const n = axes.length;

    function pt(value, i) {
      const a = (-Math.PI / 2) + (i * 2 * Math.PI) / n;
      const r = (value / 100) * R;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    }

    let svgParts = [];

    // grid rings (4 levels)
    for (let k = 1; k <= 4; k++) {
      const rr = (R * k) / 4;
      const poly = axes
        .map((_, i) => {
          const a = (-Math.PI / 2) + (i * 2 * Math.PI) / n;
          return `${cx + rr * Math.cos(a)},${cy + rr * Math.sin(a)}`;
        })
        .join(' ');
      svgParts.push(`<polygon class="axis-grid" points="${poly}"/>`);
    }
    // axis lines
    axes.forEach((_, i) => {
      const [x, y] = pt(100, i);
      svgParts.push(`<line class="axis-line" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`);
    });
    // Imperial polygon
    const impPts = axes.map((d, i) => pt(d.imperial, i).join(',')).join(' ');
    svgParts.push(`<polygon class="axis-imperial" points="${impPts}"/>`);
    // Rebel polygon
    const rebPts = axes.map((d, i) => pt(d.score, i).join(',')).join(' ');
    svgParts.push(`<polygon class="axis-rebel" points="${rebPts}"/>`);
    // labels
    axes.forEach((d, i) => {
      const [x, y] = pt(118, i);
      const anchor = Math.abs(x - cx) < 6 ? 'middle' : (x > cx ? 'start' : 'end');
      svgParts.push(`<text x="${x}" y="${y + 4}" text-anchor="${anchor}">${esc(d.name)}</text>`);
    });
    svg.innerHTML = svgParts.join('');
  })();

  /* ── Crypto mechanisms with filter ──────────────────────────────────── */
  function renderMech(filter) {
    const grid = $('cryptoMechGrid');
    grid.innerHTML = REBEL.cryptoMechanisms
      .map((m) => {
        const hidden = filter && filter !== 'all' && m.category !== filter ? ' hidden' : '';
        return `
          <article class="rb-mech${hidden}" tabindex="0" aria-label="${esc(m.title)}">
            <div class="symbol" aria-hidden="true">${esc(m.symbol)}</div>
            <h4>${esc(m.title)}</h4>
            <p>${esc(m.body)}</p>
            <div class="tag-row">
              ${m.pills.map((p) => `<span class="pill ${esc(p.kind)}">${esc(p.text)}</span>`).join('')}
            </div>
          </article>`;
      })
      .join('');
  }
  renderMech('all');

  const filterBar = $('cryptoFilter');
  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-filter]');
    if (!btn) return;
    filterBar.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderMech(btn.dataset.filter);
  });

  /* ── Polycentric governance interactive map ────────────────────────── */
  (function renderPoly() {
    const svg = $('polySvg');
    if (!svg) return;
    const W = 480, H = 320;
    const nodes = REBEL.polyNodes;
    const cx = W / 2, cy = H / 2;
    const positions = nodes.map((n) => ({
      ...n,
      px: (n.x / 100) * W,
      py: (n.y / 100) * H,
    }));

    const links = [];
    positions.forEach((a, i) => {
      positions.forEach((b, j) => {
        if (j > i && a.id !== 'fed' && b.id !== 'fed') return;
        if (a.id === b.id) return;
        if (a.id === 'fed' || b.id === 'fed') {
          links.push([a, b]);
        }
      });
    });

    const linkParts = links
      .map(
        ([a, b], idx) =>
          `<line class="rb-node-link" data-link="${a.id}-${b.id}" x1="${a.px}" y1="${a.py}" x2="${b.px}" y2="${b.py}"/>`
      )
      .join('');

    const nodeParts = positions
      .map(
        (n) => `
          <g class="rb-node" data-id="${esc(n.id)}" tabindex="0" role="button"
             aria-label="${esc(n.label)}">
            <circle class="rb-node-dot" data-node="${esc(n.id)}"
                    cx="${n.px}" cy="${n.py}" r="8"/>
            <text class="rb-node-label" x="${n.px}" y="${n.py - 14}" text-anchor="middle">${esc(n.label)}</text>
          </g>`
      )
      .join('');

    svg.innerHTML = linkParts + nodeParts;

    const dossier = $('polyDossier');
    function selectNode(id) {
      const node = REBEL.polyNodes.find((n) => n.id === id);
      if (!node) return;
      dossier.innerHTML = `<b style="color:var(--rb-amber);letter-spacing:.1em;font:700 11px ui-monospace,monospace;text-transform:uppercase;">${esc(node.label)}</b><br>${esc(node.body)}`;
      svg.querySelectorAll('.rb-node-dot').forEach((d) => d.classList.remove('active'));
      svg.querySelector(`.rb-node-dot[data-node="${id}"]`).classList.add('active');
      svg.querySelectorAll('.rb-node-link').forEach((l) => {
        l.classList.toggle('active', l.dataset.link.includes(id));
      });
    }

    svg.addEventListener('click', (e) => {
      const dot = e.target.closest('.rb-node-dot');
      if (dot) selectNode(dot.dataset.node);
    });
    svg.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const g = e.target.closest('.rb-node');
      if (g) {
        e.preventDefault();
        selectNode(g.dataset.id);
      }
    });

    selectNode('fed');
  })();

  /* ── Sources list ───────────────────────────────────────────────────── */
  const sourcesList = $('sourcesList');
  if (sourcesList) {
    sourcesList.innerHTML = REBEL.sources
      .map(
        (s) =>
          `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`
      )
      .join('');
  }

  /* ── Transmissions ticker (sidebar-quote style) ─────────────────────── */
  let txIdx = 0;
  const txEl = $('transmission');
  if (txEl) {
    txEl.textContent = REBEL.transmissions[0];
    window.cycleTransmission = function () {
      txIdx = (txIdx + 1) % REBEL.transmissions.length;
      txEl.textContent = REBEL.transmissions[txIdx];
    };
  }

  /* ── Nav scroll ─────────────────────────────────────────────────────── */
  window.go = function (id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
})();
