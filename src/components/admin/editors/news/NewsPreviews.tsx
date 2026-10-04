"use client";

import ScaledDesktop from "@/components/admin/ScaledDesktop";
import PostDetail from "@/components/layout/PostDetail";
import {
  toServiceNewsItem,
  type ServiceNewsItemEntity,
} from "@/lib/admin/entities";
import { newsDict } from "@/lib/i18n/boards/news";
import { chrome } from "@/lib/i18n/chrome";
import type { Locale } from "@/lib/i18n/locales";

export default function NewsPreviews({
  draft,
  locale,
}: {
  draft: ServiceNewsItemEntity;
  locale: Locale;
}) {
  const item = toServiceNewsItem(draft, locale);
  const t = newsDict[locale].preview;
  return (
    <ScaledDesktop>
      <PostDetail
        t={chrome[locale]}
        activeHref="/news"
        subtitle={t.subtitle}
        sectionLabel={t.sectionLabel}
        mobileTitle={t.mobileTitle}
        boardName={t.boardName}
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
