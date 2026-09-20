import Image from "next/image";
import SmartImage from "@/components/ui/SmartImage";
import Link from "next/link";
import { assets, caseNav } from "@/lib/data";

export default function CaseNav({ activeHref }: { activeHref: string }) {
  return (
    <>
      {/* Mobile */}
      <section className="relative overflow-hidden pc:hidden">
        <SmartImage
          src={assets.caseBannerMobile}
          alt=""
          fill
          sizes="100vw"
          priority
          unoptimized
          className="object-cover"
          aria-hidden
        />
        <div className="relative flex flex-col px-[15px] pt-[7.5px] pb-[7.5px]">
          <div className="h-[140px]" />
          <p className="mt-[15px] text-[30px] font-bold leading-[36px] text-white">
            Case Of Applications
          </p>
          <nav aria-label="Case Of Applications" className="mt-[15px]">
            <ul className="inline-block text-[0] leading-[0]">
              {caseNav.map((item) => {
                const active = item.href === activeHref;
                return (
                  <li key={item.label} className="inline-block">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`mr-[25px] inline-block pb-[5px] text-[15px] leading-[24px] transition-colors ${
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
          <div className="mt-[15px] h-[110px]" />
        </div>
      </section>

      {/* PC */}
      <section className="relative hidden overflow-hidden pc:block">
        <Image
          src={assets.caseBannerPc}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="relative mx-auto max-w-[1280px] px-[15px] py-[150px]">
          <div className="py-[15px]">
            <p className="leading-[24px]">
              <span className="text-[60px] font-bold leading-[66px] text-white">
                Case Of Applications
              </span>
            </p>
          </div>
          <div className="py-[15px]">
            <nav aria-label="Case Of Applications">
              <ul className="inline-block text-[0] leading-[0]">
                {caseNav.map((item) => {
                  const active = item.href === activeHref;
                  return (
                    <li key={item.label} className="inline-block">
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`mr-[25px] inline-block pb-[5px] text-[15px] leading-[24px] ${
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
