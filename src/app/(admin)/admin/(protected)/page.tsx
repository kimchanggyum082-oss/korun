import Link from "next/link";
import { getBoardItems, getCasePages, getProductPages } from "@/lib/content";
import { assets, jobPosts, sitePolicyModals } from "@/lib/data";
import { isDatabaseConfigured } from "@/lib/db/client";
import { isBlobConfigured } from "@/lib/admin/blob";

const cardCls = "rounded-[4px] border border-black/10 bg-white p-5";
const numCls = "mt-1 text-[26px] font-bold text-ink";
const subCls = "mt-1 text-[12px] text-ink/50";

export default async function AdminDashboardPage() {
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
      label: "제품 · 적용 사례",
      value: productCount + caseCount,
      sub: `제품 ${productCount} · 사례 ${caseCount}`,
    },
    {
      label: "게시판 게시물",
      value: boardCount,
      sub: `뉴스 ${news.length} · 자료실 ${downloads.length} · 스튜디오 ${caseStudio.length}`,
    },
    {
      label: "이미지 · 채용",
      value: mediaCount,
      sub: `갤러리·특허 이미지 ${mediaCount - jobPosts.length} · 채용 공고 ${jobPosts.length}`,
    },
    {
      label: "정책 문서",
      value: Object.keys(sitePolicyModals).length,
      sub: "이용약관 · 개인정보취급방침",
    },
  ];

  const storeReady = isDatabaseConfigured();
  const uploadReady = isBlobConfigured();

  const quickLinks = [
    {
      href: "/admin/home",
      label: "홈 섹션",
      desc: "히어로, 제품, CTA, 목록, 회사 소개, 오시는 길 문구와 이미지",
    },
    {
      href: "/admin/about/greetings",
      label: "인사말",
      desc: "About 대표 인사말 배너와 본문",
    },
    {
      href: "/admin/products/21",
      label: "제품 페이지",
      desc: "제품 21~24의 제목, 설명, 블록 이미지",
    },
    {
      href: "/admin/cases/automotive-parts",
      label: "적용 사례",
      desc: "사례 5종의 배너, 본문, 갤러리",
    },
    {
      href: "/admin/service/news",
      label: "뉴스",
      desc: "뉴스·이벤트 목록과 상세 본문, 첨부 파일",
    },
    {
      href: "/admin/service/downloads",
      label: "자료실",
      desc: "제품 소개서와 다운로드 파일",
    },
    {
      href: "/admin/service/case-studio",
      label: "케이스 스튜디오",
      desc: "케이스 스튜디오 게시물과 첨부 파일",
    },
    {
      href: "/admin/site/settings",
      label: "사이트 설정",
      desc: "회사 정보, 지도, 검색·공유 메타데이터",
    },
    {
      href: "/admin/site/footer",
      label: "푸터",
      desc: "회사 정보 표기, 약관 링크, 저작권 문구",
    },
  ];

  const noticeLines = [
    storeReady
      ? "콘텐츠 저장소가 연결되어 있어 편집 내용이 데이터베이스에 저장됩니다."
      : "DATABASE_URL이 없어 번들에 포함된 기본 콘텐츠를 표시하고 있습니다. 편집 내용은 저장되지 않습니다.",
    uploadReady
      ? "이미지 업로드가 설정되어 있어 새 이미지를 올릴 수 있습니다."
      : "이미지 업로드에는 BLOB_READ_WRITE_TOKEN 설정이 필요합니다.",
    "게시를 실행하면 변경 내용이 공개 사이트에 반영됩니다.",
    "미리보기는 공개 페이지와 동일한 화면을 실제 크기(1280px)로 축소해 보여줍니다.",
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className={cardCls}>
            <p className="text-[13px] text-ink/60">{stat.label}</p>
            <p className={numCls}>{stat.value}</p>
            <p className={subCls}>{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={cardCls}>
          <h2 className="text-[15px] font-bold text-ink">바로 가기</h2>
          <ul className="mt-3 space-y-2 text-[14px]">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-brand hover:underline">
                  {link.label}
                </Link>
                <span className="text-ink/50"> — {link.desc}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={cardCls}>
          <h2 className="text-[15px] font-bold text-ink">안내</h2>
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
