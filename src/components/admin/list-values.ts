import type { LocalizedValue } from "./fields";

/** One row inside a page-content `list` value. */
export type ListRow = Record<string, LocalizedValue>;

/**
 * List values arrive either as a native array (bundled defaults) or as a JSON
 * string (saved by the list editor). Normalize both into rows.
 */
export function parseListRows(value: unknown): ListRow[] {
  if (Array.isArray(value)) return value as ListRow[];
  if (typeof value !== "string" || value.trim().length === 0) return [];
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? (parsed as ListRow[]) : [];
  } catch {
    return [];
  }
}
