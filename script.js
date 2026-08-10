(() => {
  const config = window.SITE_CONFIG;
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const navigation = document.querySelector('.nav-links');
  if (navigation) {
    const active = (pages) => pages.includes(currentPage) ? ' active' : '';
    navigation.innerHTML = `
      <li><a class="${active(['index.html'])}" href="index.html">Beranda</a></li>
      <li class="nav-group${active(['profil.html','pengurus.html','job-deskripsi.html'])}"><button class="nav-group-trigger" type="button">Tentang Masjid <span>&#8964;</span></button><ul class="nav-submenu"><li><a href="profil.html">Sejarah</a></li><li><a href="pengurus.html">Susunan Pengurus</a></li><li><a href="job-deskripsi.html">Job Deskripsi</a></li></ul></li>
      <li class="nav-group${active(['kegiatan.html'])}"><button class="nav-group-trigger" type="button">Agenda <span>&#8964;</span></button><ul class="nav-submenu"><li><a href="kegiatan.html">Ngaji Kitab Kilatan (5W+1H)</a></li><li><a href="kegiatan.html">Kultum Ramadhan</a></li><li><a href="kegiatan.html">Shalat Khusuf</a></li><li><a href="kegiatan.html">Majelis Al-Ikhlas UKM Kerohanian</a></li><li><a href="kegiatan.html">Ngaji Filsafat Dema Kampus</a></li><li><a href="kegiatan.html">Ngaji LPDP NU-IPPNU</a></li><li><a href="kegiatan.html">Seleksi Jawara</a></li><li><a href="kegiatan.html">Majelis Al-Hikmah</a></li></ul></li>
      <li class="nav-group${active(['media-literasi.html'])}"><button class="nav-group-trigger" type="button">Media &amp; Literasi <span>&#8964;</span></button><ul class="nav-submenu"><li><a href="media-literasi.html#ramadhan">Bacaan Dzikir Ramadhan</a></li><li><a href="media-literasi.html#dzulhijjah">Bacaan Dzikir Dzulhijjah</a></li><li><a href="media-literasi.html#muharram">Bacaan Dzikir Muharram</a></li></ul></li>
      <li class="nav-group${active(['layanan.html'])}"><button class="nav-group-trigger" type="button">Layanan <span>&#8964;</span></button><ul class="nav-submenu"><li><a href="layanan.html#peminjaman">Layanan Peminjaman</a></li><li><a href="layanan.html#form-peminjaman">Link Form Peminjaman</a></li><li><a href="layanan.html#jadwal-ruangan">Jadwal Penggunaan Ruangan</a></li></ul></li>
      <li class="nav-group${active(['kontak.html'])}"><button class="nav-group-trigger" type="button">Kontak <span>&#8964;</span></button><ul class="nav-submenu"><li><a href="kontak.html#email">Email</a></li><li><a href="kontak.html#instagram">Instagram</a></li><li><a href="kontak.html#youtube">YouTube</a></li><li><a href="kontak.html#whatsapp">WhatsApp</a></li></ul></li>`;
    navigation.querySelectorAll('.nav-group-trigger').forEach((button) => button.addEventListener('click', () => {
      const group = button.closest('.nav-group');
      navigation.querySelectorAll('.nav-group.open').forEach((item) => { if (item !== group) item.classList.remove('open'); });
      group?.classList.toggle('open');
    }));
  }
  document.querySelectorAll('.floating-wa').forEach((button) => {
    button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.78 11.78 0 0 0 12.03 0C5.46 0 .12 5.34.12 11.91c0 2.1.55 4.14 1.6 5.94L0 24l6.32-1.66a11.9 11.9 0 0 0 5.7 1.45h.01c6.57 0 11.91-5.34 11.91-11.91 0-3.18-1.24-6.17-3.42-8.4ZM12.03 21.78a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.75.99 1-3.65-.24-.38a9.84 9.84 0 0 1-1.51-5.24c0-5.45 4.43-9.89 9.89-9.89 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.9 6.99c0 5.45-4.43 9.87-9.88 9.87Zm5.42-7.41c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.18.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5a9.08 9.08 0 0 1-1.68-2.08c-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.48s1.08 2.88 1.23 3.08c.15.2 2.13 3.25 5.15 4.56.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z"/></svg>';
  });
  const prayerSchedule = document.querySelector('[data-prayer-schedule]');
  if (prayerSchedule) {
    const prayerDate = document.querySelector('[data-prayer-date]');
    const cityId = 'eda80a3d5b344bc40f3bc04f65b7a357';
    fetch(`https://api.myquran.com/v3/sholat/jadwal/${cityId}/today?tz=Asia/Jakarta`)
      .then((response) => { if (!response.ok) throw new Error('Jadwal tidak tersedia'); return response.json(); })
      .then((response) => {
        const schedule = response?.data?.jadwal || response?.data;
        const times = [['Subuh', schedule?.subuh], ['Zuhur', schedule?.dzuhur], ['Asar', schedule?.ashar], ['Maghrib', schedule?.maghrib], ['Isya', schedule?.isya]];
        if (times.some(([, time]) => !time)) throw new Error('Format jadwal tidak tersedia');
        prayerSchedule.innerHTML = times.map(([name, time]) => `<div class="prayer-time"><span>${name}</span><strong>${time}</strong></div>`).join('');
        if (prayerDate) prayerDate.textContent = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' }).format(new Date());
      })
      .catch(() => { prayerSchedule.innerHTML = '<span>Jadwal belum dapat dimuat. Silakan cek sumber jadwal resmi.</span>'; });
  }
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
// Filter Program Masjid
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const programCards = document.querySelectorAll('.program-card');

  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Ubah tombol aktif
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.getAttribute('data-category');

        // Filter kartu
        programCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});
