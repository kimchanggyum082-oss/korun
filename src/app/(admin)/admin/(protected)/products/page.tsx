import type { Metadata } from "next";
import ProductList from "@/components/admin/editors/products/ProductList";
import { getProductPages } from "@/lib/content";

export const metadata: Metadata = {
  title: "제품 | KORUN Admin",
};

export default async function AdminProductsPage() {
  const products = await getProductPages();

  return <ProductList products={products} />;
}
