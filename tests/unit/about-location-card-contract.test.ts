import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

import { mediaManifest } from "../../src/media/manifest";

const source = readFileSync(
  resolve(process.cwd(), "src/components/scenes/AboutSection.tsx"),
  "utf8",
);
const styles = readFileSync(
  resolve(process.cwd(), "src/components/scenes/AboutSection.module.css"),
  "utf8",
);

describe("bounded About location-card reference layer", () => {
  test("registers the plaque crop as non-documentary bounded media", () => {
    const asset = mediaManifest.find(
      (candidate) => candidate.id === "about-reference-location-card",
    );

    expect(asset).toMatchObject({
      id: "about-reference-location-card",
      path: "/media/reference-derived/about-reference-location-card.png",
      sha256:
        "86671AFD3D93E33961D6FD5AD6810ED3202A85D27BD54ED04CCA117186CC61A7",
      dimensions: { width: 407, height: 206 },
      intendedScenes: ["about"],
      provenance: {
        classification: "reference-derived",
        documentary: false,
        parentReferenceSha256:
          "5569EA6A855915480D98A9760A91F9D9D914D53410DCA1FF2EC99143B74A4DC9",
      },
      productionAllowance: {
        allowed: true,
        intendedUse: "wide-desktop About location-card surface only",
        referenceShape: "bounded-reference-region",
      },
    });

    expect(asset?.provenance).toMatchObject({
      transformation: expect.stringMatching(/x=13,y=688,w=407,h=206/i),
    });
  });

  test("keeps semantic live card markup while rendering a decorative bounded image", () => {
    expect(source).toMatch(/data-about-decoration="location-card"/i);
    expect(source).toMatch(/about-reference-location-card/i);
    expect(source).toMatch(/className=\{styles\.locationCard\}/i);
  });

  test("places the plaque crop at the measured wide-desktop origin", () => {
    expect(styles).toMatch(
      /\.locationCardReference\s*\{[\s\S]*?display:\s*none;[\s\S]*?left:\s*0\.7775119617%;[\s\S]*?top:\s*73\.1137088204%;[\s\S]*?width:\s*407px;[\s\S]*?height:\s*206px;[\s\S]*?object-fit:\s*fill;/,
    );
    expect(styles).toMatch(
      /@media\s*\(min-width:\s*1081px\)[\s\S]*?\.locationCardReference\s*\{[\s\S]*?display:\s*block;/,
    );
  });
});
