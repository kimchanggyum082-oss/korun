import type { Metadata } from "next";
import ServiceNav from "@/components/layout/ServiceNav";
import DownloadList from "@/components/layout/DownloadList";
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
    title: copy.downloads.meta.title(company.name),
    description: copy.downloads.meta.description,
    alternates: metadataAlternates("/downloads", locale),
  };
}

export default async function DownloadsPage() {
  const [items, locale] = await Promise.all([
    getBoardItems("downloads"),
    resolveActiveLocale(),
  ]);
  const copy = pagesService[locale];
  return (
    <>
      <ServiceNav activeHref="/downloads" locale={locale} />
      <PageHead
        subtitle={copy.downloads.subtitle}
        title={copy.downloads.sectionLabel}
        mobileSubtitle={copy.downloads.mobileSubtitle}
      />
      <section className="mx-auto max-w-[1280px] px-[15px] pc:py-0">
        <DownloadList items={items} />
      </section>
    </>
  );
}
