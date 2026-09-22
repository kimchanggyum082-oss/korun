import type { Metadata } from "next";
import AboutJobPostingEditor from "@/components/admin/editors/about/AboutJobPostingEditor";
import { loadEditableEntity } from "@/lib/admin/entity-store";
import { ENTITY_KEYS } from "@/lib/admin/entities";
import { getAboutPage } from "@/lib/content";
import { isDatabaseConfigured } from "@/lib/db/client";

export const metadata: Metadata = {
  title: "채용 | KORUN Admin",
};

export default async function AdminAboutJobPostingPage() {
  const { value, source } = await loadEditableEntity(
    ENTITY_KEYS.aboutJobPosting,
  );
  const { jobPosts } = await getAboutPage("job-posting");

  return (
    <AboutJobPostingEditor
      initial={value}
      source={source}
      storeReady={isDatabaseConfigured()}
      jobPosts={jobPosts}
    />
  );
}
