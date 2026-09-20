import Image from "next/image";
import SmartImage from "@/components/ui/SmartImage";
import { assets } from "@/lib/data";

const MOBILE_PHOTO =
  "https://cdn.imweb.me/thumbnail/20240625/fb07ee567ca78.jpg";
const MOBILE_PEN =
  "https://cdn.imweb.me/upload/S20240617d196c3c9ecacb/02c58f25f7fbf.png";

export default function CtaBanner() {
  return (
    <>
      <section className="pc:hidden flex flex-col break-keep bg-[#f5f5f5] px-[15px] text-[#363636]">
        <div className="my-[7.5px] h-[30px]" />

        <div className="my-[7.5px] h-[230px] overflow-hidden">
          <Image
            src={MOBILE_PHOTO}
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
            틀에 대한 Hot Runner의 색다른 접근,
          </p>
          <p className="text-[20px] font-bold leading-[24px]">
            항상 제품이 완벽할 수 있도록 생각합니다.
          </p>
          <p className="h-[15px] leading-[15px]" />
          <div className="mt-[5px] h-[69.39px]">
            <Image
              src={MOBILE_PEN}
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
                  src={assets.ctaPhoto}
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
                    틀에 대한 Hot Runner의 색다른 접근,
                    <br />
                    항상 제품이 완벽할 수 있도록 생각합니다.
                  </span>
                </p>
                <p className="leading-[30px]">
                  <br />
                </p>
                <p className="leading-[30px]">
                  <span className="text-[20px] leading-[24px]">
                    <br />
                    <Image
                      src={assets.arrowDark}
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
