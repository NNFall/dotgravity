import { readFile } from "node:fs/promises";

import { describe, expect, test } from "vitest";

import { mediaManifest } from "../../src/media/manifest";

const contactsReferenceSha256 =
  "DC6958CC6FB22CB2892C5D4708B907468EE52A01251A6378F2E3E001B2E88457";

describe("bounded contacts reference layers", () => {
  test("registers plaque and map crops as bounded non-documentary assets", () => {
    const plaque = mediaManifest.find(
      (asset) => asset.id === "contacts-reference-plaque-strip",
    );
    const map = mediaManifest.find(
      (asset) => asset.id === "contacts-reference-map-crop",
    );

    expect(plaque).toMatchObject({
      path: "/media/reference-derived/contacts-reference-plaque-strip.png",
      dimensions: { width: 73, height: 477 },
      intendedScenes: ["contacts"],
      productionAllowance: {
        allowed: true,
        intendedUse: "contacts reference plaque strip only",
        referenceShape: "bounded-reference-region",
      },
      provenance: {
        classification: "reference-derived",
        documentary: false,
        parentReferenceSha256: contactsReferenceSha256,
      },
    });
    expect(plaque?.provenance).toMatchObject({
      transformation: expect.stringContaining("x=1085,y=106,w=73,h=477"),
    });

    expect(map).toMatchObject({
      path: "/media/reference-derived/contacts-reference-map-crop.png",
      dimensions: { width: 634, height: 312 },
      intendedScenes: ["contacts"],
      productionAllowance: {
        allowed: true,
        intendedUse: "contacts reference map visual only",
        referenceShape: "bounded-reference-region",
      },
      provenance: {
        classification: "reference-derived",
        documentary: false,
        parentReferenceSha256: contactsReferenceSha256,
      },
    });
    expect(map?.provenance).toMatchObject({
      transformation: expect.stringContaining("x=624,y=596,w=634,h=312"),
    });
  });

  test("keeps the live route markup while applying the measured desktop layers", async () => {
    const css = await readFile(
      "src/components/scenes/ContactsSection.module.css",
      "utf8",
    );

    expect(css).toMatch(
      /@media\s*\(min-width:\s*1181px\)[\s\S]*?\.photoPair::before\s*\{[\s\S]*?background-image:\s*url\(["']?\/media\/reference-derived\/contacts-reference-plaque-strip\.png/i,
    );
    expect(css).toMatch(
      /@media\s*\(min-width:\s*1181px\)[\s\S]*?\.routeDrawing\s*\{[\s\S]*?background-image:\s*url\(["']?\/media\/reference-derived\/contacts-reference-map-crop\.png/i,
    );
    expect(css).toMatch(
      /@media\s*\(min-width:\s*1181px\)[\s\S]*?\.routeDrawing\s*>\s*\*\s*\{[\s\S]*?visibility:\s*hidden;/i,
    );
  });
});
