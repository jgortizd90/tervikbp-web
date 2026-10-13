import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'data/catalog.phase2b.json'), 'utf8'));
const products = data.products;
const lines = data.lines;
const byLine = new Map(lines.map(l => [l.slug, l]));
const bySlug = new Map(products.map(p => [`${p.line}/${p.slug}`, p]));
const esc = (s='') => String(s).replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const strip = (s='') => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const lineProducts = line => products.filter(p => p.line === line);
const product = (line, slug) => bySlug.get(`${line}/${slug}`);

function shellStart({title, description, canonical, active='Productos', robots='index, follow'}) {
  return `<!doctype html>\n<html lang="es-MX">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>${esc(title)}</title>\n  <meta name="description" content="${esc(description)}">\n  <meta name="robots" content="${esc(robots)}">\n  <meta property="og:type" content="website">\n  <meta property="og:locale" content="es_MX">\n  <meta property="og:title" content="${esc(title)}">\n  <meta property="og:description" content="${esc(description)}">\n  <meta property="og:image" content="https://www.tervikbp.com/og.png">\n  <link rel="canonical" href="${esc(canonical)}">\n  <link rel="icon" href="/images/tervik-logo-approved-candidate.png">\n  <link rel="stylesheet" href="/assets/site.css">\n  <link rel="stylesheet" href="/assets/home-v21.css">\n  <link rel="stylesheet" href="/assets/interior-v21.css">\n</head>\n<body class="v21-home v21-interior">\n<a class="skip-link" href="#contenido">Ir al contenido</a>\n<div class="v21-topbar"><div class="v21-shell v21-topbar-inner"><span>TERVIK · SOLUCIONES PARA CONSTRUCCIÓN Y PROTECCIÓN</span><div><a href="mailto:contacto@tervikbp.com">contacto@tervikbp.com</a><a href="tel:+526866066587">+52 686 606 6587</a></div></div></div>\n<header class="v21-header" data-header><div class="v21-shell v21-navrow">\n  <a class="v21-logo" href="/" aria-label="TERVIK, inicio"><img src="/images/tervik-logo-approved-candidate.png" alt="TERVIK" width="1600" height="800"></a>\n  <button class="v21-menu-button" type="button" aria-expanded="false" aria-controls="v21-main-nav">Menú <span>☰</span></button>\n  <nav id="v21-main-nav" class="v21-nav" aria-label="Navegación principal">\n    <a ${active==='Productos'?'class="active" ':''}href="/impermeabilizantes/">Productos</a>\n    <a href="/#aplicaciones">Aplicaciones</a><a href="/#fabricacion">Fabricación</a><a href="/downloads/catalogo-tervik-2026.pdf">Distribuidores</a><a href="/downloads/catalogo-tervik-2026.pdf">Recursos</a><a href="/#contacto">Contacto</a>\n  </nav>\n  <a class="v21-cta v21-header-cta" href="mailto:contacto@tervikbp.com?subject=Solicitud%20de%20cotizaci%C3%B3n">Solicita cotización <span aria-hidden="true">↗</span></a>\n</div></header>`;
}

function footer() {
 return `<footer class="v21-footer">\n  <div class="v21-shell v21-footer-grid">\n    <div><a class="v21-logo v21-footer-logo" href="/"><img src="/images/tervik-logo-approved-candidate.png" alt="TERVIK" width="1600" height="800"></a><p>Sistemas de protección para lo que se construye.</p></div>\n    <div><b>LÍNEAS</b><a href="/impermeabilizantes/">Impermeabilizantes</a><a href="/arquitectonico/">Arquitectónico</a><a href="/esmaltes/">Esmaltes</a><a href="/maderas/">Maderas</a><a href="/aerosoles/">Aerosoles</a><a href="/ferreteria/">Ferretería</a></div>\n    <div><b>EXPLORA</b><a href="/#aplicaciones">Aplicaciones</a><a href="/#fabricacion">Fabricación</a><a href="/downloads/catalogo-tervik-2026.pdf">Recursos</a><a href="/#contacto">Contacto</a></div>\n    <div><b>CONTACTO</b><a href="mailto:contacto@tervikbp.com">contacto@tervikbp.com</a><a href="tel:+526866066587">+52 686 606 6587</a><span>Ciudad de México</span></div>\n  </div>\n  <div class="v21-shell v21-footer-bottom"><span>© 2026 TERVIK</span><span>México</span></div>\n</footer>\n<script src="/assets/home-v21.js" defer></script>\n<script src="/assets/interior-v21.js" defer></script>\n</body></html>`;
}

function productCard(p) {
 const metaA = p.base ? `Base ${p.base.toLowerCase()}` : p.category;
 const metaB = p.presentations?.length ? p.presentations.join(' · ') : (p.optionsLabel ? `${p.options.length} ${p.optionsLabel.toLowerCase()}` : '');
 return `<a class="int-product-card" href="${p.path}" data-category="${esc(p.category)}" data-base="${esc(p.base || '')}">\n   <div class="int-product-image"><span class="int-role ${strip(p.role)}">${esc(p.role)}</span><img src="${p.image}" alt="${esc(p.name)} TERVIK" loading="lazy"></div>\n   <div class="int-product-copy"><h2>${esc(p.name)}</h2><p>${p.traits.map(esc).join(' · ')}</p><div class="int-product-meta"><span>${esc(metaA)}</span><span>${esc(metaB)}</span><b>Ver →</b></div></div>\n </a>`;
}

function categoryPage(line) {
 const list = lineProducts(line.slug);
 const [heroASlug, heroBSlug] = line.heroProducts;
 const heroA = product(line.slug, heroASlug);
 const heroB = product(line.slug, heroBSlug);
 const filters = line.filters.map(c => `<button type="button" data-filter="${esc(c)}">${esc(c)} <small>${list.filter(p=>p.category===c).length}</small></button>`).join('');
 const secondary = (line.secondaryFilters||[]).map(f => `<button type="button" data-${f.key}-filter="${esc(f.value)}">${esc(f.label)}</button>`).join('');
 return `${shellStart({title:`${line.name} | TERVIK`,description:`${line.name} TERVIK: ${line.description}`,canonical:`https://www.tervikbp.com/${line.slug}/`})}\n<main id="contenido">\n  <section class="int-category-hero int-category-${line.slug}">\n    <div class="v21-shell int-breadcrumbs"><a href="/">Inicio</a><span>/</span><span>Productos</span><span>/</span><strong>${esc(line.name)}</strong></div>\n    <div class="v21-shell int-category-hero-grid">\n      <div class="int-category-copy"><span class="v21-rule"></span><h1>${line.titleHtml}</h1><h2>${esc(line.tagline)}</h2><p>${esc(line.description)}</p><div class="int-category-stats">${line.metrics.map(m=>`<div><strong>${esc(m.value)}</strong><span>${esc(m.label)}</span></div>`).join('')}</div></div>\n      <div class="int-category-products" aria-hidden="true"><div class="hero-small"><img src="${heroA.image}" alt=""></div><div class="hero-large"><img src="${heroB.image}" alt=""></div></div>\n    </div>\n    <div class="int-filterbar"><div class="v21-shell int-filterbar-inner">\n      <div class="int-tabs" role="group" aria-label="Filtrar por subcategoría"><button class="is-active" type="button" data-filter="all">Todos <small>${list.length}</small></button>${filters}</div>\n      ${secondary ? `<div class="int-filter-actions">${secondary}</div>` : ''}\n    </div></div>\n  </section>\n  <section class="int-product-list v21-shell" aria-labelledby="product-grid-title">\n    <div class="int-list-head"><p id="product-grid-title"><span data-result-count>${list.length}</span> resultados</p><span>${esc(line.listNote)}</span></div>\n    <div class="int-product-grid">${list.map(productCard).join('')}</div>\n  </section>\n  <section class="int-line-cta"><div class="v21-shell"><div><span class="v21-rule"></span><h2>¿Necesitas disponibilidad o apoyo comercial?</h2><p>Consulta opciones y disponibilidad con el equipo TERVIK.</p></div><a class="v21-cta" href="mailto:contacto@tervikbp.com?subject=Consulta%20${encodeURIComponent(line.name)}%20TERVIK">Contactar ventas <span>↗</span></a></div></section>\n</main>${footer()}`;
}

function specRow(label, value) { return `<div class="int-spec-row"><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`; }

function optionSummary(p) {
 if (p.colors?.length) {
   if (p.colors.length > 6) return `${p.colors.length} colores de línea`;
   return p.colors.join(' · ');
 }
 if (p.options?.length) {
   if (p.options.length === 1) return p.options[0];
   return p.options.join(' · ');
 }
 return '';
}

function relatedProducts(p) {
 const same = lineProducts(p.line).filter(x => x.slug !== p.slug && x.category === p.category);
 return same.slice(0,5);
}
function complementaryProducts(p) {
 const lp = lineProducts(p.line);
 if (p.line === 'arquitectonico' && p.category === 'Pinturas') return lp.filter(x=>x.slug==='sellador-para-muros');
 if (p.line === 'esmaltes' && p.category === 'Esmaltes') return lp.filter(x=>x.slug==='primer-anticorrosivo');
 if (p.line === 'maderas' && p.category === 'Barnices') return lp.filter(x=>x.slug==='sellador-para-madera');
 if (p.line === 'impermeabilizantes' && p.category === 'Acrílicos' && p.role === 'Impermeabiliza') return lp.filter(x=>['sellador-elastomerico','cemento-plastico'].includes(x.slug));
 if (p.line === 'impermeabilizantes' && p.category === 'Asfálticos' && p.role === 'Impermeabiliza') return lp.filter(x=>x.slug==='sellador-tapaporos');
 return [];
}

function detailOptions(p) {
 const groups=[];
 if (p.presentations?.length) groups.push(`<div><span>Presentación${p.presentations.length>1?'es':''}</span><b>${esc(p.presentations.join(' · '))}</b></div>`);
 const summary=optionSummary(p);
 if (summary) groups.push(`<div><span>${esc(p.colors?.length ? 'Color / opción' : (p.optionsLabel || 'Opciones'))}</span><b>${esc(summary)}</b></div>`);
 return groups.length ? `<div class="int-options ${groups.length===1?'int-options-single':''}">${groups.join('')}</div>` : '';
}

function productPage(p) {
 const line = byLine.get(p.line);
 const related = relatedProducts(p);
 const complements = complementaryProducts(p);
 const keyfacts=[...p.traits];
 if (p.base) keyfacts.push(`Base ${p.base.toLowerCase()}`);
 const specRows=[specRow('Tipo',p.traits.join(' · ')),specRow('Línea',line.name),specRow('Grupo',p.category)];
 if (p.base) specRows.push(specRow('Base',p.base));
 if (p.presentations?.length) specRows.push(specRow('Presentación',p.presentations.join(' · ')));
 const opt=optionSummary(p); if(opt) specRows.push(specRow(p.colors?.length?'Colores / opciones':(p.optionsLabel||'Opciones'),opt));
 const desc = p.description || `${p.traits.join(' · ')}.`;
 const relBlock = related.length ? `<div class="int-related-functional"><h2>Productos relacionados de la línea</h2><p>Otras opciones verificadas dentro de ${esc(p.category.toLowerCase())}.</p><div class="int-functional-grid">${related.map(x=>`<a href="${x.path}"><img src="${x.image}" alt="" loading="lazy"><div><span>${esc(x.role)}</span><strong>${esc(x.name)}</strong><small>${esc(x.presentations?.join(' · ') || x.category)}</small></div></a>`).join('')}</div></div>` : '';
 const compBlock = complements.length ? `<div class="int-complements"><span>COMPLEMENTARIOS</span>${complements.map(x=>`<a href="${x.path}"><img src="${x.image}" alt=""><div><strong>${esc(x.name)}</strong><small>${esc((x.presentations?.join(' · ') || x.category).toUpperCase())} · ${esc(x.role.toUpperCase())}</small></div></a>`).join('')}</div>` : '';
 const aside = `<aside class="int-tech-aside"><div class="int-download-box"><span>RECURSOS</span><h3>Documentación disponible</h3><a href="/downloads/catalogo-tervik-2026.pdf">Catálogo 2026 <b>↓</b></a><p>Consulta documentación técnica vigente antes de especificar o aplicar.</p></div>${compBlock}</aside>`;
 return `${shellStart({title:`${p.name} | TERVIK`,description:`${p.name} TERVIK. ${p.traits.join(', ')}${p.presentations?.length?`. ${p.presentations.join(', ')}`:''}.`,canonical:`https://www.tervikbp.com${p.path}`})}\n<main id="contenido">\n  <div class="v21-shell int-breadcrumbs int-product-breadcrumbs"><a href="/">Inicio</a><span>/</span><a href="/${line.slug}/">${esc(line.name)}</a><span>/</span><span>${esc(p.category)}</span><span>/</span><strong>${esc(p.name)}</strong></div>\n  <section class="int-product-hero">\n    <div class="v21-shell int-product-hero-grid">\n      <div class="int-detail-visual"><span class="int-role ${strip(p.role)}">${esc(p.role)}</span><div class="int-detail-image"><img src="${p.image}" alt="${esc(p.name)} TERVIK" fetchpriority="high"></div><p>Imagen de referencia de producto.</p></div>\n      <div class="int-detail-copy"><p class="int-overline">${esc(line.name.toUpperCase())} · ${esc(p.category.toUpperCase())}</p><h1>${esc(p.name)}</h1><span class="v21-rule"></span><p class="int-traits">${p.traits.map(esc).join(' · ')}</p>${p.description?`<p class="int-description">${esc(p.description)}</p>`:''}\n        <ul class="int-keyfacts">${keyfacts.slice(0,6).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>\n        ${detailOptions(p)}\n        <div class="int-detail-actions"><a class="v21-cta" href="mailto:contacto@tervikbp.com?subject=${encodeURIComponent(`Consulta: ${p.name}`)}">Consultar disponibilidad <span>↗</span></a><a class="v21-text-link" href="/downloads/catalogo-tervik-2026.pdf">Catálogo 2026 <span>↓</span></a></div>\n        <p class="int-source-note">Consulta la ficha técnica vigente para preparación, aplicación y desempeño antes de especificar o aplicar.</p>\n      </div>\n    </div>\n  </section>\n  <section class="int-technical" id="especificacion"><div class="v21-shell int-technical-grid ${complements.length?'':'int-technical-no-complements'}">\n    <div class="int-specs"><span class="v21-rule"></span><h2>Especificación</h2><dl>${specRows.join('')}</dl>${relBlock}</div>\n    ${aside}\n  </div></section>\n  <section class="int-backline"><div class="v21-shell"><div><span class="v21-rule"></span><h2>Continúa en ${esc(line.name)}</h2><p>Consulta el resto de la línea TERVIK.</p></div><a class="v21-cta v21-cta-navy" href="/${line.slug}/">Volver a la línea <span>↗</span></a></div></section>\n</main>${footer()}`;
}

function compatibilityPage(r) {
 const alias = r.kind === 'alias';
 const name = r.name || 'Producto TERVIK';
 const targetLine = r.target.split('/').filter(Boolean)[0] || 'ferreteria';
 const line = byLine.get(targetLine);
 const image = r.image ? `<div class="int-compat-image"><img src="${r.image}" alt="${esc(name)}"></div>` : '';
 return `${shellStart({title:`${name} | TERVIK`,description:`Ruta histórica de ${name} TERVIK. Consulta la línea actual para información vigente.`,canonical:`https://www.tervikbp.com${r.target}`,robots:'noindex, follow'})}\n<meta http-equiv="refresh" content="8;url=${r.target}">\n<main id="contenido"><div class="v21-shell int-breadcrumbs"><a href="/">Inicio</a><span>/</span><a href="/${targetLine}/">${esc(line?.name||'Productos')}</a><span>/</span><strong>${esc(name)}</strong></div>\n<section class="int-compat"><div class="v21-shell int-compat-grid">${image}<div><span class="v21-rule"></span><p class="int-overline">RUTA HISTÓRICA</p><h1>${esc(name)}</h1><p>${alias?'Esta dirección histórica se conserva por compatibilidad. El producto vigente correspondiente es Emulsión Fibratada.':'Esta dirección histórica se conserva para no romper enlaces existentes. Este producto no forma parte del catálogo TERVIK 2026 publicado en este sitio.'}</p><a class="v21-cta" href="${r.target}">${alias?'Ver producto vigente':'Ver línea actual'} <span>↗</span></a></div></div></section></main>${footer()}`;
}

const outputs=[];
for (const line of lines) outputs.push([path.join(root,line.slug,'index.html'),categoryPage(line)]);
for (const p of products) outputs.push([path.join(root,p.path.replace(/^\//,'').replace(/\/$/,''),'index.html'),productPage(p)]);
for (const r of data.legacyRoutes) outputs.push([path.join(root,r.path.replace(/^\//,'').replace(/\/$/,''),'index.html'),compatibilityPage(r)]);

const seen=new Set();
for (const [file, html] of outputs) {
 const rel=path.relative(root,file);
 if(seen.has(rel)) throw new Error(`Duplicate route output: ${rel}`);
 seen.add(rel);
 fs.mkdirSync(path.dirname(file), {recursive:true});
 fs.writeFileSync(file, html);
 console.log('wrote', rel);
}

// Sitemap: homepage + current catalog routes. Compatibility routes intentionally excluded.
const urls=['/',...lines.map(l=>`/${l.slug}/`),...products.map(p=>p.path)];
const sitemap=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url><loc>https://www.tervikbp.com${u}</loc></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(root,'sitemap.xml'),sitemap);
console.log(`generated ${outputs.length} interior routes (${lines.length} categories, ${products.length} current products/groups, ${data.legacyRoutes.length} compatibility routes)`);
