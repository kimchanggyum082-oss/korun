import type { Localized } from "@/lib/content/merge";
import type { Locale } from "@/lib/i18n/locales";
import type {
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

export type TextRunEntity = {
  text: Localized<string>;
  fontSize?: number;
  bold?: boolean;
  underline?: boolean;
  color?: string;
};

export type InterestingItemBlockEntity =
  | {
      type: "text";
      content: Localized<string>;
      fontSize?: number;
      bold?: boolean;
      underline?: boolean;
      color?: string;
      align?: TextAlign;
      parts?: TextRunEntity[];
    }
  | {
      type: "image";
      src: string;
      width?: number;
      block?: boolean;
      align?: TextAlign;
    }
  | {
      type: "button";
      href: string;
      label: Localized<string>;
      align?: TextAlign;
    }
  | { type: "hr" }
  | {
      type: "list";
      items: Localized<string>[];
      fontSize?: number;
      align?: TextAlign;
    }
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

export type EditableEntityValue = {
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

export function resolveLocalizedText(
  value: Localized<string>,
  locale: Locale = "ko",
): string {
  if (typeof value === "string") return value;
  if (locale === "en") return value.en || value.ko;
  return value.ko;
}

function resolveLocalizedList(
  values: readonly Localized<string>[],
  locale: Locale = "ko",
): string[] {
  return values.map((value) => resolveLocalizedText(value, locale));
}

export function toProductPageData(
  entity: ProductPageEntity,
  locale: Locale = "ko",
): ProductPageData {
  return {
    id: entity.id,
    navTitle: resolveLocalizedText(entity.navTitle, locale),
    description: resolveLocalizedText(entity.description, locale),
    blocks: entity.blocks.map((block) => ({
      eyebrow: block.eyebrow
        ? resolveLocalizedText(block.eyebrow, locale)
        : undefined,
      title: block.title
        ? resolveLocalizedText(block.title, locale)
        : undefined,
      introTitle: resolveLocalizedText(block.introTitle, locale),
      introImage: block.introImage,
      introText: block.introText
        ? resolveLocalizedText(block.introText, locale)
        : undefined,
      introBullets: block.introBullets
        ? resolveLocalizedList(block.introBullets, locale)
        : undefined,
      introTrailingBreak: block.introTrailingBreak,
      tags: resolveLocalizedList(block.tags, locale),
      showInquiry: block.showInquiry,
      galleryLabel: resolveLocalizedText(block.galleryLabel, locale),
      gallery: [...block.gallery],
      galleryThumbs: block.galleryThumbs ? [...block.galleryThumbs] : undefined,
      galleryColumns: block.galleryColumns,
      applications: block.applications
        ? block.applications.map((application) => ({
            title: resolveLocalizedText(application.title, locale),
            images: [...application.images],
          }))
        : undefined,
      spec: block.spec
        ? {
            model: resolveLocalizedText(block.spec.model, locale),
            rows: block.spec.rows.map((row) => ({
              label: resolveLocalizedText(row.label, locale),
              values: resolveLocalizedList(row.values, locale),
              labelWidth: row.labelWidth,
              valueWidth: row.valueWidth,
            })),
          }
        : undefined,
    })),
  };
}

function resolveTextRun(run: TextRunEntity, locale: Locale = "ko"): TextRun {
  return {
    text: resolveLocalizedText(run.text, locale),
    fontSize: run.fontSize,
    bold: run.bold,
    underline: run.underline,
    color: run.color,
  };
}

function resolveInterestingBlock(
  block: InterestingItemBlockEntity,
  locale: Locale = "ko",
): InterestingItemBlock {
  switch (block.type) {
    case "text":
      return {
        type: "text",
        content: resolveLocalizedText(block.content, locale),
        fontSize: block.fontSize,
        bold: block.bold,
        underline: block.underline,
        color: block.color,
        align: block.align,
        parts: block.parts
          ? block.parts.map((part) => resolveTextRun(part, locale))
          : undefined,
      };
    case "image":
      return {
        type: "image",
        src: block.src,
        width: block.width,
        block: block.block,
        align: block.align,
      };
    case "button":
      return {
        type: "button",
        href: block.href,
        label: resolveLocalizedText(block.label, locale),
        align: block.align,
      };
    case "hr":
      return { type: "hr" };
    case "list":
      return {
        type: "list",
        items: block.items.map((item) => resolveLocalizedText(item, locale)),
        fontSize: block.fontSize,
        align: block.align,
      };
    case "br":
      return { type: "br", fontSize: block.fontSize, align: block.align };
  }
}

export function toInterestingItem(
  entity: InterestingItemEntity,
  locale: Locale = "ko",
): InterestingItem {
  return {
    idx: entity.idx,
    no: entity.no,
    category: resolveLocalizedText(entity.category, locale),
    title: resolveLocalizedText(entity.title, locale),
    author: resolveLocalizedText(entity.author, locale),
    date: entity.date,
    views: entity.views,
    thumbnail: entity.thumbnail,
    description: resolveLocalizedText(entity.description, locale),
    blocks: entity.blocks.map((block) =>
      resolveInterestingBlock(block, locale),
    ),
    files: entity.files.map((file) => ({
      name: resolveLocalizedText(file.name, locale),
      size: file.size,
    })),
  };
}

function resolveServiceFiles(
  files: readonly ServiceFileEntity[],
  locale: Locale = "ko",
): { name: string; size: string; url: string }[] {
  return files.map((file) => ({
    name: resolveLocalizedText(file.name, locale),
    size: file.size,
    url: file.url,
  }));
}

export function toServiceNewsItem(
  entity: ServiceNewsItemEntity,
  locale: Locale = "ko",
): ServiceNewsItem {
  return {
    idx: entity.idx,
    category: resolveLocalizedText(entity.category, locale),
    title: resolveLocalizedText(entity.title, locale),
    author: resolveLocalizedText(entity.author, locale),
    date: entity.date,
    views: entity.views,
    likes: entity.likes,
    notice: entity.notice,
    description: resolveLocalizedText(entity.description, locale),
    blocks: entity.blocks.map((block) =>
      resolveInterestingBlock(block, locale),
    ),
    files: resolveServiceFiles(entity.files, locale),
  };
}

export function toServiceDownloadItem(
  entity: ServiceDownloadItemEntity,
  locale: Locale = "ko",
): ServiceDownloadItem {
  return {
    idx: entity.idx,
    title: resolveLocalizedText(entity.title, locale),
    date: entity.date,
    views: entity.views,
    thumbnail: entity.thumbnail,
    description: resolveLocalizedText(entity.description, locale),
    summary:
      entity.summary === undefined
        ? undefined
        : resolveLocalizedText(entity.summary, locale),
    blocks: entity.blocks.map((block) =>
      resolveInterestingBlock(block, locale),
    ),
    files: resolveServiceFiles(entity.files, locale),
  };
}

export function toServiceCaseStudioItem(
  entity: ServiceCaseStudioItemEntity,
  locale: Locale = "ko",
): ServiceCaseStudioItem {
  return {
    idx: entity.idx,
    title: resolveLocalizedText(entity.title, locale),
    date: entity.date,
    views: entity.views,
    thumbnail: entity.thumbnail,
    description: resolveLocalizedText(entity.description, locale),
    summary:
      entity.summary === undefined
        ? undefined
        : resolveLocalizedText(entity.summary, locale),
    blocks: entity.blocks.map((block) =>
      resolveInterestingBlock(block, locale),
    ),
    files: resolveServiceFiles(entity.files, locale),
  };
}

export function toJobPost(
  entity: JobPostEntity,
  locale: Locale = "ko",
): JobPost {
  return {
    idx: entity.idx,
    no: entity.no,
    title: resolveLocalizedText(entity.title, locale),
    author: resolveLocalizedText(entity.author, locale),
    date: entity.date,
    views: entity.views,
    blocks: entity.blocks.map((block) =>
      resolveInterestingBlock(block, locale),
    ),
    files: entity.files.map((file) => ({
      name: resolveLocalizedText(file.name, locale),
      size: file.size,
    })),
  };
}
