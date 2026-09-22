import { assets, downloads, homeContent, news, values } from "@/lib/data";
import { resolveEntity } from "./resolve";
import { localizeTree } from "./merge";

export async function getHomePage(locale = "ko") {
  const value = await resolveEntity("page:home", {
    assets,
    values,
    news,
    downloads,
    content: homeContent,
  });
  return locale === "ko" ? value : localizeTree(locale, value);
}
