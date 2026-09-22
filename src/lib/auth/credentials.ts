import { createHash, timingSafeEqual } from "node:crypto";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { adminUsers } from "@/lib/db/schema";
import type { AdminSession } from "./session";

const DEVELOPMENT_EMAIL = "admin@korun.co.kr";
const DEVELOPMENT_PASSWORD = "korun-dev-admin";

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function constantTimeEqual(left: string, right: string): boolean {
  const leftDigest = createHash("sha256").update(left).digest();
  const rightDigest = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftDigest, rightDigest);
}

function environmentCredentials(): { email: string; password: string } | null {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) return { email, password };
  if (process.env.NODE_ENV === "production") return null;
  return { email: DEVELOPMENT_EMAIL, password: DEVELOPMENT_PASSWORD };
}

async function verifyDatabaseCredentials(
  email: string,
  password: string,
): Promise<AdminSession | null> {
  const db = getDb();
  if (!db) return null;
  const rows = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email))
    .limit(1);
  const user = rows[0];
  if (!user?.passwordHash) return null;
  const matches = await compare(password, user.passwordHash);
  if (!matches) return null;
  return { email: user.email ?? email, role: user.role ?? "admin" };
}

export async function verifyAdminCredentials(
  email: string,
  password: string,
): Promise<AdminSession | null> {
  const normalizedEmail = normalizeEmail(email);
  const env = environmentCredentials();
  if (
    env &&
    normalizedEmail === normalizeEmail(env.email) &&
    constantTimeEqual(password, env.password)
  ) {
    return { email: env.email, role: "admin" };
  }
  return verifyDatabaseCredentials(normalizedEmail, password);
}
