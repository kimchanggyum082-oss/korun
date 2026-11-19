"use client";

import AttachmentField from "@/components/admin/AttachmentField";
import type { ServiceFileEntity } from "@/lib/admin/entities";
import { newsDict } from "@/lib/i18n/boards/news";
import { useLocale } from "@/lib/i18n/client";
import { AddButton, MoveButtons, moveAt, removeAt, replaceAt } from "./shared";

export default function FileList({
  values,
  onChange,
  uploadConfigured,
}: {
  values: ServiceFileEntity[];
  onChange: (next: ServiceFileEntity[]) => void;
  uploadConfigured: boolean;
}) {
  const t = newsDict[useLocale()].files;

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
            <MoveButtons
              index={index}
              count={values.length}
              onMove={(i, delta) => onChange(moveAt(values, i, delta))}
              onRemove={(i) => onChange(removeAt(values, i))}
            />
          </div>
          <AttachmentField
            label={t.url}
            value={{ url: file.url, name: file.name, size: file.size }}
            onChange={(next) =>
              onChange(replaceAt(values, index, { ...file, ...next }))
            }
            uploadConfigured={uploadConfigured}
          />
        </div>
      ))}
      <AddButton
        onClick={() => onChange([...values, { name: "", size: "", url: "" }])}
      >
        {t.add}
      </AddButton>
    </div>
  );
}
