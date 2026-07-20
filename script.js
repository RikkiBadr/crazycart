// ============================================================
// script.js — يقرأ كل شيء من data.js ويبني الصفحة، ويشغّل الحركات
// ============================================================

function formatPrice(n){
  return n.toLocaleString('ar-SY') + " ل.س";
}

function el(tag, className, html){
  const e = document.createElement(tag);
  if(className) e.className = className;
  if(html !== undefined) e.innerHTML = html;
  return e;
}

// ---------- Header / Contact info ----------
function renderBasics(){
  document.querySelectorAll('[data-restaurant-name]').forEach(n => n.textContent = SITE_DATA.restaurant.nameAr);
  document.querySelectorAll('[data-tagline]').forEach(n => n.textContent = SITE_DATA.restaurant.tagline);
  document.querySelectorAll('[data-hero-desc]').forEach(n => n.textContent = SITE_DATA.restaurant.heroDesc);
  document.querySelectorAll('[data-about-text]').forEach(n => n.textContent = SITE_DATA.restaurant.aboutText);
  document.querySelectorAll('[data-hours]').forEach(n => n.textContent = SITE_DATA.restaurant.hoursValue);
  document.querySelectorAll('[data-year]').forEach(n => n.textContent = new Date().getFullYear());
  document.querySelectorAll('[data-hero-badge]').forEach(n => n.textContent = SITE_DATA.restaurant.heroBadge);
  document.querySelectorAll('[data-delivery-badge]').forEach(n => n.textContent = SITE_DATA.restaurant.deliveryBadge);
  document.querySelectorAll('[data-rating]').forEach(n => n.textContent = SITE_DATA.restaurant.stats.rating);
  document.querySelectorAll('[data-rating-out-of]').forEach(n => n.textContent = SITE_DATA.restaurant.stats.ratingOutOf);
  document.querySelectorAll('[data-orders-delivered]').forEach(n => n.textContent = SITE_DATA.restaurant.stats.ordersDelivered);

  document.querySelectorAll('[data-call-link], [data-whatsapp-link]').forEach(n => {
    n.href = `tel:${SITE_DATA.restaurant.mainPhone}`;
    n.removeAttribute('target');
  });

  const mapFrame = document.getElementById('map-frame');
  if(mapFrame) mapFrame.src = SITE_DATA.restaurant.mapEmbed;

  const fb = document.getElementById('social-facebook');
  const ig = document.getElementById('social-instagram');
  const tk = document.getElementById('social-tiktok');
  if(fb) fb.href = SITE_DATA.restaurant.social.facebook;
  if(ig) ig.href = SITE_DATA.restaurant.social.instagram;
  if(tk) tk.href = SITE_DATA.restaurant.social.tiktok;

  // best-seller floating card on the hero image (uses first menu item)
  const bsCard = document.getElementById('bestseller-card');
  if(bsCard && SITE_DATA.menuCategories[0]?.items[0]){
    const top = SITE_DATA.menuCategories[0].items[0];
    bsCard.innerHTML = `
      <p class="text-xs text-[color:var(--gold)]" style="color:#D4A017;">الأكثر طلباً</p>
      <p class="display text-base">${top.name}</p>
      <p class="display text-sm" style="color:#C41E2A;">${formatPrice(top.price)}</p>
    `;
  }
}

// ---------- Branches ----------
function renderBranches(){
  const wrap = document.getElementById('branches-list');
  if(!wrap) return;
  SITE_DATA.restaurant.branches.forEach(b => {
    const card = el('div','branch-card reveal', `
      <p class="display text-base mb-1">📍 فرع ${b.area}</p>
      <p class="text-sm text-gray-400 mb-1">${b.address}</p>
      <a href="tel:${b.phone}" class="text-sm" style="color:#D4A017;">${b.phone}</a>
    `);
    wrap.appendChild(card);
  });
}

// ---------- Features ----------
function renderFeatures(){
  const wrap = document.getElementById('features-grid');
  if(!wrap) return;
  SITE_DATA.features.forEach(f => {
    const card = el('div','feature-card reveal', `
      <span class="feature-icon">${f.icon}</span>
      <p class="display text-base">${f.title}</p>
    `);
    wrap.appendChild(card);
  });
}

// ---------- Menu ----------
function renderMenu(){
  const tabsWrap = document.getElementById('menu-tabs');
  const gridWrap = document.getElementById('menu-grid');
  if(!tabsWrap || !gridWrap) return;

  SITE_DATA.menuCategories.forEach((cat, i) => {
    const btn = el('button', i===0 ? 'active' : '', `${cat.icon} ${cat.name}`);
    btn.dataset.cat = cat.id;
    btn.addEventListener('click', () => {
      tabsWrap.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      showCategory(cat.id);
    });
    tabsWrap.appendChild(btn);
  });

  SITE_DATA.menuCategories.forEach((cat, catIdx) => {
    const section = el('div','menu-cat-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-7');
    section.dataset.catPanel = cat.id;
    cat.items.forEach((item, i) => {
      const tag = item.tag ? `<span class="menu-tag-badge">${item.tag}</span>` : '';
      const media = item.image
        ? `<img src="images/menu/${item.image}" alt="${item.name}" class="menu-photo-img">`
        : `<span class="menu-photo-emoji">${cat.icon}</span>`;
      const card = el('div','menu-photo-card reveal', `
        <div class="menu-photo-media media-${(catIdx + i) % 3}">
          ${media}
          ${tag}
          <span class="menu-price-badge">${formatPrice(item.price)}</span>
        </div>
        <div class="p-5">
          <h4 class="display text-lg mb-1">${item.name}</h4>
          ${item.desc ? `<p class="text-sm text-gray-500 mb-4">${item.desc}</p>` : '<div class="mb-4"></div>'}
          <a href="tel:${SITE_DATA.restaurant.mainPhone}"
             class="block text-center bg-black text-white text-sm font-bold py-3 rounded-full hover:bg-[--red] transition">اطلب الآن ←</a>
        </div>
      `);
      section.appendChild(card);
    });
    gridWrap.appendChild(section);
  });

  showCategory(SITE_DATA.menuCategories[0].id);
}

function showCategory(id){
  document.querySelectorAll('[data-cat-panel]').forEach(p=>{
    p.style.display = (p.dataset.catPanel === id) ? 'grid' : 'none';
  });
  requestAnimationFrame(observeReveals);
}

// ---------- Gallery ----------
function renderGallery(){
  const wrap = document.getElementById('gallery-grid');
  if(!wrap) return;
  SITE_DATA.gallery.forEach((g, i) => {
    const sizeClass = g.large ? 'col-span-2 row-span-2 h-full min-h-[280px]' : 'h-full min-h-[130px]';
    let inner, bgClass = '';
    if(g.image){
      inner = `<img src="${g.image}" alt="صورة من كريزي كارت">`;
    } else {
      bgClass = (i % 2 === 0) ? 'bg-black' : 'bg-red';
      inner = `<span class="text-4xl">${g.emoji || '🍽️'}</span>`;
    }
    const style = (bgClass === 'bg-red') ? 'style="background:#C41E2A;"' : '';
    const item = el('div', `gallery-item reveal ${sizeClass} ${bgClass} flex items-center justify-center`);
    if(style) item.setAttribute('style','background:#C41E2A;');
    item.innerHTML = inner;
    wrap.appendChild(item);
  });
}

// ---------- Offers ----------
function renderOffers(){
  const wrap = document.getElementById('offers-grid');
  if(!wrap) return;
  SITE_DATA.offers.forEach(o => {
    const card = el('div','offer-card reveal', `
      <span class="offer-badge mb-4">${o.badge}</span>
      <h3 class="display text-xl mt-3 mb-2">${o.title}</h3>
      <p class="text-sm text-gray-300">${o.desc}</p>
    `);
    wrap.appendChild(card);
  });
}

// ---------- Testimonials ----------
function renderTestimonials(){
  const wrap = document.getElementById('testimonials-track');
  if(!wrap) return;
  SITE_DATA.testimonials.forEach(t => {
    const card = el('div','testi-card reveal', `
      <div class="stars mb-3">★★★★★</div>
      <p class="mb-4 text-[15px]">${t.text}</p>
      <p class="text-sm text-gray-500 font-bold">${t.name}</p>
    `);
    wrap.appendChild(card);
  });
}

// ---------- Scroll reveal ----------
let observer;
function observeReveals(){
  if(!observer){
    observer = new IntersectionObserver((entries)=>{
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
    }, {threshold:.15});
  }
  document.querySelectorAll('.reveal:not(.in)').forEach(r => observer.observe(r));
}

// ---------- Nav ----------
function setupNav(){
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', ()=>{
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  const toggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if(toggle && mobileMenu){
    toggle.addEventListener('click', ()=> mobileMenu.classList.toggle('hidden'));
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=> mobileMenu.classList.add('hidden')));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderBasics();
  renderBranches();
  renderFeatures();
  renderMenu();
  renderGallery();
  renderOffers();
  renderTestimonials();
  setupNav();
  observeReveals();
});
