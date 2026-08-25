import { expect, test } from "vitest";

import {
  mediaManifest,
  validateMediaManifest,
} from "../../src/media/manifest";

test("registers the about arch artwork as bounded non-documentary generated media", () => {
  const aboutArtwork = mediaManifest.find(
    (asset) => asset.id === "about-arch-interior",
  );

  expect(aboutArtwork).toMatchObject({
    id: "about-arch-interior",
    path: "/media/generated/about-arch-interior.png",
    sha256:
      "5A4BADA813E31DD2877A8306F8A7DF74AFE78316FE722F0889260AAD85114BB0",
    dimensions: { width: 1024, height: 1536 },
    intendedScenes: ["about"],
    productionAllowance: {
      allowed: true,
      intendedUse: "about photo region only",
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
    !aboutArtwork ||
    aboutArtwork.provenance.classification !== "generated/reference-compatible"
  ) {
    throw new Error("The about artwork must retain generated provenance.");
  }

  expect(aboutArtwork.provenance.promptSummary).toMatch(/arch|interior/i);
  expect(aboutArtwork.provenance.statement).toMatch(
    /not a documentary venue photograph/i,
  );
  expect(() => validateMediaManifest(mediaManifest)).not.toThrow();
});
