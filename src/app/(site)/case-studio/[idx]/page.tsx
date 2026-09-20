import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBoardItem, getBoardItems, getSiteSettings } from "@/lib/content";
import PostDetail from "@/components/layout/PostDetail";

const company = getSiteSettings();

export const dynamicParams = false;

export function generateStaticParams() {
  return getBoardItems("case-studio").map((item) => ({ idx: item.idx }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idx: string }>;
}): Promise<Metadata> {
  const { idx } = await params;
  const item = getBoardItem("case-studio", idx);
  if (!item) return {};
  return {
    title: `${item.title} | ${company.name}`,
    description: item.description,
  };
}

export default async function CaseStudioDetailPage({
  params,
}: {
  params: Promise<{ idx: string }>;
}) {
  const { idx } = await params;
  const item = getBoardItem("case-studio", idx);
  if (!item) notFound();

  return (
    <PostDetail
      activeHref="/case-studio"
      sectionLabel="Case Studio"
      mobileSubtitle="다운로드 파일을 제공해드립니다"
      mobileTitle="Downloads"
      boardName="Case Studio"
      title={item.title}
      meta={{
        date: item.date,
        views: item.views,
      }}
      blocks={item.blocks}
      files={item.files}
      listHref="/case-studio"
      fileLabel="첨부파일"
      showComments={false}
      pagerItems={getBoardItems("case-studio").map((p) => ({
        idx: p.idx,
        title: p.title,
        date: p.date,
      }))}
      currentIdx={item.idx}
      pagerBasePath="/case-studio"
    />
  );
}
