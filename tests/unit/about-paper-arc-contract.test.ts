import { render } from "@testing-library/react";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createElement } from "react";
import { describe, expect, test } from "vitest";

import { AboutSection } from "../../src/components/scenes/AboutSection";
import { mediaManifest } from "../../src/media/manifest";

const paperArcAssetId = "about-reference-paper-arcs";
const paperArcPath = "/media/reference-derived/about-reference-paper-arcs.png";
const aboutReferenceSha256 =
  "5569EA6A855915480D98A9760A91F9D9D914D53410DCA1FF2EC99143B74A4DC9";

describe("bounded About paper-arc reference layer", () => {
  test("registers the intrinsic non-documentary crop with its source geometry", () => {
    const paperArc = mediaManifest.find((asset) => asset.id === paperArcAssetId);

    expect(paperArc).toMatchObject({
      id: paperArcAssetId,
      path: paperArcPath,
      sha256:
        "67B8AC89D3FDED8B9E149A0CC175180E337D722CA08689A3D1356713EFE13E97",
      dimensions: { width: 272, height: 211 },
      intendedScenes: ["about"],
      provenance: {
        classification: "reference-derived",
        documentary: false,
        parentReferenceSha256: aboutReferenceSha256,
      },
      productionAllowance: {
        allowed: true,
        intendedUse: "desktop About paper arcs only",
        referenceShape: "bounded-reference-region",
      },
    });

    expect(paperArc?.provenance).toMatchObject({
      transformation: expect.stringContaining("x=1400,y=730,w=272,h=211"),
    });
    expect(paperArc?.provenance.statement).toMatch(
      /reference-derived|reference|non-documentary/i,
    );
  });

  test("renders the registered crop as a bounded decorative About image", () => {
    const paperArc = mediaManifest.find((asset) => asset.id === paperArcAssetId);

    if (!paperArc) {
      throw new Error("The registered About paper-arc artwork is required.");
    }

    render(createElement(AboutSection));

    const decoration = document.querySelector<HTMLImageElement>(
      '[data-about-decoration="paper-arcs"]',
    );

    expect(decoration).not.toBeNull();
    expect(decoration).toHaveAttribute("src", paperArc.path);
    expect(decoration).toHaveAttribute(
      "data-provenance",
      "reference-derived",
    );
    expect(decoration).toHaveAttribute("aria-hidden", "true");
    expect(decoration).toHaveAttribute("alt", "");
    expect(decoration).toHaveAttribute("width", "272");
    expect(decoration).toHaveAttribute("height", "211");
  });

  test("places the intrinsic crop only on the wide desktop paper layer", async () => {
    const css = await readFile(
      resolve(process.cwd(), "src/components/scenes/AboutSection.module.css"),
      "utf8",
    );

    expect(css).toMatch(
      /\.paperArcReference\s*\{[\s\S]*?display:\s*none;[\s\S]*?left:\s*83\.7320574163%;[\s\S]*?top:\s*77\.5770456961%;[\s\S]*?width:\s*16\.2679425837%;[\s\S]*?height:\s*22\.4229543039%;[\s\S]*?object-fit:\s*fill;/,
    );
    expect(css).toMatch(
      /@media\s*\(min-width:\s*1081px\)[\s\S]*?\.paperArcReference\s*\{[\s\S]*?display:\s*block;/,
    );
  });
});
