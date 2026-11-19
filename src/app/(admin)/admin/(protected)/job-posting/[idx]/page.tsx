import type { Metadata } from "next";
import JobEditor from "@/components/admin/editors/jobs/JobEditor";
import { jobPostEntityKey, resolveLocalizedText } from "@/lib/admin/entities";
import { loadEditableEntity } from "@/lib/admin/entity-store";
import { isUploadConfigured } from "@/lib/admin/blob";
import { isDatabaseConfigured } from "@/lib/db/client";
import { jobsDict } from "@/lib/i18n/boards/jobs";
import { getAdminLocale } from "@/lib/i18n/admin-server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idx: string }>;
}): Promise<Metadata> {
  const { idx } = await params;
  const { value } = await loadEditableEntity(jobPostEntityKey(idx));
  const locale = await getAdminLocale();
  const title = resolveLocalizedText(value.title) || "New post";
  return {
    title: `${title} | ${jobsDict[locale].meta.itemSuffix}`,
  };
}

export default async function AdminJobPostPage({
  params,
}: {
  params: Promise<{ idx: string }>;
}) {
  const { idx } = await params;
  const { value, source } = await loadEditableEntity(jobPostEntityKey(idx));

  return (
    <JobEditor
      initial={value}
      source={source}
      storeReady={isDatabaseConfigured()}
      uploadConfigured={isUploadConfigured()}
    />
  );
}
