"use client";

import LocalizedField from "@/components/admin/LocalizedField";
import { Field, TextInput } from "@/components/admin/fields";
import type { ServiceFileEntity } from "@/lib/admin/entities";
import { newsDict } from "@/lib/i18n/boards/news";
import { useLocale } from "@/lib/i18n/client";
import { toLocalized } from "../items/shared";
import { AddButton, MoveButtons, moveAt, removeAt, replaceAt } from "./shared";

export default function FileList({
  values,
  onChange,
}: {
  values: ServiceFileEntity[];
  onChange: (next: ServiceFileEntity[]) => void;
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
          <LocalizedField
            label={t.name}
            value={file.name}
            onChange={(next) =>
              onChange(
                replaceAt(values, index, {
                  ...file,
                  name: toLocalized(next),
                }),
              )
            }
          />
          <Field label={t.size}>
            <TextInput
              value={file.size}
              placeholder={t.sizePlaceholder}
              onChange={(event) =>
                onChange(
                  replaceAt(values, index, {
                    ...file,
                    size: event.target.value,
                  }),
                )
              }
            />
          </Field>
          <Field label={t.url}>
            <TextInput
              type="url"
              value={file.url}
              onChange={(event) =>
                onChange(
                  replaceAt(values, index, {
                    ...file,
                    url: event.target.value,
                  }),
                )
              }
            />
          </Field>
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
