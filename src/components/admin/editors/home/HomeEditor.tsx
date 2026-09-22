"use client";

import EntityEditor from "@/components/admin/EntityEditor";
import {
  ENTITY_KEYS,
  type EntitySource,
  type HomeEntity,
} from "@/lib/admin/entities";
import HomeForms from "./HomeForms";
import HomePreviews from "./HomePreviews";

export default function HomeEditor({
  initial,
  source,
  storeReady,
  uploadConfigured,
}: {
  initial: HomeEntity;
  source: EntitySource;
  storeReady: boolean;
  uploadConfigured: boolean;
}) {
  return (
    <EntityEditor<HomeEntity>
      entityKey={ENTITY_KEYS.home}
      label="Home"
      title="홈"
      description="메인 페이지의 히어로 슬라이드, 제품 카드, 가치 배너, CTA, 목록, 오시는 길 콘텐츠를 관리합니다."
      source={source}
      initial={initial}
      storeReady={storeReady}
      previewLabel="홈 페이지"
      form={(draft, update) => (
        <HomeForms
          draft={draft}
          update={update}
          uploadConfigured={uploadConfigured}
        />
      )}
      preview={(draft) => <HomePreviews draft={draft} />}
    />
  );
}
