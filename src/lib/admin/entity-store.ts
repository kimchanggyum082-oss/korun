import { applyOverride } from "@/lib/content/merge";
import { getDraft, getPublished } from "@/lib/content/store";
import {
  caseStudioItems,
  downloadItems,
  interestingItems,
  jobPosts,
  newsItems,
} from "@/lib/data";
import {
  ENTITY_KEYS,
  type EditableEntityKey,
  type EditableEntityValue,
  type EntitySource,
} from "./entities";

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
    default:
      throw new Error(`Unhandled entity default key: ${String(key)}`);
  }
}

export async function loadEditableEntity<K extends EditableEntityKey>(
  key: K,
): Promise<{ value: EditableEntityValue[K]; source: EntitySource }> {
  const fallback = entityDefault(key);
  try {
    const draft = await getDraft(key);
    if (draft !== null && draft !== undefined) {
      return { value: applyOverride(fallback, draft), source: "draft" };
    }
    const published = await getPublished(key);
    if (published !== null && published !== undefined) {
      return { value: applyOverride(fallback, published), source: "published" };
    }
  } catch (error) {
    console.error(`[content] failed to load editable entity "${key}"`, error);
  }
  return { value: fallback, source: "default" };
}
