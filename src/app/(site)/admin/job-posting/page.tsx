import type { Metadata } from "next";
import JobList from "@/components/admin/editors/jobs/JobList";
import { getBoardItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "채용정보 | KORUN Admin",
};

export default async function AdminJobPostingPage() {
  const items = await getBoardItems("job-posting");

  return <JobList items={items} />;
}
