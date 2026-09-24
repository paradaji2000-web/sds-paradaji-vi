---
description: Panduan skema basis data Neon PostgreSQL + Drizzle ORM, Server Actions, validasi Zod, dan relasi tabel SDS Paradjai VI.
trigger: glob
globs: "**/src/{db,server}/**/*.{ts,tsx}"
---

# SDS Paradjai VI — Panduan Basis Data & Server Actions (Drizzle ORM)

Panduan ini mengatur struktur basis data PostgreSQL (Neon Serverless), skema Drizzle ORM, konvensi Server Actions, dan pengelolaan transaksi data.

---

## 1. Konfigurasi Basis Data
- **Provider**: Neon PostgreSQL (Serverless).
- **ORM**: Drizzle ORM (`drizzle-orm`, `drizzle-kit`).
- **File Skema Utama**: `src/db/schema.ts`.
- **Koneksi**: `src/db/index.ts` menggunakan `@neondatabase/serverless`.

---

## 2. Definisi Enum & 11 Tabel Inti

### A. Enum PostgreSQL
```typescript
export const roleEnum = pgEnum("role", ["admin", "super_admin"]);
export const newsCategoryEnum = pgEnum("news_category", ["berita", "kegiatan", "pengumuman"]);
export const ppdbStatusEnum = pgEnum("ppdb_status", ["pending", "verified", "accepted", "rejected"]);
export const documentTypeEnum = pgEnum("document_type", ["kk", "akta", "foto", "ijazah", "kip"]);
export const notificationChannelEnum = pgEnum("notification_channel", ["whatsapp", "email"]);
export const notificationStatusEnum = pgEnum("notification_status", ["queued", "sent", "failed"]);
```

### B. Ringkasan 11 Tabel
1. **`users`**: Menyimpan data akun admin yang disinkronkan dari Clerk via webhook.
   - Kolom kunci: `id (UUID PK)`, `clerkUserId (unique)`, `email (unique)`, `fullName`, `role (enum)`, `isActive`.
2. **`news`**: Berita, kegiatan, dan pengumuman sekolah.
   - Kolom kunci: `id`, `title`, `slug (unique)`, `excerpt`, `content (text)`, `thumbnailUrl`, `category`, `isPublished`, `publishedAt`, `authorId (FK users)`.
3. **`teachers`**: Profil guru dan tenaga pendidik.
   - Kolom kunci: `id`, `name`, `slug (unique)`, `position`, `subject`, `education`, `bio`, `photoUrl`, `displayOrder`, `isActive`.
4. **`facilities`**: Fasilitas dan sarana prasarana sekolah.
   - Kolom kunci: `id`, `name`, `slug (unique)`, `category`, `description`, `imageUrl`, `displayOrder`, `isActive`.
5. **`extracurriculars`**: Daftar kegiatan ekstrakurikuler.
   - Kolom kunci: `id`, `name`, `slug (unique)`, `description`, `schedule`, `coach`, `imageUrl`, `displayOrder`, `isActive`.
6. **`galleries`**: Dokumentasi foto fasilitas & kegiatan.
   - Kolom kunci: `id`, `title`, `imageUrl`, `category`, `description`, `displayOrder`, `isActive`.
7. **`ppdb_registrations`**: Data utama pendaftar PPDB Online.
   - Kolom kunci: `id`, `registrationNumber (unique, e.g. PPDB-2025-0001)`, `fullName`, `nisn`, `gender (L/P)`, `birthPlace`, `birthDate`, `address`, `parentName`, `parentRelation`, `parentPhone`, `parentEmail`, `status (enum)`, `adminNotes`, `verifiedBy (FK users)`, `verifiedAt`.
8. **`ppdb_documents`**: Berkas unggahan pendaftar (KK, Akta, Foto, Ijazah).
   - Kolom kunci: `id`, `registrationId (FK ppdb_registrations on cascade delete)`, `documentType (enum)`, `fileUrl`, `fileName`, `fileSize`, `mimeType`, `isVerified (boolean)`, `verificationNotes`.
9. **`notification_logs`**: Rekap riwayat notifikasi email/WhatsApp.
   - Kolom kunci: `id`, `registrationId (FK)`, `channel (whatsapp/email)`, `eventType`, `recipient`, `subject`, `message`, `status (queued/sent/failed)`, `errorMessage`, `retryCount`.
10. **`site_settings`**: Pengaturan dinamis sistem (key-value).
    - Kolom kunci: `key (unique, e.g. whatsapp_number, whatsapp_template)`, `value`, `category`, `description`.
11. **`ppdb_counters`**: Counter atomic untuk nomor registrasi tahunan.
    - Kolom kunci: `year (unique)`, `lastNumber (integer)`.

---

## 3. Aturan Server Actions (`src/server/actions/`)

### A. Format Kembalian Standar (Standard Return Pattern)
Seluruh Server Actions wajib mengembalikan objek konsisten:
```typescript
export type ActionResult<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };
```

### B. Validasi Input Zod
- Wajib memvalidasi setiap payload mutasi dengan Zod schema sebelum menyentuh database.
- Contoh validasi nomor telepon Indonesia:
  ```typescript
  const phoneSchema = z.string().regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/, "Format nomor WhatsApp tidak valid");
  ```

### C. Generator Nomor Registrasi Atomic
Nomor registrasi PPDB digenerate di sisi server menggunakan atomic update pada tabel `ppdb_counters`:
```typescript
// Format: PPDB-{TAHUN}-{4 DIGIT URUT}, contoh: PPDB-2025-0042
const year = new Date().getFullYear();
// Lakukan sql update counter atomic: UPDATE ppdb_counters SET last_number = last_number + 1 WHERE year = $1 RETURNING last_number;
```

### D. Otorisasi Peran (Role Checking)
Setiap Server Action admin wajib memanggil helper otorisasi:
```typescript
import { requireAdmin, requireSuperAdmin } from "@/lib/auth/roles";

export async function deleteNewsAction(id: string) {
  await requireAdmin(); // Throw error jika bukan admin
  // Eksekusi mutasi
}
```

---

## 4. Konvensi Unggah Berkas (`/api/upload`)
- Batas ukuran berkas maksimal **2 MB**.
- Format MIME yang diterima: `image/jpeg`, `image/png`, `application/pdf`.
- Berkas disimpan ke **Bunny Storage** menggunakan `@bunny.net/storage-sdk`.
- Dilarang menyimpan berkas unggahan langsung di folder `public/` lokal pada mode production.
