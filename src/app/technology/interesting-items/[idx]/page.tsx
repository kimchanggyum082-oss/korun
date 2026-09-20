import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { company, interestingItems } from "@/lib/data";
import PostDetail from "@/components/layout/PostDetail";
import TechNav from "@/components/layout/TechNav";

export const dynamicParams = false;

export function generateStaticParams() {
  return interestingItems.map((item) => ({ idx: item.idx }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idx: string }>;
}): Promise<Metadata> {
  const { idx } = await params;
  const item = interestingItems.find((p) => p.idx === idx);
  if (!item) return {};
  return {
    title: `${item.title} | ${company.name}`,
    description: item.description,
  };
}

export default async function InterestingItemDetailPage({
  params,
}: {
  params: Promise<{ idx: string }>;
}) {
  const { idx } = await params;
  const item = interestingItems.find((p) => p.idx === idx);
  if (!item) notFound();

  return (
    <PostDetail
      activeHref="/technology/interesting-items"
      nav={<TechNav activeHref="/technology/interesting-items" />}
      subtitle="자사의 기술력으로 구현된 다양한 제품을 소개합니다."
      mobileSubtitle="신적이고 탁월한 아이템을 소개드립니다"
      sectionLabel="Interesting Items"
      boardName="Interesting Items"
      title={item.title}
      meta={{
        author: item.author,
        date: item.date,
        views: item.views,
      }}
      blocks={item.blocks}
      files={item.files.map((file) => ({ ...file, url: "#" }))}
      listHref="/technology/interesting-items"
      showWriter
      pagerItems={interestingItems.map((p) => ({
        idx: p.idx,
        title: p.title,
        date: p.date,
      }))}
      currentIdx={item.idx}
      pagerBasePath="/technology/interesting-items"
    />
  );
}
