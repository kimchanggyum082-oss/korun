import type { Metadata } from "next";
import CaseStudioList from "@/components/admin/editors/service/CaseStudioList";
import { getAdminBoardItems } from "@/lib/content";
import { caseStudioDict } from "@/lib/i18n/boards/caseStudio";
import { getAdminLocale } from "@/lib/i18n/admin-server";
import { localizeHref } from "@/lib/i18n/locales";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getAdminLocale();
  return { title: caseStudioDict[locale].meta.listTitle };
}

export default async function AdminCaseStudioPage() {
  const locale = await getAdminLocale();
  const items = await getAdminBoardItems("case-studio", locale);
  const newHref = localizeHref(
    `/admin/case-studio/${crypto.randomUUID()}`,
    locale,
  );

  return <CaseStudioList items={items} newHref={newHref} />;
}
