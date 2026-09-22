"use client";

import ScaledDesktop from "@/components/admin/ScaledDesktop";
import PostDetail from "@/components/layout/PostDetail";
import {
  toServiceCaseStudioItem,
  type ServiceCaseStudioItemEntity,
} from "@/lib/admin/entities";
import { chrome } from "@/lib/i18n/chrome";

export default function CaseStudioPreviews({
  draft,
}: {
  draft: ServiceCaseStudioItemEntity;
}) {
  const item = toServiceCaseStudioItem(draft);
  return (
    <ScaledDesktop>
      <PostDetail
        t={chrome.ko}
        activeHref="/case-studio"
        sectionLabel="Case Studio"
        mobileSubtitle="다운로드 파일을 제공해드립니다"
        mobileTitle="Downloads"
        boardName="Case Studio"
        title={item.title}
        meta={{ date: item.date, views: item.views }}
        blocks={item.blocks}
        files={item.files}
        listHref="/case-studio"
        fileLabel="첨부파일"
        showComments={false}
      />
    </ScaledDesktop>
  );
}
