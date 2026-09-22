"use client";

import {
  Field,
  SectionCard,
  TextArea,
  TextInput,
  TwoColumn,
} from "@/components/admin/fields";
import type { ProductApplication, ProductBlock, SpecRow } from "@/lib/data";
import { ImageList, NumberField, StringList, Toggle } from "./ProductFields";
import { AddButton, MoveButtons, moveAt, removeAt, replaceAt } from "./shared";

function emptyRow(): SpecRow {
  return { label: "", values: [""] };
}

export default function ProductBlockForm({
  block,
  index,
  count,
  uploadConfigured,
  onChange,
  onMove,
  onRemove,
}: {
  block: ProductBlock;
  index: number;
  count: number;
  uploadConfigured: boolean;
  onChange: (patch: Partial<ProductBlock>) => void;
  onMove: (index: number, delta: number) => void;
  onRemove: (index: number) => void;
}) {
  const tags = [...block.tags];
  const bullets = [...(block.introBullets ?? [])];
  const applications = [...(block.applications ?? [])];
  const spec = block.spec;

  const setApplication = (
    appIndex: number,
    patch: Partial<ProductApplication>,
  ) =>
    onChange({
      applications: replaceAt(applications, appIndex, {
        ...applications[appIndex],
        ...patch,
      }),
    });

  const setRow = (rowIndex: number, patch: Partial<SpecRow>) => {
    if (!spec) return;
    onChange({
      spec: {
        ...spec,
        rows: replaceAt(spec.rows, rowIndex, {
          ...spec.rows[rowIndex],
          ...patch,
        }),
      },
    });
  };

  return (
    <SectionCard
      title={`블록 ${index + 1}`}
      description="이 블록의 제목, 소개, 태그, 갤러리, 적용 사례, 사양 표입니다."
    >
      <div className="flex items-center justify-end">
        <MoveButtons
          index={index}
          count={count}
          onMove={onMove}
          onRemove={onRemove}
        />
      </div>

      <TwoColumn>
        <Field label="상단 문구 (eyebrow)">
          <TextInput
            value={block.eyebrow ?? ""}
            onChange={(event) => onChange({ eyebrow: event.target.value })}
          />
        </Field>
        <Field label="제목 (title)">
          <TextInput
            value={block.title ?? ""}
            onChange={(event) => onChange({ title: event.target.value })}
          />
        </Field>
      </TwoColumn>

      <Field label="소개 제목 (introTitle)">
        <TextInput
          value={block.introTitle}
          onChange={(event) => onChange({ introTitle: event.target.value })}
        />
      </Field>

      <ImageList
        label="소개 이미지 (introImage)"
        values={block.introImage ? [block.introImage] : []}
        uploadConfigured={uploadConfigured}
        onChange={(next) => onChange({ introImage: next[0] })}
      />

      <Field label="소개 문단 (introText)">
        <TextArea
          rows={5}
          value={block.introText ?? ""}
          onChange={(event) => onChange({ introText: event.target.value })}
        />
      </Field>

      <StringList
        label="소개 불릿 (introBullets)"
        hint="값이 있으면 introText 대신 이 목록이 노출됩니다."
        values={bullets}
        onChange={(next) => onChange({ introBullets: next })}
      />

      <StringList
        label="태그 (tags)"
        hint="첫 3개는 첫 줄, 나머지는 다음 줄에 노출됩니다."
        values={tags}
        onChange={(next) => onChange({ tags: next })}
      />

      <TwoColumn>
        <Toggle
          label="문의하기 버튼 노출"
          checked={block.showInquiry ?? false}
          onChange={(next) => onChange({ showInquiry: next })}
        />
        <Toggle
          label="소개 문단 뒤 줄바꿈"
          checked={block.introTrailingBreak ?? false}
          onChange={(next) => onChange({ introTrailingBreak: next })}
        />
      </TwoColumn>

      <Field label="갤러리 라벨 (galleryLabel)">
        <TextInput
          value={block.galleryLabel}
          onChange={(event) => onChange({ galleryLabel: event.target.value })}
        />
      </Field>

      <ImageList
        label="갤러리 이미지 (gallery)"
        values={block.gallery}
        uploadConfigured={uploadConfigured}
        onChange={(next) => onChange({ gallery: next })}
      />

      <ImageList
        label="갤러리 썸네일 (galleryThumbs)"
        values={block.galleryThumbs ?? []}
        uploadConfigured={uploadConfigured}
        onChange={(next) => onChange({ galleryThumbs: next })}
      />

      <NumberField
        label="갤러리 열 수 (galleryColumns)"
        min={1}
        max={6}
        value={block.galleryColumns}
        onChange={(next) => onChange({ galleryColumns: next })}
      />

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[12px] font-semibold text-neutral-600">
            적용 사례 (applications)
          </p>
        </div>
        {applications.map((app, appIndex) => (
          <div
            key={appIndex}
            className="flex flex-col gap-2 rounded-md border border-neutral-200 p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12px] font-semibold text-neutral-500">
                사례 {appIndex + 1}
              </span>
              <MoveButtons
                index={appIndex}
                count={applications.length}
                onMove={(i, delta) =>
                  onChange({ applications: moveAt(applications, i, delta) })
                }
                onRemove={(i) =>
                  onChange({ applications: removeAt(applications, i) })
                }
              />
            </div>
            <Field label="제목">
              <TextInput
                value={app.title}
                onChange={(event) =>
                  setApplication(appIndex, { title: event.target.value })
                }
              />
            </Field>
            <ImageList
              label="이미지"
              values={app.images}
              uploadConfigured={uploadConfigured}
              onChange={(next) => setApplication(appIndex, { images: next })}
            />
          </div>
        ))}
        <AddButton
          onClick={() =>
            onChange({
              applications: [...applications, { title: "", images: [] }],
            })
          }
        >
          적용 사례 추가
        </AddButton>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[12px] font-semibold text-neutral-600">
            사양 표 (spec)
          </p>
          {spec ? (
            <button
              type="button"
              onClick={() => onChange({ spec: undefined })}
              className="text-[11px] font-semibold text-[#a51c1c] outline-none hover:underline focus-visible:ring-2 focus-visible:ring-brand/30"
            >
              사양 표 삭제
            </button>
          ) : null}
        </div>
        {spec ? (
          <>
            <Field label="모델명 (model)">
              <TextInput
                value={spec.model}
                onChange={(event) =>
                  onChange({ spec: { ...spec, model: event.target.value } })
                }
              />
            </Field>
            {spec.rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-col gap-2 rounded-md border border-neutral-200 p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] font-semibold text-neutral-500">
                    행 {rowIndex + 1}
                  </span>
                  <MoveButtons
                    index={rowIndex}
                    count={spec.rows.length}
                    onMove={(i, delta) =>
                      onChange({
                        spec: { ...spec, rows: moveAt(spec.rows, i, delta) },
                      })
                    }
                    onRemove={(i) =>
                      onChange({
                        spec: { ...spec, rows: removeAt(spec.rows, i) },
                      })
                    }
                  />
                </div>
                <Field label="라벨">
                  <TextInput
                    value={row.label}
                    onChange={(event) =>
                      setRow(rowIndex, { label: event.target.value })
                    }
                  />
                </Field>
                <StringList
                  label="값 (values)"
                  values={row.values}
                  onChange={(next) => setRow(rowIndex, { values: next })}
                />
                <TwoColumn>
                  <Field label="라벨 너비 (labelWidth)">
                    <TextInput
                      value={row.labelWidth ?? ""}
                      placeholder="예: 21.869%"
                      onChange={(event) =>
                        setRow(rowIndex, { labelWidth: event.target.value })
                      }
                    />
                  </Field>
                  <Field label="값 너비 (valueWidth)">
                    <TextInput
                      value={row.valueWidth ?? ""}
                      placeholder="예: 71.3873%"
                      onChange={(event) =>
                        setRow(rowIndex, { valueWidth: event.target.value })
                      }
                    />
                  </Field>
                </TwoColumn>
              </div>
            ))}
            <AddButton
              onClick={() =>
                onChange({
                  spec: { ...spec, rows: [...spec.rows, emptyRow()] },
                })
              }
            >
              사양 행 추가
            </AddButton>
          </>
        ) : (
          <AddButton
            onClick={() =>
              onChange({ spec: { model: "", rows: [emptyRow()] } })
            }
          >
            사양 표 추가
          </AddButton>
        )}
      </div>
    </SectionCard>
  );
}
