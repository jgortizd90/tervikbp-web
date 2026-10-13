# TERVIK Website — Phase 2B Notes

## Build summary
- 6 generated category pages.
- 39 generated current product/group pages from the 2026 catalog.
- 9 preserved historical compatibility routes: 8 Ferretería routes not present in the 2026 catalog, plus `/impermeabilizantes/impermeabilizante-asfaltico/` as a historical alias for Emulsión Fibratada.
- 54 generated interior routes total; 55 `/index.html` routes including the unchanged homepage.
- No existing index route was lost and no new public slug was introduced.

## Architecture
Phase 2A architecture is preserved. `data/catalog.phase2b.json` extends the structured catalog to all six lines, and `scripts/build-phase2b.mjs` generates static GitHub Pages-compatible HTML. There is no production runtime, backend, database, CMS or framework.

The approved `data/catalog.phase2a.json` remains in the repository as the Phase 2A pilot source/reference. Phase 2B uses the expanded Phase 2B data file so the approved pilot is not destroyed.

## Content rules
The product facts in generated current pages come from `catalogo-tervik-2026.pdf`. Unsupported technical values are not emitted publicly. `pendingTechnicalFields` remains an internal data flag where applicable.

Important source gaps:
- Arquitectónico: the catalog does not publish package volume/presentation for these four products; public pages omit it.
- Maderas: the catalog does not publish package volume/presentation; public pages omit it.
- Aerosoles Convencionales: the catalog states 33 options but does not enumerate all 33 names in the supplied text; the page uses the verified count only.
- Rollos asfálticos: exact dimensions, useful coverage, compatibility and installation are not published per reference; omitted.
- Product-specific technical sheets are not present in the repository; only the existing 2026 catalog is linked.

## Historical compatibility routes
The following routes exist in the old site but are not products listed in the 2026 catalog. They remain functioning as `noindex, follow` compatibility pages with canonical targets to the current line, and are excluded from the current sitemap:
- `/ferreteria/desengrasante-multiusos/`
- `/ferreteria/desinfectante-bessq/`
- `/ferreteria/espuma-nutriente-para-piel/`
- `/ferreteria/formula-marina/`
- `/ferreteria/gas-fenix/`
- `/ferreteria/limpiador-de-vidrios/`
- `/ferreteria/protector-anticorrosivo/`
- `/ferreteria/shampoo-para-vehiculos/`

`/impermeabilizantes/impermeabilizante-asfaltico/` is retained as a historical alias and points users to `/impermeabilizantes/emulsion-fibratada/`.

## Asset exceptions
All 11 approved production masters in the repository are used for their corresponding products. The remaining current products use legitimate existing local imagery conservatively.

Gas Fénix remains a special exception: its local source is 500 × 500 px and is not upscaled, sharpened aggressively, reconstructed or regenerated. It is used only on the historical compatibility page and remains pending replacement.

## QA
- Static reference validation: zero broken local links and zero missing image paths.
- Expected/generated route reconciliation: zero missing routes and zero unexpected route outputs.
- Unique title / meta description / one-H1 validation: passed.
- Current-page canonical URL consistency: passed.
- HTML parser validation: zero malformed files reported.
- Automated viewport checks: 55 routes × 2 viewports (1440 and 390) = 110 checks; zero horizontal overflow and zero JavaScript/page errors.
- Representative visual renders created for Arquitectónico, Ferretería, five current product types, and Gas Fénix compatibility.
- Homepage `index.html` and `assets/home-v21.css` SHA-256 values match the approved Phase 2A calibrated source exactly; no homepage visual change was made.

## Build
Run from repository root:

```bash
node scripts/build-phase2b.mjs
```

Then serve the directory with any static server or deploy it as GitHub Pages static output.
