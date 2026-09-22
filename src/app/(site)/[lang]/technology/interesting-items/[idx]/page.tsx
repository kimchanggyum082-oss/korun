import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getBoardItem,
  getBoardItems,
  getSiteSettings,
  resolveActiveLocale,
} from "@/lib/content";
import PostDetail from "@/components/layout/PostDetail";
import TechNav from "@/components/layout/TechNav";
import { getChrome } from "@/lib/i18n/server";
import { metadataAlternates } from "@/lib/i18n/seo";
import { pagesAbout } from "@/lib/i18n/pages-about";

export const dynamicParams = false;

export async function generateStaticParams() {
  const items = await getBoardItems("interesting-items");
  return items.map((item) => ({ idx: item.idx }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idx: string }>;
}): Promise<Metadata> {
  const { idx } = await params;
  const item = await getBoardItem("interesting-items", idx);
  if (!item) return {};
  const [company, locale] = await Promise.all([
    getSiteSettings(),
    resolveActiveLocale(),
  ]);
  return {
    title: `${item.title} | ${company.name}`,
    description: item.description,
    alternates: metadataAlternates(
      `/technology/interesting-items/${idx}`,
      locale,
    ),
  };
}

export default async function InterestingItemDetailPage({
  params,
}: {
  params: Promise<{ idx: string }>;
}) {
  const { idx } = await params;
  const item = await getBoardItem("interesting-items", idx);
  if (!item) notFound();
  const [items, t, locale] = await Promise.all([
    getBoardItems("interesting-items"),
    getChrome(),
    resolveActiveLocale(),
  ]);
  const copy = pagesAbout[locale].technology.interestingItems;

  return (
    <PostDetail
      t={t}
      activeHref="/technology/interesting-items"
      nav={
        <TechNav activeHref="/technology/interesting-items" locale={locale} />
      }
      subtitle={copy.subtitle}
      mobileSubtitle={copy.mobileSubtitle}
      sectionLabel={copy.sectionLabel}
      boardName={copy.boardName}
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
      pagerItems={items.map((p) => ({
        idx: p.idx,
        title: p.title,
        date: p.date,
      }))}
      currentIdx={item.idx}
      pagerBasePath="/technology/interesting-items"
      locale={locale}
    />
  );
}
