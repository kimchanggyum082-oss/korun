import type { Metadata } from "next";
import ItemList from "@/components/admin/editors/items/ItemList";
import { getBoardItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "기술 자료 | KORUN Admin",
};

export default async function AdminInterestingItemsPage() {
  const items = await getBoardItems("interesting-items");

  return <ItemList items={items} />;
}
