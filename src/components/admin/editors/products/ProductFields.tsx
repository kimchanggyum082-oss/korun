"use client";

import ImageField from "@/components/admin/ImageField";
import { Field, TextInput } from "@/components/admin/fields";
import { AddButton, MoveButtons, moveAt, removeAt, replaceAt } from "./shared";

export function StringList({
  label,
  hint,
  values,
  placeholder,
  onChange,
}: {
  label: string;
  hint?: string;
  values: readonly string[];
  placeholder?: string;
  onChange: (next: string[]) => void;
}) {
  const list = [...values];
  return (
    <Field label={label} hint={hint}>
      <div className="flex flex-col gap-2">
        {list.map((value, index) => (
          <div key={index} className="flex items-center gap-2">
            <TextInput
              value={value}
              placeholder={placeholder}
              onChange={(event) =>
                onChange(replaceAt(list, index, event.target.value))
              }
            />
            <MoveButtons
              index={index}
              count={list.length}
              onMove={(i, delta) => onChange(moveAt(list, i, delta))}
              onRemove={(i) => onChange(removeAt(list, i))}
            />
          </div>
        ))}
        <AddButton onClick={() => onChange([...list, ""])}>항목 추가</AddButton>
      </div>
    </Field>
  );
}

export function ImageList({
  label,
  hint,
  values,
  uploadConfigured,
  onChange,
}: {
  label: string;
  hint?: string;
  values: readonly string[];
  uploadConfigured: boolean;
  onChange: (next: string[]) => void;
}) {
  const list = [...values];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[12px] font-semibold text-neutral-600">{label}</p>
        {hint && <p className="text-[11px] text-neutral-400">{hint}</p>}
      </div>
      {list.map((value, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 rounded-md border border-neutral-200 p-3"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12px] font-semibold text-neutral-500">
              {index + 1}
            </span>
            <MoveButtons
              index={index}
              count={list.length}
              onMove={(i, delta) => onChange(moveAt(list, i, delta))}
              onRemove={(i) => onChange(removeAt(list, i))}
            />
          </div>
          <ImageField
            label="이미지 URL"
            value={value}
            uploadConfigured={uploadConfigured}
            onChange={(next) => onChange(replaceAt(list, index, next))}
          />
        </div>
      ))}
      <AddButton onClick={() => onChange([...list, ""])}>이미지 추가</AddButton>
    </div>
  );
}

export function NumberField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number | undefined;
  min?: number;
  max?: number;
  onChange: (next: number | undefined) => void;
}) {
  return (
    <Field label={label}>
      <TextInput
        type="number"
        min={min}
        max={max}
        value={value ?? ""}
        onChange={(event) => {
          const raw = event.target.value;
          if (raw === "") {
            onChange(undefined);
            return;
          }
          const parsed = Number.parseInt(raw, 10);
          onChange(Number.isNaN(parsed) ? undefined : parsed);
        }}
      />
    </Field>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-[12px] font-semibold text-neutral-600">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-neutral-300 text-brand focus:ring-brand/30"
      />
      {label}
    </label>
  );
}
