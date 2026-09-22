"use client";

import {
  toInterestingItem,
  type InterestingItemEntity,
} from "@/lib/admin/entities";
import PostDetail from "@/components/layout/PostDetail";
import ScaledDesktop from "@/components/admin/ScaledDesktop";
import { chrome } from "@/lib/i18n/chrome";

export default function ItemPreviews({
  draft,
}: {
  draft: InterestingItemEntity;
}) {
  const item = toInterestingItem(draft);
  return (
    <ScaledDesktop>
      <PostDetail
        t={chrome.ko}
        activeHref="/technology/interesting-items"
        subtitle="자사의 기술력으로 구현된 다양한 제품을 소개합니다."
        mobileSubtitle="신적이고 탁월한 아이템을 소개드립니다"
        sectionLabel="Interesting Items"
        boardName="Interesting Items"
        title={item.title}
        meta={{
          author: item.author,
          date: item.date,
          views: item.views,
        }}
        blocks={item.blocks}
        files={item.files.map((file) => ({ ...file, url: "#" }))}
        listHref="/technology/interesting-items"
        showWriter
      />
    </ScaledDesktop>
  );
}
