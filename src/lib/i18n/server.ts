import { resolveActiveLocale } from "@/lib/content/locale";
import { chrome } from "@/lib/i18n/chrome";
import type { ChromeDict } from "@/lib/i18n/chrome";
import type { Locale } from "@/lib/i18n/locales";

export async function getChrome(locale?: Locale): Promise<ChromeDict> {
  const active = await resolveActiveLocale(locale);
  return chrome[active];
}
