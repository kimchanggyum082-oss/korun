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
import type { ServiceCaseStudioItem } from "@/lib/data";
import BlockEditor from "../news/BlockEditor";
import FileList from "../news/FileList";

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

export default function CaseStudioForms({
  draft,
  update,
  uploadConfigured,
}: {
  draft: ServiceCaseStudioItem;
  update: UpdateDraft<ServiceCaseStudioItem>;
  uploadConfigured: boolean;
}) {
  const set = (patch: Partial<ServiceCaseStudioItem>) =>
    update((current) => ({ ...current, ...patch }));

  return (
    <>
      <SectionCard
        title="게시글 정보"
        description="목록과 상세에 노출되는 메타데이터입니다."
      >
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
        <Field label="요약 (summary)">
          <TextArea
            rows={2}
            value={draft.summary ?? ""}
            onChange={(event) => set({ summary: event.target.value })}
          />
        </Field>
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
