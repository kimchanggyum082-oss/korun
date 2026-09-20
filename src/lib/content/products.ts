import { productPages, type ProductPageData } from "@/lib/data";

export function getProductPages(): Record<string, ProductPageData> {
  return productPages;
}

export function getProductPage(id: string): ProductPageData | undefined {
  return productPages[id];
}
