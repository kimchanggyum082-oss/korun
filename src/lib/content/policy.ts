import { sitePolicyModals, type SitePolicyModal } from "@/lib/data";

export function getPolicyModal(mode: "policy" | "privacy"): SitePolicyModal {
  return sitePolicyModals[mode];
}
