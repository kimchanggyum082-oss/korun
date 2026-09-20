import SmartImage from "@/components/ui/SmartImage";
import Link from "next/link";
import { CDN, serviceNav } from "@/lib/data";

const SERVICE_HERO_IMAGE = `${CDN}/thumbnail/20240618/6cbfc238fa7c1.png`;

const menuLabel = (label: string) => label.replace(/\s*&\s*/, "&");

export default function ServiceNav({ activeHref }: { activeHref: string }) {
  return (
    <>
      {/* Mobile */}
      <section className="relative overflow-hidden bg-neutral-900 pc:hidden">
        <SmartImage
          src={SERVICE_HERO_IMAGE}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1280px] px-[15px] py-[150px]">
          <p className="mt-[7.5px] mb-[15px] h-[34px] text-[30px] font-bold leading-[33px] text-white">
            Service Center
          </p>
          <nav aria-label="Service Center" className="my-[7.5px]">
            <ul className="text-[0px]">
              {serviceNav.map((item) => {
                const active = item.href === activeHref;
                return (
                  <li key={item.label} className="mr-[25px] inline-block">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`inline-block pb-[5px] text-[15px] leading-[24px] transition-colors ${
                        active
                          ? "border-b border-white text-white"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {menuLabel(item.label)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </section>

      {/* PC */}
      <section className="relative hidden overflow-hidden pc:block">
        <SmartImage
          src={SERVICE_HERO_IMAGE}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1280px] px-[15px] pt-[150px] pb-[150px] pc:flex pc:flex-col">
          <p className="my-[15px] text-[60px] font-bold leading-[66px] text-white">
            Service Center
          </p>
          <nav aria-label="Service Center" className="my-[15px] h-[30px]">
            <ul className="flex h-[30px] items-start">
              {serviceNav.map((item) => {
                const active = item.href === activeHref;
                return (
                  <li key={item.label} className="mr-[25px]">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`inline-block pb-[5px] text-[15px] leading-[24px] transition-colors ${
                        active
                          ? "border-b border-white text-white"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {menuLabel(item.label)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
