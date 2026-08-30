import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { PNG } from "pngjs";
import { afterEach, describe, expect, test } from "vitest";

import { auditAssets } from "../../scripts/audit-assets.mjs";
import {
  mediaManifest,
  validateMediaManifest,
} from "../../src/media/manifest";

const authoritativeReferenceSha256 = [
  "21380897A08D9C2375C1755DEDEB0E7F4BBFA62271979EE05C0A33D79F0DB559",
  "5569EA6A855915480D98A9760A91F9D9D914D53410DCA1FF2EC99143B74A4DC9",
  "DCB62718375D93C4B61D6A0764859575885A0331A940C560DF664D90AFAC0924",
  "8FF8EC7190A48985D57F7BF05590A392049BFBBC5E4C36BBE4C2EA164B85EFB5",
  "1D154C8FBF7EDD02616B0AE624AB79F803BED47305863F758E93BBF061D6DAE0",
  "DC6958CC6FB22CB2892C5D4708B907468EE52A01251A6378F2E3E001B2E88457",
];

interface MutableMediaAsset {
  cropRules: Record<string, unknown>;
  dimensions: { height: number; width: number };
  id: string;
  intendedScenes: string[];
  path: string;
  productionAllowance: Record<string, unknown>;
  provenance: Record<string, unknown>;
  sha256: string;
}

const temporaryRoots: string[] = [];

const createAuditFixture = () => {
  const repoRoot = mkdtempSync(join(tmpdir(), "dotgravity-media-"));
  temporaryRoots.push(repoRoot);
  const generatedDirectory = join(repoRoot, "public", "media", "generated");

  mkdirSync(generatedDirectory, { recursive: true });
  for (const asset of mediaManifest) {
    const relativeMediaPath = asset.path.replace(/^\//, "");
    const destination = join(repoRoot, "public", relativeMediaPath);

    mkdirSync(dirname(destination), { recursive: true });
    copyFileSync(
      join(process.cwd(), "public", relativeMediaPath),
      destination,
    );
  }

  return { generatedDirectory, repoRoot };
};

const cloneMediaManifest = (): MutableMediaAsset[] =>
  JSON.parse(JSON.stringify(mediaManifest)) as MutableMediaAsset[];

afterEach(() => {
  for (const root of temporaryRoots.splice(0)) {
    rmSync(root, { force: true, recursive: true });
  }
});

describe("media provenance registry", () => {
  test("registers the generated hero for bounded hero and contacts photo regions", () => {
    expect(() => validateMediaManifest(mediaManifest)).not.toThrow();

    const hero = mediaManifest.find(
      (asset) => asset.id === "hero-window-church",
    );

    expect(hero).toMatchObject({
      id: "hero-window-church",
      path: "/media/generated/hero-window-church.png",
      sha256:
        "7598C48D9E51326F743A8D8E20C2190A4FAEC6454EAABE181EA1262DC2FB0861",
      dimensions: { width: 1672, height: 941 },
      intendedScenes: ["hero", "contacts"],
      productionAllowance: {
        allowed: true,
        intendedUse: "hero or contacts photo region only",
        referenceShape: "not-reference",
      },
      cropRules: {
        strategy: "cover bounded hero or contacts photo region",
      },
      provenance: {
        classification: "generated/reference-compatible",
        documentary: false,
        createdAt: "2026-08-25",
        createdWith: "Image Generation",
      },
    });
  });

  test("uses a local public-media path rather than a reference fixture", () => {
    const hero = mediaManifest[0];

    expect(hero.path).toMatch(/^\/media\/generated\/[a-z0-9-]+\.png$/);
    expect(hero.path).not.toContain("..");
    expect(hero.path).not.toMatch(/tests[\\/]visual[\\/]baselines/i);
  });

  test("uses honest wording for the generated hero rather than claiming venue evidence", () => {
    const hero = mediaManifest[0];

    expect(hero.provenance.documentary).toBe(false);
    if (hero.provenance.classification !== "generated/reference-compatible") {
      throw new Error("The hero must retain generated/reference-compatible provenance.");
    }
    expect(hero.provenance.promptSummary).toMatch(/window|church/i);
    expect(hero.provenance.statement).toMatch(
      /not a documentary venue photograph/i,
    );
    expect(hero.provenance.statement).not.toMatch(
      /is a documentary venue photograph/i,
    );
  });

  test("keeps nonproduction target baselines out of the registry", () => {
    const serializedRegistry = JSON.stringify(mediaManifest).toUpperCase();

    expect(serializedRegistry).not.toMatch(/TESTS[\\/]VISUAL[\\/]BASELINES/);
    const registeredReferenceHashes = mediaManifest
      .flatMap((asset) =>
        asset.provenance.classification === "reference-derived"
          ? [asset.provenance.parentReferenceSha256]
          : [],
      );
    for (const referenceSha256 of authoritativeReferenceSha256) {
      if (registeredReferenceHashes.includes(referenceSha256)) {
        expect(serializedRegistry).toMatch(
          new RegExp(`PARENTREFERENCESHA256[\\s\\S]{0,80}${referenceSha256}`),
        );
      } else {
        expect(serializedRegistry).not.toContain(referenceSha256);
      }
    }
  });

  test.each([
    [
      "an unknown provenance classification",
      (asset: MutableMediaAsset) => {
        asset.provenance.classification = "unknown";
      },
      /classification/i,
    ],
    [
      "a generated record without a prompt summary",
      (asset: MutableMediaAsset) => {
        delete asset.provenance.promptSummary;
      },
      /promptSummary/i,
    ],
    [
      "a reference-derived record without its parent reference hash",
      (asset: MutableMediaAsset) => {
        asset.provenance = {
          classification: "reference-derived",
          documentary: false,
          statement: "Bounded reference-derived crop.",
          transformation: "bounded crop",
        };
      },
      /parentReferenceSha256/i,
    ],
    [
      "a documentary record without a source URL",
      (asset: MutableMediaAsset) => {
        asset.provenance = {
          accessedAt: "2026-08-25",
          classification: "documentary",
          documentary: true,
          rightsStatus: "unconfirmed",
          statement: "Direct documentary source.",
        };
      },
      /sourceUrl/i,
    ],
  ])(
    "rejects %s at runtime",
    (_label, mutate, expectedError) => {
      const invalidManifest = cloneMediaManifest();
      mutate(invalidManifest[0]);

      expect(() =>
        validateMediaManifest(invalidManifest as unknown as typeof mediaManifest),
      ).toThrow(expectedError);
    },
  );

  test.each([
    ["duplicate IDs", (manifest: MutableMediaAsset[]) => { manifest.push({ ...manifest[0] }); }, /Duplicate media asset id/i],
    [
      "duplicate paths",
      (manifest: MutableMediaAsset[]) => {
        manifest.push({ ...manifest[0], id: "a-second-id" });
      },
      /Duplicate media asset path/i,
    ],
    [
      "a non-boolean documentary flag",
      (manifest: MutableMediaAsset[]) => {
        manifest[0].provenance.documentary = "false";
      },
      /documentary must be boolean/i,
    ],
  ])("rejects %s at runtime", (_label, mutate, expectedError) => {
    const invalidManifest = cloneMediaManifest();
    mutate(invalidManifest);

    expect(() =>
      validateMediaManifest(invalidManifest as unknown as typeof mediaManifest),
    ).toThrow(expectedError);
  });

  test("audits registered media bytes even when future app directories are absent", async () => {
    const { repoRoot } = createAuditFixture();

    await expect(
      auditAssets({ log: () => undefined, repoRoot }),
    ).resolves.toMatchObject({
      assetsChecked: mediaManifest.length,
      unexpectedMedia: [],
    });
  });

  test("rejects an unregistered file placed under public media", async () => {
    const { generatedDirectory, repoRoot } = createAuditFixture();
    writeFileSync(join(generatedDirectory, "unexpected.png"), "not an image");

    await expect(
      auditAssets({ log: () => undefined, repoRoot }),
    ).rejects.toThrow(/unexpected media/i);
  });

  test.each(["reference.png", "reference.asset"])(
    "rejects a target reference copied anywhere in public production assets as %s",
    async (fileName) => {
    const { repoRoot } = createAuditFixture();
    copyFileSync(
      join(
        process.cwd(),
        "tests",
        "visual",
        "baselines",
        "1672x941",
        "hero.png",
      ),
      join(repoRoot, "public", fileName),
    );
    const sourceDirectory = join(repoRoot, "src");
    mkdirSync(sourceDirectory, { recursive: true });
    writeFileSync(
      join(sourceDirectory, "unsafe.ts"),
      `export const source = '/${fileName}';`,
    );

    await expect(
      auditAssets({ log: () => undefined, repoRoot }),
    ).rejects.toThrow("Reference screen cannot be a production asset");
    },
  );

  test.each([
    [
      "a baseline fixture path",
      "const fixture = 'tests/visual/baselines/1672x941/hero.png';",
    ],
    ["an authoritative reference hash", `const hash = '${authoritativeReferenceSha256[0]}';`],
  ])("rejects production text containing %s", async (_label, source) => {
    const { repoRoot } = createAuditFixture();
    const sourceDirectory = join(repoRoot, "src");
    mkdirSync(sourceDirectory, { recursive: true });
    writeFileSync(join(sourceDirectory, "unsafe.ts"), source);

    await expect(
      auditAssets({ log: () => undefined, repoRoot }),
    ).rejects.toThrow(/reference fixture path|reference SHA-256/i);
  });

  test("rejects an asset marked as a full reference screen", async () => {
    const { repoRoot } = createAuditFixture();
    const fullReferenceManifest = cloneMediaManifest();
    fullReferenceManifest[0].productionAllowance.referenceShape =
      "full-reference";

    await expect(
      auditAssets({
        log: () => undefined,
        manifest: fullReferenceManifest,
        repoRoot,
      }),
    ).rejects.toThrow("Reference screen cannot be a production asset");
  });

  test("rejects an asset marked as a reference composite", async () => {
    const { repoRoot } = createAuditFixture();
    const compositeManifest = cloneMediaManifest();
    compositeManifest[0].productionAllowance.referenceShape =
      "reference-composite";

    await expect(
      auditAssets({
        log: () => undefined,
        manifest: compositeManifest,
        repoRoot,
      }),
    ).rejects.toThrow("Reference screen cannot be a production asset");
  });

  test("rejects a reference-derived asset with the full supplied reference canvas", async () => {
    const { repoRoot } = createAuditFixture();
    const fullCanvasManifest = cloneMediaManifest();
    const candidate = fullCanvasManifest.find(
      (asset) => asset.id === "about-reference-arch",
    );

    if (!candidate) {
      throw new Error("The bounded reference fixture is required.");
    }

    candidate.dimensions = { width: 1672, height: 941 };

    await expect(
      auditAssets({
        log: () => undefined,
        manifest: fullCanvasManifest,
        repoRoot,
      }),
    ).rejects.toThrow(/full 1672x941 reference canvas/i);
  });

  test.each([
    ["createdAt", (asset: MutableMediaAsset) => delete asset.provenance.createdAt],
    [
      "createdWith",
      (asset: MutableMediaAsset) => {
        asset.provenance.createdWith = "unknown generator";
      },
    ],
    [
      "promptSummary",
      (asset: MutableMediaAsset) => delete asset.provenance.promptSummary,
    ],
  ])("rejects incomplete generated provenance field %s in the CLI audit", async (_field, mutate) => {
    const { repoRoot } = createAuditFixture();
    const incompleteManifest = cloneMediaManifest();
    mutate(incompleteManifest[0]);

    await expect(
      auditAssets({
        log: () => undefined,
        manifest: incompleteManifest,
        repoRoot,
      }),
    ).rejects.toThrow(/createdAt|createdWith|promptSummary/i);
  });

  test.each([
    ["a missing registered file", (assetPath: string) => rmSync(assetPath), /missing/i],
    [
      "tampered registered bytes",
      (assetPath: string) => writeFileSync(assetPath, "tampered bytes"),
      /SHA-256 mismatch/i,
    ],
  ])("rejects %s", async (_label, mutateFile, expectedError) => {
    const { generatedDirectory, repoRoot } = createAuditFixture();
    mutateFile(join(generatedDirectory, "hero-window-church.png"));

    await expect(
      auditAssets({ log: () => undefined, repoRoot }),
    ).rejects.toThrow(expectedError);
  });

  test("rejects a registered asset with mismatched intrinsic dimensions", async () => {
    const { repoRoot } = createAuditFixture();
    const wrongDimensions = cloneMediaManifest();
    wrongDimensions[0].dimensions.width = 1;

    await expect(
      auditAssets({
        log: () => undefined,
        manifest: wrongDimensions,
        repoRoot,
      }),
    ).rejects.toThrow(/dimensions mismatch/i);
  });

  test("rejects a reference-derived PNG that hides nonzero RGB under alpha zero", async () => {
    const { repoRoot } = createAuditFixture();
    const tamperedManifest = cloneMediaManifest();
    const target = tamperedManifest.find(
      (asset) => asset.id === "menu-reference-flower-badge-cappuccino",
    );

    if (!target) {
      throw new Error("The bounded flower badge fixture is required.");
    }

    const relativeMediaPath = target.path.replace(/^\//, "");
    const assetPath = join(repoRoot, "public", relativeMediaPath);
    const image = PNG.sync.read(readFileSync(assetPath));
    let tamperedOffset = -1;
    for (let offset = 0; offset < image.data.length; offset += 4) {
      if (image.data[offset + 3] === 0) {
        tamperedOffset = offset;
        break;
      }
    }
    expect(tamperedOffset).toBeGreaterThanOrEqual(0);
    if (tamperedOffset < 0) {
      return;
    }

    image.data[tamperedOffset] = 1;
    const tamperedBytes = PNG.sync.write(image);
    writeFileSync(assetPath, tamperedBytes);
    target.sha256 = createHash("sha256")
      .update(tamperedBytes)
      .digest("hex")
      .toUpperCase();

    await expect(
      auditAssets({
        log: () => undefined,
        manifest: tamperedManifest,
        repoRoot,
      }),
    ).rejects.toThrow(/transparent RGB violation/i);
  });
});
