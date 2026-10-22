import type { AboutContentMap } from "@/lib/data";
import CompanyLocationsList from "@/components/about/CompanyLocationsList";

export type CompanyLocationViewProps = {
  content: AboutContentMap["company-location"];
};

/**
 * Presentational view for About > Company Location. Shared by the public page
 * (server) and the admin preview (client, inside ScaledDesktop).
 */
export default function CompanyLocationView({
  content,
}: CompanyLocationViewProps) {
  return (
    <>
      {/* Page title banner */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col px-[15px] py-[50px] text-center pc:py-[80px]">
          <div className="hidden pc:block pc:h-[60px]" />
          <div className="my-[7.5px] pc:my-0 pc:pt-[20px] pc:pb-[10px]">
            <h1 className="text-[30px] leading-[36px] font-bold text-ink pc:text-[50px] pc:leading-[60px]">
              {content.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="mx-auto max-w-[1280px] px-[15px] pc:py-0">
        <CompanyLocationsList
          locations={content.locations}
          mapTitleFallback={content.title}
        />

        {/* Trailing spacer row */}
        <div className="h-[55px] pt-[7.5px] pb-[7.5px] pc:hidden" />
        <div className="hidden pc:block pc:h-[110px]" />
      </section>
    </>
  );
}
