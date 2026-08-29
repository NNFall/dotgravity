import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";
import { PNG } from "pngjs";

import { mediaManifest } from "../../src/media/manifest";

const source = readFileSync(
  resolve(process.cwd(), "src/components/scenes/MenuSection.tsx"),
  "utf8",
);
const styles = readFileSync(
  resolve(process.cwd(), "src/components/scenes/MenuSection.module.css"),
  "utf8",
);

const referenceSha256 =
  "DCB62718375D93C4B61D6A0764859575885A0331A940C560DF664D90AFAC0924";

const strips = [
  {
    id: "menu-reference-paper-top-strip",
    path: "/media/reference-derived/menu-reference-paper-top-strip.png",
    dimensions: { width: 1274, height: 334 },
    roi: "x=176,y=0,w=1274,h=334",
    selector: "paper-top-strip",
  },
  {
    id: "menu-reference-paper-rail-edges",
    path: "/media/reference-derived/menu-reference-paper-rail-edges.png",
    dimensions: { width: 1672, height: 405 },
    roi: "x=0,y=334,w=1672,h=405",
    selector: "paper-rail-edges",
  },
  {
    id: "menu-reference-paper-bottom-strip",
    path: "/media/reference-derived/menu-reference-paper-bottom-strip.png",
    dimensions: { width: 1470, height: 202 },
    roi: "x=0,y=739,w=1470,h=202",
    selector: "paper-bottom-strip",
  },
] as const;

describe("bounded Menu paper-only reference strips", () => {
  test("registers exactly the three transparent desktop paper strips", () => {
    for (const strip of strips) {
      const asset = mediaManifest.find((candidate) => candidate.id === strip.id);

      expect(asset).toMatchObject({
        id: strip.id,
        path: strip.path,
        dimensions: strip.dimensions,
        intendedScenes: ["menu"],
        provenance: {
          classification: "reference-derived",
          documentary: false,
          parentReferenceSha256: referenceSha256,
        },
        productionAllowance: {
          allowed: true,
          referenceShape: "bounded-reference-region",
        },
      });
      const transformation =
        asset?.provenance && "transformation" in asset.provenance
          ? asset.provenance.transformation
          : "";
      expect(transformation).toContain(strip.roi);
      expect(transformation).toMatch(/morpholog(?:y|ical)|halo guard/i);

      const filePath = resolve(process.cwd(), "public", strip.path.slice(1));
      const png = PNG.sync.read(readFileSync(filePath));
      const alphaValues = Array.from({ length: png.width * png.height }, (_, index) =>
        png.data[index * 4 + 3],
      );
      expect(alphaValues.some((alpha) => alpha === 0)).toBe(true);
      expect(alphaValues.some((alpha) => alpha > 0)).toBe(true);
    }
  });

  test("keeps live semantic content above the bounded strip layers", () => {
    expect(
      source.match(/data-menu-decoration="paper-(?:top-strip|rail-edges|bottom-strip)"/g),
    ).toHaveLength(3);
    expect(styles).toMatch(/\.content\s*\{[\s\S]*?z-index:\s*1;/);
    expect(styles).toMatch(/\.menuPaperStrip\s*\{[\s\S]*?pointer-events:\s*none;/);
  });

  test("shows strips only on wide desktop and uses measured intrinsic geometry", () => {
    expect(styles).toMatch(
      /\.menuPaperStrip\s*\{[\s\S]*?position:\s*absolute;[\s\S]*?display:\s*none;/,
    );
    expect(styles).toMatch(
      /@media\s*\(min-width:\s*1440px\)[\s\S]*?\.menuPaperStrip\s*\{[\s\S]*?display:\s*block;/,
    );
    expect(styles).toMatch(
      /\.paperTopStrip\s*\{[\s\S]*?top:\s*0;[\s\S]*?left:\s*10\.5263157895%;[\s\S]*?width:\s*76\.1961722488%;/,
    );
    expect(styles).toMatch(
      /\.paperRailEdges\s*\{[\s\S]*?top:\s*35\.4941551541%;[\s\S]*?left:\s*0;[\s\S]*?width:\s*100%;/,
    );
    expect(styles).toMatch(
      /\.paperBottomStrip\s*\{[\s\S]*?top:\s*78\.5334750266%;[\s\S]*?left:\s*0;[\s\S]*?width:\s*87\.9186602871%;/,
    );
    expect(styles).toMatch(
      /@media\s*\(max-width:\s*1439px\)[\s\S]*?\.menuPaperStrip\s*\{[\s\S]*?display:\s*none;/,
    );
  });
});
