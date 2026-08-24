import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { company, jobPosts } from "@/lib/data";
import AboutNav from "@/components/layout/AboutNav";
import PostActions from "@/components/layout/PostActions";

export const dynamicParams = false;

export function generateStaticParams() {
  return jobPosts.map((post) => ({ idx: post.idx }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idx: string }>;
}): Promise<Metadata> {
  const { idx } = await params;
  const post = jobPosts.find((p) => p.idx === idx);
  if (!post) return {};
  return {
    title: `${post.title} | ${company.name}`,
    description: post.body[0],
  };
}

export default async function JobPostDetailPage({
  params,
}: {
  params: Promise<{ idx: string }>;
}) {
  const { idx } = await params;
  const post = jobPosts.find((p) => p.idx === idx);
  if (!post) notFound();

  return (
    <>
      <AboutNav activeHref="/about/job-posting" />

      {/* Page title banner */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-8 text-center md:px-6 md:py-10 pc:px-[15px] pc:py-[35px]">
          <p className="text-[16px] font-bold leading-[1.8] text-brand md:text-[20px]">
            자사의 채용정보를 알려드립니다.
          </p>
          <h1 className="mt-[12px] text-[26px] font-bold leading-[1.2] text-ink md:text-[34px] pc:mt-[16px] pc:text-[44px]">
            Job Posting
          </h1>
        </div>
      </section>

      {/* Post detail */}
      <section className="mx-auto max-w-[900px] px-4 py-8 md:px-6 md:py-10 pc:px-[15px]">
        {/* Post header */}
        <div className="border-b border-neutral-200 pb-4">
          <h2 className="text-[18px] font-bold leading-[1.4] text-ink md:text-[22px]">
            {post.title}
          </h2>
          <div className="mt-3 flex items-center gap-3 text-[12px] text-neutral-500 md:text-[13px]">
            <span className="font-semibold text-neutral-700">
              {post.author}
            </span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>조회 {post.views}</span>
          </div>
        </div>

        {/* Post body */}
        <div className="py-6">
          <div className="space-y-3 text-[14px] leading-[1.7] text-ink md:text-[15px]">
            {post.body.map((line, i) => (
              <p key={i} className="whitespace-pre-line">
                {line}
              </p>
            ))}
          </div>

          {/* Attached files */}
          {post.files.length > 0 && (
            <div className="mt-8">
              <p className="mb-2 text-[13px] font-bold text-neutral-700 md:text-[14px]">
                첨부파일
              </p>
              <ul className="space-y-1.5">
                {post.files.map((file) => (
                  <li key={file.name}>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-[13px] text-brand hover:underline md:text-[14px]"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      {file.name}
                      <span className="text-neutral-400">({file.size})</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action bar */}
        <PostActions listHref="/about/job-posting" />

        {/* Comment section */}
        <div className="mt-6 border-t border-neutral-200 pt-6">
          <p className="mb-4 text-[14px] font-bold text-ink md:text-[15px]">
            댓글 0
          </p>
          <div className="flex gap-3">
            <textarea
              placeholder="로그인이 필요합니다."
              disabled
              className="h-20 flex-1 resize-none border border-neutral-200 bg-neutral-50 px-3 py-2 text-[13px] text-neutral-400 md:text-[14px]"
            />
            <button
              type="button"
              disabled
              className="self-end bg-neutral-300 px-4 py-2 text-[13px] font-semibold text-white md:text-[14px]"
            >
              작성
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
