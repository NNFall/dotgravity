import { expect, test } from "vitest";

import {
  mediaManifest,
  validateMediaManifest,
} from "../../src/media/manifest";

test("registers the menu coffee and croissant artwork as bounded non-documentary generated media", () => {
  const menuArtwork = mediaManifest.find(
    (asset) => asset.id === "menu-iced-coffee-croissant",
  );

  expect(menuArtwork).toMatchObject({
    id: "menu-iced-coffee-croissant",
    path: "/media/generated/menu-iced-coffee-croissant.png",
    sha256:
      "9C17818567C35E022AB248F8B278C63E380754F3182C94ACDF9E0672CDF188FE",
    dimensions: { width: 1122, height: 1402 },
    intendedScenes: ["menu"],
    productionAllowance: {
      allowed: true,
      intendedUse: "menu photo region only",
      referenceShape: "not-reference",
    },
    provenance: {
      classification: "generated/reference-compatible",
      documentary: false,
      createdAt: "2026-08-26",
      createdWith: "Image Generation",
    },
  });

  if (
    !menuArtwork ||
    menuArtwork.provenance.classification !== "generated/reference-compatible"
  ) {
    throw new Error("The menu artwork must retain generated provenance.");
  }

  expect(menuArtwork.provenance.promptSummary).toMatch(
    /coffee|croissant/i,
  );
  expect(menuArtwork.provenance.statement).toMatch(
    /not a documentary venue photograph/i,
  );
  expect(() => validateMediaManifest(mediaManifest)).not.toThrow();
});

test("registers five bounded non-documentary menu reference crops", () => {
  const parentReferenceSha256 =
    "DCB62718375D93C4B61D6A0764859575885A0331A940C560DF664D90AFAC0924";
  const expectedCrops = [
    ["menu-reference-cappuccino", 115],
    ["menu-reference-berry-dessert", 411],
    ["menu-reference-pistachio-cake", 706],
    ["menu-reference-red-velvet", 1001],
    ["menu-reference-cheesecake", 1303],
  ] as const;

  for (const [id, left] of expectedCrops) {
    const menuArtwork = mediaManifest.find((asset) => asset.id === id);

    expect(menuArtwork).toBeDefined();
    if (!menuArtwork) {
      throw new Error(`The bounded menu crop must be registered: ${id}.`);
    }

    expect(menuArtwork).toMatchObject({
      id,
      path: `/media/reference-derived/${id}.png`,
      dimensions: { width: 250, height: 265 },
      intendedScenes: ["menu"],
      productionAllowance: {
        allowed: true,
        intendedUse: "menu reference crop photo region only",
        referenceShape: "bounded-reference-region",
      },
      provenance: {
        classification: "reference-derived",
        documentary: false,
        parentReferenceSha256,
      },
    });
    expect(menuArtwork.provenance).toMatchObject({
      transformation: expect.stringContaining(
        `x=${left},y=349,w=250,h=265`,
      ),
    });
    expect(menuArtwork.provenance.statement).toMatch(
      /not documentary venue evidence/i,
    );
  }

  expect(() => validateMediaManifest(mediaManifest)).not.toThrow();
});
