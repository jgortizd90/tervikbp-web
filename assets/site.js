(()=>{
'use strict';
const data=JSON.parse(document.getElementById('tervik-data').textContent);
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const path=location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/';
const line=path.split('/')[1], record=data.records.find(p=>p.path===path)||(path==='/impermeabilizantes/impermeabilizante-asfaltico'?data.records.find(p=>p.slug==='emulsion-fibratada'):null);
const mail=subject=>'mailto:contacto@tervikbp.com?subject='+encodeURIComponent(subject);
const menu=$('#main-menu'), toggle=$('.menu-toggle');
const close=()=>{menu.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.textContent='Productos ☰';};
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';menu.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Cerrar ×':'Productos ☰';});
menu?.addEventListener('keydown',e=>{if(e.key==='Escape'){close();toggle.focus();}});
$$('a',menu).forEach(a=>a.addEventListener('click',close));
let active=0;
const slides=$$('.line-slide'), selectors=$$('.slide-selectors button');
function selectLine(i){
 active=(i+6)%6;
 slides.forEach((s,j)=>{s.hidden=j!==active;s.inert=j!==active;s.setAttribute('aria-hidden',String(j!==active));});
 selectors.forEach((b,j)=>b.setAttribute('aria-pressed',String(j===active)));
 $('.line-showcase')?.style.setProperty('--family-color',data.lineColors[data.productLines[active].slug]);
 const live=$('.line-showcase .sr-only');if(live)live.textContent=`Línea ${active+1} de 6: ${data.productLines[active].name}`;
 updateNav();
}
function updateNav(){
 const slug=path==='/'?data.productLines[active].slug:line;
 $$('#main-menu a').forEach(a=>{const on=location.hash==='#nosotros'?a.classList.contains('about-nav'):a.hash==='#linea-'+slug;a.classList.toggle('selected-line',on);if(on)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});
}
function syncHash(){if(slides.length){const hash=location.hash==='#linea-vinilicas'?'#linea-arquitectonico':location.hash;const i=data.productLines.findIndex(l=>'#linea-'+l.slug===hash);if(i>=0)selectLine(i);else updateNav();}else updateNav();}
function navigateSlide(i){selectLine(i);history.replaceState(null,'','#linea-'+data.productLines[active].slug);syncHash();}
selectors.forEach((b,i)=>{b.addEventListener('click',()=>navigateSlide(i));b.addEventListener('keydown',e=>{const n=e.key==='ArrowRight'?i+1:e.key==='ArrowLeft'?i-1:e.key==='Home'?0:e.key==='End'?5:null;if(n!==null){e.preventDefault();navigateSlide(n);selectors[active].focus();}});});
$$('.slide-arrows button').forEach((b,i)=>b.addEventListener('click',()=>navigateSlide(active+(i===0?-1:1))));
if(slides.length){$$('#main-menu a').forEach(a=>a.addEventListener('click',e=>{if(a.hash.startsWith('#linea-')){e.preventDefault();history.pushState(null,'',a.hash);syncHash();$('#productos').scrollIntoView({block:'start'});}}));let touch;$('.slides-stage').addEventListener('touchstart',e=>touch={x:e.touches[0].clientX,y:e.touches[0].clientY},{passive:true});$('.slides-stage').addEventListener('touchend',e=>{if(!touch)return;const dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.5)navigateSlide(active+(dx<0?1:-1));touch=null;},{passive:true});}
window.addEventListener('hashchange',syncHash);syncHash();
const tabs=$$('.category-tabs button'), cards=$$('.catalog-section .product-card'), search=$('input[type="search"]'), base=$('.catalog-filterline select');
if(tabs.length){
 const categories={impermeabilizantes:['todos','acrilicos','asfalticos','rollos-asfalticos'],arquitectonico:['todos','pinturas','selladores'],esmaltes:['todos','esmaltes','primer'],maderas:['todos','barnices','preparacion']};
 const values=categories[line]||tabs.map(b=>norm(b.childNodes[0].textContent.trim()));
 const hardwareValues=tabs.map(b=>b.childNodes[0].textContent.trim().toLowerCase());if(line==='ferreteria')values.splice(0,values.length,...hardwareValues);
 const p=new URLSearchParams(location.search);let category=values.includes(p.get('categoria'))?p.get('categoria'):values[0];
 if(search)search.value=p.get('q')||'';if(base)base.value=['Base agua','Base solvente'].includes(p.get('base'))?p.get('base'):'todas';
 const status=$('.catalog-filterline p'), grid=$('.catalog-section .product-grid');
 const empty=document.createElement('div');empty.className='empty-state';empty.hidden=true;empty.innerHTML='<h2>No encontramos ese producto.</h2><p>Prueba otro nombre o restablece los filtros.</p><button class="button" type="button">Ver todos los productos ↗</button>';grid.after(empty);
 const categoryFor=p=>line==='impermeabilizantes'?({'Acrílicos':'acrilicos','Asfálticos':'asfalticos','Rollos Asfálticos':'rollos-asfalticos'}[p.category]):line==='ferreteria'?p.category.toLowerCase():norm(p.category);
 function filter(){let count=0;cards.forEach(card=>{const item=data.records.find(p=>p.path===new URL(card.href).pathname.replace(/\/$/,''));const visible=item&&(category===values[0]||categoryFor(item)===category)&&(!base||base.value==='todas'||item.base===base.value)&&norm([item.name,item.role,...item.traits,...(item.variants||[])].join(' ')).includes(norm(search?.value||''));card.hidden=!visible;if(visible)count++;});tabs.forEach((b,i)=>b.setAttribute('aria-pressed',String(values[i]===category)));if(status){status.childNodes[0].textContent=line==='impermeabilizantes'?`${count} ${count===1?'resultado':'resultados'} `:`${count} ${count===1?'producto':'productos'}`;}grid.hidden=count===0;empty.hidden=count!==0;if(base)base.closest('label').hidden=category==='rollos-asfalticos';}
 function update(push=false){const p=new URLSearchParams();if(category!==values[0])p.set('categoria',category);if(base&&base.value!=='todas')p.set('base',base.value);if(search?.value)p.set('q',search.value);history[push?'pushState':'replaceState'](null,'',path+'/'+(p.size?'?'+p:''));filter();}
 tabs.forEach((b,i)=>b.addEventListener('click',()=>{category=values[i];if(base)base.value='todas';update(true);}));search?.addEventListener('input',()=>update());base?.addEventListener('change',()=>update(true));$('button',empty).addEventListener('click',()=>{category=values[0];if(search)search.value='';if(base)base.value='todas';update(true);});
 window.addEventListener('popstate',()=>{const p=new URLSearchParams(location.search);category=values.includes(p.get('categoria'))?p.get('categoria'):values[0];if(search)search.value=p.get('q')||'';if(base)base.value=p.get('base')||'todas';filter();});filter();
}
if(record){
 const options=$('.product-options, .enamel-options, .aerosol-options, .wood-options');
 if(options){
 const link=$('a.button',options), selection=$('.enamel-selection, .aerosol-selection, .wood-selection',options);
 function update(){
  const chosen=$$('fieldset',options).map(f=>$('button[aria-pressed="true"]',f));
  const names=chosen.map(b=>b?.textContent.trim()).filter(Boolean), variant=$('select',options)?.value;
  if(selection){const tone=chosen.find(b=>$('i',b));if(tone&&$('i',selection))$('i',selection).style.background=$('i',tone).style.background;const text=names.join(' · ');$('b',selection).textContent=line==='arquitectonico'?text+' Mate':line==='maderas'?[record.tones.length?names.at(-1):null,record.finishes.length>1?names[0]:record.finishes[0],'4 L'].filter(Boolean).join(' · '):text;}
  const value=selection?$('b',selection).textContent:names.join(' · ');
  const size=line==='arquitectonico'?'19 L':line==='aerosoles'?'400 ml':line==='esmaltes'?'4 L':'';
  link.href=mail('Consulta: '+(line==='aerosoles'?'Aerosol TERVIK · ':'')+record.name+' · '+[value,size,variant].filter(Boolean).join(' · '));
 }
 $$('fieldset button',options).forEach(b=>b.addEventListener('click',()=>{$$('button',b.closest('fieldset')).forEach(x=>x.setAttribute('aria-pressed',String(x===b)));update();}));$('select',options)?.addEventListener('change',update);
 }
}
window.addEventListener('popstate',syncHash);
})();
