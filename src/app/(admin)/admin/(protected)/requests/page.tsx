import type { Metadata } from "next";
import {
  isContactStoreConfigured,
  listContactRequests,
} from "@/lib/contact/requests";
import { adminDict } from "@/lib/i18n/admin";
import { getAdminLocale } from "@/lib/i18n/admin-server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getAdminLocale();
  return {
    title: adminDict[locale].requests.title,
    robots: { index: false, follow: false },
  };
}

function formatDate(value: Date | null): string {
  if (!value) return "—";
  return new Date(value).toISOString().slice(0, 16).replace("T", " ");
}

export default async function AdminRequestsPage() {
  const locale = await getAdminLocale();
  const t = adminDict[locale].requests;
  const configured = isContactStoreConfigured();
  const rows = configured ? await listContactRequests() : [];

  return (
    <div>
      <div className="rounded-[4px] border border-black/10 bg-white p-5">
        <h2 className="text-[16px] font-bold text-ink">{t.title}</h2>
        <p className="mt-1 text-[13px] text-ink/60">{t.subtitle}</p>
      </div>

      {!configured || rows.length === 0 ? (
        <p className="mt-4 rounded-[4px] border border-black/10 bg-white p-5 text-[13px] text-ink/60">
          {configured ? t.empty : t.storeMissing}
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {rows.map((row) => (
            <li
              key={row.id}
              className="rounded-[4px] border border-black/10 bg-white p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[14px] font-bold text-ink">
                  {row.name}
                  {row.company ? (
                    <span className="ml-2 font-normal text-ink/60">
                      {row.company}
                    </span>
                  ) : null}
                </p>
                <span className="text-[12px] text-ink/50">
                  {formatDate(row.createdAt)}
                </span>
              </div>

              <dl className="mt-3 grid gap-x-6 gap-y-1 text-[13px] sm:grid-cols-2">
                <div className="flex gap-2">
                  <dt className="w-[64px] shrink-0 text-ink/50">{t.email}</dt>
                  <dd className="min-w-0 break-all text-ink">
                    <a href={`mailto:${row.email}`} className="hover:underline">
                      {row.email}
                    </a>
                  </dd>
                </div>
                {row.phone ? (
                  <div className="flex gap-2">
                    <dt className="w-[64px] shrink-0 text-ink/50">{t.phone}</dt>
                    <dd className="text-ink">{row.phone}</dd>
                  </div>
                ) : null}
                {row.subject ? (
                  <div className="flex gap-2 sm:col-span-2">
                    <dt className="w-[64px] shrink-0 text-ink/50">
                      {t.subject}
                    </dt>
                    <dd className="text-ink">{row.subject}</dd>
                  </div>
                ) : null}
                {row.page ? (
                  <div className="flex gap-2 sm:col-span-2">
                    <dt className="w-[64px] shrink-0 text-ink/50">{t.page}</dt>
                    <dd className="break-all text-ink/60">{row.page}</dd>
                  </div>
                ) : null}
              </dl>

              <p className="mt-3 whitespace-pre-line border-t border-black/10 pt-3 text-[13px] leading-6 text-ink">
                {row.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
