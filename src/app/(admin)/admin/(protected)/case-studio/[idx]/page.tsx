import type { Metadata } from "next";
import CaseStudioEditor from "@/components/admin/editors/service/CaseStudioEditor";
import { studioEntityKey, resolveLocalizedText } from "@/lib/admin/entities";
import { loadEditableEntity } from "@/lib/admin/entity-store";
import { isUploadConfigured } from "@/lib/admin/blob";
import { isDatabaseConfigured } from "@/lib/db/client";
import { caseStudioDict } from "@/lib/i18n/boards/caseStudio";
import { getAdminLocale } from "@/lib/i18n/admin-server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idx: string }>;
}): Promise<Metadata> {
  const { idx } = await params;
  const { value } = await loadEditableEntity(studioEntityKey(idx));
  const locale = await getAdminLocale();
  const title = resolveLocalizedText(value.title) || "New post";
  return {
    title: `${title} | ${caseStudioDict[locale].meta.itemSuffix}`,
  };
}

export default async function AdminCaseStudioItemPage({
  params,
}: {
  params: Promise<{ idx: string }>;
}) {
  const { idx } = await params;
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
