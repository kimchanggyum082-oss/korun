import {
  caseStudioItems,
  downloadItems,
  interestingItems,
  newsItems,
} from "@/lib/data";

export function getSearchIndex() {
  return { newsItems, downloadItems, caseStudioItems, interestingItems };
}
