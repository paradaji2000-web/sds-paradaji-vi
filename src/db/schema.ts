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
import { relations } from "drizzle-orm";

// ============================================================
// ENUMS
// ============================================================
export const roleEnum = pgEnum("role", ["admin", "super_admin"]);
export const newsCategoryEnum = pgEnum("news_category", [
  "berita",
  "kegiatan",
  "pengumuman",
]);
export const ppdbStatusEnum = pgEnum("ppdb_status", [
  "pending",
  "verified",
  "accepted",
  "rejected",
]);
export const documentTypeEnum = pgEnum("document_type", [
  "kk",
  "akta",
  "foto",
  "ijazah",
  "kip",
]);
export const notificationChannelEnum = pgEnum("notification_channel", [
  "whatsapp",
  "email",
]);
export const notificationStatusEnum = pgEnum("notification_status", [
  "queued",
  "sent",
  "failed",
]);

// ============================================================
// USERS — Sync dari Clerk via webhook
// ============================================================
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
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    clerkIdx: uniqueIndex("users_clerk_user_id_idx").on(t.clerkUserId),
    emailIdx: uniqueIndex("users_email_idx").on(t.email),
  })
);

// ============================================================
// NEWS — Berita / Kegiatan / Pengumuman
// ============================================================
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
    authorId: uuid("author_id").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    slugIdx: uniqueIndex("news_slug_idx").on(t.slug),
    publishIdx: index("news_publish_idx").on(t.isPublished, t.publishedAt),
    categoryIdx: index("news_category_idx").on(t.category),
  })
);

// ============================================================
// TEACHERS — Profil Guru & Staf
// ============================================================
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
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    slugIdx: uniqueIndex("teachers_slug_idx").on(t.slug),
  })
);

// ============================================================
// FACILITIES — Fasilitas Sekolah
// ============================================================
export const facilities = pgTable("facilities", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  slug: varchar("slug", { length: 191 }).notNull(),
  category: varchar("category", { length: 100 }),
  description: text("description"),
  imageUrl: text("image_url"),
  displayOrder: integer("display_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ============================================================
// EXTRACURRICULARS — Kegiatan Ekstrakurikuler
// ============================================================
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
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ============================================================
// GALLERIES — Galeri Foto Fasilitas
// ============================================================
export const galleries = pgTable("galleries", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 191 }).notNull(),
  imageUrl: text("image_url").notNull(),
  category: varchar("category", { length: 100 }),
  description: text("description"),
  displayOrder: integer("display_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ============================================================
// PPDB REGISTRATIONS — Data Pendaftar
// ============================================================
export const ppdbRegistrations = pgTable(
  "ppdb_registrations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    registrationNumber: varchar("registration_number", {
      length: 50,
    }).notNull(),
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
    verifiedBy: uuid("verified_by").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    regNumIdx: uniqueIndex("ppdb_reg_number_idx").on(t.registrationNumber),
    statusIdx: index("ppdb_status_idx").on(t.status),
    phoneIdx: index("ppdb_parent_phone_idx").on(t.parentPhone),
  })
);

// ============================================================
// PPDB DOCUMENTS — Berkas Unggahan Pendaftar
// ============================================================
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
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ============================================================
// NOTIFICATION LOGS — Riwayat Pengiriman Notifikasi
// ============================================================
export const notificationLogs = pgTable("notification_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  registrationId: uuid("registration_id").references(
    () => ppdbRegistrations.id,
    { onDelete: "set null" }
  ),
  channel: notificationChannelEnum("channel").notNull(),
  eventType: varchar("event_type", { length: 50 }).notNull(),
  recipient: varchar("recipient", { length: 191 }).notNull(),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  status: notificationStatusEnum("status").default("queued").notNull(),
  errorMessage: text("error_message"),
  providerMessageId: varchar("provider_message_id", { length: 191 }),
  retryCount: integer("retry_count").default(0).notNull(),
  sentAt: timestamp("sent_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ============================================================
// SITE SETTINGS — Pengaturan Sistem (key-value)
// ============================================================
export const siteSettings = pgTable(
  "site_settings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    key: varchar("key", { length: 100 }).notNull(),
    value: text("value").notNull(),
    category: varchar("category", { length: 50 }).default("general").notNull(),
    description: text("description"),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    keyIdx: uniqueIndex("site_settings_key_idx").on(t.key),
  })
);

// ============================================================
// PPDB COUNTERS — Atomic counter untuk nomor registrasi
// ============================================================
export const ppdbCounters = pgTable(
  "ppdb_counters",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    year: integer("year").notNull(),
    lastNumber: integer("last_number").default(0).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    yearIdx: uniqueIndex("ppdb_counters_year_idx").on(t.year),
  })
);

// ============================================================
// RELATIONS
// ============================================================
export const usersRelations = relations(users, ({ many }) => ({
  news: many(news),
  verifiedRegistrations: many(ppdbRegistrations),
}));

export const newsRelations = relations(news, ({ one }) => ({
  author: one(users, {
    fields: [news.authorId],
    references: [users.id],
  }),
}));

export const ppdbRegistrationsRelations = relations(
  ppdbRegistrations,
  ({ one, many }) => ({
    documents: many(ppdbDocuments),
    notifications: many(notificationLogs),
    verifier: one(users, {
      fields: [ppdbRegistrations.verifiedBy],
      references: [users.id],
    }),
  })
);

export const ppdbDocumentsRelations = relations(ppdbDocuments, ({ one }) => ({
  registration: one(ppdbRegistrations, {
    fields: [ppdbDocuments.registrationId],
    references: [ppdbRegistrations.id],
  }),
}));

export const notificationLogsRelations = relations(
  notificationLogs,
  ({ one }) => ({
    registration: one(ppdbRegistrations, {
      fields: [notificationLogs.registrationId],
      references: [ppdbRegistrations.id],
    }),
  })
);

// ============================================================
// TYPE EXPORTS — Inferred types untuk TypeScript
// ============================================================
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type News = typeof news.$inferSelect;
export type NewNews = typeof news.$inferInsert;

export type Teacher = typeof teachers.$inferSelect;
export type NewTeacher = typeof teachers.$inferInsert;

export type Facility = typeof facilities.$inferSelect;
export type NewFacility = typeof facilities.$inferInsert;

export type Extracurricular = typeof extracurriculars.$inferSelect;
export type NewExtracurricular = typeof extracurriculars.$inferInsert;

export type Gallery = typeof galleries.$inferSelect;
export type NewGallery = typeof galleries.$inferInsert;

export type PpdbRegistration = typeof ppdbRegistrations.$inferSelect;
export type NewPpdbRegistration = typeof ppdbRegistrations.$inferInsert;

export type PpdbDocument = typeof ppdbDocuments.$inferSelect;
export type NewPpdbDocument = typeof ppdbDocuments.$inferInsert;

export type NotificationLog = typeof notificationLogs.$inferSelect;
export type NewNotificationLog = typeof notificationLogs.$inferInsert;

export type SiteSetting = typeof siteSettings.$inferSelect;
export type NewSiteSetting = typeof siteSettings.$inferInsert;
