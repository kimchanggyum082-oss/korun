import { sitePolicyModals, type SitePolicyModal } from "@/lib/data";
import { type Locale } from "@/lib/i18n/locales";
import { resolveEntity } from "./resolve";
import { localizeTree } from "./merge";
import { resolveActiveLocale } from "./locale";

export async function getPolicyModal(
  mode: "policy" | "privacy",
  locale?: Locale,
): Promise<SitePolicyModal> {
  const activeLocale = await resolveActiveLocale(locale);
  const value = await resolveEntity(`policy:${mode}`, sitePolicyModals[mode]);
  return localizeTree(activeLocale, value);
}
