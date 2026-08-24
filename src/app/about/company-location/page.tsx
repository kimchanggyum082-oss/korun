import type { Metadata } from "next";
import Image from "next/image";
import { assets, company } from "@/lib/data";
import AboutNav from "@/components/layout/AboutNav";

export const metadata: Metadata = {
  title: `Company Location | ${company.name}`,
  description: `${company.name}의 본사 및 공장 위치 안내입니다.`,
};

export default function CompanyLocationPage() {
  return (
    <>
      <AboutNav activeHref="/about/company-location" />

      {/* Page title banner */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-10 text-center md:px-6 md:py-12 pc:px-[15px] pc:py-[50px]">
          <h1 className="text-[30px] font-bold leading-[1.2] text-ink md:text-[40px] pc:text-[50px]">
            Company Location
          </h1>
        </div>
      </section>

      {/* Map & address — vertical: text first, then map */}
      <section className="mx-auto max-w-[1280px] px-4 py-12 md:px-6 md:py-16 pc:px-[15px] pc:py-[60px]">
        <p className="text-[18px] font-bold text-brand md:text-[20px]">
          HEAD OFFICE &amp; FACTORY
        </p>
        <h2 className="mt-2 text-[28px] font-bold leading-[1.2] text-ink md:text-[36px] pc:text-[48px]">
          본사 및 공장
          <Image
            src={assets.penSmall}
            alt=""
            width={15}
            height={30}
            className="ml-[6px] inline-block w-[15px] align-middle"
          />
        </h2>

        <hr className="my-6 border-ink/15 md:my-8" />

        {/* Address table */}
        <table className="mb-8 w-full text-[15px] md:text-[18px]">
          <tbody>
            <tr>
              <th
                scope="row"
                className="w-32 py-3 text-left font-bold text-brand md:w-40"
              >
                {company.name}
              </th>
              <td className="py-3" />
            </tr>
            <tr>
              <th
                scope="row"
                className="w-32 py-3 text-left font-bold text-ink md:w-40"
              >
                TEL.
              </th>
              <td className="py-3 text-ink">{company.tel}</td>
            </tr>
            <tr>
              <th
                scope="row"
                className="w-32 py-3 text-left font-bold text-ink md:w-40"
              >
                EMAIL.
              </th>
              <td className="py-3 text-ink">{company.email}</td>
            </tr>
            <tr>
              <th
                scope="row"
                className="w-32 py-3 text-left font-bold text-ink md:w-40"
              >
                ADDRESS.
              </th>
              <td className="py-3 text-ink">{company.address}</td>
            </tr>
          </tbody>
        </table>

        {/* Map */}
        <iframe
          src={company.mapEmbed}
          title="코런 본사 위치 지도"
          className="h-[300px] w-full border-0 md:h-[400px]"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
