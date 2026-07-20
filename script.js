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
  document.querySelectorAll('[data-phone]').forEach(n => n.textContent = SITE_DATA.restaurant.phoneDisplay);
  document.querySelectorAll('[data-address]').forEach(n => n.textContent = SITE_DATA.restaurant.address);
  document.querySelectorAll('[data-hours]').forEach(n => n.textContent = SITE_DATA.restaurant.hoursValue);
  document.querySelectorAll('[data-year]').forEach(n => n.textContent = new Date().getFullYear());

  const wa = `https://wa.me/${SITE_DATA.restaurant.whatsappNumber}`;
  document.querySelectorAll('[data-whatsapp-link]').forEach(n => n.href = wa);
  document.querySelectorAll('[data-call-link]').forEach(n => n.href = `tel:${SITE_DATA.restaurant.whatsappNumber}`);

  const mapFrame = document.getElementById('map-frame');
  if(mapFrame) mapFrame.src = SITE_DATA.restaurant.mapEmbed;

  const fb = document.getElementById('social-facebook');
  const ig = document.getElementById('social-instagram');
  const tk = document.getElementById('social-tiktok');
  if(fb) fb.href = SITE_DATA.restaurant.social.facebook;
  if(ig) ig.href = SITE_DATA.restaurant.social.instagram;
  if(tk) tk.href = SITE_DATA.restaurant.social.tiktok;
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

  SITE_DATA.menuCategories.forEach(cat => {
    const section = el('div','menu-cat-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6');
    section.dataset.catPanel = cat.id;
    cat.items.forEach(item => {
      const card = el('div','ticket reveal', `
        <div class="ticket-strip"><span>كريزي كارت</span><span>#${cat.icon}</span></div>
        <div class="p-5">
          <h4 class="display text-lg mb-1">${item.name}</h4>
          ${item.desc ? `<p class="text-sm text-gray-500 mb-3">${item.desc}</p>` : '<div class="mb-3"></div>'}
          <div class="flex items-center justify-between">
            <span class="ticket-price text-lg">${formatPrice(item.price)}</span>
            <a href="https://wa.me/${SITE_DATA.restaurant.whatsappNumber}?text=${encodeURIComponent('أريد طلب: ' + item.name)}"
               target="_blank" rel="noopener"
               class="bg-black text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-[--red] transition">اطلب الآن</a>
          </div>
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
  renderFeatures();
  renderMenu();
  renderOffers();
  renderTestimonials();
  setupNav();
  observeReveals();
});
