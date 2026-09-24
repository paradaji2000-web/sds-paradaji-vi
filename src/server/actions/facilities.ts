"use server";

import { db } from "@/db";
import { facilities } from "@/db/schema";
import { facilitySchema } from "@/lib/validations";
import { requireRole } from "@/lib/auth";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getFacilities(includeInactive = false) {
  const conditions = includeInactive ? undefined : eq(facilities.isActive, true);
  
  const data = await db.query.facilities.findMany({
    where: conditions,
    orderBy: [asc(facilities.displayOrder), asc(facilities.name)],
  });
  
  return data;
}

export async function createFacility(input: unknown) {
  await requireRole(["admin", "super_admin"]);
  
  const data = facilitySchema.parse(input);
  
  const slug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
    
  const result = await db.insert(facilities).values({
    ...data,
    slug,
  }).returning();
  
  revalidatePath("/fasilitas");
  revalidatePath("/admin/fasilitas");
  
  return result[0];
}

export async function updateFacility(id: string, input: unknown) {
  await requireRole(["admin", "super_admin"]);
  
  const data = facilitySchema.parse(input);
  
  const result = await db.update(facilities).set({
    ...data,
    updatedAt: new Date(),
  }).where(eq(facilities.id, id)).returning();
  
  revalidatePath("/fasilitas");
  revalidatePath("/admin/fasilitas");
  
  return result[0];
}

export async function deleteFacility(id: string) {
  await requireRole(["admin", "super_admin"]);
  
  await db.delete(facilities).where(eq(facilities.id, id));
  
  revalidatePath("/fasilitas");
  revalidatePath("/admin/fasilitas");
  
  return { success: true };
}
