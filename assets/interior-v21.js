(() => {
  const tabs = [...document.querySelectorAll('[data-filter]')];
  const baseButtons = [...document.querySelectorAll('[data-base-filter]')];
  const cards = [...document.querySelectorAll('.int-product-card')];
  const count = document.querySelector('[data-result-count]');
  if (!cards.length) return;
  let category = 'all';
  let base = '';
  function render() {
    let n = 0;
    cards.forEach(card => {
      const showCategory = category === 'all' || card.dataset.category === category;
      const showBase = !base || card.dataset.base === base;
      card.hidden = !(showCategory && showBase);
      if (!card.hidden) n++;
    });
    if (count) count.textContent = n;
  }
  tabs.forEach(btn => btn.addEventListener('click', () => {
    category = btn.dataset.filter;
    tabs.forEach(x => x.classList.toggle('is-active', x === btn));
    render();
  }));
  baseButtons.forEach(btn => btn.addEventListener('click', () => {
    const next = btn.dataset.baseFilter;
    base = base === next ? '' : next;
    baseButtons.forEach(x => x.classList.toggle('is-active', x.dataset.baseFilter === base));
    render();
  }));
})();
