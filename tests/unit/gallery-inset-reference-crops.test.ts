import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

import { mediaManifest } from "../../src/media/manifest";

const gallerySource = readFileSync(
  resolve(process.cwd(), "src/components/scenes/GallerySection.tsx"),
  "utf8",
);
const galleryStyles = readFileSync(
  resolve(process.cwd(), "src/components/scenes/GallerySection.module.css"),
  "utf8",
);

const cropSpecs = [
  ["gallery-reference-inset-card-porcelain", 249, 237],
  ["gallery-reference-inset-card-art", 249, 222],
  ["gallery-reference-inset-card-space", 249, 226],
] as const;

describe("gallery desktop inset reference crops", () => {
  test("registers each full-surface desktop crop with bounded non-documentary provenance", () => {
    for (const [id, width, height] of cropSpecs) {
      const asset = mediaManifest.find((candidate) => candidate.id === id);

      expect(asset).toMatchObject({
        id,
        dimensions: { width, height },
        provenance: {
          classification: "reference-derived",
          documentary: false,
        },
        intendedScenes: ["gallery"],
        productionAllowance: { allowed: true },
      });
      expect(asset?.path).toMatch(
        new RegExp(`/media/reference-derived/${id}\\.png$`),
      );
      expect(asset?.provenance).toMatchObject({
        transformation: expect.stringMatching(
          new RegExp(`bounded.*w=${width}.*h=${height}`, "i"),
        ),
      });
    }
  });

  test("keeps full-surface crops desktop-only while preserving the live mobile image and caption", () => {
    expect(gallerySource).toMatch(/<picture[\s\S]*?desktopAsset/);
    expect(gallerySource).toMatch(/<source[\s\S]*?media=.*min-width:\s*901px/);
    expect(gallerySource).toMatch(/<figcaption>\{label\}<\/figcaption>/);
    expect(gallerySource).not.toMatch(/tests[\\/]visual[\\/]baselines/i);

    expect(galleryStyles).toMatch(
      /@media\s*\(min-width:\s*901px\)[\s\S]*?\.referencePicture\s*\{[\s\S]*?width:\s*100%\s*;[\s\S]*?height:\s*100%\s*;/,
    );
    expect(galleryStyles).toMatch(
      /@media\s*\(max-width:\s*900px\)[\s\S]*?\.referencePicture\s*\{[\s\S]*?display:\s*block\s*;/,
    );
    expect(galleryStyles).toMatch(
      /@media\s*\(min-width:\s*901px\)[\s\S]*?\.inset\s*\{[\s\S]*?padding:\s*0\s*;[\s\S]*?border:\s*0\s*;/,
    );
  });
});
