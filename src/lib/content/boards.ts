import { getPublished, listEntities } from "./store";
import { applyOverride } from "./merge";
import { localizeTree } from "./merge";
import { type Locale } from "@/lib/i18n/locales";
import { resolveActiveLocale } from "./locale";

import {
  caseStudioItems,
  downloadItems,
  interestingItems,
  jobPosts,
  newsItems,
  type InterestingItem,
  type ServiceCaseStudioItem,
  type ServiceDownloadItem,
  type ServiceNewsItem,
} from "@/lib/data";

export type BoardName =
  "news" | "downloads" | "case-studio" | "interesting-items" | "job-posting";

type BoardItemMap = {
  news: ServiceNewsItem;
  downloads: ServiceDownloadItem;
  "case-studio": ServiceCaseStudioItem;
  "interesting-items": InterestingItem;
  "job-posting": (typeof jobPosts)[number];
};

const boardSources: { [B in BoardName]: BoardItemMap[B][] } = {
  news: newsItems,
  downloads: downloadItems,
  "case-studio": caseStudioItems,
  "interesting-items": interestingItems,
  "job-posting": jobPosts,
};

export async function getBoardItems<B extends BoardName>(
  board: B,
  locale?: Locale,
): Promise<BoardItemMap[B][]> {
  const activeLocale = await resolveActiveLocale(locale);
  const defaults: BoardItemMap[B][] = boardSources[board];
  const collectionOverride = await getPublished(`boards:${board}`);
  let items: BoardItemMap[B][] =
    collectionOverride === null || collectionOverride === undefined
      ? defaults
      : (applyOverride(defaults, collectionOverride) as BoardItemMap[B][]);

  const overrides = await listEntities(`board:${board}:`);
  if (overrides.length > 0) {
    const byIdx = new Map<string, unknown>();
    for (const row of overrides) {
      if (row.publishedJson === null || row.publishedJson === undefined)
        continue;
      byIdx.set(row.key.slice(`board:${board}:`.length), row.publishedJson);
    }
    items = items.map((item) => {
      const override = byIdx.get(item.idx);
      return override === undefined
        ? item
        : (applyOverride(item, override) as BoardItemMap[B]);
    });
  }
  return localizeTree(activeLocale, items);
}

export async function getBoardItem<B extends BoardName>(
  board: B,
  idx: string,
  locale?: Locale,
): Promise<BoardItemMap[B] | undefined> {
  const activeLocale = await resolveActiveLocale(locale);
  const items = await getBoardItems(board, activeLocale);
  return items.find((item) => item.idx === idx);
}
