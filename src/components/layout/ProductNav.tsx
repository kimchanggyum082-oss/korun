import Link from "next/link";
import { assets } from "@/lib/data";

export default function ProductNav({ activeId }: { activeId: string }) {
  return (
    <nav aria-label="Products" className="border-b border-neutral-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-5 md:px-6 md:py-7">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-400">
          Products
        </p>
        <ul className="mt-3 flex flex-wrap justify-center gap-x-2 gap-y-1 md:gap-x-6">
          {assets.products.map((p) => {
            const id = p.href.replace("/", "");
            const active = id === activeId;
            return (
              <li key={p.href}>
                <Link
                  href={p.href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-block px-1 pb-1 text-[13px] font-bold transition-colors md:text-sm ${
                    active
                      ? "border-b-2 border-brand-red text-brand-red"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  {p.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
