import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { company, interestingItems } from "@/lib/data";
import TechNav from "@/components/layout/TechNav";
import PostActions from "@/components/layout/PostActions";

export const dynamicParams = false;

export function generateStaticParams() {
  return interestingItems.map((item) => ({ idx: item.idx }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idx: string }>;
}): Promise<Metadata> {
  const { idx } = await params;
  const item = interestingItems.find((p) => p.idx === idx);
  if (!item) return {};
  return {
    title: `${item.title} | ${company.name}`,
    description: item.body[0],
  };
}

export default async function InterestingItemDetailPage({
  params,
}: {
  params: Promise<{ idx: string }>;
}) {
  const { idx } = await params;
  const item = interestingItems.find((p) => p.idx === idx);
  if (!item) notFound();

  return (
    <>
      <TechNav activeHref="/technology/interesting-items" />

      {/* Page title banner */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-8 text-center md:px-6 md:py-10 pc:px-[15px] pc:py-[35px]">
          <p className="text-[16px] font-bold leading-[1.8] text-brand md:text-[20px]">
            신적이고 탁월한 아이템을 소개드립니다
          </p>
          <h1 className="mt-[12px] text-[26px] font-bold leading-[1.2] text-ink md:text-[34px] pc:mt-[16px] pc:text-[44px]">
            Interesting Items
          </h1>
        </div>
      </section>

      {/* Item detail */}
      <section className="mx-auto max-w-[900px] px-4 py-8 md:px-6 md:py-10 pc:px-[15px]">
        {/* Header */}
        <div className="border-b border-neutral-200 pb-4">
          <div className="flex items-start gap-3">
            <span className="mt-1 shrink-0 bg-neutral-800 px-2 py-0.5 text-[11px] font-semibold text-white">
              {item.category}
            </span>
            <h2 className="text-[18px] font-bold leading-[1.4] text-ink md:text-[22px]">
              {item.title}
            </h2>
          </div>
          <div className="mt-3 flex items-center gap-3 text-[12px] text-neutral-500 md:text-[13px]">
            <span className="font-semibold text-neutral-700">
              {item.author}
            </span>
            <span>·</span>
            <span>Interesting Items</span>
            <span>·</span>
            <span>{item.date}</span>
            <span>·</span>
            <span>조회 {item.views}</span>
          </div>
        </div>

        {/* Body */}
        <div className="py-6">
          <div className="space-y-3 text-[14px] leading-[1.7] text-ink md:text-[15px]">
            {item.body.map((line, i) => (
              <p key={i} className="whitespace-pre-line">
                {line}
              </p>
            ))}
          </div>

          {/* Attached files */}
          {item.files.length > 0 && (
            <div className="mt-8">
              <p className="mb-2 text-[13px] font-bold text-neutral-700 md:text-[14px]">
                첨부파일
              </p>
              <ul className="space-y-1.5">
                {item.files.map((file) => (
                  <li key={file.name}>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-[13px] text-brand hover:underline md:text-[14px]"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      {file.name}
                      <span className="text-neutral-400">({file.size})</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action bar */}
        <PostActions listHref="/technology/interesting-items" />
      </section>
    </>
  );
}
