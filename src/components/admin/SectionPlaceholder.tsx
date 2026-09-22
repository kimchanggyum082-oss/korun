import Link from "next/link";

export default function SectionPlaceholder({
  title,
  label,
  description,
}: {
  title: string;
  label: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
          {label}
        </p>
        <h1 className="text-[24px] font-bold text-ink">{title}</h1>
        <p className="text-sm text-neutral-500">{description}</p>
      </header>

      <div className="rounded-lg border border-dashed border-neutral-300 bg-white px-6 py-14 text-center">
        <span className="inline-flex h-7 items-center rounded-full bg-paper px-3 text-[12px] font-semibold text-brand">
          준비 중
        </span>
        <p className="mt-4 text-[15px] font-semibold text-ink">
          이 화면에는 아직 편집 도구가 연결되지 않았습니다.
        </p>
        <p className="mx-auto mt-1.5 max-w-md text-[13px] leading-relaxed text-neutral-500">
          콘텐츠 편집 기능은 다음 단계에서 추가됩니다. 그 전까지는 현재 공개된
          내용이 그대로 유지됩니다.
        </p>
        <Link
          href="/admin"
          className="mt-6 inline-flex h-9 items-center rounded-md border border-neutral-200 bg-white px-4 text-[13px] font-semibold text-neutral-600 transition-colors outline-none hover:border-neutral-300 hover:text-ink focus-visible:ring-2 focus-visible:ring-brand/30"
        >
          대시보드로 돌아가기
        </Link>
      </div>
    </div>
  );
}
