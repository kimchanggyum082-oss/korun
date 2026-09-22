"use client";

import ScaledDesktop from "@/components/admin/ScaledDesktop";
import PostDetail from "@/components/layout/PostDetail";
import type { ServiceNewsItem } from "@/lib/data";

export default function NewsPreviews({ draft }: { draft: ServiceNewsItem }) {
  return (
    <ScaledDesktop>
      <PostDetail
        activeHref="/news"
        subtitle="최신 뉴스와 이벤트를 한눈에 보여드립니다"
        sectionLabel="News&Events"
        mobileTitle="News & Events"
        boardName="뉴스&이벤트"
        title={draft.title}
        category={draft.category}
        meta={{
          author: draft.author,
          date: draft.date,
          views: draft.views,
          likes: draft.likes,
        }}
        blocks={draft.blocks}
        files={draft.files}
        listHref="/news"
      />
    </ScaledDesktop>
  );
}
