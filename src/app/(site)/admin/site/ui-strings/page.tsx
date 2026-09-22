import type { Metadata } from "next";
import UiStringsEditor from "@/components/admin/editors/UiStringsEditor";
import { loadEditableEntity } from "@/lib/admin/entity-store";
import { ENTITY_KEYS } from "@/lib/admin/entities";
import { isDatabaseConfigured } from "@/lib/db/client";

export const metadata: Metadata = {
  title: "UI 문구 | KORUN Admin",
};

export default async function AdminSiteUiStringsPage() {
  const { value, source } = await loadEditableEntity(ENTITY_KEYS.uiStrings);

  return (
    <UiStringsEditor
      initial={value}
      source={source}
      storeReady={isDatabaseConfigured()}
    />
  );
}
