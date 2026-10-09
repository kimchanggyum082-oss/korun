import { desc } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { contactRequests } from "@/lib/db/schema";

export type ContactRequestRow = typeof contactRequests.$inferSelect;

export type ContactRequestInput = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  locale?: string;
  page?: string;
};

export function isContactStoreConfigured(): boolean {
  return getDb() !== null;
}

export async function createContactRequest(
  input: ContactRequestInput,
): Promise<void> {
  const db = getDb();
  if (!db) {
    throw new Error(
      "Contact store is not configured: set DATABASE_URL to store requests",
    );
  }
  await db.insert(contactRequests).values({
    id: crypto.randomUUID(),
    name: input.name,
    company: input.company?.trim() || null,
    email: input.email,
    phone: input.phone?.trim() || null,
    subject: input.subject?.trim() || null,
    message: input.message,
    locale: input.locale?.trim() || null,
    page: input.page?.trim() || null,
    createdAt: new Date(),
  });
}

export async function listContactRequests(
  limit = 300,
): Promise<ContactRequestRow[]> {
  const db = getDb();
  if (!db) return [];
  return db
    .select()
    .from(contactRequests)
    .orderBy(desc(contactRequests.createdAt))
    .limit(limit);
}
