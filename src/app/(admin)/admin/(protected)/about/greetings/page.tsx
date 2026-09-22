import type { Metadata } from "next";
import AboutGreetingsEditor from "@/components/admin/editors/about/AboutGreetingsEditor";
import { loadEditableEntity } from "@/lib/admin/entity-store";
import { ENTITY_KEYS } from "@/lib/admin/entities";
import { isDatabaseConfigured } from "@/lib/db/client";
import { getAboutPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "인사말 | KORUN Admin",
};

export default async function AdminAboutGreetingsPage() {
  const { value, source } = await loadEditableEntity(
    ENTITY_KEYS.aboutGreetings,
  );
  const { assets } = await getAboutPage("greetings");

  return (
    <AboutGreetingsEditor
      initial={value}
      source={source}
      storeReady={isDatabaseConfigured()}
      assets={assets}
    />
  );
}
