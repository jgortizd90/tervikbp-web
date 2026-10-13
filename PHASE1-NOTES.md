# TERVIK Website — Phase 1 Build Notes

## Scope completed
- Preserved the existing static GitHub Pages architecture for this controlled Phase 1 rather than replacing the entire site stack.
- Rebuilt the homepage to follow the approved V2.1 visual system.
- Added Phase 1 homepage-specific responsive CSS and JavaScript.
- Integrated the 11 approved production masters into the repository; the homepage uses approved masters wherever applicable.
- Replaced the legacy catalog link on the new homepage with the 2026 catalog included in the handoff.
- Rebuilt Capacidad Industrial as a full-width navy typographic/graphic section with no factory photograph.
- Preserved existing line and product URLs; Phase 2 pages remain untouched.

## Files created / materially changed
- `index.html` — V2.1 homepage implementation.
- `assets/home-v21.css` — homepage visual system and responsive rules.
- `assets/home-v21.js` — minimal mobile navigation behavior.
- `images/approved/*` — 11 approved production-ready masters.
- `images/mockups/*-v21-temp.png` — temporary application-image crops taken only from the supplied V2.1 reference for implementation calibration; replace with approved production application photography before final deployment.
- `images/tervik-logo-approved-candidate.png` — best available logo candidate from the handoff.
- `images/ferreteria/gas-fenix-source-pending.webp` — original 500×500 Gas Fénix source, retained without upscaling.
- `downloads/catalogo-tervik-2026.pdf` — latest catalog from the handoff.
- `homepage-desktop.png` and `homepage-mobile.png` — Phase 1 QA renders.

## Material implementation decisions
1. **Architecture:** kept the current no-build static HTML/CSS/JS deployment model for Phase 1. The current architecture is viable for the homepage and preserves all public URLs with the least disruption. A data-driven static generator can still be introduced when the remaining 55 pages are rebuilt, but it is not necessary to validate homepage fidelity.
2. **Product imagery:** approved masters override older site imagery on the homepage.
3. **Capacidad Industrial:** implemented without the old factory image. The background uses restrained tone-on-tone structural lines only.
4. **Application imagery:** the handoff contains no approved source photography for the five “¿Qué vas a proteger?” cards. For visual calibration only, temporary crops were extracted from the supplied V2.1 reference. They are explicitly non-final production assets.
5. **Gas Fénix:** no AI upscaling or sharpening was performed. The supplied 500×500 source is used conservatively only in the small Ferretería homepage tile.
6. **Logo:** the handoff’s best candidate contains a white canvas rather than transparency. The header crops that canvas with CSS without changing the artwork. The footer uses a typographic TERVIK fallback to avoid shipping a white logo rectangle on navy. Final deployment should replace this candidate with the official transparent/vector wordmark.

## Visual QA
Compared against the supplied V2.1 reference with focus on:
- header/nav proportions and orange CTA
- split hero composition and headline line breaks
- six product-line cards and product scale
- application-card grid and dark overlays
- featured 10-year acrylic product block
- full-width industrial-capacity hierarchy
- catalog/contact block and footer proportions
- mobile stacking/order, typography and horizontal overflow

QA renders report no horizontal overflow at 1440 px or 390 px (`scrollWidth` equals viewport width).

## Known differences / outstanding items
- Approved source application photography is still missing; temporary V2.1 reference crops must be replaced before public launch.
- Gas Fénix still needs a higher-resolution original or new product photograph.
- The final official transparent/vector TERVIK logo is still needed.
- Category/product pages remain on the prior visual system by design; Phase 1 stops after the homepage.
- WOFF2 font conversion, OG-image optimization and global data-driven page generation are deferred until site-wide implementation, to avoid expanding Phase 1 beyond the approved scope.

## Run locally
From the repository root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

No package install or build step is required for this Phase 1 repository.

---

## Phase 1 Calibration Pass — 2026-10-01

This pass intentionally does **not** begin Phase 2 and does not change the static architecture, homepage structure, section order, application imagery policy, Gas Fénix policy, or temporary logo handling.

### Exact refinements made

- Increased desktop secondary typography selectively: navigation, section support copy, text links, hero body copy, product-card copy/links, featured-product copy/specifications, contact copy, and footer copy.
- Strengthened the six product-line cards without changing their grid or imagery: slightly larger names, more readable descriptions, more consistent name/description/link spacing, and better optical placement of `Ver línea`.
- Rebalanced the featured 10-year product on desktop by reducing the bucket modestly, shifting the column ratio slightly toward the information panel, and tightening the copy-side inset.
- Preserved Capacidad Industrial composition and photography-free direction; increased only supporting-copy readability on desktop/mobile.
- Refined the mobile header with a slightly larger logo, tighter header height, stronger menu-trigger scale, and improved relationship to the navy top bar.
- Performed section-specific mobile vertical-rhythm reductions in hero exit spacing, product cards, application-card gaps, featured product, Capacidad Industrial, and catalog/contact transition.
- Left application images untouched as temporary V2.1 calibration assets.
- Left Gas Fénix untouched and un-upscaled.
- Left temporary logo handling untouched; no redraw/reconstruction attempted.

### QA

Fresh renders:
- Desktop: 1440 px width
- Mobile: 390 px width

Checks passed:
- No horizontal overflow at either viewport.
- No broken image assets in the homepage render.
- No missing local homepage links/assets found by static route validation.
- No homepage HTML structure changes; refinements are CSS-only.
- No new visual components, icons, gradients, photography, cards, or navigation concepts introduced.

Mobile full-page height changed from approximately 7,122 px to 6,657 px, reflecting the requested reduction of excessive empty space while preserving section content and order.

### Remaining discrepancies / known temporary items

- Application photography remains temporary and is still sourced from V2.1 calibration crops pending approved source photography.
- Gas Fénix remains the small original source and should be replaced when a higher-quality source is supplied.
- Current logo treatment remains temporary pending the official transparent/vector logo.
- These items were deliberately not altered during calibration.

**STOP: Phase 2 has not begun.**
