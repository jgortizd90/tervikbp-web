# TERVIK Website — Phase 3 Launch Readiness

## Final QA result

- Routes: PASS — 55 intended site routes resolve from the static build: 46 current routes and 9 compatibility routes.
- Internal links: PASS — zero broken local links in the 55-route crawl.
- Images: PASS — zero missing image references. Native lazy loading was explicitly exercised by scrolling every product card into view; Ferretería loaded 9/9 card images at 1440 and 390 px, and Impermeabilizantes loaded 13/13 at 1440 and 390 px.
- Responsive overflow: PASS — zero horizontal-overflow failures across all 55 routes at 390 px; representative pages also passed at 768, 1024 and 1440 px.
- Console/runtime: PASS — no JavaScript console/page errors in the browser QA sample, including every route at 390 px.
- SEO/canonicals: PASS — current pages have unique titles and descriptions, exactly one H1, no heading-level jumps found, correct self-canonicals, and no accidental `noindex`.
- Downloads: PASS — every public PDF link now points to `/downloads/catalogo-tervik-2026.pdf`; the file exists, parses as a 14-page PDF, and no technical-sheet links are fabricated.
- Compatibility routes: PASS — all 9 resolve, use `noindex, follow`, canonicalize to their intended current target, are excluded from the sitemap, and have no canonical loop.
- `sitemap.xml`: PASS — valid XML with 46 current URLs only, all on `https://www.tervikbp.com`.
- `robots.txt`: PASS — allows crawling and references the production sitemap URL.

## Defects found and fixed in Phase 3

1. **Stale catalog link on `404.html`.** The 404 footer still linked to the older `catalogo-tervik-completo.pdf` and labeled it “Catálogo completo.” It now links to `/downloads/catalogo-tervik-2026.pdf` and is labeled “Catálogo 2026.” No page layout was changed.
2. **Stale launch documentation.** `LEEME.md` still described the pre-Phase-2B catalog structure (including 17 Ferretería products and Gas Fénix as current). It was updated to the approved 2026 structure, current route counts, generator workflow, and rollback/deployment instructions.
3. **Temporary stale data artifact.** Unused root file `data.catalog.tmp` was removed from the launch candidate. It was not referenced by the production site or generator.

No lazy-loading implementation defect was found. Lower Ferretería cards are genuinely native-lazy-loaded before they enter the viewport and load successfully when reached, so `loading="lazy"` remains enabled.

## Content spot checks against the 2026 catalog

Representative checks passed across all six lines:

- Impermeabilizantes — Impermeabilizante acrílico 10 años: Acrílico · Elastomérico · Fibratado; base agua; 19 L; Blanco/Terracota.
- Arquitectónico — Pintura acrílica Profesional: Acrílica · Interior · Exterior; alto cubrimiento/lavabilidad/duración; catalog does not publish package volume, so none is invented.
- Esmaltes — Esmalte Alquidálico Profesional: Alquidálico · Anticorrosivo · Alto brillo; base solvente; 4 L; 18 colors.
- Maderas — Barniz Exterior: Transparente · Protector UV · Alto brillo; Brillante; catalog does not publish package volume.
- Aerosoles — Anticorrosivos: Primario · Protección · Aerosol; rojo/gris; 2 colors; 400 ml.
- Ferretería — Aceite aflojatodo: Penetrante · Mantenimiento · Aerosol; 120 ml and 300 ml.

## Approved master verification

All 11 approved production masters remain assigned to their intended current products: 6 Impermeabilizantes masters, Pintura acrílica Profesional, Esmalte Alquidálico Profesional, Barniz Exterior, Aerosol Convencional, and HIUK Silicón abrillantador.

## Current non-master asset list

The following current products still use legitimate local non-master imagery. This is an asset-quality list only; these paths resolve and render correctly.

### Impermeabilizantes
- Cemento Plástico — `/images/05-cemento-plastico-4L.webp`
- Sellador Tapaporos — `/images/07-sellador-tapaporos-4L.webp`
- Tapagoteras — `/images/08-tapagoteras-wet-dry-4L.webp`
- Brea en Frío — `/images/09-brea-en-frio-19L.webp`
- Rollo #15 — `/images/tervik-15-rollos-asfalticos.webp`
- Rollo #30 — `/images/tervik-30-rollos-asfalticos.webp`
- Rollo #90 Mineral — `/images/tervik-90-rollos-asfalticos.webp`

### Arquitectónico
- Pintura vinílica Esencial — `/images/arquitectonico/esencial-sin-fondo.png`
- Pintura vinílica Clásica — `/images/arquitectonico/clasica-sin-fondo.png`
- Sellador para muros — `/images/arquitectonico/sellador-sin-fondo.png`

### Esmaltes
- Esmalte Alquidálico Esencial — `/images/esmaltes/esencial.webp`
- Esmalte Alquidálico Clásico — `/images/esmaltes/clasico.webp`
- Primer Anticorrosivo — `/images/esmaltes/primer-anticorrosivo.webp`

### Maderas
- Barniz Transparente — `/images/maderas/barniz-transparente.webp`
- Barniz Entintado — `/images/maderas/barniz-entintado.webp`
- Sellador para Madera — `/images/maderas/sellador-para-madera.webp`

### Aerosoles
- Anticorrosivos — `/images/aerosoles/anticorrosivos-sin-fondo.png`
- Fluorescentes — `/images/aerosoles/fluorescentes-sin-fondo.png`
- Niquelados — `/images/aerosoles/niquelados-sin-fondo.png`
- Metálicos — `/images/aerosoles/metalicos-sin-fondo.png`

### Ferretería
- Removedor de pintura — `/images/ferreteria/removedor-de-pintura-limpio.webp`
- Limpiador de motores — `/images/ferreteria/limpiador-de-motores-limpio.webp`
- Limpiador de llantas — `/images/ferreteria/limpiador-de-llantas-limpio.webp`
- Limpiador de alfombras y tapicería — `/images/ferreteria/limpiador-de-tapiceria-limpio.webp`
- Limpiador de carburador — `/images/ferreteria/limpiador-de-carburador-limpio.webp`
- Abrillantador de llantas — `/images/ferreteria/abrillantador-de-llantas-limpio.webp`
- Aceite aflojatodo — `/images/ferreteria/aceite-aflojatodo-limpio.webp`
- Aceite lubricante — `/images/ferreteria/aceite-lubricante-limpio.webp`

## Gas Fénix

- Exists only as a historical compatibility route: `/ferreteria/gas-fenix/`.
- Not present in the 2026 current-product sitemap/category listing.
- Source remains 500 × 500 px.
- Source file hash matches Phase 2B exactly; no upscale, regeneration, reconstruction or sharpening was performed.

## Performance sanity check

- Shared CSS/JS is small (roughly 108 KB total uncompressed across the six shared files).
- Product images are lazy-loaded in category grids and verified to load on scroll.
- The approved 2000 px masters are intentionally retained unchanged; several are 1.5–3.3 MB. A future performance pass could create separate web derivatives while preserving masters, but this was not done because image quality and the approved assets are locked in Phase 3.
- The image directory is about 49 MB total; no accidental broken/duplicate URL references were found.
- The current catalog PDF is approximately 18.3 MB and is not optimized. Reducing its weight later would be safe only if the approved visual/document quality is preserved.

## Homepage regression

`index.html` and `assets/home-v21.css` SHA-256 hashes match the approved Phase 2B source exactly. Phase 3 made no visual homepage change.

## Route summary

- 46 current routes: homepage + 6 categories + 39 current product/group pages.
- 9 compatibility routes.
- 55 total intended site routes.
- 46 sitemap routes.
- Zero accidental URL loss.

## Recommended deployment plan — DO NOT EXECUTE YET

1. In the GitHub repository, open **Settings → Pages** and confirm the configured publishing branch and `/ (root)` source. The repository files indicate branch-based root deployment, but the exact branch name is account/repository configuration and is not stored in this ZIP.
2. Before changing anything, create a backup of the current live commit: preferably create a Git tag such as `pre-phase3-launch-YYYYMMDD`, and also download a ZIP of that commit/branch.
3. Replace the **contents of the currently configured Pages publishing root** with the contents of this launch-candidate folder. Do not add an extra parent folder. Keep `index.html`, `404.html`, `CNAME`, `.nojekyll`, `assets/`, `images/`, `fonts/`, `downloads/`, category folders, `data/`, and `scripts/` at the same relative paths.
4. Keep `CNAME` exactly `www.tervikbp.com`. If the custom domain already resolves correctly, do **not** change DNS. Do not delete/recreate the Pages custom-domain setting during a normal content deployment.
5. Commit the launch as a single identifiable commit so rollback is one revert.
6. Wait for GitHub Pages to report a successful deployment and valid HTTPS.
7. Post-deployment smoke test on the production domain: homepage desktop/mobile; all six categories; representative products; `/downloads/catalogo-tervik-2026.pdf`; `robots.txt`; `sitemap.xml`; and all 9 compatibility URLs.
8. Re-run a broken-link/image crawl against the live domain and confirm no mixed-content or 404 network requests in browser DevTools.
9. Verify `https://www.tervikbp.com` and the canonical URLs resolve without an unexpected repository subpath or duplicate host version.
10. **Rollback:** if a launch-blocking issue appears, revert the launch commit (or redeploy the pre-launch tag/branch) and let Pages rebuild. Keep the existing DNS/CNAME in place unless the failure is specifically DNS-related.
