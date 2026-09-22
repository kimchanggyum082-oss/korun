import type { Metadata } from "next";
import { getAboutPage, resolveActiveLocale } from "@/lib/content";
import AboutNav from "@/components/layout/AboutNav";
import JobPostingView from "@/components/about/JobPostingView";
import { getChrome } from "@/lib/i18n/server";
import { metadataAlternates } from "@/lib/i18n/seo";
import { pagesAbout } from "@/lib/i18n/pages-about";

export async function generateMetadata(): Promise<Metadata> {
  const [{ company }, locale] = await Promise.all([
    getAboutPage("job-posting"),
    resolveActiveLocale(),
  ]);
  const copy = pagesAbout[locale];
  return {
    title: copy.about.jobPosting.meta.title(company.name),
    description: copy.about.jobPosting.meta.description(company.name),
    alternates: metadataAlternates("/about/job-posting", locale),
  };
}

export default async function JobPostingPage() {
  const [{ content, jobPosts }, t, locale] = await Promise.all([
    getAboutPage("job-posting"),
    getChrome(),
    resolveActiveLocale(),
  ]);
  return (
    <>
      <AboutNav activeHref="/about/job-posting" locale={locale} />
      <JobPostingView
        t={t}
        locale={locale}
        content={content}
        jobPosts={jobPosts}
      />
    </>
  );
}
