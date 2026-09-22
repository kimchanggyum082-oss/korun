import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsEditor from "@/components/admin/editors/news/NewsEditor";
import { newsEntityKey, resolveLocalizedText } from "@/lib/admin/entities";
import { loadEditableEntity } from "@/lib/admin/entity-store";
import { isBlobConfigured } from "@/lib/admin/blob";
import { isDatabaseConfigured } from "@/lib/db/client";
import { newsItems } from "@/lib/data";

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
  return { title: `${resolveLocalizedText(value.title)} | KORUN Admin` };
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
      uploadConfigured={isBlobConfigured()}
    />
  );
}
