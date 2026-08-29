import { readFile } from "node:fs/promises";

import { describe, expect, test } from "vitest";

import { mediaManifest } from "../../src/media/manifest";

const heroReferenceSha256 =
  "21380897A08D9C2375C1755DEDEB0E7F4BBFA62271979EE05C0A33D79F0DB559";

describe("bounded hero plaque reference layer", () => {
  test("registers the desktop cathedral decoration as a bounded reference crop", () => {
    const cathedral = mediaManifest.find(
      (asset) => asset.id === "hero-reference-cathedral-strip",
    );

    expect(cathedral).toMatchObject({
      path: "/media/reference-derived/hero-reference-cathedral-strip.png",
      dimensions: { width: 108, height: 541 },
      intendedScenes: ["hero"],
      productionAllowance: {
        allowed: true,
        intendedUse: "hero cathedral decorative crop only",
        referenceShape: "bounded-reference-region",
      },
      provenance: {
        classification: "reference-derived",
        documentary: false,
        parentReferenceSha256: heroReferenceSha256,
      },
    });
    expect(cathedral?.provenance).toMatchObject({
      transformation: expect.stringContaining("x=0,y=400,w=108,h=541"),
    });
  });

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

  test("keeps the cathedral crop on the desktop hero decoration only", async () => {
    const [css, globalCss] = await Promise.all([
      readFile("src/components/hero/HeroSection.module.css", "utf8"),
      readFile("app/globals.css", "utf8"),
    ]);

    expect(css).toMatch(
      /@media\s*\(min-width:\s*721px\)[\s\S]*?hero-cathedral[\s\S]*?background-image:\s*var\(--hero-cathedral-reference\)/i,
    );
    expect(css).toMatch(
      /@media\s*\(min-width:\s*721px\)[\s\S]*?hero-cathedral[\s\S]*?bottom:\s*0[\s\S]*?left:\s*0[\s\S]*?width:\s*clamp\(108px,\s*6\.46vw,\s*128px\)[\s\S]*?height:\s*calc\(clamp\(108px,\s*6\.46vw,\s*128px\)\s*\*\s*5\.009259\)/i,
    );
    expect(globalCss).toMatch(
      /\.hero-photo__brand-window,\s*\.hero-cathedral,\s*\.hero-curves,\s*\.hero-motto,\s*\.hero-heading-ornament\s*\{[\s\S]*?display:\s*none/i,
    );
  });

  test("keeps the decorative live plaque in the DOM while applying the crop on desktop only", async () => {
    const css = await readFile(
      "src/components/hero/HeroSection.module.css",
      "utf8",
    );

    expect(css).toMatch(
      /@media\s*\(min-width:\s*721px\)[\s\S]*?hero-photo__brand-window\)?\s*\{[\s\S]*?background-image:\s*var\(--hero-plaque-reference\)/i,
    );
    expect(css).toMatch(
      /@media\s*\(min-width:\s*721px\)[\s\S]*?hero-photo__brand-window\)?\s*\{[\s\S]*?top:\s*3\.11%;[\s\S]*?left:\s*72\.44%;[\s\S]*?width:\s*14\.47%;[\s\S]*?height:\s*45\.33%;/i,
    );
    expect(css).toMatch(
      /@media\s*\(min-width:\s*721px\)[\s\S]*?hero-photo__brand-window\)?\s*>\s*\*\s*\{[\s\S]*?visibility:\s*hidden;/i,
    );
  });
});
