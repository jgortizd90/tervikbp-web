import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'data/catalog.phase2a.json'), 'utf8'));
const products = data.products;
const bySlug = new Map(products.map(p => [p.slug, p]));

const esc = (s='') => String(s).replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

function shellStart({title, description, canonical, active='Productos'}) {
  return `<!doctype html>
<html lang="es-MX">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index, follow">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_MX">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="https://www.tervikbp.com/og.png">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="/images/tervik-logo-approved-candidate.png">
  <link rel="stylesheet" href="/assets/site.css">
  <link rel="stylesheet" href="/assets/home-v21.css">
  <link rel="stylesheet" href="/assets/interior-v21.css">
</head>
<body class="v21-home v21-interior">
<a class="skip-link" href="#contenido">Ir al contenido</a>
<div class="v21-topbar"><div class="v21-shell v21-topbar-inner"><span>TERVIK · SOLUCIONES PARA CONSTRUCCIÓN Y PROTECCIÓN</span><div><a href="mailto:contacto@tervikbp.com">contacto@tervikbp.com</a><a href="tel:+526866066587">+52 686 606 6587</a></div></div></div>
<header class="v21-header" data-header><div class="v21-shell v21-navrow">
  <a class="v21-logo" href="/" aria-label="TERVIK, inicio"><img src="/images/tervik-logo-approved-candidate.png" alt="TERVIK" width="1600" height="800"></a>
  <button class="v21-menu-button" type="button" aria-expanded="false" aria-controls="v21-main-nav">Menú <span>☰</span></button>
  <nav id="v21-main-nav" class="v21-nav" aria-label="Navegación principal">
    <a ${active==='Productos'?'class="active" ':''}href="/impermeabilizantes/">Productos</a>
    <a href="/#aplicaciones">Aplicaciones</a><a href="/#fabricacion">Fabricación</a><a href="/downloads/catalogo-tervik-2026.pdf">Distribuidores</a><a href="/downloads/catalogo-tervik-2026.pdf">Recursos</a><a href="/#contacto">Contacto</a>
  </nav>
  <a class="v21-cta v21-header-cta" href="mailto:contacto@tervikbp.com?subject=Solicitud%20de%20cotizaci%C3%B3n">Solicita cotización <span aria-hidden="true">↗</span></a>
</div></header>`;
}

function footer() {
 return `<footer class="v21-footer">
  <div class="v21-shell v21-footer-grid">
    <div><a class="v21-logo v21-footer-logo" href="/"><img src="/images/tervik-logo-approved-candidate.png" alt="TERVIK" width="1600" height="800"></a><p>Sistemas de protección para lo que se construye.</p></div>
    <div><b>LÍNEAS</b><a href="/impermeabilizantes/">Impermeabilizantes</a><a href="/arquitectonico/">Arquitectónico</a><a href="/esmaltes/">Esmaltes</a><a href="/maderas/">Maderas</a><a href="/aerosoles/">Aerosoles</a><a href="/ferreteria/">Ferretería</a></div>
    <div><b>EXPLORA</b><a href="/#aplicaciones">Aplicaciones</a><a href="/#fabricacion">Fabricación</a><a href="/downloads/catalogo-tervik-2026.pdf">Recursos</a><a href="/#contacto">Contacto</a></div>
    <div><b>CONTACTO</b><a href="mailto:contacto@tervikbp.com">contacto@tervikbp.com</a><a href="tel:+526866066587">+52 686 606 6587</a><span>Ciudad de México</span></div>
  </div>
  <div class="v21-shell v21-footer-bottom"><span>© 2026 TERVIK</span><span>México</span></div>
</footer>
<script src="/assets/home-v21.js" defer></script>
<script src="/assets/interior-v21.js" defer></script>
</body></html>`;
}

function productCard(p) {
 const meta = [p.base ? `Base ${p.base.toLowerCase()}` : p.category, p.presentations.join(' · ')];
 return `<a class="int-product-card" href="${p.path}" data-category="${esc(p.category)}" data-base="${esc(p.base || '')}">
   <div class="int-product-image"><span class="int-role ${p.role.toLowerCase().replace(/\s+/g,'-')}">${esc(p.role)}</span><img src="${p.image}" alt="${esc(p.name)} TERVIK" loading="lazy"></div>
   <div class="int-product-copy"><h2>${esc(p.name)}</h2><p>${p.traits.map(esc).join(' · ')}</p><div class="int-product-meta"><span>${esc(meta[0])}</span><span>${esc(meta[1])}</span><b>Ver →</b></div></div>
 </a>`;
}

function categoryPage() {
 const line = data.line;
 const heroA = bySlug.get('emulsion-fibratada');
 const heroB = bySlug.get('impermeabilizante-acrilico-10-anos');
 return `${shellStart({title:'Impermeabilizantes | TERVIK',description:'Impermeabilizantes TERVIK: acrílicos, asfálticos y rollos asfálticos.',canonical:'https://www.tervikbp.com/impermeabilizantes/'})}
<main id="contenido">
  <section class="int-category-hero">
    <div class="v21-shell int-breadcrumbs"><a href="/">Inicio</a><span>/</span><span>Productos</span><span>/</span><strong>Impermeabilizantes</strong></div>
    <div class="v21-shell int-category-hero-grid">
      <div class="int-category-copy"><span class="v21-rule"></span><h1>IMPERMEABI<br>LIZANTES</h1><h2>${esc(line.tagline)}</h2><p>${esc(line.description)}</p><div class="int-category-stats"><div><strong>13</strong><span>productos y grupos</span></div><div><strong>3</strong><span>subcategorías</span></div><div><strong>4 L / 19 L</strong><span>presentaciones líquidas</span></div></div></div>
      <div class="int-category-products" aria-hidden="true"><div class="hero-small"><img src="${heroA.image}" alt=""></div><div class="hero-large"><img src="${heroB.image}" alt=""></div></div>
    </div>
    <div class="int-filterbar"><div class="v21-shell int-filterbar-inner">
      <div class="int-tabs" role="group" aria-label="Filtrar por subcategoría"><button class="is-active" type="button" data-filter="all">Todos <small>13</small></button><button type="button" data-filter="Acrílicos">Acrílicos <small>5</small></button><button type="button" data-filter="Asfálticos">Asfálticos <small>4</small></button><button type="button" data-filter="Rollos asfálticos">Rollos asfálticos <small>4</small></button></div>
      <div class="int-filter-actions"><button type="button" data-base-filter="Agua">Base agua</button><button type="button" data-base-filter="Solvente">Base solvente</button></div>
    </div></div>
  </section>
  <section class="int-product-list v21-shell" aria-labelledby="product-grid-title">
    <div class="int-list-head"><p id="product-grid-title"><span data-result-count>13</span> resultados</p><span>${esc(line.presentationLine)}</span></div>
    <div class="int-product-grid">${products.map(productCard).join('')}</div>
  </section>
  <section class="int-line-cta"><div class="v21-shell"><div><span class="v21-rule"></span><h2>¿Necesitas disponibilidad o apoyo comercial?</h2><p>Consulta presentaciones y disponibilidad con el equipo TERVIK.</p></div><a class="v21-cta" href="mailto:contacto@tervikbp.com?subject=Consulta%20Impermeabilizantes%20TERVIK">Contactar ventas <span>↗</span></a></div></section>
</main>${footer()}`;
}

function specRow(label, value) {
 return `<div class="int-spec-row"><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`;
}

function productPage() {
 const p = bySlug.get('impermeabilizante-acrilico-10-anos');
 const complements = ['sellador-elastomerico','cemento-plastico','emulsion-fibratada'].map(s=>bySlug.get(s));
 const related = ['impermeabilizante-acrilico-4-anos','impermeabilizante-acrilico-6-anos'].map(s=>bySlug.get(s));
 return `${shellStart({title:`${p.name} | TERVIK`,description:`${p.name} TERVIK. ${p.traits.join(', ')}. Presentación 19 L; colores blanco y terracota.`,canonical:`https://www.tervikbp.com${p.path}`})}
<main id="contenido">
  <div class="v21-shell int-breadcrumbs int-product-breadcrumbs"><a href="/">Inicio</a><span>/</span><a href="/impermeabilizantes/">Impermeabilizantes</a><span>/</span><span>Acrílicos</span><span>/</span><strong>${esc(p.name)}</strong></div>
  <section class="int-product-hero">
    <div class="v21-shell int-product-hero-grid">
      <div class="int-detail-visual"><span class="int-role impermeabiliza">IMPERMEABILIZA</span><div class="int-detail-image"><img src="${p.image}" alt="Cubeta ${esc(p.name)} TERVIK, 19 L" fetchpriority="high"></div><p>Imagen de referencia · envase mostrado: 19 L.</p></div>
      <div class="int-detail-copy"><p class="int-overline">IMPERMEABILIZANTES · ACRÍLICOS</p><h1>${esc(p.name)}</h1><span class="v21-rule"></span><p class="int-traits">${p.traits.map(esc).join(' · ')}</p><p class="int-description">${esc(p.description)}</p>
        <ul class="int-keyfacts"><li>Acrílico</li><li>Elastomérico</li><li>Fibratado</li><li>Base agua</li></ul>
        <div class="int-options"><div><span>Presentación</span><b>19 L</b></div><div><span>Color</span><div class="int-color-options"><b>Blanco</b><b><i class="terracota"></i>Terracota</b></div></div></div>
        <div class="int-detail-actions"><a class="v21-cta" href="mailto:contacto@tervikbp.com?subject=Consulta%3A%20Impermeabilizante%20acr%C3%ADlico%2010%20a%C3%B1os%20%C2%B7%2019%20L">Consultar disponibilidad <span>↗</span></a><a class="v21-text-link" href="/downloads/catalogo-tervik-2026.pdf">Catálogo 2026 <span>↓</span></a></div>
        <p class="int-source-note">Consulta la ficha técnica vigente para preparación, aplicación y rendimiento antes de especificar o aplicar.</p>
      </div>
    </div>
  </section>
  <section class="int-technical" id="especificacion"><div class="v21-shell int-technical-grid">
    <div class="int-specs"><span class="v21-rule"></span><h2>Especificación</h2><dl>${specRow('Tipo','Impermeabilizante acrílico elastomérico fibratado')}${specRow('Subcategoría','Acrílicos')}${specRow('Base','Agua')}${specRow('Presentación','Cubeta 19 L')}${specRow('Colores','Blanco · Terracota')}</dl>
      <div class="int-related-functional"><h2>Productos relacionados de la línea</h2><p>Productos del catálogo dentro de preparación, resane e impermeabilización.</p><div class="int-functional-grid">${[bySlug.get('sellador-elastomerico'),bySlug.get('cemento-plastico'),p,bySlug.get('tapagoteras'),bySlug.get('brea-en-frio')].map(x=>`<a href="${x.path}"><img src="${x.image}" alt="" loading="lazy"><div><span>${esc(x.role)}</span><strong>${esc(x.name.replace('Impermeabilizante acrílico ','Acrílico '))}</strong><small>${esc(x.presentations.join(' · '))}${x.base?` · base ${x.base.toLowerCase()}`:''}</small></div></a>`).join('')}</div></div>
    </div>
    <aside class="int-tech-aside"><div class="int-download-box"><span>RECURSOS</span><h3>Documentación disponible</h3><a href="/downloads/catalogo-tervik-2026.pdf">Catálogo 2026 <b>↓</b></a><p>La ficha técnica específica no está incluida en el repositorio actual.</p></div><div class="int-complements"><span>COMPLEMENTARIOS</span>${complements.map(x=>`<a href="${x.path}"><img src="${x.image}" alt=""><div><strong>${esc(x.name)}</strong><small>${esc(x.presentations.join(' · '))} · ${esc(x.role.toUpperCase())}</small></div></a>`).join('')}</div></aside>
  </div></section>
  <section class="int-backline"><div class="v21-shell"><div><span class="v21-rule"></span><h2>Continúa en Impermeabilizantes</h2><p>Consulta acrílicos, asfálticos y rollos asfálticos.</p></div><a class="v21-cta v21-cta-navy" href="/impermeabilizantes/">Volver a la línea <span>↗</span></a></div></section>
</main>${footer()}`;
}

const outputs = [
  [path.join(root,'impermeabilizantes','index.html'), categoryPage()],
  [path.join(root,'impermeabilizantes','impermeabilizante-acrilico-10-anos','index.html'), productPage()]
];
for (const [file, html] of outputs) {
  fs.mkdirSync(path.dirname(file), {recursive:true});
  fs.writeFileSync(file, html);
  console.log('wrote', path.relative(root,file));
}
