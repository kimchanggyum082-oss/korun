import Link from "next/link";
import { getChrome } from "@/lib/i18n/server";
import { resolveActiveLocale } from "@/lib/content";
import { localizeHref } from "@/lib/i18n/locales";

export default async function NotFound() {
  const [t, locale] = await Promise.all([getChrome(), resolveActiveLocale()]);
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-[60px] font-bold leading-none text-brand md:text-[80px]">
        404
      </p>
      <p className="mt-4 text-[16px] text-neutral-600 md:text-[18px]">
        {t.notFound.message}
      </p>
      <Link
        href={localizeHref("/", locale)}
        className="mt-6 bg-ink px-6 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-brand"
      >
        {t.notFound.home}
      </Link>
    </div>
  );
}
