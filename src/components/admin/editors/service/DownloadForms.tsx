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
import type { ServiceDownloadItemEntity } from "@/lib/admin/entities";
import { downloadsDict } from "@/lib/i18n/boards/downloads";
import { useLocale } from "@/lib/i18n/client";
import BlockEditor from "../items/BlockEditor";
import { toLocalized } from "../items/shared";
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

export default function DownloadForms({
  draft,
  update,
  uploadConfigured,
}: {
  draft: ServiceDownloadItemEntity;
  update: UpdateDraft<ServiceDownloadItemEntity>;
  uploadConfigured: boolean;
}) {
  const set = (patch: Partial<ServiceDownloadItemEntity>) =>
    update((current) => ({ ...current, ...patch }));

  const t = downloadsDict[useLocale()].form;

  return (
    <>
      <SectionCard
        title={t.infoSection.title}
        description={t.infoSection.description}
      >
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
          label={t.summary}
          value={draft.summary ?? ""}
          onChange={(next) => set({ summary: toLocalized(next) })}
          multiline
          rows={2}
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
        <FileList
          values={draft.files}
          onChange={(next) => set({ files: next })}
        />
      </SectionCard>
    </>
  );
}
