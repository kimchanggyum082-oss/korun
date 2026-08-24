import HeroSlider from "@/components/home/HeroSlider";
import Products from "@/components/home/Products";
import CtaBanner from "@/components/home/CtaBanner";
import { ListsSection } from "@/components/home/Lists";
import ValuesBanner from "@/components/home/ValuesBanner";
import LocationSection from "@/components/home/LocationSection";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <Products />
      <CtaBanner />
      <ListsSection />
      <ValuesBanner />
      <LocationSection />
    </>
  );
}
