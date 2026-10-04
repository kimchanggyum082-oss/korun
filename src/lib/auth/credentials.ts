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

type EnvironmentCredentials =
  | { mode: "hash"; email: string; hash: string }
  | { mode: "plain"; email: string; password: string };

function environmentCredentials(): EnvironmentCredentials | null {
  const email = process.env.ADMIN_EMAIL?.trim();
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (email && hash) return { mode: "hash", email, hash };
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) return { mode: "plain", email, password };
  if (process.env.NODE_ENV === "production") return null;
  return {
    mode: "plain",
    email: DEVELOPMENT_EMAIL,
    password: DEVELOPMENT_PASSWORD,
  };
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
  if (env && normalizedEmail === normalizeEmail(env.email)) {
    const matches =
      env.mode === "hash"
        ? await compare(password, env.hash)
        : constantTimeEqual(password, env.password);
    if (matches) return { email: env.email, role: "admin" };
  }
  return verifyDatabaseCredentials(normalizedEmail, password);
}
