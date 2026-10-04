import { type AboutContentMap } from "@/lib/data";
import { type Locale } from "@/lib/i18n/locales";
import { resolveActiveLocale } from "./locale";
import { getContentRows } from "./page-content";
import { keysForGroup } from "./registry";
import { resolveAboutFromRows } from "./registry/about-resolve";
import { getSiteSettings } from "./site";

export type AboutPageKey = keyof AboutContentMap;

export async function getAboutPage<K extends AboutPageKey>(
  key: K,
  locale?: Locale,
) {
  const activeLocale = await resolveActiveLocale(locale);
  const [company, rows] = await Promise.all([
    getSiteSettings(activeLocale),
    getContentRows(keysForGroup("about")),
  ]);
  const resolved = resolveAboutFromRows(rows, activeLocale);
  return {
    key,
    company,
    assets: resolved.assets,
    content: resolved.content[key],
  };
}
