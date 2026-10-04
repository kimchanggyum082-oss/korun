/**
 * English defaults for the about group — the EN counterpart of the data-file
 * Korean defaults, keyed by content key (MCell's `content-en.ts` model).
 * Keys absent here fall back to the Korean default. Media keys are
 * language-neutral and intentionally omitted.
 */
export const ABOUT_EN: Record<string, string> = {
  // ── Page titles (Korean defaults in the data file) ──
  "about.greetings.banner.title": "Greetings",
  "about.patent.title": "Patent & Credentials\u00a0",
  "about.location.title": "Company Location",
  "about.job-posting.title": "Job Posting",

  // ── Greetings ──
  "about.greetings.banner.line1":
    "As a specialized HOT RUNNER SYSTEM manufacturer,",
  "about.greetings.banner.line2":
    "a Korean hot runner specialist that gives back with price, quality and service",
  "about.greetings.heading": "A different approach to Hot Runners for molds!",
  "about.greetings.intro":
    "KORUN Co., Ltd., founded in 2014, is a specialized manufacturer of high-quality runnerless injection molding systems (Hot Runner Systems).",
  "about.greetings.signature": "The management and staff of KORUN Co., Ltd.",

  // ── Patent & Credentials ──
  // ── Company Location ──
  "about.location.headingKo": "Head Office & Factory",
  "about.location.mapTitle": "KORUN head office location map",

  // ── Job Posting ──
  "about.job-posting.detailTagline": "We share our company's job openings.",
};
