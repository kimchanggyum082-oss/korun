import { assets, downloads, homeContent, news, values } from "@/lib/data";
import { type Locale } from "@/lib/i18n/locales";
import { resolveEntity } from "./resolve";
import { localizeTree } from "./merge";
import { resolveActiveLocale } from "./locale";

export async function getHomePage(locale?: Locale) {
  const activeLocale = await resolveActiveLocale(locale);
  const value = await resolveEntity("page:home", {
    assets,
    values,
    news,
    downloads,
    content: homeContent,
  });
  return localizeTree(activeLocale, value);
}
