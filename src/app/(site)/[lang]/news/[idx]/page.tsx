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
  const [company, locale] = await Promise.all([
    getSiteSettings(),
    resolveActiveLocale(),
  ]);
  return {
    title: `${item.title} | ${company.name}`,
    description: item.description,
    alternates: metadataAlternates(`/news/${idx}`, locale),
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
  const [items, t, locale] = await Promise.all([
    getBoardItems("news"),
    getChrome(),
    resolveActiveLocale(),
  ]);
  const copy = pagesService[locale];

  return (
    <PostDetail
      t={t}
      activeHref="/news"
      subtitle={copy.news.subtitle}
      sectionLabel={copy.news.sectionLabel}
      mobileTitle={copy.news.mobileTitle}
      boardName={copy.news.boardName}
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
      locale={locale}
    />
  );
}
