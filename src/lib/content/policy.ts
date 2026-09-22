import { sitePolicyModals, type SitePolicyModal } from "@/lib/data";
import { resolveEntity } from "./resolve";
import { localizeTree } from "./merge";

export async function getPolicyModal(
  mode: "policy" | "privacy",
  locale = "ko",
): Promise<SitePolicyModal> {
  const value = await resolveEntity(`policy:${mode}`, sitePolicyModals[mode]);
  return locale === "ko" ? value : localizeTree(locale, value);
}
