import type { Localized } from "@/lib/content/merge";
import type {
  AboutContentMap,
  CasePageData,
  GalleryImage,
  HomeContent,
  InterestingItem,
  InterestingItemBlock,
  ProductPageData,
  ServiceCaseStudioItem,
  ServiceDownloadItem,
  ServiceNewsItem,
  TextAlign,
  TextRun,
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

export type SiteMetadataData = {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
};

export type SiteSettingsData = {
  name: string;
  nameEn: string;
  tagline: string;
  taglineSub: string;
  tel: string;
  fax: string;
  email: string;
  address: string;
  mapEmbed: string;
  metadata: SiteMetadataData;
};

export type SiteFooterData = {
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

export type SiteMetadata = {
  title: Localized<string>;
  description: Localized<string>;
  keywords: string[];
  ogImage: string;
};

export type SiteSettingsEntity = {
  name: Localized<string>;
  nameEn: string;
  tagline: Localized<string>;
  taglineSub: Localized<string>;
  tel: string;
  fax: string;
  email: string;
  address: Localized<string>;
  mapEmbed: string;
  metadata: SiteMetadata;
};

export type SiteFooterEntity = {
  labels: {
    company: Localized<string>;
    address: Localized<string>;
    tel: Localized<string>;
    fax: Localized<string>;
    email: Localized<string>;
  };
  copyright: Localized<string>;
  links: {
    policy: Localized<string>;
    privacy: Localized<string>;
  };
};

export type PolicyEntity = {
  title: Localized<string>;
  html: Localized<string>;
};

export type UiStringEntry = {
  ko: string;
  en: string;
};

export type UiStringsEntity = Record<string, UiStringEntry>;

export type AboutBannerEntity = {
  line1: Localized<string>;
  line2: Localized<string>;
  title: Localized<string>;
};

export type AboutGreetingsContentEntity = {
  banner: AboutBannerEntity;
  heading: Localized<string>;
  intro: Localized<string>;
  paragraphs: Localized<string>[];
  signature: Localized<string>;
};

export type AboutGreetingsEntity = {
  content: AboutGreetingsContentEntity;
};

export type AboutPatentContentEntity = {
  title: Localized<string>;
};

export type GalleryImageEntity = {
  src: string;
  fullSrc: string;
  alt: Localized<string>;
};

export type AboutPatentEntity = {
  content: AboutPatentContentEntity;
  assets: {
    patentImages: GalleryImageEntity[];
  };
};

export type AboutLocationContentEntity = {
  title: Localized<string>;
  headingEn: string;
  headingKo: string;
  labels: {
    tel: Localized<string>;
    email: Localized<string>;
    address: Localized<string>;
  };
  mapTitle: Localized<string>;
};

export type AboutLocationEntity = {
  content: AboutLocationContentEntity;
};

export type AboutJobPostingContentEntity = {
  title: Localized<string>;
  tagline: Localized<string>;
  detailTaglineMobile: Localized<string>;
  detailTaglineDesktop: Localized<string>;
};

export type AboutJobPostingEntity = {
  content: AboutJobPostingContentEntity;
};

export type TextRunEntity = {
  text: Localized<string>;
  fontSize?: number;
  bold?: boolean;
  underline?: boolean;
};

export type InterestingItemBlockEntity =
  | {
      type: "text";
      content: Localized<string>;
      fontSize?: number;
      bold?: boolean;
      underline?: boolean;
      align?: TextAlign;
      parts?: TextRunEntity[];
    }
  | { type: "image"; src: string; width?: number; block?: boolean }
  | {
      type: "button";
      href: string;
      label: Localized<string>;
      align?: TextAlign;
    }
  | { type: "hr" }
  | { type: "br"; fontSize?: number; align?: TextAlign };

export type InterestingFileEntity = {
  name: Localized<string>;
  size: string;
};

export type InterestingItemEntity = {
  idx: string;
  no: number;
  category: Localized<string>;
  title: Localized<string>;
  author: Localized<string>;
  date: string;
  views: number;
  thumbnail: string;
  description: Localized<string>;
  blocks: InterestingItemBlockEntity[];
  files: InterestingFileEntity[];
};

export type ServiceFileEntity = {
  name: Localized<string>;
  size: string;
  url: string;
};

export type ServiceNewsItemEntity = {
  idx: string;
  category: Localized<string>;
  title: Localized<string>;
  author: Localized<string>;
  date: string;
  views: number;
  likes: number;
  notice?: boolean;
  description: Localized<string>;
  blocks: InterestingItemBlockEntity[];
  files: ServiceFileEntity[];
};

export type ServiceDownloadItemEntity = {
  idx: string;
  title: Localized<string>;
  date: string;
  views: number;
  thumbnail: string;
  description: Localized<string>;
  summary?: Localized<string>;
  blocks: InterestingItemBlockEntity[];
  files: ServiceFileEntity[];
};

export type ServiceCaseStudioItemEntity = {
  idx: string;
  title: Localized<string>;
  date: string;
  views: number;
  thumbnail: string;
  description: Localized<string>;
  summary?: Localized<string>;
  blocks: InterestingItemBlockEntity[];
  files: ServiceFileEntity[];
};

export type JobPostEntity = {
  idx: string;
  no: number;
  title: Localized<string>;
  author: Localized<string>;
  date: string;
  views: number;
  blocks: InterestingItemBlockEntity[];
  files: InterestingFileEntity[];
};

export type HomeHeroSlideEntity = {
  src: string;
  alt: Localized<string>;
};

export type HomeProductCardEntity = {
  title: Localized<string>;
  href: string;
  src: string;
  hoverSrc: string;
  mobileSrc: string;
};

export type HomePillEntity = {
  label: Localized<string>;
  color: string;
  padding: string;
  href: string;
};

export type HomeMobilePillEntity = {
  label: Localized<string>;
  color: string;
  padding: string;
};

export type HomeListsEntity = {
  penSmall: string;
  penMobile: string;
  newsHeadingEn: string;
  newsHeadingKo: string;
  downloadsHeadingEn: string;
  downloadsHeadingKo: string;
  writer: Localized<string>;
};

export type HomeLocationEntity = {
  penSmall: string;
  mapTitle: Localized<string>;
  headingEn: string;
  headingKo: string;
};

export type HomeEntity = {
  hero: {
    slides: HomeHeroSlideEntity[];
    slidesMobile: HomeHeroSlideEntity[];
  };
  products: {
    bg: string;
    penLarge: string;
    penMobile: string;
    mobileHeights: number[];
    mobileTitleLines: Localized<string>[];
    mobileBodyLines: Localized<string>[];
    pcTitle: Localized<string>;
    pcBody: Localized<string>;
    items: HomeProductCardEntity[];
  };
  values: {
    bg: string;
    bgMobile: string;
    bgAlt: Localized<string>;
    pc: HomePillEntity[];
    mobile: HomeMobilePillEntity[];
  };
  cta: {
    photo: string;
    photoMobile: string;
    penMobile: string;
    arrowDark: string;
    line1: Localized<string>;
    line2: Localized<string>;
  };
  lists: HomeListsEntity;
  location: HomeLocationEntity;
};

export type ProductApplicationEntity = {
  title: Localized<string>;
  images: string[];
};

export type SpecRowEntity = {
  label: Localized<string>;
  values: Localized<string>[];
  labelWidth?: string;
  valueWidth?: string;
};

export type ProductBlockEntity = {
  eyebrow?: Localized<string>;
  title?: Localized<string>;
  introTitle: Localized<string>;
  introImage?: string;
  introText?: Localized<string>;
  introBullets?: Localized<string>[];
  introTrailingBreak?: boolean;
  tags: readonly Localized<string>[];
  showInquiry?: boolean;
  galleryLabel: Localized<string>;
  gallery: string[];
  galleryThumbs?: string[];
  galleryColumns?: number;
  applications?: ProductApplicationEntity[];
  spec?: { model: Localized<string>; rows: SpecRowEntity[] };
};

export type ProductPageEntity = {
  id: string;
  navTitle: Localized<string>;
  description: Localized<string>;
  blocks: ProductBlockEntity[];
};

export type CaseSectionImageEntity = {
  src: string;
  width: number;
  height: number;
};

export type CaseSectionEntity = {
  heading: Localized<string>;
  text: Localized<string>;
  images: CaseSectionImageEntity[];
};

export type CaseGalleryImageEntity = {
  src: string;
  fullSrc: string;
  alt: Localized<string>;
};

export type CasePageEntity = {
  subtitle: Localized<string>;
  title: Localized<string>;
  heroImageMobile: string;
  heroImagePc: string;
  heroWidth: number;
  heroHeight: number;
  section?: CaseSectionEntity;
  galleryImages?: CaseGalleryImageEntity[];
};

export type EditableEntityValue = {
  [ENTITY_KEYS.siteSettings]: SiteSettingsEntity;
  [ENTITY_KEYS.siteFooter]: SiteFooterEntity;
  [ENTITY_KEYS.policy]: PolicyEntity;
  [ENTITY_KEYS.privacy]: PolicyEntity;
  [ENTITY_KEYS.uiStrings]: UiStringsEntity;
  [ENTITY_KEYS.home]: HomeEntity;
  [ENTITY_KEYS.aboutGreetings]: AboutGreetingsEntity;
  [ENTITY_KEYS.aboutPatent]: AboutPatentEntity;
  [ENTITY_KEYS.aboutLocation]: AboutLocationEntity;
  [ENTITY_KEYS.aboutJobPosting]: AboutJobPostingEntity;
  [ENTITY_KEYS.product21]: ProductPageEntity;
  [ENTITY_KEYS.product22]: ProductPageEntity;
  [ENTITY_KEYS.product23]: ProductPageEntity;
  [ENTITY_KEYS.product24]: ProductPageEntity;
  [ENTITY_KEYS.caseAutomotive]: CasePageEntity;
  [ENTITY_KEYS.caseTransparent]: CasePageEntity;
  [ENTITY_KEYS.caseAppliances]: CasePageEntity;
  [ENTITY_KEYS.caseDaily]: CasePageEntity;
  [ENTITY_KEYS.caseEngineering]: CasePageEntity;
  [ENTITY_KEYS.boardsNews]: ServiceNewsItemEntity[];
  [ENTITY_KEYS.boardsDownloads]: ServiceDownloadItemEntity[];
  [ENTITY_KEYS.boardsCaseStudio]: ServiceCaseStudioItemEntity[];
  [ENTITY_KEYS.boardsInteresting]: InterestingItemEntity[];
  [ENTITY_KEYS.boardsJobs]: JobPostEntity[];
} & {
  [K in NewsItemEntityKey]: ServiceNewsItemEntity;
} & {
  [K in DownloadItemEntityKey]: ServiceDownloadItemEntity;
} & {
  [K in StudioItemEntityKey]: ServiceCaseStudioItemEntity;
} & {
  [K in InterestingItemEntityKey]: InterestingItemEntity;
} & {
  [K in JobPostEntityKey]: JobPostEntity;
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

export function resolveLocalizedText(value: Localized<string>): string {
  return typeof value === "string" ? value : value.ko;
}

function resolveLocalizedList(values: readonly Localized<string>[]): string[] {
  return values.map(resolveLocalizedText);
}

export function toHomeContent(entity: HomeEntity): HomeContent {
  return {
    hero: {
      slides: entity.hero.slides.map((slide) => ({
        src: slide.src,
        alt: resolveLocalizedText(slide.alt),
      })),
      slidesMobile: entity.hero.slidesMobile.map((slide) => ({
        src: slide.src,
        alt: resolveLocalizedText(slide.alt),
      })),
    },
    products: {
      bg: entity.products.bg,
      penLarge: entity.products.penLarge,
      penMobile: entity.products.penMobile,
      mobileHeights: entity.products.mobileHeights,
      mobileTitleLines: resolveLocalizedList(entity.products.mobileTitleLines),
      mobileBodyLines: resolveLocalizedList(entity.products.mobileBodyLines),
      pcTitle: resolveLocalizedText(entity.products.pcTitle),
      pcBody: resolveLocalizedText(entity.products.pcBody),
      items: entity.products.items.map((item) => ({
        title: resolveLocalizedText(item.title),
        href: item.href,
        src: item.src,
        hoverSrc: item.hoverSrc,
        mobileSrc: item.mobileSrc,
      })),
    },
    values: {
      bg: entity.values.bg,
      bgMobile: entity.values.bgMobile,
      bgAlt: resolveLocalizedText(entity.values.bgAlt),
      pc: entity.values.pc.map((pill) => ({
        label: resolveLocalizedText(pill.label),
        color: pill.color,
        padding: pill.padding,
        href: pill.href,
      })),
      mobile: entity.values.mobile.map((pill) => ({
        label: resolveLocalizedText(pill.label),
        color: pill.color,
        padding: pill.padding,
      })),
    },
    cta: {
      photo: entity.cta.photo,
      photoMobile: entity.cta.photoMobile,
      penMobile: entity.cta.penMobile,
      arrowDark: entity.cta.arrowDark,
      line1: resolveLocalizedText(entity.cta.line1),
      line2: resolveLocalizedText(entity.cta.line2),
    },
    lists: {
      penSmall: entity.lists.penSmall,
      penMobile: entity.lists.penMobile,
      newsHeadingEn: entity.lists.newsHeadingEn,
      newsHeadingKo: entity.lists.newsHeadingKo,
      downloadsHeadingEn: entity.lists.downloadsHeadingEn,
      downloadsHeadingKo: entity.lists.downloadsHeadingKo,
      writer: resolveLocalizedText(entity.lists.writer),
    },
    location: {
      penSmall: entity.location.penSmall,
      mapTitle: resolveLocalizedText(entity.location.mapTitle),
      headingEn: entity.location.headingEn,
      headingKo: entity.location.headingKo,
    },
  };
}

export function toProductPageData(entity: ProductPageEntity): ProductPageData {
  return {
    id: entity.id,
    navTitle: resolveLocalizedText(entity.navTitle),
    description: resolveLocalizedText(entity.description),
    blocks: entity.blocks.map((block) => ({
      eyebrow: block.eyebrow ? resolveLocalizedText(block.eyebrow) : undefined,
      title: block.title ? resolveLocalizedText(block.title) : undefined,
      introTitle: resolveLocalizedText(block.introTitle),
      introImage: block.introImage,
      introText: block.introText
        ? resolveLocalizedText(block.introText)
        : undefined,
      introBullets: block.introBullets
        ? resolveLocalizedList(block.introBullets)
        : undefined,
      introTrailingBreak: block.introTrailingBreak,
      tags: resolveLocalizedList(block.tags),
      showInquiry: block.showInquiry,
      galleryLabel: resolveLocalizedText(block.galleryLabel),
      gallery: [...block.gallery],
      galleryThumbs: block.galleryThumbs ? [...block.galleryThumbs] : undefined,
      galleryColumns: block.galleryColumns,
      applications: block.applications
        ? block.applications.map((application) => ({
            title: resolveLocalizedText(application.title),
            images: [...application.images],
          }))
        : undefined,
      spec: block.spec
        ? {
            model: resolveLocalizedText(block.spec.model),
            rows: block.spec.rows.map((row) => ({
              label: resolveLocalizedText(row.label),
              values: resolveLocalizedList(row.values),
              labelWidth: row.labelWidth,
              valueWidth: row.valueWidth,
            })),
          }
        : undefined,
    })),
  };
}

export function toCasePageData(entity: CasePageEntity): CasePageData {
  return {
    subtitle: resolveLocalizedText(entity.subtitle),
    title: resolveLocalizedText(entity.title),
    heroImageMobile: entity.heroImageMobile,
    heroImagePc: entity.heroImagePc,
    heroWidth: entity.heroWidth,
    heroHeight: entity.heroHeight,
    section: entity.section
      ? {
          heading: resolveLocalizedText(entity.section.heading),
          text: resolveLocalizedText(entity.section.text),
          images: entity.section.images.map((image) => ({ ...image })),
        }
      : undefined,
    galleryImages: entity.galleryImages
      ? entity.galleryImages.map((image) => ({
          src: image.src,
          fullSrc: image.fullSrc,
          alt: resolveLocalizedText(image.alt),
        }))
      : undefined,
  };
}

export function toAboutGreetingsContent(
  content: AboutGreetingsContentEntity,
): AboutContentMap["greetings"] {
  return {
    banner: {
      line1: resolveLocalizedText(content.banner.line1),
      line2: resolveLocalizedText(content.banner.line2),
      title: resolveLocalizedText(content.banner.title),
    },
    heading: resolveLocalizedText(content.heading),
    intro: resolveLocalizedText(content.intro),
    paragraphs: resolveLocalizedList(content.paragraphs),
    signature: resolveLocalizedText(content.signature),
  };
}

export function toAboutPatentContent(
  content: AboutPatentContentEntity,
): AboutContentMap["patent-credentials"] {
  return {
    title: resolveLocalizedText(content.title),
  };
}

export function toPatentImages(
  images: readonly GalleryImageEntity[],
): GalleryImage[] {
  return images.map((image) => ({
    src: image.src,
    fullSrc: image.fullSrc,
    alt: resolveLocalizedText(image.alt),
  }));
}

export function toAboutLocationContent(
  content: AboutLocationContentEntity,
): AboutContentMap["company-location"] {
  return {
    title: resolveLocalizedText(content.title),
    headingEn: content.headingEn,
    headingKo: content.headingKo,
    labels: {
      tel: resolveLocalizedText(content.labels.tel),
      email: resolveLocalizedText(content.labels.email),
      address: resolveLocalizedText(content.labels.address),
    },
    mapTitle: resolveLocalizedText(content.mapTitle),
  };
}

export function toAboutJobPostingContent(
  content: AboutJobPostingContentEntity,
): AboutContentMap["job-posting"] {
  return {
    title: resolveLocalizedText(content.title),
    tagline: resolveLocalizedText(content.tagline),
    detailTaglineMobile: resolveLocalizedText(content.detailTaglineMobile),
    detailTaglineDesktop: resolveLocalizedText(content.detailTaglineDesktop),
  };
}

function resolveTextRun(run: TextRunEntity): TextRun {
  return {
    text: resolveLocalizedText(run.text),
    fontSize: run.fontSize,
    bold: run.bold,
    underline: run.underline,
  };
}

function resolveInterestingBlock(
  block: InterestingItemBlockEntity,
): InterestingItemBlock {
  switch (block.type) {
    case "text":
      return {
        type: "text",
        content: resolveLocalizedText(block.content),
        fontSize: block.fontSize,
        bold: block.bold,
        underline: block.underline,
        align: block.align,
        parts: block.parts ? block.parts.map(resolveTextRun) : undefined,
      };
    case "image":
      return {
        type: "image",
        src: block.src,
        width: block.width,
        block: block.block,
      };
    case "button":
      return {
        type: "button",
        href: block.href,
        label: resolveLocalizedText(block.label),
        align: block.align,
      };
    case "hr":
      return { type: "hr" };
    case "br":
      return { type: "br", fontSize: block.fontSize, align: block.align };
  }
}

export function toInterestingItem(
  entity: InterestingItemEntity,
): InterestingItem {
  return {
    idx: entity.idx,
    no: entity.no,
    category: resolveLocalizedText(entity.category),
    title: resolveLocalizedText(entity.title),
    author: resolveLocalizedText(entity.author),
    date: entity.date,
    views: entity.views,
    thumbnail: entity.thumbnail,
    description: resolveLocalizedText(entity.description),
    blocks: entity.blocks.map(resolveInterestingBlock),
    files: entity.files.map((file) => ({
      name: resolveLocalizedText(file.name),
      size: file.size,
    })),
  };
}

function resolveServiceFiles(
  files: readonly ServiceFileEntity[],
): { name: string; size: string; url: string }[] {
  return files.map((file) => ({
    name: resolveLocalizedText(file.name),
    size: file.size,
    url: file.url,
  }));
}

export function toServiceNewsItem(
  entity: ServiceNewsItemEntity,
): ServiceNewsItem {
  return {
    idx: entity.idx,
    category: resolveLocalizedText(entity.category),
    title: resolveLocalizedText(entity.title),
    author: resolveLocalizedText(entity.author),
    date: entity.date,
    views: entity.views,
    likes: entity.likes,
    notice: entity.notice,
    description: resolveLocalizedText(entity.description),
    blocks: entity.blocks.map(resolveInterestingBlock),
    files: resolveServiceFiles(entity.files),
  };
}

export function toServiceDownloadItem(
  entity: ServiceDownloadItemEntity,
): ServiceDownloadItem {
  return {
    idx: entity.idx,
    title: resolveLocalizedText(entity.title),
    date: entity.date,
    views: entity.views,
    thumbnail: entity.thumbnail,
    description: resolveLocalizedText(entity.description),
    summary:
      entity.summary === undefined
        ? undefined
        : resolveLocalizedText(entity.summary),
    blocks: entity.blocks.map(resolveInterestingBlock),
    files: resolveServiceFiles(entity.files),
  };
}

export function toServiceCaseStudioItem(
  entity: ServiceCaseStudioItemEntity,
): ServiceCaseStudioItem {
  return {
    idx: entity.idx,
    title: resolveLocalizedText(entity.title),
    date: entity.date,
    views: entity.views,
    thumbnail: entity.thumbnail,
    description: resolveLocalizedText(entity.description),
    summary:
      entity.summary === undefined
        ? undefined
        : resolveLocalizedText(entity.summary),
    blocks: entity.blocks.map(resolveInterestingBlock),
    files: resolveServiceFiles(entity.files),
  };
}

export function toJobPost(entity: JobPostEntity): JobPost {
  return {
    idx: entity.idx,
    no: entity.no,
    title: resolveLocalizedText(entity.title),
    author: resolveLocalizedText(entity.author),
    date: entity.date,
    views: entity.views,
    blocks: entity.blocks.map(resolveInterestingBlock),
    files: entity.files.map((file) => ({
      name: resolveLocalizedText(file.name),
      size: file.size,
    })),
  };
}
