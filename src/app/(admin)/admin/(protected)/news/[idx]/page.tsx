import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsEditor from "@/components/admin/editors/news/NewsEditor";
import { newsEntityKey, resolveLocalizedText } from "@/lib/admin/entities";
import { loadEditableEntity } from "@/lib/admin/entity-store";
import { isUploadConfigured } from "@/lib/admin/blob";
import { isDatabaseConfigured } from "@/lib/db/client";
import { newsItems } from "@/lib/data";
import { newsDict } from "@/lib/i18n/boards/news";
import { getAdminLocale } from "@/lib/i18n/admin-server";

function findNews(idx: string) {
  return newsItems.find((item) => item.idx === idx);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idx: string }>;
}): Promise<Metadata> {
  const { idx } = await params;
  const fallback = findNews(idx);
  if (!fallback) return {};
  const { value } = await loadEditableEntity(newsEntityKey(idx));
  const locale = await getAdminLocale();
  return {
    title: `${resolveLocalizedText(value.title)} | ${newsDict[locale].meta.itemSuffix}`,
  };
}

export default async function AdminNewsItemPage({
  params,
}: {
  params: Promise<{ idx: string }>;
}) {
  const { idx } = await params;
  if (!findNews(idx)) notFound();

  const { value, source } = await loadEditableEntity(newsEntityKey(idx));

  return (
    <NewsEditor
      initial={value}
      source={source}
      storeReady={isDatabaseConfigured()}
      uploadConfigured={isUploadConfigured()}
    />
  );
}
