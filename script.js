(() => {
  const config = window.SITE_CONFIG;
  if (!document.querySelector('link[rel~="icon"]')) {
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = config.assets.favicon || config.assets.logo;
    document.head.append(favicon);
  }
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const navigation = document.querySelector('.nav-links');
  if (navigation) {
    const active = (pages) => pages.includes(currentPage) ? ' active' : '';
    navigation.innerHTML = `
      <li><a class="${active(['index.html'])}" href="index.html"><i class="nav-icon">&#8962;</i>Beranda</a></li>
      <li class="nav-group${active(['profil.html','pengurus.html','job-deskripsi.html'])}"><button class="nav-group-trigger" type="button"><i class="nav-icon">&#9432;</i>Tentang Masjid <span class="nav-chevron">&#8964;</span></button><ul class="nav-submenu"><li><a href="profil.html">Sejarah</a></li><li><a href="pengurus.html">Susunan Pengurus</a></li><li><a href="job-deskripsi.html">Job Deskripsi</a></li></ul></li>
      <li class="nav-group${active(['kegiatan.html'])}"><button class="nav-group-trigger" type="button"><i class="nav-icon">&#9744;</i>Agenda <span class="nav-chevron">&#8964;</span></button><ul class="nav-submenu"><li><a href="kegiatan.html">Ngaji Kitab Kilatan (5W+1H)</a></li><li><a href="kegiatan.html">Kultum Ramadhan</a></li><li><a href="kegiatan.html">Shalat Khusuf</a></li><li><a href="kegiatan.html">Majelis Al-Ikhlas UKM Kerohanian</a></li><li><a href="kegiatan.html">Ngaji Filsafat Dema Kampus</a></li><li><a href="kegiatan.html">Ngaji LPDP NU-IPPNU</a></li><li><a href="kegiatan.html">Seleksi Jawara</a></li><li><a href="kegiatan.html">Majelis Al-Hikmah</a></li></ul></li>
      <li class="nav-group${active(['media-literasi.html'])}"><button class="nav-group-trigger" type="button"><i class="nav-icon">&#9635;</i>Media &amp; Literasi <span class="nav-chevron">&#8964;</span></button><ul class="nav-submenu"><li><a href="media-literasi.html#ramadhan">Bacaan Dzikir Ramadhan</a></li><li><a href="media-literasi.html#dzulhijjah">Bacaan Dzikir Dzulhijjah</a></li><li><a href="media-literasi.html#muharram">Bacaan Dzikir Muharram</a></li></ul></li>
      <li class="nav-group${active(['layanan.html'])}"><button class="nav-group-trigger" type="button"><i class="nav-icon">&#9881;</i>Layanan <span class="nav-chevron">&#8964;</span></button><ul class="nav-submenu"><li><a href="layanan.html#peminjaman">Layanan Peminjaman</a></li><li><a href="layanan.html#form-peminjaman">Link Form Peminjaman</a></li><li><a href="layanan.html#jadwal-ruangan">Jadwal Penggunaan Ruangan</a></li></ul></li>
      <li class="nav-group${active(['kontak.html'])}"><button class="nav-group-trigger" type="button"><i class="nav-icon">&#9993;</i>Kontak <span class="nav-chevron">&#8964;</span></button><ul class="nav-submenu"><li><a href="kontak.html#email">Email</a></li><li><a href="kontak.html#instagram">Instagram</a></li><li><a href="kontak.html#youtube">YouTube</a></li><li><a href="kontak.html#whatsapp">WhatsApp</a></li></ul></li>`;
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
    fetch('/api/prayer-times')
      .then((response) => { if (!response.ok) throw new Error('Jadwal tidak tersedia'); return response.json(); })
      .then((response) => {
        const schedule = response?.schedule || response?.jadwal;
        const times = [['Subuh', schedule?.subuh, '&#9728;'], ['Zuhur', schedule?.dzuhur, '&#9788;'], ['Asar', schedule?.ashar, '&#9728;'], ['Maghrib', schedule?.maghrib, '&#9789;'], ['Isya', schedule?.isya, '&#9790;']];
        if (times.some(([, time]) => !time)) throw new Error('Format jadwal tidak tersedia');
        prayerSchedule.innerHTML = times.map(([name, time, icon]) => `<div class="prayer-time"><i class="prayer-icon">${icon}</i><span>${name}</span><strong>${time}</strong></div>`).join('');
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
// Berita di Home: hanya artikel yang sudah dipublikasikan di Supabase.
(() => {
  const list = document.querySelector('[data-news-list]');
  if (!list) return;
  const status = document.querySelector('[data-news-status]');
  const supabase = window.SITE_CONFIG?.supabase;
  const fallbackImage = 'assets/images/foto-kegiatan-1.png';
  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[character]));
  const formatDate = (value) => {
    const date = new Date(value);
    return !value || Number.isNaN(date.getTime()) ? 'Kabar Masjid' : new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  };
  if (!supabase?.url || !supabase?.publishableKey) {
    list.innerHTML = '<p class="news-empty">Berita akan segera hadir.</p>';
    return;
  }
  fetch(`${supabase.url}/rest/v1/articles?select=id,title,slug,excerpt,image_url,created_at&published=eq.true&order=created_at.desc&limit=3`, {
    headers: { apikey: supabase.publishableKey, Authorization: `Bearer ${supabase.publishableKey}` }
  })
    .then((response) => { if (!response.ok) throw new Error(`Supabase HTTP ${response.status}`); return response.json(); })
    .then((articles) => {
      if (!articles.length) {
        list.innerHTML = '<p class="news-empty">Belum ada berita yang dipublikasikan. Nantikan kabar terbaru dari Masjid Jami\' Abi Sa\'roni.</p>';
        if (status) status.textContent = 'Belum ada berita';
        return;
      }
      list.innerHTML = articles.map((article) => {
        const title = escapeHtml(article.title || 'Kabar dari Masjid Jami\' Abi Sa\'roni');
        const excerpt = escapeHtml(article.excerpt || 'Informasi terbaru untuk jamaah dan masyarakat.');
        const image = escapeHtml(article.image_url || fallbackImage);
        return `<article class="news-card"><img src="${image}" alt="" loading="lazy" onerror="this.src='${fallbackImage}'"><div class="news-card-body"><p class="news-date">${formatDate(article.created_at)}</p><h3>${title}</h3><p>${excerpt}</p><span class="news-read">Berita terbaru &rarr;</span></div></article>`;
      }).join('');
      if (status) status.textContent = `${articles.length} berita terbaru`;
    })
    .catch(() => {
      list.innerHTML = '<p class="news-empty">Berita belum dapat dimuat. Silakan coba lagi beberapa saat lagi.</p>';
      if (status) status.textContent = 'Berita belum tersedia';
    });
    
// =========================================
// PRAYER TIMES
// =========================================

const loadPrayerTimes = async () => {
    try {
        const response = await fetch('/api/prayer-times');

        if (!response.ok) {
            throw new Error('Gagal mengambil jadwal salat');
        }

        const result = await response.json();
        const schedule = result?.schedule;

        if (!schedule) {
            throw new Error('Data jadwal salat tidak ditemukan');
        }

        const prayerTimes = {
            subuh: schedule.subuh,
            dzuhur: schedule.dzuhur,
            ashar: schedule.ashar,
            maghrib: schedule.maghrib,
            isya: schedule.isya
        };

        Object.entries(prayerTimes).forEach(([name, time]) => {
            const element = document.getElementById(`prayer-${name}`);

            if (element && time) {
                element.textContent = time;
            }
        });
// =========================================
// DETEKSI WAKTU SALAT BERIKUTNYA
// =========================================

const now = new Date();

const currentMinutes =
    now.getHours() * 60 + now.getMinutes();

let nextPrayer = null;

for (const [name, time] of Object.entries(prayerTimes)) {
    if (!time) continue;

    const cleanTime = String(time).replace('.', ':');
    const [hours, minutes] = cleanTime.split(':').map(Number);

    const prayerMinutes = hours * 60 + minutes;

    if (prayerMinutes > currentMinutes) {
        nextPrayer = name;
        break;
    }
}

// Kalau semua waktu hari ini sudah lewat,
// maka Subuh menjadi waktu berikutnya
if (!nextPrayer) {
    nextPrayer = 'subuh';
}

// Bersihkan status sebelumnya
document.querySelectorAll('.prayer-item').forEach(item => {
    item.classList.remove('is-next');

    const badge = item.querySelector('.next-prayer-badge');

    if (badge) {
        badge.remove();
    }
});

// Tandai waktu berikutnya
const nextElement =
    document.getElementById(`prayer-${nextPrayer}`);

if (nextElement) {
    const prayerItem =
        nextElement.closest('.prayer-item');

    if (prayerItem) {
        prayerItem.classList.add('is-next');

        const badge = document.createElement('span');

        badge.className = 'next-prayer-badge';
        badge.textContent = 'BERIKUTNYA';

        prayerItem.appendChild(badge);
    }
}
    } catch (error) {
        console.error('Prayer times error:', error);
    }
};

loadPrayerTimes();

})();
