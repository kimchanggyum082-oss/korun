import type { Metadata } from "next";
import ItemEditor from "@/components/admin/editors/items/ItemEditor";
import {
  interestingItemEntityKey,
  resolveLocalizedText,
} from "@/lib/admin/entities";
import { loadEditableEntity } from "@/lib/admin/entity-store";
import { isUploadConfigured } from "@/lib/admin/blob";
import { isDatabaseConfigured } from "@/lib/db/client";
import { itemsDict } from "@/lib/i18n/boards/items";
import { getAdminLocale } from "@/lib/i18n/admin-server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idx: string }>;
}): Promise<Metadata> {
  const { idx } = await params;
  const { value } = await loadEditableEntity(interestingItemEntityKey(idx));
  const locale = await getAdminLocale();
  const title = resolveLocalizedText(value.title) || "New post";
  return {
    title: `${title} | ${itemsDict[locale].meta.itemSuffix}`,
  };
}

export default async function AdminInterestingItemPage({
  params,
}: {
  params: Promise<{ idx: string }>;
}) {
  const { idx } = await params;
  const { value, source } = await loadEditableEntity(
    interestingItemEntityKey(idx),
  );

  return (
    <ItemEditor
      initial={value}
      source={source}
      storeReady={isDatabaseConfigured()}
      uploadConfigured={isUploadConfigured()}
    />
  );
}
