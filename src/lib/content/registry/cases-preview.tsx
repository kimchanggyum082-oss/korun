"use client";

import CaseDetailView from "@/components/cases/CaseDetailView";
import ScaledDesktop from "@/components/admin/ScaledDesktop";
import type { ContentDef } from "@/lib/content/registry-types";
import { resolveCasesFromRows } from "@/lib/content/registry/cases-resolve";
import type { CasePageData } from "@/lib/data";
import type { Locale } from "@/lib/i18n/locales";

function isCasePage(value: unknown): value is CasePageData {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<CasePageData>;
  return (
    typeof candidate.title === "string" &&
    typeof candidate.heroImagePc === "string"
  );
}

/** Extract the slug from a `cases.<slug>.…` content key. */
function caseSlugOfKey(key: string): string | null {
  const match = /^cases\.([^.]+)\./.exec(key);
  return match ? match[1] : null;
}

/**
 * Live WYSIWYG preview of a cases section, reusing the public case components
 * (MCell's `SectionPreview` equivalent). `content` may be the record returned by
 * `resolveCasesFromRows`; when absent, data-file defaults are rendered.
 */
export default function CasesSectionPreview({
  sectionDef,
  content,
  locale,
}: {
  sectionDef: ContentDef;
  content: unknown;
  locale: Locale;
}) {
  const slug = caseSlugOfKey(sectionDef.key);
  const fromContent =
    slug && typeof content === "object" && content !== null
      ? (content as Record<string, unknown>)[slug]
      : undefined;
  const page = isCasePage(fromContent)
    ? fromContent
    : slug
      ? resolveCasesFromRows({}, locale)[slug]
      : undefined;

  if (!slug || !page) {
    return (
      <div className="px-4 py-10 text-center text-[13px] text-ink/40">
        {locale === "ko"
          ? "이 섹션의 미리보기가 없습니다."
          : "No preview for this section."}
      </div>
    );
  }

  return (
    <ScaledDesktop>
      <CaseDetailView page={page} slug={slug} />
    </ScaledDesktop>
  );
}
