"use client";

import { useEffect, useRef, useState } from "react";

import type { Localized } from "@/lib/content/merge";
import { adminDict } from "@/lib/i18n/admin";
import { useLocale } from "@/lib/i18n/client";
import { Field } from "./fields";
import { inputCls } from "./styles";

export type AttachmentValue = {
  url: string;
  name: Localized<string>;
  size: string;
};

const ACCEPT =
  "image/png,image/jpeg,image/gif,image/webp,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.hwp,.hwpx,.txt,.csv";

const IMAGE_URL = /\.(png|jpe?g|gif|webp|avif|svg)(?:[?#]|$)/i;

type UploadResponse = {
  url?: string;
  name?: string;
  size?: number;
  contentType?: string;
  error?: string;
};

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  const rounded =
    value >= 10 || unit === 0 ? Math.round(value) : value.toFixed(1);
  return `${rounded}${units[unit]}`;
}

export function fileNameFromUrl(url: string): string {
  try {
    const parsed = new URL(url, "https://example.invalid");
    const last = parsed.pathname.split("/").filter(Boolean).pop();
    return last ? decodeURIComponent(last) : "";
  } catch {
    return "";
  }
}

function displayName(name: Localized<string> | undefined): string {
  if (!name) return "";
  if (typeof name === "string") return name;
  return name.ko || name.en || "";
}

function isImageUrl(url: string): boolean {
  return IMAGE_URL.test(url);
}

export default function AttachmentField({
  label,
  hint,
  value,
  onChange,
  uploadConfigured,
}: {
  label: string;
  hint?: string;
  value: AttachmentValue;
  onChange: (next: AttachmentValue) => void;
  uploadConfigured: boolean;
}) {
  const locale = useLocale();
  const t = adminDict[locale].editor;
  const fileRef = useRef<HTMLInputElement>(null);
  const latest = useRef(value);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const [remote, setRemote] = useState<{ url: string; type: string } | null>(
    null,
  );

  const url = (value.url ?? "").trim();
  const name = displayName(value.name);
  const remoteType = remote?.url === url ? remote.type : null;
  const showImage =
    url.length > 0 &&
    (isImageUrl(url) || remoteType?.startsWith("image/") === true) &&
    failedUrl !== url;

  useEffect(() => {
    latest.current = value;
  }, [value]);

  // Best-effort size lookup for pasted URLs. Cross-origin servers without CORS
  // simply leave the size blank; uploads always provide the exact size.
  useEffect(() => {
    const target = url;
    if (!/^https?:\/\//i.test(target)) return;
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      void (async () => {
        try {
          const response = await fetch(target, {
            method: "HEAD",
            signal: controller.signal,
          });
          if (latest.current.url.trim() !== target) return;
          const contentType = response.headers.get("content-type");
          if (contentType) setRemote({ url: target, type: contentType });
          const length = response.headers.get("content-length");
          if (!length) return;
          const formatted = formatFileSize(Number(length));
          if (!formatted || formatted === latest.current.size) return;
          onChange({ ...latest.current, size: formatted });
        } catch {
          // CORS or network error — leave the size empty.
        }
      })();
    }, 400);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  function applyUrl(nextUrl: string) {
    onChange({
      url: nextUrl,
      name: fileNameFromUrl(nextUrl.trim()),
      size: "",
    });
    setError(null);
  }

  async function upload(file: File) {
    setBusy(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const data = (await response
        .json()
        .catch(() => null)) as UploadResponse | null;
      if (!response.ok || !data?.url) {
        setError(data?.error ?? t.uploadFailed);
        return;
      }
      if (data.contentType)
        setRemote({ url: data.url, type: data.contentType });
      onChange({
        url: data.url,
        name: data.name || file.name,
        size: formatFileSize(data.size ?? file.size),
      });
    } catch {
      setError(t.networkError);
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <Field label={label} hint={hint}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <input
            type="text"
            value={value.url ?? ""}
            placeholder={t.attachmentUrlPlaceholder}
            onChange={(event) => applyUrl(event.target.value)}
            className={inputCls}
            aria-label={t.attachmentUrl}
          />
          {uploadConfigured ? (
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
                accept={ACCEPT}
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void upload(file);
                }}
              />
            </>
          ) : null}
          {url ? (
            <button
              type="button"
              onClick={() => onChange({ url: "", name: "", size: "" })}
              className="h-9 shrink-0 rounded-[3px] border border-black/10 px-2 text-[11px] text-ink/50 transition-colors hover:text-ink"
            >
              {t.clear}
            </button>
          ) : null}
        </div>

        <p className="text-[10px] leading-[15px] text-ink/40">
          {t.attachmentLimitNote}
        </p>
        {uploadConfigured ? (
          <p className="text-[10px] leading-[15px] text-ink/35">
            {t.attachmentUploadHint}
          </p>
        ) : (
          <p className="text-[10px] leading-[15px] text-amber-700/80">
            {t.uploadNotConfiguredBody}
          </p>
        )}

        {error ? (
          <p
            role="alert"
            className="rounded-md border border-[#f0c2c2] bg-[#fdf3f3] px-2.5 py-1.5 text-[11px] text-[#a51c1c]"
          >
            {error}
          </p>
        ) : null}

        {url ? (
          <div className="flex items-center gap-2 rounded-[4px] border border-black/10 bg-paper/30 p-2">
            {showImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={url}
                src={url}
                alt={name || t.attachmentPreview}
                onError={() => setFailedUrl(url)}
                className="h-[64px] w-[96px] shrink-0 rounded-[3px] border border-black/5 bg-white object-contain"
              />
            ) : (
              <span
                className="flex h-[64px] w-[96px] shrink-0 items-center justify-center rounded-[3px] border border-black/5 bg-white text-ink/30"
                aria-hidden
              >
                <svg
                  width="26"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold text-ink">
                {name || fileNameFromUrl(url) || url}
              </p>
              <p className="text-[10px] text-ink/45">
                {value.size || t.attachmentSizeUnknown}
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-semibold text-brand underline-offset-2 hover:underline"
              >
                {t.attachmentOpen}
              </a>
            </div>
          </div>
        ) : (
          <p className="rounded-[4px] border border-dashed border-black/15 px-3 py-4 text-center text-[11px] text-ink/35">
            {t.attachmentNoPreview}
          </p>
        )}
      </div>
    </Field>
  );
}
