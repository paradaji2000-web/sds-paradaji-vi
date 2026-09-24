"use server";

import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { siteSettingSchema } from "@/lib/validations";
import { requireRole } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  const data = await db.query.siteSettings.findMany();
  
  // Convert array to key-value object for easier consumption
  return data.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);
}

export async function getSettingByKey(key: string) {
  const data = await db.query.siteSettings.findFirst({
    where: eq(siteSettings.key, key),
  });
  
  return data?.value || null;
}

export async function updateSetting(input: unknown) {
  await requireRole(["admin", "super_admin"]);
  
  const data = siteSettingSchema.parse(input);
  
  const result = await db.insert(siteSettings).values({
    ...data,
  }).onConflictDoUpdate({
    target: siteSettings.key,
    set: {
      value: data.value,
      updatedAt: new Date(),
    }
  }).returning();
  
  revalidatePath("/");
  revalidatePath("/admin/pengaturan");
  
  return result[0];
}
