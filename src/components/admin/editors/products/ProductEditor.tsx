"use client";

import EntityEditor from "@/components/admin/EntityEditor";
import {
  PRODUCT_ENTITY_KEYS,
  resolveLocalizedText,
  type EntitySource,
  type ProductId,
  type ProductPageEntity,
} from "@/lib/admin/entities";
import ProductForms from "./ProductForms";
import ProductPreviews from "./ProductPreviews";

export default function ProductEditor({
  productId,
  initial,
  source,
  storeReady,
  uploadConfigured,
}: {
  productId: ProductId;
  initial: ProductPageEntity;
  source: EntitySource;
  storeReady: boolean;
  uploadConfigured: boolean;
}) {
  return (
    <EntityEditor<ProductPageEntity>
      entityKey={PRODUCT_ENTITY_KEYS[productId]}
      label="Products"
      title={`${productId} · ${resolveLocalizedText(initial.navTitle)}`}
      description="제품 페이지의 제목, 소개, 태그, 갤러리, 적용 사례, 사양 표를 관리합니다."
      source={source}
      initial={initial}
      storeReady={storeReady}
      previewLabel="제품 페이지"
      form={(draft, update) => (
        <ProductForms
          draft={draft}
          update={update}
          uploadConfigured={uploadConfigured}
        />
      )}
      preview={(draft) => <ProductPreviews draft={draft} />}
    />
  );
}
