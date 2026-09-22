import type { Metadata } from "next";
import TechNav from "@/components/layout/TechNav";
import InterestingItemsList from "@/components/layout/InterestingItemsList";
import PageHead from "@/components/service/PageHead";
import {
  getBoardItems,
  getSiteSettings,
  resolveActiveLocale,
} from "@/lib/content";
import { metadataAlternates } from "@/lib/i18n/seo";
import { pagesAbout } from "@/lib/i18n/pages-about";

export async function generateMetadata(): Promise<Metadata> {
  const [company, locale] = await Promise.all([
    getSiteSettings(),
    resolveActiveLocale(),
  ]);
  const copy = pagesAbout[locale].technology.interestingItems;
  return {
    title: copy.meta.title(company.name),
    description: copy.meta.description,
    alternates: metadataAlternates("/technology/interesting-items", locale),
  };
}

export default async function InterestingItemsPage() {
  const [items, locale] = await Promise.all([
    getBoardItems("interesting-items"),
    resolveActiveLocale(),
  ]);
  const copy = pagesAbout[locale].technology.interestingItems;
  return (
    <>
      <TechNav activeHref="/technology/interesting-items" locale={locale} />
      <PageHead
        subtitle={copy.subtitle}
        title={copy.sectionLabel}
        mobileSubtitle={copy.mobileSubtitle}
      />
      <section className="mx-auto max-w-[1280px] px-[15px] pc:py-0">
        <InterestingItemsList items={items} />
      </section>
    </>
  );
}
