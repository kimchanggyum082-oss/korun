import SmartImage from "@/components/ui/SmartImage";
import Link from "next/link";
import { aboutNav, assets } from "@/lib/data";
import { localizeHref, type Locale } from "@/lib/i18n/locales";

export default function AboutNav({
  activeHref,
  locale = "ko",
}: {
  activeHref: string;
  locale?: Locale;
}) {
  const localize = (href: string) =>
    href.startsWith("/") ? localizeHref(href, locale) : href;

  return (
    <>
      {/* Mobile */}
      <section className="relative overflow-hidden bg-neutral-900 pc:hidden">
        <SmartImage
          src={assets.aboutBannerMobile}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-[1250px] flex-col px-[15px] pt-[155px] pb-[155px]">
          <div className="my-[7.5px]">
            <p className="text-[30px] leading-[36px] font-bold text-white">
              About KORUN
            </p>
          </div>
          <div className="my-[7.5px]">
            <nav aria-label="About KORUN">
              <ul className="flex flex-wrap">
                {aboutNav.map((item) => {
                  const active = item.href === activeHref;
                  return (
                    <li key={item.label} className="mr-[25px]">
                      <Link
                        href={localize(item.href)}
                        aria-current={active ? "page" : undefined}
                        className={`inline-block pb-[5px] text-[15px] leading-[24px] transition-colors ${
                          active
                            ? "border-b border-white text-white"
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {/* PC */}
      <section className="relative hidden overflow-hidden bg-neutral-900 pc:block">
        <SmartImage
          src={assets.aboutBannerPc}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[rgba(5,4,4,0.45)]" />
        <div className="relative mx-auto max-w-[1280px] px-[15px] py-[150px]">
          <div className="py-[15px]">
            <p className="text-[60px] leading-[66px] font-bold text-white">
              About KORUN
            </p>
          </div>
          <div className="py-[15px]">
            <nav aria-label="About KORUN">
              <ul className="flex h-[30px] items-start gap-[25px]">
                {aboutNav.map((item) => {
                  const active = item.href === activeHref;
                  return (
                    <li key={item.label}>
                      <Link
                        href={localize(item.href)}
                        aria-current={active ? "page" : undefined}
                        className={`inline-block pb-[5px] text-[15px] leading-[24px] transition-colors ${
                          active
                            ? "border-b border-white text-white"
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
