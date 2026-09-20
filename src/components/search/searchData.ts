import {
  caseStudioItems,
  downloadItems,
  interestingItems,
  newsItems,
  type InterestingItemBlock,
} from "@/lib/data";

export type SearchHit = {
  key: string;
  href: string;
  listHref: string;
  boardName: string;
  title: string;
  summary: string;
  thumbnail: string;
  date: string;
};

export const SEARCH_PAGE_SIZE = 20;

function plainText(blocks: InterestingItemBlock[]): string {
  return blocks
    .filter((block) => block.type === "text")
    .map((block) => (block.type === "text" ? block.content : ""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function countOccurrences(haystack: string, needle: string): number {
  if (!needle) return 0;
  let count = 0;
  let index = haystack.indexOf(needle);
  while (index !== -1) {
    count += 1;
    index = haystack.indexOf(needle, index + needle.length);
  }
  return count;
}

function firstImage(blocks: InterestingItemBlock[]): string {
  const image = blocks.find((block) => block.type === "image");
  return image && image.type === "image" ? image.src : "";
}

export function allSearchHits(): SearchHit[] {
  return [
    ...newsItems.map((item) => ({
      key: `news-${item.idx}`,
      href: `/news/${item.idx}`,
      listHref: "/news",
      boardName: "뉴스&이벤트",
      title: item.title,
      summary: plainText(item.blocks) || item.description,
      thumbnail: firstImage(item.blocks),
      date: item.date,
    })),
    ...downloadItems.map((item) => ({
      key: `downloads-${item.idx}`,
      href: `/downloads/${item.idx}`,
      listHref: "/downloads",
      boardName: "Downloads",
      title: item.title,
      summary: plainText(item.blocks) || item.summary || item.description,
      thumbnail: item.thumbnail,
      date: item.date,
    })),
    ...caseStudioItems.map((item) => ({
      key: `case-studio-${item.idx}`,
      href: `/case-studio/${item.idx}`,
      listHref: "/case-studio",
      boardName: "Case Studio",
      title: item.title,
      summary: plainText(item.blocks) || item.summary || item.description,
      thumbnail: item.thumbnail,
      date: item.date,
    })),
    ...interestingItems.map((item) => ({
      key: `interesting-items-${item.idx}`,
      href: `/technology/interesting-items/${item.idx}`,
      listHref: "/technology/interesting-items",
      boardName: "Interesting Items",
      title: item.title,
      summary: plainText(item.blocks) || item.description,
      thumbnail: item.thumbnail,
      date: item.date,
    })),
  ];
}

export function runSearch(keyword: string, sort: string): SearchHit[] {
  const query = keyword.trim().toLowerCase();
  if (!query) return [];
  const scored = allSearchHits()
    .map((hit) => {
      const title = hit.title.toLowerCase();
      const body = hit.summary.toLowerCase();
      const score =
        countOccurrences(title, query) * 3 + countOccurrences(body, query);
      return { hit, score };
    })
    .filter((entry) => entry.score > 0);
  scored.sort((a, b) => {
    if (sort === "time_desc") {
      if (a.hit.date !== b.hit.date) return a.hit.date < b.hit.date ? 1 : -1;
      if (a.score !== b.score) return b.score - a.score;
    } else {
      if (a.score !== b.score) return b.score - a.score;
      if (a.hit.date !== b.hit.date) return a.hit.date < b.hit.date ? 1 : -1;
    }
    return a.hit.key.localeCompare(b.hit.key);
  });
  return scored.map((entry) => entry.hit);
}
