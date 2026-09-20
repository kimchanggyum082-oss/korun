import Link from "next/link";
import type { ReactNode } from "react";
import type { InterestingItemBlock, TextAlign } from "@/lib/data";
import ServiceNav from "@/components/layout/ServiceNav";
import ItemBody from "@/components/layout/ItemBody";
import PostActions from "@/components/layout/PostActions";
import CommentSection from "@/components/layout/CommentSection";
import PostPager, { type PostPagerItem } from "@/components/layout/PostPager";
import PageHead from "@/components/service/PageHead";
import FileList from "@/components/service/FileList";

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
  boardName,
  fileLabel = "첨부파일",
  showComments = true,
  showWriter = false,
  showAvatar = false,
  avatarSrc,
  pagerItems,
  currentIdx,
  pagerBasePath,
  nav,
  head,
  mobileSubtitle,
  mobileTitle,
  bodyAlign = "center",
  commentVariant = "guest",
}: {
  activeHref: string;
  subtitle?: string;
  sectionLabel: string;
  title: string;
  category?: string;
  meta?: PostMeta;
  blocks: InterestingItemBlock[];
  files: { name: string; size: string; url?: string }[];
  listHref: string;
  boardName: string;
  fileLabel?: string;
  showComments?: boolean;
  showWriter?: boolean;
  showAvatar?: boolean;
  avatarSrc?: string;
  pagerItems?: PostPagerItem[];
  currentIdx?: string;
  pagerBasePath?: string;
  nav?: ReactNode;
  head?: ReactNode;
  mobileSubtitle?: string;
  mobileTitle?: string;
  bodyAlign?: TextAlign;
  commentVariant?: "guest" | "login";
}) {
  const catColor = category === "EVENT" ? "#6ecc51" : "#00b8ff";

  const summary = (
    <>
      {showWriter && meta?.author && (
        <div className="text-[14px] leading-[21px] text-ink">{meta.author}</div>
      )}
      <div className="flex flex-wrap items-center">
        <div className="mr-[10px] text-[13px] leading-[15.6px]">
          <Link href={listHref} className="text-[#757575]">
            {boardName}
          </Link>
        </div>
        {meta?.date && (
          <div className="mr-[10px] text-[13px] leading-[15.6px] text-[rgba(54,54,54,0.7)]">
            {meta.date}
          </div>
        )}
        {meta?.views !== undefined && (
          <div className="mr-[10px] text-[13px] leading-[15.6px] text-[rgba(54,54,54,0.7)]">
            조회수 {meta.views}
          </div>
        )}
      </div>
    </>
  );

  const titleLine = (
    <h1 className="m-0 text-[20px] leading-[32px] font-normal text-ink">
      {category && (
        <Link href={listHref}>
          <span className="pr-[10px]" style={{ color: catColor }}>
            {category}
          </span>
        </Link>
      )}
      {title}
    </h1>
  );

  return (
    <>
      {nav ?? <ServiceNav activeHref={activeHref} />}

      {head ?? (
        <PageHead
          subtitle={subtitle}
          title={sectionLabel}
          mobileSubtitle={mobileSubtitle}
          mobileTitle={mobileTitle}
        />
      )}

      {/* PC board view */}
      <section className="hidden pc:block">
        <div className="mx-auto max-w-[1280px] px-[15px]">
          <div className="py-[15px]">
            <div>
              <div className="mb-[15px] h-[32px]">{titleLine}</div>

              <div className="border-b border-[rgba(128,128,128,0.2)] pt-[8px] pb-[20px]">
                {showAvatar && avatarSrc ? (
                  <div className="flex">
                    <div className="pr-[16px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={avatarSrc}
                        alt=""
                        width={40}
                        height={40}
                        className="h-[40px] w-[40px] rounded-full"
                      />
                    </div>
                    <div>{summary}</div>
                  </div>
                ) : (
                  summary
                )}
              </div>

              <div className="py-[22px]">
                <div className="mt-[16px]">
                  <ItemBody
                    blocks={blocks}
                    title={title}
                    defaultAlign={bodyAlign}
                  />
                </div>
                <div className="mt-8 pc:mt-0">
                  <FileList files={files} />
                </div>
              </div>

              {showComments && (
                <div className="mb-[24px]">
                  <PostActions likeCount={meta?.likes ?? 0} commentCount={0} />
                  <CommentSection
                    initialCount={0}
                    variant={commentVariant}
                  />
                </div>
              )}

              {pagerItems && currentIdx && pagerBasePath && (
                <PostPager
                  items={pagerItems}
                  currentIdx={currentIdx}
                  basePath={pagerBasePath}
                />
              )}
            </div>
          </div>

          <div className="pc:h-[110px] pc:pt-[15px]">
            <div className="pc:h-[80px]" />
          </div>
        </div>
      </section>

      {/* Mobile */}
      <section className="mx-auto max-w-[1280px] px-[15px] pc:hidden">
        <div className="pt-[7.5px]">
          <h1 className="pt-[7.5px] pr-[30px] pb-[15px] text-[20px] leading-[32px] font-normal text-ink">
            {category && (
              <Link href={listHref}>
                <span className="pr-[10px]" style={{ color: catColor }}>
                  {category}
                </span>
              </Link>
            )}
            {title}
          </h1>

          <div className="-mx-[15px] flow-root px-[15px] pt-[15px]">
            {showAvatar && avatarSrc ? (
              <div className="float-left mr-[12px] align-top">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarSrc}
                  alt=""
                  width={32}
                  height={32}
                  className="h-[32px] w-[32px] rounded-full"
                />
              </div>
            ) : null}
            {showWriter && meta?.author && (
              <div className="text-[14px] leading-[21px] text-ink">
                {meta.author}
              </div>
            )}
            <div className="float-left mr-[10px] text-[11px] leading-[13.2px] text-[#363636]">
              <Link href={listHref} className="text-[#757575]">
                {boardName}
              </Link>
            </div>
            {meta?.date && (
              <div className="float-left mr-[10px] text-[11px] leading-[13.2px] text-[rgba(54,54,54,0.7)]">
                {meta.date}
              </div>
            )}
            {meta?.views !== undefined && (
              <div className="float-left mr-[10px] text-[11px] leading-[13.2px] text-[rgba(54,54,54,0.7)]">
                조회수 {meta.views}
              </div>
            )}
          </div>

          <div className="py-[22px]">
            <div className="mt-[16px]">
              <ItemBody blocks={blocks} title={title} defaultAlign={bodyAlign} />
            </div>
            <FileList files={files} />
          </div>

          {showComments && (
            <div className="mb-[24px]">
              <PostActions likeCount={meta?.likes ?? 0} commentCount={0} />
              <CommentSection initialCount={0} variant={commentVariant} />
            </div>
          )}

          {pagerItems && currentIdx && pagerBasePath && (
            <PostPager
              items={pagerItems}
              currentIdx={currentIdx}
              basePath={pagerBasePath}
            />
          )}
        </div>
        <div className="h-[62.5px]" />
      </section>
    </>
  );
}
