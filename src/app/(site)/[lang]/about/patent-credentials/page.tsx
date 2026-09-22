import type { Metadata } from "next";
import { getAboutPage, resolveActiveLocale } from "@/lib/content";
import AboutNav from "@/components/layout/AboutNav";
import PatentCredentialsView from "@/components/about/PatentCredentialsView";
import { metadataAlternates } from "@/lib/i18n/seo";
import { pagesAbout } from "@/lib/i18n/pages-about";

export async function generateMetadata(): Promise<Metadata> {
  const [{ company }, locale] = await Promise.all([
    getAboutPage("patent-credentials"),
    resolveActiveLocale(),
  ]);
  const copy = pagesAbout[locale];
  return {
    title: copy.about.patentCredentials.meta.title(company.name),
    description: copy.about.patentCredentials.meta.description(company.name),
    alternates: metadataAlternates("/about/patent-credentials", locale),
  };
}

export default async function PatentCredentialsPage() {
  const [{ assets, content }, locale] = await Promise.all([
    getAboutPage("patent-credentials"),
    resolveActiveLocale(),
  ]);
  return (
    <>
      <AboutNav activeHref="/about/patent-credentials" locale={locale} />
      <PatentCredentialsView content={content} assets={assets} />
    </>
  );
}
