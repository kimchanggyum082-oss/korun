import Image from "next/image";
import { assets, company } from "@/lib/data";

export default function LocationSection() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16 pc:hidden md:px-6 md:py-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-14">
          <div className="md:col-span-3">
            <iframe
              src={company.mapEmbed}
              title="코런 본사 위치 지도"
              className="h-[300px] w-full border-0 md:h-[420px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="md:col-span-2">
            <p className="text-sm font-bold tracking-[0.2em] text-neutral-400">
              HEAD OFFICE &amp; FACTORY
            </p>
            <h2 className="mt-2 text-xl font-extrabold text-neutral-900 md:text-2xl">
              본사 및 공장
            </h2>
            <hr className="my-6 border-neutral-200" />

            <table className="w-full text-sm md:text-[15px]">
              <tbody>
                <Row label="" value={company.name} bold />
                <Row label="TEL." value={company.tel} />
                <Row label="EMAIL." value={company.email} />
                <Row label="ADDRESS." value={company.address} />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="hidden pc:block">
        <div className="mx-auto max-w-[1280px] px-[15px] pb-[130px] pt-[95px]">
          <iframe
            src={company.mapEmbed}
            title="코런 본사 위치 지도"
            className="h-[380px] w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />

          <p className="mt-[40px] text-[20px] font-bold leading-[1.2] text-brand">
            HEAD OFFICE &amp; FACTORY
          </p>
          <h2 className="mt-[6px] text-[36px] font-bold leading-[1.2] text-ink">
            본사 및 공장
            <Image
              src={assets.penSmall}
              alt=""
              width={15}
              height={30}
              className="ml-[6px] inline-block w-[15px] align-middle"
            />
          </h2>

          <hr className="my-[22px] border-ink/15" />

          <table className="w-full text-[20px]">
            <tbody>
              <tr>
                <th
                  scope="row"
                  className="w-[25.5%] py-[9px] text-left font-bold text-brand"
                >
                  {company.name}
                </th>
                <td className="py-[9px]" />
              </tr>
              <tr>
                <th
                  scope="row"
                  className="w-[25.5%] py-[9px] text-left font-bold text-ink"
                >
                  TEL.
                </th>
                <td className="py-[9px] text-ink">{company.tel}</td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="w-[25.5%] py-[9px] text-left font-bold text-ink"
                >
                  EMAIL.
                </th>
                <td className="py-[9px] text-ink">{company.email}</td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="w-[25.5%] py-[9px] text-left font-bold text-ink"
                >
                  ADDRESS.
                </th>
                <td className="py-[9px] text-ink">{company.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <tr className="align-top">
      {!bold && (
        <th
          scope="row"
          className="w-24 py-2.5 pr-4 text-left font-bold text-neutral-900 md:w-28"
        >
          {label}
        </th>
      )}
      <td
        colSpan={bold ? 2 : 1}
        className={`py-2.5 text-neutral-600 ${bold ? "font-bold" : ""}`}
      >
        {value}
      </td>
    </tr>
  );
}
