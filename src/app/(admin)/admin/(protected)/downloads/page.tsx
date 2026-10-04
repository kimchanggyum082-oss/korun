import type { Metadata } from "next";
import DownloadList from "@/components/admin/editors/service/DownloadList";
import { getBoardItems } from "@/lib/content";
import { downloadsDict } from "@/lib/i18n/boards/downloads";
import { getAdminLocale } from "@/lib/i18n/admin-server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getAdminLocale();
  return { title: downloadsDict[locale].meta.listTitle };
}

export default async function AdminDownloadsPage() {
  const items = await getBoardItems("downloads");

  return <DownloadList items={items} />;
}
