"use client";

import EntityEditor from "@/components/admin/EntityEditor";
import LocalizedField from "@/components/admin/LocalizedField";
import ScaledDesktop from "@/components/admin/ScaledDesktop";
import { SectionCard } from "@/components/admin/fields";
import JobPostingView from "@/components/about/JobPostingView";
import type { getAboutPage } from "@/lib/content";
import {
  ENTITY_KEYS,
  toAboutJobPostingContent,
  type AboutJobPostingEntity,
  type EntitySource,
} from "@/lib/admin/entities";
import { chrome } from "@/lib/i18n/chrome";
import { toLocalized } from "./shared";

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
        <LocalizedField
          label="상단 문구"
          value={content.tagline}
          onChange={(next) => setContent({ tagline: toLocalized(next) })}
        />
        <LocalizedField
          label="제목"
          value={content.title}
          onChange={(next) => setContent({ title: toLocalized(next) })}
        />
      </SectionCard>

      <SectionCard
        title="상세 페이지 헤더"
        description="상세 페이지 상단의 모바일/데스크톱 문구입니다. 기존의 서로 다른 문구를 그대로 유지합니다."
      >
        <LocalizedField
          label="모바일 문구"
          value={content.detailTaglineMobile}
          onChange={(next) =>
            setContent({ detailTaglineMobile: toLocalized(next) })
          }
        />
        <LocalizedField
          label="데스크톱 문구"
          value={content.detailTaglineDesktop}
          onChange={(next) =>
            setContent({ detailTaglineDesktop: toLocalized(next) })
          }
        />
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
          <JobPostingView
            t={chrome.ko}
            content={toAboutJobPostingContent(draft.content)}
            jobPosts={jobPosts}
          />
        </ScaledDesktop>
      )}
    />
  );
}
