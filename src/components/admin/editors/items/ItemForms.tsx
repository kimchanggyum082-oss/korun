"use client";

import type { UpdateDraft } from "@/components/admin/EntityEditor";
import {
  Field,
  SectionCard,
  TextArea,
  TextInput,
  TwoColumn,
} from "@/components/admin/fields";
import ImageField from "@/components/admin/ImageField";
import type { InterestingItem } from "@/lib/data";
import BlockEditor from "../news/BlockEditor";

function NumberInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <Field label={label}>
      <TextInput
        type="number"
        min={0}
        value={value}
        onChange={(event) => {
          const parsed = Number.parseInt(event.target.value, 10);
          onChange(Number.isNaN(parsed) ? 0 : parsed);
        }}
      />
    </Field>
  );
}

function ItemFileList({
  values,
  onChange,
}: {
  values: InterestingItem["files"];
  onChange: (next: InterestingItem["files"]) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {values.map((file, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 rounded-md border border-neutral-200 p-3"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12px] font-semibold text-neutral-500">
              파일 {index + 1}
            </span>
            <button
              type="button"
              aria-label="삭제"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-neutral-200 text-[13px] leading-none text-neutral-500 transition-colors outline-none hover:border-neutral-300 hover:text-[#a51c1c] focus-visible:ring-2 focus-visible:ring-brand/30"
              onClick={() => onChange(values.filter((_, i) => i !== index))}
            >
              ✕
            </button>
          </div>
          <Field label="이름 (name)">
            <TextInput
              value={file.name}
              onChange={(event) =>
                onChange(
                  values.map((entry, i) =>
                    i === index
                      ? { ...entry, name: event.target.value }
                      : entry,
                  ),
                )
              }
            />
          </Field>
          <Field label="크기 (size)">
            <TextInput
              value={file.size}
              placeholder="예: 979KB"
              onChange={(event) =>
                onChange(
                  values.map((entry, i) =>
                    i === index
                      ? { ...entry, size: event.target.value }
                      : entry,
                  ),
                )
              }
            />
          </Field>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...values, { name: "", size: "" }])}
        className="h-8 w-fit rounded-md border border-dashed border-neutral-300 bg-white px-2.5 text-[12px] font-semibold text-neutral-600 transition-colors outline-none hover:border-brand/40 hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/30"
      >
        파일 추가
      </button>
    </div>
  );
}

export default function ItemForms({
  draft,
  update,
  uploadConfigured,
}: {
  draft: InterestingItem;
  update: UpdateDraft<InterestingItem>;
  uploadConfigured: boolean;
}) {
  const set = (patch: Partial<InterestingItem>) =>
    update((current) => ({ ...current, ...patch }));

  return (
    <>
      <SectionCard
        title="게시글 정보"
        description="목록과 상세에 노출되는 메타데이터입니다."
      >
        <TwoColumn>
          <Field label="분류 (category)">
            <TextInput
              value={draft.category}
              onChange={(event) => set({ category: event.target.value })}
            />
          </Field>
          <Field label="작성자 (author)">
            <TextInput
              value={draft.author}
              onChange={(event) => set({ author: event.target.value })}
            />
          </Field>
        </TwoColumn>
        <Field label="제목 (title)">
          <TextInput
            value={draft.title}
            onChange={(event) => set({ title: event.target.value })}
          />
        </Field>
        <TwoColumn>
          <Field label="작성일 (date)">
            <TextInput
              value={draft.date}
              placeholder="YYYY-MM-DD"
              onChange={(event) => set({ date: event.target.value })}
            />
          </Field>
          <Field label="고유 번호 (idx)">
            <TextInput value={draft.idx} readOnly disabled />
          </Field>
        </TwoColumn>
        <NumberInput
          label="조회수 (views)"
          value={draft.views}
          onChange={(next) => set({ views: next })}
        />
        <ImageField
          label="썸네일 (thumbnail)"
          value={draft.thumbnail}
          uploadConfigured={uploadConfigured}
          onChange={(next) => set({ thumbnail: next })}
        />
        <Field label="설명 (description)">
          <TextArea
            rows={3}
            value={draft.description}
            onChange={(event) => set({ description: event.target.value })}
          />
        </Field>
      </SectionCard>

      <SectionCard
        title="본문 블록"
        description="문단·이미지·버튼·구분선·줄바꿈 블록을 순서대로 구성합니다."
      >
        <BlockEditor
          blocks={draft.blocks}
          uploadConfigured={uploadConfigured}
          onChange={(next) => set({ blocks: next })}
        />
      </SectionCard>

      <SectionCard
        title="첨부 파일"
        description="이 게시판의 파일은 이름과 크기만 표시됩니다."
      >
        <ItemFileList
          values={draft.files}
          onChange={(next) => set({ files: next })}
        />
      </SectionCard>
    </>
  );
}
