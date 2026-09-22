import type { Metadata } from "next";
import { getAboutPage } from "@/lib/content";
import AboutNav from "@/components/layout/AboutNav";
import JobPostingView from "@/components/about/JobPostingView";

export async function generateMetadata(): Promise<Metadata> {
  const { company } = await getAboutPage("job-posting");
  return {
    title: `Job Posting | ${company.name}`,
    description: `${company.name}의 채용 정보를 안내해 드립니다.`,
  };
}

export default async function JobPostingPage() {
  const { content, jobPosts } = await getAboutPage("job-posting");
  return (
    <>
      <AboutNav activeHref="/about/job-posting" />
      <JobPostingView content={content} jobPosts={jobPosts} />
    </>
  );
}
