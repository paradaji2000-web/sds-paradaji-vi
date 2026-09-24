"use server";

import { db } from "@/db";
import { extracurriculars } from "@/db/schema";
import { extracurricularSchema } from "@/lib/validations";
import { requireRole } from "@/lib/auth";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getExtracurriculars(includeInactive = false) {
  const conditions = includeInactive ? undefined : eq(extracurriculars.isActive, true);
  
  const data = await db.query.extracurriculars.findMany({
    where: conditions,
    orderBy: [asc(extracurriculars.displayOrder), asc(extracurriculars.name)],
  });
  
  return data;
}

export async function createExtracurricular(input: unknown) {
  await requireRole(["admin", "super_admin"]);
  
  const data = extracurricularSchema.parse(input);
  
  const slug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
    
  const result = await db.insert(extracurriculars).values({
    ...data,
    slug,
  }).returning();
  
  revalidatePath("/ekstrakurikuler");
  revalidatePath("/admin/ekstrakurikuler");
  
  return result[0];
}

export async function updateExtracurricular(id: string, input: unknown) {
  await requireRole(["admin", "super_admin"]);
  
  const data = extracurricularSchema.parse(input);
  
  const result = await db.update(extracurriculars).set({
    ...data,
    updatedAt: new Date(),
  }).where(eq(extracurriculars.id, id)).returning();
  
  revalidatePath("/ekstrakurikuler");
  revalidatePath("/admin/ekstrakurikuler");
  
  return result[0];
}

export async function deleteExtracurricular(id: string) {
  await requireRole(["admin", "super_admin"]);
  
  await db.delete(extracurriculars).where(eq(extracurriculars.id, id));
  
  revalidatePath("/ekstrakurikuler");
  revalidatePath("/admin/ekstrakurikuler");
  
  return { success: true };
}
