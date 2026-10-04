import Link from "next/link";
import { getBoardItems, getCasePages, getProductPages } from "@/lib/content";
import { assets, jobPosts, sitePolicyModals } from "@/lib/data";
import { isDatabaseConfigured } from "@/lib/db/client";
import { isUploadConfigured } from "@/lib/admin/blob";
import { adminDict } from "@/lib/i18n/admin";
import { getAdminLocale } from "@/lib/i18n/admin-server";
import { localizeHref } from "@/lib/i18n/locales";

const cardCls = "rounded-[4px] border border-black/10 bg-white p-5";
const numCls = "mt-1 text-[26px] font-bold text-ink";
const subCls = "mt-1 text-[12px] text-ink/50";

export default async function AdminDashboardPage() {
  const locale = await getAdminLocale();
  const t = adminDict[locale].dashboard;

  const [products, cases, news, downloads, caseStudio, items] =
    await Promise.all([
      getProductPages(),
      getCasePages(),
      getBoardItems("news"),
      getBoardItems("downloads"),
      getBoardItems("case-studio"),
      getBoardItems("interesting-items"),
    ]);

  const productCount = Object.keys(products).length;
  const caseCount = Object.keys(cases).length;
  const boardCount =
    news.length + downloads.length + caseStudio.length + items.length;
  const mediaCount =
    assets.galleryImages.length + assets.patentImages.length + jobPosts.length;

  const stats = [
    {
      label: t.statProductsCases,
      value: productCount + caseCount,
      sub: t.statProductsCasesSub(productCount, caseCount),
    },
    {
      label: t.statBoards,
      value: boardCount,
      sub: t.statBoardsSub(news.length, downloads.length, caseStudio.length),
    },
    {
      label: t.statMedia,
      value: mediaCount,
      sub: t.statMediaSub(mediaCount - jobPosts.length, jobPosts.length),
    },
    {
      label: t.statPolicy,
      value: Object.keys(sitePolicyModals).length,
      sub: t.statPolicySub,
    },
  ];

  const storeReady = isDatabaseConfigured();
  const uploadReady = isUploadConfigured();

  const noticeLines = [
    storeReady ? t.noticeStoreReady : t.noticeStoreMissing,
    uploadReady ? t.noticeUploadReady : t.noticeUploadMissing,
    t.noticePublish,
    t.noticePreview,
  ];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className={cardCls}>
            <p className="text-[13px] text-ink/60">{stat.label}</p>
            <p className={numCls}>{stat.value}</p>
            <p className={subCls}>{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className={cardCls}>
          <h2 className="text-[15px] font-bold text-ink">{t.quickLinks}</h2>
          <ul className="mt-3 space-y-2 text-[14px]">
            {t.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={localizeHref(link.href, locale)}
                  className="text-brand hover:underline"
                >
                  {link.label}
                </Link>
                <span className="text-ink/50"> — {link.desc}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={cardCls}>
          <h2 className="text-[15px] font-bold text-ink">{t.notice}</h2>
          <div className="mt-3 text-[13px] leading-6 text-ink/70">
            {noticeLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
