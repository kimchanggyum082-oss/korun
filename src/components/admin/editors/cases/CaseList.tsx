import Link from "next/link";
import type { CasePageData } from "@/lib/data";

export default function CaseList({
  pages,
}: {
  pages: Record<string, CasePageData>;
}) {
  const entries = Object.entries(pages);
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
          Cases
        </p>
        <h1 className="text-[24px] font-bold text-ink">적용 사례</h1>
        <p className="text-sm text-neutral-500">
          적용 사례 5종의 히어로, 본문, 갤러리를 관리합니다. 편집할 사례를
          선택하세요.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {entries.map(([slug, page]) => (
          <Link
            key={slug}
            href={`/admin/cases/${slug}`}
            className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-white p-4 transition-colors outline-none hover:border-brand/40 focus-visible:ring-2 focus-visible:ring-brand/30"
          >
            <div className="flex items-center gap-2">
              <span className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[11px] text-neutral-500">
                case:{slug}
              </span>
              <span className="text-[11px] text-neutral-400">
                갤러리 {page.galleryImages?.length ?? 0}장
              </span>
            </div>
            <p className="text-[15px] font-bold text-ink">{page.title}</p>
            <p className="line-clamp-2 text-[12px] leading-relaxed text-neutral-500">
              {page.subtitle}
            </p>
            <span className="mt-1 text-[12px] font-semibold text-brand">
              편집하기 →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
