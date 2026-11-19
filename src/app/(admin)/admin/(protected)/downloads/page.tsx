import type { Metadata } from "next";
import DownloadList from "@/components/admin/editors/service/DownloadList";
import { getAdminBoardItems } from "@/lib/content";
import { downloadsDict } from "@/lib/i18n/boards/downloads";
import { getAdminLocale } from "@/lib/i18n/admin-server";
import { localizeHref } from "@/lib/i18n/locales";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getAdminLocale();
  return { title: downloadsDict[locale].meta.listTitle };
}

export default async function AdminDownloadsPage() {
  const locale = await getAdminLocale();
  const items = await getAdminBoardItems("downloads", locale);
  const newHref = localizeHref(
    `/admin/downloads/${crypto.randomUUID()}`,
    locale,
  );

  return <DownloadList items={items} newHref={newHref} />;
}
