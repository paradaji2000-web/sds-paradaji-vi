---
description: Protokol utama proyek SDS Paradjai VI, eksekusi bertahap 3 Fase sesuai Bab 11 PRD, larangan Lorem Ipsum, dan aturan copywriting.
trigger: always_on
---

# SDS Paradjai VI — Panduan Utama & Protokol Pengerjaan

Dokumen aturan ini berlaku secara global (**Always On**) untuk seluruh interaksi pengembangan aplikasi **SDS Paradjai VI — Portal Informasi & PPDB Online**.

---

## 1. Ringkasan & Identitas Aplikasi
- **Nama Aplikasi**: SDS PARADAJI VI — Portal Informasi & PPDB Online
- **Tujuan**: Website resmi SDS Paradjai VI untuk profil sekolah, berita, ekstrakurikuler, dan fasilitas, sekaligus sistem pendaftaran PPDB online dengan verifikasi berkas oleh admin dan tindak lanjut otomatis via WhatsApp.
- **Peran Pengguna (Roles)**:
  1. **Pengunjung Umum**: Melihat profil, berita, guru, fasilitas, ekskul, kontak.
  2. **Calon Orang Tua/Murid**: Mengisi formulir PPDB online, verifikasi status, kirim data via WhatsApp.
  3. **Admin Sekolah**: Mengelola konten (CRUD Berita, Guru, Fasilitas, Ekskul, Galeri) dan memverifikasi berkas pendaftar PPDB.
  4. **Super Admin**: Mengatur nomor WhatsApp tujuan, template pesan, pengaturan sekolah, dan hak akses admin lain.

---

## 2. Batasan Scope MVP (Mencegah Scope Creep)
### ✅ Yang Dikerjakan:
- Halaman publik lengkap (Beranda, Tentang Kami, Berita & Detail, Guru, Ekskul, Galeri, Kontak, PPDB, Status).
- Tombol WhatsApp pintar (`wa.me` dengan template pesan otomatis).
- Formulir PPDB online multi-step dengan unggah berkas (KK, Akta, Foto, Ijazah/KIP).
- Autentikasi Admin & Super Admin via Clerk (Email & Password).
- Dashboard Admin & manajemen pendaftar PPDB dengan preview berkas.
- Notifikasi WhatsApp (Fonnte/Wablas) dan Email (Resend).
- SEO dasar, Open Graph, dynamic sitemap, dan responsif mobile-first.

### ⛔ Yang Ditunda (Bukan Bagian dari MVP):
- Payment gateway online (pendaftaran PPDB awal tidak memungut biaya via sistem).
- Portal Siswa/Guru untuk nilai dan absensi kelas.
- Integrasi SIAKAD/Dapodik/EMIS Kemenag.
- Sistem multi-tenant (hanya untuk SDS Paradjai VI).
- Aplikasi native mobile (iOS/Android).

---

## 3. Protokol Eksekusi Bertahap (3 Fase Bab 11 PRD)

> [!IMPORTANT]
> **ATURAN EKSEKUSI MUTLAK**:
> 1. **DILARANG** membuat seluruh kode atau file sekaligus dalam satu putaran agar context window tidak habis atau terjadi halusinasi.
> 2. Pengerjaan proyek **WAJIB** dibagi menjadi 3 Fase berurutan sesuai Bab 11 PRD:
>    - **FASE 1 (Task 1.1 s/d 1.5)**: Fondasi Next.js 15, Design System, seluruh UI halaman publik dan admin 100% lengkap menggunakan DUMMY DATA.
>    - **FASE 2 (Task 2.1 s/d 2.4)**: Setup Database Neon + Drizzle ORM, Autentikasi Clerk, Server Actions, dan data binding dinamis.
>    - **FASE 3 (Task 3.1 s/d 3.4)**: Integrasi WhatsApp Fonnte & Email Resend, SEO, Keamanan, Testing & Deployment.
> 3. Setelah menyelesaikan seluruh tugas dalam 1 Fase, **BERHENTI** dan laporkan hasilnya ke pengguna:
>    - Daftar file yang dibuat/diubah.
>    - Fitur yang selesai dan siap diuji.
>    - Status dev server / linting.
> 4. **TUNGGU KONFIRMASI PENGGUNA** sebelum masuk ke Fase berikutnya. Jangan melompat otomatis.

---

## 4. Standar Bahasa, Copywriting, & Anti-Lorem Ipsum

- **Gaya Bahasa**: Profesional, hangat, ramah anak, dan membumi (gunakan kata ganti "Anda" dan "Kami").
- **DILARANG MENGGUNAKAN "LOREM IPSUM"**:
  - Dilarang membuat teks acak atau placeholder seperti "Lorem ipsum dolor sit amet", "Sample text", atau "Halaman sedang dalam pengembangan".
  - Semua halaman dan komponen harus menyajikan data dummy Bahasa Indonesia yang kontekstual dan realistis (nama guru asli, berita kegiatan sekolah riil, ekstrakurikuler Pramuka/Tahfidz, fasilitas ruang ber-AC, dll.).
- **Nama Sekolah**: Selalu gunakan ejaan resmi: **"SDS PARADAJI VI"** di seluruh judul, metadata, navigasi, dan template notifikasi.
