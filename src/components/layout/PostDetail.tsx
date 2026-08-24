import type { InterestingItemBlock } from "@/lib/data";
import ServiceNav from "@/components/layout/ServiceNav";
import ItemBody from "@/components/layout/ItemBody";
import PostActions from "@/components/layout/PostActions";
import CommentSection from "@/components/layout/CommentSection";
import PostPager from "@/components/layout/PostPager";

export type PostMeta = {
  author?: string;
  date?: string;
  views?: number;
  likes?: number;
};

export default function PostDetail({
  activeHref,
  subtitle,
  sectionLabel,
  title,
  category,
  meta,
  blocks,
  files,
  listHref,
  fileLabel = "첨부파일",
  showComments = true,
  pagerItems,
  currentIdx,
  pagerBasePath,
}: {
  activeHref: string;
  subtitle: string;
  sectionLabel: string;
  title: string;
  category?: string;
  meta?: PostMeta;
  blocks: InterestingItemBlock[];
  files: { name: string; size: string; url: string }[];
  listHref: string;
  fileLabel?: string;
  showComments?: boolean;
  pagerItems?: { idx: string; title: string }[];
  currentIdx?: string;
  pagerBasePath?: string;
}) {
  return (
    <>
      <ServiceNav activeHref={activeHref} />

      {/* Page title banner */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-8 text-center md:px-6 md:py-10 pc:px-[15px] pc:py-[35px]">
          <p className="text-[16px] font-bold leading-[1.8] text-brand md:text-[20px]">
            {subtitle}
          </p>
          <h1 className="mt-[12px] text-[26px] font-bold leading-[1.2] text-ink md:text-[34px] pc:mt-[16px] pc:text-[44px]">
            {sectionLabel}
          </h1>
        </div>
      </section>

      {/* Post detail */}
      <section className="mx-auto max-w-[1100px] px-4 py-8 md:px-6 md:py-10 pc:px-[15px]">
        {/* Header */}
        <div className="border-b border-neutral-200 pb-4">
          <div className="flex items-start gap-3">
            {category && (
              <span className="mt-1 shrink-0 bg-neutral-800 px-2 py-0.5 text-[11px] font-semibold text-white">
                {category}
              </span>
            )}
            <h2 className="text-[18px] font-bold leading-[1.4] text-ink md:text-[22px]">
              {title}
            </h2>
          </div>
          {meta &&
            (meta.author ||
              meta.date ||
              meta.views !== undefined ||
              meta.likes !== undefined) && (
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px] text-neutral-500 md:text-[13px]">
                {meta.author && (
                  <span className="font-semibold text-neutral-700">
                    {meta.author}
                  </span>
                )}
                {meta.date && (
                  <>
                    <span>·</span>
                    <span>{meta.date}</span>
                  </>
                )}
                {meta.views !== undefined && (
                  <>
                    <span>·</span>
                    <span>조회 {meta.views}</span>
                  </>
                )}
                {meta.likes !== undefined && (
                  <>
                    <span>·</span>
                    <span>좋아요 {meta.likes}</span>
                  </>
                )}
              </div>
            )}
        </div>

        {/* Body */}
        <div className="py-6">
          <ItemBody blocks={blocks} title={title} />

          {/* Files */}
          {files.length > 0 && (
            <div className="mt-8">
              <p className="mb-2 text-[13px] font-bold text-neutral-700 md:text-[14px]">
                {fileLabel}
              </p>
              <ul className="space-y-2">
                {files.map((file) => (
                  <li key={file.url}>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded border border-neutral-200 bg-neutral-50 px-3 py-2 text-[13px] text-brand transition-colors hover:bg-neutral-100 md:text-[14px]"
                    >
                      <svg
                        width="15"
                        height="15"
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
        <PostActions listHref={listHref} />

        {/* Comment section */}
        {showComments && <CommentSection initialCount={0} />}

        {/* Prev / next pager */}
        {pagerItems && currentIdx && pagerBasePath && (
          <PostPager
            items={pagerItems}
            currentIdx={currentIdx}
            basePath={pagerBasePath}
          />
        )}
      </section>
    </>
  );
}
