import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBoardItem, getBoardItems, getSiteSettings } from "@/lib/content";
import PostDetail from "@/components/layout/PostDetail";

const company = getSiteSettings();

export const dynamicParams = false;

export function generateStaticParams() {
  return getBoardItems("news").map((item) => ({ idx: item.idx }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idx: string }>;
}): Promise<Metadata> {
  const { idx } = await params;
  const item = getBoardItem("news", idx);
  if (!item) return {};
  return {
    title: `${item.title} | ${company.name}`,
    description: item.description,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ idx: string }>;
}) {
  const { idx } = await params;
  const item = getBoardItem("news", idx);
  if (!item) notFound();

  return (
    <PostDetail
      activeHref="/news"
      subtitle="최신 뉴스와 이벤트를 한눈에 보여드립니다"
      sectionLabel="News&Events"
      mobileTitle="News & Events"
      boardName="뉴스&이벤트"
      title={item.title}
      category={item.category}
      meta={{
        author: item.author,
        date: item.date,
        views: item.views,
        likes: item.likes,
      }}
      blocks={item.blocks}
      files={item.files}
      listHref="/news"
      pagerItems={getBoardItems("news").map((p) => ({
        idx: p.idx,
        title: p.title,
        date: p.date,
      }))}
      currentIdx={item.idx}
      pagerBasePath="/news"
    />
  );
}
