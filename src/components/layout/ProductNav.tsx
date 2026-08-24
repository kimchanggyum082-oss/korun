import SmartImage from "@/components/ui/SmartImage";
import Link from "next/link";
import { assets } from "@/lib/data";

export default function ProductNav({ activeId }: { activeId: string }) {
  return (
    <>
      <section className="relative overflow-hidden bg-neutral-900 pc:hidden">
        <SmartImage
          src={assets.subBanner}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto max-w-[1250px] px-4 py-10 md:px-6 md:py-12">
          <p className="text-[26px] font-bold text-white md:text-[32px]">
            Products
          </p>
          <nav aria-label="Products">
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
              {assets.products.map((p) => {
                const id = p.href.replace("/", "");
                const active = id === activeId;
                return (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      aria-current={active ? "page" : undefined}
                      className={`text-[12px] font-semibold transition-colors md:text-[13px] ${
                        active
                          ? "text-white underline underline-offset-4"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {p.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </section>

      <section className="relative hidden h-[457px] overflow-hidden bg-neutral-900 pc:block">
        <SmartImage
          src={assets.subBanner}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto flex h-full max-w-[1280px] flex-col justify-center px-[15px]">
          <p className="text-[44px] font-bold leading-[1.2] text-white">
            Products
          </p>
          <nav aria-label="Products" className="mt-[24px]">
            <ul className="flex gap-[24px]">
              {assets.products.map((p) => {
                const id = p.href.replace("/", "");
                const active = id === activeId;
                return (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      aria-current={active ? "page" : undefined}
                      className={`text-[15px] transition-colors ${
                        active
                          ? "text-white underline underline-offset-8"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {p.title}
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
