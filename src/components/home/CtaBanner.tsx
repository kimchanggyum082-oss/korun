import Image from "next/image";
import SmartImage from "@/components/ui/SmartImage";
import { assets } from "@/lib/data";

export default function CtaBanner() {
  return (
    <>
      <section className="relative h-[380px] w-full overflow-hidden pc:hidden md:h-[480px]">
        <SmartImage
          src={assets.ctaPhoto}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-14 md:px-6 md:pb-20">
          <p className="text-lg font-bold leading-snug text-white drop-shadow md:text-2xl">
            틀에 대한 Hot Runner의 색다른 접근,
            <br />
            항상 제품이 완벽할 수 있도록 생각합니다.
          </p>
          <a
            href="#"
            aria-label="회사소개 바로가기"
            className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white hover:text-neutral-900"
          >
            <ArrowIcon />
          </a>
        </div>
      </section>

      <section className="hidden bg-[#f9f9f9] pc:block">
        <div className="mx-auto grid max-w-[1280px] grid-cols-12 px-[15px] py-[80px]">
          <div className="col-span-5">
            <SmartImage
              src={assets.ctaPhoto}
              alt=""
              width={1006}
              height={606}
              sizes="(min-width: 992px) 40vw"
              className="aspect-[503/303] w-full object-cover"
            />
          </div>
          <div className="col-span-7 pl-[15px] pt-[46px]">
            <p className="text-[36px] font-bold leading-[2] text-ink">
              틀에 대한 Hot Runner의 색다른 접근,
              <br />
              항상 제품이 완벽할 수 있도록 생각합니다.
            </p>
            <a
              href="#"
              aria-label="회사소개 바로가기"
              className="mt-[16px] inline-block"
            >
              <Image
                src={assets.arrowDark}
                alt=""
                width={28}
                height={20}
                className="w-[28px]"
              />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="13 5 20 12 13 19" />
    </svg>
  );
}
