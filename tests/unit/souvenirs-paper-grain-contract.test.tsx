import { render } from "@testing-library/react";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

import { SouvenirsSection } from "../../src/components/scenes/SouvenirsSection";
import { mediaManifest } from "../../src/media/manifest";

describe("procedural Souvenirs paper grain", () => {
  test("uses a small generated repeat tile instead of a reference-sized raster", async () => {
    const grain = mediaManifest.find(
      (asset) => asset.id === "souvenirs-paper-grain-tile",
    );

    expect(grain).toMatchObject({
      id: "souvenirs-paper-grain-tile",
      path: "/media/generated/souvenirs-paper-grain-tile.png",
      dimensions: { width: 64, height: 64 },
      intendedScenes: ["souvenirs"],
      provenance: {
        classification: "decorative",
        documentary: false,
        creationMethod:
          "deterministic procedural warm-paper grain generated from a seeded noise function",
      },
      productionAllowance: {
        allowed: true,
        intendedUse: "procedural Souvenirs paper grain tile",
        referenceShape: "not-reference",
      },
    });

    const { container } = render(<SouvenirsSection />);
    const grainLayer = container.querySelector(
      '[data-souvenirs-decoration="paper-grain"]',
    );

    expect(grainLayer).toHaveAttribute(
      "data-provenance",
      "decorative",
    );
    expect(grainLayer).toHaveAttribute("aria-hidden", "true");

    const css = await readFile(
      resolve(process.cwd(), "src/components/scenes/SouvenirsSection.module.css"),
      "utf8",
    );

    expect(css).toMatch(
      /\.paperGrain\s*\{[\s\S]*?inset:\s*0;[\s\S]*?background-image:\s*var\(--souvenirs-paper-grain\);[\s\S]*?background-repeat:\s*repeat;[\s\S]*?pointer-events:\s*none;/,
    );
  });
});
