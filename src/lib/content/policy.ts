import { type SitePolicyModal } from "@/lib/data";
import { type Locale } from "@/lib/i18n/locales";
import { resolveActiveLocale } from "./locale";
import { getContentRows } from "./page-content";
import { keysForGroup } from "./registry";
import { resolveSiteFromRows } from "./registry/site-resolve";

export async function getPolicyModal(
  mode: "policy" | "privacy",
  locale?: Locale,
): Promise<SitePolicyModal> {
  const activeLocale = await resolveActiveLocale(locale);
  const rows = await getContentRows(keysForGroup("site"));
  const resolved = resolveSiteFromRows(rows, activeLocale);
  return mode === "privacy" ? resolved.privacy : resolved.policy;
}
