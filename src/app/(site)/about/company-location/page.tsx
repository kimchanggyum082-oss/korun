import type { Metadata } from "next";
import { getAboutPage } from "@/lib/content";
import AboutNav from "@/components/layout/AboutNav";
import CompanyLocationView from "@/components/about/CompanyLocationView";

export async function generateMetadata(): Promise<Metadata> {
  const { company } = await getAboutPage("company-location");
  return {
    title: `Company Location | ${company.name}`,
    description: `${company.name}의 본사 및 공장 위치 안내입니다.`,
  };
}

export default async function CompanyLocationPage() {
  const { company, content } = await getAboutPage("company-location");
  return (
    <>
      <AboutNav activeHref="/about/company-location" />
      <CompanyLocationView content={content} company={company} />
    </>
  );
}
