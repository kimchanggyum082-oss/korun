"use server";

import { and, eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db/client";
import { pageContents } from "@/lib/db/schema";
import { getAdminSession } from "@/lib/auth/session";
import { stripLocalePrefix } from "@/lib/i18n/locales";
import {
  MAX_LENGTH,
  isAllowedMediaUrl,
  isSharedKind,
} from "@/lib/content/registry-types";
import { isAllowedLink } from "@/lib/content/registry/links";
import { CONTENT_DEF_MAP } from "@/lib/content/registry";
import type { Locale } from "@/lib/i18n/locales";

export type SaveResult = { ok: boolean; message?: string };

/**
 * The public site renders under `/[lang]`, so a canonical path like
 * `/about/greetings` must also be revalidated as `/ko/about/greetings` and
 * `/en/about/greetings` (the `/ko` URL is a proxy rewrite of the same page).
 */
function localizedVariants(path: string): string[] {
  if (path.startsWith("/admin") || path.startsWith("/api")) return [path];
  const base = stripLocalePrefix(path);
  if (base === "/") return ["/", "/ko", "/en"];
  return [base, `/ko${base}`, `/en${base}`];
}

/**
 * Save one page-content key for one locale. Empty value = remove the override
 * (falls back to the data-file default). `url` keys are language-common and are
 * written to both locales, matching MCell's `savePageContent`.
 */
export async function savePageContent(
  key: string,
  locale: Locale,
  value: string,
): Promise<SaveResult> {
  const session = await getAdminSession();
  if (!session) return { ok: false, message: "권한이 없습니다." };

  const def = CONTENT_DEF_MAP[key];
  if (!def) return { ok: false, message: "알 수 없는 콘텐츠 키입니다." };

  const trimmed = value.trim();
  if (trimmed.length > MAX_LENGTH[def.kind]) {
    return { ok: false, message: "값이 너무 깁니다." };
  }
  if (trimmed && (def.kind === "image" || def.kind === "url")) {
    if (!isAllowedMediaUrl(trimmed)) {
      return { ok: false, message: "URL 형식이 올바르지 않습니다." };
    }
  }
  if (trimmed && def.kind === "link" && !isAllowedLink(trimmed)) {
    return { ok: false, message: "링크 형식이 올바르지 않습니다." };
  }
  if (trimmed && (def.kind === "list" || def.kind === "imageList")) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      return { ok: false, message: "목록 형식이 올바르지 않습니다." };
    }
    if (!Array.isArray(parsed)) {
      return { ok: false, message: "목록 형식이 올바르지 않습니다." };
    }
    if (def.maxItems !== undefined && parsed.length > def.maxItems) {
      return {
        ok: false,
        message: `목록은 최대 ${def.maxItems}개까지 저장할 수 있습니다.`,
      };
    }
    for (const row of parsed as Record<string, unknown>[]) {
      if (typeof row !== "object" || row === null) {
        return { ok: false, message: "목록 형식이 올바르지 않습니다." };
      }
      for (const [fieldKey, value] of Object.entries(row)) {
        const candidate = typeof value === "string" ? value.trim() : "";
        if (!candidate) continue;
        const field = def.fields?.find((entry) => entry.key === fieldKey);
        if (field?.kind === "link") {
          if (!isAllowedLink(candidate)) {
            return { ok: false, message: "링크 형식이 올바르지 않습니다." };
          }
        } else if (
          def.kind === "imageList" ||
          field?.kind === "image" ||
          field?.kind === "url"
        ) {
          if (!isAllowedMediaUrl(candidate)) {
            return { ok: false, message: "URL 형식이 올바르지 않습니다." };
          }
        }
      }
    }
  }

  const db = getDb();
  if (!db) {
    return { ok: false, message: "데이터베이스가 설정되지 않았습니다." };
  }

  const locales: Locale[] = isSharedKind(def.kind) ? ["ko", "en"] : [locale];
  const now = new Date();
  const author = session.email;

  if (!trimmed) {
    await db
      .delete(pageContents)
      .where(
        and(eq(pageContents.key, key), inArray(pageContents.locale, locales)),
      );
  } else {
    for (const loc of locales) {
      await db
        .insert(pageContents)
        .values({
          key,
          locale: loc,
          value: trimmed,
          updatedAt: now,
          updatedBy: author,
        })
        .onConflictDoUpdate({
          target: [pageContents.key, pageContents.locale],
          set: { value: trimmed, updatedAt: now, updatedBy: author },
        });
    }
  }

  for (const path of def.revalidate) {
    for (const variant of localizedVariants(path)) revalidatePath(variant);
  }
  revalidatePath("/", "layout");
  return { ok: true };
}
