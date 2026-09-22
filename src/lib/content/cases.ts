import { casePages, type CasePageData } from "@/lib/data";
import { type Locale } from "@/lib/i18n/locales";
import { resolveCollection, resolveEntity } from "./resolve";
import { localizeTree } from "./merge";
import { resolveActiveLocale } from "./locale";

export async function getCasePages(
  locale?: Locale,
): Promise<Record<string, CasePageData>> {
  const activeLocale = await resolveActiveLocale(locale);
  const value = await resolveCollection("case:", casePages, "page:cases");
  return localizeTree(activeLocale, value);
}

export async function getCasePage(
  slug: string,
  locale?: Locale,
): Promise<CasePageData | undefined> {
  const activeLocale = await resolveActiveLocale(locale);
  const base = casePages[slug];
  if (!base) return undefined;
  const value = await resolveEntity(`case:${slug}`, base);
  return localizeTree(activeLocale, value);
}
