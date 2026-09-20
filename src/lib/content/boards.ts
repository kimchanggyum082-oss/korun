import {
  caseStudioItems,
  downloadItems,
  interestingItems,
  newsItems,
  type InterestingItem,
  type ServiceCaseStudioItem,
  type ServiceDownloadItem,
  type ServiceNewsItem,
} from "@/lib/data";

export type BoardName =
  | "news"
  | "downloads"
  | "case-studio"
  | "interesting-items";

type BoardItemMap = {
  news: ServiceNewsItem;
  downloads: ServiceDownloadItem;
  "case-studio": ServiceCaseStudioItem;
  "interesting-items": InterestingItem;
};

const boardSources: { [B in BoardName]: BoardItemMap[B][] } = {
  news: newsItems,
  downloads: downloadItems,
  "case-studio": caseStudioItems,
  "interesting-items": interestingItems,
};

export function getBoardItems<B extends BoardName>(
  board: B,
): BoardItemMap[B][] {
  return boardSources[board];
}

export function getBoardItem<B extends BoardName>(
  board: B,
  idx: string,
): BoardItemMap[B] | undefined {
  return getBoardItems(board).find((item) => item.idx === idx);
}
