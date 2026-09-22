"use client";

import { useState } from "react";
import EntityEditor, {
  type UpdateDraft,
} from "@/components/admin/EntityEditor";
import LocalizedField from "@/components/admin/LocalizedField";
import {
  SectionCard,
  TextInput,
  type LocalizedValue,
} from "@/components/admin/fields";
import {
  ENTITY_KEYS,
  type EntitySource,
  type UiStringEntry,
  type UiStringsEntity,
} from "@/lib/admin/entities";

function uniqueKey(current: UiStringsEntity, base: string): string {
  if (!(base in current)) return base;
  let index = 2;
  while (`${base}${index}` in current) index += 1;
  return `${base}${index}`;
}

function toEntry(next: LocalizedValue): UiStringEntry {
  if (typeof next === "string") return { ko: next, en: "" };
  return { ko: next.ko ?? "", en: next.en ?? "" };
}

function UiStringsForm({
  draft,
  update,
}: {
  draft: UiStringsEntity;
  update: UpdateDraft<UiStringsEntity>;
}) {
  const rows = Object.entries(draft);

  const setEntry = (index: number, next: LocalizedValue) =>
    update((current) => {
      const entries = Object.entries(current);
      const entry = toEntry(next);
      return Object.fromEntries(
        entries.map(([key, value], i) =>
          i === index ? [key, entry] : [key, value],
        ),
      );
    });

  const renameKey = (index: number, nextKey: string) =>
    update((current) => {
      const entries = Object.entries(current);
      return Object.fromEntries(
        entries.map(([key, value], i) =>
          i === index ? [nextKey, value] : [key, value],
        ),
      );
    });

  const removeKey = (index: number) =>
    update((current) =>
      Object.fromEntries(Object.entries(current).filter((_, i) => i !== index)),
    );

  return (
    <SectionCard
      title="UI 문자열"
      description="사이트 공통 문구를 언어별로 관리합니다."
    >
      {rows.length === 0 ? (
        <p className="rounded-md border border-dashed border-neutral-200 px-3 py-6 text-center text-[12px] text-neutral-400">
          등록된 문자열이 없습니다. 아래에서 추가하세요.
        </p>
      ) : (
        rows.map(([key, value], index) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-md border border-neutral-200 p-3"
          >
            <div className="flex items-center gap-2">
              <TextInput
                aria-label={`키 ${index + 1}`}
                value={key}
                onChange={(event) => renameKey(index, event.target.value)}
                className="font-mono text-[12px]"
              />
              <button
                type="button"
                onClick={() => removeKey(index)}
                aria-label={`${key} 삭제`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-neutral-400 transition-colors outline-none hover:bg-neutral-100 hover:text-[#a51c1c] focus-visible:ring-2 focus-visible:ring-brand/30"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                  <path
                    d="M2 3.5h10M5.5 3.5V2h3v1.5M3.5 3.5l.6 8h5.8l.6-8"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <LocalizedField
              value={value}
              onChange={(next) => setEntry(index, next)}
            />
          </div>
        ))
      )}

      <button
        type="button"
        onClick={() =>
          update((current) => ({
            ...current,
            [uniqueKey(current, "newString")]: { ko: "", en: "" },
          }))
        }
        className="h-9 w-fit rounded-md border border-dashed border-neutral-300 bg-white px-3 text-[12px] font-semibold text-neutral-600 transition-colors outline-none hover:border-brand/40 hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/30"
      >
        문자열 추가
      </button>
    </SectionCard>
  );
}

function UiStringsPreview({ draft }: { draft: UiStringsEntity }) {
  const [locale, setLocale] = useState<"ko" | "en">("ko");
  const text = (key: string) =>
    draft[key] ? draft[key][locale] || draft[key].ko : `{${key}}`;

  return (
    <div className="flex flex-col gap-3">
      <div
        role="group"
        aria-label="미리보기 언어"
        className="flex w-fit items-center gap-1 rounded-md border border-neutral-200 p-0.5"
      >
        {(["ko", "en"] as const).map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={locale === code}
            className={`h-7 rounded px-2.5 text-[11px] font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand/30 ${
              locale === code
                ? "bg-brand text-white"
                : "text-neutral-500 hover:text-ink"
            }`}
          >
            {code.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="rounded-md border border-neutral-200 bg-white p-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-neutral-300 px-3 py-1 text-[11px] text-neutral-600">
            {text("search")}
          </span>
          <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-semibold text-white">
            {text("more")}
          </span>
          <span className="text-[11px] text-neutral-500">
            {text("prev")} / {text("next")}
          </span>
        </div>

        <div className="mt-3 rounded bg-paper px-3 py-2">
          <p className="text-[11px] text-neutral-500">
            {text("searchPlaceholder")}
          </p>
          <p className="mt-1 text-[11px] text-neutral-500">
            {text("noResults")}
          </p>
        </div>

        <div className="mt-3 flex items-center gap-2 text-[11px]">
          <span className="font-semibold text-brand">{text("contact")}</span>
          <span className="text-neutral-400">{text("close")}</span>
          <span className="text-neutral-400">{text("backToList")}</span>
        </div>
      </div>
    </div>
  );
}

export default function UiStringsEditor({
  initial,
  source,
  storeReady,
}: {
  initial: UiStringsEntity;
  source: EntitySource;
  storeReady: boolean;
}) {
  return (
    <EntityEditor
      entityKey={ENTITY_KEYS.uiStrings}
      label="UI strings"
      title="UI 문구"
      description="버튼, 안내 문구 등 사이트 공통 텍스트를 관리합니다."
      source={source}
      initial={initial}
      storeReady={storeReady}
      previewLabel="문구 적용 예시"
      form={(draft, update) => <UiStringsForm draft={draft} update={update} />}
      preview={(draft) => <UiStringsPreview draft={draft} />}
    />
  );
}
