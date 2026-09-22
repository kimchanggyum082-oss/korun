import type { Locale } from "./locales";

const ko = {
  home: {
    meta: {
      title: "코런",
      description:
        "코런은 밸브 게이트, 오픈 게이트, 싱글 노즐, 온도·시퀀스 컨트롤러를 개발·제조하는 핫러너 시스템 전문기업입니다. 다양한 사출 환경에 최적화된 기술과 맞춤형 솔루션을 제공합니다.",
    },
  },
  about: {
    greetings: {
      meta: {
        title: (company: string) => `Greetings | ${company}`,
        description:
          "주식회사 코런은 2014년에 설립되어 고품질의 러너리스 사출성형 시스템 Hot Runner System 전문 제조 회사입니다.",
      },
    },
    patentCredentials: {
      meta: {
        title: (company: string) => `Patent & Credentials | ${company}`,
        description: (company: string) =>
          `${company}의 특허 및 인증 현황을 확인하실 수 있습니다.`,
      },
    },
    companyLocation: {
      meta: {
        title: (company: string) => `Company Location | ${company}`,
        description: (company: string) =>
          `${company}의 본사 및 공장 위치 안내입니다.`,
      },
    },
    jobPosting: {
      meta: {
        title: (company: string) => `Job Posting | ${company}`,
        description: (company: string) =>
          `${company}의 채용 정보를 안내해 드립니다.`,
      },
      detail: {
        sectionLabel: "Job Posting",
        boardName: "Job Posting",
        fileLabel: "첨부파일",
      },
    },
  },
  technology: {
    interestingItems: {
      meta: {
        title: (company: string) => `Interesting Items | ${company}`,
        description: "자사의 기술력으로 구현된 다양한 제품을 소개합니다.",
      },
      subtitle: "자사의 기술력으로 구현된 다양한 제품을 소개합니다.",
      mobileSubtitle: "신적이고 탁월한 아이템을 소개드립니다",
      sectionLabel: "Interesting Items",
      boardName: "Interesting Items",
    },
  },
};

export type PagesAboutDict = typeof ko;

const en: PagesAboutDict = {
  home: {
    meta: {
      title: "KORUN",
      description:
        "KORUN is a hot runner system specialist that develops and manufactures valve gate systems, open gate systems, single nozzles, and time & temperature controllers, with technology and tailored solutions optimised for every injection molding environment.",
    },
  },
  about: {
    greetings: {
      meta: {
        title: (company) => `Greetings | ${company}`,
        description:
          "Founded in 2014, KORUN is a manufacturer specialising in high-quality runnerless injection molding Hot Runner Systems.",
      },
    },
    patentCredentials: {
      meta: {
        title: (company) => `Patent & Credentials | ${company}`,
        description: (company) =>
          `View ${company}'s patents and certifications.`,
      },
    },
    companyLocation: {
      meta: {
        title: (company) => `Company Location | ${company}`,
        description: (company) =>
          `Head office and factory location for ${company}.`,
      },
    },
    jobPosting: {
      meta: {
        title: (company) => `Job Posting | ${company}`,
        description: (company) => `Current job openings at ${company}.`,
      },
      detail: {
        sectionLabel: "Job Posting",
        boardName: "Job Posting",
        fileLabel: "Attachments",
      },
    },
  },
  technology: {
    interestingItems: {
      meta: {
        title: (company) => `Interesting Items | ${company}`,
        description:
          "A look at the diverse products realised through our engineering.",
      },
      subtitle:
        "A look at the diverse products realised through our engineering.",
      mobileSubtitle: "Discover innovative and outstanding items",
      sectionLabel: "Interesting Items",
      boardName: "Interesting Items",
    },
  },
};

export const pagesAbout = { ko, en } satisfies Record<Locale, PagesAboutDict>;
