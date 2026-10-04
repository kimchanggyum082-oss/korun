import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudioEditor from "@/components/admin/editors/service/CaseStudioEditor";
import { studioEntityKey, resolveLocalizedText } from "@/lib/admin/entities";
import { loadEditableEntity } from "@/lib/admin/entity-store";
import { isUploadConfigured } from "@/lib/admin/blob";
import { isDatabaseConfigured } from "@/lib/db/client";
import { caseStudioItems } from "@/lib/data";
import { caseStudioDict } from "@/lib/i18n/boards/caseStudio";
import { getAdminLocale } from "@/lib/i18n/admin-server";

function findStudio(idx: string) {
  return caseStudioItems.find((item) => item.idx === idx);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idx: string }>;
}): Promise<Metadata> {
  const { idx } = await params;
  const fallback = findStudio(idx);
  if (!fallback) return {};
  const { value } = await loadEditableEntity(studioEntityKey(idx));
  const locale = await getAdminLocale();
  return {
    title: `${resolveLocalizedText(value.title)} | ${caseStudioDict[locale].meta.itemSuffix}`,
  };
}

export default async function AdminCaseStudioItemPage({
  params,
}: {
  params: Promise<{ idx: string }>;
}) {
  const { idx } = await params;
  if (!findStudio(idx)) notFound();

  const { value, source } = await loadEditableEntity(studioEntityKey(idx));

  return (
    <CaseStudioEditor
      initial={value}
      source={source}
      storeReady={isDatabaseConfigured()}
      uploadConfigured={isUploadConfigured()}
    />
  );
}
