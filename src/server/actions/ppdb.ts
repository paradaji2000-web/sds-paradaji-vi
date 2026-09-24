"use server";

import { db } from "@/db";
import { ppdbRegistrations, ppdbCounters, ppdbDocuments } from "@/db/schema";
import { ppdbRegistrationSchema, ppdbStatusUpdateSchema } from "@/lib/validations";
import { requireRole } from "@/lib/auth";
import { eq, desc, and, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Helper to generate registration number
async function generateRegistrationNumber(year: number) {
  // Use transaction to ensure atomicity
  return await db.transaction(async (tx) => {
    // Upsert counter for the year
    const counter = await tx.insert(ppdbCounters)
      .values({ year, lastNumber: 1 })
      .onConflictDoUpdate({
        target: ppdbCounters.year,
        set: {
          lastNumber: sql`${ppdbCounters.lastNumber} + 1`,
          updatedAt: new Date(),
        }
      })
      .returning();
      
    const currentNumber = counter[0].lastNumber;
    // Format: PPDB-YYYY-XXXX (e.g. PPDB-2024-0001)
    return `PPDB-${year}-${currentNumber.toString().padStart(4, '0')}`;
  });
}

export async function createRegistration(input: unknown) {
  const data = ppdbRegistrationSchema.parse(input);
  
  const currentYear = new Date().getFullYear();
  const registrationNumber = await generateRegistrationNumber(currentYear);
  
  // Extract document URLs
  const { kkUrl, aktaUrl, fotoUrl, ijazahUrl, ...registrationData } = data;
  
  return await db.transaction(async (tx) => {
    // 1. Create Registration
    const regResult = await tx.insert(ppdbRegistrations).values({
      ...registrationData,
      registrationNumber,
      status: "pending",
    }).returning();
    
    const registrationId = regResult[0].id;
    
    // 2. Create Documents
    type DocType = "kk" | "akta" | "foto" | "ijazah" | "kip";
    const documents: Array<{ registrationId: string; documentType: DocType; fileUrl: string }> = [
      { registrationId, documentType: "kk", fileUrl: kkUrl },
      { registrationId, documentType: "akta", fileUrl: aktaUrl },
      { registrationId, documentType: "foto", fileUrl: fotoUrl },
    ];
    
    if (ijazahUrl) {
      documents.push({ registrationId, documentType: "ijazah", fileUrl: ijazahUrl });
    }
    
    await tx.insert(ppdbDocuments).values(documents);
    
    // We would normally log a notification here, but we will leave that for Phase 3
    
    revalidatePath("/admin/ppdb");
    
    return regResult[0];
  });
}

export async function getRegistrations(status?: "pending" | "verified" | "accepted" | "rejected") {
  await requireRole(["admin", "super_admin"]);
  
  const conditions = status ? eq(ppdbRegistrations.status, status) : undefined;
  
  const data = await db.query.ppdbRegistrations.findMany({
    where: conditions,
    orderBy: [desc(ppdbRegistrations.createdAt)],
  });
  
  return data;
}

export async function getRegistrationById(id: string) {
  await requireRole(["admin", "super_admin"]);
  
  const data = await db.query.ppdbRegistrations.findFirst({
    where: eq(ppdbRegistrations.id, id),
    with: {
      documents: true,
      verifier: {
        columns: {
          fullName: true,
        },
      },
    },
  });
  
  return data;
}

export async function getRegistrationByNumberAndDate(registrationNumber: string, birthDate: string) {
  // Public route, no auth required
  const data = await db.query.ppdbRegistrations.findFirst({
    where: and(
      eq(ppdbRegistrations.registrationNumber, registrationNumber),
      eq(ppdbRegistrations.birthDate, birthDate)
    ),
    columns: {
      id: true,
      registrationNumber: true,
      fullName: true,
      status: true,
      createdAt: true,
      adminNotes: true,
    }
  });
  
  return data;
}

export async function getRegistrationByNumber(registrationNumber: string) {
  // Public route, no auth required
  const data = await db.query.ppdbRegistrations.findFirst({
    where: eq(ppdbRegistrations.registrationNumber, registrationNumber),
    columns: {
      id: true,
      registrationNumber: true,
      fullName: true,
      status: true,
      createdAt: true,
      previousSchool: true,
      parentName: true,
      address: true,
      adminNotes: true,
    }
  });
  
  return data;
}

export async function updateRegistrationStatus(input: unknown) {
  const user = await requireRole(["admin", "super_admin"]);
  
  const data = ppdbStatusUpdateSchema.parse(input);
  
  const result = await db.update(ppdbRegistrations).set({
    status: data.status,
    adminNotes: data.adminNotes,
    verifiedAt: new Date(),
    verifiedBy: user.id,
    updatedAt: new Date(),
  }).where(eq(ppdbRegistrations.id, data.id)).returning();
  
  revalidatePath("/admin/ppdb");
  revalidatePath(`/admin/ppdb/${data.id}`);
  
  return result[0];
}

export async function verifyDocument(documentId: string, isVerified: boolean, notes?: string) {
  await requireRole(["admin", "super_admin"]);
  
  await db.update(ppdbDocuments).set({
    isVerified,
    verificationNotes: notes,
  }).where(eq(ppdbDocuments.id, documentId));
  
  // Revalidate might need registration ID, but we can't easily get it without another query
  revalidatePath("/admin/ppdb");
  
  return { success: true };
}
