# SDS PARADAJI VI

---

## 1. Ringkasan & Tujuan Aplikasi
*Bagian ini menjelaskan gambaran umum proyek agar dipahami bersama oleh pemilik ide/klien dan tim pengembang.*
- **Nama Aplikasi**: SDS PARADAJI VI — Portal Informasi & PPDB Online
- **Penjelasan Singkat**: Website resmi SDS Paradjai VI yang menyajikan profil sekolah, berita, ekstrakurikuler, dan galeri fasilitas, sekaligus menjadi pintu utama Penerimaan Peserta Didik Baru (PPDB) online dengan verifikasi berkas oleh admin sekolah dan tindak lanjut pendaftaran otomatis via WhatsApp.
- **Masalah yang Diselesaikan**:
  - Informasi sekolah (profil, guru, fasilitas, ekstrakurikuler) masih tersebar di brosur/WhatsApp grup dan sulit diakses publik.
  - Proses PPDB manual (form kertas) memakan waktu, rawan salah tulis, dan sulit direkap.
  - Tidak ada kanal komunikasi terstruktur antara calon orang tua murid dan pihak sekolah.
  - Data pendaftar tidak terpusat sehingga admin kesulitan memantau status verifikasi berkas satu per satu.
- **Pengguna Aplikasi**:
  - Pengunjung Umum (tanpa login): Melihat berita, profil, ekstrakurikuler, galeri, dan halaman PPDB.
  - Calon Orang Tua/Murid (tanpa login): Mengisi formulir PPDB online dan berkomunikasi via tombol WhatsApp.
  - Admin Sekolah (login email & password): Mengelola seluruh konten dan memverifikasi berkas pendaftar.
  - Super Admin (login email & password): Mengatur pengaturan sistem, nomor WhatsApp tujuan, dan template pesan.
- **Target Keberhasilan**:
  - Minimal 100 pendaftar PPDB pertama yang selesai melalui jalur online dan terverifikasi berkasnya.
  - Waktu rata-rata admin dalam memverifikasi berkas turun menjadi < 3 menit per pendaftar.
  - Artikel berita/kegiatan dipublikasikan minimal 2 kali per bulan secara konsisten.
  - Tingkat konversi dari halaman PPDB ke pengiriman formulir minimal 60%.
  - Skor PageSpeed Insights kategori Mobile minimal 90.

---

## 2. Batasan Pembuatan Sistem (Versi Awal MVP)
*Menegaskan fitur apa yang dikerjakan di versi awal dan apa yang sengaja ditunda agar aplikasi cepat selesai dan tidak membengkak (mencegah scope creep).*
### ✅ Yang Dikerjakan:
- Halaman publik lengkap: Beranda, Tentang Kami, Berita, Detail Berita, Ekstrakurikuler, Galeri Fasilitas, Profil Guru, PPDB Online, Kontak, dan halaman Syarat & Ketentuan/Pengumuman.
- Tombol "Tanya via WhatsApp" dan "Daftar via WhatsApp" yang otomatis generate URL `wa.me` dengan template pesan data pendaftar.
- Formulir PPDB online dengan unggah berkas (KK, Akta, Foto, KIP), nomor registrasi otomatis, dan penyimpanan status verifikasi.
- Autentikasi Admin & Super Admin menggunakan Clerk (Email & Password).
- Dashboard Admin: Kelola Berita/Kegiatan, Profil Guru, Fasilitas, Ekstrakurikuler, Galeri, Manajemen Data PPDB, dan Pengaturan Nomor WhatsApp & Template Pesan.
- Notifikasi Email (via Resend) dan WhatsApp (via Fonnte/Wablas) untuk konfirmasi pendaftaran dan perubahan status.
- SEO dasar: meta dinamis, sitemap, robots.txt, Open Graph.
- Responsive Mobile-first.

### ⛔ Yang Tidak Dikerjakan di Versi Awal:
- Sistem pembayaran online (payment gateway) — PPDB tidak memungut biaya saat mendaftar.
- Portal Siswa/Guru (login untuk murid untuk melihat nilai absensi).
- Multi-tenant (satu instalasi untuk satu sekolah saja — SDS Paradjai VI).
- Fitur chat internal realtime; komunikasi tetap melalui WhatsApp/email.
- Integrasi SIAKAD, Dapodik, atau EMIS Kemenag.
- Aplikasi mobile native (iOS/Android).

---

## 3. Daftar Halaman & Struktur Menu (Pages & Routing)
*Daftar lengkap halaman yang harus dibuat, dikelompokkan berdasarkan area atau peran pengguna (Role).*
### A. Public Area (Tanpa Login)
- `/` (Beranda): Hero banner sekolah, sambutan kepala sekolah, program unggulan, berita terbaru (3 kartu), ekstrakurikuler highlight, CTA PPDB 2025/2026, dan tombol WhatsApp mengambang.
- `/tentang` (Tentang Kami): Sejarah singkat, Visi, Misi, Tujuan, Struktur Organisasi, dan Sambutan Kepala Sekolah.
- `/berita` (Berita & Kegiatan): Daftar berita dengan filter kategori (Berita / Kegiatan / Pengumuman) dan pencarian.
- `/berita/[slug]` (Detail Berita): Isi lengkap berita, tanggal, penulis, thumbnail, tombol share ke WhatsApp.
- `/guru` (Profil Guru & Staf): Grid card guru lengkap dengan foto, mapel, dan pendidikan.
- `/ekstrakurikuler` (Ekstrakurikuler): Grid ekstrakurikuler dengan gambar, jadwal, pembina.
- `/galeri` (Galeri Fasilitas): Grid galeri dengan filter kategori (Ruang Kelas, Perpustakaan, Lapangan, Masjid, dll) dan lightbox.
- `/ppdb` (PPDB Online): Alur PPDB, syarat berkas, jadwal, dan tombol "Daftar Sekarang".
- `/ppdb/daftar` (Formulir PPDB): Formulir data diri, data orang tua, unggah berkas, dan konfirmasi WhatsApp.
- `/ppdb/status` (Cek Status Pendaftaran): Input nomor registrasi + tanggal lahir untuk melihat status verifikasi.
- `/ppdb/sukses/[registrationNumber]` (Halaman Sukses): Nomor registrasi, ringkasan data, tombol kirim ulang ke WhatsApp.
- `/kontak` (Kontak & Lokasi): Alamat, peta, jam operasional, form kontak (terkirim ke WhatsApp admin), dan informasi telepon.
- `/kebijakan-privasi` (Kebijakan Privasi): Halaman statis.
- `/syarat-ketentuan` (Syarat & Ketentuan): Halaman statis.

### B. Admin Area (Setelah Login - Role: Admin)
- `/admin` (Dashboard Admin): Kartu statistik (total pendaftar, pending verifikasi, diterima, ditolak), grafik pendaftar 7 hari terakhir, dan aktivitas terbaru.
- `/admin/berita` (Kelola Berita): Tabel CRUD berita dengan filter kategori, status publikasi, dan pencarian.
- `/admin/berita/baru` (Tambah Berita): Form editor berita.
- `/admin/berita/[id]/edit` (Edit Berita): Form edit berita.
- `/admin/guru` (Kelola Guru): Tabel CRUD profil guru & urutan tampil.
- `/admin/guru/baru` & `/admin/guru/[id]/edit`: Form guru.
- `/admin/fasilitas` (Kelola Fasilitas): Tabel CRUD data fasilitas.
- `/admin/ekstrakurikuler` (Kelola Ekstrakurikuler): Tabel CRUD ekstrakurikuler.
- `/admin/galeri` (Kelola Galeri): Tabel CRUD foto galeri dengan kategori.
- `/admin/ppdb` (Manajemen Pendaftar): Tabel pendaftar dengan filter status verifikasi & pencarian.
- `/admin/ppdb/[id]` (Detail Pendaftar): Detail data lengkap, preview & verifikasi berkas, ubah status, dan catatan admin.
- `/admin/notifikasi` (Log Notifikasi): Riwayat pengiriman email/WhatsApp ke pendaftar.
- `/admin/pengaturan` (Pengaturan Sistem - Super Admin): Kelola nomor WhatsApp tujuan, template pesan WhatsApp, template email, dan info sekolah.

---

## 4. Pedoman UI/UX & Design System
*Panduan visual konkret agar AI coding assistant tidak membuat UI yang kaku atau default.*
- **Skema Warna**:
  - Primary (Hijau Edukasi): HSL(160, 65%, 38%) — nuansa religius, tumbuh, dan terpercaya khas sekolah.
  - Primary Foreground: HSL(0, 0%, 100%)
  - Secondary (Kuning Madu): HSL(45, 93%, 55%) — aksen energi positif untuk CTA PPDB.
  - Accent (Biru Langit): HSL(200, 85%, 50%) — untuk ikon & link.
  - Destructive: HSL(0, 84%, 60%) — status "Ditolak".
  - Warning: HSL(38, 92%, 55%) — status "Pending Verifikasi".
  - Success: HSL(142, 76%, 42%) — status "Diterima".
  - Background: HSL(0, 0%, 100%) / Dark: HSL(160, 15%, 8%)
  - Muted: HSL(160, 20%, 96%)
  - Border: HSL(160, 15%, 88%)
- **Tipografi**:
  - Heading: Font `Plus Jakarta Sans` (700/800) — tegas namun ramah.
  - Body: Font `Inter` (400/500/600) — sangat terbaca di layar HP.
  - Skala: `text-4xl` untuk judul utama hero, `text-2xl` section, `text-base` body, `text-sm` metadata.
- **Aturan Komponen (shadcn/ui)**:
  - Kartu berita/fasilitas: `rounded-2xl`, `shadow-sm`, transisi `hover:shadow-lg hover:-translate-y-1` dengan `duration-200`.
  - Tombol utama: `rounded-full`, `h-11`, padding horizontal `px-6`, warna Primary; tombol WhatsApp selalu hijau `bg-[#25D366]` dengan ikon WhatsApp.
  - Form input: `rounded-lg`, `border`, tinggi `h-11`, fokus ring Primary dengan offset 2px.
  - Badge status pendaftaran: `rounded-full`, padding `px-3 py-1`, warna berbeda per status (Pending/Warning, Verified/Accent, Accepted/Success, Rejected/Destructive).
  - Tabel admin: shadcn `Table` dengan `sticky header`, striped row `bg-muted/40`, aksi ikon di kolom terakhir.
  - Dialog & Sheet: shadcn `Dialog` untuk form modal, `Sheet` untuk filter mobile.
- **Layout & Grid**:
  - Container utama: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
  - Grid berita/fasilitas: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`.
  - Section spacing: `py-16 sm:py-20`.
- **Nuansa & Vibe**: Bersih, cerah, hangat, dan ramah anak. Banyak whitespace, ikon Lucide dengan `stroke-[1.75]`, micro-animation pada hover tombol (scale 1.02) dan fade-in section menggunakan `framer-motion`. Hero menggunakan gambar sekolah asli dengan overlay gradasi hijau transparan. Tidak ada warna neon atau gradasi berlebihan — fokus pada profesionalisme dan keterbacaan di layar smartphone.
- **Aksesibilitas**: Kontras minimum WCAG AA, `focus-visible` ring pada semua elemen interaktif, `aria-label` pada tombol ikon, dan target sentuh minimal 44x44px.

---

## 5. Pembagian Hak Akses Pengguna
*Tabel hak akses yang menentukan siapa saja yang boleh melihat, mengedit, atau mengelola data.*
| Menu / Halaman | Publik (Tanpa Login) | Admin Sekolah (Login) | Super Admin (Login) |
| :--- | :---: | :---: | :---: |
| Beranda & Halaman Publik | ✅ | ✅ | ✅ |
| Berita / Kegiatan (Lihat) | ✅ | ✅ | ✅ |
| Berita / Kegiatan (Tambah/Edit/Hapus) | ❌ | ✅ | ✅ |
| Profil Guru (Lihat) | ✅ | ✅ | ✅ |
| Profil Guru (Kelola) | ❌ | ✅ | ✅ |
| Fasilitas & Galeri (Lihat) | ✅ | ✅ | ✅ |
| Fasilitas & Galeri (Kelola) | ❌ | ✅ | ✅ |
| Ekstrakurikuler (Lihat) | ✅ | ✅ | ✅ |
| Ekstrakurikuler (Kelola) | ❌ | ✅ | ✅ |
| Formulir PPDB Online (Isi) | ✅ | ❌ | ❌ |
| Manajemen Data Pendaftar PPDB | ❌ | ✅ | ✅ |
| Verifikasi Berkas & Ubah Status Pendaftar | ❌ | ✅ | ✅ |
| Log Notifikasi (Lihat) | ❌ | ✅ | ✅ |
| Pengaturan Nomor WhatsApp & Template Pesan | ❌ | ❌ | ✅ |
| Pengaturan Info Sekolah & Akun Admin Lain | ❌ | ❌ | ✅ |

---

## 6. Alur Kerja dan Fitur Utama
*Menjelaskan cara kerja setiap fitur utama dalam bahasa yang mudah dipahami serta aturan logikanya.*

### A. Modul Portal Informasi Sekolah (Publik)
1. **Cara Kerja**: Pengunjung membuka Beranda → melihat banner sekolah, sambutan kepala sekolah, berita terbaru, ekstrakurikuler unggulan, dan tombol "Daftar PPDB Sekarang" → menavigasi ke halaman Berita/Guru/Ekstrakurikuler/Galeri → setiap kartu dapat diklik untuk melihat detail.
2. **Aturan Sistem**:
   - Hanya berita dengan `isPublished = true` yang tampil di publik.
   - Filter berita berdasarkan `category` (Berita/Kegiatan/Pengumuman) dan `search` judul via query string `?kategori=berita&q=...`.
   - Pagination 9 item per halaman dengan infinite scroll atau tombol "Muat Lebih Banyak".
   - Setiap halaman publik dikirim dengan meta tag dinamis (title, description, OG image) sesuai konten.

### B. Modul Ekstrakurikuler & Galeri Fasilitas
1. **Cara Kerja**: Halaman menampilkan grid ekstrakurikuler dengan foto, jadwal, pembina, dan deskripsi. Galeri menampilkan grid foto fasilitas yang dikelompokkan per kategori dan bisa dibuka dalam lightbox.
2. **Aturan Sistem**:
   - Urutan tampil mengikuti kolom `order` (ascending), diatur admin.
   - Hanya data dengan `isActive = true` yang tampil.
   - Gambar dikompresi otomatis dan disajikan via Bunny CDN dengan `next/image` (remotePatterns).

### C. Modul Formulir PPDB Online & Verifikasi Berkas
1. **Cara Kerja**:
   - Calon orang tua membuka `/ppdb` → membaca alur, syarat, dan jadwal → mengklik tombol "Daftar Sekarang" → mengisi formulir multi-step (Data Diri Anak → Data Orang Tua/Wali → Data Alamat → Unggah Berkas → Konfirmasi).
   - Sistem membuat `registrationNumber` otomatis (format: `PPDB-2025-XXXX`).
   - Setelah submit, pengguna diarahkan ke halaman sukses dengan nomor registrasi dan tombol "Kirim Data ke WhatsApp Admin" (URL `wa.me` dengan template pesan terisi otomatis).
   - Admin login → membuka `/admin/ppdb` → memfilter pendaftar dengan status `pending` → membuka detail → meninjau unggahan berkas → menandai berkas sebagai "Valid/Tidak Valid" → mengubah status pendaftaran menjadi `verified`, `accepted`, atau `rejected`.
   - Sistem mengirim notifikasi email (Resend) & WhatsApp (Fonnte) ke orang tua berisi pembaruan status.
2. **Aturan Sistem**:
   - Field wajib: `fullName`, `nisn` (opsional untuk TK/SD kelas 1), `gender`, `birthPlace`, `birthDate`, `address`, `parentName`, `parentPhone`, `parentEmail`.
   - Validasi `parentPhone` format Indonesia (08xx atau +62xx).
   - Validasi `parentEmail` format email aktif (Zod `email()`).
   - Berkas wajib: Kartu Keluarga, Akta Kelahiran, Foto 3x4, Ijazah/SKHUN (opsional untuk kelas 1 SD).
   - Ukuran file maksimal 2 MB, format `jpg/png/pdf`.
   - Tidak boleh ada dua pendaftaran dengan `parentPhone` + `fullName` + `birthDate` yang identik dalam 24 jam (anti-duplikat via constraint unik partial).
   - Nomor registrasi digenerate di server dengan atomic increment year-based counter.
   - Status yang mungkin: `pending` → `verified` → `accepted` / `rejected`. Status `accepted`/`rejected` bersifat final (tidak bisa diubah oleh admin biasa).

### D. Modul Komunikasi WhatsApp (Tanya/Daftar via WA)
1. **Cara Kerja**: Tombol "Tanya via WhatsApp" dan "Daftar via WhatsApp" otomatis menyusun URL:
   `https://wa.me/{nomorTujuan}?text={encodeURIComponent(pesan)}`
   Pesan berisi template rapi dengan data pendaftar (jika dari halaman sukses) atau pesan umum (jika dari halaman publik biasa).
2. **Aturan Sistem**:
   - Nomor tujuan dan template pesan diambil dari tabel `site_settings` (key `whatsapp_number` dan `whatsapp_template`).
   - Template mendukung placeholder: `{nama_sekolah}`, `{nama_anak}`, `{nomor_registrasi}`, `{tanggal_daftar}`, `{nama_orang_tua}`, `{asal_sekolah}`.
   - Pesan di-`encodeURIComponent()` sebelum masuk ke URL.
   - Tombol WhatsApp mengambang (FAB) selalu tampil kanan bawah pada halaman publik di mobile.

### E. Modul Notifikasi Email (Resend) & WhatsApp (Fonnte/Wablas)
1. **Cara Kerja**: Setiap perubahan status (verified/accepted/rejected) atau pendaftaran baru memicu fungsi `sendNotification(registrationId, eventType)` yang mengirim email + WhatsApp ke orang tua/wali dan mencatat hasil di tabel `notification_logs`.
2. **Aturan Sistem**:
   - Email subject template dari `site_settings` key `email_subject_{eventType}`.
   - WhatsApp body template dari `site_settings` key `whatsapp_message_{eventType}`.
   - Jika pengiriman gagal, log dengan status `failed` dan `retryCount` increment (maks 3 retry).
   - Semua notifikasi dicatat di `notification_logs` untuk audit admin.

### F. Modul Autentikasi Admin (Clerk - Email & Password)
1. **Cara Kerja**: Admin membuka `/admin` → jika belum login, diarahkan ke halaman login Clerk → login dengan email & password → setelah berhasil, dicek apakah email terdaftar di tabel `users` dengan role `admin` atau `super_admin` → jika ya, diarahkan ke `/admin`, jika tidak di-logout dengan pesan error.
2. **Aturan Sistem**:
   - Registrasi user admin baru dilakukan manual oleh Super Admin via Clerk Dashboard atau script seeding.
   - Middleware Next.js memproteksi seluruh route `/admin/*` kecuali `/admin/login`.
   - Role-based access: hanya `super_admin` yang bisa mengakses `/admin/pengaturan`.

### G. Modul Cek Status Pendaftaran PPDB Mandiri
1. **Cara Kerja**: Orang tua membuka `/ppdb/status` → memasukkan nomor registrasi dan tanggal lahir → sistem menampilkan status verifikasi terbaru dan catatan admin.
2. **Aturan Sistem**:
   - Rate limit 5 percobaan per IP per 10 menit (anti brute force).
   - Kombinasi `registrationNumber` + `birthDate` harus cocok.
   - Tampilkan hanya field publik: status, catatan, dan berkas yang perlu diperbaiki.

### H. Modul Dashboard Statistik Admin
1. **Cara Kerja**: Dashboard menampilkan total pendaftar, breakdown status, grafik line 7 hari terakhir, dan tabel 5 aktivitas terbaru.
2. **Aturan Sistem**:
   - Query agregat realtime via Drizzle dengan `count()` & `groupBy`.
   - Data caching 60 detik untuk performa.

---

## 7. Alur Navigasi & Arsitektur Layout
*Peta navigasi alur halaman dan struktur tata letak (layout).*

### Arsitektur Layout (Persisten)
- **Public Layout**: Header/Navbar sticky di atas dengan logo SDS Paradjai VI, menu (Beranda, Tentang, Berita, Guru, Ekstrakurikuler, Galeri, PPDB, Kontak), tombol CTA "Daftar PPDB" (Primary). Footer dengan informasi kontak, peta, tautan cepat, dan sosial media. FAB WhatsApp mengambang kanan bawah.
- **Admin Dashboard Layout**: Sidebar kiri (fixed, collapsible) berisi navigasi modul admin, header kecil di atas dengan breadcrumb, avatar user, tombol notifikasi, dan tombol logout. Mobile menggunakan Sheet drawer.
- **Auth Layout**: Halaman login/register Clerk custom-styled dengan branding sekolah di sisi kiri dan form di sisi kanan.

### Bagan Alur (Flowchart)
```mermaid
flowchart TD
    A[Pengunjung] --> B[Beranda /]
    B --> C{Pilih Menu}
    C --> D[/berita]
    C --> E[/guru]
    C --> F[/ekstrakurikuler]
    C --> G[/galeri]
    C --> H[/ppdb]
    D --> D1[Detail Berita /berita/:slug]
    D1 --> I[Tombol Share WhatsApp]

    H --> H1{Alur Pendaftaran}
    H1 --> H2[/ppdb/daftar - Form Multi-step]
    H2 --> H3[Generate registrationNumber]
    H3 --> H4[Simpan ke ppdb_registrations]
    H4 --> H5[Insert ppdb_documents]
    H5 --> H6[/ppdb/sukses/:registrationNumber]
    H6 --> H7[Kirim Data ke WA Admin via wa.me]
    H6 --> H8[Notifikasi Email + WA ke Ortu]

    H --> H9[/ppdb/status]
    H9 --> H10{Validasi No. Registrasi + Tgl Lahir}
    H10 -- Cocok --> H11[Tampilkan Status & Catatan]
    H10 -- Tidak --> H12[Pesan Error]

    B --> J[Admin Login /admin]
    J --> K{Auth Clerk}
    K -- Gagal --> J
    K -- Berhasil --> L[Cek Role di users]
    L -- Tidak Terdaftar --> M[Logout]
    L -- Valid --> N[/admin Dashboard]

    N --> O[/admin/berita]
    N --> P[/admin/guru]
    N --> Q[/admin/fasilitas]
    N --> R[/admin/ekstrakurikuler]
    N --> S[/admin/galeri]
    N --> T[/admin/ppdb]
    T --> T1[/admin/ppdb/:id - Detail & Verifikasi]
    T1 --> T2{Ubah Status}
    T2 -- verified --> U[sendNotification verified]
    T2 -- accepted --> V[sendNotification accepted]
    T2 -- rejected --> W[sendNotification rejected]
    U --> X[Insert notification_logs]
    V --> X
    W --> X

    N --> Y[/admin/notifikasi]
    N --> Z[/admin/pengaturan - Super Admin Only]
    Z --> Z1[Atur Nomor WA & Template]
```

---

## 8. Kebutuhan Non-Fungsional (SEO, Keamanan, & Performa)
*Syarat wajib agar website siap rilis ke publik (production-ready).*
- **SEO**:
  - Wajib menggunakan tag `<title>` dinamis, meta description, dan Open Graph (OG) tags di setiap halaman publik.
  - Wajib menghasilkan `sitemap.xml` dinamis via Next.js `app/sitemap.ts` yang mencakup seluruh berita, guru, ekstrakurikuler, dan fasilitas.
  - Wajib menyediakan `robots.txt` via `app/robots.ts` dengan `Disallow: /admin/*`.
  - Wajib menggunakan Schema.org JSON-LD tipe `EducationalOrganization` di Beranda dan `Article` di halaman detail berita.
  - URL berita menggunakan slug SEO-friendly: `/berita/juara-lomba-sains-nasional-2025`.
- **Keamanan**:
  - Autentikasi admin sepenuhnya ditangani Clerk (Email & Password + MFA opsional).
  - Middleware Next.js melindungi seluruh route `/admin/*` dan memisahkan akses berdasarkan role.
  - Sanitasi input menggunakan Zod di semua Server Actions + validasi berkas (MIME type & size).
  - Proteksi XSS: konten berita disimpan sebagai Markdown/HTML-sanitized (pakai `sanitize-html` di render).
  - Proteksi CSRF: Clerk + Next.js Server Actions (built-in CSRF protection).
  - Rate limiting menggunakan Upstash Redis pada endpoint `/ppdb/daftar`, `/ppdb/status`, dan `/api/notify`.
  - Unggahan berkas disimpan di Bunny Storage (S3-compatible) — bukan di public folder.
  - Wajib secret rotation untuk webhook Fonnte & Resend.
  - Aktivasi HTTPS + HSTS di production.
- **Performa**:
  - Wajib optimasi gambar (`<Image>`) dengan remotePatterns Bunny CDN, format AVIF/WebP, dan `sizes` responsif.
  - Lazy loading komponen berat (Galeri Lightbox, Chart Dashboard) menggunakan `next/dynamic`.
  - Caching untuk data publik menggunakan `unstable_cache` / ISR revalidate 300 detik pada halaman berita, guru, ekstrakurikuler, dan galeri.
  - Database query dioptimasi dengan index pada kolom `slug`, `isPublished`, `status`, `createdAt`.
  - Font di-`next/font` (self-hosted) dengan `display: swap`.
  - Target Lighthouse: Performance ≥ 90, Accessibility ≥ 95.

---

## 9. Panduan Bahasa, Copywriting, & Data Dummy
*Panduan nada bicara (Tone of Voice) dan contoh data agar prototipe terasa nyata.*
- **Gaya Bahasa**: Profesional, ramah, dan membumi (menggunakan kata "Anda" dan "Kami"). Hangat dan penuh harapan — mencerminkan lingkungan pendidikan anak usia dini/sekolah dasar. Hindari jargon teknis pada halaman publik.
- **Instruksi Data Dummy**: JANGAN PERNAH MENGGUNAKAN "Lorem Ipsum". Selalu gunakan data dummy berbahasa Indonesia yang relevan dengan konteks aplikasi.
- **Contoh Data Dummy Berita**:
  - `title`: "Siswa SDS Paradjai VI Raih Juara 1 Lomba Cerdas Cermat Tingkat Kecamatan"
  - `excerpt`: "Prestasi membanggakan kembali diukir oleh tim LCC SDS Paradjai VI dalam ajang Cerdas Cermat yang digelar di Kecamatan Paradjai..."
  - `category`: "Berita"
  - `publishedAt`: 15 Januari 2025
- **Contoh Data Dummy Guru**:
  - `name`: "Ibu Siti Nurhaliza, S.Pd."
  - `position`: "Kepala Sekolah"
  - `subject`: "Manajemen Sekolah"
  - `education`: "S1 Pendidikan Guru Sekolah Dasar — Universitas Negeri Jakarta"
- **Contoh Data Dummy Ekstrakurikuler**:
  - `name`: "Tahfidz Al-Qur'an"
  - `schedule`: "Setiap Selasa & Kamis, 14.00 - 15.30 WIB"
  - `coach`: "Ustadz Ahmad Fauzi, S.Ag."
- **Contoh Data Dummy Fasilitas**:
  - `name`: "Ruang Kelas Ber-AC"
  - `category`: "Ruang Belajar"
  - `description`: "Terdapat 12 ruang kelas yang dilengkapi AC, proyektor, dan papan tulis interaktif."
- **Contoh Data Dummy Pendaftar PPDB**:
  - `fullName`: "Aisyah Putri Ramadhani"
  - `parentName`: "Bapak Rizki Ramadhan"
  - `parentPhone`: "081234567890"
  - `parentEmail`: "rizki.ramadhan@gmail.com"
  - `registrationNumber`: "PPDB-2025-0042"
  - `status`: "pending"

---

## 10. Fondasi Teknis (Untuk Tim Pengembang / Programmer & AI)
*Petunjuk arsitektur teknis spesifik.*
- **Bahasa & Framework**: Next.js 15 (App Router, Server Actions, Parallel Routes) dengan TypeScript strict mode.
- **Tampilan Antarmuka (UI)**: Tailwind CSS v4, shadcn/ui Component Library, Lucide Icons, Framer Motion untuk animasi, `react-hook-form` + `zod` untuk form.
- **Autentikasi**: Clerk Authentication (Email & Password) dengan middleware Next.js dan sinkronisasi ke tabel `users` via webhook Clerk (`user.created`, `user.updated`).
- **Basis Data (Database)**: Neon PostgreSQL (serverless) dengan Drizzle ORM + `drizzle-kit` untuk migrasi.
- **Penyimpanan Media**: Bunny Stream (video) + Bunny Storage & CDN (gambar & berkas PPDB) via `@bunny.net/storage-sdk`.
- **Email**: Resend (transactional email) dengan template React Email.
- **WhatsApp Gateway**: Fonnte API (fallback: Wablas) untuk notifikasi & penerusan otomatis.
- **Caching & Rate Limit**: Upstash Redis (`@upstash/redis`, `@upstash/ratelimit`).
- **Validasi**: Zod untuk schema validasi form & Server Action input.
- **State & Data Fetching**: TanStack Query v5 untuk data client-side (khusus dashboard admin filter/CRUD), Next.js cache & ISR untuk halaman publik.

### Struktur Skema Database Nyata
```typescript
// src/db/schema.ts
import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
  date,
  pgEnum,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["admin", "super_admin"]);
export const newsCategoryEnum = pgEnum("news_category", ["berita", "kegiatan", "pengumuman"]);
export const ppdbStatusEnum = pgEnum("ppdb_status", ["pending", "verified", "accepted", "rejected"]);
export const documentTypeEnum = pgEnum("document_type", ["kk", "akta", "foto", "ijazah", "kip"]);
export const notificationChannelEnum = pgEnum("notification_channel", ["whatsapp", "email"]);
export const notificationStatusEnum = pgEnum("notification_status", ["queued", "sent", "failed"]);

// ==== USERS (sync dari Clerk via webhook) ====
export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clerkUserId: varchar("clerk_user_id", { length: 191 }).notNull(),
    email: varchar("email", { length: 191 }).notNull(),
    fullName: varchar("full_name", { length: 191 }).notNull(),
    role: roleEnum("role").default("admin").notNull(),
    avatarUrl: text("avatar_url"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({
    clerkIdx: uniqueIndex("users_clerk_user_id_idx").on(t.clerkUserId),
    emailIdx: uniqueIndex("users_email_idx").on(t.email),
  })
);

// ==== NEWS (Berita / Kegiatan / Pengumuman) ====
export const news = pgTable(
  "news",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    excerpt: text("excerpt").notNull(),
    content: text("content").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    category: newsCategoryEnum("category").default("berita").notNull(),
    isPublished: boolean("is_published").default(false).notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    authorId: uuid("author_id").references(() => users.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({
    slugIdx: uniqueIndex("news_slug_idx").on(t.slug),
    publishIdx: index("news_publish_idx").on(t.isPublished, t.publishedAt),
    categoryIdx: index("news_category_idx").on(t.category),
  })
);

// ==== TEACHERS (Profil Guru & Staf) ====
export const teachers = pgTable(
  "teachers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 191 }).notNull(),
    slug: varchar("slug", { length: 191 }).notNull(),
    position: varchar("position", { length: 191 }).notNull(),
    subject: varchar("subject", { length: 191 }),
    education: varchar("education", { length: 255 }),
    bio: text("bio"),
    photoUrl: text("photo_url"),
    displayOrder: integer("display_order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({
    slugIdx: uniqueIndex("teachers_slug_idx").on(t.slug),
  })
);

// ==== FACILITIES (Fasilitas Sekolah) ====
export const facilities = pgTable("facilities", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  slug: varchar("slug", { length: 191 }).notNull(),
  category: varchar("category", { length: 100 }),
  description: text("description"),
  imageUrl: text("image_url"),
  displayOrder: integer("display_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ==== EXTRACURRICULARS ====
export const extracurriculars = pgTable("extracurriculars", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  slug: varchar("slug", { length: 191 }).notNull(),
  description: text("description"),
  schedule: varchar("schedule", { length: 191 }),
  coach: varchar("coach", { length: 191 }),
  imageUrl: text("image_url"),
  displayOrder: integer("display_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ==== GALLERIES ====
export const galleries = pgTable("galleries", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 191 }).notNull(),
  imageUrl: text("image_url").notNull(),
  category: varchar("category", { length: 100 }),
  description: text("description"),
  displayOrder: integer("display_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ==== PPDB REGISTRATIONS ====
export const ppdbRegistrations = pgTable(
  "ppdb_registrations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    registrationNumber: varchar("registration_number", { length: 50 }).notNull(),
    fullName: varchar("full_name", { length: 191 }).notNull(),
    nisn: varchar("nisn", { length: 20 }),
    gender: varchar("gender", { length: 10 }).notNull(), // "L" | "P"
    birthPlace: varchar("birth_place", { length: 191 }).notNull(),
    birthDate: date("birth_date").notNull(),
    religion: varchar("religion", { length: 50 }),
    address: text("address").notNull(),
    kelurahan: varchar("kelurahan", { length: 100 }),
    kecamatan: varchar("kecamatan", { length: 100 }),
    city: varchar("city", { length: 100 }),
    province: varchar("province", { length: 100 }),
    postalCode: varchar("postal_code", { length: 10 }),
    parentName: varchar("parent_name", { length: 191 }).notNull(),
    parentRelation: varchar("parent_relation", { length: 50 }).notNull(), // Ayah/Ibu/Wali
    parentPhone: varchar("parent_phone", { length: 20 }).notNull(),
    parentEmail: varchar("parent_email", { length: 191 }).notNull(),
    parentOccupation: varchar("parent_occupation", { length: 100 }),
    previousSchool: varchar("previous_school", { length: 191 }),
    status: ppdbStatusEnum("status").default("pending").notNull(),
    adminNotes: text("admin_notes"),
    verifiedAt: timestamp("verified_at", { withTimezone: true }),
    verifiedBy: uuid("verified_by").references(() => users.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({
    regNumIdx: uniqueIndex("ppdb_reg_number_idx").on(t.registrationNumber),
    statusIdx: index("ppdb_status_idx").on(t.status),
    phoneIdx: index("ppdb_parent_phone_idx").on(t.parentPhone),
  })
);

// ==== PPDB DOCUMENTS ====
export const ppdbDocuments = pgTable("ppdb_documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  registrationId: uuid("registration_id")
    .notNull()
    .references(() => ppdbRegistrations.id, { onDelete: "cascade" }),
  documentType: documentTypeEnum("document_type").notNull(),
  fileUrl: text("file_url").notNull(),
  fileName: varchar("file_name", { length: 255 }),
  fileSize: integer("file_size"),
  mimeType: varchar("mime_type", { length: 100 }),
  isVerified: boolean("is_verified").default(false).notNull(),
  verificationNotes: text("verification_notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ==== NOTIFICATION LOGS ====
export const notificationLogs = pgTable("notification_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  registrationId: uuid("registration_id").references(() => ppdbRegistrations.id, {
    onDelete: "set null",
  }),
  channel: notificationChannelEnum("channel").notNull(),
  eventType: varchar("event_type", { length: 50 }).notNull(), // e.g. "registration_created", "status_verified"
  recipient: varchar("recipient", { length: 191 }).notNull(),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  status: notificationStatusEnum("status").default("queued").notNull(),
  errorMessage: text("error_message"),
  providerMessageId: varchar("provider_message_id", { length: 191 }),
  retryCount: integer("retry_count").default(0).notNull(),
  sentAt: timestamp("sent_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ==== SITE SETTINGS (key-value) ====
export const siteSettings = pgTable(
  "site_settings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    key: varchar("key", { length: 100 }).notNull(),
    value: text("value").notNull(),
    category: varchar("category", { length: 50 }).default("general").notNull(),
    description: text("description"),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({
    keyIdx: uniqueIndex("site_settings_key_idx").on(t.key),
  })
);

// ==== PPDB COUNTER (untuk generate registrationNumber atomic) ====
export const ppdbCounters = pgTable(
  "ppdb_counters",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    year: integer("year").notNull(),
    lastNumber: integer("last_number").default(0).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({
    yearIdx: uniqueIndex("ppdb_counters_year_idx").on(t.year),
  })
);
```

### Variabel Lingkungan (`.env.example`)
```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/sdsparadjai6?sslmode=require

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxx
CLERK_WEBHOOK_SECRET=whsec_xxxxxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/admin/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/admin/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/admin

# Bunny CDN & Storage
BUNNY_STORAGE_ZONE=sdsparadjai6-storage
BUNNY_STORAGE_ACCESS_KEY=xxxxxxxx
BUNNY_STORAGE_REGION=storage.bunnycdn.com
BUNNY_CDN_URL=https://sdsparadjai6.b-cdn.net
BUNNY_STREAM_LIBRARY_ID=123456
BUNNY_STREAM_API_KEY=xxxxxxxx

# Resend (Email Notifikasi)
RESEND_API_KEY=re_xxxxxxxx
RESEND_FROM_EMAIL=no-reply@sdsparadjai6.sch.id
RESEND_FROM_NAME="SDS Paradjai VI"

# WhatsApp Gateway (Fonnte)
FONNTE_API_TOKEN=xxxxxxxx
FONNTE_API_URL=https://api.fonnte.com/send

# Upstash Redis (Rate Limit)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxxxxx

# Seed / Super Admin Initial
SUPER_ADMIN_EMAIL=admin@sdsparadjai6.sch.id
```

---

## 11. Tahapan Pengerjaan & Task Breakdown (Actionable Work Breakdown Structure)
*Daftar tugas terstruktur dan terurut (Atomic Tasks) dengan format checklist markdown. Dirancang khusus agar pengguna dapat menginstruksikan AI Coding Assistant (Antigravity, Cursor, Claude Code, Roo Code, dll.) untuk mengeksekusi proyek langkah demi langkah secara terukur, modular, dan bebas dari kehabisan context window.*

### Tahap 1: Fondasi Proyek, UI/UX, & Seluruh Halaman Publik + Admin (Dummy Data)
*Tujuan: Membangun seluruh antarmuka visual secara 100% lengkap dan responsif menggunakan data dummy sebelum menyentuh database.*
- [ ] **Task 1.1 (Foundations & Design System)**: Init project Next.js 15 App Router + TypeScript + Tailwind CSS v4. Setup CSS variables sesuai Bab 4 (Primary HSL(160,65%,38%), Secondary HSL(45,93%,55%), Accent HSL(200,85%,50%), Success/Warning/Destructive). Load font Plus Jakarta Sans & Inter via `next/font`. Install & konfigurasi shadcn/ui (Button, Card, Input, Textarea, Dialog, Sheet, Table, Badge, Dropdown, Tabs, Toast, Select, Checkbox, Separator, Avatar, Progress, Skeleton). Install `lucide-react`, `framer-motion`, `react-hook-form`, `zod`, `@hookform/resolvers`, `sanitize-html`.
- [ ] **Task 1.2 (Global Layouts & Persistent Navigation)**: Buat `app/layout.tsx` root, `components/public/PublicHeader.tsx` + `PublicFooter.tsx` (nav responsif dengan Sheet drawer mobile), `components/public/WhatsAppFab.tsx` (FAB melayang), `components/admin/AdminSidebar.tsx` + `AdminHeader.tsx` (sidebar fixed + Sheet di mobile), dan `app/admin/layout.tsx` yang membungkus semua halaman admin.
- [ ] **Task 1.3 (Halaman Publik Utama - Dummy Data)**: Buat seluruh halaman publik: `/` (Hero, Sambutan Kepsek, Program Unggulan, 3 Berita Terbaru, Highlight Ekskul, CTA PPDB), `/tentang` (Sejarah, Visi, Misi, Struktur), `/berita` (grid + filter kategori + search + pagination dummy), `/berita/[slug]` (detail dengan share WhatsApp), `/guru` (grid kartu guru), `/ekstrakurikuler` (grid ekskul), `/galeri` (grid dengan filter + lightbox modal), `/kontak` (peta, alamat, form kontak via WA), `/kebijakan-privasi`, `/syarat-ketentuan`. Semua konten dari file `data/dummy/`. Wajib lengkap & bukan placeholder.
- [ ] **Task 1.4 (Halaman PPDB Publik - Dummy Data)**: Buat `/ppdb` (alur, syarat, jadwal, tombol daftar), `/ppdb/daftar` (form multi-step: Data Diri → Orang Tua → Alamat → Unggah Berkas → Konfirmasi) dengan `react-hook-form` + Zod + progress indicator, `/ppdb/sukses/[registrationNumber]` (nomor registrasi, ringkasan, tombol "Kirim Data ke WhatsApp Admin" yang generate URL wa.me dengan template pesan terisi data dummy), dan `/ppdb/status` (form cek status).
- [ ] **Task 1.5 (Halaman Admin - Dummy Data)**: Buat seluruh halaman admin dengan mockup data interaktif: `/admin` (dashboard statistik + grafik line dummy + tabel aktivitas), `/admin/berita` (tabel + filter + modal form CRUD dummy), `/admin/berita/baru` & `/admin/berita/[id]/edit`, `/admin/guru` (+ form), `/admin/fasilitas` (+ form), `/admin/ekstrakurikuler` (+ form), `/admin/galeri` (+ form upload dummy), `/admin/ppdb` (tabel dengan filter status & search + pagination), `/admin/ppdb/[id]` (detail + preview berkas dummy + tombol verifikasi + ubah status), `/admin/notifikasi` (log riwayat), `/admin/pengaturan` (form nomor WhatsApp + template pesan + info sekolah). Semua tabel menggunakan shadcn `Table`, form menggunakan `Dialog`/`Sheet`, interaksi lokal dengan Zustand atau `useState`.

### Tahap 2: Database, Autentikasi Clerk, Server Actions, & Data Dinamis
*Tujuan: Menghidupkan aplikasi dengan database nyata, sistem autentikasi pengguna, dan API/Server Actions.*
- [ ] **Task 2.1 (Database Schema, Migrations & Seed)**: Buat file `src/db/schema.ts` sesuai Bab 10 (tabel: `users`, `news`, `teachers`, `facilities`, `extracurriculars`, `galleries`, `ppdb_registrations`, `ppdb_documents`, `notification_logs`, `site_settings`, `ppdb_counters`) dengan seluruh enum, index, dan relasi. Setup `drizzle.config.ts` dengan `DATABASE_URL` dari Neon. Jalankan `drizzle-kit generate` & `push`. Buat `scripts/seed.ts` untuk mengisi data dummy Bahasa Indonesia (5 berita, 8 guru, 12 fasilitas, 6 ekstrakurikuler, 15 galeri, 3 pendaftar PPDB contoh, dan site_settings: `whatsapp_number`, `whatsapp_template`, `email_subject_*`).
- [ ] **Task 2.2 (Authentication Clerk & Route Middleware)**: Setup Clerk provider di `app/layout.tsx`, konfigurasi halaman login/signup di `/admin/login` & `/admin/signup` dengan tampilan custom branding sekolah. Buat `middleware.ts` yang memproteksi route `/admin/*` (kecuali `/admin/login` & `/admin/signup`). Buat webhook handler `app/api/webhooks/clerk/route.ts` untuk sync user `user.created` & `user.updated` ke tabel `users` dengan default role `admin`. Buat helper `requireRole("admin" | "super_admin")`. Buat script seeding Super Admin pertama (`SUPER_ADMIN_EMAIL`).
- [ ] **Task 2.3 (Server Actions & Validasi CRUD)**: Buat seluruh Server Actions di folder `src/server/actions/` dengan validasi Zod + proteksi role: `news.ts` (create/update/delete/publish/toggle), `teachers.ts`, `facilities.ts`, `extracurriculars.ts`, `galleries.ts`, `ppdb.ts` (createRegistration dengan generator `registrationNumber` atomic via `ppdb_counters`, `updateStatus`, `verifyDocument`, `getRegistrationByNumber`), `settings.ts` (update WhatsApp number & templates), `notifications.ts` (log & retry). Buat juga route `app/api/upload/route.ts` untuk unggah berkas (foto & dokumen) ke Bunny Storage dengan validasi MIME (jpg/png/pdf) dan size ≤ 2 MB.
- [ ] **Task 2.4 (Frontend Data Binding & Mutations)**: Hubungkan seluruh halaman publik (Beranda, Berita, Detail Berita, Guru, Ekstrakurikuler, Galeri, Kontak) dengan query Drizzle Server Actions / `unstable_cache` (revalidate 300s). Hubungkan semua halaman PPDB dengan Server Action `createRegistration` + route `/api/upload`. Hubungkan seluruh halaman Admin dengan TanStack Query v5 memanggil Server Actions (query & mutation + optimistic update + toast). Implementasi cek status PPDB mandiri di `/ppdb/status` dengan rate limit Upstash Redis.

### Tahap 3: Integrasi Notifikasi (WhatsApp & Email), SEO, Keamanan, Testing & Deployment
*Tujuan: Menyempurnakan integrasi notifikasi, optimasi performa, keamanan, dan rilis ke production.*
- [ ] **Task 3.1 (Integrasi Resend Email & Fonnte WhatsApp)**: Setup React Email templates di `src/emails/` (`RegistrationCreatedEmail`, `StatusVerifiedEmail`, `StatusAcceptedEmail`, `StatusRejectedEmail`). Buat `src/lib/email/resend.ts` dan `src/lib/whatsapp/fonnte.ts`. Buat orkestrator `src/server/notifications/sendNotification.ts` yang membaca template dari `site_settings` (placeholder: `{nama_sekolah}`, `{nama_anak}`, `{nomor_registrasi}`, `{tanggal_daftar}`, `{nama_orang_tua}`), mengirim via Resend + Fonnte, dan mencatat ke `notification_logs`. Trigger otomatis saat pendaftaran baru & saat admin ubah status. Buat retry job maks 3x.
- [ ] **Task 3.2 (Non-Functional: SEO, Keamanan & Performa)**: Buat `app/sitemap.ts` dinamis (berita, guru, ekstrakurikuler), `app/robots.ts` (Disallow `/admin`), metadata dinamis per halaman via `generateMetadata`, Open Graph image dinamis via `app/api/og/route.tsx`, JSON-LD `EducationalOrganization` & `Article`. Terapkan `sanitize-html` pada render konten berita. Aktifkan rate limit Upstash pada `/ppdb/status` & `/ppdb/daftar`. Pasang `next/image` dengan remotePatterns Bunny CDN. Lazy load `GaleriLightbox` & Dashboard chart via `next/dynamic`. Terapkan ISR revalidate 300 pada halaman publik.
- [ ] **Task 3.3 (End-to-End Testing & Bugfix)**: Uji alur pengguna lengkap: kunjungi beranda → filter berita → buka detail → submit form PPDB (unggah berkas) → cek halaman sukses → klik WA → cek status via nomor registrasi. Uji alur admin: login Clerk → tambah/edit/hapus berita, guru, fasilitas, ekskul, galeri → verifikasi berkas pendaftar → ubah status → cek notifikasi email & WA terkirim (log). Perbaiki error TypeScript, responsive glitches di mobile (khusus form PPDB multi-step), optimasi query Drizzle (N+1, index), dan polish animasi Framer Motion.
- [ ] **Task 3.4 (Production Build & Deployment)**: Konfigurasi `.env.production` lengkap (Neon production branch, Clerk production keys, Bunny, Resend, Fonnte). Jalankan `npm run build` hingga bersih. Deploy ke Vercel (recommended) dengan domain kustom. Verifikasi webhook Clerk & Bunny production aktif. Set up Uptime monitoring & alert Slack/Email untuk error 5xx. Backup otomatis Neon (daily).

---

## 12. Master Starter Prompt (Siap Coding untuk AI Agent)
*Salin prompt di bawah ini ke AI Coding Assistant (Google Antigravity / Cursor / Claude Code / GitHub Copilot / Roo Code / dll.) untuk memulai pengerjaan:*
```markdown
Halo! Kamu berperan sebagai Senior Fullstack Architect dan Lead Developer.
Saya ingin membangun aplikasi berdasarkan dokumen PRD ini: Portal Informasi & PPDB Online "SDS PARADAJI VI".

Silakan baca file @PRD.md secara menyeluruh terlebih dahulu.

ATURAN EKSEKUSI (WAJIB DIPATUHI):
1. JANGAN PERNAH membuat semua kode atau file sekaligus dalam satu waktu agar tidak terjadi error atau kehabisan token.
2. Kerjakan proyek ini secara BERTAHAP PER FASE (milestone) sesuai Bab 11 PRD:
   - FASE 1 = Tahap 1 (Task 1.1 s/d Task 1.5): Fondasi proyek, Design System, seluruh UI publik & admin dengan DUMMY DATA.
   - FASE 2 = Tahap 2 (Task 2.1 s/d Task 2.4): Database Neon + Drizzle, Autentikasi Clerk, Server Actions, & data dinamis.
   - FASE 3 = Tahap 3 (Task 3.1 s/d Task 3.4): Integrasi WhatsApp (Fonnte) & Email (Resend), SEO/Keamanan, Testing, & Deployment.
3. SELESAIKAN SATU FASE PENUH SECARA MANDIRI dalam satu putaran pengerjaan. Setelah seluruh Task dalam 1 Fase selesai, BERHENTI dan laporkan:
   - Daftar file yang dibuat/diubah.
   - Fitur yang telah selesai dan siap dites.
   - Hasil `npm run dev` / `npm run build` bila memungkinkan.
   - Kendala atau asumsi yang diambil.
4. Setelah melaporkan hasil 1 Fase, TUNGGU instruksi konfirmasi saya (user) sebelum melanjutkan ke Fase berikutnya. JANGAN lanjut otomatis.
5. Selalu patuhi tech stack: Next.js 15 App Router, Clerk Auth (Email & Password), Neon PostgreSQL + Drizzle ORM, Bunny Stream/CDN, Tailwind CSS v4, shadcn/ui, Resend, Fonnte WhatsApp API, Upstash Redis.
6. WAJIB patuhi Pedoman UI/UX Design System di Bab 4 (warna Primary Hijau Edukasi HSL(160,65%,38%), font Plus Jakarta Sans & Inter, rounded-2xl, shadow-sm → hover shadow-lg, FAB WhatsApp hijau #25D366).
7. WAJIB gunakan data dummy berbahasa Indonesia sesuai Bab 9 — DILARANG memakai "Lorem Ipsum" atau membuat "Halaman Placeholder / Sedang Dalam Pengembangan". Semua halaman harus lengkap secara UI sejak Fase 1.
8. Gunakan nama sekolah "SDS PARADAJI VI" di seluruh teks, meta, logo placeholder, dan template pesan WhatsApp.

Jika kamu sudah membaca dan memahami PRD ini, silakan berikan ringkasan singkat pemahamanmu (terutama struktur 3 Fase di Bab 11, tech stack, dan Design System), lalu tanyakan kesiapan saya untuk memulai eksekusi dari **Fase 1 (Task 1.1)**!
```
