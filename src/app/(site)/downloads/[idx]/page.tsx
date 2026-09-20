import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBoardItem, getBoardItems, getSiteSettings } from "@/lib/content";
import PostDetail from "@/components/layout/PostDetail";

const company = getSiteSettings();

export const dynamicParams = false;

export function generateStaticParams() {
  return getBoardItems("downloads").map((item) => ({ idx: item.idx }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idx: string }>;
}): Promise<Metadata> {
  const { idx } = await params;
  const item = getBoardItem("downloads", idx);
  if (!item) return {};
  return {
    title: `${item.title} | ${company.name}`,
    description: item.description,
  };
}

export default async function DownloadDetailPage({
  params,
}: {
  params: Promise<{ idx: string }>;
}) {
  const { idx } = await params;
  const item = getBoardItem("downloads", idx);
  if (!item) notFound();

  return (
    <PostDetail
      activeHref="/downloads"
      subtitle={"\u00a0코런의 제품과 회사소개서를 다운받을 수 있습니다.\u00a0"}
      mobileSubtitle="다운로드 파일을 제공해드립니다"
      sectionLabel="Downloads"
      boardName="Downloads"
      title={item.title}
      meta={{
        date: item.date,
        views: item.views,
      }}
      blocks={item.blocks}
      files={item.files}
      listHref="/downloads"
      fileLabel="다운로드 파일"
      pagerItems={getBoardItems("downloads").map((p) => ({
        idx: p.idx,
        title: p.title,
        date: p.date,
      }))}
      currentIdx={item.idx}
      pagerBasePath="/downloads"
    />
  );
}
