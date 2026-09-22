export const locales = ["ko", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ko";

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
