/**
 * English defaults for the cases group — the EN counterpart of the data-file
 * Korean defaults, keyed by content key (MCell's `content-en.ts` model).
 * Keys absent here fall back to the Korean default. Media keys are
 * language-neutral and intentionally omitted, as are copy keys whose data-file
 * value is already English.
 */
export const CASES_EN: Record<string, string> = {
  // ── Page titles · section headings (Korean defaults in the data file) ──
  "cases.automotive-parts.title": "Automotive Parts",
  "cases.automotive-parts.section.heading": "Driving Change",
  "cases.transparent-parts.title": "Transparent Parts",
  "cases.transparent-parts.section.heading": "Lens",
  "cases.office-house-appliances.title": "Office & House Appliances",
  "cases.office-house-appliances.section.heading": "Appliances",
  "cases.daily-supplies.title": "Daily Supplies",
  "cases.daily-supplies.section.heading": "Daily Supplies",
  "cases.engineering-plastics-parts.title": "Engineering Plastics Parts",
  "cases.engineering-plastics-parts.section.heading":
    "Engineering Plastics Parts",

  // ── Automotive Parts ──
  "cases.automotive-parts.subtitle":
    "Introducing our automotive-related parts.",
  "cases.automotive-parts.section.text":
    "As the electric-vehicle era arrives, new materials and processes are redefining the automobile. The solution for automotive parts — interior and exterior components, engine bays and chassis — is none other than the KORUN Hot Runner System.",

  // ── Transparent Parts ──
  "cases.transparent-parts.subtitle": "Introducing our transparent products.",
  "cases.transparent-parts.section.text":
    "Automotive lamps and resin products such as PC, PMMA and SAN — the very definition of transparent products — depend heavily on the harmony of advanced mold and injection technology with Hot Runner System technology. With know-how built on a wide range of transparent products, KORUN aims to produce high-quality parts and competes confidently with overseas hot runner makers.",

  // ── Office & House Appliances ──
  "cases.office-house-appliances.subtitle":
    "Application cases for office and house appliances",
  "cases.office-house-appliances.section.text":
    "KORUN's diverse nozzle and nozzle-tip structures are designed, applied and manufactured to be optimized for precision valve gating and ultra-small product molds, based on know-how accumulated in the electronics manufacturing industry that produces challenging, high-volume parts — providing Hot Runner Systems that help create the best products.",

  // ── Daily Supplies ──
  "cases.daily-supplies.subtitle": "Application cases for daily supplies",
  "cases.daily-supplies.section.text":
    "KORUN's product lineup is recognized by customers for reasonable pricing and excellent quality, and is steadily expanding its market in the household goods industry. With optimized design and outstanding durability, we do our utmost so that large volumes can be produced stably over a long period.",

  // ── Engineering Plastics Parts ──
  "cases.engineering-plastics-parts.subtitle":
    "Application cases for engineering plastics",
  "cases.engineering-plastics-parts.section.text":
    "Engineering plastics are high-performance plastics used as industrial materials because they are strong and lightweight; among them, engineering plastics that are especially resistant to heat and impact are called super engineering plastics.\n\nSuper engineering plastics are plastics with properties close to metal or ceramics, and are used in a wide range of fields including aircraft parts, automotive interior components and engine bays, chassis, EV battery trays and gear parts. The KORUN Hot Runner System helps achieve stable mass production based on technical data and diverse application know-how, tailored to each purpose.",
};
