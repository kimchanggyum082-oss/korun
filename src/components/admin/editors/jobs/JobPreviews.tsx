"use client";

import type { JobPost } from "@/lib/data";
import PostDetail from "@/components/layout/PostDetail";
import ScaledDesktop from "@/components/admin/ScaledDesktop";

export default function JobPreviews({ draft }: { draft: JobPost }) {
  return (
    <ScaledDesktop>
      <PostDetail
        activeHref="/about/job-posting"
        sectionLabel="Job Posting"
        boardName="Job Posting"
        title={draft.title}
        showWriter
        showAvatar
        avatarSrc="https://www.korun15.co.kr/common/img/default_profile.png"
        meta={{
          author: draft.author,
          date: draft.date,
          views: draft.views,
          likes: 0,
        }}
        blocks={draft.blocks}
        files={draft.files.map((file) => ({ ...file, url: "#" }))}
        listHref="/about/job-posting"
        fileLabel="첨부파일"
        commentVariant="login"
        bodyAlign="left"
      />
    </ScaledDesktop>
  );
}
