import { getPublished, listEntities } from "./store";
import { applyOverride, localizeTree } from "./merge";
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

function nextNo(items: readonly { no: number }[]): number {
  return items.reduce((max, item) => Math.max(max, item.no), 0) + 1;
}

/**
 * A blank board item used when an admin creates a new post. Keeping this next
 * to `boardSources` makes the public resolver and the admin editor agree on the
 * shape of a new item.
 */
export function blankBoardItem<B extends BoardName>(
  board: B,
  idx: string,
): BoardItemMap[B] {
  switch (board) {
    case "news":
      return {
        idx,
        category: "",
        title: "",
        author: "",
        date: "",
        views: 0,
        likes: 0,
        notice: false,
        description: "",
        blocks: [],
        files: [],
      } as unknown as BoardItemMap[B];
    case "downloads":
      return {
        idx,
        title: "",
        date: "",
        views: 0,
        thumbnail: "",
        description: "",
        summary: "",
        blocks: [],
        files: [],
      } as unknown as BoardItemMap[B];
    case "case-studio":
      return {
        idx,
        title: "",
        date: "",
        views: 0,
        thumbnail: "",
        description: "",
        summary: "",
        blocks: [],
        files: [],
      } as unknown as BoardItemMap[B];
    case "interesting-items":
      return {
        idx,
        no: nextNo(interestingItems),
        category: "",
        title: "",
        author: "",
        date: "",
        views: 0,
        thumbnail: "",
        description: "",
        blocks: [],
        files: [],
      } as unknown as BoardItemMap[B];
    case "job-posting":
      return {
        idx,
        no: nextNo(jobPosts),
        title: "",
        author: "",
        date: "",
        views: 0,
        blocks: [],
        files: [],
      } as unknown as BoardItemMap[B];
  }
}

async function boardEntityOverrides(
  board: BoardName,
  includeDrafts: boolean,
): Promise<Map<string, unknown>> {
  const prefix = `board:${board}:`;
  const rows = await listEntities(prefix);
  const overrides = new Map<string, unknown>();
  for (const row of rows) {
    const json = includeDrafts
      ? (row.draftJson ?? row.publishedJson)
      : row.publishedJson;
    if (json === null || json === undefined) continue;
    overrides.set(row.key.slice(prefix.length), json);
  }
  return overrides;
}

/**
 * Apply per-item entities over the bundled/collection list. Items whose idx is
 * not in the base list are new posts and are prepended; existing items keep
 * their position.
 */
export function mergeBoardItems<B extends BoardName>(
  board: B,
  base: BoardItemMap[B][],
  overrides: Map<string, unknown>,
): BoardItemMap[B][] {
  const merged = base.map((item) => {
    const override = overrides.get(item.idx);
    if (override === undefined) return item;
    overrides.delete(item.idx);
    return applyOverride(item, override) as BoardItemMap[B];
  });

  const added: BoardItemMap[B][] = [];
  for (const [idx, override] of overrides) {
    added.push(
      applyOverride(blankBoardItem(board, idx), override) as BoardItemMap[B],
    );
  }

  return [...added, ...merged];
}

async function loadBoardItems<B extends BoardName>(
  board: B,
  includeDrafts: boolean,
): Promise<BoardItemMap[B][]> {
  const defaults: BoardItemMap[B][] = boardSources[board];
  try {
    const collectionOverride = await getPublished(`boards:${board}`);
    const base =
      collectionOverride === null || collectionOverride === undefined
        ? defaults
        : (applyOverride(defaults, collectionOverride) as BoardItemMap[B][]);
    const overrides = await boardEntityOverrides(board, includeDrafts);
    return mergeBoardItems(board, base, overrides);
  } catch (error) {
    console.error(`[content] failed to load board "${board}"`, error);
    return defaults;
  }
}

export async function getBoardItems<B extends BoardName>(
  board: B,
  locale?: Locale,
): Promise<BoardItemMap[B][]> {
  const activeLocale = await resolveActiveLocale(locale);
  const items = await loadBoardItems(board, false);
  return localizeTree(activeLocale, items);
}

/**
 * Admin list variant: shows draft values and includes newly created drafts that
 * have not been published yet.
 */
export async function getAdminBoardItems<B extends BoardName>(
  board: B,
  locale?: Locale,
): Promise<BoardItemMap[B][]> {
  const activeLocale = await resolveActiveLocale(locale);
  const items = await loadBoardItems(board, true);
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
