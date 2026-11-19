import type { Metadata } from "next";
import CompanyLocationsPage from "@/components/admin/CompanyLocationsPage";
import { isUploadConfigured } from "@/lib/admin/blob";
import { getContentRows } from "@/lib/content/page-content";
import { groupDefaults } from "@/lib/content/registry/resolvers";
import { adminDict } from "@/lib/i18n/admin";
import { getAdminLocale } from "@/lib/i18n/admin-server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getAdminLocale();
  return {
    title: `${adminDict[locale].nav["/admin/company-locations"]} | ${adminDict[locale].layout.title}`,
    robots: { index: false, follow: false },
  };
}

export default async function AdminCompanyLocationsPage() {
  const locale = await getAdminLocale();
  const rows = await getContentRows(["about.location.locations"]);
  const stored = rows["about.location.locations"];
  const fallback = groupDefaults("about", locale).get(
    "about.location.locations",
  );
  const initialValue = stored?.ko || stored?.en || fallback || "";

  return (
    <CompanyLocationsPage
      initialValue={initialValue}
      uploadConfigured={isUploadConfigured()}
    />
  );
}
