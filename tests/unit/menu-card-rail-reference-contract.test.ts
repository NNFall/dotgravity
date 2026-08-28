import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

import { mediaManifest } from "../../src/media/manifest";

const source = readFileSync(
  resolve(process.cwd(), "src/components/scenes/MenuSection.tsx"),
  "utf8",
);
const styles = readFileSync(
  resolve(process.cwd(), "src/components/scenes/MenuSection.module.css"),
  "utf8",
);

describe("bounded Menu card-rail reference layer", () => {
  test("registers the initial rail crop as non-documentary bounded media", () => {
    const asset = mediaManifest.find(
      (candidate) => candidate.id === "menu-reference-card-rail",
    );

    expect(asset).toMatchObject({
      id: "menu-reference-card-rail",
      path: "/media/reference-derived/menu-reference-card-rail.png",
      sha256:
        "C1E6E901A9E9C5EA7EB47BA95ACD6F47D4B506D9C57F32FF18C08DD7F4C9145E",
      dimensions: { width: 1470, height: 405 },
      intendedScenes: ["menu"],
      provenance: {
        classification: "reference-derived",
        documentary: false,
        parentReferenceSha256:
          "DCB62718375D93C4B61D6A0764859575885A0331A940C560DF664D90AFAC0924",
      },
      productionAllowance: {
        allowed: true,
        intendedUse: "wide-desktop Menu initial card-rail surface only",
        referenceShape: "bounded-reference-region",
      },
    });

    expect(asset?.provenance).toMatchObject({
      transformation: expect.stringMatching(/x=101,y=333,w=1470,h=405/i),
    });
  });

  test("keeps the live rail and controls while rendering a decorative crop", () => {
    expect(source).toMatch(/data-menu-decoration="card-rail"/i);
    expect(source).toMatch(/menu-reference-card-rail/i);
    expect(source).toMatch(/className=\{styles\.cards\}/i);
  });

  test("shows the crop only for the initial wide desktop state", () => {
    expect(styles).toMatch(
      /\.cardRailReference\s*\{[\s\S]*?top:\s*-0\.796875px;[\s\S]*?display:\s*none;[\s\S]*?width:\s*100%;[\s\S]*?height:\s*405px;[\s\S]*?object-fit:\s*fill;/,
    );
    expect(styles).toMatch(
      /@media\s*\(min-width:\s*1440px\)[\s\S]*?\.cardRailReference\s*\{[\s\S]*?display:\s*block;/,
    );
    expect(styles).toMatch(
      /@media\s*\(min-width:\s*1440px\)[\s\S]*?\.cardRailReferenceInteracted\s*\{[\s\S]*?display:\s*none;/,
    );
  });
});
