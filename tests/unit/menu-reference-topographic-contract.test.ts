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

describe("menu wide desktop topographic reference crop", () => {
  test("registers the bounded decorative crop with honest provenance", () => {
    const asset = mediaManifest.find(
      (candidate) => candidate.id === "menu-reference-topographic-crop",
    );

    expect(asset).toMatchObject({
      id: "menu-reference-topographic-crop",
      dimensions: { width: 222, height: 333 },
      provenance: {
        classification: "reference-derived",
        documentary: false,
      },
      intendedScenes: ["menu"],
      productionAllowance: { allowed: true },
    });
    expect(asset?.path).toBe(
      "/media/reference-derived/menu-reference-topographic-crop.png",
    );
    expect(asset?.provenance).toMatchObject({
      transformation: expect.stringMatching(/bounded.*x=1450,y=0,w=222,h=333/i),
    });
  });

  test("uses the crop only at wide desktop and keeps the live fallback below it", () => {
    expect(source).toMatch(/data-menu-decoration="topographic"/i);
    expect(source).toMatch(/menu-reference-topographic-crop/i);
    expect(styles).toMatch(
      /@media\s*\(min-width:\s*1440px\)[\s\S]*?\.topographicReference\s*\{[\s\S]*?display:\s*block\s*;/,
    );
    expect(styles).toMatch(
      /@media\s*\(min-width:\s*1440px\)[\s\S]*?\.dotField\s*,\s*\.topographicLines\s*\{[\s\S]*?display:\s*none\s*;/,
    );
    expect(styles).toMatch(
      /@media\s*\(max-width:\s*1439px\)[\s\S]*?\.topographicReference\s*\{[\s\S]*?display:\s*none\s*;/,
    );
  });
});
