import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { company, downloadItems } from "@/lib/data";
import PostDetail from "@/components/layout/PostDetail";

export const dynamicParams = false;

export function generateStaticParams() {
  return downloadItems.map((item) => ({ idx: item.idx }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idx: string }>;
}): Promise<Metadata> {
  const { idx } = await params;
  const item = downloadItems.find((p) => p.idx === idx);
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
  const item = downloadItems.find((p) => p.idx === idx);
  if (!item) notFound();

  return (
    <PostDetail
      activeHref="/downloads"
      subtitle="코런 제품 자료를 내려받기 하실 수 있습니다"
      sectionLabel="Downloads"
      title={item.title}
      blocks={item.blocks}
      files={item.files}
      listHref="/downloads"
      fileLabel="다운로드 파일"
      pagerItems={downloadItems.map((p) => ({ idx: p.idx, title: p.title }))}
      currentIdx={item.idx}
      pagerBasePath="/downloads"
    />
  );
}
