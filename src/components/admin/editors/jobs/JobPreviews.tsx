"use client";

import { toJobPost, type JobPostEntity } from "@/lib/admin/entities";
import PostDetail from "@/components/layout/PostDetail";
import ScaledDesktop from "@/components/admin/ScaledDesktop";
import { chrome } from "@/lib/i18n/chrome";

export default function JobPreviews({ draft }: { draft: JobPostEntity }) {
  const post = toJobPost(draft);
  return (
    <ScaledDesktop>
      <PostDetail
        t={chrome.ko}
        activeHref="/about/job-posting"
        sectionLabel="Job Posting"
        boardName="Job Posting"
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
        fileLabel="첨부파일"
        commentVariant="login"
        bodyAlign="left"
      />
    </ScaledDesktop>
  );
}
