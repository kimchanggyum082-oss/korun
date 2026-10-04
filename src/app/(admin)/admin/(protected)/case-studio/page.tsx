import type { Metadata } from "next";
import CaseStudioList from "@/components/admin/editors/service/CaseStudioList";
import { getBoardItems } from "@/lib/content";
import { caseStudioDict } from "@/lib/i18n/boards/caseStudio";
import { getAdminLocale } from "@/lib/i18n/admin-server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getAdminLocale();
  return { title: caseStudioDict[locale].meta.listTitle };
}

export default async function AdminCaseStudioPage() {
  const items = await getBoardItems("case-studio");

  return <CaseStudioList items={items} />;
}
