import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as dotenv from "dotenv";
import {
  users,
  news,
  teachers,
  facilities,
  extracurriculars,
  galleries,
  siteSettings,
  ppdbCounters,
  ppdbRegistrations,
  ppdbDocuments,
} from "./schema";
import {
  newsList,
  teachersList,
  facilitiesList,
  extracurricularList,
  dummyRegistrations,
  schoolInfo,
} from "../data/dummy";

dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not defined in .env.local");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function main() {
  console.log("🌱 Seeding SDS PARADAJI VI Database...");

  // 1. Seed Initial Super Admin User
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || "admin@sdsparadaji6.sch.id";
  const [seededAdmin] = await db.insert(users).values({
    clerkUserId: "user_initial_super_admin",
    email: superAdminEmail,
    fullName: "Administrator Utama",
    role: "super_admin",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    isActive: true,
  }).onConflictDoUpdate({
    target: users.email,
    set: { role: "super_admin", isActive: true },
  }).returning();

  console.log("✅ Super Admin seeded:", seededAdmin?.email || superAdminEmail);

  // 2. Seed Site Settings
  await db.insert(siteSettings).values([
    {
      key: "site_name",
      value: schoolInfo.name,
      category: "general",
      description: "Nama Resmi Sekolah",
    },
    {
      key: "site_description",
      value: schoolInfo.tagline,
      category: "general",
      description: "Slogan / Tagline Sekolah",
    },
    {
      key: "whatsapp_number",
      value: schoolInfo.whatsapp,
      category: "ppdb",
      description: "Nomor WhatsApp Tujuan PPDB & Informasi",
    },
    {
      key: "whatsapp_template",
      value: "Halo Panitia PPDB {nama_sekolah}, saya orang tua dari {nama_anak}. Saya telah mendaftar online dengan Nomor Registrasi: {nomor_registrasi}. Mohon informasi alur verifikasi selanjutnya. Terima kasih.",
      category: "ppdb",
      description: "Template Pesan Otomatis WhatsApp Pendaftar",
    },
    {
      key: "contact_email",
      value: schoolInfo.email,
      category: "contact",
    },
    {
      key: "contact_phone",
      value: schoolInfo.phone,
      category: "contact",
    },
    {
      key: "address",
      value: schoolInfo.address,
      category: "contact",
    },
    {
      key: "ppdb_is_open",
      value: "true",
      category: "ppdb",
      description: "Status Pembukaan PPDB (true/false)",
    },
    {
      key: "ppdb_academic_year",
      value: "2025/2026",
      category: "ppdb",
    },
  ]).onConflictDoNothing();

  console.log("✅ Site settings seeded.");

  // 3. Seed Teachers
  const teacherValues = teachersList.map((t, idx) => ({
    name: t.name,
    slug: t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
    position: t.role,
    subject: t.subject,
    education: t.education,
    bio: t.bio,
    photoUrl: t.imageUrl,
    displayOrder: idx + 1,
    isActive: true,
  }));

  await db.insert(teachers).values(teacherValues).onConflictDoNothing();
  console.log("✅ Teachers seeded:", teacherValues.length, "items.");

  // 4. Seed Facilities
  const facilityValues = facilitiesList.map((f, idx) => ({
    name: f.name,
    slug: f.id,
    category: f.category,
    description: f.description,
    imageUrl: f.imageUrl,
    displayOrder: idx + 1,
    isActive: true,
  }));

  await db.insert(facilities).values(facilityValues).onConflictDoNothing();
  console.log("✅ Facilities seeded:", facilityValues.length, "items.");

  // 5. Seed Extracurriculars
  const ekskulValues = extracurricularList.map((e, idx) => ({
    name: e.name,
    slug: e.id,
    description: e.description,
    schedule: e.schedule,
    coach: e.coach,
    imageUrl: e.imageUrl,
    displayOrder: idx + 1,
    isActive: true,
  }));

  await db.insert(extracurriculars).values(ekskulValues).onConflictDoNothing();
  console.log("✅ Extracurriculars seeded:", ekskulValues.length, "items.");

  // 6. Seed Galleries
  const galleryValues = facilitiesList.map((f, idx) => ({
    title: f.name,
    imageUrl: f.imageUrl,
    category: f.category,
    description: f.description,
    displayOrder: idx + 1,
    isActive: true,
  }));

  await db.insert(galleries).values(galleryValues).onConflictDoNothing();
  console.log("✅ Galleries seeded:", galleryValues.length, "items.");

  // 7. Seed News
  const newsValues = newsList.map((n) => ({
    title: n.title,
    slug: n.slug,
    excerpt: n.excerpt,
    content: n.content,
    thumbnailUrl: n.imageUrl,
    category: n.category.toLowerCase() as "berita" | "kegiatan" | "pengumuman",
    isPublished: true,
    publishedAt: new Date(n.date),
    authorId: seededAdmin?.id || null,
  }));

  await db.insert(news).values(newsValues).onConflictDoNothing();
  console.log("✅ News seeded:", newsValues.length, "items.");

  // 8. Seed PPDB Counters
  await db.insert(ppdbCounters).values({
    year: 2025,
    lastNumber: 3,
  }).onConflictDoNothing();

  // 9. Seed Sample PPDB Registrations
  for (const reg of dummyRegistrations) {
    const [insertedReg] = await db.insert(ppdbRegistrations).values({
      registrationNumber: reg.registrationNumber,
      fullName: reg.fullName,
      gender: reg.gender === "Laki-laki" ? "L" : "P",
      birthPlace: reg.birthPlace,
      birthDate: reg.birthDate,
      address: reg.address,
      parentName: reg.parentName,
      parentRelation: "Orang Tua Utama",
      parentPhone: reg.parentPhone,
      parentEmail: "orangtua@example.com",
      previousSchool: reg.previousSchool,
      status: reg.status,
      adminNotes: reg.status === "verified" ? "Berkas lengkap dan terverifikasi panitia." : null,
    }).onConflictDoNothing().returning();

    if (insertedReg) {
      await db.insert(ppdbDocuments).values([
        {
          registrationId: insertedReg.id,
          documentType: "kk",
          fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          fileName: "Kartu_Keluarga_Scan.pdf",
          isVerified: true,
        },
        {
          registrationId: insertedReg.id,
          documentType: "akta",
          fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          fileName: "Akta_Kelahiran_Scan.pdf",
          isVerified: true,
        },
        {
          registrationId: insertedReg.id,
          documentType: "foto",
          fileUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=80",
          fileName: "Pas_Foto_Anak.jpg",
          isVerified: true,
        },
      ]);
    }
  }

  console.log("✅ PPDB sample registrations seeded.");
  console.log("🎉 Database seeding completed successfully!");
}

main().catch((err) => {
  console.error("❌ Error seeding database:", err);
  process.exit(1);
});
