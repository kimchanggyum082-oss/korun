/**
 * English defaults for the site group — the EN counterpart of the data-file
 * Korean defaults, keyed by content key (MCell's `content-en.ts` model).
 * Keys absent here fall back to the Korean default. Language-neutral values
 * (phone, fax, email, the English company name, map embed URL, media) are
 * intentionally omitted, as is the long policy HTML which has no translation.
 */
export const SITE_EN: Record<string, string> = {
  // ── Company & metadata ──
  "site.settings.name": "KORUN",
  "site.settings.tagline": "As a specialized HOT RUNNER SYSTEM manufacturer,",
  "site.settings.taglineSub":
    "a Korean hot runner specialist that gives back with price, quality and service.",
  "site.settings.address":
    "77-1, Gyesu-ro 86beon-gil, Siheung-si, Gyeonggi-do, Republic of Korea",
  "site.settings.metadata.title": "KORUN",
  "site.settings.metadata.description":
    "KORUN is a hot runner system specialist that develops and manufactures valve gate systems, open gate systems, single nozzles, and time & temperature controllers, with technology and tailored solutions optimized for every injection molding environment.",
  "site.settings.metadata.keywords": "KORUN",

  // ── Footer ──
  "site.footer.labels.company": "Company",
  "site.footer.labels.address": "Address",
  "site.footer.copyright":
    "COPYRIGHT © KORUN. ALL RIGHTS RESERVED. DESIGN HOSTING BY WEMENTO.",
  "site.footer.links.policy": "Terms of Service",
  "site.footer.links.privacy": "Privacy Policy",

  // ── Policy documents ──
  "site.policy.title": "Terms of Service",
  "site.privacy.title": "Privacy Policy",
};
