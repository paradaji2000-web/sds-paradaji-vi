---
description: Panduan autentikasi Clerk, middleware route protection, sinkronisasi webhook, otorisasi peran RBAC, dan proteksi keamanan sistem.
trigger: glob
globs: "**/src/{middleware.ts,lib/auth/**,api/webhooks/**}"
---

# SDS Paradjai VI — Autentikasi Clerk, Otorisasi RBAC, & Protokol Keamanan

Panduan ini mengatur implementasi keamanan sistem, autentikasi admin via Clerk, proteksi rute middleware, sinkronisasi webhook database, dan mitigasi risiko keamanan.

---

## 1. Konfigurasi Clerk Authentication
- **Metode**: Email & Password (tanpa registrasi publik terbuka).
- **Halaman Login Admin**: `/admin/login` (tampilan khusus branding SDS Paradjai VI).
- **Pengalihan Pasca Login**: Otomatis menuju `/admin`.
- **Environment Variables**:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`
  - `CLERK_WEBHOOK_SECRET`

---

## 2. Middleware Proteksi Rute (`src/middleware.ts`)

- **Rute yang Diproteksi**: Seluruh jalur `/admin/*`.
- **Rute Pengecualian (Public Auth)**: `/admin/login` dan `/admin/signup`.
- **Alur Pemeriksaan**:
  1. Jika pengguna mengakses `/admin/*` tanpa sesi login Clerk aktif → alihkan ke `/admin/login`.
  2. Jika sesi Clerk valid → ambil data pengguna dari basis data `users` berdasarkan `clerkUserId`.
  3. Jika akun tidak terdaftar di tabel `users` atau `isActive === false` → lakukan logout paksa dan tampilkan pesan: *"Akun Anda belum diaktifkan oleh Super Admin."*

---

## 3. Sinkronisasi Webhook Clerk (`/api/webhooks/clerk`)

- **Verifikasi Signature**: Wajib memverifikasi tanda tangan webhook Svix menggunakan `CLERK_WEBHOOK_SECRET`.
- **Penanganan Event**:
  - `user.created`: Masukkan data ke tabel `users`.
    - Jika email pengguna cocok dengan `SUPER_ADMIN_EMAIL`, set `role: "super_admin"`.
    - Jika tidak, set `role: "admin"`.
  - `user.updated`: Perbarui nama lengkap, email, dan foto avatar di tabel `users`.
  - `user.deleted`: Set `isActive: false` (soft deactivate) pada tabel `users`.

---

## 4. Otorisasi Berbasis Peran (RBAC)

| Kemampuan / Halaman | Admin Biasa | Super Admin |
| :--- | :---: | :---: |
| CRUD Berita, Guru, Fasilitas, Ekskul, Galeri | ✅ | ✅ |
| Lihat Daftar & Detail Pendaftar PPDB | ✅ | ✅ |
| Verifikasi Berkas & Ubah Status PPDB | ✅ | ✅ |
| Lihat Riwayat Notifikasi (`/admin/notifikasi`) | ✅ | ✅ |
| Akses Pengaturan Sistem (`/admin/pengaturan`) | ❌ | ✅ |
| Ubah Nomor WhatsApp & Template Pesan | ❌ | ✅ |
| Kelola Akun Admin Lain | ❌ | ✅ |

Helper proteksi peran di `src/lib/auth/roles.ts`:
```typescript
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCurrentAppUser() {
  const { userId } = await auth();
  if (!userId) return null;
  return await db.query.users.findFirst({
    where: eq(users.clerkUserId, userId),
  });
}

export async function requireAdmin() {
  const user = await getCurrentAppUser();
  if (!user || !user.isActive) throw new Error("Akses ditolak: Hanya Admin aktif.");
  return user;
}

export async function requireSuperAdmin() {
  const user = await requireAdmin();
  if (user.role !== "super_admin") throw new Error("Akses ditolak: Membutuhkan hak Super Admin.");
  return user;
}
```

---

## 5. Protokol Keamanan Data & Anti-Brute-Force

1. **Rate Limiting (Upstash Redis)**:
   - Endpoint Cek Status `/ppdb/status`: Maksimal **5 percobaan per IP per 10 menit**.
   - Endpoint Submit PPDB `/ppdb/daftar`: Maksimal **3 submit per IP per 10 menit**.
2. **Anti-Duplikasi Data PPDB**:
   - Mencegah submission ganda dengan kombinasi identik (`parentPhone` + `fullName` + `birthDate`) dalam rentang 24 jam.
3. **Proteksi XSS**:
   - Seluruh rendering teks konten berita yang mendukung format HTML/Markdown wajib melewati `sanitize-html`.
4. **Keamanan Berkas**:
   - Berkas dokumen PPDB disimpan secara privat di Bunny Storage dan disajikan melalui Signed URL atau proxy terotentikasi, tidak diakses publik sembarangan.
