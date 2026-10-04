import type { ContentDef, ContentGroup } from "../registry-types";
import { homeDefs, homeLocationExtraDefs } from "./home";
import { aboutDefs } from "./about";
import { productsDefs } from "./products";
import { casesDefs } from "./cases";
import { siteDefs } from "./site";

export const CONTENT_DEFS: ContentDef[] = [
  ...homeDefs,
  ...aboutDefs,
  ...productsDefs,
  ...casesDefs,
  ...siteDefs,
];

export const CONTENT_DEF_MAP: Record<string, ContentDef> = Object.fromEntries(
  CONTENT_DEFS.map((def) => [def.key, def]),
);

export const CONTENT_GROUPS: ContentGroup[] = [
  "home",
  "about",
  "products",
  "cases",
  "site",
];

export function defsForGroup(group: ContentGroup): ContentDef[] {
  return CONTENT_DEFS.filter((def) => def.group === group);
}

/**
 * Defs from other groups surfaced in this group's editor (same key/storage).
 * They are editor-only references — never part of `CONTENT_DEFS`.
 */
const GROUP_EXTRA_DEFS: Partial<Record<ContentGroup, ContentDef[]>> = {
  home: homeLocationExtraDefs,
};

/** Everything the `/admin/pages?group=…` editor renders (incl. cross-group). */
export function defsForEditor(group: ContentGroup): ContentDef[] {
  return [...defsForGroup(group), ...(GROUP_EXTRA_DEFS[group] ?? [])];
}

export function keysForEditor(group: ContentGroup): string[] {
  return defsForEditor(group).map((def) => def.key);
}

export function keysForGroup(group: ContentGroup): string[] {
  return defsForGroup(group).map((def) => def.key);
}

export function keysForGroups(groups: ContentGroup[]): string[] {
  return groups.flatMap(keysForGroup);
}
