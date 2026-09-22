"use client";

import EntityEditor from "@/components/admin/EntityEditor";
import {
  newsEntityKey,
  type EntitySource,
  type ServiceNewsItemEntity,
} from "@/lib/admin/entities";
import NewsForms from "./NewsForms";
import NewsPreviews from "./NewsPreviews";

export default function NewsEditor({
  initial,
  source,
  storeReady,
  uploadConfigured,
}: {
  initial: ServiceNewsItemEntity;
  source: EntitySource;
  storeReady: boolean;
  uploadConfigured: boolean;
}) {
  return (
    <EntityEditor<ServiceNewsItemEntity>
      entityKey={newsEntityKey(initial.idx)}
      label="Service"
      title="뉴스"
      description="뉴스·이벤트 게시글의 메타데이터, 본문 블록, 첨부 파일을 관리합니다."
      source={source}
      initial={initial}
      storeReady={storeReady}
      previewLabel="뉴스 상세"
      form={(draft, update) => (
        <NewsForms
          draft={draft}
          update={update}
          uploadConfigured={uploadConfigured}
        />
      )}
      preview={(draft) => <NewsPreviews draft={draft} />}
    />
  );
}
