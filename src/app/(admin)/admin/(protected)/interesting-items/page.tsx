import type { Metadata } from "next";
import ItemList from "@/components/admin/editors/items/ItemList";
import { getAdminBoardItems } from "@/lib/content";
import { itemsDict } from "@/lib/i18n/boards/items";
import { getAdminLocale } from "@/lib/i18n/admin-server";
import { localizeHref } from "@/lib/i18n/locales";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getAdminLocale();
  return { title: itemsDict[locale].meta.listTitle };
}

export default async function AdminInterestingItemsPage() {
  const locale = await getAdminLocale();
  const items = await getAdminBoardItems("interesting-items", locale);
  const newHref = localizeHref(
    `/admin/interesting-items/${crypto.randomUUID()}`,
    locale,
  );

  return <ItemList items={items} newHref={newHref} />;
}
