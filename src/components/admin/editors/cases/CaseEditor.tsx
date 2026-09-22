"use client";

import EntityEditor from "@/components/admin/EntityEditor";
import {
  CASE_ENTITY_KEYS,
  type CaseSlug,
  type EntitySource,
} from "@/lib/admin/entities";
import type { CasePageData } from "@/lib/data";
import CaseForms from "./CaseForms";
import CasePreviews from "./CasePreviews";

export default function CaseEditor({
  slug,
  initial,
  source,
  storeReady,
  uploadConfigured,
}: {
  slug: CaseSlug;
  initial: CasePageData;
  source: EntitySource;
  storeReady: boolean;
  uploadConfigured: boolean;
}) {
  return (
    <EntityEditor<CasePageData>
      entityKey={CASE_ENTITY_KEYS[slug]}
      label="Cases"
      title={initial.title}
      description="적용 사례 페이지의 부제, 제목, 히어로, 본문, 갤러리를 관리합니다."
      source={source}
      initial={initial}
      storeReady={storeReady}
      previewLabel="적용 사례 페이지"
      form={(draft, update) => (
        <CaseForms
          draft={draft}
          update={update}
          uploadConfigured={uploadConfigured}
        />
      )}
      preview={(draft) => <CasePreviews draft={draft} slug={slug} />}
    />
  );
}
