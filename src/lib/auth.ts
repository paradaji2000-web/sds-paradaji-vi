import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

/**
 * Returns the currently authenticated Clerk user
 */
export async function getAuthUser() {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }
  
  return await currentUser();
}

/**
 * Returns the database user corresponding to the authenticated Clerk user
 */
export async function getCurrentUser() {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }
  
  const userList = await db.select().from(users).where(eq(users.clerkUserId, userId)).limit(1);
  
  if (userList.length === 0) {
    return null;
  }
  
  return userList[0];
}

/**
 * Ensures the user has a specific role, otherwise throws or redirects
 */
export async function requireRole(allowedRoles: ("admin" | "super_admin")[]) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/admin/login");
  }
  
  if (!user.isActive) {
    throw new Error("Your account has been deactivated.");
  }
  
  if (!allowedRoles.includes(user.role)) {
    throw new Error("Unauthorized: You don't have permission to perform this action.");
  }
  
  return user;
}

export async function getCurrentAppUser() {
  return await getCurrentUser();
}

export async function requireAdmin() {
  return await requireRole(["admin", "super_admin"]);
}

export async function requireSuperAdmin() {
  return await requireRole(["super_admin"]);
}
