import type {
  AboutContentMap,
  CasePageData,
  GalleryImage,
  HomeContent,
  InterestingItem,
  ProductPageData,
  ServiceCaseStudioItem,
  ServiceDownloadItem,
  ServiceNewsItem,
} from "@/lib/data";
import { jobPosts } from "@/lib/data";

type JobPost = (typeof jobPosts)[number];

export const ENTITY_KEYS = {
  siteSettings: "site:settings",
  siteFooter: "site:footer",
  policy: "policy:policy",
  privacy: "policy:privacy",
  uiStrings: "ui:strings",
  home: "page:home",
  aboutGreetings: "page:about:greetings",
  aboutPatent: "page:about:patent-credentials",
  aboutLocation: "page:about:company-location",
  aboutJobPosting: "page:about:job-posting",
  product21: "product:21",
  product22: "product:22",
  product23: "product:23",
  product24: "product:24",
  caseAutomotive: "case:automotive-parts",
  caseTransparent: "case:transparent-parts",
  caseAppliances: "case:office-house-appliances",
  caseDaily: "case:daily-supplies",
  caseEngineering: "case:engineering-plastics-parts",
  boardsNews: "boards:news",
  boardsDownloads: "boards:downloads",
  boardsCaseStudio: "boards:case-studio",
  boardsInteresting: "boards:interesting-items",
  boardsJobs: "boards:job-posting",
} as const;

export type NewsItemEntityKey = `board:news:${string}`;
export type DownloadItemEntityKey = `board:downloads:${string}`;
export type StudioItemEntityKey = `board:case-studio:${string}`;
export type InterestingItemEntityKey = `board:interesting-items:${string}`;
export type JobPostEntityKey = `board:job-posting:${string}`;

export type EditableEntityKey =
  | (typeof ENTITY_KEYS)[keyof typeof ENTITY_KEYS]
  | NewsItemEntityKey
  | DownloadItemEntityKey
  | StudioItemEntityKey
  | InterestingItemEntityKey
  | JobPostEntityKey;

export function newsEntityKey(idx: string): NewsItemEntityKey {
  return `board:news:${idx}`;
}

export function downloadEntityKey(idx: string): DownloadItemEntityKey {
  return `board:downloads:${idx}`;
}

export function studioEntityKey(idx: string): StudioItemEntityKey {
  return `board:case-studio:${idx}`;
}

export function interestingItemEntityKey(
  idx: string,
): InterestingItemEntityKey {
  return `board:interesting-items:${idx}`;
}

export function jobPostEntityKey(idx: string): JobPostEntityKey {
  return `board:job-posting:${idx}`;
}

export const EDITABLE_ENTITY_KEYS: EditableEntityKey[] =
  Object.values(ENTITY_KEYS);

export const CASE_SLUGS = [
  "automotive-parts",
  "transparent-parts",
  "office-house-appliances",
  "daily-supplies",
  "engineering-plastics-parts",
] as const;

export type CaseSlug = (typeof CASE_SLUGS)[number];

export const CASE_ENTITY_KEYS = {
  "automotive-parts": ENTITY_KEYS.caseAutomotive,
  "transparent-parts": ENTITY_KEYS.caseTransparent,
  "office-house-appliances": ENTITY_KEYS.caseAppliances,
  "daily-supplies": ENTITY_KEYS.caseDaily,
  "engineering-plastics-parts": ENTITY_KEYS.caseEngineering,
} as const satisfies Record<CaseSlug, EditableEntityKey>;

export function isCaseSlug(value: unknown): value is CaseSlug {
  return (
    typeof value === "string" &&
    (CASE_SLUGS as readonly string[]).includes(value)
  );
}

export const PRODUCT_IDS = ["21", "22", "23", "24"] as const;

export type ProductId = (typeof PRODUCT_IDS)[number];

export const PRODUCT_ENTITY_KEYS = {
  "21": ENTITY_KEYS.product21,
  "22": ENTITY_KEYS.product22,
  "23": ENTITY_KEYS.product23,
  "24": ENTITY_KEYS.product24,
} as const satisfies Record<ProductId, EditableEntityKey>;

export function isProductId(value: unknown): value is ProductId {
  return (
    typeof value === "string" &&
    (PRODUCT_IDS as readonly string[]).includes(value)
  );
}

export type SiteMetadata = {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
};

export type SiteSettingsEntity = {
  name: string;
  nameEn: string;
  tagline: string;
  taglineSub: string;
  tel: string;
  fax: string;
  email: string;
  address: string;
  mapEmbed: string;
  metadata: SiteMetadata;
};

export type SiteFooterEntity = {
  labels: {
    company: string;
    address: string;
    tel: string;
    fax: string;
    email: string;
  };
  copyright: string;
  links: {
    policy: string;
    privacy: string;
  };
};

export type PolicyEntity = {
  title: string;
  html: string;
};

export type UiStringEntry = {
  ko: string;
  en: string;
};

export type UiStringsEntity = Record<string, UiStringEntry>;

export type AboutGreetingsEntity = {
  content: AboutContentMap["greetings"];
};

export type AboutPatentEntity = {
  content: AboutContentMap["patent-credentials"];
  assets: {
    patentImages: GalleryImage[];
  };
};

export type AboutLocationEntity = {
  content: AboutContentMap["company-location"];
};

export type AboutJobPostingEntity = {
  content: AboutContentMap["job-posting"];
};

export type EditableEntityValue = {
  [ENTITY_KEYS.siteSettings]: SiteSettingsEntity;
  [ENTITY_KEYS.siteFooter]: SiteFooterEntity;
  [ENTITY_KEYS.policy]: PolicyEntity;
  [ENTITY_KEYS.privacy]: PolicyEntity;
  [ENTITY_KEYS.uiStrings]: UiStringsEntity;
  [ENTITY_KEYS.home]: HomeContent;
  [ENTITY_KEYS.aboutGreetings]: AboutGreetingsEntity;
  [ENTITY_KEYS.aboutPatent]: AboutPatentEntity;
  [ENTITY_KEYS.aboutLocation]: AboutLocationEntity;
  [ENTITY_KEYS.aboutJobPosting]: AboutJobPostingEntity;
  [ENTITY_KEYS.product21]: ProductPageData;
  [ENTITY_KEYS.product22]: ProductPageData;
  [ENTITY_KEYS.product23]: ProductPageData;
  [ENTITY_KEYS.product24]: ProductPageData;
  [ENTITY_KEYS.caseAutomotive]: CasePageData;
  [ENTITY_KEYS.caseTransparent]: CasePageData;
  [ENTITY_KEYS.caseAppliances]: CasePageData;
  [ENTITY_KEYS.caseDaily]: CasePageData;
  [ENTITY_KEYS.caseEngineering]: CasePageData;
  [ENTITY_KEYS.boardsNews]: ServiceNewsItem[];
  [ENTITY_KEYS.boardsDownloads]: ServiceDownloadItem[];
  [ENTITY_KEYS.boardsCaseStudio]: ServiceCaseStudioItem[];
  [ENTITY_KEYS.boardsInteresting]: InterestingItem[];
  [ENTITY_KEYS.boardsJobs]: JobPost[];
} & {
  [K in NewsItemEntityKey]: ServiceNewsItem;
} & {
  [K in DownloadItemEntityKey]: ServiceDownloadItem;
} & {
  [K in StudioItemEntityKey]: ServiceCaseStudioItem;
} & {
  [K in InterestingItemEntityKey]: InterestingItem;
} & {
  [K in JobPostEntityKey]: JobPost;
};

export type EntitySource = "draft" | "published" | "default";

const BOARD_NEWS_ITEM_KEY = /^board:news:[A-Za-z0-9_-]+$/;
const BOARD_DOWNLOAD_ITEM_KEY = /^board:downloads:[A-Za-z0-9_-]+$/;
const BOARD_STUDIO_ITEM_KEY = /^board:case-studio:[A-Za-z0-9_-]+$/;
const BOARD_INTERESTING_ITEM_KEY = /^board:interesting-items:[A-Za-z0-9_-]+$/;
const BOARD_JOB_POST_KEY = /^board:job-posting:[A-Za-z0-9_-]+$/;

export function isEditableEntityKey(
  value: unknown,
): value is EditableEntityKey {
  if (typeof value !== "string") return false;
  if ((EDITABLE_ENTITY_KEYS as string[]).includes(value)) return true;
  return (
    BOARD_NEWS_ITEM_KEY.test(value) ||
    BOARD_DOWNLOAD_ITEM_KEY.test(value) ||
    BOARD_STUDIO_ITEM_KEY.test(value) ||
    BOARD_INTERESTING_ITEM_KEY.test(value) ||
    BOARD_JOB_POST_KEY.test(value)
  );
}
