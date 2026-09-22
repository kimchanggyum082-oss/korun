"use client";

import { useId } from "react";
import {
  normalizeLocalized,
  readLocalized,
  TextArea,
  TextInput,
  type LocalizedValue,
} from "./fields";

export default function LocalizedField({
  label,
  value,
  onChange,
  hint,
  placeholder,
  enPlaceholder,
  required,
  multiline,
  rows = 4,
  disabled,
  className,
}: {
  label?: string;
  value: LocalizedValue;
  onChange: (next: LocalizedValue) => void;
  hint?: string;
  placeholder?: string;
  enPlaceholder?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  className?: string;
}) {
  const { ko, en } = readLocalized(value);
  const baseId = useId();
  const koId = `${baseId}-ko`;
  const enId = `${baseId}-en`;

  const shared = {
    disabled,
    "aria-required": required || undefined,
  };

  const showFallback = ko.length > 0 && en.length === 0;
  const showMissingKorean = ko.length === 0 && en.length > 0;

  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      {label && (
        <span className="text-[12px] font-semibold text-neutral-600">
          {label}
          {required && <span className="ml-0.5 text-brand">*</span>}
        </span>
      )}

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <div className="flex min-h-[15px] items-center justify-between gap-2">
            <label
              htmlFor={koId}
              className="text-[11px] font-semibold text-neutral-400"
            >
              한국어
            </label>
            {showMissingKorean && (
              <span
                title="한국어가 비어 있으면 국문 사이트에서 이 문구가 표시되지 않습니다."
                className="rounded bg-[#fdf8ee] px-1.5 py-0.5 text-[10px] leading-none font-semibold text-[#8a5a10]"
              >
                한국어 없음
              </span>
            )}
          </div>
          {multiline ? (
            <TextArea
              {...shared}
              id={koId}
              rows={rows}
              value={ko}
              placeholder={placeholder}
              onChange={(event) =>
                onChange(normalizeLocalized(event.target.value, en))
              }
            />
          ) : (
            <TextInput
              {...shared}
              id={koId}
              value={ko}
              placeholder={placeholder}
              onChange={(event) =>
                onChange(normalizeLocalized(event.target.value, en))
              }
            />
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex min-h-[15px] items-center justify-between gap-2">
            <label
              htmlFor={enId}
              className="text-[11px] font-semibold text-neutral-400"
            >
              English
            </label>
            {showFallback && (
              <span
                title="영문이 비어 있으면 공개 사이트에서 한국어가 대신 표시됩니다."
                className="rounded bg-paper px-1.5 py-0.5 text-[10px] leading-none font-semibold text-brand"
              >
                한국어로 표시
              </span>
            )}
          </div>
          {multiline ? (
            <TextArea
              {...shared}
              id={enId}
              rows={rows}
              value={en}
              placeholder={enPlaceholder ?? placeholder}
              onChange={(event) =>
                onChange(normalizeLocalized(ko, event.target.value))
              }
            />
          ) : (
            <TextInput
              {...shared}
              id={enId}
              value={en}
              placeholder={enPlaceholder ?? placeholder}
              onChange={(event) =>
                onChange(normalizeLocalized(ko, event.target.value))
              }
            />
          )}
        </div>
      </div>

      {hint && <p className="text-[11px] text-neutral-400">{hint}</p>}
    </div>
  );
}
