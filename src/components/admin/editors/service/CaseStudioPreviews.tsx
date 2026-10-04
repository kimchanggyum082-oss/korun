"use client";

import ScaledDesktop from "@/components/admin/ScaledDesktop";
import PostDetail from "@/components/layout/PostDetail";
import {
  toServiceCaseStudioItem,
  type ServiceCaseStudioItemEntity,
} from "@/lib/admin/entities";
import { caseStudioDict } from "@/lib/i18n/boards/caseStudio";
import { chrome } from "@/lib/i18n/chrome";
import type { Locale } from "@/lib/i18n/locales";

export default function CaseStudioPreviews({
  draft,
  locale,
}: {
  draft: ServiceCaseStudioItemEntity;
  locale: Locale;
}) {
  const item = toServiceCaseStudioItem(draft, locale);
  const t = caseStudioDict[locale].preview;
  return (
    <ScaledDesktop>
      <PostDetail
        t={chrome[locale]}
        activeHref="/case-studio"
        sectionLabel={t.sectionLabel}
        mobileSubtitle={t.mobileSubtitle}
        mobileTitle={t.mobileTitle}
        boardName={t.boardName}
        title={item.title}
        meta={{ date: item.date, views: item.views }}
        blocks={item.blocks}
        files={item.files}
        listHref="/case-studio"
        fileLabel={t.fileLabel}
        showComments={false}
      />
    </ScaledDesktop>
  );
}
