"use client";

import { Field, TextInput } from "@/components/admin/fields";
import { AddButton, MoveButtons, moveAt, removeAt, replaceAt } from "./shared";

export type FileEntry = { name: string; size: string; url: string };

export default function FileList({
  values,
  onChange,
}: {
  values: FileEntry[];
  onChange: (next: FileEntry[]) => void;
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
            <MoveButtons
              index={index}
              count={values.length}
              onMove={(i, delta) => onChange(moveAt(values, i, delta))}
              onRemove={(i) => onChange(removeAt(values, i))}
            />
          </div>
          <Field label="이름 (name)">
            <TextInput
              value={file.name}
              onChange={(event) =>
                onChange(
                  replaceAt(values, index, {
                    ...file,
                    name: event.target.value,
                  }),
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
                  replaceAt(values, index, {
                    ...file,
                    size: event.target.value,
                  }),
                )
              }
            />
          </Field>
          <Field label="다운로드 URL (url)">
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
        파일 추가
      </AddButton>
    </div>
  );
}
