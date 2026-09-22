"use client";

import ScaledDesktop from "@/components/admin/ScaledDesktop";
import PostDetail from "@/components/layout/PostDetail";
import {
  toServiceDownloadItem,
  type ServiceDownloadItemEntity,
} from "@/lib/admin/entities";
import { chrome } from "@/lib/i18n/chrome";

export default function DownloadPreviews({
  draft,
}: {
  draft: ServiceDownloadItemEntity;
}) {
  const item = toServiceDownloadItem(draft);
  return (
    <ScaledDesktop>
      <PostDetail
        t={chrome.ko}
        activeHref="/downloads"
        subtitle={
          "\u00a0코런의 제품과 회사소개서를 다운받을 수 있습니다.\u00a0"
        }
        mobileSubtitle="다운로드 파일을 제공해드립니다"
        sectionLabel="Downloads"
        boardName="Downloads"
        title={item.title}
        meta={{ date: item.date, views: item.views }}
        blocks={item.blocks}
        files={item.files}
        listHref="/downloads"
        fileLabel="다운로드 파일"
      />
    </ScaledDesktop>
  );
}
