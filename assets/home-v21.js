(()=>{
  const button=document.querySelector('.v21-menu-button');
  const nav=document.querySelector('#v21-main-nav');
  if(!button||!nav)return;
  const close=()=>{nav.classList.remove('is-open');button.setAttribute('aria-expanded','false');button.innerHTML='Menú <span>☰</span>';};
  button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';nav.classList.toggle('is-open',open);button.setAttribute('aria-expanded',String(open));button.innerHTML=open?'Cerrar <span>×</span>':'Menú <span>☰</span>';});
  nav.addEventListener('click',e=>{if(e.target.closest('a'))close();});
  nav.addEventListener('keydown',e=>{if(e.key==='Escape'){close();button.focus();}});
})();
