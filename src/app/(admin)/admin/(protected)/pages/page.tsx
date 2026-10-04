import type { Metadata } from "next";
import PagesEditor, {
  type ContentValues,
} from "@/components/admin/PagesEditor";
import { isUploadConfigured } from "@/lib/admin/blob";
import { getContentRows } from "@/lib/content/page-content";
import { defsForEditor, keysForEditor } from "@/lib/content/registry";
import type { ContentGroup } from "@/lib/content/registry-types";
import { adminDict } from "@/lib/i18n/admin";
import { getAdminLocale } from "@/lib/i18n/admin-server";

export const GROUPS: readonly ContentGroup[] = [
  "home",
  "about",
  "products",
  "cases",
  "site",
];

function resolveGroup(value: string | undefined): ContentGroup {
  return (GROUPS as readonly string[]).includes(value ?? "")
    ? (value as ContentGroup)
    : "home";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getAdminLocale();
  return {
    title: adminDict[locale].layout.title,
    robots: { index: false, follow: false },
  };
}

export default async function AdminPagesPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>;
}) {
  const { group } = await searchParams;
  const activeGroup = resolveGroup(group);
  const defs = defsForEditor(activeGroup);
  const rows = await getContentRows(keysForEditor(activeGroup));

  const values: ContentValues = {};
  for (const [key, entry] of Object.entries(rows)) {
    values[key] = { ko: entry.ko, en: entry.en };
  }

  return (
    <PagesEditor
      group={activeGroup}
      defs={defs}
      values={values}
      uploadConfigured={isUploadConfigured()}
    />
  );
}
