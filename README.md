# Imperial Economy Dashboard

A static, dependency-free dashboard rendering Darth Vader's economic control
framework for Earth across five axes — energy chokepoints, debt leverage,
fragmented governance, AI surveillance, and the crypto settlement / regulatory
perimeter — anchored to 2025 / early-2026 public reporting. Hosted via GitHub
Pages from `main`.

The numerical framing on every section traces back to: U.S. EIA *World Oil
Transit Chokepoints* (updated 3 March 2026); IMF *Fiscal Monitor* (April 2026)
and World Bank *International Debt Report 2024*; Freedom House *Freedom in the
World 2026* and *Freedom on the Net 2025*; Stanford HAI *2026 AI Index Report*;
U.S. SEC FY2025 enforcement results (press release 2026-34, 7 April 2026); and
the Chainalysis *2026 Crypto Crime Report* introduction. Per-section citation
links are rendered in the UI; the companion page (`control-theory-explainer.html`)
holds the long-form analytical version.

## Project structure

```
index.html                     Semantic markup + asset references. No data inlined.
control-theory-explainer.html  Analytical companion page (static, no JS).
rebel-counter-briefing.html    Rebel Alliance counter-briefing companion page.
css/styles.css                 Shared styling (theme, layout, RRI tooltips, responsive rules).
css/explainer.css              Companion-page-only styles.
css/rebel.css                  Counter-briefing styles (amber/signal palette, resilience cards, radar).
js/data.js                     Editable dashboard data — this is what weekly updates change.
js/app.js                      Rendering and interaction logic. Rarely needs to change.
js/rebel.js                    Counter-briefing data + rendering (resilience cards, radar, mechanism filters, polycentric map).
```

The site has no build step and no runtime dependencies. Open `index.html`
directly or serve the directory with any static server.

## Rebel Counter-Briefing Companion

`rebel-counter-briefing.html` is a static companion page that inverts the
dashboard's five-axis frame into a Rebel Alliance counter-briefing: same
energy / debt / governance / crypto / AI–digital lens, read for how
decentralized, polycentric, and distributed actors retain capacity to resist
consolidated Imperial control. It shares the dark base aesthetic but shifts
accents to warm amber / signal red / off-white with tactical blue and green.

Interactive elements include:

- **Decentralization resilience cards** — five domain readings (0–100) with
  hover/focus tooltips, color-coded tiers, and a comparison readout vs the
  matching Imperial Control score from the main dashboard.
- **Radar chart** — Rebel Resilience polygon overlaid on the Imperial Control
  polygon across the same five axes.
- **Crypto rails mechanism cards** — analytical, non-operational coverage of
  self-custody, stablecoin rails, P2P liquidity, cross-border settlement,
  jurisdictional arbitrage, and on-chain auditability, with category filter
  toggles.
- **Polycentric governance schematic** — clickable SVG node map (federalism,
  judiciaries, free press / civil society, legal pluralism, contested
  legitimacy) with a dossier panel.

Live: https://17060.github.io/imperial-economy-dashboard/rebel-counter-briefing.html

## Control-Theory Companion

`control-theory-explainer.html` is a static, dependency-free one-page annex
that reframes the dashboard's five core axes — energy chokepoints, debt
leverage, fragmented governance, AI surveillance readiness, and crypto
settlement / regulatory perimeter — as geopolitical control-theory mechanisms,
with inline citations to a 2025 / early-2026 source base (U.S. EIA *World Oil
Transit Chokepoints* (March 2026), IMF *Fiscal Monitor* April 2026, Freedom
House's *Freedom in the World 2026* and *Freedom on the Net 2025*, Stanford
HAI's *2026 AI Index Report*, the SEC's FY2025 enforcement results, and the
Chainalysis *2026 Crypto Crime Report*). The main dashboard links to it from
the top nav and footer.

## Weekly updates

**Automation updates `js/data.js` only.** The HTML, CSS, and rendering JS do
not need to be touched for routine content refreshes.

`js/data.js` exports a single `DASHBOARD_DATA` object whose top-level keys map
to the dashboard's sections:

| Key                      | Drives                                                              |
| ------------------------ | ------------------------------------------------------------------- |
| `meta`                   | Operation banner, sector line, subjugation meter                    |
| `imperialControl`        | Four hero KPI cards                                                 |
| `theatreReadiness`       | Sidebar progress bars                                               |
| `directives`             | Sidebar ordered list                                                |
| `energyChokepoints`      | Threat-map dots + Node Dossier rows                                 |
| `debt`                   | Four debt-leverage gauges                                           |
| `governance`             | Weak-spots list + dossier line                                      |
| `aiSurveillance`         | Terminal lines, tool readiness rows, cycling Vader quotes, source links |
| `crypto`                 | Crypto perimeter dossier, four perimeter gauges, source links       |
| `rebelResistanceIndex`   | Five RRI cards (score, blurb, mechanism bullets); tiers auto-color  |
| `sources`                | Free-text rationale/citations scratchpad (not rendered)             |

The schema and a per-cycle update checklist are documented inline at the top
of `js/data.js`.

## Deployment

GitHub Pages serves the repository root from `main`. Commit and push, and the
live site updates after Pages propagation (usually a minute or two).
