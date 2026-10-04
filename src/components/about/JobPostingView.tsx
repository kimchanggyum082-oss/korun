import Link from "next/link";

import { MagnifierIcon } from "@/components/service/ServiceIcons";
import type { AboutContentMap, JobPost } from "@/lib/data";
import type { ChromeDict } from "@/lib/i18n/chrome";
import { defaultLocale, localizeHref, type Locale } from "@/lib/i18n/locales";

export type JobPostingViewProps = {
  t: ChromeDict;
  locale?: Locale;
  content: AboutContentMap["job-posting"];
  jobPosts: JobPost[];
};

export default function JobPostingView({
  t,
  locale = defaultLocale,
  content,
  jobPosts,
}: JobPostingViewProps) {
  return (
    <>
      {/* Page title banner */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col px-[15px] py-[50px] text-center pc:py-[80px]">
          <div className="my-[7.5px] pc:my-0 pc:py-[15px]">
            <p className="text-[15px] leading-[24px] font-bold pc:leading-[30px]">
              <span className="pc:hidden" style={{ color: "rgb(0, 53, 29)" }}>
                {content.detailTaglineMobile}
              </span>
              <span className="hidden text-brand pc:inline pc:text-[22px] pc:leading-[26.4px]">
                {content.detailTaglineDesktop}
              </span>
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
                  href={localizeHref(`/about/job-posting/${post.idx}`, locale)}
                  className="absolute inset-0"
                  aria-label={post.title}
                />
                <div className="pr-[45px] text-[15px] leading-[21px] text-ink break-keep [overflow-wrap:break-word]">
                  <span className="text-[18px] leading-[25.2px]">
                    {"\u200b"}
                  </span>
                  <Link
                    href={localizeHref(
                      `/about/job-posting/${post.idx}`,
                      locale,
                    )}
                    className="text-[14px] leading-[19.6px]"
                  >
                    {post.title}
                  </Link>
                </div>
                <div className="flex text-[12px] leading-[19.2px] text-[rgba(54,54,54,0.65)]">
                  <span className="pr-[10px] pt-[5px]">{post.author}</span>
                  <span className="pr-[10px] pt-[5px]">{post.date}</span>
                  <span className="pr-[10px] pt-[5px]">
                    {t.post.views(post.views)}
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
              <tr className="border-t border-b border-t-ink border-b-[rgba(54,54,54,0.15)]">
                <th
                  scope="col"
                  className="w-[5%] py-2.5 text-center font-normal text-ink"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="py-2.5 text-center font-normal text-ink"
                >
                  {t.board.title}
                </th>
                <th
                  scope="col"
                  className="w-[10%] py-2.5 text-center font-normal text-ink"
                >
                  {t.board.author}
                </th>
                <th
                  scope="col"
                  className="w-[12%] py-2.5 text-center font-normal text-ink"
                >
                  {t.board.date}
                </th>
                <th
                  scope="col"
                  className="w-[10%] py-2.5 text-center font-normal text-ink"
                >
                  {t.board.views}
                </th>
                <th
                  scope="col"
                  className="w-[7%] py-2.5 text-center font-normal text-ink"
                >
                  {t.board.likes}
                </th>
              </tr>
            </thead>
            <tbody>
              {jobPosts.map((post) => (
                <tr
                  key={post.no}
                  className="border-b border-[rgba(54,54,54,0.15)] transition-colors hover:bg-neutral-50"
                >
                  <td className="pt-2.5 pb-[11px] text-center text-[12px] leading-[19.2px] text-[rgba(54,54,54,0.65)]">
                    {post.no}
                  </td>
                  <td className="pt-2.5 pb-[11px] text-left text-[14px] text-ink">
                    <Link
                      href={localizeHref(
                        `/about/job-posting/${post.idx}`,
                        locale,
                      )}
                      className="leading-[22.4px] hover:text-brand hover:underline"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="pt-2.5 pb-[11px] pl-[7px] text-left text-[12px] leading-[19.2px] text-[rgba(54,54,54,0.65)]">
                    {post.author}
                  </td>
                  <td className="pt-2.5 pb-[11px] text-center text-[12px] leading-[19.2px] text-[rgba(54,54,54,0.65)]">
                    {post.date}
                  </td>
                  <td className="pt-2.5 pb-[11px] text-center text-[12px] leading-[19.2px] text-[rgba(54,54,54,0.65)]">
                    {post.views}
                  </td>
                  <td className="pt-2.5 pb-[11px] text-center text-[12px] leading-[19.2px] text-[rgba(54,54,54,0.65)]">
                    0
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Search */}
          <div className="mt-6 hidden justify-center pc:mt-[15px] pc:flex pc:pb-[6px]">
            <form className="relative h-[34px] w-[220px]" role="search">
              <input
                type="text"
                name="keyword"
                placeholder="Search"
                aria-label={t.search.label}
                className="h-[34px] w-full border border-[rgba(0,0,0,0.1)] bg-white px-3 py-[6px] text-[14px] leading-[20px] text-[#212121] outline-none placeholder:text-[#999]"
              />
              <button
                type="submit"
                aria-label={t.search.submit}
                className="absolute right-1 top-0 flex h-[34px] w-[23px] items-center justify-center text-[#212121]"
              >
                <MagnifierIcon />
              </button>
            </form>
          </div>
        </div>

        {/* Trailing spacer row */}
        <div className="h-[55px] pt-[7.5px] pb-[7.5px] pc:hidden" />
        <div className="hidden pc:block pc:h-[111px]" />
      </section>
    </>
  );
}
