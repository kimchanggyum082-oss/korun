import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductEditor from "@/components/admin/editors/products/ProductEditor";
import { PRODUCT_ENTITY_KEYS, isProductId } from "@/lib/admin/entities";
import { loadEditableEntity } from "@/lib/admin/entity-store";
import { isBlobConfigured } from "@/lib/admin/blob";
import { isDatabaseConfigured } from "@/lib/db/client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  if (!isProductId(id)) return {};
  const { value } = await loadEditableEntity(PRODUCT_ENTITY_KEYS[id]);
  return { title: `${id} ${value.navTitle} | KORUN Admin` };
}

export default async function AdminProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!isProductId(id)) notFound();

  const { value, source } = await loadEditableEntity(PRODUCT_ENTITY_KEYS[id]);

  return (
    <ProductEditor
      productId={id}
      initial={value}
      source={source}
      storeReady={isDatabaseConfigured()}
      uploadConfigured={isBlobConfigured()}
    />
  );
}
