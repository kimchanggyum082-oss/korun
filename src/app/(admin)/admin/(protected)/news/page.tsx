import type { Metadata } from "next";
import NewsList from "@/components/admin/editors/news/NewsList";
import { getBoardItems } from "@/lib/content";
import { newsDict } from "@/lib/i18n/boards/news";
import { getAdminLocale } from "@/lib/i18n/admin-server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getAdminLocale();
  return { title: newsDict[locale].meta.listTitle };
}

export default async function AdminNewsPage() {
  const items = await getBoardItems("news");

  return <NewsList items={items} />;
}
