import { assets, downloads, news, values } from "@/lib/data";
import { type Locale } from "@/lib/i18n/locales";
import { resolveActiveLocale } from "./locale";
import { getContentRows } from "./page-content";
import { keysForGroup } from "./registry";
import { resolveHomeFromRows } from "./registry/home-resolve";

export async function getHomePage(locale?: Locale) {
  const activeLocale = await resolveActiveLocale(locale);
  const rows = await getContentRows(keysForGroup("home"));
  return {
    assets,
    values,
    news,
    downloads,
    content: resolveHomeFromRows(rows, activeLocale),
  };
}
