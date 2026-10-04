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
import { newsDict } from "@/lib/i18n/boards/news";
import { useLocale } from "@/lib/i18n/client";
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

  const t = newsDict[useLocale()].form;

  return (
    <>
      <SectionCard
        title={t.metaSection.title}
        description={t.metaSection.description}
      >
        <LocalizedField
          label={t.category}
          value={draft.category}
          onChange={(next) => set({ category: toLocalized(next) })}
        />
        <LocalizedField
          label={t.author}
          value={draft.author}
          onChange={(next) => set({ author: toLocalized(next) })}
        />
        <LocalizedField
          label={t.title}
          value={draft.title}
          onChange={(next) => set({ title: toLocalized(next) })}
        />
        <TwoColumn>
          <Field label={t.date}>
            <TextInput
              value={draft.date}
              placeholder={t.datePlaceholder}
              onChange={(event) => set({ date: event.target.value })}
            />
          </Field>
          <Field label={t.idx}>
            <TextInput value={draft.idx} readOnly disabled />
          </Field>
        </TwoColumn>
        <TwoColumn>
          <NumberInput
            label={t.views}
            value={draft.views}
            onChange={(next) => set({ views: next })}
          />
          <NumberInput
            label={t.likes}
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
          {t.notice}
        </label>
        <LocalizedField
          label={t.description}
          value={draft.description}
          onChange={(next) => set({ description: toLocalized(next) })}
          multiline
          rows={3}
        />
      </SectionCard>

      <SectionCard
        title={t.blocksSection.title}
        description={t.blocksSection.description}
      >
        <BlockEditor
          blocks={draft.blocks}
          uploadConfigured={uploadConfigured}
          onChange={(next) => set({ blocks: next })}
        />
      </SectionCard>

      <SectionCard
        title={t.filesSection.title}
        description={t.filesSection.description}
      >
        <FileList
          values={draft.files}
          onChange={(next) => set({ files: next })}
        />
      </SectionCard>
    </>
  );
}
