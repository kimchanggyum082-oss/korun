import type { Locale } from "./locales";

const ko = {
  news: {
    meta: {
      title: (company: string) => `News&Events | ${company}`,
      description: "코런의 새로운 소식과 이벤트를 확인하실 수 있습니다.",
    },
    subtitle: "최신 뉴스와 이벤트를 한눈에 보여드립니다",
    sectionLabel: "News&Events",
    mobileTitle: "News & Events",
    boardName: "뉴스&이벤트",
  },
  downloads: {
    meta: {
      title: (company: string) => `Downloads | ${company}`,
      description:
        "코런 제품 카탈로그 및 기술 자료를 다운로드하실 수 있습니다.",
    },
    subtitle: "\u00a0코런의 제품과 회사소개서를 다운받을 수 있습니다.\u00a0",
    mobileSubtitle: "다운로드 파일을 제공해드립니다",
    sectionLabel: "Downloads",
    boardName: "Downloads",
    fileLabel: "다운로드 파일",
  },
  caseStudio: {
    meta: {
      title: (company: string) => `Case Studio | ${company}`,
      description: "코런의 다양한 적용 사례를 확인하실 수 있습니다.",
    },
    sectionLabel: "Case Studio",
    mobileSubtitle: "다운로드 파일을 제공해드립니다",
    mobileTitle: "Downloads",
    boardName: "Case Studio",
    fileLabel: "첨부파일",
  },
  search: {
    meta: {
      title: "코런",
      description: "코런 웹사이트의 통합 검색 결과를 확인하실 수 있습니다.",
    },
  },
};

export type PagesServiceDict = typeof ko;

const en: PagesServiceDict = {
  news: {
    meta: {
      title: (company) => `News & Events | ${company}`,
      description:
        "Stay up to date with the latest news and events from KORUN.",
    },
    subtitle: "The latest news and events at a glance",
    sectionLabel: "News&Events",
    mobileTitle: "News & Events",
    boardName: "News & Events",
  },
  downloads: {
    meta: {
      title: (company) => `Downloads | ${company}`,
      description: "Download KORUN product catalogues and technical documents.",
    },
    subtitle:
      "\u00a0Download KORUN product catalogues and company brochures.\u00a0",
    mobileSubtitle: "Browse the files available for download",
    sectionLabel: "Downloads",
    boardName: "Downloads",
    fileLabel: "Download files",
  },
  caseStudio: {
    meta: {
      title: (company) => `Case Studio | ${company}`,
      description: "Explore the many ways KORUN products are put to work.",
    },
    sectionLabel: "Case Studio",
    mobileSubtitle: "Browse the files available for download",
    mobileTitle: "Downloads",
    boardName: "Case Studio",
    fileLabel: "Attachments",
  },
  search: {
    meta: {
      title: "KORUN",
      description: "Search results across the KORUN website.",
    },
  },
};

export const pagesService = { ko, en } satisfies Record<
  Locale,
  PagesServiceDict
>;
