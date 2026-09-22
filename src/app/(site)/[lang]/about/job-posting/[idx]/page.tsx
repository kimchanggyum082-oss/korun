import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAboutPage, resolveActiveLocale } from "@/lib/content";
import AboutNav from "@/components/layout/AboutNav";
import PostDetail from "@/components/layout/PostDetail";
import { getChrome } from "@/lib/i18n/server";
import { metadataAlternates } from "@/lib/i18n/seo";
import { pagesAbout } from "@/lib/i18n/pages-about";

export const dynamicParams = false;

export async function generateStaticParams() {
  const { jobPosts } = await getAboutPage("job-posting");
  return jobPosts.map((post) => ({ idx: post.idx }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idx: string }>;
}): Promise<Metadata> {
  const { idx } = await params;
  const [{ company, jobPosts }, locale] = await Promise.all([
    getAboutPage("job-posting"),
    resolveActiveLocale(),
  ]);
  const post = jobPosts.find((p) => p.idx === idx);
  if (!post) return {};
  const firstText = post.blocks.find((block) => block.type === "text");
  return {
    title: `${post.title} | ${company.name}`,
    description: firstText ? firstText.content : "",
    alternates: metadataAlternates(`/about/job-posting/${idx}`, locale),
  };
}

function JobPostHead({
  title,
  mobileTagline,
  desktopTagline,
}: {
  title: string;
  mobileTagline: string;
  desktopTagline: string;
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-[15px] py-[50px] text-center pc:py-[80px]">
        <div className="mt-[7.5px] mb-[15px] pc:my-0 pc:py-[15px]">
          <p className="text-center text-[15px] leading-[24px] font-bold pc:text-[22px] pc:leading-[31px]">
            <span className="pc:hidden" style={{ color: "rgb(0, 53, 29)" }}>
              {mobileTagline}
            </span>
            <span className="hidden text-brand pc:inline">
              {desktopTagline}
            </span>
          </p>
        </div>
        <div className="mt-[7.5px] mb-[7.5px] pc:my-0 pc:pt-[20px] pc:pb-[10px]">
          <h1 className="text-[30px] font-bold leading-[36px] text-ink pc:mt-0 pc:text-[50px] pc:leading-[60px]">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}

export default async function JobPostDetailPage({
  params,
}: {
  params: Promise<{ idx: string }>;
}) {
  const { idx } = await params;
  const [{ content, jobPosts }, t, locale] = await Promise.all([
    getAboutPage("job-posting"),
    getChrome(),
    resolveActiveLocale(),
  ]);
  const post = jobPosts.find((p) => p.idx === idx);
  if (!post) notFound();
  const copy = pagesAbout[locale].about.jobPosting.detail;

  return (
    <PostDetail
      t={t}
      activeHref="/about/job-posting"
      nav={<AboutNav activeHref="/about/job-posting" locale={locale} />}
      head={
        <JobPostHead
          title={content.title}
          mobileTagline={content.detailTaglineMobile}
          desktopTagline={content.detailTaglineDesktop}
        />
      }
      sectionLabel={copy.sectionLabel}
      boardName={copy.boardName}
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
      fileLabel={copy.fileLabel}
      commentVariant="login"
      bodyAlign="left"
      pagerItems={jobPosts.map((p) => ({
        idx: p.idx,
        title: p.title,
        date: p.date,
      }))}
      currentIdx={post.idx}
      pagerBasePath="/about/job-posting"
      locale={locale}
    />
  );
}
