"use client";

import { useRef, useState } from "react";
import { normalizeMediaUrl } from "@/lib/content/registry-types";
import type { AdminDict } from "@/lib/i18n/admin";
import { inputCls } from "./styles";

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

/** Inline image URL input with preview + optional upload. */
export default function InlineImageInput({
  value,
  placeholder,
  onChange,
  uploadConfigured,
  onError,
  t,
  ariaLabel,
}: {
  value: string;
  placeholder?: string;
  onChange: (next: string) => void;
  uploadConfigured: boolean;
  onError: (message: string) => void;
  t: AdminDict["editor"];
  ariaLabel?: string;
}) {
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <input
          type="text"
          aria-label={ariaLabel}
          value={value}
          placeholder={placeholder || t.uploadPlaceholder}
          onChange={(event) => onChange(normalizeMediaUrl(event.target.value))}
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
              onChange={async (event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
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
