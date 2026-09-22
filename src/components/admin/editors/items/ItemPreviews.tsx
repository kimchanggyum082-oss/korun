"use client";

import type { InterestingItem } from "@/lib/data";
import PostDetail from "@/components/layout/PostDetail";
import ScaledDesktop from "@/components/admin/ScaledDesktop";

export default function ItemPreviews({ draft }: { draft: InterestingItem }) {
  return (
    <ScaledDesktop>
      <PostDetail
        activeHref="/technology/interesting-items"
        subtitle="자사의 기술력으로 구현된 다양한 제품을 소개합니다."
        mobileSubtitle="신적이고 탁월한 아이템을 소개드립니다"
        sectionLabel="Interesting Items"
        boardName="Interesting Items"
        title={draft.title}
        meta={{
          author: draft.author,
          date: draft.date,
          views: draft.views,
        }}
        blocks={draft.blocks}
        files={draft.files.map((file) => ({ ...file, url: "#" }))}
        listHref="/technology/interesting-items"
        showWriter
      />
    </ScaledDesktop>
  );
}
