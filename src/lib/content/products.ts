import { productPages, type ProductPageData } from "@/lib/data";
import { resolveCollection, resolveEntity } from "./resolve";
import { localizeTree } from "./merge";

export async function getProductPages(
  locale = "ko",
): Promise<Record<string, ProductPageData>> {
  const value = await resolveCollection(
    "product:",
    productPages,
    "page:products",
  );
  return locale === "ko" ? value : localizeTree(locale, value);
}

export async function getProductPage(
  id: string,
  locale = "ko",
): Promise<ProductPageData | undefined> {
  const base = productPages[id];
  if (!base) return undefined;
  const value = await resolveEntity(`product:${id}`, base);
  return locale === "ko" ? value : localizeTree(locale, value);
}
