import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBoardItem, getBoardItems, getSiteSettings } from "@/lib/content";
import PostDetail from "@/components/layout/PostDetail";

export const dynamicParams = false;

export async function generateStaticParams() {
  const items = await getBoardItems("news");
  return items.map((item) => ({ idx: item.idx }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idx: string }>;
}): Promise<Metadata> {
  const { idx } = await params;
  const item = await getBoardItem("news", idx);
  if (!item) return {};
  const company = await getSiteSettings();
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
  const item = await getBoardItem("news", idx);
  if (!item) notFound();
  const items = await getBoardItems("news");

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
      pagerItems={items.map((p) => ({
        idx: p.idx,
        title: p.title,
        date: p.date,
      }))}
      currentIdx={item.idx}
      pagerBasePath="/news"
    />
  );
}
