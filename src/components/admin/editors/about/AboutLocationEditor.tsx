"use client";

import EntityEditor from "@/components/admin/EntityEditor";
import {
  Field,
  SectionCard,
  TextInput,
  TwoColumn,
} from "@/components/admin/fields";
import ScaledDesktop from "@/components/admin/ScaledDesktop";
import CompanyLocationView from "@/components/about/CompanyLocationView";
import {
  ENTITY_KEYS,
  type AboutLocationEntity,
  type EntitySource,
} from "@/lib/admin/entities";
import type { getAboutPage } from "@/lib/content";

type AboutPageCompany = Awaited<ReturnType<typeof getAboutPage>>["company"];

function LocationForm({
  draft,
  update,
}: {
  draft: AboutLocationEntity;
  update: (
    updater: (current: AboutLocationEntity) => AboutLocationEntity,
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
      <SectionCard title="페이지 제목" description="상단 제목입니다.">
        <Field label="제목">
          <TextInput
            value={content.title}
            onChange={(event) => setContent({ title: event.target.value })}
          />
        </Field>
      </SectionCard>

      <SectionCard
        title="섹션 제목"
        description="본사 및 공장 영역의 제목입니다."
      >
        <TwoColumn>
          <Field label="영문 제목">
            <TextInput
              value={content.headingEn}
              onChange={(event) =>
                setContent({ headingEn: event.target.value })
              }
            />
          </Field>
          <Field label="국문 제목">
            <TextInput
              value={content.headingKo}
              onChange={(event) =>
                setContent({ headingKo: event.target.value })
              }
            />
          </Field>
        </TwoColumn>
      </SectionCard>

      <SectionCard
        title="연락처 라벨"
        description="표의 라벨입니다. 실제 회사명·연락처 값은 사이트 기본 설정(site:settings)에서 관리됩니다."
      >
        <TwoColumn>
          <Field label="TEL 라벨">
            <TextInput
              value={content.labels.tel}
              onChange={(event) =>
                setContent({
                  labels: { ...content.labels, tel: event.target.value },
                })
              }
            />
          </Field>
          <Field label="EMAIL 라벨">
            <TextInput
              value={content.labels.email}
              onChange={(event) =>
                setContent({
                  labels: { ...content.labels, email: event.target.value },
                })
              }
            />
          </Field>
        </TwoColumn>
        <Field label="ADDRESS 라벨">
          <TextInput
            value={content.labels.address}
            onChange={(event) =>
              setContent({
                labels: { ...content.labels, address: event.target.value },
              })
            }
          />
        </Field>
      </SectionCard>

      <SectionCard title="지도" description="지도 iframe의 제목입니다.">
        <Field label="지도 제목 (iframe title)">
          <TextInput
            value={content.mapTitle}
            onChange={(event) => setContent({ mapTitle: event.target.value })}
          />
        </Field>
      </SectionCard>
    </>
  );
}

export default function AboutLocationEditor({
  initial,
  source,
  storeReady,
  company,
}: {
  initial: AboutLocationEntity;
  source: EntitySource;
  storeReady: boolean;
  company: AboutPageCompany;
}) {
  return (
    <EntityEditor<AboutLocationEntity>
      entityKey={ENTITY_KEYS.aboutLocation}
      label="About"
      title="오시는 길"
      description="About > Company Location 페이지의 제목, 라벨, 지도 제목을 관리합니다."
      source={source}
      initial={initial}
      storeReady={storeReady}
      previewLabel="오시는 길 페이지"
      form={(draft, update) => <LocationForm draft={draft} update={update} />}
      preview={(draft) => (
        <ScaledDesktop>
          <CompanyLocationView content={draft.content} company={company} />
        </ScaledDesktop>
      )}
    />
  );
}
