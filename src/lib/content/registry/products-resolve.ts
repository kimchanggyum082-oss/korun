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

type SpecRowInput = { label?: string; values?: string };

function resolveSpecRow(
  row: SpecRowInput,
  baseRow: SpecRow | undefined,
): SpecRow {
  const label = (row.label ?? "").trim() || (baseRow?.label ?? "");
  const values = (row.values ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  return compact({
    label,
    values,
    // Layout widths cannot be expressed as content; rows that still exist keep
    // the data-file widths at the same index.
    labelWidth: baseRow?.labelWidth,
    valueWidth: baseRow?.valueWidth,
  });
}

/** Default table rows for the admin editor — EN uses the PRODUCTS_EN overlay. */
function defaultSpecRows(
  base: string,
  baseRows: readonly SpecRow[],
  locale: Locale,
): SpecRowInput[] {
  return baseRows.map((row, ri) => ({
    label:
      locale === "en"
        ? (PRODUCTS_EN[`${base}.spec.row.${ri}.label`] ?? row.label)
        : row.label,
    values:
      locale === "en"
        ? (PRODUCTS_EN[`${base}.spec.row.${ri}.values`] ??
          row.values.join("\n"))
        : row.values.join("\n"),
  }));
}

function resolveSpecRows(
  base: string,
  baseRows: readonly SpecRow[],
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): SpecRow[] {
  const key = `${base}.spec.rows`;
  const defaults = defaultSpecRows(base, baseRows, locale);
  collect?.set(key, JSON.stringify(defaults));
  const override = pickJsonOverride<SpecRowInput>(rows, key, locale);
  return (override ?? defaults)
    .map((row, ri) => resolveSpecRow(row, baseRows[ri]))
    .filter((row) => row.label.length > 0 || row.values.length > 0);
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
          // Not rendered by the template and not editable — kept as scraped data.
          model: block.spec.model,
          rows: resolveSpecRows(base, block.spec.rows, rows, locale, collect),
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
