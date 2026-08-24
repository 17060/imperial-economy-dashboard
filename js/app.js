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
  const meter = $('subjugationMeter');
  meter.setAttribute('data-value', D.meta.subjugationIndex);
  $('subjugationTier').textContent = `OF 100 · ${D.meta.subjugationTier}`;

  /* ── Theatre readiness bars ─────────────────────────────────────────── */
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

  /* ── Directives ─────────────────────────────────────────────────────── */
  $('directives').innerHTML =
    D.directives.map((d) => `<li>${esc(d)}</li>`).join('');

  /* ── Hero KPI cards ─────────────────────────────────────────────────── */
  $('controlCards').innerHTML = D.imperialControl
    .map(({ label, value, delta, deltaTone }) => {
      const cls = deltaTone === 'up' ? 'up' : 'small';
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

  $('mapNodes').innerHTML = D.energyChokepoints.mapNodes
    .map(
      (n) => `
        <div class="node ${statusClass(n.status)}"
             style="left:${n.x}%;top:${n.y}%">
          <span>${esc(n.label)}</span>
        </div>`
    )
    .join('');

  const nodeRow = (n) => `
    <div class="row row-stacked">
      <div>
        <b>${esc(n.name)}</b>
        ${n.role ? `<div class="small">${esc(n.role)}</div>` : ''}
      </div>
      <span class="status">${esc(n.status.toUpperCase())}</span>
    </div>`;

  $('nodes').innerHTML = D.energyChokepoints.nodes.map(nodeRow).join('');

  const citeLink = (c) =>
    c ? `<a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.label)}</a>` : '';
  const citeList = (arr) =>
    Array.isArray(arr) && arr.length
      ? 'Source: ' + arr.map(citeLink).join(' · ')
      : '';

  const energySources = [
    D.energyChokepoints.citation,
    D.energyChokepoints.citation2,
    D.energyChokepoints.citation3,
    D.energyChokepoints.citation4,
    D.energyChokepoints.citation5,
    D.energyChokepoints.citation6,
    D.energyChokepoints.citation7,
    D.energyChokepoints.citation8,
    D.energyChokepoints.citation9,
    D.energyChokepoints.citation10,
  ].filter(Boolean);
  const energyCite = $('energyCite');
  if (energyCite && energySources.length) {
    energyCite.innerHTML = 'Sources: ' + energySources.map(citeLink).join(' · ');
  }

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
    const governanceSources = [D.governance.citation, D.governance.citation2, D.governance.citation3].filter(Boolean);
    governanceCite.innerHTML = 'Sources: ' + governanceSources.map(citeLink).join(' · ');
  }

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
    if (cryptoNodes) cryptoNodes.innerHTML = D.crypto.nodes.map(nodeRow).join('');

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
  setInterval(() => {
    const t = $('terminal');
    const p = document.createElement('p');
    p.textContent =
      '[' + new Date().toISOString().slice(11, 19) +
      '] compliance forecast recalibrated';
    t.appendChild(p);
    while (t.children.length > 7) t.removeChild(t.firstChild);
  }, 3500);
})();
