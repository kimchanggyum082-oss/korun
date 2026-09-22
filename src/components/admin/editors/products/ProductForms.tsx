"use client";

import type { UpdateDraft } from "@/components/admin/EntityEditor";
import {
  Field,
  SectionCard,
  TextArea,
  TextInput,
} from "@/components/admin/fields";
import type { ProductBlock, ProductPageData } from "@/lib/data";
import ProductBlockForm from "./ProductBlockForm";
import { AddButton, moveAt, removeAt, replaceAt } from "./shared";

function emptyBlock(): ProductBlock {
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
  draft: ProductPageData;
  update: UpdateDraft<ProductPageData>;
  uploadConfigured: boolean;
}) {
  const setBlock = (index: number, patch: Partial<ProductBlock>) =>
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
        <Field label="메뉴 제목 (navTitle)">
          <TextInput
            value={draft.navTitle}
            onChange={(event) =>
              update((current) => ({
                ...current,
                navTitle: event.target.value,
              }))
            }
          />
        </Field>
        <Field label="설명 (description)">
          <TextArea
            rows={3}
            value={draft.description}
            onChange={(event) =>
              update((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
          />
        </Field>
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
