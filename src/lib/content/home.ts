import { assets, values, type DownloadItem, type NewsItem } from "@/lib/data";
import { type Locale } from "@/lib/i18n/locales";
import { getBoardItems } from "./boards";
import { resolveActiveLocale } from "./locale";
import { getContentRows } from "./page-content";
import { keysForGroup } from "./registry";
import { resolveHomeFromRows } from "./registry/home-resolve";

export async function getHomePage(locale?: Locale) {
  const activeLocale = await resolveActiveLocale(locale);
  const [rows, newsItems, downloadItems] = await Promise.all([
    getContentRows(keysForGroup("home")),
    getBoardItems("news", activeLocale),
    getBoardItems("downloads", activeLocale),
  ]);

  const news: NewsItem[] = newsItems.map((item) => ({
    category: item.category === "EVENT" ? "EVENT" : "NEWS",
    title: item.title,
    date: item.date,
    idx: item.idx,
    href: `/news/${item.idx}`,
  }));

  const downloads: DownloadItem[] = downloadItems.map((item) => ({
    title: item.title,
    date: item.date,
    idx: item.idx,
    href: `/downloads/${item.idx}`,
  }));

  return {
    assets,
    values,
    news,
    downloads,
    content: resolveHomeFromRows(rows, activeLocale),
  };
}
