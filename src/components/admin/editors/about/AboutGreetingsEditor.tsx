"use client";

import type { getAboutPage } from "@/lib/content";
import EntityEditor from "@/components/admin/EntityEditor";
import LocalizedField from "@/components/admin/LocalizedField";
import { SectionCard } from "@/components/admin/fields";
import {
  ENTITY_KEYS,
  toAboutGreetingsContent,
  type AboutGreetingsEntity,
  type EntitySource,
} from "@/lib/admin/entities";
import {
  AddButton,
  MoveButtons,
  moveAt,
  removeAt,
  replaceAt,
  toLocalized,
} from "./shared";
import ScaledDesktop from "@/components/admin/ScaledDesktop";
import GreetingsView from "@/components/about/GreetingsView";

type AboutPageAssets = Awaited<ReturnType<typeof getAboutPage>>["assets"];

function GreetingsForm({
  draft,
  update,
}: {
  draft: AboutGreetingsEntity;
  update: (
    updater: (current: AboutGreetingsEntity) => AboutGreetingsEntity,
  ) => void;
}) {
  const { content } = draft;
  const setContent = (patch: Partial<typeof content>) =>
    update((current) => ({
      ...current,
      content: { ...current.content, ...patch },
    }));

  return (
    <>
      <SectionCard
        title="배너"
        description="상단 배너 문구와 페이지 제목입니다."
      >
        <LocalizedField
          label="문구 1"
          value={content.banner.line1}
          onChange={(next) =>
            setContent({
              banner: { ...content.banner, line1: toLocalized(next) },
            })
          }
        />
        <LocalizedField
          label="문구 2"
          value={content.banner.line2}
          onChange={(next) =>
            setContent({
              banner: { ...content.banner, line2: toLocalized(next) },
            })
          }
        />
        <LocalizedField
          label="페이지 제목"
          value={content.banner.title}
          onChange={(next) =>
            setContent({
              banner: { ...content.banner, title: toLocalized(next) },
            })
          }
        />
      </SectionCard>

      <SectionCard title="본문" description="인사말 제목과 본문 단락입니다.">
        <LocalizedField
          label="제목"
          value={content.heading}
          onChange={(next) => setContent({ heading: toLocalized(next) })}
        />
        <LocalizedField
          label="도입 문단"
          value={content.intro}
          onChange={(next) => setContent({ intro: toLocalized(next) })}
          multiline
          rows={3}
        />

        {content.paragraphs.map((paragraph, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-md border border-neutral-200 p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12px] font-semibold text-neutral-500">
                단락 {index + 1}
              </span>
              <MoveButtons
                index={index}
                count={content.paragraphs.length}
                onMove={(i, delta) =>
                  setContent({
                    paragraphs: moveAt(content.paragraphs, i, delta),
                  })
                }
                onRemove={(i) =>
                  setContent({ paragraphs: removeAt(content.paragraphs, i) })
                }
              />
            </div>
            <LocalizedField
              value={paragraph}
              onChange={(next) =>
                setContent({
                  paragraphs: replaceAt(
                    content.paragraphs,
                    index,
                    toLocalized(next),
                  ),
                })
              }
              multiline
              rows={3}
            />
          </div>
        ))}
        <AddButton
          onClick={() =>
            setContent({ paragraphs: [...content.paragraphs, ""] })
          }
        >
          단락 추가
        </AddButton>

        <LocalizedField
          label="서명"
          value={content.signature}
          onChange={(next) => setContent({ signature: toLocalized(next) })}
        />
      </SectionCard>
    </>
  );
}

export default function AboutGreetingsEditor({
  initial,
  source,
  storeReady,
  assets,
}: {
  initial: AboutGreetingsEntity;
  source: EntitySource;
  storeReady: boolean;
  assets: AboutPageAssets;
}) {
  return (
    <EntityEditor<AboutGreetingsEntity>
      entityKey={ENTITY_KEYS.aboutGreetings}
      label="About"
      title="인사말"
      description="About > Greetings 페이지의 배너와 본문을 관리합니다."
      source={source}
      initial={initial}
      storeReady={storeReady}
      previewLabel="인사말 페이지"
      form={(draft, update) => <GreetingsForm draft={draft} update={update} />}
      preview={(draft) => (
        <ScaledDesktop>
          <GreetingsView
            content={toAboutGreetingsContent(draft.content)}
            assets={assets}
          />
        </ScaledDesktop>
      )}
    />
  );
}
