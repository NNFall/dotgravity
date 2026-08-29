import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { render } from "@testing-library/react";
import { PNG } from "pngjs";
import { describe, expect, test } from "vitest";

import { HeroSection } from "../../src/components/hero/HeroSection";
import { mediaManifest } from "../../src/media/manifest";

const heroReferenceSha256 =
  "21380897A08D9C2375C1755DEDEB0E7F4BBFA62271979EE05C0A33D79F0DB559";
const assetId = "hero-reference-heading-glyphs";
const assetFile = "hero-reference-heading-glyphs.png";

describe("bounded hero heading glyph reference crop", () => {
  test("registers the measured two-line glyph crop with immutable provenance", () => {
    const asset = mediaManifest.find((candidate) => candidate.id === assetId);

    expect(asset).toMatchObject({
      id: assetId,
      path: `/media/reference-derived/${assetFile}`,
      dimensions: { width: 626, height: 165 },
      intendedScenes: ["hero"],
      productionAllowance: {
        allowed: true,
        intendedUse: "wide-desktop hero heading glyphs only",
        referenceShape: "bounded-reference-region",
      },
      provenance: {
        classification: "reference-derived",
        documentary: false,
        parentReferenceSha256: heroReferenceSha256,
      },
    });
    expect(asset?.provenance).toMatchObject({
      transformation: expect.stringContaining("x=107,y=216,w=626,h=165"),
    });
    expect(asset?.provenance).toMatchObject({
      transformation: expect.stringMatching(/deterministic.*alpha/i),
    });
  });

  test("keeps paper transparent while retaining opaque antialiased glyph pixels", () => {
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
      width: 626,
      height: 165,
    });
    expect(alpha.some((value) => value === 0)).toBe(true);
    expect(alpha.some((value) => value === 255)).toBe(true);
    const opaqueRgb = Array.from(
      { length: image.width * image.height },
      (_, index) => {
        const offset = index * 4;
        return `${image.data[offset]},${image.data[offset + 1]},${image.data[offset + 2]}`;
      },
    ).filter((_, index) => alpha[index] === 255);
    expect(new Set(opaqueRgb).size).toBeGreaterThan(10);
    expect(image.width).toBeLessThan(1672);
    expect(image.height).toBeLessThan(941);
  });

  test("renders the reference glyph crop as an accessible decorative desktop overlay", () => {
    const { container } = render(<HeroSection />);
    const crop = container.querySelector<HTMLImageElement>(
      '[data-reference-crop="heading-glyphs"]',
    );

    expect(crop).toHaveAttribute(
      "src",
      "/media/reference-derived/hero-reference-heading-glyphs.png",
    );
    expect(crop).toHaveAttribute("aria-hidden", "true");
    expect(crop).toHaveAttribute("alt", "");
    expect(crop).toHaveAttribute("data-provenance", "reference-derived");
    expect(container.querySelector("#hero-title")).toHaveTextContent(
      "Точкапритяжения",
    );
  });

  test("shows the overlay and suppresses only live glyph paint at wide desktop", async () => {
    const css = readFileSync(
      resolve(process.cwd(), "src/components/hero/HeroSection.module.css"),
      "utf8",
    );

    expect(css).toMatch(
      /@media\s*\(min-width:\s*1181px\)[\s\S]*?hero-heading-glyphs[\s\S]*?display:\s*block/i,
    );
    expect(css).toMatch(
      /@media\s*\(min-width:\s*1181px\)[\s\S]*?hero-copy h1[\s\S]*?>\s*span[\s\S]*?color:\s*transparent/i,
    );
    expect(css).toMatch(
      /@media\s*\(max-width:\s*1180px\)[\s\S]*?hero-heading-glyphs[\s\S]*?display:\s*none/i,
    );
  });

  test("preserves the bounded crop aspect ratio as the desktop viewport scales", () => {
    const css = readFileSync(
      resolve(process.cwd(), "src/components/hero/HeroSection.module.css"),
      "utf8",
    );

    expect(css).toMatch(
      /hero-heading-glyphs-reference[\s\S]*?height:\s*auto;/i,
    );
    expect(css).toMatch(
      /hero-heading-glyphs-reference[\s\S]*?aspect-ratio:\s*626\s*\/\s*165;/i,
    );
  });
});
