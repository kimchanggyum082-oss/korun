"use client";

import { useRef, useState } from "react";
import { Field, TextInput, inputClass } from "./fields";

export default function ImageField({
  label,
  value,
  onChange,
  hint,
  uploadConfigured,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  hint?: string;
  uploadConfigured: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function upload(file: File) {
    setBusy(true);
    setError(null);
    setInfo(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const data = (await response.json().catch(() => null)) as {
        url?: string;
        width?: number | null;
        height?: number | null;
        error?: string;
      } | null;
      if (!response.ok || !data?.url) {
        setError(data?.error ?? "업로드에 실패했습니다.");
        return;
      }
      onChange(data.url);
      setInfo(
        data.width && data.height
          ? `업로드 완료 · ${data.width}×${data.height}px`
          : "업로드 완료",
      );
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <Field label={label} hint={hint}>
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <TextInput
            type="url"
            value={value}
            placeholder="https://… 또는 아래 업로드 사용"
            onChange={(event) => onChange(event.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="h-9 shrink-0 rounded-md border border-neutral-300 bg-white px-3 text-[12px] font-semibold text-neutral-600 transition-colors outline-none hover:border-neutral-400 hover:text-ink focus-visible:ring-2 focus-visible:ring-brand/30 disabled:opacity-60"
        >
          {busy ? "업로드 중…" : "파일 업로드"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void upload(file);
          }}
        />
      </div>

      {!uploadConfigured && (
        <p className="text-[11px] text-neutral-400">
          BLOB_READ_WRITE_TOKEN이 없어 업로드를 사용할 수 없습니다. 이미지 URL을
          직접 입력해 주세요.
        </p>
      )}

      {info && <p className="text-[11px] text-brand">{info}</p>}
      {error && (
        <p
          role="alert"
          className="rounded-md border border-[#f0c2c2] bg-[#fdf3f3] px-2.5 py-1.5 text-[11px] text-[#a51c1c]"
        >
          {error}
        </p>
      )}

      {value && (
        <div className="mt-1 flex items-center gap-2">
          <div
            className="h-[54px] w-[96px] shrink-0 rounded border border-neutral-200 bg-neutral-50"
            style={{
              backgroundImage: `url("${value.replace(/"/g, "%22")}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden
          />
          <span className={`${inputClass} truncate`}>{value}</span>
        </div>
      )}
    </Field>
  );
}
