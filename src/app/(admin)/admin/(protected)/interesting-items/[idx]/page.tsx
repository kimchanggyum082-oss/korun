import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ItemEditor from "@/components/admin/editors/items/ItemEditor";
import {
  interestingItemEntityKey,
  resolveLocalizedText,
} from "@/lib/admin/entities";
import { loadEditableEntity } from "@/lib/admin/entity-store";
import { isUploadConfigured } from "@/lib/admin/blob";
import { isDatabaseConfigured } from "@/lib/db/client";
import { interestingItems } from "@/lib/data";
import { itemsDict } from "@/lib/i18n/boards/items";
import { getAdminLocale } from "@/lib/i18n/admin-server";

function findItem(idx: string) {
  return interestingItems.find((item) => item.idx === idx);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idx: string }>;
}): Promise<Metadata> {
  const { idx } = await params;
  const fallback = findItem(idx);
  if (!fallback) return {};
  const { value } = await loadEditableEntity(interestingItemEntityKey(idx));
  const locale = await getAdminLocale();
  return {
    title: `${resolveLocalizedText(value.title)} | ${itemsDict[locale].meta.itemSuffix}`,
  };
}

export default async function AdminInterestingItemPage({
  params,
}: {
  params: Promise<{ idx: string }>;
}) {
  const { idx } = await params;
  if (!findItem(idx)) notFound();

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
