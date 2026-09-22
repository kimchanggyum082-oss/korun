"use client";

import EntityEditor from "@/components/admin/EntityEditor";
import { downloadEntityKey, type EntitySource } from "@/lib/admin/entities";
import type { ServiceDownloadItem } from "@/lib/data";
import DownloadForms from "./DownloadForms";
import DownloadPreviews from "./DownloadPreviews";

export default function DownloadEditor({
  initial,
  source,
  storeReady,
  uploadConfigured,
}: {
  initial: ServiceDownloadItem;
  source: EntitySource;
  storeReady: boolean;
  uploadConfigured: boolean;
}) {
  return (
    <EntityEditor<ServiceDownloadItem>
      entityKey={downloadEntityKey(initial.idx)}
      label="Service"
      title="다운로드"
      description="다운로드 게시글의 메타데이터, 본문 블록, 첨부 파일을 관리합니다."
      source={source}
      initial={initial}
      storeReady={storeReady}
      previewLabel="다운로드 상세"
      form={(draft, update) => (
        <DownloadForms
          draft={draft}
          update={update}
          uploadConfigured={uploadConfigured}
        />
      )}
      preview={(draft) => <DownloadPreviews draft={draft} />}
    />
  );
}
