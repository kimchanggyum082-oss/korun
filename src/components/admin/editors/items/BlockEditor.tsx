"use client";

import ImageField from "@/components/admin/ImageField";
import LocalizedField from "@/components/admin/LocalizedField";
import {
  Field,
  TextInput,
  inputClass,
  readLocalized,
} from "@/components/admin/fields";
import type { Localized } from "@/lib/content/merge";
import type {
  InterestingItemBlockEntity,
  TextRunEntity,
} from "@/lib/admin/entities";
import type { TextAlign } from "@/lib/data";
import { itemsDict, type ItemsDict } from "@/lib/i18n/boards/items";
import { useLocale } from "@/lib/i18n/client";
import {
  AddButton,
  MoveButtons,
  moveAt,
  removeAt,
  replaceAt,
  toLocalized,
} from "./shared";

type Block = InterestingItemBlockEntity;
type BlocksT = ItemsDict["blocks"];

const BLOCK_TYPES: Block["type"][] = [
  "text",
  "image",
  "button",
  "hr",
  "br",
  "list",
];

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
    case "list":
      return { type: "list", items: [""] };
  }
}

function mergeRunText(runs: TextRunEntity[]): Localized<string> {
  return toLocalized({
    ko: runs.map((run) => readLocalized(run.text).ko).join(""),
    en: runs.map((run) => readLocalized(run.text).en).join(""),
  });
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
  t,
  value,
  onChange,
}: {
  t: BlocksT;
  value: TextAlign | undefined;
  onChange: (next: TextAlign | undefined) => void;
}) {
  return (
    <Field label={t.align}>
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
        <option value="">{t.alignDefault}</option>
        <option value="left">{t.alignLeft}</option>
        <option value="center">{t.alignCenter}</option>
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

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | undefined;
  onChange: (next: string | undefined) => void;
}) {
  return (
    <Field label={label}>
      <TextInput
        value={value ?? ""}
        placeholder="#363636 / rgb(147,196,125)"
        onChange={(event) => {
          const raw = event.target.value;
          onChange(raw.trim() === "" ? undefined : raw);
        }}
      />
    </Field>
  );
}

function TextRunsEditor({
  runs,
  onChange,
  t,
}: {
  runs: TextRunEntity[];
  onChange: (next: TextRunEntity[]) => void;
  t: BlocksT;
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
              {t.part(index + 1)}
            </span>
            <MoveButtons
              index={index}
              count={runs.length}
              onMove={(i, delta) => onChange(moveAt(runs, i, delta))}
              onRemove={(i) => onChange(removeAt(runs, i))}
            />
          </div>
          <LocalizedField
            value={run.text}
            onChange={(next) =>
              onChange(
                replaceAt(runs, index, { ...run, text: toLocalized(next) }),
              )
            }
          />
          <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto]">
            <NumberField
              label={t.fontSize}
              value={run.fontSize}
              onChange={(next) =>
                onChange(replaceAt(runs, index, { ...run, fontSize: next }))
              }
            />
            <div className="flex items-end pb-2">
              <Check
                label={t.bold}
                checked={run.bold ?? false}
                onChange={(next) =>
                  onChange(replaceAt(runs, index, { ...run, bold: next }))
                }
              />
            </div>
            <div className="flex items-end pb-2">
              <Check
                label={t.underline}
                checked={run.underline ?? false}
                onChange={(next) =>
                  onChange(replaceAt(runs, index, { ...run, underline: next }))
                }
              />
            </div>
          </div>
          <ColorField
            label={t.color}
            value={run.color}
            onChange={(next) =>
              onChange(replaceAt(runs, index, { ...run, color: next }))
            }
          />
        </div>
      ))}
      <AddButton onClick={() => onChange([...runs, { text: "" }])}>
        {t.addPart}
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
  t,
}: {
  block: Block;
  index: number;
  count: number;
  uploadConfigured: boolean;
  onChange: (next: Block) => void;
  onMove: (index: number, delta: number) => void;
  onRemove: (index: number) => void;
  t: BlocksT;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-neutral-200 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-[12px] font-semibold text-neutral-500">
          <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[11px] text-neutral-500">
            {t.typeNames[block.type]}
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
              t={t}
            />
            <AlignSelect
              t={t}
              value={block.align}
              onChange={(next) => onChange({ ...block, align: next })}
            />
            <div className="flex">
              <button
                type="button"
                onClick={() =>
                  onChange({
                    type: "text",
                    content: mergeRunText(block.parts ?? []),
                    align: block.align,
                  })
                }
                className="text-[11px] font-semibold text-neutral-500 outline-none hover:text-ink focus-visible:ring-2 focus-visible:ring-brand/30"
              >
                {t.mergeParts}
              </button>
            </div>
          </>
        ) : (
          <>
            <LocalizedField
              label={t.content}
              value={block.content}
              onChange={(next) =>
                onChange({ ...block, content: toLocalized(next) })
              }
              multiline
              rows={3}
            />
            <div className="grid gap-3 sm:grid-cols-3">
              <NumberField
                label={t.fontSize}
                value={block.fontSize}
                onChange={(next) => onChange({ ...block, fontSize: next })}
              />
              <AlignSelect
                t={t}
                value={block.align}
                onChange={(next) => onChange({ ...block, align: next })}
              />
              <ColorField
                label={t.color}
                value={block.color}
                onChange={(next) => onChange({ ...block, color: next })}
              />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Check
                label={t.bold}
                checked={block.bold ?? false}
                onChange={(next) => onChange({ ...block, bold: next })}
              />
              <Check
                label={t.underline}
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
                        color: block.color,
                      },
                    ],
                  })
                }
                className="text-[11px] font-semibold text-neutral-500 outline-none hover:text-ink focus-visible:ring-2 focus-visible:ring-brand/30"
              >
                {t.splitParts}
              </button>
            </div>
          </>
        )
      ) : null}

      {block.type === "image" ? (
        <>
          <ImageField
            label={t.imageSrc}
            value={block.src}
            uploadConfigured={uploadConfigured}
            onChange={(next) => onChange({ ...block, src: next })}
          />
          <div className="grid gap-3 sm:grid-cols-3">
            <NumberField
              label={t.width}
              value={block.width}
              onChange={(next) => onChange({ ...block, width: next })}
            />
            <AlignSelect
              t={t}
              value={block.align}
              onChange={(next) => onChange({ ...block, align: next })}
            />
            <div className="flex items-end pb-2">
              <Check
                label={t.blockDisplay}
                checked={block.block ?? false}
                onChange={(next) => onChange({ ...block, block: next })}
              />
            </div>
          </div>
        </>
      ) : null}

      {block.type === "button" ? (
        <>
          <LocalizedField
            label={t.buttonLabel}
            value={block.label}
            onChange={(next) =>
              onChange({ ...block, label: toLocalized(next) })
            }
          />
          <Field label={t.buttonHref}>
            <TextInput
              value={block.href}
              onChange={(event) =>
                onChange({ ...block, href: event.target.value })
              }
            />
          </Field>
          <AlignSelect
            t={t}
            value={block.align}
            onChange={(next) => onChange({ ...block, align: next })}
          />
        </>
      ) : null}

      {block.type === "list" ? (
        <>
          <div className="flex flex-col gap-2">
            {block.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-end gap-2">
                <div className="min-w-0 flex-1">
                  <LocalizedField
                    label={`${t.item} ${itemIndex + 1}`}
                    value={item}
                    onChange={(next) =>
                      onChange({
                        ...block,
                        items: replaceAt(
                          block.items,
                          itemIndex,
                          toLocalized(next),
                        ),
                      })
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...block,
                      items: removeAt(block.items, itemIndex),
                    })
                  }
                  className="mb-0.5 h-9 shrink-0 rounded-md border border-neutral-200 px-3 text-[12px] font-semibold text-neutral-500 transition-colors hover:text-ink"
                >
                  {t.remove}
                </button>
              </div>
            ))}
          </div>
          <AddButton
            onClick={() => onChange({ ...block, items: [...block.items, ""] })}
          >
            {t.addItem}
          </AddButton>
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField
              label={t.fontSizeRaw}
              value={block.fontSize}
              onChange={(next) => onChange({ ...block, fontSize: next })}
            />
            <AlignSelect
              t={t}
              value={block.align}
              onChange={(next) => onChange({ ...block, align: next })}
            />
          </div>
        </>
      ) : null}

      {block.type === "br" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            label={t.fontSizeRaw}
            value={block.fontSize}
            onChange={(next) => onChange({ ...block, fontSize: next })}
          />
          <AlignSelect
            t={t}
            value={block.align}
            onChange={(next) => onChange({ ...block, align: next })}
          />
        </div>
      ) : null}

      {block.type === "hr" ? (
        <p className="text-[11px] text-neutral-400">{t.hrEmpty}</p>
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
  const t = itemsDict[useLocale()].blocks;

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
          t={t}
        />
      ))}

      <div className="flex flex-wrap items-center gap-2">
        {BLOCK_TYPES.map((type) => (
          <AddButton
            key={type}
            onClick={() => onChange([...blocks, defaultBlock(type)])}
          >
            {t.addBlock(t.typeNames[type])}
          </AddButton>
        ))}
      </div>
    </div>
  );
}
