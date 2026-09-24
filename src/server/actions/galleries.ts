"use server";

import { db } from "@/db";
import { galleries } from "@/db/schema";
import { gallerySchema } from "@/lib/validations";
import { requireRole } from "@/lib/auth";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getGalleries(includeInactive = false) {
  const conditions = includeInactive ? undefined : eq(galleries.isActive, true);
  
  const data = await db.query.galleries.findMany({
    where: conditions,
    orderBy: [asc(galleries.displayOrder), asc(galleries.title)],
  });
  
  return data;
}

export async function createGallery(input: unknown) {
  await requireRole(["admin", "super_admin"]);
  
  const data = gallerySchema.parse(input);
    
  const result = await db.insert(galleries).values(data).returning();
  
  revalidatePath("/galeri");
  revalidatePath("/admin/galeri");
  
  return result[0];
}

export async function updateGallery(id: string, input: unknown) {
  await requireRole(["admin", "super_admin"]);
  
  const data = gallerySchema.parse(input);
  
  const result = await db.update(galleries).set({
    ...data,
    updatedAt: new Date(),
  }).where(eq(galleries.id, id)).returning();
  
  revalidatePath("/galeri");
  revalidatePath("/admin/galeri");
  
  return result[0];
}

export async function deleteGallery(id: string) {
  await requireRole(["admin", "super_admin"]);
  
  await db.delete(galleries).where(eq(galleries.id, id));
  
  revalidatePath("/galeri");
  revalidatePath("/admin/galeri");
  
  return { success: true };
}
