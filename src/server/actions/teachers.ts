"use server";

import { db } from "@/db";
import { teachers } from "@/db/schema";
import { teacherSchema } from "@/lib/validations";
import { requireRole } from "@/lib/auth";
import { eq, desc, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getTeachers(includeInactive = false) {
  const conditions = includeInactive ? undefined : eq(teachers.isActive, true);
  
  const data = await db.query.teachers.findMany({
    where: conditions,
    orderBy: [asc(teachers.displayOrder), asc(teachers.name)],
  });
  
  return data;
}

export async function createTeacher(input: unknown) {
  await requireRole(["admin", "super_admin"]);
  
  const data = teacherSchema.parse(input);
  
  const slug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
    
  const result = await db.insert(teachers).values({
    ...data,
    slug,
  }).returning();
  
  revalidatePath("/guru");
  revalidatePath("/admin/guru");
  
  return result[0];
}

export async function updateTeacher(id: string, input: unknown) {
  await requireRole(["admin", "super_admin"]);
  
  const data = teacherSchema.parse(input);
  
  const result = await db.update(teachers).set({
    ...data,
    updatedAt: new Date(),
  }).where(eq(teachers.id, id)).returning();
  
  revalidatePath("/guru");
  revalidatePath("/admin/guru");
  
  return result[0];
}

export async function deleteTeacher(id: string) {
  await requireRole(["admin", "super_admin"]);
  
  await db.delete(teachers).where(eq(teachers.id, id));
  
  revalidatePath("/guru");
  revalidatePath("/admin/guru");
  
  return { success: true };
}
