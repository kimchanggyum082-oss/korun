import type { Metadata } from "next";
import JobList from "@/components/admin/editors/jobs/JobList";
import { getAdminBoardItems } from "@/lib/content";
import { jobsDict } from "@/lib/i18n/boards/jobs";
import { getAdminLocale } from "@/lib/i18n/admin-server";
import { localizeHref } from "@/lib/i18n/locales";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getAdminLocale();
  return { title: jobsDict[locale].meta.listTitle };
}

export default async function AdminJobPostingPage() {
  const locale = await getAdminLocale();
  const items = await getAdminBoardItems("job-posting", locale);
  const newHref = localizeHref(
    `/admin/job-posting/${crypto.randomUUID()}`,
    locale,
  );

  return <JobList items={items} newHref={newHref} />;
}
