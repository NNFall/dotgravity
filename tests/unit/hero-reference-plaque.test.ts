import { readFile } from "node:fs/promises";

import { describe, expect, test } from "vitest";

import { mediaManifest } from "../../src/media/manifest";

const heroReferenceSha256 =
  "21380897A08D9C2375C1755DEDEB0E7F4BBFA62271979EE05C0A33D79F0DB559";

describe("bounded hero plaque reference layer", () => {
  test("registers the plaque ROI as a non-documentary desktop crop", () => {
    const plaque = mediaManifest.find(
      (asset) => asset.id === "hero-reference-plaque-strip",
    );

    expect(plaque).toMatchObject({
      path: "/media/reference-derived/hero-reference-plaque-strip.png",
      dimensions: { width: 137, height: 379 },
      intendedScenes: ["hero"],
      productionAllowance: {
        allowed: true,
        intendedUse: "hero reference plaque strip only",
        referenceShape: "bounded-reference-region",
      },
      provenance: {
        classification: "reference-derived",
        documentary: false,
        parentReferenceSha256: heroReferenceSha256,
      },
    });
    expect(plaque?.provenance).toMatchObject({
      transformation: expect.stringContaining("x=1411,y=131,w=137,h=379"),
    });
  });

  test("keeps the decorative live plaque in the DOM while applying the crop on desktop only", async () => {
    const css = await readFile(
      "src/components/hero/HeroSection.module.css",
      "utf8",
    );

    expect(css).toMatch(
      /@media\s*\(min-width:\s*721px\)[\s\S]*?hero-photo__brand-window\)?\s*\{[\s\S]*?background-image:\s*url\(["']?\/media\/reference-derived\/hero-reference-plaque-strip\.png/i,
    );
    expect(css).toMatch(
      /@media\s*\(min-width:\s*721px\)[\s\S]*?hero-photo__brand-window\)?\s*\{[\s\S]*?top:\s*3\.11%;[\s\S]*?left:\s*72\.44%;[\s\S]*?width:\s*14\.47%;[\s\S]*?height:\s*45\.33%;/i,
    );
    expect(css).toMatch(
      /@media\s*\(min-width:\s*721px\)[\s\S]*?hero-photo__brand-window\)?\s*>\s*\*\s*\{[\s\S]*?visibility:\s*hidden;/i,
    );
  });
});
