"use client";

import {
  toInterestingItem,
  type InterestingItemEntity,
} from "@/lib/admin/entities";
import PostDetail from "@/components/layout/PostDetail";
import ScaledDesktop from "@/components/admin/ScaledDesktop";
import { chrome } from "@/lib/i18n/chrome";
import { itemsDict } from "@/lib/i18n/boards/items";
import type { Locale } from "@/lib/i18n/locales";

export default function ItemPreviews({
  draft,
  locale,
}: {
  draft: InterestingItemEntity;
  locale: Locale;
}) {
  const item = toInterestingItem(draft, locale);
  const t = itemsDict[locale].preview;
  return (
    <ScaledDesktop>
      <PostDetail
        t={chrome[locale]}
        activeHref="/technology/interesting-items"
        subtitle={t.subtitle}
        mobileSubtitle={t.mobileSubtitle}
        sectionLabel={t.sectionLabel}
        boardName={t.boardName}
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
