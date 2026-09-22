import Image from "next/image";
import SmartImage from "@/components/ui/SmartImage";
import { homeContent, type HomeContent } from "@/lib/data";

export default function CtaBanner({
  content = homeContent.cta,
}: {
  content?: HomeContent["cta"];
}) {
  return (
    <>
      <section className="pc:hidden flex flex-col break-keep bg-[#f5f5f5] px-[15px] text-[#363636]">
        <div className="my-[7.5px] h-[30px]" />

        <div className="my-[7.5px] h-[230px] overflow-hidden">
          <Image
            src={content.photoMobile}
            alt=""
            width={1280}
            height={854}
            unoptimized
            sizes="100vw"
            className="-mt-[5px] block w-full"
          />
        </div>

        <div className="my-[7.5px]">
          <p className="text-[20px] font-bold leading-[24px]">
            {content.line1}
          </p>
          <p className="text-[20px] font-bold leading-[24px]">
            {content.line2}
          </p>
          <p className="h-[15px] leading-[15px]" />
          <div className="mt-[5px] h-[69.39px]">
            <Image
              src={content.penMobile}
              alt=""
              width={156}
              height={537}
              className="block h-[38px] w-[38px] object-contain"
            />
          </div>
        </div>
      </section>

      <section className="hidden bg-[#f9f9f9] pc:block">
        <div className="mx-auto max-w-[1280px] px-[15px] py-[80px]">
          <div className="-mx-[15px] grid grid-cols-12">
            <div className="col-span-5 px-[15px]">
              <div className="py-[15px]">
                <SmartImage
                  src={content.photo}
                  alt=""
                  width={1280}
                  height={854}
                  sizes="(min-width: 992px) 40vw"
                  className="h-[303px] w-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-7 px-[15px]">
              <div className="py-[15px]">
                <div className="h-[46px]" />
              </div>
              <div className="py-[15px] pl-[50px] pr-[15px]">
                <p className="leading-[30px]">
                  <span className="text-[36px] font-bold leading-[43.2px] text-ink">
                    {content.line1}
                    <br />
                    {content.line2}
                  </span>
                </p>
                <p className="leading-[30px]">
                  <br />
                </p>
                <p className="leading-[30px]">
                  <span className="text-[20px] leading-[24px]">
                    <br />
                    <Image
                      src={content.arrowDark}
                      alt=""
                      width={152}
                      height={152}
                      className="my-[5px] inline-block w-[28px] align-middle"
                    />
                  </span>
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
