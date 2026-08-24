import Link from "next/link";

export default function PostPager({
  items,
  currentIdx,
  basePath,
}: {
  items: { idx: string; title: string }[];
  currentIdx: string;
  basePath: string;
}) {
  const index = items.findIndex((i) => i.idx === currentIdx);
  const prev = index > 0 ? items[index - 1] : null;
  const next = index >= 0 && index < items.length - 1 ? items[index + 1] : null;

  return (
    <nav
      aria-label="이전글 다음글"
      className="mt-10 border-t border-neutral-200 pt-2"
    >
      {/* 이전글 */}
      {prev ? (
        <Link
          href={`${basePath}/${prev.idx}`}
          className="flex items-center gap-4 border-b border-neutral-100 px-1 py-4 transition-colors hover:bg-neutral-50"
        >
          <span className="flex w-16 shrink-0 items-center gap-1 text-[12px] font-semibold text-neutral-400">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
            이전글
          </span>
          <span className="truncate text-[14px] text-ink">{prev.title}</span>
        </Link>
      ) : (
        <div className="flex items-center gap-4 border-b border-neutral-100 px-1 py-4">
          <span className="flex w-16 shrink-0 items-center gap-1 text-[12px] font-semibold text-neutral-300">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
            이전글
          </span>
          <span className="text-[14px] text-neutral-300">
            이전 글이 없습니다
          </span>
        </div>
      )}

      {/* 다음글 */}
      {next ? (
        <Link
          href={`${basePath}/${next.idx}`}
          className="flex items-center gap-4 px-1 py-4 transition-colors hover:bg-neutral-50"
        >
          <span className="flex w-16 shrink-0 items-center gap-1 text-[12px] font-semibold text-neutral-400">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
            다음글
          </span>
          <span className="truncate text-[14px] text-ink">{next.title}</span>
        </Link>
      ) : (
        <div className="flex items-center gap-4 px-1 py-4">
          <span className="flex w-16 shrink-0 items-center gap-1 text-[12px] font-semibold text-neutral-300">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
            다음글
          </span>
          <span className="text-[14px] text-neutral-300">
            다음 글이 없습니다
          </span>
        </div>
      )}
    </nav>
  );
}
