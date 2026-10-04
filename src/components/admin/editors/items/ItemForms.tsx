"use client";

import type { UpdateDraft } from "@/components/admin/EntityEditor";
import LocalizedField from "@/components/admin/LocalizedField";
import {
  Field,
  SectionCard,
  TextInput,
  TwoColumn,
} from "@/components/admin/fields";
import ImageField from "@/components/admin/ImageField";
import type { InterestingItemEntity } from "@/lib/admin/entities";
import { itemsDict, type ItemsDict } from "@/lib/i18n/boards/items";
import { useLocale } from "@/lib/i18n/client";
import BlockEditor from "./BlockEditor";
import { toLocalized } from "./shared";

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
  t,
}: {
  values: InterestingItemEntity["files"];
  onChange: (next: InterestingItemEntity["files"]) => void;
  t: ItemsDict["files"];
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
              {t.item(index + 1)}
            </span>
            <button
              type="button"
              aria-label={t.remove}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-neutral-200 text-[13px] leading-none text-neutral-500 transition-colors outline-none hover:border-neutral-300 hover:text-[#a51c1c] focus-visible:ring-2 focus-visible:ring-brand/30"
              onClick={() => onChange(values.filter((_, i) => i !== index))}
            >
              ✕
            </button>
          </div>
          <LocalizedField
            label={t.name}
            value={file.name}
            onChange={(next) =>
              onChange(
                values.map((entry, i) =>
                  i === index ? { ...entry, name: toLocalized(next) } : entry,
                ),
              )
            }
          />
          <Field label={t.size}>
            <TextInput
              value={file.size}
              placeholder={t.sizePlaceholder}
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
        {t.add}
      </button>
    </div>
  );
}

export default function ItemForms({
  draft,
  update,
  uploadConfigured,
}: {
  draft: InterestingItemEntity;
  update: UpdateDraft<InterestingItemEntity>;
  uploadConfigured: boolean;
}) {
  const set = (patch: Partial<InterestingItemEntity>) =>
    update((current) => ({ ...current, ...patch }));

  const dict = itemsDict[useLocale()];
  const t = dict.form;

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
        <NumberInput
          label={t.views}
          value={draft.views}
          onChange={(next) => set({ views: next })}
        />
        <ImageField
          label={t.thumbnail}
          value={draft.thumbnail}
          uploadConfigured={uploadConfigured}
          onChange={(next) => set({ thumbnail: next })}
        />
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
        <ItemFileList
          values={draft.files}
          onChange={(next) => set({ files: next })}
          t={dict.files}
        />
      </SectionCard>
    </>
  );
}
