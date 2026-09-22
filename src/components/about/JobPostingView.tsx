import Link from "next/link";

import type { getAboutPage } from "@/lib/content";
import type { AboutJobPostingEntity } from "@/lib/admin/entities";

type AboutPageData = Awaited<ReturnType<typeof getAboutPage>>;

export type JobPostingViewProps = {
  content: AboutJobPostingEntity["content"];
  jobPosts: AboutPageData["jobPosts"];
};

export default function JobPostingView({
  content,
  jobPosts,
}: JobPostingViewProps) {
  return (
    <>
      {/* Page title banner */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col px-[15px] py-[50px] text-center pc:py-[80px]">
          <div className="my-[7.5px] pc:my-0 pc:py-[15px]">
            <p className="text-[15px] leading-[24px] font-bold text-brand pc:text-[22px] pc:leading-[31px]">
              {content.tagline}
            </p>
          </div>
          <div className="my-[7.5px] pc:my-0 pc:pt-[20px] pc:pb-[10px]">
            <h1 className="text-[30px] leading-[36px] font-bold text-ink pc:text-[50px] pc:leading-[60px]">
              {content.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Job board */}
      <section className="mx-auto max-w-[1280px] px-[15px] pc:py-0">
        <div className="pt-[7.5px] pb-[7.5px] pc:py-[15px]">
          {/* Mobile list */}
          <ul className="border-t border-[rgba(54,54,54,0.15)] pc:hidden">
            {jobPosts.map((post) => (
              <li
                key={post.no}
                className="relative border-b border-[rgba(54,54,54,0.15)] px-[15px] pt-[10px] pb-[15px]"
              >
                <Link
                  href={`/about/job-posting/${post.idx}`}
                  className="absolute inset-0"
                  aria-label={post.title}
                />
                <div className="pr-[45px] text-[15px] leading-[21px] text-ink break-keep [overflow-wrap:break-word]">
                  <span className="text-[18px] leading-[25.2px]">
                    {"\u200b"}
                  </span>
                  <Link
                    href={`/about/job-posting/${post.idx}`}
                    className="text-[14px] leading-[19.6px]"
                  >
                    {post.title}
                  </Link>
                </div>
                <div className="flex text-[12px] leading-[19.2px] text-[rgba(54,54,54,0.65)]">
                  <span className="pr-[10px] pt-[5px]">{post.author}</span>
                  <span className="pr-[10px] pt-[5px]">{post.date}</span>
                  <span className="pr-[10px] pt-[5px]">
                    조회수 {post.views}
                  </span>
                  <span className="pr-[10px] pt-[5px]">♡ 0</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="pt-[10px] pc:hidden" />

          {/* Desktop table */}
          <table className="hidden w-full border-collapse text-[15px] leading-[24px] pc:table">
            <thead>
              <tr className="border-b-2 border-ink">
                <th
                  scope="col"
                  className="w-[5%] py-2.5 text-center font-bold text-ink"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="py-2.5 text-center font-bold text-ink"
                >
                  제목
                </th>
                <th
                  scope="col"
                  className="w-[10%] py-2.5 text-center font-bold text-ink"
                >
                  글쓴이
                </th>
                <th
                  scope="col"
                  className="w-[12%] py-2.5 text-center font-bold text-ink"
                >
                  작성시간
                </th>
                <th
                  scope="col"
                  className="w-[10%] py-2.5 text-center font-bold text-ink"
                >
                  조회수
                </th>
                <th
                  scope="col"
                  className="w-[7%] py-2.5 text-center font-bold text-ink"
                >
                  좋아요
                </th>
              </tr>
            </thead>
            <tbody>
              {jobPosts.map((post) => (
                <tr
                  key={post.no}
                  className="border-b border-neutral-200 transition-colors hover:bg-neutral-50"
                >
                  <td className="py-2.5 text-center text-[12px] text-neutral-500">
                    {post.no}
                  </td>
                  <td className="py-2.5 text-left text-[14px] text-ink">
                    <Link
                      href={`/about/job-posting/${post.idx}`}
                      className="hover:text-brand hover:underline"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="py-2.5 text-center text-[12px] text-neutral-500">
                    {post.author}
                  </td>
                  <td className="py-2.5 text-center text-[12px] text-neutral-500">
                    {post.date}
                  </td>
                  <td className="py-2.5 text-center text-[12px] text-neutral-500">
                    {post.views}
                  </td>
                  <td className="py-2.5 text-center text-[12px] text-neutral-500">
                    0
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Search */}
          <div className="mt-6 hidden justify-center pc:mt-[15px] pc:flex pc:pb-[6px]">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search"
                className="w-40 border border-neutral-300 px-3 py-1.5 text-[13px] outline-none focus:border-brand pc:w-[220px] pc:text-[14px]"
              />
              <button
                type="button"
                className="bg-ink px-3 py-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-brand pc:text-[14px]"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Trailing spacer row */}
        <div className="h-[55px] pt-[7.5px] pb-[7.5px] pc:hidden" />
        <div className="hidden pc:block pc:h-[110px]" />
      </section>
    </>
  );
}
