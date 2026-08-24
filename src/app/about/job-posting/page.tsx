import type { Metadata } from "next";
import Link from "next/link";
import { company, jobPosts } from "@/lib/data";
import AboutNav from "@/components/layout/AboutNav";

export const metadata: Metadata = {
  title: `Job Posting | ${company.name}`,
  description: `${company.name}의 채용 정보를 안내해 드립니다.`,
};

export default function JobPostingPage() {
  return (
    <>
      <AboutNav activeHref="/about/job-posting" />

      {/* Page title banner */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-8 text-center md:px-6 md:py-10 pc:px-[15px] pc:py-[35px]">
          <p className="text-[16px] font-bold leading-[1.8] text-brand md:text-[20px]">
            자사의 채용정보를 알려드립니다.
          </p>
          <h1 className="mt-[12px] text-[26px] font-bold leading-[1.2] text-ink md:text-[34px] pc:mt-[16px] pc:text-[44px]">
            Job Posting
          </h1>
        </div>
      </section>

      {/* Job board */}
      <section className="mx-auto max-w-[1280px] px-4 py-8 md:px-6 md:py-10 pc:px-[15px] pc:py-[35px]">
        <table className="w-full border-collapse text-[13px] md:text-[14px]">
          <thead>
            <tr className="border-b-2 border-ink">
              <th
                scope="col"
                className="w-10 py-2.5 text-center font-bold text-ink md:w-14"
              >
                No
              </th>
              <th scope="col" className="py-2.5 text-center font-bold text-ink">
                제목
              </th>
              <th
                scope="col"
                className="hidden w-20 py-2.5 text-center font-bold text-ink md:table-cell"
              >
                글쓴이
              </th>
              <th
                scope="col"
                className="w-20 py-2.5 text-center font-bold text-ink md:w-28"
              >
                작성시간
              </th>
              <th
                scope="col"
                className="hidden w-12 py-2.5 text-center font-bold text-ink md:table-cell"
              >
                조회수
              </th>
            </tr>
          </thead>
          <tbody>
            {jobPosts.map((post) => (
              <tr
                key={post.no}
                className="border-b border-neutral-200 transition-colors hover:bg-neutral-50"
              >
                <td className="py-2.5 text-center text-neutral-500">
                  {post.no}
                </td>
                <td className="py-2.5 text-left text-ink">
                  <Link
                    href={`/about/job-posting/${post.idx}`}
                    className="hover:text-brand hover:underline"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="hidden py-2.5 text-center text-neutral-500 md:table-cell">
                  {post.author}
                </td>
                <td className="py-2.5 text-center text-neutral-500">
                  {post.date}
                </td>
                <td className="hidden py-2.5 text-center text-neutral-500 md:table-cell">
                  {post.views}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Search */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search"
              className="w-40 border border-neutral-300 px-3 py-1.5 text-[13px] outline-none focus:border-brand md:w-56 md:text-[14px]"
            />
            <button
              type="button"
              className="bg-ink px-3 py-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-brand md:text-[14px]"
            >
              Search
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
