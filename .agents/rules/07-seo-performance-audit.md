---
description: Panduan SEO dinamis, JSON-LD schema, Open Graph, sitemap, optimasi Core Web Vitals, dan checklist audit pre-flight production.
trigger: model_decision
---

# SDS Paradjai VI — Panduan SEO, Optimasi Performa, & Checklist Pre-Flight

Panduan ini mengatur standar optimasi mesin pencari (SEO), kecepatan halaman (Core Web Vitals), data terstruktur (JSON-LD), dan checklist audit sebelum kode dirilis ke tahap produksi.

---

## 1. Konfigurasi SEO & Metadata Dinamis

### A. Template Metadata Root (`src/app/layout.tsx`)
```typescript
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "SDS PARADAJI VI — Portal Informasi & PPDB Online",
    template: "%s | SDS PARADAJI VI",
  },
  description:
    "Website resmi SDS Paradjai VI. Informasi profil sekolah, kegiatan ekstrakurikuler, berita terkini, dan pendaftaran peserta didik baru (PPDB) online.",
  keywords: ["SDS Paradjai VI", "Sekolah Dasar", "PPDB Online", "Pendidikan Karakter", "Tahfidz"],
  authors: [{ name: "SDS Paradjai VI" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "SDS PARADAJI VI",
  },
};
```

### B. Metadata Dinamis Halaman Berita (`src/app/(public)/berita/[slug]/page.tsx`)
Setiap halaman detail berita wajib mengimplementasikan `generateMetadata`:
```typescript
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const item = await getNewsBySlug(params.slug);
  if (!item) return { title: "Berita Tidak Ditemukan" };
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: [item.thumbnailUrl || "/images/og-default.jpg"],
    },
  };
}
```

---

## 2. Structured Data (Schema.org JSON-LD)

Sematkan script `<script type="application/ld+json">` pada Server Component:
- **Beranda (`/`)**: Schema `EducationalOrganization`
  - Nama: SDS PARADAJI VI
  - URL, Logo, Alamat lengkap, Nomor telepon, dan Rentang usia didik.
- **Detail Berita (`/berita/[slug]`)**: Schema `Article` / `NewsArticle`
  - Headline, Image, DatePublished, Author, Publisher info.

---

## 3. Sitemap Dinamis & Robots.txt

- **`src/app/sitemap.ts`**:
  - Halaman statis: `/`, `/tentang`, `/berita`, `/guru`, `/ekstrakurikuler`, `/galeri`, `/ppdb`, `/kontak`.
  - Halaman dinamis: Iterasi seluruh berita dengan status `isPublished === true`.
- **`src/app/robots.ts`**:
  ```typescript
  export default function robots(): MetadataRoute.Robots {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
    };
  }
  ```

---

## 4. Optimasi Performa & Core Web Vitals (CWV)

Target skor: **Mobile Performance ≥ 90, Accessibility ≥ 95**.
1. **Optimasi Gambar (`next/image`)**:
   - Selalu gunakan komponen `<Image>` Next.js dengan atribut `alt` deskriptif.
   - Tetapkan `sizes` responsif (misal: `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw`).
   - Berikan properti `priority` hanya pada gambar hero di atas layar (above the fold) untuk menjaga LCP < 2.5s.
2. **Dynamic Import Komponen Berat (`next/dynamic`)**:
   - Modal Lightbox Galeri Foto: `const GaleriLightbox = dynamic(() => import("@/components/public/GaleriLightbox"), { ssr: false });`
   - Grafik Statistik Admin: `const AdminChart = dynamic(() => import("@/components/admin/AdminChart"), { ssr: false });`
3. **Font Swapping**:
   - Selalu konfigurasikan `next/font` dengan `display: 'swap'` untuk mencegah Layout Shift (CLS).

---

## 5. Checklist Audit Pre-Flight (Anti-Slop Pre-Flight Check)

Sebelum menyatakan tugas implementasi selesai atau siap deploy:
- [ ] **Data Dummy Realistis**: Bebas 100% dari "Lorem Ipsum" atau placeholder kosong.
- [ ] **Responsif Mobile (375px - 1440px)**: Tidak ada teks terpotong, overflow horizontal, atau form yang rusak di layar HP.
- [ ] **Area Sentuh (Touch Target)**: Semua tombol CTA, tab, dan ikon minimal berukuran 44x44 px.
- [ ] **State Formulir**: Tombol submit menampilkan status loading (spinner) dan disabled saat proses berlangsung.
- [ ] **Feedback Aksi**: Menampilkan Toast notification sukses/gagal pada setiap aksi mutasi.
- [ ] **Console Clean**: Bebas dari warning hydration error, linting error, atau unused imports.
