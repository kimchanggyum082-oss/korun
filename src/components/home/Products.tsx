import Image from "next/image";
import SmartImage from "@/components/ui/SmartImage";
import SmartBackground from "@/components/ui/SmartBackground";
import { homeContent, type HomeContent } from "@/lib/data";
import { defaultLocale, localizeHref, type Locale } from "@/lib/i18n/locales";

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

export default function Products({
  content = homeContent.products,
  locale = defaultLocale,
}: {
  content?: HomeContent["products"];
  locale?: Locale;
}) {
  return (
    <>
      <section className="pc:hidden flex flex-col break-keep px-[15px] text-[#363636]">
        <div className="my-[7.5px] h-[30px]" />

        <div className="my-[7.5px]">
          <p className="text-[24px] font-bold leading-[28.8px]">
            {content.mobileTitleLines[0]}
          </p>
          <p className="text-[24px] font-bold leading-[28.8px]">
            {content.mobileTitleLines[1]}
            <Image
              src={content.penMobile}
              alt=""
              width={156}
              height={537}
              className="my-[5px] inline-block w-[16px] align-middle"
            />
          </p>
        </div>

        <div className="my-[7.5px] text-[15px] leading-[24px]">
          <p>{content.mobileBodyLines[0]}</p>
          <p>{content.mobileBodyLines[1]}</p>
        </div>

        {[0, 2].map((start) => (
          <div key={start} className="-mx-[7.5px] flex">
            {content.items.slice(start, start + 2).map((product, i) => (
              <div key={product.href} className="w-1/2 px-[7.5px]">
                <a
                  href={
                    product.href.startsWith("/")
                      ? localizeHref(product.href, locale)
                      : product.href
                  }
                  aria-label={product.title}
                  className="my-[7.5px] block"
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ height: content.mobileHeights[start + i] }}
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
          src={content.bg}
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
                {content.pcTitle}{" "}
                <Image
                  src={content.penLarge}
                  alt=""
                  width={156}
                  height={537}
                  className="my-[5px] inline-block w-[20px] align-middle"
                />
              </span>
            </h2>
            <p className="leading-[24px]">
              <span className="text-[22px] leading-[26.4px] text-ink">
                {content.pcBody}
              </span>
            </p>
          </div>

          <div className="py-[15px]">
            <div className="h-[3px]" />
          </div>

          <div className="grid grid-cols-4 gap-[30px] py-[15px]">
            {content.items.map((product) => (
              <a
                key={product.href}
                href={
                  product.href.startsWith("/")
                    ? localizeHref(product.href, locale)
                    : product.href
                }
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
