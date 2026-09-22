import type { Metadata } from "next";
import AboutLocationEditor from "@/components/admin/editors/about/AboutLocationEditor";
import { loadEditableEntity } from "@/lib/admin/entity-store";
import { ENTITY_KEYS } from "@/lib/admin/entities";
import { isDatabaseConfigured } from "@/lib/db/client";
import { getAboutPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "오시는 길 | KORUN Admin",
};

export default async function AdminAboutLocationPage() {
  const { value, source } = await loadEditableEntity(ENTITY_KEYS.aboutLocation);
  const { company } = await getAboutPage("company-location");

  return (
    <AboutLocationEditor
      initial={value}
      source={source}
      storeReady={isDatabaseConfigured()}
      company={company}
    />
  );
}
