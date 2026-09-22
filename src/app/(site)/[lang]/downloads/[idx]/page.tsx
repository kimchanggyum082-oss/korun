import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getBoardItem,
  getBoardItems,
  getSiteSettings,
  resolveActiveLocale,
} from "@/lib/content";
import PostDetail from "@/components/layout/PostDetail";
import { getChrome } from "@/lib/i18n/server";
import { metadataAlternates } from "@/lib/i18n/seo";
import { pagesService } from "@/lib/i18n/pages-service";

export const dynamicParams = false;

export async function generateStaticParams() {
  const items = await getBoardItems("downloads");
  return items.map((item) => ({ idx: item.idx }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idx: string }>;
}): Promise<Metadata> {
  const { idx } = await params;
  const item = await getBoardItem("downloads", idx);
  if (!item) return {};
  const [company, locale] = await Promise.all([
    getSiteSettings(),
    resolveActiveLocale(),
  ]);
  return {
    title: `${item.title} | ${company.name}`,
    description: item.description,
    alternates: metadataAlternates(`/downloads/${idx}`, locale),
  };
}

export default async function DownloadDetailPage({
  params,
}: {
  params: Promise<{ idx: string }>;
}) {
  const { idx } = await params;
  const item = await getBoardItem("downloads", idx);
  if (!item) notFound();
  const [items, t, locale] = await Promise.all([
    getBoardItems("downloads"),
    getChrome(),
    resolveActiveLocale(),
  ]);
  const copy = pagesService[locale];

  return (
    <PostDetail
      t={t}
      activeHref="/downloads"
      subtitle={copy.downloads.subtitle}
      mobileSubtitle={copy.downloads.mobileSubtitle}
      sectionLabel={copy.downloads.sectionLabel}
      boardName={copy.downloads.boardName}
      title={item.title}
      meta={{
        date: item.date,
        views: item.views,
      }}
      blocks={item.blocks}
      files={item.files}
      listHref="/downloads"
      fileLabel={copy.downloads.fileLabel}
      pagerItems={items.map((p) => ({
        idx: p.idx,
        title: p.title,
        date: p.date,
      }))}
      currentIdx={item.idx}
      pagerBasePath="/downloads"
      locale={locale}
    />
  );
}
