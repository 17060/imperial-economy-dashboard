/* Imperial Economy Dashboard — rendering & interactions.
   All editable content lives in js/data.js. This file should only need
   updates when the dashboard's structure or behavior changes. */

(function () {
  const D = window.DASHBOARD_DATA;
  if (!D) {
    console.error('DASHBOARD_DATA missing — js/data.js failed to load.');
    return;
  }

  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));

  /* ── Header / sidebar meta ──────────────────────────────────────────── */
  $('opName').textContent = D.meta.operation;
  $('opAuthority').innerHTML =
    `Authority: ${esc(D.meta.authority)}<br>Clearance: ${esc(D.meta.clearance)}`;
  $('opSector').textContent = D.meta.sector;

  /* Subjugation meter — count up from 0 to target value */
  const meter = $('subjugationMeter');
  const targetIdx = D.meta.subjugationIndex;
  meter.setAttribute('data-value', 0);
  $('subjugationTier').textContent = `OF 100 · ${D.meta.subjugationTier}`;
  let meterVal = 0;
  const meterTimer = setInterval(() => {
    meterVal = Math.min(meterVal + 1, targetIdx);
    meter.setAttribute('data-value', meterVal);
    if (meterVal >= targetIdx) clearInterval(meterTimer);
  }, 20);

  /* ── Theatre readiness bars ─────────────────────────────────────────── */
  function renderBars() {
    $('bars').innerHTML = D.theatreReadiness
      .map(
        ({ label, value }) => `
          <div class="bar">
            <span>${esc(label)}</span>
            <div class="track"><div class="fill" style="width:${value}%"></div></div>
            <span class="small">${value}</span>
          </div>`
      )
      .join('');
  }
  renderBars();

  /* ── Directives ─────────────────────────────────────────────────────── */
  $('directives').innerHTML =
    D.directives.map((d) => `<li>${esc(d)}</li>`).join('');

  /* ── Hero KPI cards ─────────────────────────────────────────────────── */
  $('controlCards').innerHTML = D.imperialControl
    .map(({ label, value, delta, deltaTone }) => {
      const cls = deltaTone === 'up' ? 'up' : deltaTone === 'down' ? 'dn' : 'small';
      return `
        <div class="card">
          <div class="k">${esc(label)}</div>
          <div class="v">${esc(value)}</div>
          <div class="${cls}">${esc(delta)}</div>
        </div>`;
    })
    .join('');

  /* ── Energy chokepoints ─────────────────────────────────────────────── */
  const statusClass = (s) =>
    s === 'severed' ? '' :
    s === 'held'    ? 'cyan' :
                      'amber';

  const nodeRow = (n, rowId) => `
    <div class="row row-stacked"${rowId != null ? ` id="${esc(String(rowId))}"` : ''}>
      <div>
        <b>${esc(n.name)}</b>
        ${n.role   ? `<div class="small">${esc(n.role)}</div>`              : ''}
        ${n.detail ? `<div class="small detail">${esc(n.detail)}</div>`     : ''}
      </div>
      <span class="status">${esc(n.status.toUpperCase())}</span>
    </div>`;

  function renderMapNode(n) {
    return `<div class="node ${statusClass(n.status)}"
         style="left:${n.x}%;top:${n.y}%"
         data-nid="${esc(n.id)}"
         onclick="highlightEnergyNode('${esc(n.id)}')"
         tabindex="0" role="button"
         aria-label="${esc(n.label)}, status ${esc(n.status)}">
      <span>${esc(n.label)}</span>
    </div>`;
  }

  function renderEnergyNodes() {
    $('nodes').innerHTML = D.energyChokepoints.nodes
      .map((n, i) => nodeRow(n, `en-row-${i}`))
      .join('');
    $('mapNodes').innerHTML = D.energyChokepoints.mapNodes
      .map(renderMapNode)
      .join('');
  }
  renderEnergyNodes();

  window.highlightEnergyNode = function (nid) {
    const idx = D.energyChokepoints.mapNodes.findIndex((n) => n.id === nid);
    document.querySelectorAll('#nodes .row').forEach((r, i) => {
      r.classList.toggle('node-active', i === idx);
    });
    document.querySelectorAll('#mapNodes .node').forEach((dot) => {
      dot.classList.toggle('node-selected', dot.dataset.nid === nid);
    });
    if (idx >= 0) {
      const row = document.getElementById(`en-row-${idx}`);
      if (row) row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const citeLink = (c) =>
    c ? `<a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.label)}</a>` : '';
  const citeList = (arr) =>
    Array.isArray(arr) && arr.length
      ? 'Source: ' + arr.map(citeLink).join(' · ')
      : '';

  const energyCite = $('energyCite');
  if (energyCite && D.energyChokepoints.citation) {
    energyCite.innerHTML = 'Source: ' + citeLink(D.energyChokepoints.citation);
  }

  /* ── Simulate Scarcity / Re-route Fleet ─────────────────────────────── */
  const origNodeStatuses = D.energyChokepoints.nodes.map((n) => n.status);
  const origMapStatuses  = D.energyChokepoints.mapNodes.map((n) => n.status);
  const origReadiness    = D.theatreReadiness.map((t) => t.value);

  window.simulateScarcity = function (btn) {
    const active = btn.dataset.active === '1';
    if (!active) {
      btn.dataset.active = '1';
      btn.textContent = 'Reset Scenario';
      D.energyChokepoints.nodes.forEach((n) => { n.status = 'severed'; });
      D.energyChokepoints.mapNodes.forEach((n) => { n.status = 'severed'; });
    } else {
      btn.dataset.active = '';
      btn.textContent = 'Simulate Scarcity';
      D.energyChokepoints.nodes.forEach((n, i) => { n.status = origNodeStatuses[i]; });
      D.energyChokepoints.mapNodes.forEach((n, i) => { n.status = origMapStatuses[i]; });
    }
    renderEnergyNodes();
  };

  window.rerouteFleet = function (btn) {
    const active = btn.dataset.active === '1';
    if (!active) {
      btn.dataset.active = '1';
      btn.textContent = 'Revert Deployment';
      D.theatreReadiness[0].value = 76;  // Fleet Posture drops (split deployment via Cape)
      D.theatreReadiness[5].value = 52;  // Insurgent Liquidity rises (rebels exploit gap)
    } else {
      btn.dataset.active = '';
      btn.textContent = 'Re-route Fleet';
      D.theatreReadiness.forEach((t, i) => { t.value = origReadiness[i]; });
    }
    renderBars();
  };

  /* ── Debt gauges ────────────────────────────────────────────────────── */
  const gaugeCard = ({ label, value, sub }) => `
    <div class="panel gauge">
      <div class="ring" style="--p:${Math.min(100, value)}"><div>${value}</div></div>
      <b>${esc(label)}</b>
      <p class="small">${esc(sub)}</p>
    </div>`;

  $('debtGauges').innerHTML = D.debt.map(gaugeCard).join('');

  const debtCite = $('debtCite');
  if (debtCite) debtCite.innerHTML = citeList(D.debtCitations);

  /* ── Governance weak spots ──────────────────────────────────────────── */
  $('weakSpots').innerHTML = D.governance.weakSpots
    .map(
      (w) => `
        <div class="row">
          <b>${esc(w.label)}</b>
          <span class="status">${esc(w.status)}</span>
        </div>`
    )
    .join('');
  $('governanceDossier').textContent = D.governance.dossier;
  const governanceCite = $('governanceCite');
  if (governanceCite && D.governance.citation) {
    governanceCite.innerHTML = 'Source: ' + citeLink(D.governance.citation);
  }

  /* ── Imperial leverage radar (dynamic) ─────────────────────────────── */
  (function renderImperialRadar() {
    const svg = $('imperialRadarSvg');
    if (!svg || !D.imperialRadar) return;
    const cx = 160, cy = 160, R = 120;
    const axes = D.imperialRadar;
    const n = axes.length;

    function pt(value, i) {
      const a = (-Math.PI / 2) + (i * 2 * Math.PI) / n;
      const r = (value / 100) * R;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    }

    const parts = [];
    for (let k = 1; k <= 3; k++) {
      const rr = (R * k) / 3;
      const poly = axes.map((_, i) => {
        const a = (-Math.PI / 2) + (i * 2 * Math.PI) / n;
        return `${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`;
      }).join(' ');
      parts.push(`<polygon points="${poly}" fill="none" stroke="#30384a"/>`);
    }
    axes.forEach((_, i) => {
      const [x, y] = pt(100, i);
      parts.push(`<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#30384a" fill="none"/>`);
    });
    const impPts = axes.map((d, i) => pt(d.value, i).map((v) => v.toFixed(1)).join(',')).join(' ');
    parts.push(`<polygon points="${impPts}" fill="#ef3d4240" stroke="#ef3d42" stroke-width="3"/>`);
    axes.forEach((d, i) => {
      const [x, y] = pt(118, i);
      const anchor = Math.abs(x - cx) < 6 ? 'middle' : (x > cx ? 'start' : 'end');
      parts.push(`<text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" fill="#eef1f8" font-size="12" font-family="monospace" text-anchor="${anchor}">${esc(d.axis)}</text>`);
    });
    svg.innerHTML = parts.join('');
  })();

  /* ── AI surveillance ────────────────────────────────────────────────── */
  $('terminal').innerHTML = D.aiSurveillance.terminal
    .map((line) => `<p>${esc(line)}</p>`)
    .join('');

  $('aiTools').innerHTML = D.aiSurveillance.tools
    .map(
      (t) => `
        <div class="row">
          <b>${esc(t.label)}</b>
          <span class="status">${t.value}%</span>
        </div>`
    )
    .join('');

  const quotes = D.aiSurveillance.quotes;
  let quoteIdx = 0;
  $('quote').textContent = quotes[0];
  window.cycle = function cycle() {
    quoteIdx = (quoteIdx + 1) % quotes.length;
    $('quote').textContent = quotes[quoteIdx];
  };

  const aiCite = $('aiCite');
  if (aiCite) aiCite.innerHTML = citeList(D.aiSurveillance.citations);

  /* ── Crypto perimeter ───────────────────────────────────────────────── */
  if (D.crypto) {
    const cryptoNodes = $('cryptoNodes');
    if (cryptoNodes) cryptoNodes.innerHTML = D.crypto.nodes.map((n) => nodeRow(n)).join('');

    const cryptoGauges = $('cryptoGauges');
    if (cryptoGauges) cryptoGauges.innerHTML = D.crypto.gauges.map(gaugeCard).join('');

    const cryptoDossier = $('cryptoDossier');
    if (cryptoDossier) cryptoDossier.textContent = D.crypto.dossier;

    const cryptoCite = $('cryptoCite');
    if (cryptoCite) cryptoCite.innerHTML = citeList(D.crypto.citations);
  }

  /* ── Rebel Resistance Index ─────────────────────────────────────────── */
  function rriTier(s) {
    if (s >= 70) return { t: 'HIGH',        c: '#6fd18b', g: '#6fd18b55' };
    if (s >= 55) return { t: 'MODERATE',    c: '#c8d264', g: '#c8d26455' };
    if (s >= 40) return { t: 'CONSTRAINED', c: '#d8842b', g: '#d8842b55' };
    return         { t: 'SUPPRESSED',  c: '#ef3d42', g: '#ef3d4255' };
  }

  $('rriGrid').innerHTML = D.rebelResistanceIndex
    .map((d) => {
      const t = rriTier(d.score);
      return `
        <article class="rri-card" role="listitem" tabindex="0"
                 aria-label="${esc(d.name)} resistance score ${d.score} of 100, tier ${t.t}"
                 style="--rri-accent:${t.c};--rri-glow:${t.g};--rri-w:${d.score}%">
          <div class="k">
            <span class="rri-label">${esc(d.name)}</span>
            <span class="rri-tier">${t.t}</span>
          </div>
          <div class="rri-score">${d.score}<span class="rri-score-unit"> / 100</span></div>
          <div class="rri-bar"><div class="rri-bar-fill" style="width:${d.score}%"></div></div>
          <div class="rri-tip" role="tooltip">
            <b>${esc(d.name)} · Resistance Mechanisms</b>
            ${esc(d.blurb)}
            <ul>${d.mech.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>
          </div>
        </article>`;
    })
    .join('');

  /* ── Nav scroll ─────────────────────────────────────────────────────── */
  window.go = function go(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  /* ── Terminal ticker ────────────────────────────────────────────────── */
  const tickerMessages = [
    'compliance forecast recalibrated',
    'levy yield projection updated · q/q +4.3%',
    'surveillance mesh uplink nominal · 68% coverage',
    'sector 001 subjugation index holding · 79 / 100',
    'crypto perimeter sweep complete · 12 anomalies flagged',
    'theatre readiness pulse received · fleet posture 91%',
    'debt leverage coefficient recalculated',
    'biometric intake pipeline nominal · dhs backlog clearing',
    'resistance cell attrition confirmed · −1.3% this cycle',
    'stablecoin issuer compliance posture under review',
    'FMTI transparency index recalibrated · avg 40',
    'energy chokepoint status refresh · hormuz: severed',
    'imperial bond refinancing tranche queued',
    'open-weight model proliferation flagged for review',
    'palantir bpa utilization at 87% capacity',
  ];
  let tickerIdx = 0;
  setInterval(() => {
    const t = $('terminal');
    const p = document.createElement('p');
    p.textContent =
      '[' + new Date().toISOString().slice(11, 19) +
      '] ' + tickerMessages[tickerIdx % tickerMessages.length];
    tickerIdx++;
    t.appendChild(p);
    while (t.children.length > 7) t.removeChild(t.firstChild);
  }, 3500);

  /* ── Footer date (derived from meta.sector) ─────────────────────────── */
  const footerDate = $('footerDate');
  if (footerDate) {
    const m = D.meta.sector.match(/(\d{4}-\d{2}-\d{2})$/);
    if (m) {
      const d = new Date(m[1] + 'T00:00:00');
      footerDate.textContent = d.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      });
    }
  }
})();
