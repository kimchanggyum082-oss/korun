import Link from "next/link";
import type { JobPost } from "@/lib/data";

export default function JobList({ items }: { items: JobPost[] }) {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
          Service
        </p>
        <h1 className="text-[24px] font-bold text-ink">채용정보</h1>
        <p className="text-sm text-neutral-500">
          채용정보 게시글 {items.length}건입니다. 편집할 항목을 선택하세요.
        </p>
      </header>

      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <table className="w-full border-collapse text-left text-[12px]">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 text-[11px] text-neutral-500">
              <th className="px-3 py-2 font-semibold">No</th>
              <th className="px-3 py-2 font-semibold">제목</th>
              <th className="hidden px-3 py-2 font-semibold md:table-cell">
                작성자
              </th>
              <th className="hidden px-3 py-2 font-semibold sm:table-cell">
                작성일
              </th>
              <th className="hidden px-3 py-2 text-right font-semibold sm:table-cell">
                조회수
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.idx}
                className="border-b border-neutral-100 last:border-b-0 hover:bg-paper/60"
              >
                <td className="px-3 py-2 align-top text-neutral-400">
                  {item.no}
                </td>
                <td className="px-3 py-2 align-top">
                  <Link
                    href={`/admin/job-posting/${item.idx}`}
                    className="font-semibold text-ink outline-none hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/30"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-0.5 font-mono text-[10px] text-neutral-400">
                    {item.idx}
                  </p>
                </td>
                <td className="hidden px-3 py-2 align-top text-neutral-500 md:table-cell">
                  {item.author}
                </td>
                <td className="hidden px-3 py-2 align-top text-neutral-500 sm:table-cell">
                  {item.date}
                </td>
                <td className="hidden px-3 py-2 text-right align-top text-neutral-500 sm:table-cell">
                  {item.views}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
