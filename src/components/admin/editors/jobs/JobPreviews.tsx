"use client";

import { toJobPost, type JobPostEntity } from "@/lib/admin/entities";
import PostDetail from "@/components/layout/PostDetail";
import ScaledDesktop from "@/components/admin/ScaledDesktop";
import { chrome } from "@/lib/i18n/chrome";
import { jobsDict } from "@/lib/i18n/boards/jobs";
import type { Locale } from "@/lib/i18n/locales";

export default function JobPreviews({
  draft,
  locale,
}: {
  draft: JobPostEntity;
  locale: Locale;
}) {
  const post = toJobPost(draft, locale);
  const t = jobsDict[locale].preview;
  return (
    <ScaledDesktop>
      <PostDetail
        t={chrome[locale]}
        activeHref="/about/job-posting"
        sectionLabel={t.sectionLabel}
        boardName={t.boardName}
        title={post.title}
        showWriter
        showAvatar
        avatarSrc="https://www.korun15.co.kr/common/img/default_profile.png"
        meta={{
          author: post.author,
          date: post.date,
          views: post.views,
          likes: 0,
        }}
        blocks={post.blocks}
        files={post.files.map((file) => ({ ...file, url: "#" }))}
        listHref="/about/job-posting"
        fileLabel={t.fileLabel}
        commentVariant="login"
        bodyAlign="left"
      />
    </ScaledDesktop>
  );
}
