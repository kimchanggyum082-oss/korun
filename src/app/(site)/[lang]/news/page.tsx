import type { Metadata } from "next";
import ServiceNav from "@/components/layout/ServiceNav";
import NewsList from "@/components/layout/NewsList";
import PageHead from "@/components/service/PageHead";
import {
  getBoardItems,
  getSiteSettings,
  resolveActiveLocale,
} from "@/lib/content";
import { metadataAlternates } from "@/lib/i18n/seo";
import { pagesService } from "@/lib/i18n/pages-service";

export async function generateMetadata(): Promise<Metadata> {
  const [company, locale] = await Promise.all([
    getSiteSettings(),
    resolveActiveLocale(),
  ]);
  const copy = pagesService[locale];
  return {
    title: copy.news.meta.title(company.name),
    description: copy.news.meta.description,
    alternates: metadataAlternates("/news", locale),
  };
}

export default async function NewsPage() {
  const [items, locale] = await Promise.all([
    getBoardItems("news"),
    resolveActiveLocale(),
  ]);
  const copy = pagesService[locale];
  return (
    <>
      <ServiceNav activeHref="/news" locale={locale} />
      <PageHead
        subtitle={copy.news.subtitle}
        title={copy.news.sectionLabel}
        mobileTitle={copy.news.mobileTitle}
      />
      <section className="mx-auto max-w-[1280px] px-[15px] pc:py-0">
        <NewsList items={items} />
      </section>
    </>
  );
}
