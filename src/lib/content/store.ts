import { desc, eq, like } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { contentEntities, revisions } from "@/lib/db/schema";

export type ContentEntityRow = typeof contentEntities.$inferSelect;
export type RevisionRow = typeof revisions.$inferSelect;

function notConfigured(): Error {
  return new Error(
    "Content store is not configured: set DATABASE_URL to use the admin store",
  );
}

export async function getPublished(entityKey: string): Promise<unknown | null> {
  const db = getDb();
  if (!db) return null;
  const rows = await db
    .select()
    .from(contentEntities)
    .where(eq(contentEntities.key, entityKey))
    .limit(1);
  return rows[0]?.publishedJson ?? null;
}

export async function getDraft(entityKey: string): Promise<unknown | null> {
  const db = getDb();
  if (!db) return null;
  const rows = await db
    .select()
    .from(contentEntities)
    .where(eq(contentEntities.key, entityKey))
    .limit(1);
  return rows[0]?.draftJson ?? null;
}

export async function saveDraft(
  entityKey: string,
  json: unknown,
  updatedBy?: string,
): Promise<void> {
  const db = getDb();
  if (!db) throw notConfigured();
  const now = new Date();
  const author = updatedBy ?? null;
  await db
    .insert(contentEntities)
    .values({
      key: entityKey,
      draftJson: json,
      updatedAt: now,
      updatedBy: author,
    })
    .onConflictDoUpdate({
      target: contentEntities.key,
      set: { draftJson: json, updatedAt: now, updatedBy: author },
    });
}

export async function publish(
  entityKey: string,
  json: unknown,
  publishedBy?: string,
): Promise<void> {
  const db = getDb();
  if (!db) throw notConfigured();
  const now = new Date();
  const author = publishedBy ?? null;
  const revision = {
    id: crypto.randomUUID(),
    entityKey,
    json,
    status: "published",
    note: null,
    createdAt: now,
    author,
  };
  await db.batch([
    db
      .insert(contentEntities)
      .values({
        key: entityKey,
        draftJson: json,
        publishedJson: json,
        updatedAt: now,
        publishedAt: now,
        updatedBy: author,
      })
      .onConflictDoUpdate({
        target: contentEntities.key,
        set: {
          draftJson: json,
          publishedJson: json,
          updatedAt: now,
          publishedAt: now,
          updatedBy: author,
        },
      }),
    db.insert(revisions).values(revision),
  ]);
}

export async function listEntities(
  prefix?: string,
): Promise<ContentEntityRow[]> {
  const db = getDb();
  if (!db) return [];
  const query = db.select().from(contentEntities);
  if (prefix) {
    return query
      .where(like(contentEntities.key, `${prefix}%`))
      .orderBy(contentEntities.key);
  }
  return query.orderBy(contentEntities.key);
}

export async function getRevisionHistory(
  entityKey: string,
): Promise<RevisionRow[]> {
  const db = getDb();
  if (!db) return [];
  return db
    .select()
    .from(revisions)
    .where(eq(revisions.entityKey, entityKey))
    .orderBy(desc(revisions.createdAt));
}
