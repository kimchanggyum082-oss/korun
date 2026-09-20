import { assets, downloads, news, values } from "@/lib/data";

export function getHomePage() {
  return { assets, values, news, downloads };
}
