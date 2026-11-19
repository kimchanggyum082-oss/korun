import assert from "node:assert/strict";
import {
  applyOverride,
  deepMerge,
  getAboutPage,
  getBoardItem,
  getBoardItems,
  getCasePage,
  getCasePages,
  getDraft,
  getPolicyModal,
  getProductPage,
  getProductPages,
  getPublished,
  getRevisionHistory,
  getSearchIndex,
  getSiteSettings,
  listEntities,
  localizeTree,
  resolveLeaf,
} from "@/lib/content";
import { isDatabaseConfigured } from "@/lib/db/client";
import { blankBoardItem, mergeBoardItems } from "@/lib/content/boards";
import {
  googleMapEmbedUrl,
  googleMapQueryEmbedUrl,
  googlePlaceQueryFromUrl,
  parseGoogleMapsUrl,
} from "@/lib/google-map";
import { resolveAboutFromRows } from "@/lib/content/registry/about-resolve";
import { groupDefaults } from "@/lib/content/registry/resolvers";
import {
  assets,
  casePages,
  company,
  newsItems,
  productPages,
  sitePolicyModals,
} from "@/lib/data";

delete process.env.DATABASE_URL;

const passed: string[] = [];

function check(name: string, fn: () => void) {
  fn();
  passed.push(name);
}

check("new board items start with a blank shape", () => {
  const news = blankBoardItem("news", "new-id");
  assert.strictEqual(news.idx, "new-id");
  assert.strictEqual(news.files.length, 0);
  const job = blankBoardItem("job-posting", "new-id");
  assert.strictEqual(job.idx, "new-id");
  assert.ok(job.no > 0);
});

check("new board entities are prepended to the bundled list", () => {
  const base = newsItems.slice(0, 1);
  const merged = mergeBoardItems(
    "news",
    base,
    new Map([
      [
        "new-id",
        { title: { ko: "새 소식", en: "New update" }, category: "NEWS" },
      ],
    ]),
  );
  assert.strictEqual(merged.length, 2);
  assert.strictEqual(merged[0].idx, "new-id");
  assert.strictEqual(resolveLeaf("ko", merged[0].title), "새 소식");
  assert.strictEqual(merged[1].idx, base[0].idx);
});

check("google map embed URL uses the selected coordinates", () => {
  assert.strictEqual(
    googleMapEmbedUrl(37.4438, 126.8107, 17),
    "https://maps.google.com/maps?q=37.4438,126.8107&z=17&output=embed",
  );
});

check("google maps URL parser reads @lat,lng,zoom", () => {
  assert.deepStrictEqual(
    parseGoogleMapsUrl("https://www.google.com/maps/@37.4438,126.8107,17z"),
    { lat: 37.4438, lng: 126.8107, zoom: 17 },
  );
});

check("google maps URL parser reads ?q=lat,lng", () => {
  assert.deepStrictEqual(
    parseGoogleMapsUrl("https://maps.google.com/?q=37.4438,126.8107"),
    { lat: 37.4438, lng: 126.8107, zoom: undefined },
  );
});

check("google maps URL parser reads fully encoded place coordinates", () => {
  assert.deepStrictEqual(
    parseGoogleMapsUrl("prefix%213d37.4438125%214d126.813328125suffix"),
    { lat: 37.4438125, lng: 126.813328125, zoom: undefined },
  );
});

check("google maps place URL exposes its place query", () => {
  assert.strictEqual(
    googlePlaceQueryFromUrl(
      "https://www.google.com/maps/place/77-1+Gyesu-ro+86beon-gil,+Siheung-si,+Gyeonggi-do/data=!3m1",
    ),
    "77-1 Gyesu-ro 86beon-gil, Siheung-si, Gyeonggi-do",
  );
});

check("google maps query embed uses the place query", () => {
  assert.strictEqual(
    googleMapQueryEmbedUrl("a b"),
    "https://maps.google.com/maps?q=a%20b&output=embed",
  );
});

check("object deep-merge merges nested objects", () => {
  const merged = deepMerge(
    { a: 1, nested: { x: 1, y: 2 }, list: [1, 2, 3] },
    { nested: { y: 3, z: 4 }, list: [9] },
  );
  assert.deepStrictEqual(merged, {
    a: 1,
    nested: { x: 1, y: 3, z: 4 },
    list: [9],
  });
});

check("arrays replace wholesale", () => {
  assert.deepStrictEqual(deepMerge([1, 2, 3], [9]), [9]);
  assert.deepStrictEqual(
    deepMerge({ list: [{ id: 1 }] }, { list: [{ id: 2 }, { id: 3 }] }),
    { list: [{ id: 2 }, { id: 3 }] },
  );
});

check("null/undefined override returns the default unchanged", () => {
  const fallback = { a: 1, nested: { x: 1 } };
  assert.strictEqual(applyOverride(fallback, null), fallback);
  assert.strictEqual(applyOverride(fallback, undefined), fallback);
});

check("resolveLeaf resolves localized values with fallback", () => {
  assert.strictEqual(resolveLeaf("en", { ko: "가", en: "A" }), "A");
  assert.strictEqual(resolveLeaf("en", { ko: "가" }), "가");
  assert.strictEqual(resolveLeaf("ko", { ko: "가", en: "A" }), "가");
  assert.strictEqual(resolveLeaf("en", "plain"), "plain");
});

check("localizeTree unwraps localized leaves for every locale", () => {
  assert.strictEqual(
    localizeTree("ko", { ko: "한국어", en: "English" }),
    "한국어",
  );
  assert.strictEqual(
    localizeTree("en", { ko: "한국어", en: "English" }),
    "English",
  );
  assert.strictEqual(localizeTree("ko", { ko: "한국어" }), "한국어");
  assert.strictEqual(localizeTree("en", { ko: "한국어" }), "한국어");
  assert.strictEqual(localizeTree("ko", "plain"), "plain");
  assert.strictEqual(localizeTree("en", "plain"), "plain");
});

check("localizeTree traverses arrays/objects and keeps plain values", () => {
  const input = {
    title: { ko: "제목", en: "Title" },
    count: 3,
    active: true,
    list: [{ ko: "가" }, { ko: "나", en: "B" }],
    nested: { deep: { ko: "깊이", en: "Deep" } },
  };
  assert.deepStrictEqual(localizeTree("ko", input), {
    title: "제목",
    count: 3,
    active: true,
    list: ["가", "나"],
    nested: { deep: "깊이" },
  });
  assert.deepStrictEqual(localizeTree("en", input), {
    title: "Title",
    count: 3,
    active: true,
    list: ["가", "B"],
    nested: { deep: "Deep" },
  });
});

check(
  "overlay localized leaf over plain-string default resolves to a string",
  () => {
    const fallback = { title: "기본 제목", body: "기본 본문" };
    const override = { title: { ko: "수정 제목", en: "Edited title" } };
    const merged = applyOverride(fallback, override);
    const ko = localizeTree("ko", merged);
    const en = localizeTree("en", merged);
    assert.strictEqual(typeof ko.title, "string");
    assert.strictEqual(typeof en.title, "string");
    assert.strictEqual(ko.title, "수정 제목");
    assert.strictEqual(en.title, "Edited title");
    assert.strictEqual(ko.body, "기본 본문");
    assert.strictEqual(en.body, "기본 본문");
  },
);

async function main() {
  assert.strictEqual(
    isDatabaseConfigured(),
    false,
    "DATABASE_URL should be unset for this smoke run",
  );
  passed.push("store reports not configured without DATABASE_URL");

  assert.strictEqual(await getPublished("site:settings"), null);
  assert.strictEqual(await getDraft("site:settings"), null);
  assert.deepStrictEqual(await listEntities(), []);
  assert.deepStrictEqual(await listEntities("product:"), []);
  assert.deepStrictEqual(await getRevisionHistory("site:settings"), []);
  passed.push("store reads return null/[] without DATABASE_URL");

  assert.deepStrictEqual(await getSiteSettings(), company);
  passed.push("getSiteSettings returns data.ts defaults unchanged");

  assert.deepStrictEqual(await getProductPage("21"), productPages["21"]);
  const productList = await getProductPages();
  assert.deepStrictEqual(Object.keys(productList), Object.keys(productPages));
  assert.deepStrictEqual(productList, productPages);
  passed.push("getProductPage/getProductPages return defaults unchanged");

  assert.deepStrictEqual(
    await getCasePage("automotive-parts"),
    casePages["automotive-parts"],
  );
  const caseList = await getCasePages();
  assert.deepStrictEqual(Object.keys(caseList), Object.keys(casePages));
  assert.deepStrictEqual(caseList, casePages);
  passed.push("getCasePage/getCasePages return defaults unchanged");

  const news = await getBoardItems("news");
  assert.deepStrictEqual(news, newsItems);
  assert.deepStrictEqual(
    await getBoardItem("news", newsItems[0].idx),
    newsItems[0],
  );
  passed.push("getBoardItems/getBoardItem return defaults unchanged");

  const searchIndex = await getSearchIndex();
  assert.deepStrictEqual(Object.keys(searchIndex).sort(), [
    "caseStudioItems",
    "downloadItems",
    "interestingItems",
    "newsItems",
  ]);
  assert.deepStrictEqual(searchIndex.newsItems, newsItems);
  passed.push("getSearchIndex returns defaults unchanged");

  assert.deepStrictEqual(
    await getPolicyModal("policy"),
    sitePolicyModals.policy,
  );
  assert.deepStrictEqual(
    await getPolicyModal("privacy"),
    sitePolicyModals.privacy,
  );
  passed.push("getPolicyModal returns defaults unchanged");

  const about = await getAboutPage("greetings");
  assert.strictEqual(about.key, "greetings");
  assert.deepStrictEqual(about.company, company);
  assert.deepStrictEqual(about.assets, assets);
  passed.push("getAboutPage returns defaults unchanged");

  const greetingsEn = await getAboutPage("greetings", "en");
  assert.match(
    greetingsEn.content.paragraphs[0] ?? "",
    /From the initial inquiry/,
  );
  passed.push("greetings paragraphs resolve the English default");

  const locationPage = await getAboutPage("company-location");
  assert.strictEqual(locationPage.content.locations.length, 3);
  assert.strictEqual(locationPage.content.locations[0].contacts.length, 4);
  assert.strictEqual(locationPage.content.locations[1].contacts.length, 3);
  assert.strictEqual(locationPage.content.locations[2].contacts.length, 3);
  passed.push(
    "company location returns every location with its own contact list",
  );

  const locationDefaults = groupDefaults("about", "ko").get(
    "about.location.locations",
  );
  assert.ok(locationDefaults);
  const locationRows = JSON.parse(locationDefaults) as Record<
    string,
    unknown
  >[];
  const hiddenLocationRows = locationRows.map((row, index) =>
    index === 0 ? { ...row, enabled: false } : row,
  );
  const visibleLocations = resolveAboutFromRows(
    { "about.location.locations": { ko: JSON.stringify(hiddenLocationRows) } },
    "ko",
  ).content["company-location"].locations;
  assert.strictEqual(visibleLocations.length, locationRows.length - 1);
  passed.push("disabled company locations are omitted from the shared list");

  for (const name of passed) {
    console.log(`ok - ${name}`);
  }
  console.log(`\n${passed.length} checks passed`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
