"use client";

import { usePathname } from "next/navigation";
import {
  defaultLocale,
  hasLocale,
  localizeHref,
  stripLocalePrefix,
} from "./locales";
import type { Locale } from "./locales";

export function useLocale(): Locale {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];
  return hasLocale(segment) ? segment : defaultLocale;
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
