import {
  aboutContent,
  assets,
  type AboutContentMap,
  type GalleryImage,
} from "@/lib/data";
import type { Locale } from "@/lib/i18n/locales";
import type { ContentRows } from "../page-content";
import { resolveLeaf, type Localized } from "../merge";
import { pickJson, pickJsonOverride, pickText } from "../registry-resolve";
import { ABOUT_EN } from "./about-en";

export interface AboutResolved {
  /** Global asset map with about media slots overridden. */
  assets: typeof assets;
  /** Resolved copy for every about page, keyed like `AboutContentMap`. */
  content: AboutContentMap;
}

type ParagraphRow = { text: string };
type GalleryRow = {
  src?: string;
  fullSrc?: string;
  title?: Localized<string>;
  description?: Localized<string>;
};

/** Resolve a stored row caption to a plain string for the active locale. */
function galleryText(value: unknown, locale: Locale): string {
  const resolved = resolveLeaf(locale, value);
  return typeof resolved === "string" ? resolved.trim() : "";
}

function defaultParagraphRows(): ParagraphRow[] {
  return aboutContent.greetings.paragraphs.map((text) => ({ text }));
}

function defaultGalleryRows(images: readonly GalleryImage[]): GalleryRow[] {
  return images.map((image) => ({
    src: image.src,
    fullSrc: image.fullSrc,
    title: image.title,
    description: image.description,
  }));
}

function resolveGallery(
  rows: ContentRows,
  locale: Locale,
  key: string,
  images: readonly GalleryImage[],
  collect?: Map<string, string>,
): GalleryImage[] {
  const defaults = defaultGalleryRows(images);
  collect?.set(key, JSON.stringify(defaults));
  const override = pickJsonOverride<GalleryRow>(rows, key, locale);
  if (!override) return images.map((image) => ({ ...image }));
  return override
    .map((row, i) => ({
      src: (row.src ?? "").trim(),
      fullSrc: (row.fullSrc ?? "").trim() || (row.src ?? "").trim(),
      alt: images[i]?.alt ?? "",
      title: galleryText(row.title, locale),
      description: galleryText(row.description, locale),
    }))
    .filter((image) => image.src.length > 0);
}

/**
 * Pure resolver — used by both the public about pages (server) and the admin
 * preview (client). Overrides win, then the EN default (when locale is en),
 * then the data-file default.
 */
export function resolveAboutFromRows(
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): AboutResolved {
  const base = aboutContent;

  const t = (key: string, fallback: string) => {
    const value = pickText(
      rows,
      key,
      locale,
      locale === "en" ? (ABOUT_EN[key] ?? fallback) : fallback,
    );
    collect?.set(key, value);
    return value;
  };

  const list = <T extends Record<string, string>>(
    key: string,
    fallback: readonly T[],
  ): T[] => {
    const value = pickJson<T>(rows, key, locale, fallback);
    collect?.set(key, JSON.stringify(value));
    return value;
  };

  // ── Greetings ──
  const paragraphRows = list<ParagraphRow>(
    "about.greetings.paragraphs",
    defaultParagraphRows(),
  );

  const galleryImages = resolveGallery(
    rows,
    locale,
    "about.greetings.gallery",
    assets.galleryImages,
    collect,
  );

  // ── Patent & Credentials ──
  const patentImages = resolveGallery(
    rows,
    locale,
    "about.patent.images",
    assets.patentImages,
    collect,
  );

  const locationImages = resolveGallery(
    rows,
    locale,
    "about.location.images",
    base["company-location"].images,
    collect,
  );

  const greetingOverride = pickText(rows, "about.greetings.image", locale, "");
  collect?.set(
    "about.greetings.image",
    greetingOverride || assets.greetingImage,
  );

  const resolvedAssets = {
    ...assets,
    greetingImage: greetingOverride || assets.greetingImage,
    greetingImageMobile: greetingOverride || assets.greetingImageMobile,
    galleryImages,
    patentImages,
  } as unknown as typeof assets;

  // ── Job Posting ──
  const taglineKey = "about.job-posting.detailTagline";
  const taglineOverride = pickText(rows, taglineKey, locale, "");
  const taglineEnDefault = locale === "en" ? ABOUT_EN[taglineKey] : undefined;
  const taglineDesktopDefault =
    taglineEnDefault ?? base["job-posting"].detailTaglineDesktop;
  const taglineMobileDefault =
    taglineEnDefault ?? base["job-posting"].detailTaglineMobile;
  collect?.set(taglineKey, taglineOverride || taglineDesktopDefault);

  const content: AboutContentMap = {
    greetings: {
      banner: {
        line1: t("about.greetings.banner.line1", base.greetings.banner.line1),
        line2: t("about.greetings.banner.line2", base.greetings.banner.line2),
        title: t("about.greetings.banner.title", base.greetings.banner.title),
      },
      heading: t("about.greetings.heading", base.greetings.heading),
      intro: t("about.greetings.intro", base.greetings.intro),
      paragraphs: paragraphRows.map((row) => row.text ?? ""),
      signature: t("about.greetings.signature", base.greetings.signature),
    },
    "patent-credentials": {
      title: t("about.patent.title", base["patent-credentials"].title),
    },
    "company-location": {
      title: t("about.location.title", base["company-location"].title),
      headingEn: t(
        "about.location.headingEn",
        base["company-location"].headingEn,
      ),
      headingKo: t(
        "about.location.headingKo",
        base["company-location"].headingKo,
      ),
      name: t("about.location.name", base["company-location"].name),
      description: t(
        "about.location.description",
        base["company-location"].description,
      ),
      images: locationImages,
      labels: {
        tel: t(
          "about.location.labels.tel",
          base["company-location"].labels.tel,
        ),
        email: t(
          "about.location.labels.email",
          base["company-location"].labels.email,
        ),
        address: t(
          "about.location.labels.address",
          base["company-location"].labels.address,
        ),
      },
      // Derived default (iframe title — not editable).
      mapTitle:
        locale === "en"
          ? (ABOUT_EN["about.location.mapTitle"] ??
            base["company-location"].mapTitle)
          : base["company-location"].mapTitle,
    },
    "job-posting": {
      title: t("about.job-posting.title", base["job-posting"].title),
      detailTaglineMobile: taglineOverride || taglineMobileDefault,
      detailTaglineDesktop: taglineOverride || taglineDesktopDefault,
    },
  };

  return { assets: resolvedAssets, content };
}
