import type { Metadata } from "next";
import ItemList from "@/components/admin/editors/items/ItemList";
import { getBoardItems } from "@/lib/content";
import { itemsDict } from "@/lib/i18n/boards/items";
import { getAdminLocale } from "@/lib/i18n/admin-server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getAdminLocale();
  return { title: itemsDict[locale].meta.listTitle };
}

export default async function AdminInterestingItemsPage() {
  const items = await getBoardItems("interesting-items");

  return <ItemList items={items} />;
}
