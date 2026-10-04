/**
 * Page-content registry — the single source of truth for admin-editable keys.
 * Mirrors MCell's `content-registry.ts`, adapted to KORUN's pages.
 *
 * kind:
 *  - text      one line
 *  - textarea  multi-line (arrays are stored one item per line)
 *  - image     single image (URL/upload), shared by every locale and viewport
 *  - imageList JSON array of image rows (`fields`)
 *  - url       language-common raw link
 *  - link      language-common internal page link (admin picks from a catalog)
 *  - list      JSON array of flat rows described by `fields` (generic list kind)
 */

export type ContentKind =
  "text" | "textarea" | "image" | "imageList" | "url" | "link" | "list";

export type ContentGroup = "home" | "about" | "products" | "cases" | "site";

export interface JsonFieldDef {
  key: string;
  kind: "text" | "textarea" | "image" | "url" | "link";
  label: { ko: string; en: string };
}

export interface ContentDef {
  key: string;
  group: ContentGroup;
  /** Section heading shown in the admin editor (bilingual). */
  section: { ko: string; en: string };
  label: { ko: string; en: string };
  kind: ContentKind;
  /** Row schema for `kind: "list"` and `kind: "imageList"`. */
  fields?: JsonFieldDef[];
  /** Upper bound for `list`/`imageList` rows (add button is hidden at the cap). */
  maxItems?: number;
  /** Paths to revalidate after saving. */
  revalidate: string[];
}

export function defineContent(
  key: string,
  group: ContentGroup,
  section: { ko: string; en: string },
  labelKo: string,
  labelEn: string,
  kind: ContentKind,
  revalidate: string[],
  fields?: JsonFieldDef[],
  maxItems?: number,
): ContentDef {
  return {
    key,
    group,
    section,
    label: { ko: labelKo, en: labelEn },
    kind,
    fields,
    maxItems,
    revalidate,
  };
}

export const MAX_LENGTH: Record<ContentKind, number> = {
  text: 500,
  textarea: 20000,
  image: 2000,
  imageList: 40000,
  url: 2000,
  link: 2000,
  list: 40000,
};

/** image/url values: relative /assets path, blob URL, or http(s) URL. */
export function isAllowedMediaUrl(value: string): boolean {
  if (/[\s<>"]/.test(value)) return false;
  return (
    value.startsWith("/") ||
    value.startsWith("https://") ||
    value.startsWith("http://")
  );
}

/** Fields that are language-common: one value is written to both locales. */
export function isSharedKind(kind: ContentKind): boolean {
  return (
    kind === "url" ||
    kind === "link" ||
    kind === "image" ||
    kind === "imageList"
  );
}

/** Common typo fix: "assets/…" → "/assets/…". */
export function normalizeMediaUrl(value: string): string {
  const trimmed = value.trim();
  if (/^assets\//i.test(trimmed)) return `/${trimmed}`;
  return trimmed;
}
