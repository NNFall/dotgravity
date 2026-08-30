import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { PNG } from "pngjs";
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

describe("gallery bounded paper-only reference texture", () => {
  test("stores zero RGB for every fully transparent pixel", () => {
    const imagePath = resolve(
      process.cwd(),
      "public/media/reference-derived/gallery-reference-paper-texture.png",
    );
    const image = PNG.sync.read(readFileSync(imagePath));
    let transparentPixelCount = 0;
    let hiddenRgbPixelCount = 0;

    for (let offset = 0; offset < image.data.length; offset += 4) {
      if (image.data[offset + 3] !== 0) {
        continue;
      }

      transparentPixelCount += 1;
      if (
        image.data[offset] !== 0 ||
        image.data[offset + 1] !== 0 ||
        image.data[offset + 2] !== 0
      ) {
        hiddenRgbPixelCount += 1;
      }
    }

    expect(transparentPixelCount).toBeGreaterThan(0);
    expect(hiddenRgbPixelCount).toBe(0);
  });

  test("registers a transparent, non-documentary paper ROI", () => {
    const texture = mediaManifest.find(
      (asset) => asset.id === "gallery-reference-paper-texture",
    );

    expect(texture).toMatchObject({
      id: "gallery-reference-paper-texture",
      path: "/media/reference-derived/gallery-reference-paper-texture.png",
      dimensions: { width: 625, height: 941 },
      intendedScenes: ["gallery"],
      provenance: {
        classification: "reference-derived",
        documentary: false,
      },
      productionAllowance: {
        allowed: true,
        referenceShape: "bounded-reference-region",
      },
    });
    expect(texture?.provenance.classification).toBe("reference-derived");
    if (texture?.provenance.classification === "reference-derived") {
      expect(texture.provenance.transformation).toMatch(
        /paper-only.*x=0.*y=0.*w=625.*h=941.*alpha/i,
      );
    }

    const path = resolve(
      process.cwd(),
      "public/media/reference-derived/gallery-reference-paper-texture.png",
    );
    const image = PNG.sync.read(readFileSync(path));
    const alphaValues = new Set<number>();
    for (let index = 3; index < image.data.length; index += 4) {
      alphaValues.add(image.data[index]);
    }
    expect(alphaValues.has(0)).toBe(true);
    expect(alphaValues.has(255)).toBe(true);
  });

  test("renders the paper texture as a desktop-only decorative layer", () => {
    expect(gallerySource).toMatch(
      /<picture\s+className=\{styles\.galleryPaperTexturePicture\}>[\s\S]*?<source[\s\S]*?media="\(min-width: 1221px\)"[\s\S]*?srcSet=\{galleryPaperTextureArtwork\.path\}[\s\S]*?<img/,
    );
    expect(gallerySource).toMatch(
      /data-gallery-decoration="paper-texture"[\s\S]*?data-provenance=[\s\S]*?src=\{transparentPixelDataUri\}/,
    );
    expect(gallerySource).toMatch(
      /className=\{styles\.galleryPaperTexture\}/,
    );
    expect(galleryStyles).toMatch(
      /\.galleryPaperTexture\s*\{[\s\S]*?position:\s*absolute[\s\S]*?top:\s*0[\s\S]*?left:\s*0[\s\S]*?display:\s*none[\s\S]*?width:\s*625px[\s\S]*?height:\s*941px[\s\S]*?object-fit:\s*fill[\s\S]*?pointer-events:\s*none/,
    );
    expect(galleryStyles).toMatch(
      /@media\s*\(min-width:\s*1221px\)[\s\S]*?\.galleryPaperTexture\s*\{[\s\S]*?display:\s*block/,
    );
  });
});
