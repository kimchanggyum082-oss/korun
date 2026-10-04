"use client";

import { useState } from "react";
import type { EditableEntityKey, EntitySource } from "@/lib/admin/entities";
import { adminDict } from "@/lib/i18n/admin";
import { useLocale } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n/locales";

type SaveState = "clean" | "saving" | "saved" | "published" | "error";

export type UpdateDraft<T> = (updater: (current: T) => T) => void;

export default function EntityEditor<T>({
  entityKey,
  label,
  title,
  description,
  source,
  initial,
  storeReady,
  previewLabel,
  form,
  preview,
}: {
  entityKey: EditableEntityKey;
  label: string;
  title: string;
  description: string;
  source: EntitySource;
  initial: T;
  storeReady: boolean;
  previewLabel: string;
  form: (draft: T, update: UpdateDraft<T>) => React.ReactNode;
  preview: (draft: T, locale: Locale) => React.ReactNode;
}) {
  const locale = useLocale();
  const t = adminDict[locale].editor;
  const [draft, setDraft] = useState<T>(initial);
  const [state, setState] = useState<SaveState>("clean");
  const [message, setMessage] = useState<string | null>(null);
  const [previewLocale, setPreviewLocale] = useState<Locale>("ko");

  const sourceLabel: Record<EntitySource, string> = {
    draft: t.sourceDraft,
    published: t.sourcePublished,
    default: t.sourceDefault,
  };

  const update: UpdateDraft<T> = (updater) => {
    setDraft(updater);
    setState("clean");
    setMessage(null);
  };

  async function submit(action: "draft" | "publish") {
    setState("saving");
    setMessage(null);
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: entityKey, action, json: draft }),
      });
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!response.ok) {
        setState("error");
        setMessage(data?.error ?? t.failed);
        return;
      }
      setState(action === "publish" ? "published" : "saved");
    } catch {
      setState("error");
      setMessage(t.networkError);
    }
  }

  const busy = state === "saving";
  const disabled = busy || !storeReady;

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
                {label}
              </p>
              <span className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[11px] text-neutral-500">
                {entityKey}
              </span>
              <span className="rounded bg-paper px-1.5 py-0.5 text-[11px] font-semibold text-brand">
                {sourceLabel[source]}
              </span>
            </div>
            <h1 className="mt-1.5 text-[22px] font-bold text-ink">{title}</h1>
            <p className="mt-0.5 text-[13px] text-neutral-500">{description}</p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => void submit("draft")}
              disabled={disabled}
              className="h-9 rounded-md border border-neutral-300 bg-white px-3.5 text-[13px] font-semibold text-neutral-600 transition-colors outline-none hover:border-neutral-400 hover:text-ink focus-visible:ring-2 focus-visible:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? t.processing : t.saveDraft}
            </button>
            <button
              type="button"
              onClick={() => void submit("publish")}
              disabled={disabled}
              className="h-9 rounded-md bg-brand px-3.5 text-[13px] font-semibold text-white transition-colors outline-none hover:bg-ink focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t.publish}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[12px]">
          {state === "clean" && (
            <span className="text-neutral-400">{t.noChanges}</span>
          )}
          {state === "saved" && (
            <span className="font-semibold text-brand">{t.draftSaved}</span>
          )}
          {state === "published" && (
            <span className="font-semibold text-brand">{t.published}</span>
          )}
          {state === "error" && (
            <span role="alert" className="font-semibold text-[#a51c1c]">
              {message}
            </span>
          )}
        </div>

        {!storeReady && (
          <div className="rounded-lg border border-[#f0d9a8] bg-[#fdf8ee] px-4 py-3">
            <p className="text-[13px] font-semibold text-[#8a5a10]">
              {t.storeMissingTitle}
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-[#8a5a10]">
              {t.storeMissingBody}
            </p>
          </div>
        )}
      </header>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,460px)]">
        <div className="flex flex-col gap-4">{form(draft, update)}</div>

        <aside className="xl:sticky xl:top-20 xl:self-start">
          <div className="rounded-lg border border-neutral-200 bg-white">
            <header className="flex items-center justify-between gap-3 border-b border-neutral-100 px-4 py-2.5">
              <h2 className="text-[13px] font-semibold text-ink">
                {t.preview} · {previewLabel}
              </h2>
              <div className="flex items-center gap-3">
                <div
                  role="group"
                  aria-label={t.previewLanguage}
                  className="flex w-fit items-center gap-1 rounded-md border border-neutral-200 p-0.5"
                >
                  {(["ko", "en"] as const).map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setPreviewLocale(code)}
                      aria-pressed={previewLocale === code}
                      className={`h-7 rounded px-2.5 text-[11px] font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand/30 ${
                        previewLocale === code
                          ? "bg-brand text-white"
                          : "text-neutral-500 hover:text-ink"
                      }`}
                    >
                      {code.toUpperCase()}
                    </button>
                  ))}
                </div>
                <span className="text-[11px] text-neutral-400">
                  {t.previewLive}
                </span>
              </div>
            </header>
            <div className="px-4 py-4">{preview(draft, previewLocale)}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
