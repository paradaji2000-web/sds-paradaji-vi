---
description: Panduan arsitektur Next.js 15 App Router, routing halaman publik, dashboard admin, dan pemisahan Server vs Client Components.
trigger: glob
globs: "**/src/app/**/*.{ts,tsx}"
---

# SDS Paradjai VI — Struktur Halaman, Routing, & Arsitektur Komponen

Panduan ini mengatur struktur folder `src/app/`, konvensi Server Components vs Client Components, dan daftar lengkap halaman publik serta dashboard admin.

---

## 1. Konvensi Next.js 15 App Router

### A. Server Components (RSC) Default
- Semua file `page.tsx` dan `layout.tsx` adalah **Server Components** secara default.
- Data fetching langsung dilakukan di Server Components (via Drizzle ORM atau Server Actions).
- Metadata dinamis (`generateMetadata`) harus dijalankan di Server Component.

### B. Isolasi Client Components (`"use client"`)
- Tambahkan direktif `"use client"` **hanya pada daun terluar (leaf components)** yang membutuhkan interaktivitas:
  - Komponen formulir (PPDB multi-step, form edit admin).
  - Komponen interaktif (filter berita, modal lightbox galeri, tabs).
  - Komponen dengan event listener pointer/scroll atau animasi `motion/react`.
  - Tombol WhatsApp FAB yang mengambang.
- **Dilarang** menandai seluruh halaman (`page.tsx`) dengan `"use client"` jika sebagian besar layout dapat dirender di server.

---

## 2. Arsitektur Layout (Persistent Layouts)

1. **Public Layout (`src/app/(public)/layout.tsx`)**:
   - Header/Navbar sticky di atas dengan logo sekolah, navigasi menu, dan CTA "Daftar PPDB".
   - Drawer samping mobile menggunakan shadcn `Sheet`.
   - Footer dengan alamat lengkap, kontak, peta, link cepat, dan hak cipta.
   - WhatsApp Floating Action Button (`WhatsAppFab.tsx`) selalu tampil kanan bawah.
2. **Admin Dashboard Layout (`src/app/admin/layout.tsx`)**:
   - Sidebar navigasi (collapsible di desktop, Sheet drawer di mobile).
   - Top Header dengan breadcrumb, indikator profil user Clerk, dan tombol logout.
   - Proteksi otorisasi admin via `middleware.ts`.
3. **Auth Layout (`src/app/admin/(auth)/layout.tsx`)**:
   - Halaman login kustom dengan sisi kiri branding sekolah dan sisi kanan form login Clerk.

---

## 3. Daftar Halaman Publik (`src/app/(public)/`)

| Route | Deskripsi & Komponen Utama |
| :--- | :--- |
| `/` | **Beranda**: Hero banner sekolah, sambutan kepala sekolah, program unggulan, 3 berita terbaru, highlight ekstrakurikuler, CTA PPDB 2025/2026. |
| `/tentang` | **Tentang Kami**: Sejarah singkat, Visi, Misi, Tujuan Pendidikan, Struktur Organisasi, Sambutan Lengkap Kepala Sekolah. |
| `/berita` | **Berita & Kegiatan**: Grid berita dengan filter kategori (Berita/Kegiatan/Pengumuman), search input, dan pagination 9 item. |
| `/berita/[slug]` | **Detail Berita**: Konten berita lengkap, tanggal rilis, thumbnail, penulis, dan tombol "Bagikan ke WhatsApp". |
| `/guru` | **Profil Guru & Staf**: Grid kartu guru (foto, nama lengkap, jabatan, mata pelajaran, pendidikan). |
| `/ekstrakurikuler` | **Ekstrakurikuler**: Grid kartu ekskul (foto, nama, deskripsi, jadwal latihan, nama pembina/pelatih). |
| `/galeri` | **Galeri Fasilitas & Kegiatan**: Grid foto fasilitas dengan filter kategori (Ruang Kelas, Perpustakaan, Lapangan, dll.) dan modal lightbox interaktif. |
| `/ppdb` | **Informasi PPDB**: Penjelasan alur pendaftaran, jadwal seleksi, syarat berkas, FAQ, dan tombol "Daftar Sekarang". |
| `/ppdb/daftar` | **Formulir PPDB Online**: Multi-step wizard: 1. Data Diri Siswa → 2. Data Orang Tua/Wali → 3. Alamat → 4. Unggah Berkas → 5. Konfirmasi. |
| `/ppdb/status` | **Cek Status Pendaftaran**: Input nomor registrasi + tanggal lahir untuk mengecek status verifikasi dan catatan admin secara mandiri. |
| `/ppdb/sukses/[registrationNumber]` | **Halaman Sukses**: Tampilan nomor registrasi, ringkasan pendaftaran, dan tombol CTA "Kirim Data ke WhatsApp Admin" (link `wa.me`). |
| `/kontak` | **Kontak & Lokasi**: Peta interaktif/Google Maps embed, alamat fisik, jam operasional, kontak telepon, form pesan via WhatsApp. |
| `/kebijakan-privasi` | Halaman statis kebijakan privasi data siswa dan orang tua. |
| `/syarat-ketentuan` | Halaman statis syarat & ketentuan pendaftaran. |

---

## 4. Daftar Halaman Admin (`src/app/admin/`)

| Route | Deskripsi & Komponen Utama | Hak Akses |
| :--- | :--- | :--- |
| `/admin` | **Dashboard**: Statistik (Total pendaftar, pending, diterima, ditolak), grafik line pendaftar 7 hari terakhir, aktivitas terbaru. | Admin & Super Admin |
| `/admin/ppdb` | **Manajemen PPDB**: Tabel pendaftar lengkap dengan filter status (All/Pending/Verified/Accepted/Rejected), pencarian nama/no reg, pagination. | Admin & Super Admin |
| `/admin/ppdb/[id]` | **Detail Pendaftar**: Data diri lengkap, preview dokumen (KK, Akta, Foto, Ijazah), tombol verifikasi berkas, ubah status, input catatan. | Admin & Super Admin |
| `/admin/berita` | **Kelola Berita**: Tabel CRUD berita, toggle publish, filter kategori. Form modal atau navigasi ke `/baru` dan `/[id]/edit`. | Admin & Super Admin |
| `/admin/guru` | **Kelola Guru**: Tabel CRUD guru, urutan tampil (`displayOrder`), toggle aktif. | Admin & Super Admin |
| `/admin/fasilitas` | **Kelola Fasilitas**: Tabel CRUD fasilitas sekolah, kategori ruang, dan unggah foto. | Admin & Super Admin |
| `/admin/ekstrakurikuler` | **Kelola Ekstrakurikuler**: Tabel CRUD ekskul, jadwal, dan pembina. | Admin & Super Admin |
| `/admin/galeri` | **Kelola Galeri**: Manajemen foto galeri, kategori, dan deskripsi. | Admin & Super Admin |
| `/admin/notifikasi` | **Log Notifikasi**: Riwayat pengiriman WhatsApp & Email (status queued/sent/failed, pesan, penerima). | Admin & Super Admin |
| `/admin/pengaturan` | **Pengaturan Sistem**: Form nomor WhatsApp tujuan, template pesan WhatsApp, info kontak sekolah. | **Super Admin Only** |

---

## 5. Pola Pengambilan Data (Data Fetching)
- **Halaman Publik**: Gunakan Drizzle query langsung di Server Components dengan caching ISR (`revalidate: 300` detik) untuk berita, guru, ekskul, dan galeri.
- **Halaman Form PPDB**: Gunakan `react-hook-form` + `@hookform/resolvers/zod` dengan pemanggilan Server Actions untuk mutasi data.
- **Halaman Admin**: Gunakan TanStack Query v5 pada Client Component tabel agar filter, pencarian, dan mutasi berjalan instan tanpa reload seluruh halaman.
