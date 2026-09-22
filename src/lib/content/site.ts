import { company, nav } from "@/lib/data";
import { siteFooterDefault } from "@/lib/admin/entity-store";
import { type Locale } from "@/lib/i18n/locales";
import { resolveEntity } from "./resolve";
import { localizeTree } from "./merge";
import { resolveActiveLocale } from "./locale";

export async function getSiteSettings(locale?: Locale) {
  const activeLocale = await resolveActiveLocale(locale);
  const value = await resolveEntity("site:settings", company);
  const settings = localizeTree(activeLocale, value);
  if (activeLocale === "en" && settings.nameEn) {
    return { ...settings, name: settings.nameEn };
  }
  return settings;
}

export async function getNav(locale?: Locale) {
  const activeLocale = await resolveActiveLocale(locale);
  const value = await resolveEntity("site:nav", nav);
  return localizeTree(activeLocale, value);
}

export async function getFooter(locale?: Locale) {
  const activeLocale = await resolveActiveLocale(locale);
  const value = await resolveEntity("site:footer", siteFooterDefault());
  return localizeTree(activeLocale, value);
}
