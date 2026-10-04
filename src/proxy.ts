import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  LOCALE_COOKIE,
  LOCALE_HEADER,
  defaultLocale,
  locales,
} from "@/lib/i18n/locales";

const ADMIN_SESSION_COOKIE = "korun_admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function isEnglishAdmin(pathname: string): boolean {
  return pathname === "/en/admin" || pathname.startsWith("/en/admin/");
}

function isAdminPath(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function isAdminLoginPath(pathname: string): boolean {
  return pathname === "/admin/login" || pathname.startsWith("/admin/login/");
}

function isLocalizedPath(pathname: string): boolean {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

function legacyAdminRedirect(pathname: string): string | null {
  let prefix = "";
  let adminPath = pathname;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    prefix = "/en";
    adminPath = pathname.slice(3) || "/admin";
  }

  if (!isAdminPath(adminPath)) return null;

  let target: string | null = null;
  if (adminPath === "/admin/home") {
    target = "/admin/pages?group=home";
  } else if (
    adminPath === "/admin/about" ||
    adminPath.startsWith("/admin/about/")
  ) {
    target = "/admin/pages?group=about";
  } else if (
    adminPath === "/admin/products" ||
    adminPath.startsWith("/admin/products/")
  ) {
    target = "/admin/pages?group=products";
  } else if (
    adminPath === "/admin/cases" ||
    adminPath.startsWith("/admin/cases/")
  ) {
    target = "/admin/pages?group=cases";
  } else if (
    adminPath === "/admin/site/settings" ||
    adminPath === "/admin/site/footer" ||
    adminPath === "/admin/site/ui-strings" ||
    adminPath === "/admin/site/policy" ||
    adminPath === "/admin/site/nav"
  ) {
    target = "/admin/pages?group=site";
  } else if (
    adminPath === "/admin/media" ||
    adminPath === "/admin/revisions" ||
    adminPath === "/admin/technology/items"
  ) {
    target = "/admin";
  }

  return target ? `${prefix}${target}` : null;
}

/**
 * Tag the request with the admin locale (header primary, cookie fallback) and,
 * for `/en/admin/*`, rewrite to the single `/admin/*` route tree.
 */
function adminResponse(
  request: NextRequest,
  locale: string,
  rewritePath?: string,
): NextResponse {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);

  let response: NextResponse;
  if (rewritePath) {
    const url = request.nextUrl.clone();
    url.pathname = rewritePath;
    response = NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    });
  } else {
    response = NextResponse.next({ request: { headers: requestHeaders } });
  }
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const legacyAdmin = legacyAdminRedirect(pathname);
  if (legacyAdmin) {
    return NextResponse.redirect(new URL(legacyAdmin, request.url), 308);
  }

  if (isEnglishAdmin(pathname)) {
    const adminPath = pathname.slice(3) || "/admin";
    if (
      !isAdminLoginPath(adminPath) &&
      !request.cookies.has(ADMIN_SESSION_COOKIE)
    ) {
      return NextResponse.redirect(new URL("/en/admin/login", request.url));
    }
    return adminResponse(request, "en", adminPath);
  }

  if (isAdminPath(pathname)) {
    if (
      !isAdminLoginPath(pathname) &&
      !request.cookies.has(ADMIN_SESSION_COOKIE)
    ) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return adminResponse(request, "ko");
  }

  if (isLocalizedPath(pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
