"use client";

import type { getAboutPage } from "@/lib/content";
import EntityEditor from "@/components/admin/EntityEditor";
import {
  Field,
  SectionCard,
  TextArea,
  TextInput,
} from "@/components/admin/fields";
import {
  ENTITY_KEYS,
  type AboutGreetingsEntity,
  type EntitySource,
} from "@/lib/admin/entities";
import { AddButton, MoveButtons, moveAt, removeAt, replaceAt } from "./shared";
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
        <Field label="문구 1">
          <TextInput
            value={content.banner.line1}
            onChange={(event) =>
              setContent({
                banner: { ...content.banner, line1: event.target.value },
              })
            }
          />
        </Field>
        <Field label="문구 2">
          <TextInput
            value={content.banner.line2}
            onChange={(event) =>
              setContent({
                banner: { ...content.banner, line2: event.target.value },
              })
            }
          />
        </Field>
        <Field label="페이지 제목">
          <TextInput
            value={content.banner.title}
            onChange={(event) =>
              setContent({
                banner: { ...content.banner, title: event.target.value },
              })
            }
          />
        </Field>
      </SectionCard>

      <SectionCard title="본문" description="인사말 제목과 본문 단락입니다.">
        <Field label="제목">
          <TextInput
            value={content.heading}
            onChange={(event) => setContent({ heading: event.target.value })}
          />
        </Field>
        <Field label="도입 문단">
          <TextArea
            rows={3}
            value={content.intro}
            onChange={(event) => setContent({ intro: event.target.value })}
          />
        </Field>

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
            <TextArea
              rows={3}
              value={paragraph}
              onChange={(event) =>
                setContent({
                  paragraphs: replaceAt(
                    content.paragraphs,
                    index,
                    event.target.value,
                  ),
                })
              }
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

        <Field label="서명">
          <TextInput
            value={content.signature}
            onChange={(event) => setContent({ signature: event.target.value })}
          />
        </Field>
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
          <GreetingsView content={draft.content} assets={assets} />
        </ScaledDesktop>
      )}
    />
  );
}
