"use client";

import ScaledDesktop from "@/components/admin/ScaledDesktop";
import PostDetail from "@/components/layout/PostDetail";
import type { ServiceDownloadItem } from "@/lib/data";

export default function DownloadPreviews({
  draft,
}: {
  draft: ServiceDownloadItem;
}) {
  return (
    <ScaledDesktop>
      <PostDetail
        activeHref="/downloads"
        subtitle={
          "\u00a0코런의 제품과 회사소개서를 다운받을 수 있습니다.\u00a0"
        }
        mobileSubtitle="다운로드 파일을 제공해드립니다"
        sectionLabel="Downloads"
        boardName="Downloads"
        title={draft.title}
        meta={{ date: draft.date, views: draft.views }}
        blocks={draft.blocks}
        files={draft.files}
        listHref="/downloads"
        fileLabel="다운로드 파일"
      />
    </ScaledDesktop>
  );
}
