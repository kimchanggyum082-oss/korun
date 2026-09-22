"use client";

import type { UpdateDraft } from "@/components/admin/EntityEditor";
import LocalizedField from "@/components/admin/LocalizedField";
import { SectionCard } from "@/components/admin/fields";
import type {
  ProductBlockEntity,
  ProductPageEntity,
} from "@/lib/admin/entities";
import ProductBlockForm from "./ProductBlockForm";
import { AddButton, moveAt, removeAt, replaceAt, toLocalized } from "./shared";

function emptyBlock(): ProductBlockEntity {
  return {
    introTitle: "",
    tags: [],
    galleryLabel: "",
    gallery: [],
  };
}

export default function ProductForms({
  draft,
  update,
  uploadConfigured,
}: {
  draft: ProductPageEntity;
  update: UpdateDraft<ProductPageEntity>;
  uploadConfigured: boolean;
}) {
  const setBlock = (index: number, patch: Partial<ProductBlockEntity>) =>
    update((current) => ({
      ...current,
      blocks: replaceAt(current.blocks, index, {
        ...current.blocks[index],
        ...patch,
      }),
    }));

  return (
    <>
      <SectionCard
        title="페이지 정보"
        description="제품 페이지의 메뉴 이름과 검색·공유에 사용되는 설명입니다."
      >
        <LocalizedField
          label="메뉴 제목 (navTitle)"
          value={draft.navTitle}
          onChange={(next) =>
            update((current) => ({
              ...current,
              navTitle: toLocalized(next),
            }))
          }
        />
        <LocalizedField
          label="설명 (description)"
          value={draft.description}
          onChange={(next) =>
            update((current) => ({
              ...current,
              description: toLocalized(next),
            }))
          }
          multiline
          rows={3}
        />
      </SectionCard>

      {draft.blocks.map((block, index) => (
        <ProductBlockForm
          key={index}
          block={block}
          index={index}
          count={draft.blocks.length}
          uploadConfigured={uploadConfigured}
          onChange={(patch) => setBlock(index, patch)}
          onMove={(i, delta) =>
            update((current) => ({
              ...current,
              blocks: moveAt(current.blocks, i, delta),
            }))
          }
          onRemove={(i) =>
            update((current) => ({
              ...current,
              blocks: removeAt(current.blocks, i),
            }))
          }
        />
      ))}

      <div className="flex">
        <AddButton
          onClick={() =>
            update((current) => ({
              ...current,
              blocks: [...current.blocks, emptyBlock()],
            }))
          }
        >
          블록 추가
        </AddButton>
      </div>
    </>
  );
}
