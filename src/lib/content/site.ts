import { company, nav } from "@/lib/data";
import { siteFooterDefault } from "@/lib/admin/entity-store";
import { resolveEntity } from "./resolve";
import { localizeTree } from "./merge";

export async function getSiteSettings(locale = "ko") {
  const value = await resolveEntity("site:settings", company);
  return locale === "ko" ? value : localizeTree(locale, value);
}

export async function getNav(locale = "ko") {
  const value = await resolveEntity("site:nav", nav);
  return locale === "ko" ? value : localizeTree(locale, value);
}

export async function getFooter(locale = "ko") {
  const value = await resolveEntity("site:footer", siteFooterDefault());
  return locale === "ko" ? value : localizeTree(locale, value);
}
