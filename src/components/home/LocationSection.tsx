import Image from "next/image";
import { company, homeContent, type HomeContent } from "@/lib/data";

export default function LocationSection({
  location = homeContent.location,
  contact = company,
}: {
  location?: HomeContent["location"];
  contact?: typeof company;
} = {}) {
  return (
    <>
      <section className="pc:hidden flex flex-col break-keep px-[15px] py-[80px] text-[15px] leading-[24px]">
        <div className="my-[7.5px]">
          <p>
            <iframe
              src={contact.mapEmbed}
              title={location.mapTitle}
              className="inline h-[380px] w-full border-0 align-baseline"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </p>
        </div>

        <div className="my-[7.5px]">
          <p className="text-[24px] leading-[29px]">
            <span className="text-[15px] font-bold leading-[18px] text-brand">
              {location.headingEn}
            </span>
          </p>
          <p className="text-[24px] font-bold leading-[28.8px]">
            {location.headingKo}
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

          <hr className="my-[20px] border-[rgb(128,128,128)]" />

          <table className="w-full">
            <tbody>
              <tr>
                <td className="w-[25.4918%] p-[8px] font-bold text-brand">
                  <span className="text-[15px] leading-[18px]">
                    {contact.name}
                  </span>
                  <br />
                </td>
                <td className="w-[74.3443%] p-[8px]">
                  <br />
                </td>
              </tr>
              <tr>
                <td className="w-[25.4918%] p-[8px] font-bold text-ink">
                  <span className="text-[15px] leading-[18px]">TEL.</span>
                </td>
                <td className="w-[74.3443%] p-[8px] text-ink">
                  <span className="text-[15px] leading-[18px]">
                    {contact.tel}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="w-[25.4918%] p-[8px] font-bold text-ink">
                  <span className="text-[15px] leading-[18px]">EMAIL.</span>
                </td>
                <td className="w-[74.3443%] p-[8px] text-ink">
                  <span className="text-[15px] leading-[18px]">
                    {contact.email}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="w-[25.4918%] p-[8px] font-bold text-ink">
                  <span className="text-[15px] leading-[18px]">ADDRESS.</span>
                </td>
                <td className="w-[74.3443%] p-[8px] text-ink">
                  <span className="text-[15px] leading-[18px]">
                    {contact.address}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="hidden pc:block">
        <div className="mx-auto max-w-[1280px] px-[15px] pb-[80px] pt-[80px]">
          <p className="py-[15px]">
            <iframe
              src={contact.mapEmbed}
              title={location.mapTitle}
              className="inline h-[380px] w-full border-0 align-baseline"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </p>

          <div className="py-[15px]">
            <p className="text-[36px] leading-[43.2px]">
              <span className="text-[20px] font-bold leading-[24px] text-brand">
                {location.headingEn}
              </span>
            </p>
            <p className="text-[36px] leading-[43.2px]">
              <span className="text-[36px] font-bold leading-[43.2px] text-ink">
                {location.headingKo}
              </span>
              <span className="text-[20px] leading-[24px]">
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

            <table className="w-full text-[15px] leading-[24px]">
              <tbody>
                <tr>
                  <th
                    scope="row"
                    className="w-[25.4918%] p-[8px] text-left font-bold text-brand"
                  >
                    <span className="text-[20px]">{contact.name}</span>
                  </th>
                  <td className="w-[74.3443%] p-[8px]" />
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="w-[25.4918%] p-[8px] text-left font-bold text-ink"
                  >
                    <span className="text-[20px]">TEL.</span>
                  </th>
                  <td className="w-[74.3443%] p-[8px] text-ink">
                    <span className="text-[20px]">{contact.tel}</span>
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="w-[25.4918%] p-[8px] text-left font-bold text-ink"
                  >
                    <span className="text-[20px]">EMAIL.</span>
                  </th>
                  <td className="w-[74.3443%] p-[8px] text-ink">
                    <span className="text-[20px]">{contact.email}</span>
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="w-[25.4918%] p-[8px] text-left font-bold text-ink"
                  >
                    <span className="text-[20px]">ADDRESS.</span>
                  </th>
                  <td className="w-[74.3443%] p-[8px] text-ink">
                    <span className="text-[20px]">{contact.address}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
