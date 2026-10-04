import { type CasePageData } from "@/lib/data";
import { type Locale } from "@/lib/i18n/locales";
import { resolveActiveLocale } from "./locale";
import { getContentRows } from "./page-content";
import { keysForGroup } from "./registry";
import { resolveCasesFromRows } from "./registry/cases-resolve";

export async function getCasePages(
  locale?: Locale,
): Promise<Record<string, CasePageData>> {
  const activeLocale = await resolveActiveLocale(locale);
  const rows = await getContentRows(keysForGroup("cases"));
  return resolveCasesFromRows(rows, activeLocale);
}

export async function getCasePage(
  slug: string,
  locale?: Locale,
): Promise<CasePageData | undefined> {
  const activeLocale = await resolveActiveLocale(locale);
  const rows = await getContentRows(keysForGroup("cases"));
  return resolveCasesFromRows(rows, activeLocale)[slug];
}
