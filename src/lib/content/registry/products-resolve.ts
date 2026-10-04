import {
  productPages,
  type ProductApplication,
  type ProductBlock,
  type ProductPageData,
  type SpecRow,
} from "@/lib/data";
import type { Locale } from "@/lib/i18n/locales";
import type { ContentRows } from "../page-content";
import { pickJsonOverride, pickLines, pickText } from "../registry-resolve";
import { PRODUCTS_EN } from "./products-en";

type TextResolver = (key: string, fallback: string) => string;
type LineResolver = (key: string, fallback: readonly string[]) => string[];
type GalleryRow = { src?: string; thumb?: string };

/** Drop keys whose value is `undefined` so shapes match the data-file defaults. */
function compact<T extends object>(value: T): T {
  for (const key of Object.keys(value) as (keyof T)[]) {
    if (value[key] === undefined) delete value[key];
  }
  return value;
}

function resolveApplication(
  base: string,
  ai: number,
  application: ProductApplication,
  t: TextResolver,
): ProductApplication {
  const key = `${base}.application.${ai}`;
  return {
    title: t(`${key}.title`, application.title),
    images: application.images.map((src, ii) => t(`${key}.image.${ii}`, src)),
  };
}

function resolveSpecRow(
  base: string,
  ri: number,
  row: SpecRow,
  t: TextResolver,
  l: LineResolver,
): SpecRow {
  const key = `${base}.spec.row.${ri}`;
  return compact({
    label: t(`${key}.label`, row.label),
    values: l(`${key}.values`, row.values),
    // Layout widths cannot be expressed as content; keep the data-file values.
    labelWidth: row.labelWidth,
    valueWidth: row.valueWidth,
  });
}

function resolveBlock(
  id: string,
  bi: number,
  block: ProductBlock,
  rows: ContentRows,
  locale: Locale,
  t: TextResolver,
  l: LineResolver,
  collect?: Map<string, string>,
): ProductBlock {
  const base = `products.${id}.block.${bi}`;

  // The gallery is a dynamic image list (add/remove/reorder); each row carries
  // an image plus its grid thumbnail.
  const galleryKey = `${base}.gallery`;
  collect?.set(
    galleryKey,
    JSON.stringify(
      block.gallery.map((src, i) => ({
        src,
        thumb: block.galleryThumbs?.[i] ?? "",
      })),
    ),
  );
  const galleryOverride = pickJsonOverride<GalleryRow>(
    rows,
    galleryKey,
    locale,
  );
  let gallery = block.gallery;
  let galleryThumbs = block.galleryThumbs;
  if (galleryOverride) {
    const cleaned = galleryOverride
      .map((row) => ({
        src: (row.src ?? "").trim(),
        thumb: (row.thumb ?? "").trim(),
      }))
      .filter((row) => row.src.length > 0);
    gallery = cleaned.map((row) => row.src);
    galleryThumbs = cleaned.some((row) => row.thumb)
      ? cleaned.map((row) => row.thumb || row.src)
      : undefined;
  }

  return compact({
    eyebrow: t(`${base}.eyebrow`, block.eyebrow ?? "") || undefined,
    title: t(`${base}.title`, block.title ?? "") || undefined,
    introTitle: t(`${base}.introTitle`, block.introTitle),
    introImage: t(`${base}.introImage`, block.introImage ?? "") || undefined,
    introText: t(`${base}.introText`, block.introText ?? "") || undefined,
    introBullets: block.introBullets
      ? l(`${base}.introBullets`, block.introBullets)
      : undefined,
    // Layout/behaviour flags are not editable content; keep the data-file values.
    introTrailingBreak: block.introTrailingBreak,
    tags: l(`${base}.tags`, block.tags),
    showInquiry: block.showInquiry,
    galleryLabel: t(`${base}.galleryLabel`, block.galleryLabel),
    gallery,
    galleryThumbs,
    galleryColumns: block.galleryColumns,
    applications: block.applications
      ? block.applications.map((application, ai) =>
          resolveApplication(base, ai, application, t),
        )
      : undefined,
    spec: block.spec
      ? {
          model: t(`${base}.spec.model`, block.spec.model),
          rows: block.spec.rows.map((row, ri) =>
            resolveSpecRow(base, ri, row, t, l),
          ),
        }
      : undefined,
  });
}

function resolveProduct(
  id: string,
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): ProductPageData {
  const base = productPages[id];

  const t: TextResolver = (key, fallback) => {
    const value = pickText(
      rows,
      key,
      locale,
      locale === "en" ? (PRODUCTS_EN[key] ?? fallback) : fallback,
    );
    collect?.set(key, value);
    return value;
  };

  const l: LineResolver = (key, fallback) => {
    const enDefault = PRODUCTS_EN[key];
    const value = pickLines(
      rows,
      key,
      locale,
      locale === "en" && enDefault ? enDefault.split(/\r?\n/) : fallback,
    );
    collect?.set(key, value.join("\n"));
    return value;
  };

  return {
    id: base.id,
    navTitle: t(`products.${id}.navTitle`, base.navTitle),
    description: t(`products.${id}.description`, base.description),
    blocks: base.blocks.map((block, bi) =>
      resolveBlock(id, bi, block, rows, locale, t, l, collect),
    ),
  };
}

/**
 * Pure resolver for every product page — used by the public `getProductPages`
 * (server) and the admin preview (client). Overrides win, then the EN default
 * (when locale is en), then the data-file default.
 */
export function resolveProductsFromRows(
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): Record<string, ProductPageData> {
  const out: Record<string, ProductPageData> = {};
  for (const id of Object.keys(productPages)) {
    out[id] = resolveProduct(id, rows, locale, collect);
  }
  return out;
}

/**
 * Single product variant of {@link resolveProductsFromRows}; returns `undefined`
 * for unknown ids (matching the data-file record).
 */
export function resolveProductFromRows(
  id: string,
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): ProductPageData | undefined {
  if (!productPages[id]) return undefined;
  return resolveProduct(id, rows, locale, collect);
}
