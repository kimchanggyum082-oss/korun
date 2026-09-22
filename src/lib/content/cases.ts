import { casePages, type CasePageData } from "@/lib/data";
import { resolveCollection, resolveEntity } from "./resolve";
import { localizeTree } from "./merge";

export async function getCasePages(
  locale = "ko",
): Promise<Record<string, CasePageData>> {
  const value = await resolveCollection("case:", casePages, "page:cases");
  return locale === "ko" ? value : localizeTree(locale, value);
}

export async function getCasePage(
  slug: string,
  locale = "ko",
): Promise<CasePageData | undefined> {
  const base = casePages[slug];
  if (!base) return undefined;
  const value = await resolveEntity(`case:${slug}`, base);
  return locale === "ko" ? value : localizeTree(locale, value);
}
