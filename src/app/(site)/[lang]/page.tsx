import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";
import Products from "@/components/home/Products";
import CtaBanner from "@/components/home/CtaBanner";
import { ListsSection } from "@/components/home/Lists";
import ValuesBanner from "@/components/home/ValuesBanner";
import LocationSection from "@/components/home/LocationSection";
import PolicyModal from "@/components/layout/PolicyModal";
import {
  getHomePage,
  getPolicyModal,
  resolveActiveLocale,
} from "@/lib/content";
import { metadataAlternates } from "@/lib/i18n/seo";
import { pagesAbout } from "@/lib/i18n/pages-about";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveActiveLocale();
  const copy = pagesAbout[locale].home;
  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: metadataAlternates("/", locale),
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [params, home, locale] = await Promise.all([
    searchParams,
    getHomePage(),
    resolveActiveLocale(),
  ]);
  const kind =
    params.mode === "policy"
      ? "policy"
      : params.mode === "privacy"
        ? "privacy"
        : null;
  const modal = kind ? await getPolicyModal(kind) : null;

  return (
    <>
      <HeroSlider
        slides={home.content.hero.slides}
        slidesMobile={home.content.hero.slidesMobile}
      />
      <Products content={home.content.products} locale={locale} />
      <CtaBanner content={home.content.cta} />
      <ListsSection lists={home.content.lists} locale={locale} />
      <ValuesBanner values={home.content.values} />
      <LocationSection location={home.content.location} />
      {kind && modal && <PolicyModal kind={kind} modal={modal} />}
    </>
  );
}
