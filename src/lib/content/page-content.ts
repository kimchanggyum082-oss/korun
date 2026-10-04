import { inArray } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { pageContents } from "@/lib/db/schema";

/** key → per-locale DB values (only keys that have overrides appear). */
export type ContentRows = Record<string, { ko?: string; en?: string }>;

/**
 * Load page-content overrides for the requested keys. Missing/empty values fall
 * back to the data-file defaults at the call site (`pickText`/`pickLines`/
 * `pickJson`). Never throws — returns `{}` when the store is unavailable.
 */
export async function getContentRows(keys: string[]): Promise<ContentRows> {
  if (keys.length === 0) return {};
  const db = getDb();
  if (!db) return {};
  try {
    const rows = await db
      .select()
      .from(pageContents)
      .where(inArray(pageContents.key, keys));
    const out: ContentRows = {};
    for (const row of rows) {
      const entry = (out[row.key] ??= {});
      if (row.locale === "en") entry.en = row.value;
      else entry.ko = row.value;
    }
    return out;
  } catch (error) {
    console.error("[content] failed to load page content rows", error);
    return {};
  }
}
