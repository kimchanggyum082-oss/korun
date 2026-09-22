import type { Metadata } from "next";
import NewsList from "@/components/admin/editors/news/NewsList";
import { getBoardItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "뉴스 | KORUN Admin",
};

export default async function AdminNewsPage() {
  const items = await getBoardItems("news");

  return <NewsList items={items} />;
}
