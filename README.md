# HRM Al-Ihsaan Sanur - Official Website

Website resmi Himpunan Remaja Muslim (HRM) Masjid Al-Ihsaan Sanur. Platform digital untuk informasi kegiatan, galeri dokumentasi, dan profil organisasi dengan antarmuka modern dan interaktif.

## ✨ Fitur Utama

- **Modern UI/UX**: Desain Glassmorphism mewah dengan palet warna Brand (Blue & Gold).
- **Interaktif**: Animasi GSAP untuk transisi halus dan efek Parallax 3D pada Hero section.
- **SEO Friendly Routing**: Menggunakan Slug (URL yang mudah dibaca) untuk halaman detail kegiatan.
- **Dark Mode Support**: Tema gelap "Midnight Luxury" yang nyaman di mata.
- **Dynamic Content**: Data kegiatan dan galeri diambil melalui API (Mock Data Service).
- **Responsive**: Tampilan optimal di Desktop, Tablet, dan Mobile.
- **Smart Navigation**: Navbar atas dinamis dan Floating Bottom Navbar untuk akses mudah.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite)
- **Styling**: Tailwind CSS
- **Animation**: GSAP (GreenSock Animation Platform)
- **Routing**: React Router DOM
- **Data Fetching**: Axios
- **Icons**: Lucide React

## 🚀 Cara Menjalankan Project

Ikuti langkah berikut untuk menjalankan project di lokal komputer Anda:

1.  **Clone Repository** (Jika belum)

    ```bash
    git clone https://github.com/username/hrm-alihsaan-web.git
    cd hrm-alihsaan-web
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Jalankan Development Server**

    ```bash
    npm run dev
    ```

4.  Buka `http://localhost:5173` di browser Anda.

## 🔌 Integrasi API

Project ini menggunakan Axios yang terpusat di folder `src/services/api.js`. Saat ini menggunakan **Mock Data** untuk simulasi.

### Mengganti Mock Data dengan Real API

Buka file `src/services/api.js` dan sesuaikan `baseURL`.

```javascript
// src/services/api.js
const api = axios.create({
  baseURL: "https://api.hrm-alihsaan.org/v1",
});
```

## 🎨 Design Tokens (Tailwind)

Warna utama yang digunakan:

- **Brand Blue**: `#2e3092`
- **Brand Gold**: `#C5A059`
- **Brand Black**: `#1a1a1a`
- **Dark Background**: `#020617`

---

© 2026 HRM Al-Ihsaan Sanur. Dibuat dengan ❤️ di Bali.
