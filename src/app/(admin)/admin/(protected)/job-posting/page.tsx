import type { Metadata } from "next";
import JobList from "@/components/admin/editors/jobs/JobList";
import { getBoardItems } from "@/lib/content";
import { jobsDict } from "@/lib/i18n/boards/jobs";
import { getAdminLocale } from "@/lib/i18n/admin-server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getAdminLocale();
  return { title: jobsDict[locale].meta.listTitle };
}

export default async function AdminJobPostingPage() {
  const items = await getBoardItems("job-posting");

  return <JobList items={items} />;
}
