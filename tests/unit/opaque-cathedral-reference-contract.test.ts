import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { PNG } from "pngjs";
import { describe, expect, test } from "vitest";

import { mediaManifest } from "../../src/media/manifest";

const contracts = [
  {
    scene: "about",
    id: "about-reference-cathedral-opaque",
    sourceFile: "src/components/scenes/AboutSection.tsx",
    cssFile: "src/components/scenes/AboutSection.module.css",
    decorationAttribute: 'data-about-decoration="cathedral-opaque"',
    width: 112,
    height: 690,
    crop: "x=1560,y=40,w=112,h=690",
    parentReferenceSha256:
      "5569EA6A855915480D98A9760A91F9D9D914D53410DCA1FF2EC99143B74A4DC9",
    desktopBreakpoint: 761,
  },
  {
    scene: "menu",
    id: "menu-reference-cathedral-opaque",
    sourceFile: "src/components/scenes/MenuSection.tsx",
    cssFile: "src/components/scenes/MenuSection.module.css",
    decorationAttribute: 'data-menu-decoration="cathedral-opaque"',
    width: 176,
    height: 450,
    crop: "x=0,y=25,w=176,h=450",
    parentReferenceSha256:
      "DCB62718375D93C4B61D6A0764859575885A0331A940C560DF664D90AFAC0924",
    desktopBreakpoint: 1440,
  },
  {
    scene: "gallery",
    id: "gallery-reference-cathedral-opaque",
    sourceFile: "src/components/scenes/GallerySection.tsx",
    cssFile: "src/components/scenes/GallerySection.module.css",
    decorationAttribute: 'data-gallery-decoration="cathedral-opaque"',
    width: 120,
    height: 665,
    crop: "x=0,y=250,w=120,h=665",
    parentReferenceSha256:
      "8FF8EC7190A48985D57F7BF05590A392049BFBBC5E4C36BBE4C2EA164B85EFB5",
    desktopBreakpoint: 901,
  },
  {
    scene: "contacts",
    id: "contacts-reference-cathedral-opaque",
    sourceFile: "src/components/scenes/ContactsSection.tsx",
    cssFile: "src/components/scenes/ContactsSection.module.css",
    decorationAttribute: 'data-contacts-decoration="cathedral-opaque"',
    width: 95,
    height: 560,
    crop: "x=0,y=350,w=95,h=560",
    parentReferenceSha256:
      "DC6958CC6FB22CB2892C5D4708B907468EE52A01251A6378F2E3E001B2E88457",
    desktopBreakpoint: 1181,
  },
] as const;

describe("opaque cathedral edge reference contracts", () => {
  test.each(contracts)(
    "$scene registers an exact opaque crop and a desktop-only overlay",
    (contract) => {
      const asset = mediaManifest.find((candidate) => candidate.id === contract.id);

      expect(asset).toBeDefined();
      if (!asset) return;

      expect(asset).toMatchObject({
        id: contract.id,
        path: `/media/reference-derived/${contract.id}.png`,
        dimensions: { width: contract.width, height: contract.height },
        intendedScenes: [contract.scene],
        productionAllowance: {
          allowed: true,
          referenceShape: "bounded-reference-region",
        },
        provenance: {
          classification: "reference-derived",
          documentary: false,
          parentReferenceSha256: contract.parentReferenceSha256,
          transformation: expect.stringContaining(contract.crop),
          statement: expect.stringMatching(/not documentary venue evidence/i),
        },
      });

      const assetFile = resolve(
        process.cwd(),
        `public${asset.path}`,
      );
      expect(existsSync(assetFile)).toBe(true);
      if (existsSync(assetFile)) {
        const png = PNG.sync.read(readFileSync(assetFile));
        expect({ width: png.width, height: png.height }).toEqual({
          width: contract.width,
          height: contract.height,
        });
      }

      const source = readFileSync(resolve(process.cwd(), contract.sourceFile), "utf8");
      expect(source).toContain(contract.id);
      expect(source).toContain(contract.decorationAttribute);

      const css = readFileSync(resolve(process.cwd(), contract.cssFile), "utf8");
      const className = `${contract.scene}CathedralOpaqueReference`;
      expect(css).toMatch(
        new RegExp(`\\.${className}\\s*\\{[\\s\\S]*?display:\\s*none;`, "i"),
      );
      expect(css).toMatch(
        new RegExp(
          `@media\\s*\\(min-width:\\s*${contract.desktopBreakpoint}px\\)[\\s\\S]*?\\.${className}\\s*\\{[\\s\\S]*?display:\\s*block;`,
          "i",
        ),
      );
    },
  );
});
