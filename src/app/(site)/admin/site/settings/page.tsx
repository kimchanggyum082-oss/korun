import type { Metadata } from "next";
import SiteSettingsEditor from "@/components/admin/editors/SiteSettingsEditor";
import { isBlobConfigured } from "@/lib/admin/blob";
import { loadEditableEntity } from "@/lib/admin/entity-store";
import { ENTITY_KEYS } from "@/lib/admin/entities";
import { isDatabaseConfigured } from "@/lib/db/client";

export const metadata: Metadata = {
  title: "기본 설정 | KORUN Admin",
};

export default async function AdminSiteSettingsPage() {
  const { value, source } = await loadEditableEntity(ENTITY_KEYS.siteSettings);

  return (
    <SiteSettingsEditor
      initial={value}
      source={source}
      storeReady={isDatabaseConfigured()}
      uploadConfigured={isBlobConfigured()}
    />
  );
}
