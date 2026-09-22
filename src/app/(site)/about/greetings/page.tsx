import type { Metadata } from "next";
import { getAboutPage } from "@/lib/content";
import AboutNav from "@/components/layout/AboutNav";
import GreetingsView from "@/components/about/GreetingsView";

export async function generateMetadata(): Promise<Metadata> {
  const { company } = await getAboutPage("greetings");
  return {
    title: `Greetings | ${company.name}`,
    description:
      "주식회사 코런은 2014년에 설립되어 고품질의 러너리스 사출성형 시스템 Hot Runner System 전문 제조 회사입니다.",
  };
}

export default async function GreetingsPage() {
  const { assets, content } = await getAboutPage("greetings");
  return (
    <>
      <AboutNav activeHref="/about/greetings" />
      <GreetingsView content={content} assets={assets} />
    </>
  );
}
