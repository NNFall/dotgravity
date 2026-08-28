import { readFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { render } from "@testing-library/react";
import { PNG } from "pngjs";
import { describe, expect, test } from "vitest";

import { HeroSection } from "../../src/components/hero/HeroSection";
import { mediaManifest } from "../../src/media/manifest";

const heroReferenceSha256 =
  "21380897A08D9C2375C1755DEDEB0E7F4BBFA62271979EE05C0A33D79F0DB559";
const assetId = "hero-reference-heading-flower";
const assetFile = "hero-reference-heading-flower.png";

describe("bounded hero heading flower reference crop", () => {
  test("registers the measured flower crop with immutable non-documentary provenance", () => {
    const asset = mediaManifest.find((candidate) => candidate.id === assetId);

    expect(asset).toMatchObject({
      id: assetId,
      path: `/media/reference-derived/${assetFile}`,
      dimensions: { width: 45, height: 45 },
      intendedScenes: ["hero"],
      productionAllowance: {
        allowed: true,
        intendedUse: "desktop hero heading flower ornament only",
        referenceShape: "bounded-reference-region",
      },
      provenance: {
        classification: "reference-derived",
        documentary: false,
        parentReferenceSha256: heroReferenceSha256,
      },
    });
    expect(asset?.provenance).toMatchObject({
      transformation: expect.stringContaining("x=468,y=236,w=45,h=45"),
    });
    expect(asset?.provenance).toMatchObject({
      transformation: expect.stringMatching(/deterministic.*alpha/i),
    });
  });

  test("keeps the crop intrinsically bounded and transparent around the flower", () => {
    const imagePath = resolve(
      process.cwd(),
      "public/media/reference-derived",
      assetFile,
    );
    const image = PNG.sync.read(readFileSync(imagePath));
    const alpha = Array.from({ length: image.width * image.height }, (_, index) =>
      image.data[index * 4 + 3],
    );

    expect({ width: image.width, height: image.height }).toEqual({
      width: 45,
      height: 45,
    });
    expect(alpha.some((value) => value === 0)).toBe(true);
    expect(alpha.some((value) => value === 255)).toBe(true);
    expect(alpha.some((value) => value > 0)).toBe(true);
    expect(image.width).toBeLessThan(1672);
    expect(image.height).toBeLessThan(941);
  });

  test("renders the bounded crop beside the live SVG fallback", () => {
    const { container } = render(<HeroSection />);
    const crop = container.querySelector<HTMLImageElement>(
      '[data-reference-crop="heading-flower"]',
    );

    expect(crop).toHaveAttribute(
      "src",
      "/media/reference-derived/hero-reference-heading-flower.png",
    );
    expect(crop).toHaveAttribute("aria-hidden", "true");
    expect(crop).toHaveAttribute("data-provenance", "reference-derived");
    expect(container.querySelector(".hero-heading-ornament svg")).not.toBeNull();
  });

  test("switches only the flower visual at wide desktop while retaining the mobile fallback", async () => {
    const [source, css] = await Promise.all([
      readFile(
        resolve(process.cwd(), "src/components/hero/HeroSection.tsx"),
        "utf8",
      ),
      readFile(
        resolve(process.cwd(), "src/components/hero/HeroSection.module.css"),
        "utf8",
      ),
    ]);

    expect(source).toContain("hero-reference-heading-flower");
    expect(source).toContain('data-reference-crop="heading-flower"');
    expect(source).toContain("<BrandMark />");
    expect(css).toMatch(
      /@media\s*\(min-width:\s*1181px\)[\s\S]*?hero-heading-ornament__reference[\s\S]*?display:\s*block/i,
    );
    expect(css).toMatch(
      /@media\s*\(min-width:\s*1181px\)[\s\S]*?hero-heading-ornament\)\s*>\s*svg[\s\S]*?visibility:\s*hidden/i,
    );
    expect(css).toMatch(
      /@media\s*\(max-width:\s*1180px\)[\s\S]*?hero-heading-ornament__reference[\s\S]*?display:\s*none/i,
    );
  });
});
