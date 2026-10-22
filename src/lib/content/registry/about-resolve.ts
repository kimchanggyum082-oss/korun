import {
  aboutContent,
  assets,
  type AboutContentMap,
  type AboutLocationItem,
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

/* ── Company locations ─────────────────────────────────────────────────── */

type LocationContactRow = { label?: unknown; value?: unknown };
type LocationImageRow = {
  src?: string;
  fullSrc?: string;
  alt?: string;
  title?: unknown;
  description?: unknown;
};
type LocationRow = {
  name?: unknown;
  headingEn?: unknown;
  heading?: unknown;
  description?: unknown;
  contacts?: unknown;
  mapEmbed?: unknown;
  mapTitle?: unknown;
  images?: unknown;
};

/**
 * Admin list cells can hold a nested list either as a native array (bundled
 * defaults) or as a JSON string (saved from the list editor). Normalize both.
 */
function asRows<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (typeof value !== "string" || value.trim().length === 0) return [];
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function localizedText(value: unknown, locale: Locale): string {
  const resolved = resolveLeaf(locale, value);
  return typeof resolved === "string" ? resolved.trim() : "";
}

function defaultLocationRows(locale: Locale): LocationRow[] {
  return aboutContent["company-location"].locations.map((location) => ({
    name: resolveLeaf(locale, location.name),
    headingEn: location.headingEn,
    heading: resolveLeaf(locale, location.heading),
    description: resolveLeaf(locale, location.description),
    contacts: location.contacts.map((contact) => ({
      label: resolveLeaf(locale, contact.label),
      value: resolveLeaf(locale, contact.value),
    })),
    mapEmbed: location.mapEmbed,
    mapTitle: resolveLeaf(locale, location.mapTitle),
    images: location.images.map((image) => ({
      src: image.src,
      fullSrc: image.fullSrc,
      alt: image.alt,
      title: resolveLeaf(locale, image.title),
      description: resolveLeaf(locale, image.description),
    })),
  }));
}

/**
 * Admin defaults must keep `{ ko, en }` leaves intact: the location list is a
 * shared, language-common payload and the editor previews both languages from
 * the same JSON. Resolving to one locale here would drop the other language.
 */
function sourceLocationRows(): LocationRow[] {
  return aboutContent["company-location"].locations.map((location) => ({
    name: location.name,
    headingEn: location.headingEn,
    heading: location.heading,
    description: location.description,
    contacts: location.contacts.map((contact) => ({
      label: contact.label,
      value: contact.value,
    })),
    mapEmbed: location.mapEmbed,
    mapTitle: location.mapTitle,
    images: location.images.map((image) => ({
      src: image.src,
      fullSrc: image.fullSrc,
      alt: image.alt,
      title: image.title,
      description: image.description,
    })),
  }));
}

function resolveLocationImages(value: unknown, locale: Locale): GalleryImage[] {
  return asRows<LocationImageRow>(value)
    .map((image) => {
      const src = (image.src ?? "").trim();
      const title = localizedText(image.title, locale);
      return {
        src,
        fullSrc: (image.fullSrc ?? "").trim() || src,
        alt: (image.alt ?? "").trim() || title,
        title,
        description: localizedText(image.description, locale),
      };
    })
    .filter((image) => image.src.length > 0);
}

function resolveLocations(
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): AboutLocationItem[] {
  const defaults = defaultLocationRows(locale);
  collect?.set(
    "about.location.locations",
    JSON.stringify(sourceLocationRows()),
  );
  const override = pickJsonOverride<LocationRow>(
    rows,
    "about.location.locations",
    locale,
  );

  return (override ?? defaults)
    .map((row) => {
      const contacts = asRows<LocationContactRow>(row.contacts)
        .map((contact) => ({
          label: localizedText(contact.label, locale),
          value: localizedText(contact.value, locale),
        }))
        .filter(
          (contact) => contact.label.length > 0 || contact.value.length > 0,
        );

      return {
        name: localizedText(row.name, locale),
        headingEn: localizedText(row.headingEn, locale),
        heading: localizedText(row.heading, locale),
        description: localizedText(row.description, locale),
        contacts,
        mapEmbed: localizedText(row.mapEmbed, locale),
        mapTitle: localizedText(row.mapTitle, locale),
        images: resolveLocationImages(row.images, locale),
      };
    })
    .filter(
      (location) =>
        location.name.length > 0 ||
        location.headingEn.length > 0 ||
        location.heading.length > 0 ||
        location.description.length > 0 ||
        location.contacts.length > 0 ||
        location.images.length > 0 ||
        location.mapEmbed.length > 0,
    );
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

  const locations = resolveLocations(rows, locale, collect);

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
      locations,
    },
    "job-posting": {
      title: t("about.job-posting.title", base["job-posting"].title),
      detailTaglineMobile: taglineOverride || taglineMobileDefault,
      detailTaglineDesktop: taglineOverride || taglineDesktopDefault,
    },
  };

  return { assets: resolvedAssets, content };
}
