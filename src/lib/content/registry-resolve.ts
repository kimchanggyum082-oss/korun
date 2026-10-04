import type { Locale } from "@/lib/i18n/locales";
import type { ContentRows } from "@/lib/content/page-content";

function raw(
  rows: ContentRows,
  key: string,
  locale: Locale,
): string | undefined {
  const entry = rows[key];
  if (!entry) return undefined;
  const value =
    locale === "en" ? entry.en?.trim() || entry.ko?.trim() : entry.ko?.trim();
  return value || undefined;
}

/** Single line / media URL — en falls back to ko, then to `fallback`. */
export function pickText(
  rows: ContentRows,
  key: string,
  locale: Locale,
  fallback: string,
): string {
  return raw(rows, key, locale) ?? fallback;
}

/** Multi-line copy — one item per line; override replaces the whole list. */
export function pickLines(
  rows: ContentRows,
  key: string,
  locale: Locale,
  fallback: readonly string[],
): string[] {
  const value = raw(rows, key, locale);
  if (value === undefined) return [...fallback];
  return value.split(/\r?\n/);
}

/** JSON list override for `kind: "list"` keys. */
export function pickJson<T>(
  rows: ContentRows,
  key: string,
  locale: Locale,
  fallback: readonly T[],
): T[] {
  const value = raw(rows, key, locale);
  if (value === undefined) return fallback.map((entry) => ({ ...entry }));
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed)
      ? (parsed as T[])
      : fallback.map((e) => ({ ...e }));
  } catch {
    return fallback.map((entry) => ({ ...entry }));
  }
}

/**
 * Raw JSON list override — `undefined` when the key has no stored value, so
 * callers can distinguish "admin replaced the list" from "use the defaults".
 */
export function pickJsonOverride<T>(
  rows: ContentRows,
  key: string,
  locale: Locale,
): T[] | undefined {
  const value = raw(rows, key, locale);
  if (value === undefined) return undefined;
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? (parsed as T[]) : undefined;
  } catch {
    return undefined;
  }
}
