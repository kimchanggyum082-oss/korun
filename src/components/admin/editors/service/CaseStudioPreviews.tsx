"use client";

import ScaledDesktop from "@/components/admin/ScaledDesktop";
import PostDetail from "@/components/layout/PostDetail";
import type { ServiceCaseStudioItem } from "@/lib/data";

export default function CaseStudioPreviews({
  draft,
}: {
  draft: ServiceCaseStudioItem;
}) {
  return (
    <ScaledDesktop>
      <PostDetail
        activeHref="/case-studio"
        sectionLabel="Case Studio"
        mobileSubtitle="다운로드 파일을 제공해드립니다"
        mobileTitle="Downloads"
        boardName="Case Studio"
        title={draft.title}
        meta={{ date: draft.date, views: draft.views }}
        blocks={draft.blocks}
        files={draft.files}
        listHref="/case-studio"
        fileLabel="첨부파일"
        showComments={false}
      />
    </ScaledDesktop>
  );
}
