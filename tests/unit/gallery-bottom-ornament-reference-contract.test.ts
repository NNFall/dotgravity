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

describe("gallery bottom ornament reference crop", () => {
  test("registers the bounded non-documentary ornament crop", () => {
    expect(mediaManifest.find((asset) => asset.id === "gallery-reference-bottom-ornament")).toMatchObject({
      id: "gallery-reference-bottom-ornament",
      path: "/media/reference-derived/gallery-reference-bottom-ornament.png",
      dimensions: { width: 95, height: 95 },
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
  });

  test("renders the ornament as a decorative desktop-only gallery overlay", () => {
    expect(gallerySource).toMatch(
      /data-gallery-decoration="bottom-ornament"[\s\S]*?data-provenance=/,
    );
    expect(gallerySource).toMatch(/className=\{styles\.galleryBottomReference\}/);
    expect(galleryStyles).toMatch(
      /\.galleryBottomReference\s*\{[\s\S]*?position:\s*absolute[\s\S]*?top:\s*835px[\s\S]*?left:\s*625px[\s\S]*?display:\s*none[\s\S]*?width:\s*95px[\s\S]*?height:\s*95px[\s\S]*?pointer-events:\s*none/,
    );
    expect(galleryStyles).toMatch(
      /@media\s*\(min-width:\s*1221px\)[\s\S]*?\.galleryBottomReference\s*\{[\s\S]*?display:\s*block/,
    );
  });
});
