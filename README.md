# Masjid Jami' Abi Sa'roni — V3

Website statis multi-halaman tanpa framework atau proses build. Cukup buka `index.html` secara lokal, atau unggah seluruh isi folder ini ke repository GitHub.

## Halaman

- `index.html` — Beranda dengan carousel hero otomatis
- `profil.html` — Profil & Sejarah
- `layanan.html` — Layanan
- `kegiatan.html` — Jadwal Kegiatan
- `kontak.html` — Kontak & lokasi
- `infaq.html` — Infaq (rekening masih placeholder)

## Yang perlu diubah oleh pengurus

Buka `config.js`, lalu isi nilai `bankName`, `accountNumber`, dan `accountHolder` hanya setelah rekening resmi tersedia. Kontak WhatsApp, Instagram, YouTube, dan Google Maps juga dipusatkan dalam file ini agar mudah diperbarui.

Foto hero diatur pada bagian `assets.hero` di `config.js`. Ganti file `foto-kegiatan-1.jpeg` dan `foto-kegiatan-2.jpeg` dengan dokumentasi kegiatan masjid agar carousel menampilkan foto yang berbeda.

## Memperbarui GitHub dan Vercel

1. Salin seluruh isi folder ini untuk menggantikan isi project V2 di VS Code.
2. Pastikan `index.html` berada di folder utama repository, bukan di dalam subfolder tambahan.
3. Simpan perubahan, lalu lakukan commit dan push ke branch `main` di GitHub.
4. Vercel akan otomatis membuat deployment baru. Karena ini situs HTML statis, pengaturan build tidak diperlukan.

Jika deployment tidak berubah, buka halaman deployment Vercel terbaru atau lakukan redeploy dari dashboard Vercel.
