import { render } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { PNG } from "pngjs";
import { describe, expect, test } from "vitest";

import { HeroSection } from "../../src/components/hero/HeroSection";
import { mediaManifest } from "../../src/media/manifest";

describe("bounded Hero paper-only reference texture", () => {
  test("stores zero RGB for every fully transparent pixel", () => {
    const imagePath = resolve(
      process.cwd(),
      "public/media/reference-derived/hero-reference-paper-texture.png",
    );
    const image = PNG.sync.read(readFileSync(imagePath));
    let transparentPixelCount = 0;
    let hiddenRgbPixelCount = 0;

    for (let offset = 0; offset < image.data.length; offset += 4) {
      if (image.data[offset + 3] !== 0) {
        continue;
      }

      transparentPixelCount += 1;
      if (
        image.data[offset] !== 0 ||
        image.data[offset + 1] !== 0 ||
        image.data[offset + 2] !== 0
      ) {
        hiddenRgbPixelCount += 1;
      }
    }

    expect(transparentPixelCount).toBeGreaterThan(0);
    expect(hiddenRgbPixelCount).toBe(0);
  });

  test("registers and renders the guarded desktop paper field without replacing live copy", async () => {
    const texture = mediaManifest.find(
      (asset) => asset.id === "hero-reference-paper-texture",
    );

    expect(texture).toMatchObject({
      id: "hero-reference-paper-texture",
      path: "/media/reference-derived/hero-reference-paper-texture.png",
      sha256:
        "B1FB323674193FC9DEF0A64ED734909CAF146E8867F21B8E8BA62AFEEF4627C0",
      dimensions: { width: 956, height: 836 },
      intendedScenes: ["hero"],
      provenance: {
        classification: "reference-derived",
        documentary: false,
        parentReferenceSha256:
          "21380897A08D9C2375C1755DEDEB0E7F4BBFA62271979EE05C0A33D79F0DB559",
      },
      productionAllowance: {
        allowed: true,
        intendedUse: "wide-desktop Hero paper-only texture layer",
        referenceShape: "bounded-reference-region",
      },
    });

    if (!texture) {
      throw new Error("The bounded Hero paper-only texture is required.");
    }

    const { container } = render(<HeroSection />);
    const decoration = container.querySelector<HTMLImageElement>(
      '[data-hero-decoration="paper-texture"]',
    );
    const source = decoration
      ?.closest("picture")
      ?.querySelector<HTMLSourceElement>('source[media="(min-width: 1181px)"]');

    expect(decoration).not.toBeNull();
    expect(source).toHaveAttribute("srcset", texture.path);
    expect(decoration).not.toHaveAttribute("src", texture.path);
    expect(decoration?.getAttribute("src")).toMatch(/^data:image\//);
    expect(decoration).toHaveAttribute("data-provenance", "reference-derived");
    expect(decoration).toHaveAttribute("aria-hidden", "true");
    expect(decoration).toHaveAttribute("alt", "");
    expect(decoration).toHaveAttribute("width", "956");
    expect(decoration).toHaveAttribute("height", "836");

    const css = await readFile(
      resolve(process.cwd(), "src/components/hero/HeroSection.module.css"),
      "utf8",
    );

    expect(css).toMatch(
      /\.paperTextureReference\s*\{[\s\S]*?top:\s*0;[\s\S]*?left:\s*0;[\s\S]*?width:\s*57\.1770334928%;[\s\S]*?height:\s*100%;[\s\S]*?object-fit:\s*fill;/,
    );
    expect(css).toMatch(
      /@media\s*\(min-width:\s*1181px\)[\s\S]*?\.paperTextureReference\s*\{[\s\S]*?display:\s*block;/,
    );
    expect(css).toMatch(
      /@media\s*\(max-width:\s*1180px\)[\s\S]*?\.paperTextureReference\s*\{[\s\S]*?display:\s*none;/,
    );
  });
});
