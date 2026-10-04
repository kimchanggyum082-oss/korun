export const locales = ["ko", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ko";

/** Persisted locale preference (1yr). The URL prefix stays the source of truth. */
export const LOCALE_COOKIE = "korun_locale";
/** Internal request header set by the proxy so server components know the locale. */
export const LOCALE_HEADER = "x-korun-locale";

export function hasLocale(value: string | null | undefined): value is Locale {
  return (
    typeof value === "string" && (locales as readonly string[]).includes(value)
  );
}

export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split("/");
  if (hasLocale(segments[1])) {
    const rest = segments.slice(2).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname;
}

export function localizeHref(href: string, locale: Locale): string {
  const path = href.startsWith("/") ? href : `/${href}`;
  if (
    locale === defaultLocale ||
    path.startsWith(`/${locale}/`) ||
    path === `/${locale}`
  ) {
    return path;
  }
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Locale implied by a URL path ("…/en/…" → en, otherwise default). */
export function getPathLocale(pathname: string | null | undefined): Locale {
  if (!pathname) return defaultLocale;
  const segment = pathname.split("/")[1];
  return hasLocale(segment) ? segment : defaultLocale;
}

/** Keep the current page, just flip the locale prefix. */
export function switchLocalePath(pathname: string, locale: Locale): string {
  return localizeHref(stripLocalePrefix(pathname), locale);
}
