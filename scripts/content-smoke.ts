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
  getNav,
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
import {
  assets,
  casePages,
  company,
  jobPosts,
  nav,
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
  assert.deepStrictEqual(await getNav(), nav);
  passed.push("getSiteSettings/getNav return data.ts defaults unchanged");

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
  assert.deepStrictEqual(about.jobPosts, jobPosts);
  passed.push("getAboutPage returns defaults unchanged");

  for (const name of passed) {
    console.log(`ok - ${name}`);
  }
  console.log(`\n${passed.length} checks passed`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
