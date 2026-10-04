"use client";

import { useEffect, useRef, useState } from "react";
import {
  LINK_OPTION_GROUPS,
  LINK_OPTION_MAP,
} from "@/lib/content/registry/links";
import type { AdminDict } from "@/lib/i18n/admin";
import { useLocale } from "@/lib/i18n/client";

/**
 * General link picker used by every `kind: "link"` key/field in the admin.
 * Labels follow the admin UI language; search matches both languages and the
 * path, and a typed path/URL can be used directly as an escape hatch.
 */

const inputCls =
  "w-full rounded-[3px] border border-black/10 bg-white px-3 py-2 text-[13px] text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-brand";

export default function LinkPicker({
  value,
  onChange,
  t,
}: {
  value: string;
  onChange: (next: string) => void;
  t: AdminDict["editor"];
}) {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const current = LINK_OPTION_MAP.get(value);
  const q = query.trim().toLowerCase();
  const groups = LINK_OPTION_GROUPS.map((group) => ({
    ...group,
    options: q
      ? group.options.filter((option) =>
          `${option.label.ko} ${option.label.en} ${option.href}`
            .toLowerCase()
            .includes(q),
        )
      : group.options,
  })).filter((group) => group.options.length > 0);
  const typed = query.trim();
  const directCandidate =
    typed && !LINK_OPTION_MAP.has(typed) && /^(\/|#|https?:\/\/)/.test(typed)
      ? typed
      : null;

  const pick = (next: string) => {
    onChange(next);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => {
          setOpen(!open);
          setQuery("");
        }}
        className="flex w-full items-center justify-between gap-2 rounded-[3px] border border-black/10 bg-white px-3 py-2 text-left text-[13px] text-ink transition-colors hover:border-black/20 focus:border-brand"
      >
        <span className="min-w-0 truncate">
          {current ? (
            <>
              <span>{current.label[locale]}</span>{" "}
              <span className="font-mono text-[11px] text-ink/40">
                {current.href}
              </span>
            </>
          ) : (
            <span className={value ? "font-mono text-[12px]" : "text-ink/40"}>
              {value || t.linkNone}
            </span>
          )}
        </span>
        <span className="shrink-0 text-[10px] text-ink/40">▾</span>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-[4px] border border-black/10 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
          <div className="border-b border-black/5 p-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.linkSearch}
              className={inputCls}
            />
          </div>
          <div className="max-h-[240px] overflow-y-auto py-1">
            {groups.map((group) => (
              <div key={group.label.ko}>
                <p className="px-3 pt-2 pb-1 text-[10px] font-bold tracking-wide text-ink/35 uppercase">
                  {group.label[locale]}
                </p>
                <ul>
                  {group.options.map((option) => (
                    <li key={option.href}>
                      <button
                        type="button"
                        onClick={() => pick(option.href)}
                        className={`flex w-full items-center justify-between gap-3 px-3 py-1.5 text-left text-[12px] transition-colors hover:bg-paper ${
                          option.href === value
                            ? "bg-paper/60 font-bold text-brand"
                            : "text-ink"
                        }`}
                      >
                        <span className="truncate">{option.label[locale]}</span>
                        <span className="shrink-0 font-mono text-[10px] text-ink/35">
                          {option.href}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {directCandidate && (
              <div className="border-t border-black/5">
                <button
                  type="button"
                  onClick={() => pick(directCandidate)}
                  className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-[12px] text-brand transition-colors hover:bg-paper"
                >
                  <span>{t.linkDirect}</span>
                  <span className="shrink-0 truncate font-mono text-[10px] text-ink/50">
                    {directCandidate}
                  </span>
                </button>
              </div>
            )}
            {groups.length === 0 && !directCandidate && (
              <p className="px-3 py-3 text-[12px] text-ink/40">
                {t.linkNoResults}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
