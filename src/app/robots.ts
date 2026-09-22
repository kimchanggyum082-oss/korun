import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/i18n/seo";

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    ...(base ? { sitemap: `${base}/sitemap.xml` } : {}),
  };
}
