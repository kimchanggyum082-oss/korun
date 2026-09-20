import { casePages, type CasePageData } from "@/lib/data";

export function getCasePages(): Record<string, CasePageData> {
  return casePages;
}

export function getCasePage(slug: string): CasePageData | undefined {
  return casePages[slug];
}
