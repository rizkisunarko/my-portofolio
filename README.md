# 🌐 Portofolio Pribadi — Rizki Pratama Sunarko

Website portofolio pribadi yang menampilkan profil, tech stack, koleksi proyek, dan informasi kontak. Dibangun menggunakan HTML, CSS, dan JavaScript murni tanpa framework.

---

## ✨ Fitur

- **Dark Mode** — Toggle antara mode terang dan gelap, preferensi disimpan di `localStorage`
- **Typing Effect** — Animasi teks berganti-ganti pada bagian Hero
- **Scroll Reveal Animation** — Elemen muncul secara halus saat di-scroll menggunakan Intersection Observer
- **Portfolio Filtering** — Filter proyek berdasarkan kategori (All, Web, Design, Poster)
- **Lightbox Image Viewer** — Tampilan gambar penuh dengan navigasi slider (keyboard & klik)
- **Responsive Design** — Tampilan optimal di desktop, tablet, dan mobile dengan hamburger menu
- **Tech Stack Marquee** — Animasi carousel teknologi yang berjalan secara otomatis

---

## 🗂️ Struktur Proyek

```
my-portofolio/
├── index.html          # Halaman utama
├── style.css           # Styling keseluruhan
├── script.js           # Logika interaktif (dark mode, filter, lightbox, dll.)
├── projects.json       # Data proyek portofolio
├── images/             # Aset gambar (profil, preview proyek, desain)
└── *.pdf               # File CV
```

---

## 🛠️ Tech Stack

| Teknologi | Kegunaan |
|---|---|
| HTML5 | Struktur halaman |
| CSS3 | Styling & animasi |
| JavaScript (Vanilla) | Interaktivitas |
| Font Awesome 6 | Ikon |
| Google Fonts (Inter) | Tipografi |

---

## 📁 Kategori Proyek

- **Web** — Aplikasi web fullstack maupun frontend (Laundry, TOEFL, SPK)
- **Design** — Desain grafis, logo, pamflet, ID Card, dan konten carousel
- **Poster** — Karya desain poster

Data proyek dikelola melalui file `projects.json` sehingga mudah ditambah atau diperbarui tanpa menyentuh kode HTML.

---

## 🚀 Cara Menjalankan

Website ini merupakan halaman statis. Karena data proyek dimuat melalui `fetch('projects.json')`, **diperlukan web server lokal** untuk mencegah error CORS.

**Menggunakan VS Code Live Server:**
1. Install ekstensi [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Klik kanan `index.html` → **Open with Live Server**

**Menggunakan Python:**
```bash
# Python 3
python -m http.server 8000
```
Lalu buka `http://localhost:8000` di browser.

---

## 📬 Kontak

| Platform | Info |
|---|---|
| 📧 Email | rizkipratamasunarko@gmail.com |
| 💼 LinkedIn | [linkedin.com/in/rizkipratamasunarko](https://www.linkedin.com/in/rizkipratamasunarko) |
| 🐙 GitHub | [github.com/rizkisunarko](https://github.com/rizkisunarko) |
| 💬 WhatsApp | +62 857-0835-0575 |

---

© 2025 Rizki Pratama Sunarko. All rights reserved.
