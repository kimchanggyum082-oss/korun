import Image from "next/image";
import SmartImage from "@/components/ui/SmartImage";
import SmartBackground from "@/components/ui/SmartBackground";
import { assets } from "@/lib/data";

function PenAccent() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mb-2 ml-1.5 inline-block h-4 w-4 text-brand-red"
      fill="currentColor"
      aria-hidden
    >
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  );
}

export function SectionHeading({ en, ko }: { en: string; ko: string }) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="text-xl font-extrabold tracking-tight text-neutral-900 md:text-2xl">
        {en}
        <PenAccent />
      </p>
      <p className="mt-1 text-xl font-extrabold tracking-tight text-neutral-900 md:text-2xl">
        {ko}
      </p>
    </div>
  );
}

const MOBILE_PEN =
  "https://cdn.imweb.me/upload/S20240617d196c3c9ecacb/cd3f41b48aeae.png";
const MOBILE_PRODUCT_HEIGHTS = [208, 211, 208, 208];

export default function Products() {
  return (
    <>
      <section className="pc:hidden flex flex-col break-keep px-[15px] text-[#363636]">
        <div className="my-[7.5px] h-[30px]" />

        <div className="my-[7.5px]">
          <p className="text-[24px] font-bold leading-[28.8px]">We making</p>
          <p className="text-[24px] font-bold leading-[28.8px]">
            smart flow of Resin
            <Image
              src={MOBILE_PEN}
              alt=""
              width={156}
              height={537}
              className="my-[5px] inline-block w-[16px] align-middle"
            />
          </p>
        </div>

        <div className="my-[7.5px] text-[15px] leading-[24px]">
          <p>HOT RUNNER SYSTEM 전문 제조 회사로서</p>
          <p>
            가격, 품질, 서비스로 보답하는 국내 핫런너 제조 전문 메이커입니다.
          </p>
        </div>

        {[0, 2].map((start) => (
          <div key={start} className="-mx-[7.5px] flex">
            {assets.products.slice(start, start + 2).map((product, i) => (
              <div key={product.href} className="w-1/2 px-[7.5px]">
                <a
                  href={product.href}
                  aria-label={product.title}
                  className="my-[7.5px] block"
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ height: MOBILE_PRODUCT_HEIGHTS[start + i] }}
                  >
                    <SmartImage
                      src={product.mobileSrc}
                      alt={product.title}
                      fill
                      unoptimized
                      sizes="50vw"
                      className="object-cover"
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        ))}

        <div className="my-[7.5px] h-[30px]" />
      </section>

      <section className="relative hidden overflow-hidden bg-white pc:block">
        <SmartBackground
          aria-hidden
          className="absolute inset-0"
          src={assets.productsBg}
          style={{
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="relative mx-auto max-w-[1280px] px-[15px] pb-[150px] pt-[150px]">
          <div className="py-[15px]">
            <h2 className="leading-[24px]">
              <span className="text-[48px] font-bold leading-[57.6px] text-ink">
                We making smart flow of Resin{" "}
                <Image
                  src={assets.penLarge}
                  alt=""
                  width={156}
                  height={537}
                  className="my-[5px] inline-block w-[20px] align-middle"
                />
              </span>
            </h2>
            <p className="leading-[24px]">
              <span className="text-[22px] leading-[26.4px] text-ink">
                HOT RUNNER SYSTEM 전문 제조 회사로서 가격, 품질, 서비스로
                보답하는 국내 핫런너 제조 전문 메이커입니다.
              </span>
            </p>
          </div>

          <div className="py-[15px]">
            <div className="h-[3px]" />
          </div>

          <div className="grid grid-cols-4 gap-[30px] py-[15px]">
            {assets.products.map((product) => (
              <a
                key={product.href}
                href={product.href}
                aria-label={product.title}
                className="group relative block aspect-[290/348] w-full overflow-hidden rounded-[10px]"
              >
                <SmartImage
                  src={product.src}
                  alt={product.title}
                  fill
                  sizes="(min-width: 992px) 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand scale-90 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <Image
                    src={product.hoverSrc}
                    alt=""
                    width={290}
                    height={348}
                    sizes="(min-width: 992px) 25vw"
                    className="h-auto w-full"
                  />
                </div>
                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[20px] font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {product.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
