"use client";

import EntityEditor from "@/components/admin/EntityEditor";
import {
  jobPostEntityKey,
  type EntitySource,
  type JobPostEntity,
} from "@/lib/admin/entities";
import JobForms from "./JobForms";
import JobPreviews from "./JobPreviews";

export default function JobEditor({
  initial,
  source,
  storeReady,
  uploadConfigured,
}: {
  initial: JobPostEntity;
  source: EntitySource;
  storeReady: boolean;
  uploadConfigured: boolean;
}) {
  return (
    <EntityEditor<JobPostEntity>
      entityKey={jobPostEntityKey(initial.idx)}
      label="Service"
      title="채용정보"
      description="채용정보 게시글의 메타데이터, 본문 블록, 첨부 파일을 관리합니다."
      source={source}
      initial={initial}
      storeReady={storeReady}
      previewLabel="채용정보 상세"
      form={(draft, update) => (
        <JobForms
          draft={draft}
          update={update}
          uploadConfigured={uploadConfigured}
        />
      )}
      preview={(draft) => <JobPreviews draft={draft} />}
    />
  );
}
