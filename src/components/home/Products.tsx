import Image from "next/image";
import { assets } from "@/lib/data";

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

export default function Products() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading en="We making" ko="smart flow of Resin" />
      <p className="-mt-6 mb-10 text-sm leading-relaxed text-neutral-500 md:-mt-8 md:mb-14 md:text-base">
        HOT RUNNER SYSTEM 전문 제조 회사로서
        <br />
        가격, 품질, 서비스로 보답하는 국내 핫런너 제조 전문 메이커입니다.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-8">
        {assets.products.map((product) => (
          <a
            key={product.title}
            href={product.href}
            aria-label={product.title}
            className="block overflow-hidden"
          >
            <Image
              src={product.src}
              alt={product.title}
              width={1200}
              height={1440}
              sizes="(min-width: 640px) 50vw, 100vw"
              className="h-auto w-full transition-transform duration-500 hover:scale-[1.03]"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
