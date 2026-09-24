---
description: Integrasi WhatsApp Fonnte/Wablas, generator tautan wa.me dinamis, email notifikasi Resend, dan Bunny Storage CDN.
trigger: model_decision
---

# SDS Paradjai VI — Integrasi WhatsApp, Email Notifikasi, & Media Storage

Panduan ini mengatur integrasi pihak ketiga untuk komunikasi WhatsApp, pengiriman email transaksional, pencatatan audit notifikasi, dan pengelolaan media CDN.

---

## 1. Generator Tautan WhatsApp Langsung (`wa.me`)

Fitur tombol "Tanya via WhatsApp" dan "Kirim Data ke WhatsApp Admin" menghasilkan URL `wa.me` langsung yang membuka chat ke nomor admin sekolah dengan pesan terformat rapi:

### Format URL:
```text
https://wa.me/{nomorTujuan}?text={encodeURIComponent(pesan)}
```

### Aturan & Template:
- Nomor tujuan diambil secara dinamis dari tabel `site_settings` dengan kunci `whatsapp_number`. Format internasional tanpa tanda `+` (contoh: `6281234567890`).
- Template mendukung substitusi placeholder dinamis:
  - `{nama_sekolah}` → SDS Paradjai VI
  - `{nomor_registrasi}` → PPDB-2025-0042
  - `{nama_anak}` → Aisyah Putri Ramadhani
  - `{nama_orang_tua}` → Bapak Rizki Ramadhan
  - `{tanggal_daftar}` → 15 Januari 2025
- **Wajib di-encode**: Selalu jalankan `encodeURIComponent()` pada teks sebelum disematkan ke URL.

---

## 2. WhatsApp Gateway Otomatis (Fonnte API)

Pemberitahuan otomatis ke nomor WhatsApp orang tua murid saat terjadi perubahan status verifikasi berkas:

- **Endpoint**: `https://api.fonnte.com/send` (POST).
- **Header**: `Authorization: process.env.FONNTE_API_TOKEN`.
- **Payload**:
  ```json
  {
    "target": "081234567890",
    "message": "Halo Bapak/Ibu Rizki, status pendaftaran ananda Aisyah di SDS Paradjai VI telah diverifikasi...",
    "countryCode": "62"
  }
  ```
- **Fallback**: Jika integrasi Fonnte mengalami kendala, sistem mendukung adapter Wablas API.

---

## 3. Email Notifikasi Transaksional (Resend + React Email)

Setiap pendaftaran dan pembaruan status memicu pengiriman email resmi dengan template seragam:

- **Provider**: Resend API (`resend` SDK).
- **Pengirim**: `process.env.RESEND_FROM_NAME <process.env.RESEND_FROM_EMAIL>` (contoh: `"SDS Paradjai VI" <no-reply@sdsparadjai6.sch.id>`).
- **Template Komponen (`src/emails/`)**:
  1. `RegistrationCreatedEmail.tsx`: Konfirmasi pengisian formulir & nomor registrasi.
  2. `StatusVerifiedEmail.tsx`: Berkas telah diperiksa dan dinyatakan valid.
  3. `StatusAcceptedEmail.tsx`: Surat kelulusan / penerimaan peserta didik baru resmi.
  4. `StatusRejectedEmail.tsx`: Informasi berkas tidak memenuhi syarat beserta catatan admin.

---

## 4. Orkestrator Notifikasi & Log Audit (`notification_logs`)

Semua notifikasi keluar wajib diorkestrasi melalui modul terpusat di `src/server/notifications/sendNotification.ts`:

```typescript
export async function sendNotification({
  registrationId,
  eventType,
  recipientPhone,
  recipientEmail,
  templateData,
}: SendNotificationParams) {
  // 1. Ambil template dari site_settings
  // 2. Format pesan WhatsApp & Subjek/Isi Email
  // 3. Catat log awal ke tabel notification_logs (status: "queued")
  // 4. Kirim WhatsApp via Fonnte & Email via Resend secara paralel
  // 5. Perbarui status log menjadi "sent" atau "failed" (dengan errorMessage)
  // 6. Jika gagal, increment retryCount (maksimal 3x percobaan)
}
```

---

## 5. Penyimpanan Berkas & Media (Bunny Storage & CDN)

- **Bunny Storage**:
  - Menggunakan package `@bunny.net/storage-sdk`.
  - Zona penyimpanan: `process.env.BUNNY_STORAGE_ZONE`.
  - Kredensial: `process.env.BUNNY_STORAGE_ACCESS_KEY`.
  - Filepath terstruktur:
    - Foto Berita: `/news/{slug}-{timestamp}.jpg`
    - Berkas Siswa PPDB: `/ppdb/{year}/{regNumber}/{documentType}-{timestamp}.pdf`
    - Foto Guru & Fasilitas: `/facilities/{slug}.jpg`
- **Bunny CDN URL**:
  - Semua URL aset publik disajikan melalui CDN: `process.env.BUNNY_CDN_URL`.
  - Konfigurasi `next.config.ts` `remotePatterns` untuk domain CDN Bunny agar gambar dioptimalkan secara otomatis oleh Next.js `<Image>`.
- **Bunny Stream**:
  - Untuk video profil sekolah atau dokumentasi kegiatan tanpa membebani server (`BUNNY_STREAM_LIBRARY_ID`).
