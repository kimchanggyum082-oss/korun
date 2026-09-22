import type { Metadata } from "next";
import { getAboutPage, resolveActiveLocale } from "@/lib/content";
import AboutNav from "@/components/layout/AboutNav";
import GreetingsView from "@/components/about/GreetingsView";
import { metadataAlternates } from "@/lib/i18n/seo";
import { pagesAbout } from "@/lib/i18n/pages-about";

export async function generateMetadata(): Promise<Metadata> {
  const [{ company }, locale] = await Promise.all([
    getAboutPage("greetings"),
    resolveActiveLocale(),
  ]);
  const copy = pagesAbout[locale];
  return {
    title: copy.about.greetings.meta.title(company.name),
    description: copy.about.greetings.meta.description,
    alternates: metadataAlternates("/about/greetings", locale),
  };
}

export default async function GreetingsPage() {
  const [{ assets, content }, locale] = await Promise.all([
    getAboutPage("greetings"),
    resolveActiveLocale(),
  ]);
  return (
    <>
      <AboutNav activeHref="/about/greetings" locale={locale} />
      <GreetingsView content={content} assets={assets} />
    </>
  );
}
