import type { Metadata } from "next";
import AboutPatentEditor from "@/components/admin/editors/about/AboutPatentEditor";
import { isBlobConfigured } from "@/lib/admin/blob";
import { loadEditableEntity } from "@/lib/admin/entity-store";
import { ENTITY_KEYS } from "@/lib/admin/entities";
import { isDatabaseConfigured } from "@/lib/db/client";

export const metadata: Metadata = {
  title: "특허·인증 | KORUN Admin",
};

export default async function AdminAboutPatentPage() {
  const { value, source } = await loadEditableEntity(ENTITY_KEYS.aboutPatent);

  return (
    <AboutPatentEditor
      initial={value}
      source={source}
      storeReady={isDatabaseConfigured()}
      uploadConfigured={isBlobConfigured()}
    />
  );
}
