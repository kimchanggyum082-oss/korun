"use client";

import ProductPreviews from "@/components/admin/editors/products/ProductPreviews";
import type { ContentDef } from "@/lib/content/registry-types";
import { resolveProductFromRows } from "@/lib/content/registry/products-resolve";
import type { ProductPageData } from "@/lib/data";
import type { Locale } from "@/lib/i18n/locales";

function isProductPage(value: unknown): value is ProductPageData {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<ProductPageData>;
  return (
    typeof candidate.navTitle === "string" && Array.isArray(candidate.blocks)
  );
}

/** Extract the product id from a `products.<id>.…` content key. */
function productIdOfKey(key: string): string | null {
  const match = /^products\.([^.]+)\./.exec(key);
  return match ? match[1] : null;
}

/**
 * Live WYSIWYG preview of a products section, reusing the admin product
 * previews (MCell's `SectionPreview` equivalent). `content` may be the record
 * returned by `resolveProductsFromRows`; when absent, data-file defaults are
 * rendered.
 */
export default function ProductsSectionPreview({
  sectionDef,
  content,
  locale,
}: {
  sectionDef: ContentDef;
  content: unknown;
  locale: Locale;
}) {
  const id = productIdOfKey(sectionDef.key);
  const fromContent =
    id && typeof content === "object" && content !== null
      ? (content as Record<string, unknown>)[id]
      : undefined;
  const page = isProductPage(fromContent)
    ? fromContent
    : id
      ? resolveProductFromRows(id, {}, locale)
      : undefined;

  if (!page) {
    return (
      <div className="px-4 py-10 text-center text-[13px] text-ink/40">
        {locale === "ko"
          ? "이 섹션의 미리보기가 없습니다."
          : "No preview for this section."}
      </div>
    );
  }

  return <ProductPreviews draft={page} locale={locale} />;
}
