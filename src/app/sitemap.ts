import type { MetadataRoute } from "next";
import { getBoardItems, getCasePages, getProductPages } from "@/lib/content";
import { defaultLocale, localizeHref, locales } from "@/lib/i18n/locales";
import { siteUrl } from "@/lib/i18n/seo";

const STATIC_PATHS = [
  "/",
  "/about/greetings",
  "/about/patent-credentials",
  "/about/company-location",
  "/about/job-posting",
  "/news",
  "/downloads",
  "/case-studio",
  "/technology/interesting-items",
];

function alternates(path: string, base: string) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${base}${localizeHref(path, locale)}`;
  }
  languages["x-default"] = `${base}${localizeHref(path, defaultLocale)}`;
  return { languages };
}

function parseDate(value: string | undefined, fallback: Date): Date {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  if (!base) return [];

  const now = new Date();
  const [products, cases, news, downloads, caseStudio, interestingItems] =
    await Promise.all([
      getProductPages(defaultLocale),
      getCasePages(defaultLocale),
      getBoardItems("news", defaultLocale),
      getBoardItems("downloads", defaultLocale),
      getBoardItems("case-studio", defaultLocale),
      getBoardItems("interesting-items", defaultLocale),
    ]);

  const routes: { path: string; lastModified: Date }[] = [
    ...STATIC_PATHS.map((path) => ({ path, lastModified: now })),
    ...Object.keys(products).map((page) => ({
      path: `/${page}`,
      lastModified: now,
    })),
    ...Object.keys(cases).map((slug) => ({
      path: `/cases/${slug}`,
      lastModified: now,
    })),
    ...news.map((item) => ({
      path: `/news/${item.idx}`,
      lastModified: parseDate(item.date, now),
    })),
    ...downloads.map((item) => ({
      path: `/downloads/${item.idx}`,
      lastModified: parseDate(item.date, now),
    })),
    ...caseStudio.map((item) => ({
      path: `/case-studio/${item.idx}`,
      lastModified: parseDate(item.date, now),
    })),
    ...interestingItems.map((item) => ({
      path: `/technology/interesting-items/${item.idx}`,
      lastModified: parseDate(item.date, now),
    })),
  ];

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${base}${localizeHref(route.path, locale)}`,
      lastModified: route.lastModified,
      alternates: alternates(route.path, base),
    })),
  );
}
