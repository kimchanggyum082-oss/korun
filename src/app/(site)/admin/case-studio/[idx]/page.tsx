import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudioEditor from "@/components/admin/editors/service/CaseStudioEditor";
import { studioEntityKey } from "@/lib/admin/entities";
import { loadEditableEntity } from "@/lib/admin/entity-store";
import { isBlobConfigured } from "@/lib/admin/blob";
import { isDatabaseConfigured } from "@/lib/db/client";
import { caseStudioItems } from "@/lib/data";

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
  return { title: `${value.title} | KORUN Admin` };
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
      uploadConfigured={isBlobConfigured()}
    />
  );
}
