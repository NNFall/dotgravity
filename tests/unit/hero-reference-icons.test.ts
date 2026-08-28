import { readFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { PNG } from "pngjs";
import { describe, expect, test } from "vitest";

import { mediaManifest } from "../../src/media/manifest";

const heroReferenceSha256 =
  "21380897A08D9C2375C1755DEDEB0E7F4BBFA62271979EE05C0A33D79F0DB559";

const referenceIcons = [
  {
    id: "hero-reference-feature-coffee",
    file: "hero-reference-feature-coffee.png",
    crop: "x=147,y=716,w=62,h=62",
  },
  {
    id: "hero-reference-feature-art",
    file: "hero-reference-feature-art.png",
    crop: "x=284,y=720,w=62,h=62",
  },
  {
    id: "hero-reference-feature-gift",
    file: "hero-reference-feature-gift.png",
    crop: "x=422,y=720,w=62,h=62",
  },
  {
    id: "hero-reference-feature-cathedral",
    file: "hero-reference-feature-cathedral.png",
    crop: "x=559,y=716,w=62,h=62",
  },
] as const;

describe("bounded hero reference feature icons", () => {
  test("registers four transparent, non-documentary desktop icon crops", () => {
    for (const icon of referenceIcons) {
      const asset = mediaManifest.find((candidate) => candidate.id === icon.id);

      expect(asset).toMatchObject({
        path: `/media/reference-derived/${icon.file}`,
        dimensions: { width: 62, height: 62 },
        intendedScenes: ["hero"],
        productionAllowance: {
          allowed: true,
          referenceShape: "bounded-reference-region",
        },
        provenance: {
          classification: "reference-derived",
          documentary: false,
          parentReferenceSha256: heroReferenceSha256,
        },
      });
      expect(asset?.provenance).toMatchObject({
        transformation: expect.stringContaining(icon.crop),
      });
    }
  });

  test("keeps every icon asset bounded to a 62px transparent crop, not a reference screen", () => {
    for (const icon of referenceIcons) {
      const assetPath = resolve(
        process.cwd(),
        "public/media/reference-derived",
        icon.file,
      );
      const image = PNG.sync.read(readFileSync(assetPath));

      expect(image.width).toBe(62);
      expect(image.height).toBe(62);
      expect([...image.data].some((_, index) => index % 4 === 3 && image.data[index] === 0)).toBe(
        true,
      );
    }
  });

  test("renders the live icon fallback with a desktop-only reference layer", async () => {
    const [source, css] = await Promise.all([
      readFile("src/components/hero/HeroSection.tsx", "utf8"),
      readFile("src/components/hero/HeroSection.module.css", "utf8"),
    ]);

    expect(source).toContain("hero-reference-icon");
    expect(source).toContain("data-reference-crop=\"hero-feature\"");
    expect(source).toContain("<PhosphorIcon");
    expect(css).toMatch(
      /@media\s*\(min-width:\s*721px\)[\s\S]*?hero-reference-icon[\s\S]*?display:\s*block/i,
    );
    expect(css).toMatch(
      /@media\s*\(max-width:\s*720px\)[\s\S]*?hero-reference-icon[\s\S]*?display:\s*none/i,
    );
    expect(source).not.toMatch(/tests[\\/]visual[\\/]baselines|(?:^|[\\/])hero\.png/i);
  });
});
