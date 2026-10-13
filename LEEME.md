# TERVIK — Launch Candidate (Phase 3)

Dominio previsto: `https://www.tervikbp.com`

Esta carpeta contiene la entrega estática completa validada para GitHub Pages. La arquitectura de producción sigue siendo HTML/CSS/JS estático. El contenido repetitivo de categorías y productos se mantiene en `data/catalog.phase2b.json` y se genera con `scripts/build-phase2b.mjs`; el navegador no necesita Node ni ninguna dependencia de runtime.

## Contenido actual

- Homepage aprobada de Phase 1.
- 6 categorías: Impermeabilizantes, Arquitectónico, Esmaltes, Maderas, Aerosoles y Ferretería.
- 39 productos/grupos vigentes respaldados por el catálogo TERVIK 2026.
- 9 rutas históricas de compatibilidad preservadas con `noindex, follow` y canonical hacia la ruta vigente correspondiente.
- 46 URLs vigentes en `sitemap.xml` (homepage + 6 categorías + 39 productos/grupos).
- `404.html`, `robots.txt`, `CNAME` y `.nojekyll` incluidos.
- Catálogo vigente enlazado públicamente: `/downloads/catalogo-tervik-2026.pdf`.

## Generación

Para regenerar las páginas interiores después de editar datos:

```bash
node scripts/build-phase2b.mjs
```

No hay dependencias npm. El script usa únicamente módulos integrados de Node y escribe HTML estático en los slugs existentes.

## Publicar en GitHub Pages

1. Antes de publicar, crear un tag/branch de respaldo o descargar un ZIP de la versión live actual.
2. Confirmar en **Settings → Pages** qué rama está configurada como fuente y que publica desde `/ (root)`.
3. Sustituir en esa raíz los archivos del sitio por **el contenido de esta carpeta**; no subir la carpeta contenedora.
4. Mantener `CNAME` con `www.tervikbp.com` y `.nojekyll` en la raíz.
5. No cambiar DNS durante este despliegue si el dominio ya apunta correctamente a GitHub Pages.
6. Esperar el build/publicación de Pages y verificar primero HTTPS, homepage, categorías, productos, descargas y rutas históricas.

## Rollback

Si aparece un defecto de producción, revertir el commit de lanzamiento o volver a desplegar el tag/branch de respaldo. No modificar DNS para hacer rollback salvo que el incidente sea específicamente de DNS.

## QA

El detalle final de pruebas, defectos corregidos, excepciones de assets, lazy loading, SEO, rutas y performance está en `PHASE3-LAUNCH-READINESS.md`.
