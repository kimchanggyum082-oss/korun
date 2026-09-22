import { type Locale } from "@/lib/i18n/locales";
import { getBoardItems } from "./boards";
import { resolveActiveLocale } from "./locale";

export async function getSearchIndex(locale?: Locale) {
  const activeLocale = await resolveActiveLocale(locale);
  const [newsItems, downloadItems, caseStudioItems, interestingItems] =
    await Promise.all([
      getBoardItems("news", activeLocale),
      getBoardItems("downloads", activeLocale),
      getBoardItems("case-studio", activeLocale),
      getBoardItems("interesting-items", activeLocale),
    ]);
  return { newsItems, downloadItems, caseStudioItems, interestingItems };
}
