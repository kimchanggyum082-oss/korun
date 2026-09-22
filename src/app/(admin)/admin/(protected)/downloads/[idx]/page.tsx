import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DownloadEditor from "@/components/admin/editors/service/DownloadEditor";
import { downloadEntityKey, resolveLocalizedText } from "@/lib/admin/entities";
import { loadEditableEntity } from "@/lib/admin/entity-store";
import { isBlobConfigured } from "@/lib/admin/blob";
import { isDatabaseConfigured } from "@/lib/db/client";
import { downloadItems } from "@/lib/data";

function findDownload(idx: string) {
  return downloadItems.find((item) => item.idx === idx);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idx: string }>;
}): Promise<Metadata> {
  const { idx } = await params;
  const fallback = findDownload(idx);
  if (!fallback) return {};
  const { value } = await loadEditableEntity(downloadEntityKey(idx));
  return { title: `${resolveLocalizedText(value.title)} | KORUN Admin` };
}

export default async function AdminDownloadItemPage({
  params,
}: {
  params: Promise<{ idx: string }>;
}) {
  const { idx } = await params;
  if (!findDownload(idx)) notFound();

  const { value, source } = await loadEditableEntity(downloadEntityKey(idx));

  return (
    <DownloadEditor
      initial={value}
      source={source}
      storeReady={isDatabaseConfigured()}
      uploadConfigured={isBlobConfigured()}
    />
  );
}
