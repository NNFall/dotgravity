import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, realpathSync } from "node:fs";
import {
  dirname,
  extname,
  isAbsolute,
  relative,
  resolve,
  sep,
} from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const APPROVALS_RELATIVE_DIRECTORY = "docs/visual-approvals";
const BASELINES_RELATIVE_DIRECTORY = "tests/visual/baselines";
const SHA256_PATTERN = /^[A-Fa-f0-9]{64}$/;
const VIEWPORT_PATTERN = /^(\d+)x(\d+)$/;
const ISO_TIMESTAMP_PATTERN =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;
const DEFAULT_REPO_ROOT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
);

const refuse = (message) => {
  throw new Error(`Visual baseline update refused: ${message}`);
};

const isPlainObject = (value) =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const requireNonEmptyString = (value, field) => {
  if (typeof value !== "string" || value.trim().length === 0) {
    refuse(`${field} must be a non-empty string.`);
  }

  return value.trim();
};

const normalizeSha256 = (value, field) => {
  const sha256 = requireNonEmptyString(value, field);
  if (!SHA256_PATTERN.test(sha256)) {
    refuse(`${field} must be exactly 64 hexadecimal characters.`);
  }

  return sha256.toUpperCase();
};

const isPathInside = (parent, candidate) => {
  const childPath = relative(parent, candidate);
  return (
    childPath.length > 0 &&
    childPath !== ".." &&
    !childPath.startsWith(`..${sep}`) &&
    !isAbsolute(childPath)
  );
};

const readJson = (path, label) => {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    refuse(`${label} is not readable JSON: ${detail}`);
  }
};

const hashFile = (path) =>
  createHash("sha256")
    .update(readFileSync(path))
    .digest("hex")
    .toUpperCase();

const hashBytes = (bytes) =>
  createHash("sha256").update(bytes).digest("hex").toUpperCase();

const requireMatchesCommittedHead = (repoRoot, filePath, label) => {
  const repoRelativePath = relative(repoRoot, filePath).replaceAll(sep, "/");
  if (!isPathInside(repoRoot, filePath)) {
    refuse(`${label} escaped the repository root.`);
  }

  let committedBytes;
  try {
    committedBytes = execFileSync(
      "git",
      ["show", `HEAD:${repoRelativePath}`],
      {
        cwd: repoRoot,
        maxBuffer: 32 * 1024 * 1024,
        stdio: ["ignore", "pipe", "pipe"],
        windowsHide: true,
      },
    );
  } catch {
    refuse(
      `${label} must have a committed HEAD blob before use: ${repoRelativePath}`,
    );
  }

  const currentBytes = readFileSync(filePath);
  if (!currentBytes.equals(committedBytes)) {
    refuse(
      `${label} current bytes must exactly match its committed HEAD blob ` +
        `(current SHA-256 ${hashBytes(currentBytes)}, HEAD SHA-256 ${hashBytes(committedBytes)}).`,
    );
  }
};

const loadBaselineManifest = (repoRoot, viewport) => {
  const viewportMatch = VIEWPORT_PATTERN.exec(viewport);
  if (!viewportMatch) {
    refuse(`affectedBaselines viewport is invalid: ${viewport}`);
  }

  const expectedWidth = Number(viewportMatch[1]);
  const expectedHeight = Number(viewportMatch[2]);
  const manifestDirectory = resolve(
    repoRoot,
    BASELINES_RELATIVE_DIRECTORY,
    viewport,
  );
  let realManifestDirectory;
  let manifestPath;

  try {
    realManifestDirectory = realpathSync(manifestDirectory);
    manifestPath = realpathSync(resolve(realManifestDirectory, "manifest.json"));
  } catch {
    refuse(`baseline manifest does not exist for viewport ${viewport}.`);
  }

  if (!isPathInside(realManifestDirectory, manifestPath)) {
    refuse(`baseline manifest escaped its viewport directory: ${viewport}.`);
  }

  requireMatchesCommittedHead(
    repoRoot,
    manifestPath,
    `${viewport} baseline manifest`,
  );
  const manifest = readJson(manifestPath, `${viewport} baseline manifest`);
  if (!isPlainObject(manifest) || !Array.isArray(manifest.scenes)) {
    refuse(`${viewport} baseline manifest must contain a scenes array.`);
  }

  const sceneEntries = new Map();
  for (const entry of manifest.scenes) {
    if (!isPlainObject(entry)) {
      refuse(`${viewport} baseline manifest contains a non-object scene.`);
    }

    const scene = requireNonEmptyString(
      entry.sceneId,
      `${viewport} manifest sceneId`,
    );
    if (sceneEntries.has(scene)) {
      refuse(`${viewport} baseline manifest repeats scene ${scene}.`);
    }

    const file = requireNonEmptyString(
      entry.file,
      `${scene}@${viewport} manifest file`,
    );
    let baselinePath;
    try {
      baselinePath = realpathSync(resolve(realManifestDirectory, file));
    } catch {
      refuse(`${scene}@${viewport} baseline file does not exist: ${file}`);
    }
    if (!isPathInside(realManifestDirectory, baselinePath)) {
      refuse(`${scene}@${viewport} baseline file escaped its directory.`);
    }

    if (
      entry.width !== expectedWidth ||
      entry.height !== expectedHeight ||
      entry.rawComparedPixels !== expectedWidth * expectedHeight
    ) {
      refuse(`${scene}@${viewport} manifest dimensions or pixel count drifted.`);
    }

    const manifestSha256 = normalizeSha256(
      entry.sha256,
      `${scene}@${viewport} manifest sha256`,
    );
    const currentSha256 = hashFile(baselinePath);
    if (manifestSha256 !== currentSha256) {
      refuse(
        `${scene}@${viewport} manifest hash ${manifestSha256} does not match current file hash ${currentSha256}.`,
      );
    }
    requireMatchesCommittedHead(
      repoRoot,
      baselinePath,
      `${scene}@${viewport} baseline file`,
    );

    sceneEntries.set(scene, {
      currentSha256,
      manifestSha256,
    });
  }

  return sceneEntries;
};

/**
 * @typedef {object} VisualUpdateApprovalOptions
 * @property {string} [approvalPath]
 * @property {string} [repoRoot]
 * @property {(line: string) => void} [log]
 */

/**
 * @param {VisualUpdateApprovalOptions} [options]
 */
export function validateVisualUpdateApproval(options = {}) {
  const {
    approvalPath,
    repoRoot = DEFAULT_REPO_ROOT,
    log = console.log,
  } = options;
  if (typeof approvalPath !== "string" || approvalPath.trim().length === 0) {
    refuse(
      "provide an approval JSON file path as the first argument or DOTGRAVITY_VISUAL_APPROVAL_FILE.",
    );
  }

  let realRepoRoot;
  let realApprovalsDirectory;
  let realApprovalPath;
  try {
    realRepoRoot = realpathSync(repoRoot);
    realApprovalsDirectory = realpathSync(
      resolve(realRepoRoot, APPROVALS_RELATIVE_DIRECTORY),
    );
    realApprovalPath = realpathSync(
      isAbsolute(approvalPath)
        ? approvalPath
        : resolve(realRepoRoot, approvalPath),
    );
  } catch {
    refuse("approval JSON file path does not exist.");
  }

  if (
    !isPathInside(realApprovalsDirectory, realApprovalPath) ||
    extname(realApprovalPath).toLowerCase() !== ".json"
  ) {
    refuse(
      `approval JSON file must be inside ${APPROVALS_RELATIVE_DIRECTORY}.`,
    );
  }

  requireMatchesCommittedHead(
    realRepoRoot,
    realApprovalPath,
    "approval file",
  );

  const record = readJson(realApprovalPath, "approval file");
  if (!isPlainObject(record)) {
    refuse("approval file must contain one JSON object.");
  }

  const id = requireNonEmptyString(record.id, "id");
  const userApprovalReference = requireNonEmptyString(
    record.userApprovalReference,
    "userApprovalReference",
  );
  const reason = requireNonEmptyString(record.reason, "reason");
  const requestedAt = requireNonEmptyString(record.requestedAt, "requestedAt");
  if (
    !ISO_TIMESTAMP_PATTERN.test(requestedAt) ||
    Number.isNaN(Date.parse(requestedAt))
  ) {
    refuse("requestedAt must be a valid ISO 8601 timestamp with a timezone.");
  }
  if (
    !Array.isArray(record.affectedBaselines) ||
    record.affectedBaselines.length === 0
  ) {
    refuse("affectedBaselines must be a non-empty array.");
  }

  const manifestCache = new Map();
  const affectedKeys = new Set();
  const affectedBaselines = record.affectedBaselines.map((affected, index) => {
    if (!isPlainObject(affected)) {
      refuse(`affectedBaselines[${index}] must be an object.`);
    }

    const scene = requireNonEmptyString(
      affected.scene,
      `affectedBaselines[${index}].scene`,
    );
    const viewport = requireNonEmptyString(
      affected.viewport,
      `affectedBaselines[${index}].viewport`,
    );
    const key = `${scene}@${viewport}`;
    if (affectedKeys.has(key)) {
      refuse(`affectedBaselines repeats ${key}.`);
    }
    affectedKeys.add(key);

    const previousSha256 = normalizeSha256(
      affected.previousSha256,
      `affectedBaselines[${index}].previousSha256`,
    );
    const proposedSha256 = normalizeSha256(
      affected.proposedSha256,
      `affectedBaselines[${index}].proposedSha256`,
    );
    if (previousSha256 === proposedSha256) {
      refuse(`${key} proposedSha256 must differ from previousSha256.`);
    }

    if (!manifestCache.has(viewport)) {
      manifestCache.set(
        viewport,
        loadBaselineManifest(realRepoRoot, viewport),
      );
    }
    const manifestScene = manifestCache.get(viewport).get(scene);
    if (!manifestScene) {
      refuse(`${key} is not present in its exact baseline manifest.`);
    }
    if (previousSha256 !== manifestScene.currentSha256) {
      refuse(
        `${key} previousSha256 does not match the current authoritative baseline hash.`,
      );
    }

    return {
      scene,
      viewport,
      previousSha256,
      proposedSha256,
    };
  });

  const validated = {
    mode: "preflight-only",
    mutatesFiles: false,
    id,
    userApprovalReference,
    reason,
    requestedAt,
    affectedBaselines,
  };

  log(`Visual candidate-update preflight validated: ${id}`);
  log(`User approval reference: ${userApprovalReference}`);
  log(`Reason: ${reason}`);
  log(`Requested at: ${requestedAt}`);
  for (const affected of affectedBaselines) {
    log(
      `Affected ${affected.scene}@${affected.viewport}: ${affected.previousSha256} -> ${affected.proposedSha256}`,
    );
  }
  log("Preflight report only: no files were changed.");
  log(
    "Task 10 candidate pipeline is required before any visual baseline mutation.",
  );

  return validated;
}

const isDirectExecution =
  process.argv[1] &&
  pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

if (isDirectExecution) {
  try {
    validateVisualUpdateApproval({
      approvalPath:
        process.argv[2] ?? process.env.DOTGRAVITY_VISUAL_APPROVAL_FILE,
    });
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
