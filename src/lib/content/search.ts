import { getBoardItems } from "./boards";

export async function getSearchIndex(locale = "ko") {
  const [newsItems, downloadItems, caseStudioItems, interestingItems] =
    await Promise.all([
      getBoardItems("news", locale),
      getBoardItems("downloads", locale),
      getBoardItems("case-studio", locale),
      getBoardItems("interesting-items", locale),
    ]);
  return { newsItems, downloadItems, caseStudioItems, interestingItems };
}
