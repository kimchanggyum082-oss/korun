import type { Metadata } from "next";
import PolicyEditor from "@/components/admin/editors/PolicyEditor";
import { loadEditableEntity } from "@/lib/admin/entity-store";
import { ENTITY_KEYS } from "@/lib/admin/entities";
import { isDatabaseConfigured } from "@/lib/db/client";

export const metadata: Metadata = {
  title: "정책 문서 | KORUN Admin",
};

export default async function AdminSitePolicyPage() {
  const [policy, privacy] = await Promise.all([
    loadEditableEntity(ENTITY_KEYS.policy),
    loadEditableEntity(ENTITY_KEYS.privacy),
  ]);

  return (
    <PolicyEditor
      policyInitial={policy.value}
      privacyInitial={privacy.value}
      policySource={policy.source}
      privacySource={privacy.source}
      storeReady={isDatabaseConfigured()}
    />
  );
}
