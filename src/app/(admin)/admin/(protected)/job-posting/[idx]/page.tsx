import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JobEditor from "@/components/admin/editors/jobs/JobEditor";
import { jobPostEntityKey, resolveLocalizedText } from "@/lib/admin/entities";
import { loadEditableEntity } from "@/lib/admin/entity-store";
import { isUploadConfigured } from "@/lib/admin/blob";
import { isDatabaseConfigured } from "@/lib/db/client";
import { jobPosts } from "@/lib/data";
import { jobsDict } from "@/lib/i18n/boards/jobs";
import { getAdminLocale } from "@/lib/i18n/admin-server";

function findPost(idx: string) {
  return jobPosts.find((item) => item.idx === idx);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idx: string }>;
}): Promise<Metadata> {
  const { idx } = await params;
  const fallback = findPost(idx);
  if (!fallback) return {};
  const { value } = await loadEditableEntity(jobPostEntityKey(idx));
  const locale = await getAdminLocale();
  return {
    title: `${resolveLocalizedText(value.title)} | ${jobsDict[locale].meta.itemSuffix}`,
  };
}

export default async function AdminJobPostPage({
  params,
}: {
  params: Promise<{ idx: string }>;
}) {
  const { idx } = await params;
  if (!findPost(idx)) notFound();

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
