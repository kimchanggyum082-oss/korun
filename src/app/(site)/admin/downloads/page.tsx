import type { Metadata } from "next";
import DownloadList from "@/components/admin/editors/service/DownloadList";
import { getBoardItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "다운로드 | KORUN Admin",
};

export default async function AdminDownloadsPage() {
  const items = await getBoardItems("downloads");

  return <DownloadList items={items} />;
}
