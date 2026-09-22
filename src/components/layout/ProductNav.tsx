import SmartImage from "@/components/ui/SmartImage";
import Link from "next/link";
import { assets } from "@/lib/data";
import { localizeHref, type Locale } from "@/lib/i18n/locales";

export default function ProductNav({
  activeId,
  locale = "ko",
}: {
  activeId: string;
  locale?: Locale;
}) {
  const localize = (href: string) =>
    href.startsWith("/") ? localizeHref(href, locale) : href;

  return (
    <section className="relative overflow-hidden bg-neutral-900">
      <SmartImage
        src={assets.subBanner}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative mx-auto max-w-[1280px] px-[15px] py-[150px]">
        <div className="py-[7.5px] text-[15px] leading-[24px] pc:py-[15px]">
          <p>
            <strong className="text-[30px] font-bold leading-[33px] text-white pc:text-[60px] pc:leading-[66px]">
              Products
            </strong>
          </p>
        </div>
        <div className="py-[7.5px] text-[15px] leading-[24px] pc:py-[15px]">
          <nav aria-label="Products">
            <ul className="inline-block text-[0] leading-[0]">
              {assets.products.map((p) => {
                const id = p.href.replace("/", "");
                const active = id === activeId;
                return (
                  <li key={p.href} className="inline-block">
                    <Link
                      href={localize(p.href)}
                      aria-current={active ? "page" : undefined}
                      className={`mr-[25px] inline-block pb-[5px] text-[15px] leading-[24px] ${
                        active
                          ? "border-b border-white text-white"
                          : "border-0 pc:border-b pc:border-white/70 text-white/70 hover:text-white"
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
      </div>
    </section>
  );
}
