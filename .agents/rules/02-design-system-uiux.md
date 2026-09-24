---
description: Panduan Design System, UI/UX anti-slop, dial visual, skema warna, tipografi, dan komponen shadcn/ui untuk SDS Paradjai VI.
trigger: glob
globs: "**/*.{tsx,jsx,css,scss}"
---

# SDS Paradjai VI — Design System & UI/UX Guidelines (Anti-Slop)

Panduan ini mengatur standar visual, interaksi, dan komponen UI. Dokumen ini menggabungkan prinsip anti-slop modern dari Taste Frontend Skill dan Pedoman Visual PRD Bab 4.

---

## 1. Design Read & The Three Dials

> **Design Read**: *"Portal sekolah dasar dan pendaftaran PPDB untuk calon orang tua murid dan guru, berkarakter cerah, hangat, religius, terpercaya, ramah anak, dan dioptimalkan untuk akses smartphone (mobile-first)."*

### Konfigurasi Tiga Dial Visual:
- **`DESIGN_VARIANCE: 7`**: Tata letak asimetris yang dinamis dan terstruktur (bukan kartu seragam membosankan).
- **`MOTION_INTENSITY: 5`**: Transisi halus, mikro-animasi hover interaktif, fade-up saat scroll via `motion/react` / `framer-motion`. Hindari animasi berulang yang mengganggu.
- **`VISUAL_DENSITY: 4`**: Spasi lapang (`py-16 sm:py-20`, `gap-6`), keterbacaan tinggi, kenyamanan membaca di layar sentuh ponsel.

---

## 2. Skema Warna & Variabel CSS (Tokens)

Wajib menggunakan HSL tokens berikut di `globals.css` / konfigurasi Tailwind v4:

```css
:root {
  /* Primary: Hijau Edukasi (Karakter Islami, Terpercaya, Pertumbuhan) */
  --primary: 160 65% 38%;
  --primary-foreground: 0 0% 100%;

  /* Secondary: Kuning Madu (Aksen Ceria & Tombol CTA PPDB) */
  --secondary: 45 93% 55%;
  --secondary-foreground: 160 20% 10%;

  /* Accent: Biru Langit (Ikon, Link, & Elemen Pendukung) */
  --accent: 200 85% 50%;
  --accent-foreground: 0 0% 100%;

  /* Status Colors */
  --destructive: 0 84% 60%;      /* Status: Ditolak */
  --warning: 38 92% 55%;          /* Status: Pending Verifikasi */
  --success: 142 76% 42%;         /* Status: Diterima */

  /* Neutral & Base */
  --background: 0 0% 100%;
  --foreground: 160 20% 10%;
  --muted: 160 20% 96%;
  --muted-foreground: 160 10% 40%;
  --border: 160 15% 88%;
  --input: 160 15% 88%;
  --ring: 160 65% 38%;
  --radius: 1rem;
}
```

- **Warna Khusus WhatsApp**: Selalu gunakan warna brand resmi WhatsApp: `bg-[#25D366] text-white hover:bg-[#20bd5a]`.

---

## 3. Tipografi & Skala Teks

- **Heading Font**: `Plus Jakarta Sans` (`font-bold` / `font-extrabold` - 700/800) — tegas, modern, dan bersahabat.
- **Body Font**: `Inter` (`font-normal` / `font-medium` / `font-semibold` - 400/500/600) — sangat tajam dan nyaman dibaca di layar HP.
- **Konfigurasi Font**: Selalu gunakan `next/font/google` dengan opsi `display: 'swap'`.
- **Hierarki Ukuran**:
  - Hero Title: `text-3xl sm:text-5xl font-extrabold tracking-tight`
  - Section Title: `text-2xl sm:text-3xl font-bold`
  - Card Title: `text-lg sm:text-xl font-semibold`
  - Body: `text-base leading-relaxed`
  - Caption / Metadata: `text-sm text-muted-foreground`

---

## 4. Standar Komponen (shadcn/ui)

Patuhi aturan komponen berikut untuk menjaga konsistensi:
1. **Kartu (Cards - Berita, Fasilitas, Guru, Ekskul)**:
   - Wajib sudut lengkung: `rounded-2xl`.
   - Border halus: `border border-border/70 bg-card shadow-sm`.
   - Efek hover: `transition-all duration-200 hover:shadow-lg hover:-translate-y-1`.
   - Gambar thumbnail: aspek rasio konsisten (misal `aspect-video` atau `aspect-[4/3]`) dengan `overflow-hidden rounded-t-2xl`.
2. **Tombol (Buttons)**:
   - Tombol Aksi Utama: `rounded-full h-11 px-6 font-medium shadow-sm active:scale-[0.98]`.
   - Tombol WhatsApp: Ikon WhatsApp + teks jelas ("Daftar via WhatsApp" / "Tanya Admin").
   - FAB WhatsApp: Mengambang di kanan-bawah layar publik (`fixed bottom-6 right-6 z-50 rounded-full shadow-lg p-3.5`).
3. **Formulir & Input**:
   - Input tinggi konsisten: `h-11 rounded-lg border-input px-4`.
   - Focus ring: `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`.
   - Error messages: Teks merah jelas di bawah input dengan ikon kecil.
4. **Badge Status Pendaftaran**:
   - `rounded-full px-3 py-1 text-xs font-semibold`:
     - **Pending**: `bg-amber-100 text-amber-800 border-amber-200`
     - **Verified**: `bg-sky-100 text-sky-800 border-sky-200`
     - **Accepted**: `bg-emerald-100 text-emerald-800 border-emerald-200`
     - **Rejected**: `bg-rose-100 text-rose-800 border-rose-200`
5. **Tabel Admin**:
   - Komponen `Table` dari shadcn/ui dengan `sticky header`.
   - Zebra striping: `even:bg-muted/30`.
   - Kolom aksi di sisi kanan dengan tombol ikon (lihat detail, ubah status).

---

## 5. Anti-Default Discipline (Pola yang DILARANG)

- ❌ **Dilarang gradasi ungu AI generik** (`from-purple-600 to-indigo-600`). Gunakan variasi hijau botani, kuning madu, atau aksen langit.
- ❌ **Dilarang hero gelap pekat (dark mesh)** untuk landing page sekolah dasar. Gunakan latar putih bersih atau tinted sage lembut dengan foto kegiatan sekolah asli ber-overlay halus.
- ❌ **Dilarang 3 kartu fitur yang ukurannya identik dan kaku**. Gunakan ritme visual (bento grid berskala, highlight berita utama ukuran 2x, carousel/slider lembut).
- ❌ **Dilarang spam emoji** pada teks atau heading. Gunakan ikon SVG terpadu dari `lucide-react` dengan ketebalan seragam `stroke-[1.75]`.
- ❌ **Dilarang animasi scroll berlebihan**. Animasi hanya untuk `opacity` dan sedikit translasi Y (`y: 16 → 0`).

---

## 6. Aksesibilitas & Responsivitas Mobile

- **Kontras WCAG AA**: Rasio kontras teks terhadap latar belakang minimal 4.5:1.
- **Area Sentuh Mobile**: Seluruh tombol interaktif, link, dan elemen form wajib memiliki target sentuh minimal **44 x 44 px**.
- **Indikator Fokus**: Semua elemen interaktif wajib memiliki `focus-visible:outline-none focus-visible:ring-2`.
- **Drawer Mobile**: Navigasi mobile wajib menggunakan drawer samping (shadcn `Sheet`) yang mulus dan mudah ditutup.
