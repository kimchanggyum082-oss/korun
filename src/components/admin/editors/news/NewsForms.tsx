"use client";

import type { UpdateDraft } from "@/components/admin/EntityEditor";
import LocalizedField from "@/components/admin/LocalizedField";
import {
  Field,
  SectionCard,
  TextInput,
  TwoColumn,
} from "@/components/admin/fields";
import type { ServiceNewsItemEntity } from "@/lib/admin/entities";
import BlockEditor from "../items/BlockEditor";
import { toLocalized } from "../items/shared";
import FileList from "./FileList";

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

export default function NewsForms({
  draft,
  update,
  uploadConfigured,
}: {
  draft: ServiceNewsItemEntity;
  update: UpdateDraft<ServiceNewsItemEntity>;
  uploadConfigured: boolean;
}) {
  const set = (patch: Partial<ServiceNewsItemEntity>) =>
    update((current) => ({ ...current, ...patch }));

  return (
    <>
      <SectionCard
        title="게시글 정보"
        description="목록과 상세 상단에 노출되는 메타데이터입니다."
      >
        <LocalizedField
          label="분류 (category)"
          value={draft.category}
          onChange={(next) => set({ category: toLocalized(next) })}
        />
        <LocalizedField
          label="작성자 (author)"
          value={draft.author}
          onChange={(next) => set({ author: toLocalized(next) })}
        />
        <LocalizedField
          label="제목 (title)"
          value={draft.title}
          onChange={(next) => set({ title: toLocalized(next) })}
        />
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
        <TwoColumn>
          <NumberInput
            label="조회수 (views)"
            value={draft.views}
            onChange={(next) => set({ views: next })}
          />
          <NumberInput
            label="좋아요 (likes)"
            value={draft.likes}
            onChange={(next) => set({ likes: next })}
          />
        </TwoColumn>
        <label className="flex items-center gap-2 text-[12px] font-semibold text-neutral-600">
          <input
            type="checkbox"
            checked={draft.notice ?? false}
            onChange={(event) => set({ notice: event.target.checked })}
            className="h-4 w-4 rounded border-neutral-300"
          />
          공지글로 표시 (notice)
        </label>
        <LocalizedField
          label="요약 (description)"
          value={draft.description}
          onChange={(next) => set({ description: toLocalized(next) })}
          multiline
          rows={3}
        />
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
        description="상세 페이지 하단의 다운로드 목록입니다."
      >
        <FileList
          values={draft.files}
          onChange={(next) => set({ files: next })}
        />
      </SectionCard>
    </>
  );
}
