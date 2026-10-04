import { type ProductPageData } from "@/lib/data";
import { type Locale } from "@/lib/i18n/locales";
import { resolveActiveLocale } from "./locale";
import { getContentRows } from "./page-content";
import { keysForGroup } from "./registry";
import {
  resolveProductFromRows,
  resolveProductsFromRows,
} from "./registry/products-resolve";

export async function getProductPages(
  locale?: Locale,
): Promise<Record<string, ProductPageData>> {
  const activeLocale = await resolveActiveLocale(locale);
  const rows = await getContentRows(keysForGroup("products"));
  return resolveProductsFromRows(rows, activeLocale);
}

export async function getProductPage(
  id: string,
  locale?: Locale,
): Promise<ProductPageData | undefined> {
  const activeLocale = await resolveActiveLocale(locale);
  const rows = await getContentRows(keysForGroup("products"));
  return resolveProductFromRows(id, rows, activeLocale);
}
