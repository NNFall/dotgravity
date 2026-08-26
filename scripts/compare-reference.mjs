import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from "node:fs";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const VIEWPORT = Object.freeze({
  id: "1672x941",
  width: 1672,
  height: 941,
  rawComparedPixels: 1672 * 941,
});
const SCENE_IDS = Object.freeze([
  "hero",
  "about",
  "menu",
  "gallery",
  "souvenirs",
  "contacts",
]);
const BASELINE_DIRECTORY = `tests/visual/baselines/${VIEWPORT.id}`;
const CAPTURE_DIRECTORY = `artifacts/visual/captures/${VIEWPORT.id}`;
const EVIDENCE_DIRECTORY = `artifacts/visual/raw-comparison/${VIEWPORT.id}`;
const DEFAULT_REPO_ROOT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
);
const SHA256_PATTERN = /^[A-Fa-f0-9]{64}$/;

const fail = (message) => {
  throw new Error(`Raw visual comparison refused: ${message}`);
};

export const isPathInside = (parent, candidate) => {
  const childPath = relative(resolve(parent), resolve(candidate));
  return (
    childPath.length > 0 &&
    childPath !== ".." &&
    !childPath.startsWith(`..${sep}`) &&
    !isAbsolute(childPath)
  );
};

const normalizeSha256 = (value, label) => {
  if (typeof value !== "string" || !SHA256_PATTERN.test(value)) {
    fail(`${label} must be exactly 64 hexadecimal characters.`);
  }

  return value.toUpperCase();
};

const hashFile = (path) =>
  createHash("sha256").update(readFileSync(path)).digest("hex").toUpperCase();

const realPathInside = (parent, candidate, label) => {
  let realParent;
  let realCandidate;
  try {
    realParent = realpathSync(parent);
    realCandidate = realpathSync(candidate);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    fail(`${label} could not be resolved: ${detail}`);
  }

  if (!isPathInside(realParent, realCandidate)) {
    fail(`${label} escaped its allowed directory.`);
  }

  return realCandidate;
};

const readPng = (path, label) => {
  try {
    return PNG.sync.read(readFileSync(path));
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    fail(`${label} is not a readable PNG at ${path}: ${detail}`);
  }
};

const formatRelativePath = (repoRoot, filePath) =>
  relative(repoRoot, filePath).replaceAll(sep, "/");

/**
 * Compare every RGBA pixel without a tolerance. Pixelmatch is used only to
 * render an explanatory heatmap; the raw loop is the sole pass/fail metric.
 *
 * @param {{ baselinePath: string; candidatePath: string; heatmapPath?: string }} options
 */
export function comparePngFiles(options) {
  const { baselinePath, candidatePath, heatmapPath } = options ?? {};
  if (typeof baselinePath !== "string" || baselinePath.length === 0) {
    fail("baselinePath must be a non-empty string.");
  }
  if (typeof candidatePath !== "string" || candidatePath.length === 0) {
    fail("candidatePath must be a non-empty string.");
  }

  const baseline = readPng(baselinePath, "Baseline");
  const candidate = readPng(candidatePath, "Live capture");
  if (
    baseline.width !== candidate.width ||
    baseline.height !== candidate.height
  ) {
    fail(
      `PNG dimensions differ: baseline ${baseline.width}x${baseline.height}, ` +
        `live capture ${candidate.width}x${candidate.height}.`,
    );
  }

  const rawComparedPixels = baseline.width * baseline.height;
  let changedPixels = 0;
  let maxChannelDelta = 0;
  let totalChannelDelta = 0;
  let left = baseline.width;
  let top = baseline.height;
  let right = -1;
  let bottom = -1;

  for (let offset = 0; offset < baseline.data.length; offset += 4) {
    const redDelta = Math.abs(baseline.data[offset] - candidate.data[offset]);
    const greenDelta = Math.abs(
      baseline.data[offset + 1] - candidate.data[offset + 1],
    );
    const blueDelta = Math.abs(
      baseline.data[offset + 2] - candidate.data[offset + 2],
    );
    const alphaDelta = Math.abs(
      baseline.data[offset + 3] - candidate.data[offset + 3],
    );
    const pixelChannelDelta =
      redDelta + greenDelta + blueDelta + alphaDelta;

    totalChannelDelta += pixelChannelDelta;
    maxChannelDelta = Math.max(
      maxChannelDelta,
      redDelta,
      greenDelta,
      blueDelta,
      alphaDelta,
    );

    if (pixelChannelDelta === 0) {
      continue;
    }

    changedPixels += 1;
    const pixelIndex = offset / 4;
    const x = pixelIndex % baseline.width;
    const y = Math.floor(pixelIndex / baseline.width);
    left = Math.min(left, x);
    top = Math.min(top, y);
    right = Math.max(right, x);
    bottom = Math.max(bottom, y);
  }

  const heatmap = new PNG({ width: baseline.width, height: baseline.height });
  const pixelmatchMismatchPixels = pixelmatch(
    baseline.data,
    candidate.data,
    heatmap.data,
    baseline.width,
    baseline.height,
    {
      alpha: 1,
      includeAA: true,
      threshold: 0,
    },
  );
  if (typeof heatmapPath === "string" && heatmapPath.length > 0) {
    mkdirSync(dirname(heatmapPath), { recursive: true });
    writeFileSync(heatmapPath, PNG.sync.write(heatmap));
  }

  return {
    rawComparedPixels,
    changedPixels,
    changedRatio: changedPixels / rawComparedPixels,
    maxChannelDelta,
    meanChannelDelta: totalChannelDelta / (rawComparedPixels * 4),
    boundingBox:
      changedPixels === 0
        ? null
        : {
            left,
            top,
            right,
            bottom,
            width: right - left + 1,
            height: bottom - top + 1,
          },
    pixelmatchMismatchPixels,
  };
}

const readBaselineManifest = (repoRoot) => {
  const baselineDirectory = resolve(repoRoot, BASELINE_DIRECTORY);
  if (!isPathInside(repoRoot, baselineDirectory)) {
    fail("Baseline directory escaped the repository root.");
  }
  const realBaselineDirectory = realPathInside(
    repoRoot,
    baselineDirectory,
    "Baseline directory",
  );
  const manifestPath = resolve(realBaselineDirectory, "manifest.json");
  const realManifestPath = realPathInside(
    realBaselineDirectory,
    manifestPath,
    "Baseline manifest",
  );

  let manifest;
  try {
    manifest = JSON.parse(readFileSync(realManifestPath, "utf8"));
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    fail(`Baseline manifest is not readable JSON: ${detail}`);
  }
  if (!manifest || !Array.isArray(manifest.scenes)) {
    fail("Baseline manifest must contain a scenes array.");
  }

  const entriesByScene = new Map();
  for (const entry of manifest.scenes) {
    if (!entry || typeof entry !== "object") {
      fail("Baseline manifest contains a non-object scene entry.");
    }
    if (typeof entry.sceneId !== "string" || !SCENE_IDS.includes(entry.sceneId)) {
      fail("Baseline manifest contains an unsupported sceneId.");
    }
    if (entriesByScene.has(entry.sceneId)) {
      fail(`Baseline manifest repeats ${entry.sceneId}.`);
    }
    if (typeof entry.file !== "string" || entry.file.length === 0) {
      fail(`${entry.sceneId} baseline file must be a non-empty string.`);
    }
    if (
      entry.width !== VIEWPORT.width ||
      entry.height !== VIEWPORT.height ||
      entry.rawComparedPixels !== VIEWPORT.rawComparedPixels
    ) {
      fail(`${entry.sceneId} baseline dimensions or raw pixel count drifted.`);
    }

    const baselinePath = resolve(realBaselineDirectory, entry.file);
    if (!isPathInside(realBaselineDirectory, baselinePath)) {
      fail(`${entry.sceneId} baseline file escaped its directory.`);
    }
    const realBaselinePath = realPathInside(
      realBaselineDirectory,
      baselinePath,
      `${entry.sceneId} baseline file`,
    );
    const manifestSha256 = normalizeSha256(
      entry.sha256,
      `${entry.sceneId} manifest sha256`,
    );
    const currentSha256 = hashFile(realBaselinePath);
    if (manifestSha256 !== currentSha256) {
      fail(
        `${entry.sceneId} manifest SHA-256 ${manifestSha256} does not match ` +
          `the actual baseline bytes ${currentSha256}.`,
      );
    }
    const baselineImage = readPng(realBaselinePath, "Baseline");
    if (
      baselineImage.width !== VIEWPORT.width ||
      baselineImage.height !== VIEWPORT.height ||
      baselineImage.width * baselineImage.height !== VIEWPORT.rawComparedPixels
    ) {
      fail(
        `${entry.sceneId} actual PNG dimensions ${baselineImage.width}x${baselineImage.height} ` +
          `do not match ${VIEWPORT.width}x${VIEWPORT.height}.`,
      );
    }
    entriesByScene.set(entry.sceneId, {
      ...entry,
      baselinePath: realBaselinePath,
    });
  }

  if (entriesByScene.size !== SCENE_IDS.length) {
    fail(`Baseline manifest must contain exactly ${SCENE_IDS.length} scenes.`);
  }
  for (const sceneId of SCENE_IDS) {
    if (!entriesByScene.has(sceneId)) {
      fail(`Baseline manifest is missing ${sceneId}.`);
    }
  }

  return SCENE_IDS.map((sceneId) => entriesByScene.get(sceneId));
};

/**
 * @param {{ repoRoot?: string; log?: (line: string) => void }} [options]
 */
export function runRawComparison(options = {}) {
  const { repoRoot = DEFAULT_REPO_ROOT, log = console.log } = options;
  let resolvedRepoRoot;
  try {
    resolvedRepoRoot = realpathSync(resolve(repoRoot));
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    fail(`Repository root could not be resolved: ${detail}`);
  }
  const captureDirectory = resolve(resolvedRepoRoot, CAPTURE_DIRECTORY);
  if (!isPathInside(resolvedRepoRoot, captureDirectory)) {
    fail("Live capture directory escaped the repository root.");
  }
  if (!existsSync(captureDirectory)) {
    fail(
      `Live capture directory is missing: ${formatRelativePath(resolvedRepoRoot, captureDirectory)}. ` +
        "Run npm run qa:visual before npm run qa:raw.",
    );
  }
  const realCaptureDirectory = realPathInside(
    resolvedRepoRoot,
    captureDirectory,
    "Live capture directory",
  );

  const evidenceDirectory = resolve(resolvedRepoRoot, EVIDENCE_DIRECTORY);
  if (!isPathInside(resolvedRepoRoot, evidenceDirectory)) {
    fail("Raw comparison evidence directory escaped the repository root.");
  }
  mkdirSync(evidenceDirectory, { recursive: true });
  const realEvidenceDirectory = realPathInside(
    resolvedRepoRoot,
    evidenceDirectory,
    "Raw comparison evidence directory",
  );
  const heatmapDirectory = resolve(realEvidenceDirectory, "heatmaps");
  if (!isPathInside(realEvidenceDirectory, heatmapDirectory)) {
    fail("Raw comparison heatmap directory escaped its evidence directory.");
  }
  mkdirSync(heatmapDirectory, { recursive: true });
  const realHeatmapDirectory = realPathInside(
    realEvidenceDirectory,
    heatmapDirectory,
    "Raw comparison heatmap directory",
  );

  const scenes = readBaselineManifest(resolvedRepoRoot).map((entry) => {
    const candidatePath = resolve(realCaptureDirectory, entry.file);
    if (!isPathInside(realCaptureDirectory, candidatePath)) {
      fail(`${entry.sceneId} live capture path escaped its directory.`);
    }
    if (!existsSync(candidatePath)) {
      fail(
        `Missing live capture for ${entry.sceneId}: ${formatRelativePath(resolvedRepoRoot, candidatePath)}. ` +
          "Run npm run qa:visual before npm run qa:raw.",
      );
    }
    const realCandidatePath = realPathInside(
      realCaptureDirectory,
      candidatePath,
      `${entry.sceneId} live capture`,
    );

    const heatmapPath = resolve(realHeatmapDirectory, `${entry.sceneId}.png`);
    if (!isPathInside(realHeatmapDirectory, heatmapPath)) {
      fail(`${entry.sceneId} heatmap path escaped its directory.`);
    }
    if (existsSync(heatmapPath)) {
      realPathInside(
        realHeatmapDirectory,
        heatmapPath,
        `${entry.sceneId} existing heatmap`,
      );
    }
    const metrics = comparePngFiles({
      baselinePath: entry.baselinePath,
      candidatePath: realCandidatePath,
      heatmapPath,
    });
    return {
      sceneId: entry.sceneId,
      baselinePath: formatRelativePath(resolvedRepoRoot, entry.baselinePath),
      candidatePath: formatRelativePath(resolvedRepoRoot, realCandidatePath),
      heatmapPath: formatRelativePath(resolvedRepoRoot, heatmapPath),
      ...metrics,
      rawZeroMatch: metrics.changedPixels === 0,
    };
  });

  const changedPixels = scenes.reduce(
    (total, scene) => total + scene.changedPixels,
    0,
  );
  const rawComparedPixels = scenes.reduce(
    (total, scene) => total + scene.rawComparedPixels,
    0,
  );
  const report = {
    schemaVersion: 1,
    viewport: VIEWPORT,
    contract: {
      rawZeroMismatchOnly: true,
      channelTolerance: 0,
      rawComparedPixelsPerScene: VIEWPORT.rawComparedPixels,
      heatmapsSupplementaryOnly: true,
    },
    scenes,
    summary: {
      scenesCompared: scenes.length,
      rawComparedPixels,
      changedPixels,
      changedRatio: changedPixels / rawComparedPixels,
      rawZeroMatch: changedPixels === 0,
    },
  };

  const reportPath = resolve(realEvidenceDirectory, "report.json");
  if (!isPathInside(realEvidenceDirectory, reportPath)) {
    fail("Raw comparison report path escaped its evidence directory.");
  }
  if (existsSync(reportPath)) {
    realPathInside(
      realEvidenceDirectory,
      reportPath,
      "Existing raw comparison report",
    );
  }
  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  for (const scene of scenes) {
    log(
      `${scene.sceneId}: ${scene.changedPixels}/${scene.rawComparedPixels} raw pixels changed ` +
        `(${scene.changedRatio.toFixed(8)}), max channel delta ${scene.maxChannelDelta}, ` +
        `mean channel delta ${scene.meanChannelDelta.toFixed(8)}.`,
    );
  }
  log(`Raw comparison report: ${formatRelativePath(resolvedRepoRoot, reportPath)}`);

  return report;
}

const isDirectExecution =
  process.argv[1] &&
  pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

if (isDirectExecution) {
  try {
    const report = runRawComparison();
    if (!report.summary.rawZeroMatch) {
      console.error(
        `Raw visual comparison failed: ${report.summary.changedPixels}/${report.summary.rawComparedPixels} ` +
          "pixels differ; zero differences are required.",
      );
      process.exitCode = 1;
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
