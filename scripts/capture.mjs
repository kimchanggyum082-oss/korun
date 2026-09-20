/**
 * Reference screenshot capture for the korun clone.
 *
 * Captures pixel-stable PNGs of a live site (default: the imweb-hosted
 * original) so the Next.js clone can be diffed against it with
 * `scripts/compare.mjs`.
 *
 * Usage:
 *   node scripts/capture.mjs --base <url> --out <dir> --viewport <desktop|mobile|all>
 *     [--paths "<a,b,c>"] [--paths-file <file.json>]
 *     [--settle-ms <n>] [--save-html] [--prefers-reduced-motion]
 *
 * Design notes / known limitations:
 *   - deviceScaleFactor is forced to 1 on purpose: the goal is stable diffs,
 *     not retina-accurate screenshots.
 *   - Animations are NOT frozen by default (Playwright's default screenshot
 *     behaviour is `animations: "disabled"`, so we explicitly pass "allow").
 *     The settle delay is what lets entrance animations finish. JS-driven
 *     auto-rotating carousels can still be captured mid-rotation; re-run or
 *     raise --settle-ms if a diff points at a rotating slide.
 *   - Chromium historically capped a single bitmap at ~16384px. Modern
 *     Playwright/Chromium headless happily captures far taller pages in one
 *     shot (verified to 60000px), so the normal path is a single fullPage PNG
 *     regardless of height. Pages above SOFT_HEIGHT_LIMIT are warned about and
 *     still attempted as one image. If that capture actually throws, we fall
 *     back to deterministic viewport-height scroll segments named
 *     `{name}.{viewport}.partNN.png` (fixed-position elements repeat per part)
 *     and record `segmented: true` plus the `files` array in the manifest.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { setTimeout as sleep } from "node:timers/promises";
import { chromium } from "playwright";

/**
 * Height above which we warn and prepare a segmentation fallback. This is the
 * historical Chromium single-bitmap ceiling; current headless Chromium often
 * goes higher, so it is a soft warning threshold, not a hard cap.
 */
const SOFT_HEIGHT_LIMIT = 16384;
/** Don't scroll forever on infinite feeds; this bounds lazy-load triggering. */
const MAX_SCROLL_STEPS = 120;
/** Hard cap on how far we bother scrolling to trigger lazy content. */
const MAX_SCROLL_HEIGHT = SOFT_HEIGHT_LIMIT * 2;

const VIEWPORTS = {
  desktop: { width: 1920, height: 1080 },
  mobile: { width: 390, height: 844 },
};

const NAV_TIMEOUT_MS = 60_000;
const SETTLE_DEFAULT_MS = 1500;
const STEP_DELAY_MS = 150;
const BETWEEN_CAPTURES_MS = 600;

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) {
      args._.push(token);
      continue;
    }
    const key = token.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
}

function usage(message) {
  if (message) console.error(`error: ${message}\n`);
  console.error(
    [
      "Usage: node scripts/capture.mjs --base <url> --out <dir>",
      "         --viewport <desktop|mobile|all>",
      '         [--paths "<a,b,c>"] [--paths-file <file.json>]',
      "         [--settle-ms <n>] [--save-html] [--prefers-reduced-motion]",
    ].join("\n"),
  );
}

function sanitizeToken(value) {
  return String(value)
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
}

/**
 * Turn a path into a filesystem-safe base name.
 *   "/"             -> "home"
 *   "/about/greetings" -> "about__greetings"
 *   "/news?idx=3"   -> "news_idx_3"
 */
function slugifyPath(input) {
  const raw = String(input ?? "").trim();
  if (!raw) return "home";
  const withoutHash = raw.split("#")[0];
  const queryIndex = withoutHash.indexOf("?");
  const pathname =
    queryIndex === -1 ? withoutHash : withoutHash.slice(0, queryIndex);
  const search = queryIndex === -1 ? "" : withoutHash.slice(queryIndex + 1);

  const segments = pathname.split("/").map(sanitizeToken).filter(Boolean);
  let name = segments.length > 0 ? segments.join("__") : "home";

  if (search) {
    const querySlug = search
      .split("&")
      .map((pair) =>
        pair.split("=").map(sanitizeToken).filter(Boolean).join("_"),
      )
      .filter(Boolean)
      .join("_");
    if (querySlug) name += `_${querySlug}`;
  }
  return name;
}

function resolveUrl(base, target) {
  if (/^https?:\/\//i.test(target)) return target;
  const suffix = target.startsWith("/") ? target : `/${target}`;
  return `${base.replace(/\/+$/, "")}${suffix}`;
}

async function readPathsFile(filePath) {
  const text = await readFile(filePath, "utf8");
  const parsed = JSON.parse(text);
  if (!Array.isArray(parsed)) {
    throw new Error(`--paths-file must contain a JSON array: ${filePath}`);
  }
  return parsed.map((entry) => {
    if (typeof entry === "string") return { path: entry };
    if (entry && typeof entry === "object" && typeof entry.path === "string") {
      return {
        path: entry.path,
        name: typeof entry.name === "string" ? entry.name : undefined,
      };
    }
    throw new Error(
      `--paths-file entries must be strings or { path, name }: ${JSON.stringify(entry)}`,
    );
  });
}

function buildTargets(args) {
  const targets = [];
  if (typeof args.paths === "string") {
    for (const piece of args.paths.split(",")) {
      const trimmed = piece.trim();
      if (trimmed) targets.push({ path: trimmed });
    }
  }
  return targets;
}

async function measurePageHeight(page) {
  return page.evaluate(() => {
    const body = globalThis.document.body;
    const doc = globalThis.document.documentElement;
    return Math.max(
      body ? body.scrollHeight : 0,
      body ? body.offsetHeight : 0,
      doc ? doc.scrollHeight : 0,
      doc ? doc.offsetHeight : 0,
      globalThis.innerHeight || 0,
    );
  });
}

/**
 * Walk down the page in viewport-height steps to force lazy-loaded images to
 * load, then return to the top. Bounded by MAX_SCROLL_STEPS / MAX_SCROLL_HEIGHT.
 */
async function triggerLazyLoad(page, viewportHeight) {
  await page.evaluate(
    async ({ step, maxSteps, hardCap, delay }) => {
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const doc = globalThis.document.documentElement;
      const body = globalThis.document.body;
      const currentHeight = () =>
        Math.max(
          body ? body.scrollHeight : 0,
          doc ? doc.scrollHeight : 0,
          globalThis.innerHeight || 0,
        );

      let limit = Math.min(currentHeight(), hardCap);
      let y = 0;
      let steps = 0;
      while (y < limit && steps < maxSteps) {
        globalThis.scrollTo(0, y);
        await wait(delay);
        limit = Math.min(currentHeight(), hardCap);
        y += step;
        steps += 1;
      }
      globalThis.scrollTo(0, limit);
      await wait(delay);
    },
    {
      step: viewportHeight,
      maxSteps: MAX_SCROLL_STEPS,
      hardCap: MAX_SCROLL_HEIGHT,
      delay: STEP_DELAY_MS,
    },
  );
}

/**
 * Deterministic fallback for pages whose single fullPage capture fails: walk
 * down in fixed viewport-height steps and save one viewport-sized PNG per step
 * as `{name}.{viewport}.partNN.png`. Fixed-position elements repeat at the top
 * of every part; the last part is aligned to the page bottom (small overlap).
 */
async function captureScrollSegments(
  page,
  { name, viewportName, outDir, viewportHeight, pageHeight },
) {
  const partCount = Math.max(1, Math.ceil(pageHeight / viewportHeight));
  const maxTop = Math.max(0, pageHeight - viewportHeight);
  const files = [];
  for (let part = 0; part < partCount; part += 1) {
    const y = Math.min(part * viewportHeight, maxTop);
    await page.evaluate((top) => globalThis.scrollTo(0, top), y);
    await sleep(STEP_DELAY_MS + 100);
    const file = `${name}.${viewportName}.part${String(part + 1).padStart(2, "0")}.png`;
    await page.screenshot({
      path: path.join(outDir, file),
      animations: "allow",
    });
    files.push(file);
  }
  await page.evaluate(() => globalThis.scrollTo(0, 0)).catch(() => {});
  return files;
}

async function writeManifest(outDir, entries) {
  const manifestPath = path.join(outDir, "capture-manifest.json");
  let existing = [];
  try {
    const parsed = JSON.parse(await readFile(manifestPath, "utf8"));
    if (Array.isArray(parsed)) existing = parsed;
  } catch {
    existing = [];
  }
  // Replace entries for the same (path, viewport) so re-runs stay idempotent.
  const byKey = new Map();
  for (const entry of existing) {
    byKey.set(`${entry.path}::${entry.viewport}`, entry);
  }
  for (const entry of entries) {
    byKey.set(`${entry.path}::${entry.viewport}`, entry);
  }
  const merged = [...byKey.values()].sort(
    (a, b) =>
      String(a.path).localeCompare(String(b.path)) ||
      String(a.viewport).localeCompare(String(b.viewport)),
  );
  await writeFile(manifestPath, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
  return manifestPath;
}

async function captureTarget({
  browser,
  base,
  outDir,
  target,
  viewportName,
  settleMs,
  saveHtml,
  prefersReducedMotion,
}) {
  const preset = VIEWPORTS[viewportName];
  const isMobile = viewportName === "mobile";
  const url = resolveUrl(base, target.path);
  const name = target.name
    ? sanitizeToken(target.name) || slugifyPath(target.path)
    : slugifyPath(target.path);

  const context = await browser.newContext({
    viewport: { width: preset.width, height: preset.height },
    deviceScaleFactor: 1,
    isMobile,
    hasTouch: isMobile,
    locale: "ko-KR",
    timezoneId: "Asia/Seoul",
    ...(prefersReducedMotion ? { reducedMotion: "reduce" } : {}),
  });

  const page = await context.newPage();
  const entry = {
    base,
    path: target.path,
    url,
    viewport: viewportName,
    viewportSize: { width: preset.width, height: preset.height },
    pageHeight: null,
    file: null,
    capturedAt: new Date().toISOString(),
    status: "ok",
    error: null,
  };

  try {
    let lastError = null;
    for (let attempt = 1; attempt <= 2; attempt += 1) {
      try {
        await page.goto(url, { waitUntil: "load", timeout: NAV_TIMEOUT_MS });
        lastError = null;
        break;
      } catch (err) {
        lastError = err;
        if (attempt === 2) throw err;
        console.warn(
          `  ! navigation failed (attempt ${attempt}), retrying: ${err.message}`,
        );
        await sleep(1000);
      }
    }
    if (lastError) throw lastError;

    // Fonts first, then lazy content, then settle.
    await page
      .evaluate(() =>
        globalThis.document.fonts ? globalThis.document.fonts.ready : null,
      )
      .catch(() => {});

    await triggerLazyLoad(page, preset.height);
    await page.evaluate(() => globalThis.scrollTo(0, 0)).catch(() => {});
    await sleep(settleMs);

    const pageHeight = await measurePageHeight(page);
    entry.pageHeight = pageHeight;

    const screenshotOptions = { animations: "allow" };
    const oversized = pageHeight > SOFT_HEIGHT_LIMIT;
    if (oversized) {
      console.warn(
        `  ! page is ${pageHeight}px tall (above the historical ${SOFT_HEIGHT_LIMIT}px ` +
          `Chromium bitmap limit); attempting a single fullPage capture`,
      );
    }
    const file = `${name}.${viewportName}.png`;
    try {
      await page.screenshot({
        path: path.join(outDir, file),
        fullPage: true,
        ...screenshotOptions,
      });
      entry.file = file;
      entry.heightLimited = oversized;
    } catch (err) {
      if (!oversized) throw err;
      console.warn(
        `  ! fullPage capture failed (${err.message}); falling back to ` +
          `deterministic viewport-height segments`,
      );
      const files = await captureScrollSegments(page, {
        name,
        viewportName,
        outDir,
        viewportHeight: preset.height,
        pageHeight,
      });
      entry.file = files[0];
      entry.files = files;
      entry.segmented = true;
      entry.heightLimited = true;
    }

    if (saveHtml) {
      const htmlFile = `${name}.${viewportName}.html`;
      await writeFile(
        path.join(outDir, htmlFile),
        await page.content(),
        "utf8",
      );
      entry.html = htmlFile;
    }
  } catch (err) {
    entry.status = "error";
    entry.error = err && err.message ? err.message : String(err);
    console.error(`  x ${target.path} [${viewportName}]: ${entry.error}`);
  } finally {
    await context.close().catch(() => {});
  }

  return entry;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || args.h) {
    usage();
    return 0;
  }

  const base = typeof args.base === "string" ? args.base.trim() : "";
  const outDir = typeof args.out === "string" ? args.out.trim() : "";
  const viewportArg =
    typeof args.viewport === "string" ? args.viewport.trim() : "desktop";
  if (!base) {
    usage("--base is required");
    return 2;
  }
  if (!outDir) {
    usage("--out is required");
    return 2;
  }
  if (!["desktop", "mobile", "all"].includes(viewportArg)) {
    usage(
      `--viewport must be one of: desktop, mobile, all (got "${viewportArg}")`,
    );
    return 2;
  }

  const settleMs = Number.isFinite(Number(args["settle-ms"]))
    ? Number(args["settle-ms"])
    : SETTLE_DEFAULT_MS;

  // Assemble the target list: --paths-file entries first, then --paths.
  const targets = [];
  const seen = new Set();
  const pushTarget = (target) => {
    const key = `${target.path}::${target.name ?? ""}`;
    if (seen.has(key)) return;
    seen.add(key);
    targets.push(target);
  };

  if (typeof args["paths-file"] === "string") {
    for (const target of await readPathsFile(args["paths-file"])) {
      pushTarget(target);
    }
  }
  for (const target of buildTargets(args)) pushTarget(target);
  if (targets.length === 0) pushTarget({ path: "/" });

  const viewports =
    viewportArg === "all" ? Object.keys(VIEWPORTS) : [viewportArg];

  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch();
  const entries = [];
  try {
    for (const target of targets) {
      for (const viewportName of viewports) {
        console.log(`-> ${target.path} [${viewportName}]`);
        const entry = await captureTarget({
          browser,
          base,
          outDir,
          target,
          viewportName,
          settleMs,
          saveHtml: Boolean(args["save-html"]),
          prefersReducedMotion: Boolean(args["prefers-reduced-motion"]),
        });
        entries.push(entry);
        if (entry.status === "ok") {
          console.log(
            `   ok ${entry.file} (${entry.pageHeight}px tall)` +
              (entry.segmented
                ? ` [+${entry.files.length - 1} more parts]`
                : ""),
          );
        }
        await sleep(BETWEEN_CAPTURES_MS);
      }
    }
  } finally {
    await browser.close().catch(() => {});
  }

  const manifestPath = await writeManifest(outDir, entries);
  const failed = entries.filter((entry) => entry.status !== "ok");
  console.log(
    `\ncaptured ${entries.length - failed.length}/${entries.length} page(s); manifest: ${manifestPath}`,
  );
  if (failed.length > 0) {
    console.error(`failed: ${failed.map((entry) => entry.path).join(", ")}`);
    return 1;
  }
  return 0;
}

main()
  .then((code) => {
    process.exitCode = code;
  })
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
