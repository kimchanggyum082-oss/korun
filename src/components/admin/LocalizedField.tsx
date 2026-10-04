"use client";

import { useId } from "react";
import { adminDict } from "@/lib/i18n/admin";
import { useLocale } from "@/lib/i18n/client";
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
  const t = adminDict[useLocale()].editor;
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
              {t.korean}
            </label>
            {showMissingKorean && (
              <span
                title={t.koMissingHint}
                className="rounded bg-[#fdf8ee] px-1.5 py-0.5 text-[10px] leading-none font-semibold text-[#8a5a10]"
              >
                {t.koMissing}
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
              {t.english}
            </label>
            {showFallback && (
              <span
                title={t.enFallsBackHint}
                className="rounded bg-paper px-1.5 py-0.5 text-[10px] leading-none font-semibold text-brand"
              >
                {t.enFallsBack}
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
