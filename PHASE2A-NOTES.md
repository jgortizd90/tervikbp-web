# TERVIK Website — Phase 2A

## Architecture
- Deployment remains static HTML/CSS/JS on GitHub Pages.
- Product/category facts for this pilot are centralized in `data/catalog.phase2a.json`.
- `scripts/build-phase2a.mjs` uses Node built-ins only and generates the two representative pages as static HTML at their existing URLs.
- No backend, database, CMS, React, Next, or runtime dependency was introduced.
- Remaining pages were not converted.

## Phase 2A pages
- `/impermeabilizantes/`
- `/impermeabilizantes/impermeabilizante-acrilico-10-anos/`

## Content source
Latest 2026 TERVIK catalog. For the 10-year acrylic product the catalog confirms: acrylic, elastomeric, fiber-reinforced; water base; 19 L; white and terracotta. The catalog does not publish yield, drying/recoat, supported surfaces, or shelf life, so those are explicitly left pending technical-sheet confirmation.

## Build
Run from repository root:

`node scripts/build-phase2a.mjs`

The generated files remain ordinary static HTML and can be deployed to GitHub Pages as before.
