import type { Metadata } from "next";
import HomeEditor from "@/components/admin/editors/home/HomeEditor";
import { isBlobConfigured } from "@/lib/admin/blob";
import { loadEditableEntity } from "@/lib/admin/entity-store";
import { ENTITY_KEYS } from "@/lib/admin/entities";
import { isDatabaseConfigured } from "@/lib/db/client";

export const metadata: Metadata = {
  title: "홈 | KORUN Admin",
};

export default async function AdminHomePage() {
  const { value, source } = await loadEditableEntity(ENTITY_KEYS.home);

  return (
    <HomeEditor
      initial={value}
      source={source}
      storeReady={isDatabaseConfigured()}
      uploadConfigured={isBlobConfigured()}
    />
  );
}
