"use client";

import ScaledDesktop from "@/components/admin/ScaledDesktop";
import PostDetail from "@/components/layout/PostDetail";
import {
  toServiceDownloadItem,
  type ServiceDownloadItemEntity,
} from "@/lib/admin/entities";
import { downloadsDict } from "@/lib/i18n/boards/downloads";
import { chrome } from "@/lib/i18n/chrome";
import type { Locale } from "@/lib/i18n/locales";

export default function DownloadPreviews({
  draft,
  locale,
}: {
  draft: ServiceDownloadItemEntity;
  locale: Locale;
}) {
  const item = toServiceDownloadItem(draft, locale);
  const t = downloadsDict[locale].preview;
  return (
    <ScaledDesktop>
      <PostDetail
        t={chrome[locale]}
        activeHref="/downloads"
        subtitle={t.subtitle}
        mobileSubtitle={t.mobileSubtitle}
        sectionLabel={t.sectionLabel}
        boardName={t.boardName}
        title={item.title}
        meta={{ date: item.date, views: item.views }}
        blocks={item.blocks}
        files={item.files}
        listHref="/downloads"
        fileLabel={t.fileLabel}
      />
    </ScaledDesktop>
  );
}
