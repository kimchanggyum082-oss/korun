import type { Metadata } from "next";
import { getAboutPage } from "@/lib/content";
import AboutNav from "@/components/layout/AboutNav";
import PatentCredentialsView from "@/components/about/PatentCredentialsView";

export async function generateMetadata(): Promise<Metadata> {
  const { company } = await getAboutPage("patent-credentials");
  return {
    title: `Patent & Credentials | ${company.name}`,
    description: `${company.name}의 특허 및 인증 현황을 확인하실 수 있습니다.`,
  };
}

export default async function PatentCredentialsPage() {
  const { assets, content } = await getAboutPage("patent-credentials");
  return (
    <>
      <AboutNav activeHref="/about/patent-credentials" />
      <PatentCredentialsView content={content} assets={assets} />
    </>
  );
}
