import { render } from "@testing-library/react";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

import { AboutSection } from "../../src/components/scenes/AboutSection";
import { mediaManifest } from "../../src/media/manifest";

describe("bounded About eyebrow reference ornament", () => {
  test("registers and renders the measured desktop ornament crop", () => {
    const ornament = mediaManifest.find(
      (asset) => asset.id === "about-reference-eyebrow-ornament",
    );

    expect(ornament).toMatchObject({
      id: "about-reference-eyebrow-ornament",
      path: "/media/reference-derived/about-reference-eyebrow-ornament.png",
      dimensions: { width: 199, height: 34 },
      intendedScenes: ["about"],
      provenance: {
        classification: "reference-derived",
        documentary: false,
        parentReferenceSha256:
          "5569EA6A855915480D98A9760A91F9D9D914D53410DCA1FF2EC99143B74A4DC9",
      },
      productionAllowance: {
        allowed: true,
        intendedUse: "wide-desktop About eyebrow ornament only",
        referenceShape: "bounded-reference-region",
      },
    });

    if (!ornament) {
      throw new Error("The bounded About eyebrow ornament is required.");
    }

    render(<AboutSection />);

    const decoration = document.querySelector<HTMLImageElement>(
      '[data-about-decoration="eyebrow-ornament"]',
    );

    expect(decoration).not.toBeNull();
    expect(decoration).toHaveAttribute("src", ornament.path);
    expect(decoration).toHaveAttribute("data-provenance", "reference-derived");
    expect(decoration).toHaveAttribute("aria-hidden", "true");
    expect(decoration).toHaveAttribute("alt", "");
    expect(decoration).toHaveAttribute("width", "199");
    expect(decoration).toHaveAttribute("height", "34");
  });

  test("registers and renders the measured desktop feature-icon rail crop", () => {
    const rail = mediaManifest.find(
      (asset) => asset.id === "about-reference-feature-icons",
    );

    expect(rail).toMatchObject({
      id: "about-reference-feature-icons",
      path: "/media/reference-derived/about-reference-feature-icons.png",
      dimensions: { width: 650, height: 80 },
      intendedScenes: ["about"],
      provenance: {
        classification: "reference-derived",
        documentary: false,
        parentReferenceSha256:
          "5569EA6A855915480D98A9760A91F9D9D914D53410DCA1FF2EC99143B74A4DC9",
      },
      productionAllowance: {
        allowed: true,
        intendedUse: "wide-desktop About feature icon rail only",
        referenceShape: "bounded-reference-region",
      },
    });

    if (!rail) {
      throw new Error("The bounded About feature-icon rail is required.");
    }

    render(<AboutSection />);

    const decoration = document.querySelector<HTMLImageElement>(
      '[data-about-decoration="feature-icons"]',
    );

    expect(decoration).not.toBeNull();
    expect(decoration).toHaveAttribute("src", rail.path);
    expect(decoration).toHaveAttribute("data-provenance", "reference-derived");
    expect(decoration).toHaveAttribute("aria-hidden", "true");
    expect(decoration).toHaveAttribute("alt", "");
    expect(decoration).toHaveAttribute("width", "650");
    expect(decoration).toHaveAttribute("height", "80");
  });

  test("keeps the ornament crop at the supplied wide-desktop origin", async () => {
    const css = await readFile(
      resolve(process.cwd(), "src/components/scenes/AboutSection.module.css"),
      "utf8",
    );

    expect(css).toMatch(
      /\.eyebrowReference\s*\{[\s\S]*?top:\s*8\.2890541977%;[\s\S]*?left:\s*66\.6866028708%;[\s\S]*?width:\s*clamp\(160px,\s*11\.9014354067vw,\s*199px\);[\s\S]*?aspect-ratio:\s*199\s*\/\s*34;/,
    );
    expect(css).toMatch(
      /@media\s*\(min-width:\s*1081px\)[\s\S]*?\.eyebrowReference\s*\{[\s\S]*?display:\s*block;/,
    );
    expect(css).toMatch(
      /@media\s*\(min-width:\s*1081px\)[\s\S]*?\.eyebrow\s*>\s*span,[\s\S]*?\.eyebrow\s*>\s*svg\s*\{[\s\S]*?visibility:\s*hidden;/,
    );

    expect(css).toMatch(
      /\.featureIconsReference\s*\{[\s\S]*?top:\s*55\.2603613177%;[\s\S]*?left:\s*50\.8373205742%;[\s\S]*?width:\s*clamp\(520px,\s*38\.8755980861vw,\s*650px\);[\s\S]*?aspect-ratio:\s*650\s*\/\s*80;/,
    );
  });

  test("removes the unmeasured wide-desktop background ring", async () => {
    const css = await readFile(
      resolve(process.cwd(), "src/components/scenes/AboutSection.module.css"),
      "utf8",
    );

    expect(css).toMatch(
      /@media\s*\(min-width:\s*1081px\)[\s\S]*?\.section::after\s*\{[\s\S]*?display:\s*none\s*!important;/,
    );
  });
});
