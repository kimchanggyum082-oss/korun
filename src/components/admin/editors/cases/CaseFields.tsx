"use client";

import ImageField from "@/components/admin/ImageField";
import { Field, TextInput } from "@/components/admin/fields";
import type { GalleryImage } from "@/lib/data";
import { AddButton, MoveButtons, moveAt, removeAt, replaceAt } from "./shared";

type SectionImage = { src: string; width: number; height: number };

export function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number | undefined;
  onChange: (next: number | undefined) => void;
}) {
  return (
    <Field label={label}>
      <TextInput
        type="number"
        min={1}
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

export function SectionImageList({
  values,
  uploadConfigured,
  onChange,
}: {
  values: SectionImage[];
  uploadConfigured: boolean;
  onChange: (next: SectionImage[]) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[12px] font-semibold text-neutral-600">
        본문 이미지 (images)
      </p>
      {values.map((image, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 rounded-md border border-neutral-200 p-3"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12px] font-semibold text-neutral-500">
              이미지 {index + 1}
            </span>
            <MoveButtons
              index={index}
              count={values.length}
              onMove={(i, delta) => onChange(moveAt(values, i, delta))}
              onRemove={(i) => onChange(removeAt(values, i))}
            />
          </div>
          <ImageField
            label="이미지 URL (src)"
            value={image.src}
            uploadConfigured={uploadConfigured}
            onChange={(next) =>
              onChange(replaceAt(values, index, { ...image, src: next }))
            }
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField
              label="원본 너비 (width)"
              value={image.width}
              onChange={(next) =>
                onChange(
                  replaceAt(values, index, { ...image, width: next ?? 0 }),
                )
              }
            />
            <NumberField
              label="원본 높이 (height)"
              value={image.height}
              onChange={(next) =>
                onChange(
                  replaceAt(values, index, { ...image, height: next ?? 0 }),
                )
              }
            />
          </div>
        </div>
      ))}
      <AddButton
        onClick={() => onChange([...values, { src: "", width: 0, height: 0 }])}
      >
        본문 이미지 추가
      </AddButton>
    </div>
  );
}

export function GalleryImageList({
  values,
  uploadConfigured,
  onChange,
}: {
  values: GalleryImage[];
  uploadConfigured: boolean;
  onChange: (next: GalleryImage[]) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[12px] font-semibold text-neutral-600">
        갤러리 이미지 (galleryImages)
      </p>
      {values.map((image, index) => (
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
              count={values.length}
              onMove={(i, delta) => onChange(moveAt(values, i, delta))}
              onRemove={(i) => onChange(removeAt(values, i))}
            />
          </div>
          <ImageField
            label="썸네일 URL (src)"
            value={image.src}
            uploadConfigured={uploadConfigured}
            onChange={(next) =>
              onChange(replaceAt(values, index, { ...image, src: next }))
            }
          />
          <ImageField
            label="원본 URL (fullSrc)"
            value={image.fullSrc}
            uploadConfigured={uploadConfigured}
            onChange={(next) =>
              onChange(replaceAt(values, index, { ...image, fullSrc: next }))
            }
          />
          <Field label="대체 텍스트 (alt)">
            <TextInput
              value={image.alt}
              onChange={(event) =>
                onChange(
                  replaceAt(values, index, {
                    ...image,
                    alt: event.target.value,
                  }),
                )
              }
            />
          </Field>
        </div>
      ))}
      <AddButton
        onClick={() => onChange([...values, { src: "", fullSrc: "", alt: "" }])}
      >
        갤러리 이미지 추가
      </AddButton>
    </div>
  );
}
