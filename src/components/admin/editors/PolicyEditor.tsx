"use client";

import { useState } from "react";
import EntityEditor from "@/components/admin/EntityEditor";
import LocalizedField from "@/components/admin/LocalizedField";
import ScaledDesktop from "@/components/admin/ScaledDesktop";
import PolicyModal from "@/components/layout/PolicyModal";
import {
  readLocalized,
  SectionCard,
  type LocalizedValue,
} from "@/components/admin/fields";
import {
  ENTITY_KEYS,
  type EntitySource,
  type PolicyEntity,
} from "@/lib/admin/entities";
import type { Localized } from "@/lib/content/merge";

type PolicyMode = "policy" | "privacy";

const MODE_LABEL: Record<PolicyMode, string> = {
  policy: "이용약관",
  privacy: "개인정보처리방침",
};

function toLocalized(next: LocalizedValue): Localized<string> {
  const { ko, en } = readLocalized(next);
  return en.length > 0 ? { ko, en } : ko;
}

function PolicyPreview({
  draft,
  kind,
}: {
  draft: PolicyEntity;
  kind: PolicyMode;
}) {
  return (
    <ScaledDesktop>
      <PolicyModal
        kind={kind}
        modal={{
          title: readLocalized(draft.title).ko,
          html: readLocalized(draft.html).ko,
        }}
        contained
      />
    </ScaledDesktop>
  );
}

export default function PolicyEditor({
  policyInitial,
  privacyInitial,
  policySource,
  privacySource,
  storeReady,
}: {
  policyInitial: PolicyEntity;
  privacyInitial: PolicyEntity;
  policySource: EntitySource;
  privacySource: EntitySource;
  storeReady: boolean;
}) {
  const [mode, setMode] = useState<PolicyMode>("policy");

  const values: Record<PolicyMode, PolicyEntity> = {
    policy: policyInitial,
    privacy: privacyInitial,
  };
  const sources: Record<PolicyMode, EntitySource> = {
    policy: policySource,
    privacy: privacySource,
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        role="tablist"
        aria-label="정책 문서 선택"
        className="flex w-fit items-center gap-1 rounded-md border border-neutral-200 bg-white p-1"
      >
        {(["policy", "privacy"] as const).map((entry) => (
          <button
            key={entry}
            type="button"
            role="tab"
            aria-selected={mode === entry}
            onClick={() => setMode(entry)}
            className={`h-8 rounded px-3 text-[12px] font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand/30 ${
              mode === entry
                ? "bg-brand text-white"
                : "text-neutral-500 hover:text-ink"
            }`}
          >
            {MODE_LABEL[entry]}
          </button>
        ))}
      </div>

      <EntityEditor
        key={mode}
        entityKey={mode === "policy" ? ENTITY_KEYS.policy : ENTITY_KEYS.privacy}
        label="Policy"
        title={MODE_LABEL[mode]}
        description="약관 본문을 편집합니다. 입력한 HTML이 그대로 렌더링됩니다."
        source={sources[mode]}
        initial={values[mode]}
        storeReady={storeReady}
        previewLabel={`${MODE_LABEL[mode]} 팝업`}
        form={(draft, update) => (
          <>
            <SectionCard title="문서 정보">
              <LocalizedField
                label="제목"
                value={draft.title}
                onChange={(next) =>
                  update((current) => ({
                    ...current,
                    title: toLocalized(next),
                  }))
                }
              />
            </SectionCard>

            <SectionCard title="본문 (HTML)">
              <div className="rounded-md border border-[#f0d9a8] bg-[#fdf8ee] px-3 py-2.5">
                <p className="text-[12px] font-semibold text-[#8a5a10]">
                  입력한 HTML이 그대로 렌더링됩니다.
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-[#8a5a10]">
                  스크립트 등 위험한 태그를 걸러내는 살균 처리는 추후 보안 강화
                  단계에서 적용됩니다. 신뢰할 수 있는 내용만 입력해 주세요.
                </p>
              </div>
              <LocalizedField
                label="HTML"
                value={draft.html}
                onChange={(next) =>
                  update((current) => ({
                    ...current,
                    html: toLocalized(next),
                  }))
                }
                multiline
                rows={18}
              />
            </SectionCard>
          </>
        )}
        preview={(draft) => <PolicyPreview draft={draft} kind={mode} />}
      />
    </div>
  );
}
