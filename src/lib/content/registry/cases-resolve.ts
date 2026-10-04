import { casePages, type CasePageData, type GalleryImage } from "@/lib/data";
import type { Locale } from "@/lib/i18n/locales";
import type { ContentRows } from "../page-content";
import { pickJsonOverride, pickText } from "../registry-resolve";
import { CASES_EN } from "./cases-en";

type TextResolver = (key: string, fallback: string) => string;
type ImageRow = { src?: string; fullSrc?: string };

function resolveCase(
  slug: string,
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): CasePageData {
  const base = casePages[slug];

  const t: TextResolver = (key, fallback) => {
    const value = pickText(
      rows,
      key,
      locale,
      locale === "en" ? (CASES_EN[key] ?? fallback) : fallback,
    );
    collect?.set(key, value);
    return value;
  };

  // A single hero image drives both viewports; the data-file defaults keep
  // their per-viewport variants until the admin replaces the image.
  const heroOverride = pickText(rows, `cases.${slug}.heroImage`, locale, "");
  collect?.set(`cases.${slug}.heroImage`, heroOverride || base.heroImagePc);

  const resolved: CasePageData = {
    subtitle: t(`cases.${slug}.subtitle`, base.subtitle),
    title: t(`cases.${slug}.title`, base.title),
    heroImageMobile: heroOverride || base.heroImageMobile,
    heroImagePc: heroOverride || base.heroImagePc,
    // Layout dimensions cannot be expressed as content; keep the data-file values.
    heroWidth: base.heroWidth,
    heroHeight: base.heroHeight,
  };

  if (base.section) {
    const section = base.section;
    const imageKey = `cases.${slug}.section.images`;
    collect?.set(
      imageKey,
      JSON.stringify(section.images.map((image) => ({ src: image.src }))),
    );
    const imageOverride = pickJsonOverride<ImageRow>(rows, imageKey, locale);
    resolved.section = {
      heading: t(`cases.${slug}.section.heading`, section.heading),
      text: t(`cases.${slug}.section.text`, section.text),
      images: imageOverride
        ? imageOverride
            .map((row, ii) => ({
              src: (row.src ?? "").trim(),
              // Layout dimensions stay with the data-file defaults.
              width: section.images[ii]?.width ?? 0,
              height: section.images[ii]?.height ?? 0,
            }))
            .filter((image) => image.src.length > 0)
        : section.images.map((image) => ({ ...image })),
    };
  }

  if (base.galleryImages) {
    const galleryKey = `cases.${slug}.gallery`;
    collect?.set(
      galleryKey,
      JSON.stringify(
        base.galleryImages.map((image) => ({
          src: image.src,
          fullSrc: image.fullSrc,
        })),
      ),
    );
    const galleryOverride = pickJsonOverride<ImageRow>(
      rows,
      galleryKey,
      locale,
    );
    resolved.galleryImages = galleryOverride
      ? galleryOverride
          .map((row, i): GalleryImage => {
            const src = (row.src ?? "").trim();
            return {
              src,
              fullSrc: (row.fullSrc ?? "").trim() || src,
              alt: base.galleryImages?.[i]?.alt ?? "",
            };
          })
          .filter((image) => image.src.length > 0)
      : base.galleryImages.map((image) => ({ ...image }));
  }

  return resolved;
}

/**
 * Pure resolver for every case page — used by the public `getCasePages` (server)
 * and the admin preview (client). Overrides win, then the EN default (when
 * locale is en), then the data-file default.
 */
export function resolveCasesFromRows(
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): Record<string, CasePageData> {
  const out: Record<string, CasePageData> = {};
  for (const slug of Object.keys(casePages)) {
    out[slug] = resolveCase(slug, rows, locale, collect);
  }
  return out;
}
