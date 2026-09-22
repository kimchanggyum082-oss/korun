"use client";

import EntityEditor from "@/components/admin/EntityEditor";
import ScaledDesktop from "@/components/admin/ScaledDesktop";
import { Field, SectionCard, TextInput } from "@/components/admin/fields";
import JobPostingView from "@/components/about/JobPostingView";
import type { getAboutPage } from "@/lib/content";
import {
  ENTITY_KEYS,
  type AboutJobPostingEntity,
  type EntitySource,
} from "@/lib/admin/entities";

type AboutPageJobPosts = Awaited<ReturnType<typeof getAboutPage>>["jobPosts"];

function JobPostingForm({
  draft,
  update,
}: {
  draft: AboutJobPostingEntity;
  update: (
    updater: (current: AboutJobPostingEntity) => AboutJobPostingEntity,
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
        title="목록 페이지"
        description="채용 공고 목록 상단의 문구와 제목입니다."
      >
        <Field label="상단 문구">
          <TextInput
            value={content.tagline}
            onChange={(event) => setContent({ tagline: event.target.value })}
          />
        </Field>
        <Field label="제목">
          <TextInput
            value={content.title}
            onChange={(event) => setContent({ title: event.target.value })}
          />
        </Field>
      </SectionCard>

      <SectionCard
        title="상세 페이지 헤더"
        description="상세 페이지 상단의 모바일/데스크톱 문구입니다. 기존의 서로 다른 문구를 그대로 유지합니다."
      >
        <Field label="모바일 문구">
          <TextInput
            value={content.detailTaglineMobile}
            onChange={(event) =>
              setContent({ detailTaglineMobile: event.target.value })
            }
          />
        </Field>
        <Field label="데스크톱 문구">
          <TextInput
            value={content.detailTaglineDesktop}
            onChange={(event) =>
              setContent({ detailTaglineDesktop: event.target.value })
            }
          />
        </Field>
      </SectionCard>
    </>
  );
}

export default function AboutJobPostingEditor({
  initial,
  source,
  storeReady,
  jobPosts,
}: {
  initial: AboutJobPostingEntity;
  source: EntitySource;
  storeReady: boolean;
  jobPosts: AboutPageJobPosts;
}) {
  return (
    <EntityEditor<AboutJobPostingEntity>
      entityKey={ENTITY_KEYS.aboutJobPosting}
      label="About"
      title="채용"
      description="About > Job Posting 페이지의 헤더 문구를 관리합니다."
      source={source}
      initial={initial}
      storeReady={storeReady}
      previewLabel="채용 페이지"
      form={(draft, update) => <JobPostingForm draft={draft} update={update} />}
      preview={(draft) => (
        <ScaledDesktop>
          <JobPostingView content={draft.content} jobPosts={jobPosts} />
        </ScaledDesktop>
      )}
    />
  );
}
