import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBoardItem, getBoardItems, getSiteSettings } from "@/lib/content";
import PostDetail from "@/components/layout/PostDetail";

export const dynamicParams = false;

export async function generateStaticParams() {
  const items = await getBoardItems("case-studio");
  return items.map((item) => ({ idx: item.idx }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idx: string }>;
}): Promise<Metadata> {
  const { idx } = await params;
  const item = await getBoardItem("case-studio", idx);
  if (!item) return {};
  const company = await getSiteSettings();
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
  const item = await getBoardItem("case-studio", idx);
  if (!item) notFound();
  const items = await getBoardItems("case-studio");

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
      pagerItems={items.map((p) => ({
        idx: p.idx,
        title: p.title,
        date: p.date,
      }))}
      currentIdx={item.idx}
      pagerBasePath="/case-studio"
    />
  );
}
