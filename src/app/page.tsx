import HeroSlider from "@/components/home/HeroSlider";
import Products from "@/components/home/Products";
import CtaBanner from "@/components/home/CtaBanner";
import { ListsSection } from "@/components/home/Lists";
import ValuesBanner from "@/components/home/ValuesBanner";
import LocationSection from "@/components/home/LocationSection";
import PolicyModal from "@/components/layout/PolicyModal";
import { sitePolicyModals } from "@/lib/data";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const kind =
    params.mode === "policy"
      ? "policy"
      : params.mode === "privacy"
        ? "privacy"
        : null;

  return (
    <>
      <HeroSlider />
      <Products />
      <CtaBanner />
      <ListsSection />
      <ValuesBanner />
      <LocationSection />
      {kind && <PolicyModal kind={kind} modal={sitePolicyModals[kind]} />}
    </>
  );
}
