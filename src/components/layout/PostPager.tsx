import Link from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "@/components/service/ServiceIcons";

export type PostPagerItem = { idx: string; title: string; date?: string };

function orderedItems(items: PostPagerItem[]): PostPagerItem[] {
  const anyDate = items.some((i) => i.date);
  if (!anyDate) return items;
  return [...items].sort((a, b) => {
    const da = a.date ?? "";
    const db = b.date ?? "";
    if (da === db) return 0;
    return da < db ? 1 : -1;
  });
}

export default function PostPager({
  items,
  currentIdx,
  basePath,
}: {
  items: PostPagerItem[];
  currentIdx: string;
  basePath: string;
}) {
  const ordered = orderedItems(items);
  const index = ordered.findIndex((i) => i.idx === currentIdx);
  const prev = index > 0 ? ordered[index - 1] : null;
  const next =
    index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null;
  const rows = [
    prev ? { item: prev, direction: "up" as const } : null,
    next ? { item: next, direction: "down" as const } : null,
  ].filter(Boolean) as { item: PostPagerItem; direction: "up" | "down" }[];

  const rowClass =
    "flex items-center border-b border-[rgba(128,128,128,0.2)] px-[12px] py-[10px] text-[14px] leading-[22.4px] text-ink";

  return (
    <div className="mb-[24px] pc:mt-[32px]">
      {/* PC */}
      <div className="hidden pc:block">
        {rows.length > 0 && (
          <div>
            {rows.map((row, i) => (
              <Link
                key={row.item.idx}
                href={`${basePath}/${row.item.idx}`}
                className={`${rowClass} ${
                  i === 0 && rows.length > 1
                    ? "border-t border-t-[rgba(128,128,128,0.2)]"
                    : ""
                } ${i > 0 ? "-mt-px" : ""}`}
              >
                {row.direction === "up" ? <ArrowUpIcon /> : <ArrowDownIcon />}
                <span className="truncate pl-[30px]">{row.item.title}</span>
              </Link>
            ))}
          </div>
        )}
        <div className="pt-[12px]">
          <Link
            href={basePath}
            className="inline-block h-[32px] border border-[#363636] bg-[#363636] px-5 py-[6px] text-[12px] leading-[18px] text-white"
          >
            목록
          </Link>
        </div>
      </div>

      {/* Mobile */}
      <nav aria-label="이전글 다음글" className="-mx-[15px] pc:hidden">
        <div className="mt-[32px]">
          {rows.map((row, i) => (
              <Link
                key={row.item.idx}
                href={`${basePath}/${row.item.idx}`}
                className={`relative block px-[12px] py-[8px] text-[14px] leading-[22.4px] text-ink ${
                  i > 0 ? "-mt-px" : ""
                }`}
                style={{
                  borderBottom: "1px solid rgba(128,128,128,0.2)",
                  borderTop:
                    i === 0 && rows.length > 1
                      ? "1px solid rgba(128,128,128,0.2)"
                      : undefined,
                }}
              >
                {row.direction === "up" ? (
                  <ArrowUpIcon className="absolute top-1/2 left-[12px] -mt-[7px] h-[14px] w-[14px]" />
                ) : (
                  <ArrowDownIcon className="absolute top-1/2 left-[12px] -mt-[7px] h-[14px] w-[14px]" />
                )}
                <span
                  className="block truncate"
                  style={{ paddingLeft: "45px" }}
                >
                  {row.item.title}
                </span>
              </Link>
          ))}
        </div>
        <div className="px-[15px] pt-[12px]">
          <Link
            href={basePath}
            className="inline-block h-[32px] border border-[#363636] bg-[#363636] px-5 py-[6px] text-center text-[12px] leading-[18px] text-white"
          >
            목록
          </Link>
        </div>
      </nav>
    </div>
  );
}
