import { z } from "zod";

export const newsSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter").max(255),
  excerpt: z.string().min(10, "Ringkasan minimal 10 karakter"),
  content: z.string().min(50, "Konten minimal 50 karakter"),
  category: z.enum(["berita", "kegiatan", "pengumuman"]),
  isPublished: z.boolean().default(false),
  thumbnailUrl: z.string().url("URL gambar tidak valid").optional().or(z.literal("")),
});

export const teacherSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter").max(191),
  position: z.string().min(3, "Jabatan minimal 3 karakter").max(191),
  subject: z.string().max(191).optional().or(z.literal("")),
  education: z.string().max(255).optional().or(z.literal("")),
  bio: z.string().optional().or(z.literal("")),
  photoUrl: z.string().url("URL foto tidak valid").optional().or(z.literal("")),
  displayOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const facilitySchema = z.object({
  name: z.string().min(3, "Nama fasilitas minimal 3 karakter").max(191),
  category: z.string().max(100).optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  imageUrl: z.string().url("URL gambar tidak valid").optional().or(z.literal("")),
  displayOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const extracurricularSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter").max(191),
  description: z.string().optional().or(z.literal("")),
  schedule: z.string().max(191).optional().or(z.literal("")),
  coach: z.string().max(191).optional().or(z.literal("")),
  imageUrl: z.string().url("URL gambar tidak valid").optional().or(z.literal("")),
  displayOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const gallerySchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter").max(191),
  imageUrl: z.string().url("URL gambar tidak valid"),
  category: z.string().max(100).optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  displayOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const ppdbRegistrationSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter").max(191),
  nisn: z.string().max(20).optional().or(z.literal("")),
  gender: z.enum(["L", "P"]),
  birthPlace: z.string().min(3, "Tempat lahir wajib diisi").max(191),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal tidak valid (YYYY-MM-DD)"),
  religion: z.string().max(50).optional().or(z.literal("")),
  address: z.string().min(10, "Alamat lengkap wajib diisi"),
  kelurahan: z.string().max(100).optional().or(z.literal("")),
  kecamatan: z.string().max(100).optional().or(z.literal("")),
  city: z.string().max(100).optional().or(z.literal("")),
  province: z.string().max(100).optional().or(z.literal("")),
  postalCode: z.string().max(10).optional().or(z.literal("")),
  
  parentName: z.string().min(3, "Nama orang tua/wali wajib diisi").max(191),
  parentRelation: z.string().min(2, "Hubungan wajib diisi").max(50),
  parentPhone: z.string().min(10, "Nomor telepon/WA wajib diisi").max(20),
  parentEmail: z.string().email("Email tidak valid").max(191),
  parentOccupation: z.string().max(100).optional().or(z.literal("")),
  previousSchool: z.string().max(191).optional().or(z.literal("")),
  
  // URL Dokumen
  kkUrl: z.string().url("Upload KK wajib dilakukan"),
  aktaUrl: z.string().url("Upload Akta wajib dilakukan"),
  fotoUrl: z.string().url("Upload Pas Foto wajib dilakukan"),
  ijazahUrl: z.string().optional().or(z.literal("")),
});

export const ppdbStatusUpdateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["pending", "verified", "accepted", "rejected"]),
  adminNotes: z.string().optional().or(z.literal("")),
});

export const siteSettingSchema = z.object({
  key: z.string().max(100),
  value: z.string(),
});
