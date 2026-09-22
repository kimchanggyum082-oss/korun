import type { Metadata } from "next";
import { getAboutPage, resolveActiveLocale } from "@/lib/content";
import AboutNav from "@/components/layout/AboutNav";
import CompanyLocationView from "@/components/about/CompanyLocationView";
import { metadataAlternates } from "@/lib/i18n/seo";
import { pagesAbout } from "@/lib/i18n/pages-about";

export async function generateMetadata(): Promise<Metadata> {
  const [{ company }, locale] = await Promise.all([
    getAboutPage("company-location"),
    resolveActiveLocale(),
  ]);
  const copy = pagesAbout[locale];
  return {
    title: copy.about.companyLocation.meta.title(company.name),
    description: copy.about.companyLocation.meta.description(company.name),
    alternates: metadataAlternates("/about/company-location", locale),
  };
}

export default async function CompanyLocationPage() {
  const [{ company, content }, locale] = await Promise.all([
    getAboutPage("company-location"),
    resolveActiveLocale(),
  ]);
  return (
    <>
      <AboutNav activeHref="/about/company-location" locale={locale} />
      <CompanyLocationView content={content} company={company} />
    </>
  );
}
