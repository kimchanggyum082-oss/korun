import {
  homeContent,
  type HomeContent,
  type HomeProductCard,
} from "@/lib/data";
import type { Locale } from "@/lib/i18n/locales";
import type { ContentRows } from "../page-content";
import { pickJsonOverride, pickText } from "../registry-resolve";
import { HOME_EN } from "./home-en";

type SlideRow = { src?: string };
type ProductRow = {
  title?: string;
  href?: string;
  src?: string;
  hoverSrc?: string;
};
type PillRow = { label?: string; href?: string };

const BASE_PRODUCTS = homeContent.products.items;
const BASE_PILLS = homeContent.values.pc;

function defaultSlideRows(): SlideRow[] {
  return homeContent.hero.slides.map((slide) => ({ src: slide.src }));
}

function defaultProductRows(locale: Locale): ProductRow[] {
  return BASE_PRODUCTS.map((item, i) => ({
    title:
      locale === "en"
        ? (HOME_EN[`home.products.item.${i}.title`] ?? item.title)
        : item.title,
    href: item.href,
    src: item.src,
    hoverSrc: item.hoverSrc,
  }));
}

function defaultPillRows(locale: Locale): PillRow[] {
  return BASE_PILLS.map((pill, i) => ({
    label:
      locale === "en"
        ? (HOME_EN[`home.values.pill.${i}.label`] ?? pill.label)
        : pill.label,
    href: pill.href,
  }));
}

function resolveProducts(
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): HomeProductCard[] {
  const defaults = defaultProductRows(locale);
  collect?.set("home.products.items", JSON.stringify(defaults));
  const override = pickJsonOverride<ProductRow>(
    rows,
    "home.products.items",
    locale,
  );
  if (!override) return BASE_PRODUCTS.map((item) => ({ ...item }));

  return override
    .map((row, i) => {
      const base = BASE_PRODUCTS[i];
      const title = (row.title ?? "").trim() || (base?.title ?? "");
      const href = (row.href ?? "").trim() || (base?.href ?? "");
      const src = (row.src ?? "").trim() || (base?.src ?? "");
      const customImage = src.length > 0 && src !== base?.src;
      return {
        title,
        href,
        src,
        hoverSrc: (row.hoverSrc ?? "").trim() || (base?.hoverSrc ?? ""),
        // One admin image drives both viewports; untouched rows keep the
        // bundled per-viewport (mobile) variant.
        mobileSrc: customImage ? src : (base?.mobileSrc ?? src),
      };
    })
    .filter((item) => item.title.length > 0 && item.src.length > 0);
}

function resolvePills(
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): HomeContent["values"] {
  const base = homeContent.values;
  const defaults = defaultPillRows(locale);
  collect?.set("home.values.pills", JSON.stringify(defaults));
  const override = pickJsonOverride<PillRow>(rows, "home.values.pills", locale);
  const source = override ?? defaults;

  const bgOverride = pickText(rows, "home.values.bg", locale, "");
  collect?.set("home.values.bg", bgOverride || base.bg);

  return {
    ...base,
    bg: bgOverride || base.bg,
    bgMobile: bgOverride || base.bgMobile,
    pc: source.map((row, i) => {
      const style = BASE_PILLS[i % BASE_PILLS.length];
      return {
        label: (row.label ?? "").trim() || (defaults[i]?.label ?? ""),
        color: style.color,
        padding: style.padding,
        href: (row.href ?? "").trim() || (defaults[i]?.href ?? "#"),
      };
    }),
    mobile: source.map((row, i) => {
      const style = base.mobile[i % base.mobile.length];
      return {
        label: (row.label ?? "").trim() || (defaults[i]?.label ?? ""),
        color: style.color,
        padding: style.padding,
      };
    }),
  };
}

/**
 * Pure resolver — used by both the public home page (server) and the admin
 * preview (client). Overrides win, then the EN default (when locale is en),
 * then the data-file default.
 *
 * Image slots store a single override value: when the admin replaces an image
 * it is used for every viewport (desktop + mobile); otherwise the data-file
 * defaults keep their per-viewport variants.
 */
export function resolveHomeFromRows(
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): HomeContent {
  const base = homeContent;
  const t = (key: string, fallback: string) => {
    const value = pickText(
      rows,
      key,
      locale,
      locale === "en" ? (HOME_EN[key] ?? fallback) : fallback,
    );
    collect?.set(key, value);
    return value;
  };
  const image = (key: string, fallback: string) => {
    const override = pickText(rows, key, locale, "");
    collect?.set(key, override || fallback);
    return override || fallback;
  };

  const slideOverride = pickJsonOverride<SlideRow>(
    rows,
    "home.hero.slides",
    locale,
  );
  const defaultSlides = defaultSlideRows();
  collect?.set("home.hero.slides", JSON.stringify(defaultSlides));
  const hero = slideOverride
    ? (() => {
        const slides = slideOverride
          .filter((row) => (row.src ?? "").trim())
          .map((row, i) => ({
            src: (row.src ?? "").trim(),
            alt: base.hero.slides[i]?.alt ?? "",
          }));
        return { slides, slidesMobile: slides };
      })()
    : { slides: base.hero.slides, slidesMobile: base.hero.slidesMobile };

  const titleOverride = pickText(rows, "home.products.title", locale, "");
  const bodyOverride = pickText(rows, "home.products.body", locale, "");
  const titleDefault =
    locale === "en"
      ? (HOME_EN["home.products.title"] ?? base.products.pcTitle)
      : base.products.pcTitle;
  const bodyDefault =
    locale === "en"
      ? (HOME_EN["home.products.body"] ?? base.products.pcBody)
      : base.products.pcBody;
  collect?.set("home.products.title", titleOverride || titleDefault);
  collect?.set("home.products.body", bodyOverride || bodyDefault);

  const ctaOverride = pickText(rows, "home.cta.text", locale, "");
  const ctaTextDefault = base.cta.lines.join("\n");
  collect?.set("home.cta.text", ctaOverride || ctaTextDefault);

  return {
    hero,
    products: {
      ...base.products,
      bg: image("home.products.bg", base.products.bg),
      penLarge: base.products.penLarge,
      penMobile: base.products.penMobile,
      pcTitle: titleOverride || titleDefault,
      pcBody: bodyOverride || bodyDefault,
      mobileTitleLines: titleOverride
        ? titleOverride.split(/\r?\n/)
        : locale === "en" && HOME_EN["home.products.title"]
          ? HOME_EN["home.products.title"].split(/\r?\n/)
          : base.products.mobileTitleLines,
      mobileBodyLines: bodyOverride
        ? bodyOverride.split(/\r?\n/)
        : locale === "en" && HOME_EN["home.products.body"]
          ? HOME_EN["home.products.body"].split(/\r?\n/)
          : base.products.mobileBodyLines,
      items: resolveProducts(rows, locale, collect),
    },
    values: resolvePills(rows, locale, collect),
    cta: {
      photo: image("home.cta.photo", base.cta.photo),
      photoMobile: image("home.cta.photo", base.cta.photoMobile),
      penMobile: base.cta.penMobile,
      arrowDark: base.cta.arrowDark,
      lines: ctaOverride
        ? ctaOverride.split(/\r?\n/)
        : locale === "en" && HOME_EN["home.cta.text"]
          ? HOME_EN["home.cta.text"].split(/\r?\n/)
          : [...base.cta.lines],
    },
    lists: {
      penSmall: base.lists.penSmall,
      penMobile: base.lists.penMobile,
      newsHeadingEn: t("home.lists.newsHeadingEn", base.lists.newsHeadingEn),
      newsHeadingKo: t("home.lists.newsHeadingKo", base.lists.newsHeadingKo),
      downloadsHeadingEn: t(
        "home.lists.downloadsHeadingEn",
        base.lists.downloadsHeadingEn,
      ),
      downloadsHeadingKo: t(
        "home.lists.downloadsHeadingKo",
        base.lists.downloadsHeadingKo,
      ),
      // Derived automatically — the board author name, never edited per page.
      writer:
        locale === "en"
          ? (HOME_EN["home.lists.writer"] ?? base.lists.writer)
          : base.lists.writer,
    },
    location: {
      penSmall: base.location.penSmall,
      // Derived defaults (iframe title — not editable).
      mapTitle:
        locale === "en"
          ? (HOME_EN["home.location.mapTitle"] ?? base.location.mapTitle)
          : base.location.mapTitle,
      headingEn: t("home.location.headingEn", base.location.headingEn),
      headingKo: t("home.location.headingKo", base.location.headingKo),
    },
  };
}
