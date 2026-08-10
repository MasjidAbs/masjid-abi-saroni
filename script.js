(() => {
  const config = window.SITE_CONFIG;
  const waUrl = `https://wa.me/${config.whatsappNumber}`;
  const message = encodeURIComponent("Assalamu'alaikum, saya ingin menghubungi Masjid Jami' Abi Sa'roni.");
  document.querySelectorAll('[data-link]').forEach((el) => {
    const key = el.dataset.link;
    const links = { whatsapp: `${waUrl}?text=${message}`, instagram: config.instagram, youtube: config.youtube, maps: config.maps };
    if (links[key]) el.href = links[key];
  });
  document.querySelectorAll('[data-config]').forEach((el) => {
    const value = config[el.dataset.config];
    if (value) el.textContent = value;
  });
  document.querySelectorAll('.brand-logo').forEach((img) => {
    img.src = config.assets.logo;
    img.alt = `Logo ${config.mosqueName}`;
    img.onerror = () => { img.closest('.brand-mark')?.classList.add('logo-missing'); };
  });
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 16), { passive: true });
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.nav-links');
  menuButton?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const slides = config.assets.hero.map((src, index) => {
      const el = document.createElement('div');
      el.className = `hero-slide${index === 0 ? ' active' : ''}`;
      el.style.backgroundImage = `url('${src}')`;
      carousel.prepend(el);
      return el;
    });
    const dots = document.querySelector('.hero-dots');
    let active = 0;
    const show = (index) => {
      active = (index + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('active', i === active));
      dots?.querySelectorAll('button').forEach((d, i) => d.classList.toggle('active', i === active));
    };
    slides.forEach((_, i) => { const dot = document.createElement('button'); dot.setAttribute('aria-label', `Foto ${i + 1}`); dot.onclick = () => show(i); dots?.append(dot); });
    show(0); setInterval(() => show(active + 1), 6500);
  }
  document.querySelectorAll('[data-copy-account]').forEach((button) => button.addEventListener('click', async () => {
    const account = config.accountNumber;
    if (account.includes('[')) { button.textContent = 'Isi rekening terlebih dahulu'; return; }
    try { await navigator.clipboard.writeText(account); button.textContent = 'Nomor rekening tersalin'; }
    catch { button.textContent = 'Salin: ' + account; }
    setTimeout(() => { button.textContent = 'Salin nomor rekening'; }, 2400);
  }));
})();
