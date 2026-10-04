import "server-only";
import { cookies, headers } from "next/headers";
import {
  LOCALE_COOKIE,
  LOCALE_HEADER,
  defaultLocale,
  hasLocale,
  type Locale,
} from "./locales";

/**
 * Server-side admin locale. Priority: proxy header (URL prefix) → cookie →
 * default. The URL prefix (`/en/admin`) is the source of truth, exactly like
 * the public site.
 */
export async function getAdminLocale(): Promise<Locale> {
  const requestHeaders = await headers();
  const fromHeader = requestHeaders.get(LOCALE_HEADER);
  if (hasLocale(fromHeader)) return fromHeader;
  const cookieStore = await cookies();
  const fromCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  if (hasLocale(fromCookie)) return fromCookie;
  return defaultLocale;
}
