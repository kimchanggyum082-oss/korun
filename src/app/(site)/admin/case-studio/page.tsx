import type { Metadata } from "next";
import CaseStudioList from "@/components/admin/editors/service/CaseStudioList";
import { getBoardItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "케이스 스튜디오 | KORUN Admin",
};

export default async function AdminCaseStudioPage() {
  const items = await getBoardItems("case-studio");

  return <CaseStudioList items={items} />;
}
