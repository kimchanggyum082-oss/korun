import type { Metadata } from "next";
import FooterEditor from "@/components/admin/editors/FooterEditor";
import { loadEditableEntity } from "@/lib/admin/entity-store";
import { ENTITY_KEYS } from "@/lib/admin/entities";
import { isDatabaseConfigured } from "@/lib/db/client";

export const metadata: Metadata = {
  title: "푸터 | KORUN Admin",
};

export default async function AdminSiteFooterPage() {
  const [footer, settings] = await Promise.all([
    loadEditableEntity(ENTITY_KEYS.siteFooter),
    loadEditableEntity(ENTITY_KEYS.siteSettings),
  ]);

  return (
    <FooterEditor
      initial={footer.value}
      source={footer.source}
      storeReady={isDatabaseConfigured()}
      contact={{
        name: settings.value.name,
        address: settings.value.address,
        tel: settings.value.tel,
        fax: settings.value.fax,
        email: settings.value.email,
      }}
    />
  );
}
