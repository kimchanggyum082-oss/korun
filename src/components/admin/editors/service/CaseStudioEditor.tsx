"use client";

import EntityEditor from "@/components/admin/EntityEditor";
import {
  studioEntityKey,
  type EntitySource,
  type ServiceCaseStudioItemEntity,
} from "@/lib/admin/entities";
import CaseStudioForms from "./CaseStudioForms";
import CaseStudioPreviews from "./CaseStudioPreviews";

export default function CaseStudioEditor({
  initial,
  source,
  storeReady,
  uploadConfigured,
}: {
  initial: ServiceCaseStudioItemEntity;
  source: EntitySource;
  storeReady: boolean;
  uploadConfigured: boolean;
}) {
  return (
    <EntityEditor<ServiceCaseStudioItemEntity>
      entityKey={studioEntityKey(initial.idx)}
      label="Service"
      title="케이스 스튜디오"
      description="케이스 스튜디오 게시글의 메타데이터, 본문 블록, 첨부 파일을 관리합니다."
      source={source}
      initial={initial}
      storeReady={storeReady}
      previewLabel="케이스 스튜디오 상세"
      form={(draft, update) => (
        <CaseStudioForms
          draft={draft}
          update={update}
          uploadConfigured={uploadConfigured}
        />
      )}
      preview={(draft) => <CaseStudioPreviews draft={draft} />}
    />
  );
}
