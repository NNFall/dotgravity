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
