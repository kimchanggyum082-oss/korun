"use client";

import ScaledDesktop from "@/components/admin/ScaledDesktop";
import PostDetail from "@/components/layout/PostDetail";
import {
  toServiceNewsItem,
  type ServiceNewsItemEntity,
} from "@/lib/admin/entities";
import { chrome } from "@/lib/i18n/chrome";

export default function NewsPreviews({
  draft,
}: {
  draft: ServiceNewsItemEntity;
}) {
  const item = toServiceNewsItem(draft);
  return (
    <ScaledDesktop>
      <PostDetail
        t={chrome.ko}
        activeHref="/news"
        subtitle="최신 뉴스와 이벤트를 한눈에 보여드립니다"
        sectionLabel="News&Events"
        mobileTitle="News & Events"
        boardName="뉴스&이벤트"
        title={item.title}
        category={item.category}
        meta={{
          author: item.author,
          date: item.date,
          views: item.views,
          likes: item.likes,
        }}
        blocks={item.blocks}
        files={item.files}
        listHref="/news"
      />
    </ScaledDesktop>
  );
}
