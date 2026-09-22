import {
  aboutContent,
  assets,
  jobPosts,
  type AboutContentMap,
} from "@/lib/data";
import { type Locale } from "@/lib/i18n/locales";
import { resolveEntity } from "./resolve";
import { getSiteSettings } from "./site";
import { localizeTree } from "./merge";
import { resolveActiveLocale } from "./locale";

export type AboutPageKey = keyof AboutContentMap;

export async function getAboutPage<K extends AboutPageKey>(
  key: K,
  locale?: Locale,
) {
  const activeLocale = await resolveActiveLocale(locale);
  const company = await getSiteSettings(activeLocale);
  const value = await resolveEntity(`page:about:${key}`, {
    key,
    company,
    assets,
    jobPosts,
    content: aboutContent[key],
  });
  return localizeTree(activeLocale, value);
}
