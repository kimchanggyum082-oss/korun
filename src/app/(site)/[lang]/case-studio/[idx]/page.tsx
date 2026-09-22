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
  const [company, locale] = await Promise.all([
    getSiteSettings(),
    resolveActiveLocale(),
  ]);
  return {
    title: `${item.title} | ${company.name}`,
    description: item.description,
    alternates: metadataAlternates(`/case-studio/${idx}`, locale),
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
  const [items, t, locale] = await Promise.all([
    getBoardItems("case-studio"),
    getChrome(),
    resolveActiveLocale(),
  ]);
  const copy = pagesService[locale];

  return (
    <PostDetail
      t={t}
      activeHref="/case-studio"
      sectionLabel={copy.caseStudio.sectionLabel}
      mobileSubtitle={copy.caseStudio.mobileSubtitle}
      mobileTitle={copy.caseStudio.mobileTitle}
      boardName={copy.caseStudio.boardName}
      title={item.title}
      meta={{
        date: item.date,
        views: item.views,
      }}
      blocks={item.blocks}
      files={item.files}
      listHref="/case-studio"
      fileLabel={copy.caseStudio.fileLabel}
      showComments={false}
      pagerItems={items.map((p) => ({
        idx: p.idx,
        title: p.title,
        date: p.date,
      }))}
      currentIdx={item.idx}
      pagerBasePath="/case-studio"
      locale={locale}
    />
  );
}
