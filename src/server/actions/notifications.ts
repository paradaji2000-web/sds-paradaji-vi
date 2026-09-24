"use server";

import { db } from "@/db";
import { notificationLogs } from "@/db/schema";
import { requireRole } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getNotificationLogs(limit = 50) {
  await requireRole(["admin", "super_admin"]);

  const data = await db.query.notificationLogs.findMany({
    orderBy: [desc(notificationLogs.createdAt)],
    limit,
    with: {
      registration: {
        columns: {
          registrationNumber: true,
          fullName: true,
        },
      },
    },
  });

  return data;
}

export async function logNotification(input: {
  registrationId?: string;
  channel: "whatsapp" | "email";
  eventType: string;
  recipient: string;
  subject?: string;
  message: string;
  status?: "queued" | "sent" | "failed";
  errorMessage?: string;
  providerMessageId?: string;
}) {
  const result = await db.insert(notificationLogs).values({
    ...input,
    status: input.status || "queued",
    sentAt: input.status === "sent" ? new Date() : null,
  }).returning();

  revalidatePath("/admin/notifikasi");
  return result[0];
}
