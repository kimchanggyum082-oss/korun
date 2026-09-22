"use client";

import ImageField from "@/components/admin/ImageField";
import {
  Field,
  TextArea,
  TextInput,
  inputClass,
} from "@/components/admin/fields";
import type { InterestingItemBlock, TextAlign, TextRun } from "@/lib/data";
import { AddButton, MoveButtons, moveAt, removeAt, replaceAt } from "./shared";

type Block = InterestingItemBlock;

const TYPE_LABEL: Record<Block["type"], string> = {
  text: "텍스트",
  image: "이미지",
  button: "버튼",
  hr: "구분선",
  br: "줄바꿈",
};

const BLOCK_TYPES: Block["type"][] = ["text", "image", "button", "hr", "br"];

function defaultBlock(type: Block["type"]): Block {
  switch (type) {
    case "text":
      return { type: "text", content: "" };
    case "image":
      return { type: "image", src: "" };
    case "button":
      return { type: "button", label: "", href: "" };
    case "hr":
      return { type: "hr" };
    case "br":
      return { type: "br" };
  }
}

function Check({
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
        className="h-4 w-4 rounded border-neutral-300"
      />
      {label}
    </label>
  );
}

function AlignSelect({
  value,
  onChange,
}: {
  value: TextAlign | undefined;
  onChange: (next: TextAlign | undefined) => void;
}) {
  return (
    <Field label="정렬">
      <select
        value={value ?? ""}
        onChange={(event) =>
          onChange(
            event.target.value === ""
              ? undefined
              : (event.target.value as TextAlign),
          )
        }
        className={inputClass}
      >
        <option value="">기본</option>
        <option value="left">왼쪽</option>
        <option value="center">가운데</option>
      </select>
    </Field>
  );
}

function NumberField({
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

function TextRunsEditor({
  runs,
  onChange,
}: {
  runs: TextRun[];
  onChange: (next: TextRun[]) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {runs.map((run, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 rounded-md border border-neutral-200 p-2.5"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold text-neutral-500">
              조각 {index + 1}
            </span>
            <MoveButtons
              index={index}
              count={runs.length}
              onMove={(i, delta) => onChange(moveAt(runs, i, delta))}
              onRemove={(i) => onChange(removeAt(runs, i))}
            />
          </div>
          <TextInput
            value={run.text}
            placeholder="텍스트"
            onChange={(event) =>
              onChange(
                replaceAt(runs, index, { ...run, text: event.target.value }),
              )
            }
          />
          <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto]">
            <NumberField
              label="글자 크기"
              value={run.fontSize}
              onChange={(next) =>
                onChange(replaceAt(runs, index, { ...run, fontSize: next }))
              }
            />
            <div className="flex items-end pb-2">
              <Check
                label="굵게"
                checked={run.bold ?? false}
                onChange={(next) =>
                  onChange(replaceAt(runs, index, { ...run, bold: next }))
                }
              />
            </div>
            <div className="flex items-end pb-2">
              <Check
                label="밑줄"
                checked={run.underline ?? false}
                onChange={(next) =>
                  onChange(replaceAt(runs, index, { ...run, underline: next }))
                }
              />
            </div>
          </div>
        </div>
      ))}
      <AddButton onClick={() => onChange([...runs, { text: "" }])}>
        조각 추가
      </AddButton>
    </div>
  );
}

function BlockRow({
  block,
  index,
  count,
  uploadConfigured,
  onChange,
  onMove,
  onRemove,
}: {
  block: Block;
  index: number;
  count: number;
  uploadConfigured: boolean;
  onChange: (next: Block) => void;
  onMove: (index: number, delta: number) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-neutral-200 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-[12px] font-semibold text-neutral-500">
          <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[11px] text-neutral-500">
            {TYPE_LABEL[block.type]}
          </span>
          {index + 1}
        </span>
        <MoveButtons
          index={index}
          count={count}
          onMove={onMove}
          onRemove={onRemove}
        />
      </div>

      {block.type === "text" ? (
        block.parts ? (
          <>
            <TextRunsEditor
              runs={block.parts}
              onChange={(next) => onChange({ ...block, parts: next })}
            />
            <AlignSelect
              value={block.align}
              onChange={(next) => onChange({ ...block, align: next })}
            />
            <div className="flex">
              <button
                type="button"
                onClick={() =>
                  onChange({
                    type: "text",
                    content: block.parts?.map((run) => run.text).join("") ?? "",
                    align: block.align,
                  })
                }
                className="text-[11px] font-semibold text-neutral-500 outline-none hover:text-ink focus-visible:ring-2 focus-visible:ring-brand/30"
              >
                단일 텍스트로 합치기
              </button>
            </div>
          </>
        ) : (
          <>
            <Field label="내용">
              <TextArea
                rows={3}
                value={block.content}
                onChange={(event) =>
                  onChange({ ...block, content: event.target.value })
                }
              />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <NumberField
                label="글자 크기"
                value={block.fontSize}
                onChange={(next) => onChange({ ...block, fontSize: next })}
              />
              <AlignSelect
                value={block.align}
                onChange={(next) => onChange({ ...block, align: next })}
              />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Check
                label="굵게"
                checked={block.bold ?? false}
                onChange={(next) => onChange({ ...block, bold: next })}
              />
              <Check
                label="밑줄"
                checked={block.underline ?? false}
                onChange={(next) => onChange({ ...block, underline: next })}
              />
              <button
                type="button"
                onClick={() =>
                  onChange({
                    type: "text",
                    content: block.content,
                    align: block.align,
                    parts: [
                      {
                        text: block.content,
                        fontSize: block.fontSize,
                        bold: block.bold,
                        underline: block.underline,
                      },
                    ],
                  })
                }
                className="text-[11px] font-semibold text-neutral-500 outline-none hover:text-ink focus-visible:ring-2 focus-visible:ring-brand/30"
              >
                조각(parts)으로 나누기
              </button>
            </div>
          </>
        )
      ) : null}

      {block.type === "image" ? (
        <>
          <ImageField
            label="이미지 URL (src)"
            value={block.src}
            uploadConfigured={uploadConfigured}
            onChange={(next) => onChange({ ...block, src: next })}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField
              label="너비 (width)"
              value={block.width}
              onChange={(next) => onChange({ ...block, width: next })}
            />
            <div className="flex items-end pb-2">
              <Check
                label="블록으로 표시"
                checked={block.block ?? false}
                onChange={(next) => onChange({ ...block, block: next })}
              />
            </div>
          </div>
        </>
      ) : null}

      {block.type === "button" ? (
        <>
          <Field label="문구 (label)">
            <TextInput
              value={block.label}
              onChange={(event) =>
                onChange({ ...block, label: event.target.value })
              }
            />
          </Field>
          <Field label="링크 (href)">
            <TextInput
              value={block.href}
              onChange={(event) =>
                onChange({ ...block, href: event.target.value })
              }
            />
          </Field>
          <AlignSelect
            value={block.align}
            onChange={(next) => onChange({ ...block, align: next })}
          />
        </>
      ) : null}

      {block.type === "br" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            label="글자 크기 (fontSize)"
            value={block.fontSize}
            onChange={(next) => onChange({ ...block, fontSize: next })}
          />
          <AlignSelect
            value={block.align}
            onChange={(next) => onChange({ ...block, align: next })}
          />
        </div>
      ) : null}

      {block.type === "hr" ? (
        <p className="text-[11px] text-neutral-400">
          구분선은 별도 설정이 없습니다.
        </p>
      ) : null}
    </div>
  );
}

export default function BlockEditor({
  blocks,
  uploadConfigured,
  onChange,
}: {
  blocks: Block[];
  uploadConfigured: boolean;
  onChange: (next: Block[]) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {blocks.map((block, index) => (
        <BlockRow
          key={index}
          block={block}
          index={index}
          count={blocks.length}
          uploadConfigured={uploadConfigured}
          onChange={(next) => onChange(replaceAt(blocks, index, next))}
          onMove={(i, delta) => onChange(moveAt(blocks, i, delta))}
          onRemove={(i) => onChange(removeAt(blocks, i))}
        />
      ))}

      <div className="flex flex-wrap items-center gap-2">
        {BLOCK_TYPES.map((type) => (
          <AddButton
            key={type}
            onClick={() => onChange([...blocks, defaultBlock(type)])}
          >
            {TYPE_LABEL[type]} 추가
          </AddButton>
        ))}
      </div>
    </div>
  );
}
