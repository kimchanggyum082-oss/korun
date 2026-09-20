import { assets, company, jobPosts } from "@/lib/data";

export type AboutPageKey =
  | "greetings"
  | "patent-credentials"
  | "company-location"
  | "job-posting";

export function getAboutPage(key: AboutPageKey) {
  return { key, company, assets, jobPosts };
}
