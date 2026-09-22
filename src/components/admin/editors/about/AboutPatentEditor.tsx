"use client";

import EntityEditor from "@/components/admin/EntityEditor";
import ImageField from "@/components/admin/ImageField";
import LocalizedField from "@/components/admin/LocalizedField";
import ScaledDesktop from "@/components/admin/ScaledDesktop";
import { SectionCard } from "@/components/admin/fields";
import PatentCredentialsView from "@/components/about/PatentCredentialsView";
import {
  ENTITY_KEYS,
  toAboutPatentContent,
  toPatentImages,
  type AboutPatentEntity,
  type EntitySource,
  type GalleryImageEntity,
} from "@/lib/admin/entities";
import {
  AddButton,
  MoveButtons,
  moveAt,
  removeAt,
  replaceAt,
  toLocalized,
} from "./shared";

function PatentForm({
  draft,
  update,
  uploadConfigured,
}: {
  draft: AboutPatentEntity;
  update: (updater: (current: AboutPatentEntity) => AboutPatentEntity) => void;
  uploadConfigured: boolean;
}) {
  const { content, assets } = draft;
  const setImages = (patentImages: GalleryImageEntity[]) =>
    update((current) => ({
      ...current,
      assets: { ...current.assets, patentImages },
    }));

  return (
    <>
      <SectionCard title="제목" description="페이지 상단 제목입니다.">
        <LocalizedField
          label="제목"
          value={content.title}
          onChange={(next) =>
            update((current) => ({
              ...current,
              content: { ...current.content, title: toLocalized(next) },
            }))
          }
        />
      </SectionCard>

      <SectionCard
        title="특허·인증 이미지"
        description="갤러리 이미지의 순서를 바꾸고 추가·삭제할 수 있습니다."
      >
        {assets.patentImages.map((image, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-md border border-neutral-200 p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12px] font-semibold text-neutral-500">
                이미지 {index + 1}
              </span>
              <MoveButtons
                index={index}
                count={assets.patentImages.length}
                onMove={(i, delta) =>
                  setImages(moveAt(assets.patentImages, i, delta))
                }
                onRemove={(i) => setImages(removeAt(assets.patentImages, i))}
              />
            </div>
            <ImageField
              label="썸네일 이미지"
              value={image.src}
              uploadConfigured={uploadConfigured}
              onChange={(next) =>
                setImages(
                  replaceAt(assets.patentImages, index, {
                    ...image,
                    src: next,
                  }),
                )
              }
            />
            <ImageField
              label="원본 이미지 (라이트박스)"
              value={image.fullSrc}
              uploadConfigured={uploadConfigured}
              onChange={(next) =>
                setImages(
                  replaceAt(assets.patentImages, index, {
                    ...image,
                    fullSrc: next,
                  }),
                )
              }
            />
            <LocalizedField
              label="대체 텍스트 (alt)"
              value={image.alt}
              onChange={(next) =>
                setImages(
                  replaceAt(assets.patentImages, index, {
                    ...image,
                    alt: toLocalized(next),
                  }),
                )
              }
            />
          </div>
        ))}
        <AddButton
          onClick={() =>
            setImages([
              ...assets.patentImages,
              { src: "", fullSrc: "", alt: "" },
            ])
          }
        >
          이미지 추가
        </AddButton>
      </SectionCard>
    </>
  );
}

export default function AboutPatentEditor({
  initial,
  source,
  storeReady,
  uploadConfigured,
}: {
  initial: AboutPatentEntity;
  source: EntitySource;
  storeReady: boolean;
  uploadConfigured: boolean;
}) {
  return (
    <EntityEditor<AboutPatentEntity>
      entityKey={ENTITY_KEYS.aboutPatent}
      label="About"
      title="특허·인증"
      description="About > Patent & Credentials 페이지의 제목과 이미지 갤러리를 관리합니다."
      source={source}
      initial={initial}
      storeReady={storeReady}
      previewLabel="특허·인증 페이지"
      form={(draft, update) => (
        <PatentForm
          draft={draft}
          update={update}
          uploadConfigured={uploadConfigured}
        />
      )}
      preview={(draft) => (
        <ScaledDesktop>
          <PatentCredentialsView
            content={toAboutPatentContent(draft.content)}
            assets={{ patentImages: toPatentImages(draft.assets.patentImages) }}
          />
        </ScaledDesktop>
      )}
    />
  );
}
