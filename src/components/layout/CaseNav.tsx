import SmartImage from "@/components/ui/SmartImage";
import Link from "next/link";
import { assets, caseNav } from "@/lib/data";

export default function CaseNav({ activeHref }: { activeHref: string }) {
  return (
    <>
      {/* Mobile */}
      <section className="relative overflow-hidden bg-neutral-900 pc:hidden">
        <SmartImage
          src={assets.caseBannerMobile}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative mx-auto flex max-w-[1250px] flex-col items-start px-4 py-[100px] md:px-6">
          <p className="text-[30px] font-bold leading-[1.2] text-white">
            Case Of Applications
          </p>
          <nav aria-label="Case Of Applications" className="mt-5">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {caseNav.map((item) => {
                const active = item.href === activeHref;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`text-[13px] font-semibold transition-colors ${
                        active
                          ? "text-white underline underline-offset-4"
                          : "text-white/60 hover:text-white"
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
      </section>

      {/* PC */}
      <section className="relative hidden overflow-hidden bg-neutral-900 pc:block">
        <SmartImage
          src={assets.caseBannerPc}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative mx-auto flex h-[400px] max-w-[1280px] flex-col justify-center px-[15px]">
          <p className="text-[60px] font-bold leading-[1.2] text-white">
            Case Of Applications
          </p>
          <nav aria-label="Case Of Applications" className="mt-[24px]">
            <ul className="flex gap-[24px]">
              {caseNav.map((item) => {
                const active = item.href === activeHref;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`text-[15px] transition-colors ${
                        active
                          ? "text-white underline underline-offset-8"
                          : "text-white/60 hover:text-white"
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
      </section>
    </>
  );
}
