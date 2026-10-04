import { type Locale } from "@/lib/i18n/locales";
import { resolveActiveLocale } from "./locale";
import { getContentRows } from "./page-content";
import { keysForGroup } from "./registry";
import { resolveSiteFromRows } from "./registry/site-resolve";

export async function getSiteSettings(locale?: Locale) {
  const activeLocale = await resolveActiveLocale(locale);
  const rows = await getContentRows(keysForGroup("site"));
  const { settings } = resolveSiteFromRows(rows, activeLocale);
  const {
    name,
    nameEn,
    tagline,
    taglineSub,
    tel,
    fax,
    email,
    address,
    mapEmbed,
  } = settings;
  const base = {
    name,
    nameEn,
    tagline,
    taglineSub,
    tel,
    fax,
    email,
    address,
    mapEmbed,
  };
  if (activeLocale === "en" && nameEn) {
    return { ...base, name: nameEn };
  }
  return base;
}

export async function getSiteMetadata(locale?: Locale) {
  const activeLocale = await resolveActiveLocale(locale);
  const rows = await getContentRows(keysForGroup("site"));
  const { settings } = resolveSiteFromRows(rows, activeLocale);
  return settings.metadata;
}

export async function getFooter(locale?: Locale) {
  const activeLocale = await resolveActiveLocale(locale);
  const rows = await getContentRows(keysForGroup("site"));
  const { footer } = resolveSiteFromRows(rows, activeLocale);
  return footer;
}
