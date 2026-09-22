import { productPages, type ProductPageData } from "@/lib/data";
import { type Locale } from "@/lib/i18n/locales";
import { resolveCollection, resolveEntity } from "./resolve";
import { localizeTree } from "./merge";
import { resolveActiveLocale } from "./locale";

export async function getProductPages(
  locale?: Locale,
): Promise<Record<string, ProductPageData>> {
  const activeLocale = await resolveActiveLocale(locale);
  const value = await resolveCollection(
    "product:",
    productPages,
    "page:products",
  );
  return localizeTree(activeLocale, value);
}

export async function getProductPage(
  id: string,
  locale?: Locale,
): Promise<ProductPageData | undefined> {
  const activeLocale = await resolveActiveLocale(locale);
  const base = productPages[id];
  if (!base) return undefined;
  const value = await resolveEntity(`product:${id}`, base);
  return localizeTree(activeLocale, value);
}
