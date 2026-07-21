const grid = document.querySelector('#products-grid');
const modal = document.querySelector('#call-modal');
const visibleInitially = 9;

function fallbackMarkup(name) {
  return `<div class="product-fallback"><span>CRAZY CART</span><b>${name}</b><small>أضف صورة المنتج</small></div>`;
}

siteData.products.forEach((product, index) => {
  const card = document.createElement('article');
  card.className = `product-card${index >= visibleInitially ? ' extra-product' : ''}`;
  card.innerHTML = `<div class="product-image"><img src="assets/images/products/${product.image}" alt="${product.name}" loading="lazy"><span class="price">${product.price} <small>${siteData.currency}</small></span></div><div class="product-copy"><span class="product-no">${String(product.id).padStart(2,'0')}</span><h3>${product.name}</h3><p>${product.description}</p><button class="order-button call-trigger">اطلب بالاتصال <span>←</span></button></div>`;
  const img = card.querySelector('img');
  img.addEventListener('error', () => { img.replaceWith(Object.assign(document.createElement('div'), { innerHTML: fallbackMarkup(product.name), className: 'fallback-wrap' })); }, { once: true });
  grid.append(card);
});

function branchContent(branch, compact = false) {
  return `<article class="branch-card"><span class="branch-pin">⌖</span><div><h3>${branch.name}</h3><p>${branch.address}</p><a href="tel:${branch.phone}" aria-label="اتصل بـ ${branch.name}">${compact ? 'اتصل الآن' : branch.displayPhone} <b>☎</b></a></div></article>`;
}
document.querySelector('#branch-grid').innerHTML = siteData.branches.map(b => branchContent(b)).join('');
document.querySelector('#modal-branches').innerHTML = siteData.branches.map(b => branchContent(b, true)).join('');

document.querySelector('#show-more').addEventListener('click', e => {
  const open = e.currentTarget.getAttribute('aria-expanded') === 'true';
  document.body.classList.toggle('menu-expanded', !open);
  e.currentTarget.setAttribute('aria-expanded', String(!open));
  e.currentTarget.innerHTML = open ? 'عرض باقي المنيو <span>↓</span>' : 'عرض أقل <span>↑</span>';
});

let lastFocus;
function openModal() { lastFocus = document.activeElement; modal.hidden = false; document.body.classList.add('modal-open'); setTimeout(() => modal.querySelector('.modal-close').focus(), 0); }
function closeModal() { modal.hidden = true; document.body.classList.remove('modal-open'); lastFocus?.focus(); }
document.addEventListener('click', e => { if (e.target.closest('.call-trigger')) openModal(); if (e.target.closest('[data-close]')) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

const toggle = document.querySelector('.menu-toggle');
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); document.querySelector('#main-nav').classList.toggle('open', !open); });
document.querySelectorAll('#main-nav a').forEach(a => a.addEventListener('click', () => { toggle.setAttribute('aria-expanded','false'); document.querySelector('#main-nav').classList.remove('open'); }));
window.addEventListener('scroll', () => document.querySelector('.site-header').classList.toggle('scrolled', scrollY > 40), { passive: true });
