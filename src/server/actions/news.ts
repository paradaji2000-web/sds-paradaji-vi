"use server";

import { db } from "@/db";
import { news } from "@/db/schema";
import { newsSchema } from "@/lib/validations";
import { requireRole } from "@/lib/auth";
import { eq, desc, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getNews(page = 1, limit = 10, includeUnpublished = false) {
  const offset = (page - 1) * limit;
  
  const conditions = includeUnpublished ? undefined : eq(news.isPublished, true);
  
  const data = await db.query.news.findMany({
    where: conditions,
    orderBy: [desc(news.createdAt)],
    limit,
    offset,
    with: {
      author: {
        columns: {
          fullName: true,
          avatarUrl: true,
        },
      },
    },
  });
  
  return data;
}

export async function getNewsDetail(slug: string) {
  const data = await db.query.news.findFirst({
    where: eq(news.slug, slug),
    with: {
      author: {
        columns: {
          fullName: true,
          avatarUrl: true,
        },
      },
    },
  });
  
  return data;
}

export async function createNews(input: unknown) {
  const user = await requireRole(["admin", "super_admin"]);
  
  const data = newsSchema.parse(input);
  
  // Create slug from title
  const slug = data.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
    
  const result = await db.insert(news).values({
    ...data,
    slug,
    authorId: user.id,
    publishedAt: data.isPublished ? new Date() : null,
  }).returning();
  
  revalidatePath("/berita");
  revalidatePath("/admin/berita");
  
  return result[0];
}

export async function updateNews(id: string, input: unknown) {
  await requireRole(["admin", "super_admin"]);
  
  const data = newsSchema.parse(input);
  
  // We generally don't change the slug once created to avoid breaking links,
  // but if needed we could do it here.
  
  const result = await db.update(news).set({
    ...data,
    publishedAt: data.isPublished ? new Date() : null,
    updatedAt: new Date(),
  }).where(eq(news.id, id)).returning();
  
  revalidatePath("/berita");
  revalidatePath(`/berita/${result[0].slug}`);
  revalidatePath("/admin/berita");
  
  return result[0];
}

export async function deleteNews(id: string) {
  await requireRole(["admin", "super_admin"]);
  
  await db.delete(news).where(eq(news.id, id));
  
  revalidatePath("/berita");
  revalidatePath("/admin/berita");
  
  return { success: true };
}

export async function togglePublishNews(id: string, isPublished: boolean) {
  await requireRole(["admin", "super_admin"]);
  
  const result = await db.update(news).set({
    isPublished,
    publishedAt: isPublished ? new Date() : null,
    updatedAt: new Date(),
  }).where(eq(news.id, id)).returning();
  
  revalidatePath("/berita");
  revalidatePath(`/berita/${result[0].slug}`);
  revalidatePath("/admin/berita");
  
  return result[0];
}
