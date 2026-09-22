"use client";

import { readLocalized, type LocalizedValue } from "@/components/admin/fields";
import type { Localized } from "@/lib/content/merge";

export function toLocalized(next: LocalizedValue): Localized<string> {
  const { ko, en } = readLocalized(next);
  return en.length > 0 ? { ko, en } : ko;
}

export function PreviewCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-white p-3">
      <p className="text-[10px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
        {title}
      </p>
      {children}
    </div>
  );
}

export function bgStyle(src: string): React.CSSProperties | undefined {
  return src ? { backgroundImage: `url("${src}")` } : undefined;
}

export function moveAt<T>(list: T[], index: number, delta: number): T[] {
  const target = index + delta;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(index, 1);
  next.splice(target, 0, item);
  return next;
}

export function removeAt<T>(list: T[], index: number): T[] {
  return list.filter((_, i) => i !== index);
}

export function replaceAt<T>(list: T[], index: number, value: T): T[] {
  return list.map((item, i) => (i === index ? value : item));
}

export function MoveButtons({
  index,
  count,
  onMove,
  onRemove,
}: {
  index: number;
  count: number;
  onMove: (index: number, delta: number) => void;
  onRemove: (index: number) => void;
}) {
  const base =
    "flex h-7 w-7 items-center justify-center rounded-md border border-neutral-200 text-[13px] leading-none text-neutral-500 transition-colors outline-none hover:border-neutral-300 hover:text-ink focus-visible:ring-2 focus-visible:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-40";
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        aria-label="위로 이동"
        className={base}
        disabled={index === 0}
        onClick={() => onMove(index, -1)}
      >
        ↑
      </button>
      <button
        type="button"
        aria-label="아래로 이동"
        className={base}
        disabled={index === count - 1}
        onClick={() => onMove(index, 1)}
      >
        ↓
      </button>
      <button
        type="button"
        aria-label="삭제"
        className={`${base} hover:text-[#a51c1c]`}
        onClick={() => onRemove(index)}
      >
        ✕
      </button>
    </div>
  );
}

export function AddButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-9 w-fit rounded-md border border-dashed border-neutral-300 bg-white px-3 text-[12px] font-semibold text-neutral-600 transition-colors outline-none hover:border-brand/40 hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/30"
    >
      {children}
    </button>
  );
}
