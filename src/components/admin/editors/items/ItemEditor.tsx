"use client";

import EntityEditor from "@/components/admin/EntityEditor";
import {
  interestingItemEntityKey,
  type EntitySource,
} from "@/lib/admin/entities";
import type { InterestingItem } from "@/lib/data";
import ItemForms from "./ItemForms";
import ItemPreviews from "./ItemPreviews";

export default function ItemEditor({
  initial,
  source,
  storeReady,
  uploadConfigured,
}: {
  initial: InterestingItem;
  source: EntitySource;
  storeReady: boolean;
  uploadConfigured: boolean;
}) {
  return (
    <EntityEditor<InterestingItem>
      entityKey={interestingItemEntityKey(initial.idx)}
      label="Service"
      title="기술 자료"
      description="기술 자료 게시글의 메타데이터, 본문 블록, 첨부 파일을 관리합니다."
      source={source}
      initial={initial}
      storeReady={storeReady}
      previewLabel="기술 자료 상세"
      form={(draft, update) => (
        <ItemForms
          draft={draft}
          update={update}
          uploadConfigured={uploadConfigured}
        />
      )}
      preview={(draft) => <ItemPreviews draft={draft} />}
    />
  );
}
