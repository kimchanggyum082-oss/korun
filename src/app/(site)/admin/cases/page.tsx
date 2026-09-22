import type { Metadata } from "next";
import CaseList from "@/components/admin/editors/cases/CaseList";
import { getCasePages } from "@/lib/content";

export const metadata: Metadata = {
  title: "적용 사례 | KORUN Admin",
};

export default async function AdminCasesPage() {
  const pages = await getCasePages();

  return <CaseList pages={pages} />;
}
