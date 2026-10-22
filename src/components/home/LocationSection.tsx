import Image from "next/image";
import CompanyLocationsList from "@/components/about/CompanyLocationsList";
import {
  homeContent,
  type AboutLocationItem,
  type HomeContent,
} from "@/lib/data";

export default function LocationSection({
  location = homeContent.location,
  locations,
}: {
  location?: HomeContent["location"];
  locations: readonly AboutLocationItem[];
}) {
  return (
    <section className="mx-auto max-w-[1280px] px-[15px] py-[80px]">
      <div className="py-[15px]">
        <p className="text-[24px] leading-[29px] font-bold text-brand pc:text-[36px] pc:leading-[43.2px] pc:font-normal">
          <span className="text-[15px] leading-[18px] pc:text-[20px] pc:leading-[24px] pc:font-bold">
            {location.headingEn}
          </span>
        </p>
        <p className="text-[24px] leading-[28.8px] font-bold text-ink pc:text-[36px] pc:leading-[43.2px]">
          <span className="text-[24px] font-bold leading-[28.8px] text-ink pc:text-[36px] pc:leading-[43.2px]">
            {location.headingKo}
          </span>
          <span className="text-[15px] leading-[18px]">
            <Image
              src={location.penSmall}
              alt=""
              width={156}
              height={537}
              className="my-[5px] inline-block w-[15px] align-middle"
            />
          </span>
        </p>
        <hr className="my-[20px] border-[#ddd]" />
      </div>

      <CompanyLocationsList
        locations={locations}
        mapTitleFallback={location.headingKo}
      />
    </section>
  );
}
