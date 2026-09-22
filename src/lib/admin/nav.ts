export type AdminNavItem = {
  label: string;
  ko: string;
  href: string;
  description: string;
  children?: AdminNavItem[];
};

export const adminNav: AdminNavItem[] = [
  {
    label: "Dashboard",
    ko: "대시보드",
    href: "/admin",
    description: "전체 콘텐츠 현황을 한눈에 확인합니다.",
  },
  {
    label: "Site",
    ko: "사이트",
    description: "사이트 공통 설정을 관리합니다.",
    href: "/admin/site",
    children: [
      {
        label: "Settings",
        ko: "기본 설정",
        href: "/admin/site/settings",
        description: "사이트 이름, 연락처, 주소 등 기본 정보를 관리합니다.",
      },
      {
        label: "Nav labels",
        ko: "메뉴 이름",
        href: "/admin/site/nav",
        description: "상단 메뉴와 하위 메뉴의 이름과 순서를 관리합니다.",
      },
      {
        label: "Footer",
        ko: "푸터",
        href: "/admin/site/footer",
        description: "푸터의 회사 정보와 링크를 관리합니다.",
      },
      {
        label: "UI strings",
        ko: "UI 문구",
        href: "/admin/site/ui-strings",
        description: "버튼, 안내 문구 등 공통 UI 텍스트를 관리합니다.",
      },
      {
        label: "Policy",
        ko: "정책 문서",
        href: "/admin/site/policy",
        description: "이용약관과 개인정보 처리방침을 관리합니다.",
      },
    ],
  },
  {
    label: "Home",
    ko: "홈",
    href: "/admin/home",
    description: "메인 페이지의 히어로, 제품 소개, 배너 영역을 관리합니다.",
  },
  {
    label: "About",
    ko: "회사 소개",
    href: "/admin/about",
    description: "회사 소개 페이지의 내용을 관리합니다.",
    children: [
      {
        label: "Greetings",
        ko: "인사말",
        href: "/admin/about/greetings",
        description: "인사말 문구와 이미지, 시설 갤러리를 관리합니다.",
      },
      {
        label: "Patents",
        ko: "특허·인증",
        href: "/admin/about/patent-credentials",
        description: "특허와 인증서 목록을 관리합니다.",
      },
      {
        label: "Location",
        ko: "오시는 길",
        href: "/admin/about/company-location",
        description: "본사 주소와 지도 정보를 관리합니다.",
      },
      {
        label: "Job posting",
        ko: "채용",
        href: "/admin/about/job-posting",
        description: "채용 공고 목록과 상세 내용을 관리합니다.",
      },
    ],
  },
  {
    label: "Products",
    ko: "제품",
    href: "/admin/products",
    description: "제품 페이지의 구성 요소와 사양을 관리합니다.",
    children: [
      {
        label: "21 Valve Gate",
        ko: "21 밸브 게이트",
        href: "/admin/products/21",
        description: "밸브 게이트 시스템 페이지를 관리합니다.",
      },
      {
        label: "22 Open Gate",
        ko: "22 오픈 게이트",
        href: "/admin/products/22",
        description: "오픈 게이트 시스템 페이지를 관리합니다.",
      },
      {
        label: "23 Single Nozzle",
        ko: "23 싱글 노즐",
        href: "/admin/products/23",
        description: "싱글 노즐 페이지를 관리합니다.",
      },
      {
        label: "24 Controllers",
        ko: "24 컨트롤러",
        href: "/admin/products/24",
        description: "온도·시퀀스 컨트롤러 페이지를 관리합니다.",
      },
    ],
  },
  {
    label: "Cases",
    ko: "적용 사례",
    href: "/admin/cases",
    description: "적용 사례 페이지를 관리합니다.",
    children: [
      {
        label: "Automotive Parts",
        ko: "자동차 부품",
        href: "/admin/cases/automotive-parts",
        description: "자동차 부품 적용 사례를 관리합니다.",
      },
      {
        label: "Transparent Parts",
        ko: "투명 부품",
        href: "/admin/cases/transparent-parts",
        description: "투명 부품 적용 사례를 관리합니다.",
      },
      {
        label: "Office & House Appliances",
        ko: "생활 가전",
        href: "/admin/cases/office-house-appliances",
        description: "생활 가전 적용 사례를 관리합니다.",
      },
      {
        label: "Daily Supplies",
        ko: "생활 용품",
        href: "/admin/cases/daily-supplies",
        description: "생활 용품 적용 사례를 관리합니다.",
      },
      {
        label: "Engineering Plastics Parts",
        ko: "엔지니어링 플라스틱",
        href: "/admin/cases/engineering-plastics-parts",
        description: "엔지니어링 플라스틱 부품 적용 사례를 관리합니다.",
      },
    ],
  },
  {
    label: "Technology",
    ko: "기술",
    href: "/admin/technology",
    description: "기술 자료를 관리합니다.",
    children: [
      {
        label: "Items",
        ko: "흥미로운 아이템",
        href: "/admin/technology/items",
        description: "흥미로운 아이템 목록과 상세 내용을 관리합니다.",
      },
    ],
  },
  {
    label: "Service",
    ko: "서비스",
    href: "/admin/service",
    description: "고객 서비스 게시판을 관리합니다.",
    children: [
      {
        label: "News",
        ko: "뉴스",
        href: "/admin/service/news",
        description: "뉴스와 이벤트 게시글을 관리합니다.",
      },
      {
        label: "Downloads",
        ko: "자료실",
        href: "/admin/service/downloads",
        description: "카탈로그와 자료 파일을 관리합니다.",
      },
      {
        label: "Case Studio",
        ko: "케이스 스튜디오",
        href: "/admin/service/case-studio",
        description: "케이스 스튜디오 게시글을 관리합니다.",
      },
    ],
  },
  {
    label: "Media",
    ko: "미디어",
    href: "/admin/media",
    description: "이미지와 파일 자산을 관리합니다.",
  },
  {
    label: "Revisions",
    ko: "변경 이력",
    href: "/admin/revisions",
    description: "콘텐츠 변경 이력과 게시 기록을 확인합니다.",
  },
];

export function findAdminNavItem(path: string): AdminNavItem | undefined {
  for (const item of adminNav) {
    if (item.href === path) return item;
    const child = item.children?.find((entry) => entry.href === path);
    if (child) return child;
  }
  return undefined;
}

export const adminNavLeaves: AdminNavItem[] = adminNav.flatMap((item) =>
  item.children ? item.children : item,
);
