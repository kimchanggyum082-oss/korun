import type { Metadata } from "next";
import { defaultLocale, localizeHref, locales, type Locale } from "./locales";

export function siteUrl(): string | undefined {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    "";
  if (!raw) return undefined;
  return raw.replace(/\/+$/, "");
}

export function absoluteUrl(path: string, locale: Locale): string | undefined {
  const base = siteUrl();
  if (!base) return undefined;
  return `${base}${localizeHref(path, locale)}`;
}

export function metadataAlternates(
  path: string,
  locale: Locale,
): Metadata["alternates"] {
  const canonical = absoluteUrl(path, locale);
  const base = siteUrl();
  if (!canonical || !base) return undefined;
  const languages: Record<string, string> = {};
  for (const entry of locales) {
    languages[entry] = `${base}${localizeHref(path, entry)}`;
  }
  languages["x-default"] = `${base}${localizeHref(path, defaultLocale)}`;
  return { canonical, languages };
}

export function metadataBaseUrl(): URL | undefined {
  const base = siteUrl();
  return base ? new URL(base) : undefined;
}
