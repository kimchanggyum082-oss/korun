import type { Metadata } from "next";
import ServiceNav from "@/components/layout/ServiceNav";
import CaseStudioList from "@/components/layout/CaseStudioList";
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
    title: copy.caseStudio.meta.title(company.name),
    description: copy.caseStudio.meta.description,
    alternates: metadataAlternates("/case-studio", locale),
  };
}

export default async function CaseStudioPage() {
  const [items, locale] = await Promise.all([
    getBoardItems("case-studio"),
    resolveActiveLocale(),
  ]);
  const copy = pagesService[locale];
  return (
    <>
      <ServiceNav activeHref="/case-studio" locale={locale} />
      <PageHead
        title={copy.caseStudio.sectionLabel}
        mobileSubtitle={copy.caseStudio.mobileSubtitle}
        mobileTitle={copy.caseStudio.mobileTitle}
      />
      <section className="mx-auto max-w-[1280px] px-[15px] pc:py-0">
        <CaseStudioList items={items} />
      </section>
    </>
  );
}
