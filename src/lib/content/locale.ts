import { defaultLocale, hasLocale, type Locale } from "@/lib/i18n/locales";

export async function resolveActiveLocale(explicit?: Locale): Promise<Locale> {
  if (explicit !== undefined) return explicit;
  try {
    const { lang } = await import("next/root-params");
    const value = await lang();
    return typeof value === "string" && hasLocale(value)
      ? value
      : defaultLocale;
  } catch {
    return defaultLocale;
  }
}
