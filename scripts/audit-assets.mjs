import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { extname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { PNG } from "pngjs";
import sharp from "sharp";

import { mediaManifest } from "../src/media/registry.mjs";
import {
  isLocalPublicMediaPath,
  validateMediaManifestRuntime,
} from "../src/media/runtime-validation.mjs";

const AUTHORITATIVE_REFERENCE_SHA256 = new Set([
  "21380897A08D9C2375C1755DEDEB0E7F4BBFA62271979EE05C0A33D79F0DB559",
  "5569EA6A855915480D98A9760A91F9D9D914D53410DCA1FF2EC99143B74A4DC9",
  "DCB62718375D93C4B61D6A0764859575885A0331A940C560DF664D90AFAC0924",
  "8FF8EC7190A48985D57F7BF05590A392049BFBBC5E4C36BBE4C2EA164B85EFB5",
  "1D154C8FBF7EDD02616B0AE624AB79F803BED47305863F758E93BBF061D6DAE0",
  "DC6958CC6FB22CB2892C5D4708B907468EE52A01251A6378F2E3E001B2E88457",
]);
const TEXT_FILE_EXTENSIONS = new Set([
  ".css",
  ".cjs",
  ".html",
  ".htm",
  ".js",
  ".jsx",
  ".json",
  ".less",
  ".mjs",
  ".sass",
  ".scss",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
]);

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const normalizedPath = (path) => path.split(sep).join("/");

const sha256 = (bytes) =>
  createHash("sha256").update(bytes).digest("hex").toUpperCase();

const listFiles = async (directory) => {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }

  const files = [];
  for (const entry of entries) {
    const entryPath = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(entryPath)));
    } else if (entry.isFile() || entry.isSymbolicLink()) {
      files.push(entryPath);
    }
  }
  return files;
};

const toPublicAssetPath = (publicDirectory, assetPath) => {
  assert(
    isLocalPublicMediaPath(assetPath),
    "Media path must be a local /media/ public path",
  );

  const resolvedPath = resolve(publicDirectory, `.${assetPath}`);
  const pathFromPublicDirectory = relative(publicDirectory, resolvedPath);
  assert(
    pathFromPublicDirectory.length > 0 &&
      !pathFromPublicDirectory.startsWith("..") &&
      !isAbsolute(pathFromPublicDirectory),
    "Media path must stay inside public/",
  );
  return resolvedPath;
};

const assertMediaBytes = async (asset, publicDirectory) => {
  const filePath = toPublicAssetPath(publicDirectory, asset.path);
  let bytes;
  try {
    bytes = await readFile(filePath);
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ENOENT") {
      throw new Error(`Registered media file is missing: ${asset.path}`);
    }
    throw error;
  }

  assert(
    sha256(bytes) === asset.sha256,
    `SHA-256 mismatch for ${asset.path}`,
  );

  const metadata = await sharp(bytes).metadata();
  assert(
    metadata.width === asset.dimensions.width &&
      metadata.height === asset.dimensions.height,
    `Dimensions mismatch for ${asset.path}: expected ${asset.dimensions.width}x${asset.dimensions.height}`,
  );
};

const assertNoReferenceSizedMaskedComposites = (manifest) => {
  const violations = manifest
    .filter(
      (asset) =>
        asset.provenance.classification === "reference-derived" &&
        asset.dimensions.width === 1672 &&
        asset.dimensions.height === 941,
    )
    .map((asset) => asset.path);

  assert(
    violations.length === 0,
    `Reference-derived asset cannot use the full 1672x941 reference canvas (masked full-screen composites are not allowed): ${violations.join(", ")}`,
  );
};

const assertReferenceDerivedPngTransparentRgb = async (
  manifest,
  publicDirectory,
) => {
  const referenceDerivedPngs = manifest.filter(
    (asset) =>
      asset.provenance.classification === "reference-derived" &&
      extname(asset.path).toLowerCase() === ".png",
  );
  const violations = [];

  for (const asset of referenceDerivedPngs) {
    const filePath = toPublicAssetPath(publicDirectory, asset.path);
    const image = PNG.sync.read(await readFile(filePath));
    let transparentPixels = 0;
    let hiddenRgbPixels = 0;
    let hiddenRgbChannels = 0;

    for (let offset = 0; offset < image.data.length; offset += 4) {
      if (image.data[offset + 3] !== 0) {
        continue;
      }

      transparentPixels += 1;
      let pixelHasHiddenRgb = false;
      for (let channel = 0; channel < 3; channel += 1) {
        if (image.data[offset + channel] !== 0) {
          pixelHasHiddenRgb = true;
          hiddenRgbChannels += 1;
        }
      }
      if (pixelHasHiddenRgb) {
        hiddenRgbPixels += 1;
      }
    }

    if (hiddenRgbPixels > 0) {
      violations.push(
        `${asset.path}: ${hiddenRgbPixels} pixel(s), ${hiddenRgbChannels} channel(s), ${transparentPixels} fully transparent pixel(s) total`,
      );
    }
  }

  assert(
    violations.length === 0,
    `Reference-derived PNG transparent RGB violation(s):\n${violations.join("\n")}`,
  );
  return referenceDerivedPngs.length;
};

const assertNoUnexpectedMedia = async (manifest, publicDirectory) => {
  const mediaDirectory = resolve(publicDirectory, "media");
  const expectedPaths = new Set(
    manifest.map((asset) => normalizedPath(asset.path.slice(1))),
  );
  const mediaFiles = await listFiles(mediaDirectory);
  const unexpectedMedia = mediaFiles
    .map((filePath) => normalizedPath(relative(publicDirectory, filePath)))
    .filter((filePath) => !expectedPaths.has(filePath));

  assert(
    unexpectedMedia.length === 0,
    `Unexpected media under public/media: ${unexpectedMedia.join(", ")}`,
  );
  return unexpectedMedia;
};

const assertNoReferenceMedia = async (publicDirectory) => {
  const publicFiles = await listFiles(publicDirectory);

  for (const filePath of publicFiles) {
    const bytes = await readFile(filePath);
    assert(
      !AUTHORITATIVE_REFERENCE_SHA256.has(sha256(bytes)),
      "Reference screen cannot be a production asset",
    );
  }

  return publicFiles.length;
};

const assertNoReferenceText = async (repoRoot, allowedReferenceHashes = new Set()) => {
  const productionDirectories = ["app", "src", "public"].map((directory) =>
    resolve(repoRoot, directory),
  );
  const files = (
    await Promise.all(productionDirectories.map((directory) => listFiles(directory)))
  ).flat();
  const textFiles = files.filter((filePath) =>
    TEXT_FILE_EXTENSIONS.has(extname(filePath).toLowerCase()),
  );

  for (const filePath of textFiles) {
    const contents = await readFile(filePath, "utf8");
    const displayPath = normalizedPath(relative(repoRoot, filePath));
    if (/tests[\\/]visual[\\/]baselines/i.test(contents)) {
      throw new Error(
        `Production source contains a reference fixture path: ${displayPath}`,
      );
    }

    let upperCaseContents = contents.toUpperCase();
    if (displayPath === "src/media/registry.mjs") {
      for (const hash of allowedReferenceHashes) {
        upperCaseContents = upperCaseContents.replace(
          new RegExp(
            `PARENTREFERENCESHA256\\s*:\\s*["']${hash}["']`,
            "g",
          ),
          "",
        );
      }
    }
    if (
      [...AUTHORITATIVE_REFERENCE_SHA256].some((hash) =>
        upperCaseContents.includes(hash),
      )
    ) {
      throw new Error(
        `Production source contains an authoritative reference SHA-256: ${displayPath}`,
      );
    }
  }

  return textFiles.length;
};

/**
 * @param {{
 *   log?: (line: string) => void;
 *   manifest?: unknown;
 *   repoRoot?: string;
 * }} [options]
 */
export const auditAssets = async ({
  log = console.log,
  manifest = mediaManifest,
  repoRoot = process.cwd(),
} = {}) => {
  const validatedManifest = validateMediaManifestRuntime(manifest);

  const resolvedRepoRoot = resolve(repoRoot);
  const publicDirectory = resolve(resolvedRepoRoot, "public");
  assertNoReferenceSizedMaskedComposites(validatedManifest);
  for (const asset of validatedManifest) {
    assert(
      !AUTHORITATIVE_REFERENCE_SHA256.has(asset.sha256),
      "Reference screen cannot be a production asset",
    );
    await assertMediaBytes(asset, publicDirectory);
  }
  const referenceDerivedPngsChecked =
    await assertReferenceDerivedPngTransparentRgb(
      validatedManifest,
      publicDirectory,
    );

  const unexpectedMedia = await assertNoUnexpectedMedia(
    validatedManifest,
    publicDirectory,
  );
  const publicFilesHashed = await assertNoReferenceMedia(publicDirectory);
  const allowedReferenceHashes = new Set(
    validatedManifest
      .filter((asset) => asset.provenance.classification === "reference-derived")
      .map((asset) => asset.provenance.parentReferenceSha256),
  );
  const scannedTextFiles = await assertNoReferenceText(
    resolvedRepoRoot,
    allowedReferenceHashes,
  );
  const result = {
    assetsChecked: validatedManifest.length,
    publicFilesHashed,
    referenceDerivedPngsChecked,
    scannedTextFiles,
    unexpectedMedia,
  };
  log(
    `[asset audit] ${result.assetsChecked} registered asset(s), ${result.referenceDerivedPngsChecked} reference-derived PNG(s) with clean transparent RGB, ${result.scannedTextFiles} production text file(s), no unexpected media.`,
  );
  return result;
};

const isCliInvocation =
  process.argv[1] &&
  resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));

if (isCliInvocation) {
  auditAssets().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
