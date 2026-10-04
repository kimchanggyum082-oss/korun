"use client";

import { usePathname } from "next/navigation";
import { getPathLocale, localizeHref, stripLocalePrefix } from "./locales";
import type { Locale } from "./locales";

export function useLocale(): Locale {
  const pathname = usePathname();
  return getPathLocale(pathname);
}

export function localeSwitchHref(
  pathname: string,
  search: string,
  locale: Locale,
): string {
  const path = localizeHref(stripLocalePrefix(pathname), locale);
  const query = search ? (search.startsWith("?") ? search : `?${search}`) : "";
  return `${path}${query}`;
}
