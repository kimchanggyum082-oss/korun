/**
 * Pixel diff for captured reference screenshots.
 *
 * Compares every same-named PNG in two capture directories (typically
 * `reference/original` vs a clone capture) and writes per-file diff images
 * plus a JSON report.
 *
 * Usage:
 *   node scripts/compare.mjs --a <dirA> --b <dirB> --out <dirDiffs>
 *     [--threshold 0.1] [--report <file.json>] [--color-threshold 0.1]
 *
 * Notes:
 *   - `--threshold` is a PERCENTAGE of mismatching pixels (0.1 = 0.1%).
 *     Any file above it (or missing a counterpart) fails the run.
 *   - `--color-threshold` is pixelmatch's per-pixel colour sensitivity
 *     (0..1, smaller = stricter); it is not the failure threshold.
 *   - Files with different dimensions are padded to the larger canvas with a
 *     deterministic magenta fill before diffing, so dimension drift shows up
 *     as mismatched pixels instead of crashing.
 */

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const PAD_FILL = [255, 0, 255, 255]; // magenta, opaque

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
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
      "Usage: node scripts/compare.mjs --a <dirA> --b <dirB> --out <dirDiffs>",
      "         [--threshold 0.1] [--report <file.json>] [--color-threshold 0.1]",
    ].join("\n"),
  );
}

async function listPngs(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter(
      (entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".png"),
    )
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function padImage(img, width, height) {
  if (img.width === width && img.height === height) return img;
  const out = new PNG({ width, height });
  for (let i = 0; i < out.data.length; i += 4) {
    out.data[i] = PAD_FILL[0];
    out.data[i + 1] = PAD_FILL[1];
    out.data[i + 2] = PAD_FILL[2];
    out.data[i + 3] = PAD_FILL[3];
  }
  const rowBytes = img.width * 4;
  for (let y = 0; y < img.height; y += 1) {
    const srcStart = y * rowBytes;
    img.data.copy(out.data, y * width * 4, srcStart, srcStart + rowBytes);
  }
  return out;
}

function formatPercent(value) {
  return `${value.toFixed(3)}%`;
}

function printSummary(rows) {
  const headers = [
    "file",
    "A (w x h)",
    "B (w x h)",
    "mismatch px",
    "mismatch %",
    "status",
  ];
  const table = [headers, ...rows];
  const widths = headers.map((_, col) =>
    Math.max(...table.map((row) => String(row[col]).length)),
  );
  const separator = widths.map((w) => "-".repeat(w)).join("  ");
  console.log("");
  console.log(headers.map((h, i) => h.padEnd(widths[i])).join("  "));
  console.log(separator);
  for (const row of rows) {
    console.log(
      row.map((cell, i) => String(cell).padEnd(widths[i])).join("  "),
    );
  }
  console.log("");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || args.h) {
    usage();
    return 0;
  }

  const dirA = typeof args.a === "string" ? args.a : "";
  const dirB = typeof args.b === "string" ? args.b : "";
  const outDir = typeof args.out === "string" ? args.out : "";
  if (!dirA || !dirB || !outDir) {
    usage("--a, --b and --out are all required");
    return 2;
  }

  const thresholdPercent = Number.isFinite(Number(args.threshold))
    ? Number(args.threshold)
    : 0.1;
  const colorThreshold = Number.isFinite(Number(args["color-threshold"]))
    ? Number(args["color-threshold"])
    : 0.1;

  const aNames = await listPngs(dirA);
  const bNames = await listPngs(dirB);
  const names = [...new Set([...aNames, ...bNames])].sort((a, b) =>
    a.localeCompare(b),
  );
  if (names.length === 0) {
    console.error(`no PNG files found in ${dirA} or ${dirB}`);
    return 1;
  }

  const aSet = new Set(aNames);
  const bSet = new Set(bNames);
  await mkdir(outDir, { recursive: true });

  const reportFiles = [];
  const tableRows = [];
  let failures = 0;

  for (const name of names) {
    const inA = aSet.has(name);
    const inB = bSet.has(name);

    if (!inA || !inB) {
      const status = inA ? "missing-in-b" : "missing-in-a";
      reportFiles.push({ name, status });
      tableRows.push([
        name,
        inA ? "-" : "(absent)",
        inB ? "-" : "(absent)",
        "-",
        "-",
        status,
      ]);
      failures += 1;
      continue;
    }

    const imageA = PNG.sync.read(await readFile(path.join(dirA, name)));
    const imageB = PNG.sync.read(await readFile(path.join(dirB, name)));
    const dimensionMismatch =
      imageA.width !== imageB.width || imageA.height !== imageB.height;
    const width = Math.max(imageA.width, imageB.width);
    const height = Math.max(imageA.height, imageB.height);

    const paddedA = padImage(imageA, width, height);
    const paddedB = padImage(imageB, width, height);
    const diff = new PNG({ width, height });

    const mismatchPixels = pixelmatch(
      paddedA.data,
      paddedB.data,
      diff.data,
      width,
      height,
      { threshold: colorThreshold, includeAA: false },
    );
    const totalPixels = width * height;
    const mismatchPercent = (mismatchPixels / totalPixels) * 100;
    const exceeded = mismatchPercent > thresholdPercent;

    const diffName = `${name.replace(/\.png$/i, "")}.diff.png`;
    await writeFile(path.join(outDir, diffName), PNG.sync.write(diff));

    reportFiles.push({
      name,
      status: "compared",
      widthA: imageA.width,
      heightA: imageA.height,
      widthB: imageB.width,
      heightB: imageB.height,
      paddedWidth: width,
      paddedHeight: height,
      dimensionMismatch,
      mismatchPixels,
      totalPixels,
      mismatchPercent: Number(mismatchPercent.toFixed(6)),
      thresholdExceeded: exceeded,
      diffFile: diffName,
    });
    tableRows.push([
      name,
      `${imageA.width} x ${imageA.height}`,
      `${imageB.width} x ${imageB.height}`,
      String(mismatchPixels),
      formatPercent(mismatchPercent),
      exceeded ? "FAIL" : "ok",
    ]);
    if (exceeded) failures += 1;
  }

  const report = {
    generatedAt: new Date().toISOString(),
    dirA,
    dirB,
    out: outDir,
    thresholdPercent,
    colorThreshold,
    summary: {
      total: names.length,
      compared: reportFiles.filter((f) => f.status === "compared").length,
      missingInA: names.filter((n) => !aSet.has(n)),
      missingInB: names.filter((n) => !bSet.has(n)),
      exceededThreshold: reportFiles.filter((f) => f.thresholdExceeded).length,
      failed: failures,
    },
    files: reportFiles,
  };

  const reportPath =
    typeof args.report === "string"
      ? args.report
      : path.join(outDir, "diff-report.json");
  await mkdir(path.dirname(reportPath), { recursive: true });
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  printSummary(tableRows);
  console.log(
    `threshold: ${thresholdPercent}% | diffs: ${path.resolve(outDir)} | report: ${path.resolve(reportPath)}`,
  );

  if (failures > 0) {
    console.error(
      `${failures} file(s) exceeded threshold or had no counterpart`,
    );
    return 1;
  }
  console.log("all files within threshold");
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
