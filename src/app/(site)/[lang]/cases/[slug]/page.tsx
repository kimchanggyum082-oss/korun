import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseNav from "@/components/layout/CaseNav";
import CaseDetailView from "@/components/cases/CaseDetailView";
import {
  getCasePage,
  getCasePages,
  getSiteSettings,
  resolveActiveLocale,
} from "@/lib/content";
import { metadataAlternates } from "@/lib/i18n/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  const pages = await getCasePages();
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getCasePage(slug);
  if (!page) return {};
  const [company, locale] = await Promise.all([
    getSiteSettings(),
    resolveActiveLocale(),
  ]);
  return {
    title: `${page.title} | ${company.name}`,
    description: page.subtitle,
    alternates: metadataAlternates(`/cases/${slug}`, locale),
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [page, locale] = await Promise.all([
    getCasePage(slug),
    resolveActiveLocale(),
  ]);
  if (!page) notFound();

  const activeHref = `/cases/${slug}`;

  return (
    <>
      <CaseNav activeHref={activeHref} locale={locale} />

      <CaseDetailView page={page} slug={slug} />
    </>
  );
}
