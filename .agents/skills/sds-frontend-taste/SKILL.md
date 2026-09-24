---
name: sds-frontend-taste
description: Workflow panduan perancangan visual antarmuka (UI/UX) anti-slop khusus portal sekolah dan sistem PPDB SDS Paradjai VI. Memastikan estetika modern, hangat, ramah anak, bebas dari template AI generik, mematuhi palet warna hijau edukasi HSL(160, 65%, 38%), dan lolos checklist pre-flight.
---

# Antigravity Skill: SDS Paradjai VI Frontend Taste

Skill ini diaktifkan saat merancang, membangun, atau mereview halaman web, komponen antarmuka, dan alur interaksi visual pada proyek **SDS PARADAJI VI**.

Skill ini memastikan setiap tampilan:
1. Tidak terlihat seperti template AI murahan (anti-slop).
2. Mematuhi identitas sekolah Islam-modern yang hangat, ramah anak, dan terpercaya.
3. Responsif sempurna di perangkat mobile calon orang tua murid.

---

## 1. Langkah 1: Deklarasi "Design Read" Sebelum Menulis Kode

Sebelum membuat file atau komponen baru, nyatakan dalam satu kalimat ringkas:
> **"Reading this as: [Halaman/Komponen] untuk [Target Audiens], bernuansa cerah & hangat, dengan aksen Hijau Edukasi SDS Paradjai VI."**

Contoh:
- *"Reading this as: Formulir PPDB multi-step untuk calon orang tua murid di smartphone, dengan indikator progress bertahap, validasi jelas, dan tombol konfirmasi WhatsApp."*
- *"Reading this as: Halaman detail berita prestasi sekolah dengan tipografi Plus Jakarta Sans yang tegas, tombol share WhatsApp, dan kartu berita terkait."*

---

## 2. Langkah 2: Evaluasi Dial Visual

Terapkan nilai dial berikut:
- **`DESIGN_VARIANCE: 7`**:
  - Gunakan ritme layout yang hidup: bento grid bertingkat, kartu berita utama berukuran lebih besar (featured), aksen kutipan kepala sekolah berbingkai halus.
  - Hindari grid kaku 3 kolom identik yang membosankan.
- **`MOTION_INTENSITY: 5`**:
  - Animasi fade-up lembut saat elemen masuk viewport (`initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}`).
  - Efek hover mikro pada tombol dan kartu (`scale: 1.02` atau `-translate-y-1`).
  - Dilarang membuat animasi berputar atau memantul terus-menerus tanpa jeda.
- **`VISUAL_DENSITY: 4`**:
  - Berikan spasi vertikal yang lega (`py-16 sm:py-20`).
  - Berikan ruang bernapas antar paragraf (`leading-relaxed`).

---

## 3. Langkah 3: Eksekusi Komponen & Design Tokens

Gunakan token resmi SDS Paradjai VI:
- **Primary (Hijau Edukasi)**: `HSL(160, 65%, 38%)` (Class: `text-primary`, `bg-primary`, `border-primary`).
- **Secondary (Kuning Madu)**: `HSL(45, 93%, 55%)` (Class: `bg-secondary text-secondary-foreground`).
- **Accent (Biru Langit)**: `HSL(200, 85%, 50%)`.
- **Tombol WhatsApp**: Selalu gunakan warna resmi WhatsApp `bg-[#25D366] text-white hover:bg-[#20bd5a]`.
- **Card**: `rounded-2xl border border-border/70 bg-card shadow-sm hover:shadow-lg transition-all duration-200`.
- **Tipografi**: Headings wajib `font-sans` (`Plus Jakarta Sans`), body teks `Inter`.

---

## 4. Langkah 4: Penulisan Konten (Strict Indonesian Dummy Data)

- **DILARANG MENGGUNAKAN "LOREM IPSUM" ATAU KATA BAHASA INGGRIS GENERIK**.
- Selalu gunakan data nyata sekolah:
  - Berita: *"Siswa SDS Paradjai VI Raih Juara 1 Lomba Cerdas Cermat Tingkat Kecamatan"*
  - Guru: *"Ibu Siti Nurhaliza, S.Pd. - Kepala Sekolah"*
  - Ekskul: *"Tahfidz Al-Qur'an", "Pramuka Siaga", "Dokter Kecil & UKS"*
  - Fasilitas: *"Laboratorium Komputer Modern", "Perpustakaan Ramah Anak"*

---

## 5. Langkah 5: Pre-Flight Verification Checklist

Sebelum menyerahkan hasil pengerjaan ke user, periksa:
- [ ] Apakah halaman ini terlihat unik dan ramah anak, bukan sekadar template AI abu-abu?
- [ ] Apakah kontras warna teks dan tombol memenuhi standar WCAG AA?
- [ ] Apakah tombol sentuh di layar HP minimal berukuran 44x44 px?
- [ ] Apakah tombol WhatsApp menghasilkan tautan `wa.me` yang valid dengan pesan terisi?
- [ ] Apakah seluruh gambar menggunakan komponen `<Image>` Next.js dengan aspek rasio rapi?
- [ ] Apakah console browser bersih dari pesan error hidrasi?
