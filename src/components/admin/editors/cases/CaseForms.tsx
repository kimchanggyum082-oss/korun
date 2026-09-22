"use client";

import type { UpdateDraft } from "@/components/admin/EntityEditor";
import ImageField from "@/components/admin/ImageField";
import LocalizedField from "@/components/admin/LocalizedField";
import { SectionCard } from "@/components/admin/fields";
import type { CasePageEntity } from "@/lib/admin/entities";
import { GalleryImageList, NumberField, SectionImageList } from "./CaseFields";
import { AddButton, toLocalized } from "./shared";

export default function CaseForms({
  draft,
  update,
  uploadConfigured,
}: {
  draft: CasePageEntity;
  update: UpdateDraft<CasePageEntity>;
  uploadConfigured: boolean;
}) {
  const section = draft.section;

  const setSection = (patch: Partial<NonNullable<CasePageEntity["section"]>>) =>
    update((current) =>
      current.section
        ? { ...current, section: { ...current.section, ...patch } }
        : current,
    );

  return (
    <>
      <SectionCard
        title="페이지 정보"
        description="사례 페이지 상단의 부제와 제목입니다."
      >
        <LocalizedField
          label="부제 (subtitle)"
          value={draft.subtitle}
          onChange={(next) =>
            update((current) => ({
              ...current,
              subtitle: toLocalized(next),
            }))
          }
        />
        <LocalizedField
          label="제목 (title)"
          value={draft.title}
          onChange={(next) =>
            update((current) => ({ ...current, title: toLocalized(next) }))
          }
        />
      </SectionCard>

      <div className="rounded-lg border border-neutral-200 bg-paper px-4 py-3">
        <p className="text-[12px] leading-relaxed text-neutral-500">
          모바일 레이아웃의 픽셀 보정용 문자열(히어로 높이·여백, 일부 제목·본문
          문구)은 공개 페이지 컴포넌트에 고정되어 있어 여기서 편집할 수
          없습니다. 이 화면의 값은 데스크톱 화면과 데이터 원본에 반영됩니다.
        </p>
      </div>

      <SectionCard
        title="히어로"
        description="상단 대표 이미지와 원본 크기입니다. 원본 비율로 렌더링됩니다."
      >
        <ImageField
          label="데스크톱 히어로 (heroImagePc)"
          value={draft.heroImagePc}
          uploadConfigured={uploadConfigured}
          onChange={(next) =>
            update((current) => ({ ...current, heroImagePc: next }))
          }
        />
        <ImageField
          label="모바일 히어로 (heroImageMobile)"
          value={draft.heroImageMobile}
          uploadConfigured={uploadConfigured}
          onChange={(next) =>
            update((current) => ({ ...current, heroImageMobile: next }))
          }
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            label="원본 너비 (heroWidth)"
            value={draft.heroWidth}
            onChange={(next) =>
              update((current) => ({ ...current, heroWidth: next ?? 0 }))
            }
          />
          <NumberField
            label="원본 높이 (heroHeight)"
            value={draft.heroHeight}
            onChange={(next) =>
              update((current) => ({ ...current, heroHeight: next ?? 0 }))
            }
          />
        </div>
      </SectionCard>

      <SectionCard
        title="본문 섹션"
        description="제목, 설명 문단과 본문 이미지입니다."
      >
        {section ? (
          <>
            <LocalizedField
              label="섹션 제목 (heading)"
              value={section.heading}
              onChange={(next) => setSection({ heading: toLocalized(next) })}
            />
            <LocalizedField
              label="섹션 문단 (text)"
              value={section.text}
              onChange={(next) => setSection({ text: toLocalized(next) })}
              multiline
              rows={5}
            />
            <SectionImageList
              values={section.images}
              uploadConfigured={uploadConfigured}
              onChange={(next) => setSection({ images: next })}
            />
            <div className="flex">
              <button
                type="button"
                onClick={() =>
                  update((current) => ({ ...current, section: undefined }))
                }
                className="text-[11px] font-semibold text-[#a51c1c] outline-none hover:underline focus-visible:ring-2 focus-visible:ring-brand/30"
              >
                본문 섹션 삭제
              </button>
            </div>
          </>
        ) : (
          <AddButton
            onClick={() =>
              update((current) => ({
                ...current,
                section: { heading: "", text: "", images: [] },
              }))
            }
          >
            본문 섹션 추가
          </AddButton>
        )}
      </SectionCard>

      <SectionCard
        title="갤러리"
        description="3열 썸네일 갤러리입니다. 썸네일과 원본 이미지를 각각 지정합니다."
      >
        <GalleryImageList
          values={draft.galleryImages ?? []}
          uploadConfigured={uploadConfigured}
          onChange={(next) =>
            update((current) => ({ ...current, galleryImages: next }))
          }
        />
      </SectionCard>
    </>
  );
}
