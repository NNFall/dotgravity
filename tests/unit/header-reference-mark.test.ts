import { readFile } from "node:fs/promises";

import { describe, expect, test } from "vitest";

import { mediaManifest } from "../../src/media/manifest";

const heroReferenceSha256 =
  "21380897A08D9C2375C1755DEDEB0E7F4BBFA62271979EE05C0A33D79F0DB559";

describe("bounded header reference mark", () => {
  test("registers the logo-only ROI as a non-documentary bounded crop", () => {
    const mark = mediaManifest.find(
      (asset) => asset.id === "header-reference-mark",
    );

    expect(mark).toMatchObject({
      path: "/media/reference-derived/header-reference-mark.png",
      dimensions: { width: 47, height: 49 },
      intendedScenes: ["hero", "contacts"],
      productionAllowance: {
        allowed: true,
        intendedUse: "hero and contacts header logo mark only",
        referenceShape: "bounded-reference-region",
      },
      provenance: {
        classification: "reference-derived",
        documentary: false,
        parentReferenceSha256: heroReferenceSha256,
      },
    });
    expect(mark?.provenance).toMatchObject({
      transformation: expect.stringContaining("x=52,y=32,w=47,h=49"),
    });
  });

  test("keeps the live SVG mark as the mobile fallback and scopes the crop to desktop", async () => {
    const [headerSource, globalCss] = await Promise.all([
      readFile("src/components/hero/SiteHeader.tsx", "utf8"),
      readFile("app/globals.css", "utf8"),
    ]);

    expect(headerSource).toMatch(
      /brand-lockup__reference-mark[\s\S]*header-reference-mark\.png/i,
    );
    expect(globalCss).toMatch(
      /@media\s*\(min-width:\s*721px\)[\s\S]*?brand-lockup__reference-mark[\s\S]*?display:\s*block/i,
    );
    expect(globalCss).toMatch(
      /@media\s*\(max-width:\s*720px\)[\s\S]*?brand-lockup__reference-mark[\s\S]*?display:\s*none/i,
    );
  });
});
