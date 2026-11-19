import type { Metadata } from "next";
import NewsList from "@/components/admin/editors/news/NewsList";
import { getAdminBoardItems } from "@/lib/content";
import { newsDict } from "@/lib/i18n/boards/news";
import { getAdminLocale } from "@/lib/i18n/admin-server";
import { localizeHref } from "@/lib/i18n/locales";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getAdminLocale();
  return { title: newsDict[locale].meta.listTitle };
}

export default async function AdminNewsPage() {
  const locale = await getAdminLocale();
  const items = await getAdminBoardItems("news", locale);
  const newHref = localizeHref(`/admin/news/${crypto.randomUUID()}`, locale);

  return <NewsList items={items} newHref={newHref} />;
}
