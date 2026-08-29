import { render } from "@testing-library/react";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

import { AboutSection } from "../../src/components/scenes/AboutSection";
import { mediaManifest } from "../../src/media/manifest";

describe("bounded About paper-only reference texture", () => {
  test("registers and renders only the bounded desktop paper texture layer", async () => {
    const texture = mediaManifest.find(
      (asset) => asset.id === "about-reference-paper-texture",
    );

    expect(texture).toMatchObject({
      id: "about-reference-paper-texture",
      path: "/media/reference-derived/about-reference-paper-texture.png",
      dimensions: { width: 857, height: 941 },
      intendedScenes: ["about"],
      provenance: {
        classification: "reference-derived",
        documentary: false,
        parentReferenceSha256:
          "5569EA6A855915480D98A9760A91F9D9D914D53410DCA1FF2EC99143B74A4DC9",
      },
      productionAllowance: {
        allowed: true,
        intendedUse: "wide-desktop About paper-only texture layer",
        referenceShape: "bounded-reference-region",
      },
    });

    if (!texture) {
      throw new Error("The bounded About paper-only texture is required.");
    }

    render(<AboutSection />);

    const decoration = document.querySelector<HTMLImageElement>(
      '[data-about-decoration="paper-texture"]',
    );

    expect(decoration).not.toBeNull();
    expect(decoration).toHaveAttribute("src", texture.path);
    expect(decoration).toHaveAttribute("data-provenance", "reference-derived");
    expect(decoration).toHaveAttribute("aria-hidden", "true");
    expect(decoration).toHaveAttribute("alt", "");
    expect(decoration).toHaveAttribute("width", "857");
    expect(decoration).toHaveAttribute("height", "941");

    const css = await readFile(
      resolve(process.cwd(), "src/components/scenes/AboutSection.module.css"),
      "utf8",
    );

    expect(css).toMatch(
      /\.paperTextureReference\s*\{[\s\S]*?left:\s*48\.7440191388%;[\s\S]*?top:\s*0;[\s\S]*?width:\s*51\.2559808612%;[\s\S]*?height:\s*100%;[\s\S]*?object-fit:\s*fill;/,
    );
    expect(css).toMatch(
      /@media\s*\(min-width:\s*1081px\)[\s\S]*?\.paperTextureReference\s*\{[\s\S]*?display:\s*block;/,
    );
    expect(css).toMatch(
      /@media\s*\(max-width:\s*1080px\)[\s\S]*?\.paperTextureReference\s*\{[\s\S]*?display:\s*none;/,
    );
  });
});
