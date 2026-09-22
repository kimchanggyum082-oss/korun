import {
  aboutContent,
  assets,
  jobPosts,
  type AboutContentMap,
} from "@/lib/data";
import { resolveEntity } from "./resolve";
import { getSiteSettings } from "./site";
import { localizeTree } from "./merge";

export type AboutPageKey = keyof AboutContentMap;

export async function getAboutPage<K extends AboutPageKey>(
  key: K,
  locale = "ko",
) {
  const company = await getSiteSettings();
  const value = await resolveEntity(`page:about:${key}`, {
    key,
    company,
    assets,
    jobPosts,
    content: aboutContent[key],
  });
  return locale === "ko" ? value : localizeTree(locale, value);
}
