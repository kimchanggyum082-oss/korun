"use client";

import ScaledDesktop from "@/components/admin/ScaledDesktop";
import CaseDetailView from "@/components/cases/CaseDetailView";
import { toCasePageData, type CasePageEntity } from "@/lib/admin/entities";

export default function CasePreviews({
  draft,
  slug,
}: {
  draft: CasePageEntity;
  slug: string;
}) {
  return (
    <ScaledDesktop>
      <CaseDetailView page={toCasePageData(draft)} slug={slug} />
    </ScaledDesktop>
  );
}
