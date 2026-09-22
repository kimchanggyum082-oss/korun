import { applyOverride } from "@/lib/content/merge";
import { getDraft, getPublished } from "@/lib/content/store";
import {
  aboutContent,
  assets,
  casePages,
  caseStudioItems,
  company,
  downloadItems,
  homeContent,
  interestingItems,
  jobPosts,
  newsItems,
  productPages,
  sitePolicyModals,
} from "@/lib/data";
import {
  ENTITY_KEYS,
  type EditableEntityKey,
  type EditableEntityValue,
  type EntitySource,
  type PolicyEntity,
  type SiteFooterData,
  type SiteSettingsData,
  type UiStringsEntity,
} from "./entities";

export const SITE_METADATA_DEFAULT = {
  title: "코런",
  description:
    "코런은 밸브 게이트, 오픈 게이트, 싱글 노즐, 온도·시퀀스 컨트롤러를 개발·제조하는 핫러너 시스템 전문기업입니다. 다양한 사출 환경에 최적화된 기술과 맞춤형 솔루션을 제공합니다.",
  keywords: ["코런"],
  ogImage:
    "https://cdn.imweb.me/upload/S20240617d196c3c9ecacb/2b04303145abc.png",
};

export function siteSettingsDefault(): SiteSettingsData {
  return { ...company, metadata: { ...SITE_METADATA_DEFAULT } };
}

export function siteFooterDefault(): SiteFooterData {
  return {
    labels: {
      company: "회사명",
      address: "주소",
      tel: "TEL",
      fax: "Fax",
      email: "E-mail",
    },
    copyright:
      "COPYRIGHT © 주식회사코런. ALL RIGHTS RESERVED. DESIGN HOSTING BY WEMENTO.",
    links: {
      policy: "이용약관",
      privacy: "개인정보취급방침",
    },
  };
}

export function policyDefault(mode: "policy" | "privacy"): PolicyEntity {
  const modal = sitePolicyModals[mode];
  return { title: modal.title, html: modal.html };
}

export function uiStringsDefault(): UiStringsEntity {
  return {
    search: { ko: "검색", en: "Search" },
    searchPlaceholder: { ko: "검색어를 입력하세요", en: "Search…" },
    menu: { ko: "메뉴", en: "Menu" },
    close: { ko: "닫기", en: "Close" },
    more: { ko: "더보기", en: "More" },
    prev: { ko: "이전", en: "Previous" },
    next: { ko: "다음", en: "Next" },
    noResults: { ko: "검색 결과가 없습니다.", en: "No results found." },
    contact: { ko: "문의하기", en: "Contact" },
    backToList: { ko: "목록으로", en: "Back to list" },
  };
}

export function entityDefault<K extends EditableEntityKey>(
  key: K,
): EditableEntityValue[K] {
  if (key.startsWith("board:news:")) {
    const idx = key.slice("board:news:".length);
    const item = newsItems.find((entry) => entry.idx === idx);
    if (!item) {
      throw new Error(`Unknown news item: ${idx}`);
    }
    return item as EditableEntityValue[K];
  }
  if (key.startsWith("board:downloads:")) {
    const idx = key.slice("board:downloads:".length);
    const item = downloadItems.find((entry) => entry.idx === idx);
    if (!item) {
      throw new Error(`Unknown download item: ${idx}`);
    }
    return item as EditableEntityValue[K];
  }
  if (key.startsWith("board:case-studio:")) {
    const idx = key.slice("board:case-studio:".length);
    const item = caseStudioItems.find((entry) => entry.idx === idx);
    if (!item) {
      throw new Error(`Unknown case studio item: ${idx}`);
    }
    return item as EditableEntityValue[K];
  }
  if (key.startsWith("board:interesting-items:")) {
    const idx = key.slice("board:interesting-items:".length);
    const item = interestingItems.find((entry) => entry.idx === idx);
    if (!item) {
      throw new Error(`Unknown interesting item: ${idx}`);
    }
    return item as EditableEntityValue[K];
  }
  if (key.startsWith("board:job-posting:")) {
    const idx = key.slice("board:job-posting:".length);
    const item = jobPosts.find((entry) => entry.idx === idx);
    if (!item) {
      throw new Error(`Unknown job post: ${idx}`);
    }
    return item as EditableEntityValue[K];
  }
  switch (key) {
    case ENTITY_KEYS.siteSettings:
      return siteSettingsDefault() as EditableEntityValue[K];
    case ENTITY_KEYS.siteFooter:
      return siteFooterDefault() as EditableEntityValue[K];
    case ENTITY_KEYS.policy:
      return policyDefault("policy") as EditableEntityValue[K];
    case ENTITY_KEYS.privacy:
      return policyDefault("privacy") as EditableEntityValue[K];
    case ENTITY_KEYS.home:
      return homeContent as EditableEntityValue[K];
    case ENTITY_KEYS.aboutGreetings:
      return { content: aboutContent.greetings } as EditableEntityValue[K];
    case ENTITY_KEYS.aboutPatent:
      return {
        content: aboutContent["patent-credentials"],
        assets: {
          patentImages: assets.patentImages.map((image) => ({ ...image })),
        },
      } as EditableEntityValue[K];
    case ENTITY_KEYS.aboutLocation:
      return {
        content: aboutContent["company-location"],
      } as EditableEntityValue[K];
    case ENTITY_KEYS.aboutJobPosting:
      return {
        content: aboutContent["job-posting"],
      } as EditableEntityValue[K];
    case ENTITY_KEYS.product21:
      return productPages["21"] as EditableEntityValue[K];
    case ENTITY_KEYS.product22:
      return productPages["22"] as EditableEntityValue[K];
    case ENTITY_KEYS.product23:
      return productPages["23"] as EditableEntityValue[K];
    case ENTITY_KEYS.product24:
      return productPages["24"] as EditableEntityValue[K];
    case ENTITY_KEYS.caseAutomotive:
      return casePages["automotive-parts"] as EditableEntityValue[K];
    case ENTITY_KEYS.caseTransparent:
      return casePages["transparent-parts"] as EditableEntityValue[K];
    case ENTITY_KEYS.caseAppliances:
      return casePages["office-house-appliances"] as EditableEntityValue[K];
    case ENTITY_KEYS.caseDaily:
      return casePages["daily-supplies"] as EditableEntityValue[K];
    case ENTITY_KEYS.caseEngineering:
      return casePages["engineering-plastics-parts"] as EditableEntityValue[K];
    case ENTITY_KEYS.boardsNews:
      return newsItems as EditableEntityValue[K];
    case ENTITY_KEYS.boardsDownloads:
      return downloadItems as EditableEntityValue[K];
    case ENTITY_KEYS.boardsCaseStudio:
      return caseStudioItems as EditableEntityValue[K];
    case ENTITY_KEYS.boardsInteresting:
      return interestingItems as EditableEntityValue[K];
    case ENTITY_KEYS.boardsJobs:
      return jobPosts as EditableEntityValue[K];
    case ENTITY_KEYS.uiStrings:
      return uiStringsDefault() as EditableEntityValue[K];
    default:
      throw new Error(`Unhandled entity default key: ${String(key)}`);
  }
}

export async function loadEditableEntity<K extends EditableEntityKey>(
  key: K,
): Promise<{ value: EditableEntityValue[K]; source: EntitySource }> {
  const fallback = entityDefault(key);
  const draft = await getDraft(key);
  if (draft !== null && draft !== undefined) {
    return { value: applyOverride(fallback, draft), source: "draft" };
  }
  const published = await getPublished(key);
  if (published !== null && published !== undefined) {
    return { value: applyOverride(fallback, published), source: "published" };
  }
  return { value: fallback, source: "default" };
}
