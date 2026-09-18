# TERVIK — Exportación estática completa

Dominio previsto: https://www.tervikbp.com
Fecha: 18 de septiembre de 2026.

Contenido: inicio, seis catálogos por línea, 47 fichas de productos/grupos, una ruta histórica compatible y página 404. Cada ruta tiene su propio index.html. Incluye imágenes, fuentes locales, estilos, JavaScript de navegador y catálogo PDF completo y ligero.

## Publicar en GitHub Pages

1. Descomprime este ZIP y sube **su contenido**, incluidos `index.html`, `CNAME` y `.nojekyll`, a la raíz del repositorio. No subas la carpeta contenedora ni necesitas instalar dependencias.
2. En Settings → Pages selecciona Deploy from a branch, la rama con estos archivos y `/ (root)`.
3. En Custom domain escribe `www.tervikbp.com` y guarda.
4. En el proveedor DNS configura un registro CNAME para `www` apuntando a `<usuario-o-organizacion>.github.io` (el propietario real del repositorio), sin el nombre del repositorio. No se conoce todavía esa cuenta de GitHub; debe completarla sistemas.
5. Cuando GitHub termine de verificar el DNS y emitir el certificado, activa Enforce HTTPS.

No hay paso de build ni proceso de servidor. Las rutas y archivos usan la raíz del dominio; esta entrega está prevista para el dominio personalizado, no para un subdirectorio `/nombre-repositorio/`. Para probar localmente, sirve la carpeta con cualquier servidor estático; abrir el HTML con file:// no interpreta esas rutas desde la raíz.

El CNAME incluido prepara el dominio; no modifica por sí solo el DNS ni las opciones del repositorio. Esta entrega no ha sido publicada en GitHub y no cambia el sitio actualmente alojado.

## Comportamiento conservado

Navegación, menú móvil, cambio de línea por botones/teclado/deslizamiento, filtros de categoría y base, búsqueda, colores, acabados, presentaciones y consultas por correo. Las consultas abren el cliente de correo del visitante; no requieren backend. Todos los recursos visuales y descargas son locales. Los únicos destinos externos previstos son correo y teléfono comerciales.

Los nombres de las tres pinturas arquitectónicas son Pintura Acrílica y sus atributos indican 100% acrílica. Se conservan dos slugs históricos `pintura-vinilica-*` para mantener la compatibilidad de enlaces; las fichas muestran el contenido acrílico aprobado. Ferretería contiene 17 productos, incluido Gas Fénix con foto; el silicón en emulsión retirado no está incluido.

## Documentación oficial

- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Verificación de esta entrega

- 55 rutas con index.html propio más 404.html; 47 fichas reconciliadas con nombres, atributos, colores e imágenes del contenido aprobado.
- Texto de cada página comparado con la versión compilada actual antes de la adaptación estática.
- Todas las referencias locales HTML/CSS existen; ningún archivo del paquete contiene chatgpt.site.
- Las 55 rutas abrieron en el navegador, con los conteos 13/4/4/4/5/17 y sin errores de consola ni desbordamiento horizontal a 1280 px. Comprobación de las mismas 55 rutas a 390 px sin desbordamiento horizontal.
- Pruebas de navegación de línea, menú móvil, categoría/base/búsqueda y estado vacío; cambio de color arquitectónico con actualización de consulta por correo.
- PDF completo y ligero: 16 páginas por edición. El PDF completo es idéntico byte a byte al catálogo previamente aprobado y revisado visualmente; no fue reeditado.
