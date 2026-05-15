# Imperial Economy Dashboard

A static, dependency-free dashboard rendering Darth Vader's economic control
framework for Earth. Hosted via GitHub Pages from `main`.

## Project structure

```
index.html        Semantic markup + asset references. No data inlined.
css/styles.css    All styling (theme, layout, RRI tooltips, responsive rules).
js/data.js        Editable dashboard data — this is what weekly updates change.
js/app.js         Rendering and interaction logic. Rarely needs to change.
```

The site has no build step and no runtime dependencies. Open `index.html`
directly or serve the directory with any static server.

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
| `aiSurveillance`         | Terminal lines, tool readiness rows, cycling Vader quotes           |
| `rebelResistanceIndex`   | Five RRI cards (score, blurb, mechanism bullets); tiers auto-color  |
| `sources`                | Free-text rationale/citations scratchpad (not rendered)             |

The schema and a per-cycle update checklist are documented inline at the top
of `js/data.js`.

## Deployment

GitHub Pages serves the repository root from `main`. Commit and push, and the
live site updates after Pages propagation (usually a minute or two).
