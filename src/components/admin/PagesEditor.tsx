"use client";

import { Fragment, useMemo, useRef, useState } from "react";
import { savePageContent } from "@/lib/admin/page-content-actions";
import {
  isSharedKind,
  normalizeMediaUrl,
  type ContentDef,
  type ContentGroup,
  type JsonFieldDef,
} from "@/lib/content/registry-types";
import {
  groupDefaults,
  resolveGroupContent,
} from "@/lib/content/registry/resolvers";
import { resolveSiteFromRows } from "@/lib/content/registry/site-resolve";
import { adminDict, type AdminDict } from "@/lib/i18n/admin";
import { useLocale } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n/locales";
import LinkPicker from "./LinkPicker";
import PageSectionPreview from "./PageSectionPreview";

export type ContentValues = Record<string, { ko?: string; en?: string }>;
type PreviewLang = Locale;

async function uploadFileToServer(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const response = await fetch("/api/admin/upload", {
    method: "POST",
    body: form,
  });
  const text = await response.text().catch(() => "");
  let data: { url?: string; error?: string } = {};
  try {
    data = text ? (JSON.parse(text) as { url?: string; error?: string }) : {};
  } catch {
    data = {};
  }
  if (!response.ok || !data.url) {
    throw new Error(
      data.error ?? `Server responded with HTTP ${response.status}`,
    );
  }
  return data.url;
}

const inputCls =
  "w-full rounded-[3px] border border-black/10 bg-white px-3 py-2 text-[13px] text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-brand";

function langDraftKey(key: string, locale: PreviewLang): string {
  return `${key}:${locale}`;
}

/** Section label of the first def, used to group the accordion. */
function sectionLabel(def: ContentDef, locale: Locale): string {
  return def.section[locale];
}

function defaultValue(map: Map<string, string>, key: string): string {
  return map.get(key) ?? "";
}

/**
 * Merge the defaults of every group referenced by the displayed defs, so
 * cross-group keys (e.g. site contact keys shown in the home location
 * section) still prefill with their own group's defaults.
 */
function mergeGroupDefaults(
  defs: ContentDef[],
  locale: Locale,
): Map<string, string> {
  const merged = new Map<string, string>();
  for (const defGroup of new Set(defs.map((def) => def.group))) {
    for (const [key, value] of groupDefaults(defGroup, locale)) {
      merged.set(key, value);
    }
  }
  return merged;
}

/* ── inline image control (URL or upload, with preview) ─────────────────── */

function InlineImageInput({
  value,
  placeholder,
  onChange,
  uploadConfigured,
  onError,
  t,
}: {
  value: string;
  placeholder?: string;
  onChange: (next: string) => void;
  uploadConfigured: boolean;
  onError: (message: string) => void;
  t: AdminDict["editor"];
}) {
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <input
          type="text"
          value={value}
          placeholder={placeholder || t.uploadPlaceholder}
          onChange={(e) => onChange(normalizeMediaUrl(e.target.value))}
          className={inputCls}
        />
        {uploadConfigured && (
          <>
            <button
              type="button"
              disabled={busy}
              onClick={() => fileRef.current?.click()}
              className="h-9 shrink-0 rounded-[3px] border border-black/10 px-2 text-[11px] font-semibold text-ink/60 transition-colors hover:border-black/20 disabled:opacity-50"
            >
              {busy ? t.uploading : t.upload}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) return;
                setBusy(true);
                try {
                  onChange(await uploadFileToServer(file));
                } catch (error) {
                  onError(
                    error instanceof Error ? error.message : t.uploadFailed,
                  );
                } finally {
                  setBusy(false);
                }
              }}
            />
          </>
        )}
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="h-9 shrink-0 rounded-[3px] border border-black/10 px-2 text-[11px] text-ink/50 transition-colors hover:text-ink"
          >
            {t.clear}
          </button>
        )}
      </div>
      {value ? (
        <div className="flex h-[96px] items-center justify-center overflow-hidden rounded-[3px] border border-black/10 bg-paper/40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="max-h-[96px] w-full object-contain"
          />
        </div>
      ) : (
        <p className="text-[11px] text-ink/40">{t.imageFallbackNote}</p>
      )}
    </div>
  );
}

/* ── generic list kind editor (rows of scalar fields) ────────────────────── */

function ListFieldInput({
  field,
  value,
  onChange,
  uploadConfigured,
  onError,
  t,
  hideLabel,
  rows = 3,
}: {
  field: JsonFieldDef;
  value: string;
  onChange: (next: string) => void;
  uploadConfigured: boolean;
  onError: (message: string) => void;
  t: AdminDict["editor"];
  hideLabel?: boolean;
  rows?: number;
}) {
  const multiline = field.kind === "textarea";
  return (
    <div className="flex flex-col gap-1">
      {hideLabel ? null : (
        <span className="text-[11px] font-semibold text-ink/50">
          {field.label.ko} / {field.label.en}
        </span>
      )}
      {field.kind === "image" ? (
        <InlineImageInput
          value={value}
          onChange={onChange}
          uploadConfigured={uploadConfigured}
          onError={onError}
          t={t}
        />
      ) : field.kind === "link" ? (
        <LinkPicker value={value} onChange={onChange} t={t} />
      ) : multiline ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        />
      )}
    </div>
  );
}

function ListEditor({
  def,
  value,
  onChange,
  uploadConfigured,
  onError,
  t,
}: {
  def: ContentDef;
  value: string;
  onChange: (next: string) => void;
  uploadConfigured: boolean;
  onError: (message: string) => void;
  t: AdminDict["editor"];
}) {
  const locale = useLocale();
  const fields = def.fields ?? [];
  const rows = useMemo<Record<string, string>[]>(() => {
    try {
      const parsed = value ? JSON.parse(value) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [value]);

  const commit = (next: Record<string, string>[]) =>
    onChange(JSON.stringify(next));

  const moveUp = (index: number) => {
    const next = [...rows];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    commit(next);
  };
  const moveDown = (index: number) => {
    const next = [...rows];
    [next[index + 1], next[index]] = [next[index], next[index + 1]];
    commit(next);
  };
  const removeRow = (index: number) =>
    commit(rows.filter((_, i) => i !== index));
  const setCell = (index: number, key: string, next: string) =>
    commit(
      rows.map((entry, i) => (i === index ? { ...entry, [key]: next } : entry)),
    );

  const addControl =
    def.maxItems === undefined || rows.length < def.maxItems ? (
      <button
        type="button"
        onClick={() =>
          commit([
            ...rows,
            Object.fromEntries(fields.map((field) => [field.key, ""])),
          ])
        }
        className="h-8 w-fit rounded-[3px] border border-dashed border-black/20 px-3 text-[12px] font-semibold text-ink/60 hover:border-brand/40 hover:text-brand"
      >
        + {t.add}
      </button>
    ) : (
      <p className="text-[11px] text-ink/40">
        {t.listMaxReached(def.maxItems)}
      </p>
    );

  // Fixed-column table layout (`variant: "table"`): one cell per field, the
  // column set comes from `fields` and cannot be changed — rows are dynamic.
  if (def.variant === "table") {
    return (
      <div className="flex flex-col gap-2">
        <div className="overflow-x-auto rounded-[4px] border border-black/10 bg-white">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-paper/60">
                <th
                  scope="col"
                  className="w-[36px] border-b border-black/10 px-2 py-1.5 text-left font-bold text-ink/40"
                >
                  #
                </th>
                {fields.map((field) => (
                  <th
                    key={field.key}
                    scope="col"
                    className="border-b border-black/10 px-2 py-1.5 text-left font-semibold text-ink/50"
                  >
                    {field.label[locale]}
                  </th>
                ))}
                <th
                  scope="col"
                  className="w-[104px] border-b border-black/10 px-2 py-1.5"
                />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-black/5 align-top last:border-b-0"
                >
                  <td className="px-2 py-2 text-[11px] font-bold text-ink/40">
                    {index + 1}
                  </td>
                  {fields.map((field) => (
                    <td key={field.key} className="px-2 py-2 align-top">
                      <ListFieldInput
                        field={field}
                        value={row[field.key] ?? ""}
                        onChange={(next) => setCell(index, field.key, next)}
                        uploadConfigured={uploadConfigured}
                        onError={onError}
                        t={t}
                        hideLabel
                        rows={2}
                      />
                    </td>
                  ))}
                  <td className="px-2 py-2 align-top">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => moveUp(index)}
                        className="h-6 w-6 rounded border border-black/10 text-[11px] disabled:opacity-30"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        disabled={index === rows.length - 1}
                        onClick={() => moveDown(index)}
                        className="h-6 w-6 rounded border border-black/10 text-[11px] disabled:opacity-30"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => removeRow(index)}
                        className="h-6 rounded border border-black/10 px-2 text-[11px] hover:text-[#a51c1c]"
                      >
                        {t.remove}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {addControl}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {rows.map((row, index) => (
        <div
          key={index}
          className="rounded-[4px] border border-black/10 bg-paper/40 p-3"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold text-ink/50">
              #{index + 1}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => moveUp(index)}
                className="h-6 w-6 rounded border border-black/10 text-[11px] disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                disabled={index === rows.length - 1}
                onClick={() => moveDown(index)}
                className="h-6 w-6 rounded border border-black/10 text-[11px] disabled:opacity-30"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => removeRow(index)}
                className="h-6 rounded border border-black/10 px-2 text-[11px] hover:text-[#a51c1c]"
              >
                {t.remove}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {fields.map((field) => (
              <ListFieldInput
                key={field.key}
                field={field}
                value={row[field.key] ?? ""}
                onChange={(next) => setCell(index, field.key, next)}
                uploadConfigured={uploadConfigured}
                onError={onError}
                t={t}
              />
            ))}
          </div>
        </div>
      ))}
      {addControl}
    </div>
  );
}

/* ── one content row (KO | EN, a shared URL/image, or a dynamic list) ───── */

function ContentRow({
  def,
  locale,
  drafts,
  koDefault,
  enDefault,
  placeholders,
  onDraft,
  onSave,
  onReset,
  pending,
  saved,
  uploadConfigured,
  onError,
  t,
}: {
  def: ContentDef;
  locale: Locale;
  drafts: { ko: string; en: string };
  koDefault: string;
  enDefault: string;
  placeholders: { ko: string; en: string };
  onDraft: (loc: PreviewLang, value: string) => void;
  onSave: () => void;
  onReset: () => void;
  pending: boolean;
  saved: boolean;
  uploadConfigured: boolean;
  onError: (message: string) => void;
  t: AdminDict["editor"];
}) {
  const shared = isSharedKind(def.kind);
  const isList = def.kind === "list" || def.kind === "imageList";
  const label = def.label[locale];
  const koId = `${def.key}-ko`;
  const enId = `${def.key}-en`;

  return (
    <div
      data-content-key={def.key}
      className="flex flex-col gap-2 rounded-[4px] border border-black/10 bg-white p-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[12px] font-semibold text-ink">{label}</p>
          <p className="mt-0.5 truncate font-mono text-[10px] text-ink/35">
            {def.key}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {saved && (
            <span className="text-[11px] font-semibold text-brand">
              {t.draftSaved}
            </span>
          )}
          {isList && !pending && (
            <button
              type="button"
              onClick={onReset}
              className="h-7 rounded-[3px] border border-black/10 px-2 text-[11px] text-ink/50 transition-colors hover:text-ink"
            >
              {t.resetToDefault}
            </button>
          )}
          <button
            type="button"
            onClick={onSave}
            disabled={pending}
            className="h-7 rounded-[3px] bg-brand px-3 text-[12px] font-semibold text-white transition-colors hover:bg-ink disabled:opacity-50"
          >
            {pending ? t.processing : t.save}
          </button>
        </div>
      </div>

      {isList ? (
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-semibold text-ink/50">
            {def.kind === "imageList" ? t.imageList : t.contentList}
          </span>
          <ListEditor
            def={def}
            value={drafts.ko}
            onChange={(next) => onDraft("ko", next)}
            uploadConfigured={uploadConfigured}
            onError={onError}
            t={t}
          />
          {def.kind === "imageList" ? (
            <p className="text-[11px] text-ink/40">{t.imageListNote}</p>
          ) : null}
        </div>
      ) : shared ? (
        def.kind === "image" ? (
          <InlineImageInput
            value={drafts.ko}
            placeholder={koDefault || t.uploadPlaceholder}
            onChange={(next) => onDraft("ko", next)}
            uploadConfigured={uploadConfigured}
            onError={onError}
            t={t}
          />
        ) : def.kind === "link" ? (
          <LinkPicker
            value={drafts.ko}
            onChange={(next) => onDraft("ko", next)}
            t={t}
          />
        ) : (
          <input
            type="text"
            value={drafts.ko}
            placeholder={placeholders.ko}
            onChange={(e) => onDraft("ko", e.target.value)}
            className={inputCls}
          />
        )
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {(["ko", "en"] as const).map((lang) => (
            <div key={lang} className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-ink/50">
                  {lang === "ko" ? t.korean : t.english}
                </span>
                {lang === "en" && drafts.ko && !drafts.en && (
                  <span className="rounded bg-paper px-1 text-[10px] font-semibold text-brand">
                    {t.enFallsBack}
                  </span>
                )}
              </div>
              {def.kind === "textarea" ? (
                <textarea
                  id={lang === "ko" ? koId : enId}
                  rows={4}
                  value={drafts[lang]}
                  placeholder={
                    (lang === "ko" ? koDefault : enDefault) ||
                    placeholders[lang]
                  }
                  onChange={(e) => onDraft(lang, e.target.value)}
                  className={inputCls}
                />
              ) : (
                <input
                  id={lang === "ko" ? koId : enId}
                  type="text"
                  value={drafts[lang]}
                  placeholder={
                    (lang === "ko" ? koDefault : enDefault) ||
                    placeholders[lang]
                  }
                  onChange={(e) => onDraft(lang, e.target.value)}
                  className={inputCls}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PagesEditor({
  group,
  defs,
  values,
  uploadConfigured,
}: {
  group: ContentGroup;
  defs: ContentDef[];
  values: ContentValues;
  uploadConfigured: boolean;
}) {
  const uiLocale = useLocale();
  const t = adminDict[uiLocale].editor;

  const koDefaults = useMemo(() => mergeGroupDefaults(defs, "ko"), [defs]);
  const enDefaults = useMemo(() => mergeGroupDefaults(defs, "en"), [defs]);

  const [drafts, setDrafts] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const def of defs) {
      const shared = isSharedKind(def.kind);
      // Image slots are override-only: empty means "keep the default image".
      // Every other kind falls back to the bundled default when the stored
      // value is missing or empty.
      const koStored = values[def.key]?.ko;
      init[langDraftKey(def.key, "ko")] =
        def.kind === "image"
          ? (koStored ?? "")
          : koStored || defaultValue(koDefaults, def.key);
      init[langDraftKey(def.key, "en")] = shared
        ? init[langDraftKey(def.key, "ko")]
        : values[def.key]?.en || defaultValue(enDefaults, def.key);
    }
    return init;
  });

  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [previewLang, setPreviewLang] = useState<PreviewLang>("ko");

  const sections = useMemo(() => {
    const out: { key: string; defs: ContentDef[] }[] = [];
    for (const def of defs) {
      const label = sectionLabel(def, uiLocale);
      const last = out[out.length - 1];
      if (last && last.key === label) last.defs.push(def);
      else out.push({ key: label, defs: [def] });
    }
    return out;
  }, [defs, uiLocale]);

  const previewRows = useMemo(() => {
    const rows: Record<string, { ko?: string; en?: string }> = {};
    for (const def of defs) {
      const ko = drafts[langDraftKey(def.key, "ko")] ?? "";
      rows[def.key] = {
        ko,
        en: isSharedKind(def.kind)
          ? ko
          : (drafts[langDraftKey(def.key, "en")] ?? ""),
      };
    }
    return rows;
  }, [defs, drafts]);

  const resolved = useMemo(
    () => resolveGroupContent(group, previewRows, previewLang),
    [group, previewRows, previewLang],
  );

  // The home location section surfaces site contact keys — resolve the preview
  // contact from the same drafts so edits show up in the preview immediately.
  const previewContact = useMemo(
    () => resolveSiteFromRows(previewRows, previewLang).settings,
    [previewRows, previewLang],
  );

  function onDraft(key: string, loc: PreviewLang, value: string) {
    const def = defs.find((entry) => entry.key === key);
    const shared = def ? isSharedKind(def.kind) : false;
    setDrafts((state) =>
      shared
        ? {
            ...state,
            [langDraftKey(key, "ko")]: value,
            [langDraftKey(key, "en")]: value,
          }
        : { ...state, [langDraftKey(key, loc)]: value },
    );
    setSavedKeys((state) => {
      if (!state.has(key)) return state;
      const next = new Set(state);
      next.delete(key);
      return next;
    });
  }

  async function saveRow(def: ContentDef) {
    setMessage(null);
    setPendingKey(def.key);
    try {
      const locales: ("ko" | "en")[] = isSharedKind(def.kind)
        ? ["ko"]
        : ["ko", "en"];
      for (const loc of locales) {
        const result = await savePageContent(
          def.key,
          loc,
          drafts[langDraftKey(def.key, loc)] ?? "",
        );
        if (!result.ok) throw new Error(result.message ?? t.failed);
      }
      setSavedKeys((state) => new Set(state).add(def.key));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t.failed);
    } finally {
      setPendingKey(null);
    }
  }

  async function resetRow(def: ContentDef) {
    setMessage(null);
    setPendingKey(def.key);
    try {
      const result = await savePageContent(def.key, "ko", "");
      if (!result.ok) throw new Error(result.message ?? t.failed);
      setDrafts((state) => ({
        ...state,
        [langDraftKey(def.key, "ko")]: defaultValue(koDefaults, def.key),
        [langDraftKey(def.key, "en")]: defaultValue(enDefaults, def.key),
      }));
      setSavedKeys((state) => new Set(state).add(def.key));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t.failed);
    } finally {
      setPendingKey(null);
    }
  }

  const activeKey = openSection ?? null;
  const openDef = defs.find((def) => sectionLabel(def, uiLocale) === activeKey);

  return (
    <div className="pc:flex pc:items-start pc:gap-5">
      <div className="min-w-0 pc:w-[53%] pc:shrink-0">
        <p className="mb-3 text-[13px] text-ink/60">{t.emptyValue}</p>
        {message && (
          <p className="mb-3 rounded-[3px] bg-[#fff4f4] px-3 py-2 text-[13px] text-[#ff4d4d]">
            {message}
          </p>
        )}
        {!uploadConfigured && (
          <p className="mb-3 rounded-[3px] bg-[#fdf8ee] px-3 py-2 text-[12px] text-[#8a5a10]">
            {t.uploadNotConfiguredBody}
          </p>
        )}

        <div className="space-y-2">
          {sections.map((section) => {
            const open = openSection === section.key;
            return (
              <Fragment key={section.key}>
                <div className="overflow-hidden rounded-[4px] border border-black/10 bg-white">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenSection(open ? null : section.key)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left"
                  >
                    <span className="text-[14px] font-bold text-ink">
                      {section.key}
                    </span>
                    <span
                      className={`text-[12px] text-ink/40 transition-transform ${open ? "rotate-180" : ""}`}
                    >
                      ▾
                    </span>
                  </button>
                  {open && (
                    <div className="space-y-3 border-t border-black/5 p-4">
                      {section.defs.map((def) => (
                        <ContentRow
                          key={def.key}
                          def={def}
                          locale={uiLocale}
                          drafts={{
                            ko: drafts[langDraftKey(def.key, "ko")] ?? "",
                            en: drafts[langDraftKey(def.key, "en")] ?? "",
                          }}
                          koDefault={defaultValue(koDefaults, def.key)}
                          enDefault={defaultValue(enDefaults, def.key)}
                          placeholders={{
                            ko: defaultValue(koDefaults, def.key),
                            en: defaultValue(enDefaults, def.key),
                          }}
                          onDraft={(loc, value) => onDraft(def.key, loc, value)}
                          onSave={() => void saveRow(def)}
                          onReset={() => void resetRow(def)}
                          pending={pendingKey === def.key}
                          saved={savedKeys.has(def.key)}
                          uploadConfigured={uploadConfigured}
                          onError={(message) => setMessage(message)}
                          t={t}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>

      {openSection !== null && openDef && resolved ? (
        <aside className="mt-6 pc:sticky pc:top-6 pc:mt-0 pc:flex pc:max-h-[calc(100dvh-48px)] pc:w-[43%] pc:min-w-[440px] pc:shrink-0 pc:flex-col">
          <div className="overflow-hidden rounded-[6px] border border-black/10 bg-white pc:flex pc:min-h-0 pc:flex-col">
            <div className="flex items-center justify-between border-b border-black/10 px-3 py-2 pc:shrink-0">
              <span className="text-[12px] font-bold text-ink">
                {t.preview}
              </span>
              <div className="flex items-center gap-0.5 rounded-full bg-black/5 p-0.5 text-[11px]">
                {(["ko", "en"] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setPreviewLang(lang)}
                    aria-pressed={previewLang === lang}
                    className={`rounded-full px-2.5 py-1 transition-colors ${
                      previewLang === lang
                        ? "bg-brand font-bold text-white"
                        : "text-ink/60 hover:text-ink"
                    }`}
                  >
                    {lang === "ko" ? t.korean : t.english}
                  </button>
                ))}
              </div>
            </div>
            <div className="max-h-[82vh] overflow-y-auto pc:min-h-0 pc:max-h-none pc:flex-1">
              <PageSectionPreview
                group={group}
                sectionDef={openDef}
                content={resolved}
                contact={previewContact}
                locale={previewLang}
              />
            </div>
          </div>
        </aside>
      ) : null}
    </div>
  );
}
