import type { Locale } from "@/lib/i18n/locales";
import type { ContentRows } from "../page-content";
import type { ContentGroup } from "../registry-types";
import { resolveHomeFromRows } from "./home-resolve";
import { resolveAboutFromRows } from "./about-resolve";
import { resolveProductsFromRows } from "./products-resolve";
import { resolveCasesFromRows } from "./cases-resolve";
import { resolveSiteFromRows } from "./site-resolve";

/**
 * Resolve a group's content from override rows. `collect` (when provided) is
 * filled with key → resolved value, used to pre-fill the admin editor with the
 * language defaults.
 */
export function resolveGroupContent(
  group: ContentGroup,
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): unknown {
  switch (group) {
    case "home":
      return resolveHomeFromRows(rows, locale, collect);
    case "about":
      return resolveAboutFromRows(rows, locale, collect);
    case "products":
      return resolveProductsFromRows(rows, locale, collect);
    case "cases":
      return resolveCasesFromRows(rows, locale, collect);
    case "site":
      return resolveSiteFromRows(rows, locale, collect);
    default:
      return null;
  }
}

/** Defaults map for every key in a group (empty rows → data-file defaults). */
export function groupDefaults(
  group: ContentGroup,
  locale: Locale,
): Map<string, string> {
  const collect = new Map<string, string>();
  resolveGroupContent(group, {}, locale, collect);
  return collect;
}
