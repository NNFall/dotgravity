/** @typedef {import("./types").MediaManifest} MediaManifest */

const SHA256_PATTERN = /^[A-F0-9]{64}$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const SCENE_IDS = new Set([
  "hero",
  "about",
  "menu",
  "gallery",
  "souvenirs",
  "contacts",
]);
const PRODUCTION_REFERENCE_SHAPES = new Set([
  "not-reference",
  "bounded-reference-region",
  "full-reference",
  "reference-composite",
]);
const REFERENCE_SCREEN_SHAPES = new Set([
  "full-reference",
  "reference-composite",
]);

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const isRecord = (value) =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const assertRecord = (value, field) => {
  assert(isRecord(value), `${field} must be an object`);
};

const assertNonEmptyString = (value, field) => {
  assert(
    typeof value === "string" && value.trim().length > 0,
    `${field} is required`,
  );
};

const assertIsoDate = (value, field) => {
  assert(
    typeof value === "string" && ISO_DATE_PATTERN.test(value),
    `${field} must be YYYY-MM-DD`,
  );
};

const assertSha256 = (value, field) => {
  assert(
    typeof value === "string" && SHA256_PATTERN.test(value),
    `${field} must be an uppercase SHA-256`,
  );
};

const assertAbsoluteHttpUrl = (value, field) => {
  assertNonEmptyString(value, field);
  try {
    const url = new URL(value);
    assert(
      url.protocol === "https:" || url.protocol === "http:",
      `${field} must be an absolute HTTP(S) URL`,
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes(field)) {
      throw error;
    }
    throw new Error(`${field} must be an absolute HTTP(S) URL`);
  }
};

const assertGeneratedDerivation = (derivation) => {
  assertRecord(derivation, "provenance.derivation");
  assertNonEmptyString(
    derivation.parentAssetId,
    "provenance.derivation.parentAssetId",
  );
  assertSha256(
    derivation.parentSha256,
    "provenance.derivation.parentSha256",
  );
  assert(
    derivation.method === "Remove Background Local",
    "provenance.derivation.method must be Remove Background Local",
  );
  assert(
    derivation.aggressiveness === "0.30",
    "provenance.derivation.aggressiveness must be 0.30",
  );
  assert(
    derivation.checkerPreviewReviewed === true,
    "provenance.derivation.checkerPreviewReviewed must be true",
  );
};

export const isLocalPublicMediaPath = (path) =>
  typeof path === "string" &&
  /^\/media\/[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(path) &&
  !path.includes("..") &&
  !path.includes("\\");

const assertProvenance = (provenance) => {
  assertRecord(provenance, "provenance");
  assertNonEmptyString(provenance.classification, "provenance.classification");
  assert(
    typeof provenance.documentary === "boolean",
    "provenance.documentary must be boolean",
  );
  assertNonEmptyString(provenance.statement, "provenance.statement");

  switch (provenance.classification) {
    case "documentary":
      assert(
        provenance.documentary === true,
        "documentary provenance must be documentary",
      );
      assertAbsoluteHttpUrl(provenance.sourceUrl, "provenance.sourceUrl");
      assertIsoDate(provenance.accessedAt, "provenance.accessedAt");
      assert(
        provenance.rightsStatus === "confirmed" ||
          provenance.rightsStatus === "unconfirmed",
        "provenance.rightsStatus is invalid",
      );
      return;
    case "documentary-derived":
      assert(
        provenance.documentary === true,
        "documentary-derived provenance must remain documentary",
      );
      assertNonEmptyString(provenance.parentAssetId, "provenance.parentAssetId");
      assertSha256(provenance.parentSha256, "provenance.parentSha256");
      assertNonEmptyString(
        provenance.derivationMethod,
        "provenance.derivationMethod",
      );
      return;
    case "reference-derived":
      assert(
        provenance.documentary === false,
        "reference-derived provenance must be non-documentary",
      );
      assertSha256(
        provenance.parentReferenceSha256,
        "provenance.parentReferenceSha256",
      );
      assertNonEmptyString(
        provenance.transformation,
        "provenance.transformation",
      );
      return;
    case "generated/reference-compatible":
      assert(
        provenance.documentary === false,
        "generated provenance must be non-documentary",
      );
      assertIsoDate(provenance.createdAt, "provenance.createdAt");
      assert(
        provenance.createdWith === "Image Generation",
        "provenance.createdWith must be Image Generation",
      );
      assertNonEmptyString(provenance.promptSummary, "provenance.promptSummary");
      if (provenance.derivation !== undefined) {
        assertGeneratedDerivation(provenance.derivation);
      }
      return;
    case "decorative":
      assert(
        provenance.documentary === false,
        "decorative provenance must be non-documentary",
      );
      assertNonEmptyString(
        provenance.creationMethod,
        "provenance.creationMethod",
      );
      return;
    default:
      throw new Error(
        `Unsupported provenance classification: ${String(provenance.classification)}`,
      );
  }
};

const assertAsset = (asset) => {
  assertRecord(asset, "asset");
  assertNonEmptyString(asset.id, "asset.id");
  assert(
    isLocalPublicMediaPath(asset.path),
    "Media path must be a local /media/ public path",
  );
  assertSha256(asset.sha256, "asset.sha256");

  assertRecord(asset.dimensions, "dimensions");
  assert(
    Number.isInteger(asset.dimensions.width) && asset.dimensions.width > 0,
    "dimensions.width must be a positive integer",
  );
  assert(
    Number.isInteger(asset.dimensions.height) && asset.dimensions.height > 0,
    "dimensions.height must be a positive integer",
  );

  assert(
    Array.isArray(asset.intendedScenes) && asset.intendedScenes.length > 0,
    "intendedScenes must contain at least one scene",
  );
  assert(
    new Set(asset.intendedScenes).size === asset.intendedScenes.length,
    `Duplicate intended scene on asset: ${asset.id}`,
  );
  for (const scene of asset.intendedScenes) {
    assert(SCENE_IDS.has(scene), `Unknown intended scene: ${String(scene)}`);
  }

  assertRecord(asset.productionAllowance, "productionAllowance");
  assert(
    typeof asset.productionAllowance.allowed === "boolean",
    "productionAllowance.allowed must be boolean",
  );
  assertNonEmptyString(
    asset.productionAllowance.intendedUse,
    "productionAllowance.intendedUse",
  );
  assert(
    PRODUCTION_REFERENCE_SHAPES.has(asset.productionAllowance.referenceShape),
    "productionAllowance.referenceShape is invalid",
  );
  assert(
    !REFERENCE_SCREEN_SHAPES.has(asset.productionAllowance.referenceShape),
    "Reference screen cannot be a production asset",
  );

  assertRecord(asset.cropRules, "cropRules");
  assertNonEmptyString(asset.cropRules.strategy, "cropRules.strategy");
  assertNonEmptyString(asset.cropRules.focalPoint, "cropRules.focalPoint");
  assertNonEmptyString(asset.cropRules.responsive, "cropRules.responsive");
  assertProvenance(asset.provenance);
};

/**
 * @param {unknown} manifest
 * @returns {MediaManifest}
 */
export const validateMediaManifestRuntime = (manifest) => {
  assert(Array.isArray(manifest), "Media manifest must be an array");
  assert(
    manifest.length > 0,
    "Media manifest must contain at least one asset",
  );

  const ids = new Set();
  const paths = new Set();
  const assetsById = new Map();
  for (const asset of manifest) {
    assertAsset(asset);
    assert(!ids.has(asset.id), `Duplicate media asset id: ${asset.id}`);
    assert(!paths.has(asset.path), `Duplicate media asset path: ${asset.path}`);
    ids.add(asset.id);
    paths.add(asset.path);
    assetsById.set(asset.id, asset);
  }

  for (const asset of manifest) {
    const provenance = asset.provenance;
    if (
      provenance.classification !== "generated/reference-compatible" ||
      provenance.derivation === undefined
    ) {
      continue;
    }

    const parentAsset = assetsById.get(provenance.derivation.parentAssetId);
    assert(
      parentAsset !== undefined,
      `Generated derivation parent asset is missing: ${provenance.derivation.parentAssetId}`,
    );
    assert(
      parentAsset.id !== asset.id,
      "Generated derivation cannot use itself as a parent asset",
    );
    assert(
      parentAsset.sha256 === provenance.derivation.parentSha256,
      `Generated derivation parent SHA-256 does not match: ${asset.id}`,
    );
    assert(
      parentAsset.productionAllowance.allowed === false,
      `Generated derivation parent must be source-only: ${parentAsset.id}`,
    );
  }

  return /** @type {MediaManifest} */ (manifest);
};
