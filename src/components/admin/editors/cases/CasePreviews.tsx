"use client";

import ScaledDesktop from "@/components/admin/ScaledDesktop";
import CaseDetailView from "@/components/cases/CaseDetailView";
import type { CasePageData } from "@/lib/data";

export default function CasePreviews({
  draft,
  slug,
}: {
  draft: CasePageData;
  slug: string;
}) {
  return (
    <ScaledDesktop>
      <CaseDetailView page={draft} slug={slug} />
    </ScaledDesktop>
  );
}
