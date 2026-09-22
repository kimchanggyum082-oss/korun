import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseEditor from "@/components/admin/editors/cases/CaseEditor";
import {
  CASE_ENTITY_KEYS,
  isCaseSlug,
  resolveLocalizedText,
} from "@/lib/admin/entities";
import { loadEditableEntity } from "@/lib/admin/entity-store";
import { isBlobConfigured } from "@/lib/admin/blob";
import { isDatabaseConfigured } from "@/lib/db/client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isCaseSlug(slug)) return {};
  const { value } = await loadEditableEntity(CASE_ENTITY_KEYS[slug]);
  return { title: `${resolveLocalizedText(value.title)} | KORUN Admin` };
}

export default async function AdminCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isCaseSlug(slug)) notFound();

  const { value, source } = await loadEditableEntity(CASE_ENTITY_KEYS[slug]);

  return (
    <CaseEditor
      slug={slug}
      initial={value}
      source={source}
      storeReady={isDatabaseConfigured()}
      uploadConfigured={isBlobConfigured()}
    />
  );
}
