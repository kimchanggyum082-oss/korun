"use client";

import HeroSlider from "@/components/home/HeroSlider";
import Products from "@/components/home/Products";
import CtaBanner from "@/components/home/CtaBanner";
import { ListsSection } from "@/components/home/Lists";
import ValuesBanner from "@/components/home/ValuesBanner";
import LocationSection from "@/components/home/LocationSection";
import AboutSectionPreview from "@/lib/content/registry/about-preview";
import ProductsSectionPreview from "@/lib/content/registry/products-preview";
import CasesSectionPreview from "@/lib/content/registry/cases-preview";
import SiteSectionPreview from "@/lib/content/registry/site-preview";
import type { SiteSettingsResolved } from "@/lib/content/registry/site-resolve";
import type { ContentDef, ContentGroup } from "@/lib/content/registry-types";
import type { HomeContent } from "@/lib/data";
import type { Locale } from "@/lib/i18n/locales";
import ScaledDesktop from "./ScaledDesktop";

type HomeSection =
  "hero" | "products" | "values" | "cta" | "lists" | "location";

function homeSectionOfKey(key: string): HomeSection | null {
  if (key.startsWith("home.hero.")) return "hero";
  if (key.startsWith("home.products.")) return "products";
  if (key.startsWith("home.values.")) return "values";
  if (key.startsWith("home.cta.")) return "cta";
  if (key.startsWith("home.lists.")) return "lists";
  if (key.startsWith("home.location.")) return "location";
  return null;
}

/**
 * Renders a live WYSIWYG thumbnail of the section the admin is editing,
 * reusing the public page components (MCell's `SectionPreview` equivalent).
 */
export default function PageSectionPreview({
  group,
  sectionDef,
  content,
  contact,
  locale,
}: {
  group: ContentGroup;
  sectionDef: ContentDef;
  content: unknown;
  contact?: SiteSettingsResolved;
  locale: Locale;
}) {
  if (group === "home" && content) {
    const home = content as HomeContent;
    const section = homeSectionOfKey(sectionDef.key);
    if (section) {
      return (
        <ScaledDesktop>
          {section === "hero" && (
            <HeroSlider
              slides={home.hero.slides}
              slidesMobile={home.hero.slidesMobile}
            />
          )}
          {section === "products" && (
            <Products content={home.products} locale={locale} />
          )}
          {section === "values" && <ValuesBanner values={home.values} />}
          {section === "cta" && <CtaBanner content={home.cta} />}
          {section === "lists" && (
            <ListsSection lists={home.lists} locale={locale} />
          )}
          {section === "location" && (
            <LocationSection
              location={home.location}
              contact={contact}
              locale={locale}
            />
          )}
        </ScaledDesktop>
      );
    }
  }

  if (group === "about" && content) {
    return (
      <AboutSectionPreview
        sectionDef={sectionDef}
        content={content}
        locale={locale}
      />
    );
  }
  if (group === "products" && content) {
    return (
      <ProductsSectionPreview
        sectionDef={sectionDef}
        content={content}
        locale={locale}
      />
    );
  }
  if (group === "cases" && content) {
    return (
      <CasesSectionPreview
        sectionDef={sectionDef}
        content={content}
        locale={locale}
      />
    );
  }
  if (group === "site" && content) {
    return (
      <SiteSectionPreview
        sectionDef={sectionDef}
        content={content}
        locale={locale}
      />
    );
  }

  return (
    <div className="px-4 py-10 text-center text-[13px] text-ink/40">
      {locale === "ko"
        ? "이 섹션의 미리보기가 없습니다."
        : "No preview for this section."}
    </div>
  );
}
