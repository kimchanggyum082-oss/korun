"use client";

import Link from "next/link";

import { adminDict } from "@/lib/i18n/admin";
import { useLocale } from "@/lib/i18n/client";

export default function NewPostLink({ href }: { href: string }) {
  const locale = useLocale();
  return (
    <Link
      href={href}
      className="inline-flex h-9 shrink-0 items-center rounded-md bg-brand px-3.5 text-[13px] font-semibold text-white transition-colors outline-none hover:bg-ink focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2"
    >
      + {adminDict[locale].editor.newPost}
    </Link>
  );
}
