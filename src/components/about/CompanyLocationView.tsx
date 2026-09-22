import type { getAboutPage } from "@/lib/content";
import type { AboutLocationEntity } from "@/lib/admin/entities";

type AboutPageData = Awaited<ReturnType<typeof getAboutPage>>;

export type CompanyLocationViewProps = {
  content: AboutLocationEntity["content"];
  company: AboutPageData["company"];
};

/**
 * Presentational view for About > Company Location. Shared by the public page
 * (server) and the admin preview (client, inside ScaledDesktop).
 */
export default function CompanyLocationView({
  content,
  company,
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

      {/* Address then map */}
      <section className="mx-auto max-w-[1280px] px-[15px] pc:py-0">
        <p className="text-[24px] leading-[29px] font-bold text-brand pc:text-[36px] pc:leading-[43.2px] pc:font-normal">
          <span className="text-[15px] leading-[18px] pc:text-[20px] pc:leading-[24px] pc:font-bold">
            {content.headingEn}
          </span>
        </p>
        <p className="text-[28px] leading-[33.6px] font-bold text-ink pc:text-[48px] pc:leading-[57.6px]">
          {content.headingKo}
        </p>

        <div className="hidden pc:block pc:h-[24px]" />
        <p className="text-[15px] leading-[24px] text-ink pc:hidden">&nbsp;</p>

        <table className="w-full text-[15px] leading-[24px]">
          <tbody>
            <tr>
              <th
                scope="row"
                colSpan={2}
                className="px-[8px] py-[8px] text-left font-bold text-brand pc:px-0"
              >
                <span className="pc:text-[20px]">{company.name}</span>
              </th>
            </tr>
            <tr>
              <th
                scope="row"
                className="w-[89px] px-[8px] py-[8px] text-left font-bold text-ink pc:px-0 pc:w-[21.5%]"
              >
                <span className="pc:text-[20px]">{content.labels.tel}</span>
              </th>
              <td className="px-[8px] py-[8px] text-ink pc:px-0">
                <span className="pc:text-[20px]">{company.tel}</span>
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                className="w-[89px] px-[8px] py-[8px] text-left font-bold text-ink pc:px-0 pc:w-[21.5%]"
              >
                <span className="pc:text-[20px]">{content.labels.email}</span>
              </th>
              <td className="px-[8px] py-[8px] text-ink pc:px-0">
                <span className="pc:text-[20px]">{company.email}</span>
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                className="w-[89px] px-[8px] py-[8px] text-left font-bold text-ink pc:px-0 pc:w-[21.5%]"
              >
                <span className="pc:text-[20px]">{content.labels.address}</span>
              </th>
              <td className="px-[8px] py-[8px] text-ink pc:px-0">
                <span className="pc:text-[20px]">{company.address}</span>
              </td>
            </tr>
          </tbody>
        </table>

        <hr className="my-[20px] border-ink/15" />

        {/* Map */}
        <div className="h-[472px] py-[7.5px] pc:h-auto pc:py-[15px]">
          <iframe
            src={company.mapEmbed}
            title={content.mapTitle}
            className="block h-[450px] w-full border-0 pc:h-[457px]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Trailing spacer row */}
        <div className="h-[55px] pt-[7.5px] pb-[7.5px] pc:hidden" />
        <div className="hidden pc:block pc:h-[110px]" />
      </section>
    </>
  );
}
